// Diagnostic endpoint — hit this in a browser to verify the Gemini API key
// and model are working without going through the full quiz flow.
// Returns the raw success response or the full error object.
//
// Visit: https://iaadomicilio.com/api/test-gemini
//
// Safe to leave deployed (no secrets returned), but consider removing once
// diagnosis is complete since each call consumes a small amount of quota.

import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req) {
  const url = new URL(req.url);
  const requestedModel = url.searchParams.get('model') || 'gemini-2.0-flash';
  const apiKey = process.env.GOOGLE_AI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({
      ok: false,
      stage: 'env',
      error: 'GOOGLE_AI_API_KEY is not set in this environment',
    }, { status: 200 });
  }

  const keyHint = `${apiKey.slice(0, 4)}…${apiKey.slice(-4)} (length ${apiKey.length})`;

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: requestedModel });
    const result = await model.generateContent('Say the word "hola" once. Nothing else.');
    return NextResponse.json({
      ok: true,
      keyHint,
      modelTested: requestedModel,
      response: result.response.text(),
    });
  } catch (err) {
    return NextResponse.json({
      ok: false,
      stage: 'gemini',
      keyHint,
      modelTested: requestedModel,
      error: {
        name: err?.name,
        message: err?.message,
        status: err?.status,
        statusText: err?.statusText,
        cause: err?.cause?.message || (err?.cause ? String(err.cause) : undefined),
        stack: err?.stack?.split('\n').slice(0, 5).join(' | '),
      },
    }, { status: 200 });
  }
}
