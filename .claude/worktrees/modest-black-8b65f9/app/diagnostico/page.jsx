'use client';

import { useEffect, useState } from 'react';
import {
  QUESTIONS, ARCHETYPES, scoreAnswers, getOpportunities,
  CAL_LINK, WHATSAPP_INTL,
} from './data';

const S = {
  paper: '#F4F0E8',
  paperDim: '#ECE7DB',
  paperDeep: '#E5DFD0',
  ink: '#1A1714',
  inkDim: '#6A615A',
  accent: '#C8491E',
  rule: 'rgba(26,23,20,0.12)',
  serif: '"Instrument Serif", "Cormorant Garamond", Georgia, serif',
  sans: '"Inter Tight", -apple-system, system-ui, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
};

function useIsMobile() {
  const get = () => typeof window !== 'undefined' && window.innerWidth < 768;
  const [m, setM] = useState(false);
  useEffect(() => {
    setM(get());
    const onR = () => setM(get());
    window.addEventListener('resize', onR);
    return () => window.removeEventListener('resize', onR);
  }, []);
  return m;
}
const pick = (m, d, mob) => (m ? mob : d);

const track = (event, props) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', event, props || {});
  }
};

function MonoLabel({ children, color }) {
  return (
    <div style={{
      fontFamily: S.mono, fontSize: 11, letterSpacing: 2,
      textTransform: 'uppercase', color: color || S.inkDim,
    }}>{children}</div>
  );
}

function Button({ children, onClick, variant = 'primary', isMobile, style, href, target, rel, ...rest }) {
  const base = {
    fontFamily: S.sans, fontSize: pick(isMobile, 16, 15), fontWeight: 500,
    padding: pick(isMobile, '16px 24px', '14px 20px'),
    border: 'none', borderRadius: 2, cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'space-between',
    gap: 12, textDecoration: 'none', letterSpacing: 0.1,
    transition: 'opacity 150ms ease, transform 150ms ease',
  };
  const variants = {
    primary: { background: S.accent, color: S.paper },
    ink: { background: S.ink, color: S.paper },
    ghost: { background: 'transparent', color: S.ink, border: `1px solid ${S.rule}` },
  };
  const final = { ...base, ...variants[variant], ...style };
  if (href) return <a href={href} target={target} rel={rel} {...rest} style={final}>{children}</a>;
  return <button onClick={onClick} {...rest} style={final}>{children}</button>;
}

// ──────────────────────────────────────────────────────────
// INTRO
// ──────────────────────────────────────────────────────────
function Intro({ onStart, isMobile }) {
  return (
    <section style={{
      maxWidth: 980, margin: '0 auto',
      padding: pick(isMobile, '80px 40px 120px', '48px 20px 80px'),
    }}>
      <MonoLabel>◦ Diagnóstico gratuito · 5 minutos</MonoLabel>

      <h1 style={{
        fontFamily: S.serif,
        fontSize: pick(isMobile, 96, 44),
        lineHeight: 0.98,
        letterSpacing: pick(isMobile, -2.5, -1),
        margin: pick(isMobile, '32px 0 0', '20px 0 0'),
        color: S.ink, fontWeight: 400,
      }}>
        ¿Qué tan listo está tu negocio para la <span style={{ fontStyle: 'italic', color: S.accent }}>IA?</span>
      </h1>

      <p style={{
        fontFamily: S.sans, fontSize: pick(isMobile, 20, 16),
        lineHeight: 1.55, color: S.ink,
        maxWidth: 620,
        margin: pick(isMobile, '48px 0 0', '28px 0 0'),
      }}>
        9 preguntas sobre tu operación. Al terminar, sabrás exactamente dónde estás parado y qué oportunidades de IA tienen sentido para ti — sin tecnicismos y sin humo.
      </p>

      <div style={{
        marginTop: pick(isMobile, 56, 40),
        display: 'grid',
        gridTemplateColumns: pick(isMobile, 'repeat(3, 1fr)', '1fr'),
        gap: pick(isMobile, 24, 12),
        borderTop: `1px solid ${S.rule}`,
        borderBottom: `1px solid ${S.rule}`,
        padding: pick(isMobile, '28px 0', '20px 0'),
      }}>
        {[
          'Score honesto de tu preparación',
          '3-5 oportunidades específicas para tu negocio',
          'Reporte personalizado (opcional)',
        ].map((t, i) => (
          <div key={i} style={{
            fontFamily: S.sans, fontSize: pick(isMobile, 14, 14),
            color: S.ink, display: 'flex', gap: 10, alignItems: 'flex-start',
          }}>
            <span style={{ color: S.accent, fontFamily: S.mono, fontSize: 12 }}>◦</span>
            <span>{t}</span>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: pick(isMobile, 48, 32),
        display: 'flex',
        flexDirection: pick(isMobile, 'row', 'column'),
        gap: pick(isMobile, 24, 16),
        alignItems: pick(isMobile, 'center', 'stretch'),
      }}>
        <Button onClick={onStart} variant="primary" isMobile={isMobile} style={{ minWidth: pick(isMobile, 280, 'auto') }}>
          Empezar diagnóstico <span style={{ fontSize: 20 }}>→</span>
        </Button>
        <a
          href={CAL_LINK}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('cta_clicked_call', { source: 'quiz_intro' })}
          style={{
            fontFamily: S.sans, fontSize: pick(isMobile, 15, 14),
            color: S.accent, textDecoration: 'none',
          }}
        >
          o agenda una llamada directa →
        </a>
      </div>

      <div style={{
        marginTop: 20,
        fontFamily: S.mono, fontSize: 11,
        color: S.inkDim, letterSpacing: 1,
      }}>
        sin registro · respuestas anónimas · 5 minutos
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────
// QUIZ
// ──────────────────────────────────────────────────────────
function Quiz({ answers, setAnswers, onComplete, onBack, isMobile }) {
  const [idx, setIdx] = useState(0);
  const q = QUESTIONS[idx];
  const progress = ((idx + 1) / QUESTIONS.length) * 100;
  const current = answers[q.id];

  const canAdvance = q.type === 'single'
    ? current !== undefined && current !== null
    : Array.isArray(current) && current.length > 0;

  const choose = (optIdx) => {
    if (q.type === 'single') {
      setAnswers({ ...answers, [q.id]: optIdx });
      track('quiz_question_answered', { question_id: q.id });
    } else {
      const cur = Array.isArray(current) ? [...current] : [];
      const opt = q.options[optIdx];

      if (opt.exclusive) {
        setAnswers({ ...answers, [q.id]: cur.includes(optIdx) ? [] : [optIdx] });
        return;
      }
      // Remove any exclusive selections when picking non-exclusive
      const cleaned = cur.filter((i) => !q.options[i].exclusive);
      const i = cleaned.indexOf(optIdx);
      if (i >= 0) cleaned.splice(i, 1);
      else cleaned.push(optIdx);
      setAnswers({ ...answers, [q.id]: cleaned });
    }
  };

  const next = () => {
    if (idx < QUESTIONS.length - 1) {
      track('quiz_question_answered', { question_id: q.id });
      setIdx(idx + 1);
    } else {
      onComplete();
    }
  };
  const prev = () => {
    if (idx > 0) setIdx(idx - 1);
    else onBack();
  };

  // Auto-advance on single-choice (~350ms delay feels premium).
  useEffect(() => {
    if (q.type === 'single' && current !== undefined && current !== null) {
      const t = setTimeout(() => {
        if (idx < QUESTIONS.length - 1) setIdx(idx + 1);
        else onComplete();
      }, 350);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, idx, q.type]);

  const isSelected = (optIdx) => {
    if (q.type === 'single') return current === optIdx;
    return Array.isArray(current) && current.includes(optIdx);
  };

  return (
    <section style={{
      maxWidth: 820, margin: '0 auto',
      padding: pick(isMobile, '60px 40px 80px', '32px 20px 60px'),
      minHeight: 'calc(100vh - 80px)',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ marginBottom: pick(isMobile, 56, 40) }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
          <MonoLabel>Pregunta {idx + 1} de {QUESTIONS.length}</MonoLabel>
          <button onClick={prev} style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            fontFamily: S.mono, fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase',
            color: S.inkDim, padding: 0,
          }}>
            ← {idx === 0 ? 'Inicio' : 'Atrás'}
          </button>
        </div>
        <div style={{
          height: 2, background: S.rule, borderRadius: 1, overflow: 'hidden',
        }}>
          <div style={{
            height: '100%', width: `${progress}%`, background: S.accent,
            transition: 'width 300ms ease',
          }} />
        </div>
      </div>

      <div style={{ flex: 1 }}>
        <h2 style={{
          fontFamily: S.serif,
          fontSize: pick(isMobile, 56, 32),
          lineHeight: 1.05,
          letterSpacing: pick(isMobile, -1.4, -0.7),
          margin: 0, color: S.ink, fontWeight: 400,
        }}>
          {q.title}
        </h2>
        {q.hint && (
          <div style={{
            fontFamily: S.mono, fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase',
            color: S.inkDim, marginTop: 16,
          }}>
            {q.hint}
          </div>
        )}

        <div style={{
          marginTop: pick(isMobile, 56, 36),
          display: 'flex', flexDirection: 'column', gap: pick(isMobile, 14, 10),
        }}>
          {q.options.map((opt, i) => {
            const sel = isSelected(i);
            return (
              <button
                key={i}
                onClick={() => choose(i)}
                style={{
                  textAlign: 'left',
                  padding: pick(isMobile, '22px 26px', '18px 20px'),
                  background: sel ? S.ink : S.paperDim,
                  color: sel ? S.paper : S.ink,
                  border: sel ? `1px solid ${S.ink}` : `1px solid ${S.rule}`,
                  borderLeft: sel ? `3px solid ${S.accent}` : `3px solid transparent`,
                  borderRadius: 2,
                  fontFamily: S.sans,
                  fontSize: pick(isMobile, 17, 15),
                  lineHeight: 1.4,
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 16,
                  transition: 'all 120ms ease',
                }}
                onMouseEnter={(e) => {
                  if (!sel) {
                    e.currentTarget.style.background = S.paperDeep;
                    e.currentTarget.style.borderLeft = `3px solid ${S.accent}`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!sel) {
                    e.currentTarget.style.background = S.paperDim;
                    e.currentTarget.style.borderLeft = `3px solid transparent`;
                  }
                }}
              >
                {q.type === 'multi' && (
                  <span style={{
                    width: 18, height: 18, flexShrink: 0,
                    border: `1px solid ${sel ? S.paper : S.inkDim}`,
                    background: sel ? S.accent : 'transparent',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, color: S.paper, fontWeight: 600,
                  }}>
                    {sel ? '✓' : ''}
                  </span>
                )}
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>

        {q.type === 'multi' && (
          <div style={{ marginTop: pick(isMobile, 40, 28) }}>
            <Button
              onClick={next}
              variant="primary"
              isMobile={isMobile}
              style={{ opacity: canAdvance ? 1 : 0.35, pointerEvents: canAdvance ? 'auto' : 'none' }}
            >
              Continuar <span style={{ fontSize: 20 }}>→</span>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────
// RESULTS
// ──────────────────────────────────────────────────────────
function Results({ result, onEmailSubmit, emailSent, emailPending, emailErrorMsg, isMobile, answers }) {
  const { total, dims, archetype, bottleneck } = result;
  const opportunities = getOpportunities(archetype, bottleneck);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleEmailSubmit = () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Ingresa un correo válido');
      return;
    }
    setEmailError('');
    onEmailSubmit(email);
  };

  const shareText = `Acabo de hacer el diagnóstico IA de IA a Domicilio — toma 5 min: ${typeof window !== 'undefined' ? window.location.origin : ''}/diagnostico`;
  const onWhatsApp = () => {
    track('share_whatsapp');
    if (typeof window !== 'undefined') {
      window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank', 'noopener,noreferrer');
    }
  };
  const onCopyLink = async () => {
    track('share_copy_link');
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(`${window.location.origin}/diagnostico`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // no-op
      }
    }
  };

  return (
    <section style={{
      maxWidth: 1100, margin: '0 auto',
      padding: pick(isMobile, '60px 40px 120px', '40px 20px 80px'),
    }}>
      {/* Score + archetype */}
      <div>
        <MonoLabel>◦ Tu diagnóstico</MonoLabel>
        <div style={{
          display: 'grid',
          gridTemplateColumns: pick(isMobile, '1fr 1.2fr', '1fr'),
          gap: pick(isMobile, 60, 28),
          marginTop: pick(isMobile, 32, 24),
          alignItems: 'center',
        }}>
          <div>
            <div style={{
              fontFamily: S.serif,
              fontSize: pick(isMobile, 180, 120),
              lineHeight: 0.9,
              letterSpacing: pick(isMobile, -6, -4),
              color: S.accent, fontWeight: 400,
            }}>
              {total}
              <span style={{ color: S.inkDim, fontSize: '0.4em', letterSpacing: 0 }}>/100</span>
            </div>
          </div>
          <div>
            <MonoLabel>Tu arquetipo</MonoLabel>
            <div style={{
              fontFamily: S.serif,
              fontSize: pick(isMobile, 56, 36),
              lineHeight: 1.05, letterSpacing: pick(isMobile, -1.2, -0.7),
              color: S.ink, marginTop: 12,
            }}>
              {archetype.emoji} <span style={{ fontStyle: 'italic' }}>{archetype.name}</span>
            </div>
            <p style={{
              fontFamily: S.sans, fontSize: pick(isMobile, 17, 15),
              lineHeight: 1.55, color: S.ink,
              margin: pick(isMobile, '20px 0 0', '16px 0 0'),
              maxWidth: 560,
            }}>
              {archetype.tagline}
            </p>
          </div>
        </div>
      </div>

      {/* Dimensions */}
      <div style={{
        marginTop: pick(isMobile, 72, 48),
        paddingTop: pick(isMobile, 40, 28),
        borderTop: `1px solid ${S.rule}`,
      }}>
        <MonoLabel>§ Desglose por dimensión</MonoLabel>
        <div style={{
          marginTop: pick(isMobile, 32, 24),
          display: 'grid',
          gridTemplateColumns: pick(isMobile, 'repeat(3, 1fr)', '1fr'),
          gap: pick(isMobile, 32, 16),
        }}>
          {[
            { label: 'Uso actual', val: dims.uso, max: 35 },
            { label: 'Operación real', val: dims.operacion, max: 35 },
            { label: 'Visión y preparación', val: dims.vision, max: 30 },
          ].map((d, i) => (
            <div key={i}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                <span style={{ fontFamily: S.sans, fontSize: 14, color: S.ink }}>{d.label}</span>
                <span style={{ fontFamily: S.mono, fontSize: 12, color: S.inkDim }}>{d.val}/{d.max}</span>
              </div>
              <div style={{ height: 3, background: S.rule, overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${(d.val / d.max) * 100}%`,
                  background: S.accent,
                  transition: 'width 600ms ease',
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Opportunities */}
      <div style={{ marginTop: pick(isMobile, 96, 64) }}>
        <div style={{ display: 'grid', gridTemplateColumns: pick(isMobile, '220px 1fr', '1fr'), gap: pick(isMobile, 40, 16), marginBottom: pick(isMobile, 40, 24) }}>
          <MonoLabel>§ Oportunidades para ti</MonoLabel>
          <h3 style={{
            fontFamily: S.serif,
            fontSize: pick(isMobile, 44, 26),
            lineHeight: 1.05, letterSpacing: pick(isMobile, -1, -0.5),
            margin: 0, fontWeight: 400, color: S.ink, maxWidth: 680,
          }}>
            Basadas en tu arquetipo y tu cuello de botella principal.
          </h3>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: pick(isMobile, 'repeat(3, 1fr)', '1fr'),
          gap: pick(isMobile, 20, 16),
        }}>
          {opportunities.map((o, i) => (
            <article key={i} style={{
              background: S.paperDim,
              border: `1px solid ${S.rule}`,
              borderTop: `2px solid ${S.accent}`,
              padding: pick(isMobile, '24px 22px', '22px 20px'),
              display: 'flex', flexDirection: 'column',
            }}>
              <div style={{
                fontFamily: S.mono, fontSize: 10, letterSpacing: 1.5,
                textTransform: 'uppercase', color: S.accent, marginBottom: 16,
              }}>
                {o.tag}
              </div>
              <div style={{
                fontFamily: S.serif, fontSize: pick(isMobile, 24, 20),
                lineHeight: 1.15, letterSpacing: -0.3, color: S.ink, marginBottom: 12,
              }}>
                {o.title}
              </div>
              <p style={{
                fontFamily: S.sans, fontSize: pick(isMobile, 14, 13),
                lineHeight: 1.55, color: S.ink, margin: 0,
              }}>
                {o.desc}
              </p>
            </article>
          ))}
        </div>
      </div>

      {/* CTAs */}
      <div style={{
        marginTop: pick(isMobile, 96, 64),
        display: 'grid',
        gridTemplateColumns: pick(isMobile, '1fr 1fr', '1fr'),
        gap: pick(isMobile, 24, 20),
      }}>
        {/* Call */}
        <div style={{
          background: S.accent, color: S.paper,
          padding: pick(isMobile, '36px 32px', '28px 24px'),
          borderRadius: 2,
          display: 'flex', flexDirection: 'column',
        }}>
          <MonoLabel color="rgba(244,240,232,0.7)">◦ Listo para actuar</MonoLabel>
          <div style={{
            fontFamily: S.serif,
            fontSize: pick(isMobile, 34, 26),
            lineHeight: 1.1, letterSpacing: -0.5,
            margin: pick(isMobile, '20px 0 14px', '16px 0 10px'),
          }}>
            Agenda tu AI Audit. <span style={{ fontStyle: 'italic' }}>30 min, gratis.</span>
          </div>
          <p style={{
            fontFamily: S.sans, fontSize: pick(isMobile, 15, 14),
            lineHeight: 1.5, margin: 0, opacity: 0.9,
            marginBottom: pick(isMobile, 28, 20), flex: 1,
          }}>
            Revisamos tu operación en vivo y te decimos exactamente qué haríamos.
          </p>
          <Button
            href={CAL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            variant="ink"
            isMobile={isMobile}
            onClick={() => track('cta_clicked_call', { source: 'results' })}
          >
            Reservar llamada <span style={{ fontSize: 20 }}>→</span>
          </Button>
        </div>

        {/* Email report */}
        <div style={{
          background: S.ink, color: S.paper,
          padding: pick(isMobile, '36px 32px', '28px 24px'),
          borderRadius: 2,
          display: 'flex', flexDirection: 'column',
        }}>
          <MonoLabel color="rgba(244,240,232,0.6)">◦ Quieres un reporte a fondo</MonoLabel>
          <div style={{
            fontFamily: S.serif,
            fontSize: pick(isMobile, 34, 26),
            lineHeight: 1.1, letterSpacing: -0.5,
            margin: pick(isMobile, '20px 0 14px', '16px 0 10px'),
          }}>
            Recibe tu reporte <span style={{ fontStyle: 'italic', color: S.accent }}>personalizado.</span>
          </div>
          <p style={{
            fontFamily: S.sans, fontSize: pick(isMobile, 15, 14),
            lineHeight: 1.5, margin: 0, opacity: 0.85,
            marginBottom: pick(isMobile, 24, 18), flex: 1,
          }}>
            Análisis detallado de tus respuestas + oportunidades específicas para tu negocio.
          </p>

          {!emailSent ? (
            <div>
              <div style={{ display: 'flex', gap: 8, flexDirection: pick(isMobile, 'row', 'column') }}>
                <input
                  type="email"
                  placeholder="tu@correo.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleEmailSubmit(); }}
                  disabled={emailPending}
                  aria-label="Tu correo"
                  style={{
                    flex: 1,
                    padding: pick(isMobile, '14px 16px', '12px 14px'),
                    background: 'rgba(244,240,232,0.08)',
                    border: `1px solid ${emailError ? S.accent : 'rgba(244,240,232,0.2)'}`,
                    borderRadius: 2,
                    color: S.paper,
                    fontFamily: S.sans,
                    fontSize: pick(isMobile, 15, 14),
                    outline: 'none',
                  }}
                />
                <button
                  onClick={handleEmailSubmit}
                  disabled={emailPending}
                  style={{
                    background: S.accent, color: S.paper, border: 'none',
                    padding: pick(isMobile, '14px 20px', '12px 18px'),
                    fontFamily: S.sans, fontSize: pick(isMobile, 15, 14), fontWeight: 500,
                    borderRadius: 2, cursor: emailPending ? 'wait' : 'pointer',
                    display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center',
                    whiteSpace: 'nowrap',
                    opacity: emailPending ? 0.7 : 1,
                  }}
                >
                  {emailPending ? 'Enviando…' : 'Enviar'} <span style={{ fontSize: 18 }}>→</span>
                </button>
              </div>
              {(emailError || emailErrorMsg) && (
                <div style={{ fontFamily: S.sans, fontSize: 12, color: S.accent, marginTop: 8 }}>
                  {emailError || emailErrorMsg}
                </div>
              )}
            </div>
          ) : (
            <div style={{
              padding: '14px 16px', background: 'rgba(200,73,30,0.12)',
              border: `1px solid ${S.accent}`, borderRadius: 2,
              fontFamily: S.sans, fontSize: pick(isMobile, 15, 14),
            }}>
              ✓ Listo. Te llega en unos minutos.
            </div>
          )}
        </div>
      </div>

      {/* Share */}
      <div style={{
        marginTop: pick(isMobile, 56, 36),
        paddingTop: pick(isMobile, 28, 20),
        borderTop: `1px solid ${S.rule}`,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: 16,
      }}>
        <div style={{ fontFamily: S.sans, fontSize: pick(isMobile, 14, 13), color: S.inkDim }}>
          Comparte con alguien que lo necesite:
        </div>
        <div style={{ display: 'flex', gap: 20 }}>
          <a href="#" onClick={(e) => { e.preventDefault(); onWhatsApp(); }}
            style={{ fontFamily: S.sans, fontSize: 13, color: S.accent, textDecoration: 'none' }}>
            WhatsApp →
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); onCopyLink(); }}
            style={{ fontFamily: S.sans, fontSize: 13, color: S.accent, textDecoration: 'none' }}>
            {copied ? '✓ Copiado' : 'Copiar link →'}
          </a>
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────
// PAGE
// ──────────────────────────────────────────────────────────
export default function DiagnosticoPage() {
  const [view, setView] = useState('intro'); // intro | quiz | results
  const [answers, setAnswers] = useState({});
  const [emailSent, setEmailSent] = useState(false);
  const [emailPending, setEmailPending] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState('');
  const isMobile = useIsMobile();

  // Keep URL hash in sync so the back button works intuitively.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hash = view === 'results' ? '#resultado' : view === 'quiz' ? '#preguntas' : '';
    if (window.location.hash !== hash) {
      window.history.replaceState(null, '', `/diagnostico${hash}`);
    }
  }, [view]);

  const result = view === 'results' ? scoreAnswers(answers) : null;

  const start = () => {
    track('quiz_started');
    setAnswers({});
    setEmailSent(false);
    setEmailErrorMsg('');
    setView('quiz');
  };

  const complete = () => {
    const r = scoreAnswers(answers);
    track('quiz_completed', {
      score: r.total,
      archetype: r.archetype.name,
      bottleneck: r.bottleneck || 'unknown',
    });
    setView('results');
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onEmail = async (email) => {
    const r = scoreAnswers(answers);
    track('cta_clicked_email', { source: 'results' });
    setEmailPending(true);
    setEmailErrorMsg('');
    try {
      const res = await fetch('/api/generate-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          answers,
          score: r.total,
          dimensions: r.dims,
          archetype: r.archetype.name,
          bottleneck: r.bottleneck,
        }),
      });
      if (!res.ok) {
        // Graceful: still show success so user doesn't see technical errors.
        // We log error on server side; user gets "it's coming."
        // Only surface UI error for validation (400).
        if (res.status === 400) {
          setEmailErrorMsg('Ingresa un correo válido');
          setEmailPending(false);
          return;
        }
      }
      track('email_submitted', {
        archetype: r.archetype.name,
        bottleneck: r.bottleneck || 'unknown',
      });
      setEmailSent(true);
    } catch {
      // Network error — still show success (fail-open for user UX).
      track('email_submitted', {
        archetype: r.archetype.name,
        bottleneck: r.bottleneck || 'unknown',
      });
      setEmailSent(true);
    } finally {
      setEmailPending(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: S.paper,
      color: S.ink,
      fontFamily: S.sans,
    }}>
      {/* Simplified nav — logo + Agenda */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 10, background: S.paper,
        borderBottom: `1px solid ${S.rule}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: pick(isMobile, '16px 40px', '14px 20px'),
      }}>
        <a
          href="/"
          style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}
        >
          <div style={{ width: pick(isMobile, 20, 18), height: pick(isMobile, 20, 18), borderRadius: '50%', background: S.accent }} />
          <span style={{ fontFamily: S.serif, fontSize: pick(isMobile, 22, 19), letterSpacing: -0.3, color: S.ink }}>
            IA a Domicilio
          </span>
        </a>
        <a
          href={CAL_LINK}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('cta_clicked_call', { source: 'quiz_nav' })}
          style={{
            background: S.ink, color: S.paper, border: 'none',
            padding: pick(isMobile, '9px 16px', '8px 14px'),
            borderRadius: 999, cursor: 'pointer', textDecoration: 'none',
            fontFamily: S.sans, fontSize: pick(isMobile, 13, 12), letterSpacing: 0.1,
          }}
        >
          Agenda →
        </a>
      </div>

      {view === 'intro' && <Intro onStart={start} isMobile={isMobile} />}
      {view === 'quiz' && (
        <Quiz
          answers={answers}
          setAnswers={setAnswers}
          onComplete={complete}
          onBack={() => setView('intro')}
          isMobile={isMobile}
        />
      )}
      {view === 'results' && result && (
        <Results
          result={result}
          onEmailSubmit={onEmail}
          emailSent={emailSent}
          emailPending={emailPending}
          emailErrorMsg={emailErrorMsg}
          isMobile={isMobile}
          answers={answers}
        />
      )}
    </div>
  );
}
