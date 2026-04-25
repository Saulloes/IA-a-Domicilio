// POST /api/generate-report
// Body: { email, answers, score, dimensions, archetype, bottleneck }
// Flow: validate → rate-limit (Supabase query) → log submission → Gemini → Resend → mark report_sent.

import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Resend } from 'resend';
import { getSupabaseAdmin } from '../../../lib/supabaseAdmin';
import { renderReportEmail } from '../../../lib/reportEmail';
import { SYSTEM_PROMPT, buildUserPrompt } from '../../../lib/reportPrompt';

// This route needs Node runtime (not Edge) because @google/generative-ai
// uses APIs not available in the Edge runtime.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const CAL_LINK = 'https://cal.com/saul-lopez/30min';
const WHATSAPP_INTL = '5212298503858';
const CONTACT_EMAIL = 'saul@iaadomicilio.com';
const FROM = 'IA a Domicilio <saul@iaadomicilio.com>';
const BCC = 'saul@iaadomicilio.com'; // Saul receives a copy of every report for QA.

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function badRequest(msg) {
  return NextResponse.json({ ok: false, error: msg }, { status: 400 });
}

function serverError(msg) {
  // We return 200 to the client even on server errors so the user still sees
  // the friendly success state. The client already reads res.ok !== true
  // as a signal to still mark success (fail-open UX). But for the API contract,
  // status 200 is correct when we've logged the submission.
  return NextResponse.json({ ok: true, warning: msg });
}

export async function POST(req) {
  let payload;
  try {
    payload = await req.json();
  } catch {
    return badRequest('Invalid JSON');
  }

  const { email, answers, score, dimensions, archetype, bottleneck } = payload || {};

  // --- Validation ---
  if (typeof email !== 'string' || !emailRe.test(email)) return badRequest('Invalid email');
  if (typeof score !== 'number' || score < 0 || score > 100) return badRequest('Invalid score');
  if (!dimensions || typeof dimensions !== 'object') return badRequest('Invalid dimensions');
  if (typeof archetype !== 'string') return badRequest('Invalid archetype');
  if (!answers || typeof answers !== 'object') return badRequest('Invalid answers');

  const normalizedEmail = email.trim().toLowerCase();
  const supabase = (() => { try { return getSupabaseAdmin(); } catch { return null; } })();

  // --- Rate limit: 1 report per email per hour ---
  if (supabase) {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { data: recent } = await supabase
      .from('quiz_submissions')
      .select('id, report_sent')
      .eq('email', normalizedEmail)
      .eq('report_sent', true)
      .gte('created_at', oneHourAgo)
      .limit(1);
    if (recent && recent.length > 0) {
      // Silent success — don't spam user, don't spam API.
      return NextResponse.json({ ok: true, rateLimited: true });
    }
  }

  // --- Log submission up front (even if Gemini/Resend fails later) ---
  let submissionId = null;
  if (supabase) {
    const { data: inserted, error: insertErr } = await supabase
      .from('quiz_submissions')
      .insert({
        email: normalizedEmail,
        score,
        dimensions,
        archetype,
        bottleneck: bottleneck || null,
        answers,
        report_sent: false,
      })
      .select('id')
      .single();
    if (insertErr) {
      console.error('[generate-report] supabase insert failed', insertErr);
    } else {
      submissionId = inserted?.id || null;
    }
  }

  // --- Gemini call ---
  let markdown = '';
  try {
    const apiKey = process.env.GOOGLE_AI_API_KEY;
    if (!apiKey) throw new Error('Missing GOOGLE_AI_API_KEY');
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      systemInstruction: SYSTEM_PROMPT,
      generationConfig: { temperature: 0.6, maxOutputTokens: 1500 },
    });
    const userPrompt = buildUserPrompt({ score, dimensions, archetype, bottleneck, answers });
    const result = await model.generateContent(userPrompt);
    markdown = result.response.text() || '';
    if (!markdown) throw new Error('Empty Gemini response');
  } catch (err) {
    console.error('[generate-report] gemini call failed', err);
    return serverError('generation_failed');
  }

  // --- Resend email ---
  try {
    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) throw new Error('Missing RESEND_API_KEY');
    const resend = new Resend(resendKey);

    const html = renderReportEmail({
      archetype,
      markdown,
      calLink: CAL_LINK,
      email: normalizedEmail,
      whatsappIntl: WHATSAPP_INTL,
      contactEmail: CONTACT_EMAIL,
    });

    const subject = `Tu diagnóstico IA — ${archetype}`;
    const { error: sendErr } = await resend.emails.send({
      from: FROM,
      to: normalizedEmail,
      bcc: BCC,
      subject,
      html,
      replyTo: CONTACT_EMAIL,
    });
    if (sendErr) throw sendErr;
  } catch (err) {
    console.error('[generate-report] resend send failed', err);
    return serverError('send_failed');
  }

  // --- Mark report_sent ---
  if (supabase && submissionId) {
    await supabase
      .from('quiz_submissions')
      .update({ report_sent: true })
      .eq('id', submissionId);
  }

  return NextResponse.json({ ok: true });
}
