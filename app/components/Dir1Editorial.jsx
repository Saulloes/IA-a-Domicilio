'use client';

// Direction A — Editorial Warm (single-page landing)
// Cream paper, terracotta accent, Instrument Serif + Inter Tight.
// Single-page: Hero → Servicios → Cómo trabajamos → Diagnóstico teaser → Casos → FAQ → Contacto.

import { useEffect, useRef, useState } from 'react';
import DiagnosticoPopup from './DiagnosticoPopup';

const EDSTYLE = {
  paper: 'var(--ed-paper, #F4F0E8)',
  paperDim: '#ECE7DB',
  paperDeep: '#E5DFD0',
  ink: 'var(--ed-ink, #1A1714)',
  inkDim: '#6A615A',
  accent: 'var(--ed-accent, #C8491E)',
  rule: 'rgba(26,23,20,0.12)',
  serif: 'var(--ed-serif, "Instrument Serif"), "Cormorant Garamond", Georgia, serif',
  sans: '"Inter Tight", -apple-system, system-ui, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
};

// Single breakpoint — phone (<768) vs. everything else.
function useIsMobile() {
  const get = () => typeof window !== 'undefined' && window.innerWidth < 768;
  const [isMobile, setIsMobile] = useState(false); // SSR-safe default
  useEffect(() => {
    setIsMobile(get());
    const onResize = () => setIsMobile(get());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return isMobile;
}

// Desktop / mobile shorthand helper.
const pick = (isMobile, desktop, mobile) => (isMobile ? mobile : desktop);

// Lightweight analytics wrapper — no-op if GA4 hasn't loaded yet.
const track = (event, props) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', event, props || {});
  }
};

function EdNav({ isMobile }) {
  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 10, background: EDSTYLE.paper,
      borderBottom: `1px solid ${EDSTYLE.rule}`,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: pick(isMobile, '18px 40px', '14px 20px'),
      fontFamily: EDSTYLE.sans, fontSize: 14,
    }}>
      <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: EDSTYLE.ink }}>
        <div style={{ width: pick(isMobile, 22, 18), height: pick(isMobile, 22, 18), borderRadius: '50%', background: EDSTYLE.accent }} />
        <span style={{ fontFamily: EDSTYLE.serif, fontSize: pick(isMobile, 22, 19), letterSpacing: -0.3, color: EDSTYLE.ink }}>
          IA a Domicilio
        </span>
      </a>
      {!isMobile && (
        <nav style={{ display: 'flex', gap: 32, color: EDSTYLE.ink }}>
          <a href="#servicios" style={{ color: 'inherit', textDecoration: 'none' }}>Servicios</a>
          <a href="#proceso" style={{ color: 'inherit', textDecoration: 'none' }}>Cómo trabajamos</a>
          <a href="/diagnostico" style={{ color: 'inherit', textDecoration: 'none' }}>Diagnóstico</a>
          <a href="#casos" style={{ color: 'inherit', textDecoration: 'none' }}>Casos</a>
          <a href="#contacto" style={{ color: 'inherit', textDecoration: 'none' }}>Contacto</a>
        </nav>
      )}
      <a href="#contacto" style={{
        background: EDSTYLE.ink, color: EDSTYLE.paper, border: 'none',
        padding: pick(isMobile, '10px 18px', '9px 14px'),
        borderRadius: 999, cursor: 'pointer', textDecoration: 'none',
        fontFamily: 'inherit', fontSize: pick(isMobile, 13, 12), letterSpacing: 0.1, whiteSpace: 'nowrap',
      }}>{pick(isMobile, 'Agenda una consulta →', 'Agenda →')}</a>
    </div>
  );
}

function EdHero({ scroll, tweaks = {}, isMobile }) {
  const y = Math.min(scroll * 0.15, 60);
  // On mobile we ignore the tweak (it's a desktop-only knob in the Tweaks panel).
  const headlineSize = isMobile ? 48 : (tweaks.heroHeadlineSize || 132);
  const tagline = tweaks.heroTagline || 'Somos tu implementador de IA de confianza. Auditamos, implementamos y capacitamos a tu equipo — sin tecnicismos y sin humo.';
  const emphasis = tweaks.heroEmphasis || 'No te quedes atrás.';
  const ctaPrimary = tweaks.ctaPrimary || 'Agenda tu consulta';
  return (
    <section style={{ padding: pick(isMobile, '100px 40px 80px', '56px 20px 48px'), position: 'relative', overflow: 'hidden' }}>
      <div style={{ fontFamily: EDSTYLE.mono, fontSize: pick(isMobile, 11, 10), letterSpacing: 2, textTransform: 'uppercase', color: EDSTYLE.inkDim, marginBottom: pick(isMobile, 40, 28) }}>
        ◦ Consultoría en IA · Guadalajara, MX
      </div>
      <h1 style={{
        fontFamily: EDSTYLE.serif, fontSize: headlineSize,
        lineHeight: 0.95, letterSpacing: pick(isMobile, -3, -1.5),
        margin: 0, color: EDSTYLE.ink, fontWeight: 400, transform: `translateY(${-y}px)`,
      }}>
        IA para<br/>
        <span style={{ fontStyle: 'italic', color: EDSTYLE.accent }}>tu negocio.</span>
      </h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: pick(isMobile, '1.2fr 1fr', '1fr'),
        gap: pick(isMobile, 80, 40),
        marginTop: pick(isMobile, 72, 40),
        alignItems: 'end',
      }}>
        <p style={{
          fontFamily: EDSTYLE.sans, fontSize: pick(isMobile, 22, 17),
          lineHeight: 1.45, color: EDSTYLE.ink, maxWidth: 560, margin: 0, fontWeight: 400,
        }}>
          {tagline}
          <span style={{ display: 'block', marginTop: 16, color: EDSTYLE.accent, fontStyle: 'italic' }}>{emphasis}</span>
        </p>

        <div style={{
          background: EDSTYLE.ink, color: EDSTYLE.paper,
          padding: pick(isMobile, 28, 22), borderRadius: 4,
          boxShadow: '0 20px 40px -20px rgba(0,0,0,0.3)',
        }}>
          <div style={{ fontFamily: EDSTYLE.mono, fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', opacity: 0.6, marginBottom: 14 }}>
            ◦ Primera llamada — gratis
          </div>
          <div style={{ fontFamily: EDSTYLE.serif, fontSize: pick(isMobile, 32, 26), lineHeight: 1.15, marginBottom: 20, letterSpacing: -0.5 }}>
            30 minutos contigo.<br/>
            <span style={{ fontStyle: 'italic', color: EDSTYLE.accent }}>Sales con un plan.</span>
          </div>
          <a href="#contacto" onClick={() => track('cta_clicked_call', { source: 'hero' })} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: EDSTYLE.accent, color: EDSTYLE.paper, textDecoration: 'none',
            padding: '16px 22px', fontFamily: EDSTYLE.sans, fontSize: pick(isMobile, 16, 15),
            fontWeight: 500, letterSpacing: 0.1, borderRadius: 2,
          }}>
            {ctaPrimary}
            <span style={{ fontSize: 20 }}>→</span>
          </a>
          <div style={{ fontFamily: EDSTYLE.mono, fontSize: 11, opacity: 0.6, marginTop: 14, textAlign: 'center' }}>
            sin compromiso · respuesta en 24 hrs
          </div>
        </div>
      </div>
    </section>
  );
}

function EdMarquee({ isMobile }) {
  const items = ['Chatbots', 'Automatizaciones', 'Agentes', 'Capacitación', 'Auditoría', 'Seguimiento', 'Reportes'];
  return (
    <div style={{
      borderTop: `1px solid ${EDSTYLE.rule}`, borderBottom: `1px solid ${EDSTYLE.rule}`,
      overflow: 'hidden', padding: pick(isMobile, '22px 0', '16px 0'), background: EDSTYLE.paperDim,
    }}>
      <div style={{ display: 'flex', gap: pick(isMobile, 60, 36), whiteSpace: 'nowrap', animation: 'ed-scroll 30s linear infinite' }}>
        {[...items, ...items, ...items].map((x, i) => (
          <span key={i} style={{ fontFamily: EDSTYLE.serif, fontSize: pick(isMobile, 28, 20), fontStyle: 'italic', color: EDSTYLE.ink, display: 'inline-flex', alignItems: 'center', gap: pick(isMobile, 60, 36) }}>
            {x}<span style={{ color: EDSTYLE.accent }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function EdPitch({ isMobile }) {
  return (
    <section style={{ padding: pick(isMobile, '120px 40px', '72px 20px'), borderBottom: `1px solid ${EDSTYLE.rule}` }}>
      <div style={{ display: 'grid', gridTemplateColumns: pick(isMobile, '220px 1fr', '1fr'), gap: pick(isMobile, 60, 20) }}>
        <div style={{ fontFamily: EDSTYLE.mono, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: EDSTYLE.inkDim, paddingTop: pick(isMobile, 18, 0) }}>◦ La idea</div>
        <div>
          <p style={{
            fontFamily: EDSTYLE.serif, fontSize: pick(isMobile, 56, 30),
            lineHeight: 1.1, letterSpacing: pick(isMobile, -1, -0.6),
            margin: 0, fontWeight: 400, color: EDSTYLE.ink, maxWidth: 980,
          }}>
            La mayoría de pymes no necesita <span style={{ fontStyle: 'italic', color: EDSTYLE.accent }}>“transformación digital”</span> —
            necesita a alguien que entienda su operación y sepa qué IA sirve <em>hoy</em>.
          </p>
          <p style={{ fontFamily: EDSTYLE.sans, fontSize: pick(isMobile, 18, 15), lineHeight: 1.55, color: EDSTYLE.inkDim, margin: pick(isMobile, '40px 0 0', '24px 0 0'), maxWidth: 680 }}>
            Eso es IA a Domicilio. Llegamos, evaluamos, instalamos y capacitamos — para que tu empresa opere 10x.
          </p>
        </div>
      </div>
    </section>
  );
}

function EdServices({ isMobile }) {
  const items = [
    { n: '01', t: 'Auditoría de IA', d: 'Revisamos tu operación y detectamos dónde la IA genera más valor — antes de tocar una sola herramienta.', time: '1–2 semanas' },
    { n: '02', t: 'Implementación', d: 'Diseñamos, configuramos y conectamos sistemas de IA al corazón de tu negocio. No nos vamos hasta que funcionan en producción.', time: '4–8 semanas' },
    { n: '03', t: 'Capacitación', d: 'Entrenamos a tu equipo para usar IA con criterio. El conocimiento se queda en tu empresa.', time: '2–4 semanas' },
    { n: '04', t: 'Seguimiento', d: 'Monitoreo, reportes y mejoras mes a mes. Tu sistema de IA sigue iterando después del lanzamiento.', time: 'mensual' },
  ];
  return (
    <section id="servicios" style={{ padding: pick(isMobile, '140px 40px 60px', '88px 20px 40px') }}>
      <div style={{ display: 'grid', gridTemplateColumns: pick(isMobile, '220px 1fr', '1fr'), gap: pick(isMobile, 60, 20), marginBottom: pick(isMobile, 80, 48) }}>
        <div style={{ fontFamily: EDSTYLE.mono, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: EDSTYLE.inkDim, paddingTop: 8 }}>§ Servicios</div>
        <h2 style={{
          fontFamily: EDSTYLE.serif, fontSize: pick(isMobile, 72, 38),
          lineHeight: 1, letterSpacing: pick(isMobile, -1.5, -0.8),
          margin: 0, color: EDSTYLE.ink, fontWeight: 400, maxWidth: 880,
        }}>
          Cuatro formas de trabajar. <span style={{ fontStyle: 'italic', color: EDSTYLE.inkDim }}>Escoge la que te quede.</span>
        </h2>
      </div>
      <div>
        {items.map((s, i) => (
          <div key={i} style={{
            display: 'grid',
            gridTemplateColumns: pick(isMobile, '80px 1fr 1fr 180px', '1fr'),
            gap: pick(isMobile, 40, 10),
            padding: pick(isMobile, '40px 0', '28px 0'),
            borderTop: `1px solid ${EDSTYLE.rule}`,
            alignItems: pick(isMobile, 'baseline', 'flex-start'),
          }}>
            <div style={{ fontFamily: EDSTYLE.mono, fontSize: 13, color: EDSTYLE.inkDim }}>{s.n}</div>
            <div>
              <div style={{ fontFamily: EDSTYLE.serif, fontSize: pick(isMobile, 40, 28), lineHeight: 1.05, color: EDSTYLE.ink, letterSpacing: -0.6 }}>{s.t}</div>
              <div style={{ fontFamily: EDSTYLE.mono, fontSize: 11, color: EDSTYLE.inkDim, marginTop: 8, letterSpacing: 1, textTransform: 'uppercase' }}>{s.time}</div>
            </div>
            <p style={{ fontFamily: EDSTYLE.sans, fontSize: pick(isMobile, 16, 15), lineHeight: 1.55, color: EDSTYLE.ink, margin: 0, maxWidth: 420 }}>{s.d}</p>
            <a href="#contacto" style={{
              textAlign: pick(isMobile, 'right', 'left'),
              fontFamily: EDSTYLE.sans, fontSize: 13, color: EDSTYLE.accent, textDecoration: 'none',
            }}>Hablemos de esto →</a>
          </div>
        ))}
      </div>
    </section>
  );
}

function EdProcess({ isMobile }) {
  const steps = [
    { n: 'I', t: 'Llamada', d: '30 min. Entendemos tu operación y qué duele.' },
    { n: 'II', t: 'Diagnóstico', d: 'Mapa de oportunidades con ROI estimado.' },
    { n: 'III', t: 'Plan', d: 'Qué, cuándo, cuánto — por escrito.' },
    { n: 'IV', t: 'Implementación', d: 'Construimos, probamos y conectamos.' },
    { n: 'V', t: 'Entrega', d: 'Capacitación, playbooks y seguimiento.' },
  ];
  return (
    <section id="proceso" style={{ padding: pick(isMobile, '120px 40px', '72px 20px'), background: EDSTYLE.paperDim, borderTop: `1px solid ${EDSTYLE.rule}`, borderBottom: `1px solid ${EDSTYLE.rule}` }}>
      <div style={{ display: 'grid', gridTemplateColumns: pick(isMobile, '220px 1fr', '1fr'), gap: pick(isMobile, 60, 20), marginBottom: pick(isMobile, 64, 40) }}>
        <div style={{ fontFamily: EDSTYLE.mono, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: EDSTYLE.inkDim, paddingTop: 8 }}>§ Cómo trabajamos</div>
        <h2 style={{
          fontFamily: EDSTYLE.serif, fontSize: pick(isMobile, 64, 34),
          lineHeight: 1, letterSpacing: pick(isMobile, -1.4, -0.7),
          margin: 0, color: EDSTYLE.ink, fontWeight: 400,
        }}>
          Cinco pasos, <span style={{ fontStyle: 'italic' }}>sin sorpresas.</span>
        </h2>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: pick(isMobile, 'repeat(5, 1fr)', '1fr'),
        gap: pick(isMobile, 24, 0),
      }}>
        {steps.map((s, i) => (
          <div key={i} style={{
            borderTop: `1px solid ${EDSTYLE.ink}`,
            paddingTop: pick(isMobile, 20, 18),
            paddingBottom: pick(isMobile, 0, 22),
          }}>
            <div style={{ fontFamily: EDSTYLE.serif, fontSize: pick(isMobile, 52, 40), lineHeight: 1, color: EDSTYLE.accent, fontStyle: 'italic', marginBottom: pick(isMobile, 14, 8) }}>{s.n}</div>
            <div style={{ fontFamily: EDSTYLE.serif, fontSize: pick(isMobile, 26, 22), lineHeight: 1.1, color: EDSTYLE.ink, marginBottom: 10 }}>{s.t}</div>
            <div style={{ fontFamily: EDSTYLE.sans, fontSize: pick(isMobile, 14, 14), lineHeight: 1.5, color: EDSTYLE.inkDim }}>{s.d}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// NEW: Teaser section inserted between Proceso and Casos, pointing to /diagnostico.
function EdDiagnosticoTeaser({ isMobile }) {
  return (
    <section id="diagnostico-teaser" style={{
      padding: pick(isMobile, '140px 40px', '88px 20px'),
      background: EDSTYLE.paperDeep,
      borderBottom: `1px solid ${EDSTYLE.rule}`,
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: pick(isMobile, '220px 1fr', '1fr'), gap: pick(isMobile, 60, 20) }}>
        <div style={{ fontFamily: EDSTYLE.mono, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: EDSTYLE.inkDim, paddingTop: pick(isMobile, 18, 0) }}>§ ¿Por dónde empezar?</div>
        <div>
          <h2 style={{
            fontFamily: EDSTYLE.serif, fontSize: pick(isMobile, 72, 38),
            lineHeight: 1.02, letterSpacing: pick(isMobile, -1.5, -0.8),
            margin: 0, color: EDSTYLE.ink, fontWeight: 400, maxWidth: 960,
          }}>
            Antes de cambiar algo, entiende <span style={{ fontStyle: 'italic', color: EDSTYLE.accent }}>dónde estás.</span>
          </h2>
          <p style={{
            fontFamily: EDSTYLE.sans, fontSize: pick(isMobile, 19, 16),
            lineHeight: 1.55, color: EDSTYLE.ink, margin: pick(isMobile, '36px 0 48px', '24px 0 32px'),
            maxWidth: 680,
          }}>
            Un diagnóstico de 5 minutos te dice qué tan listo está tu negocio para la IA y qué oportunidades tienen más sentido. Sin registro, sin humo.
          </p>
          <div style={{ display: 'flex', gap: pick(isMobile, 28, 20), alignItems: 'center', flexWrap: 'wrap' }}>
            <a
              href="/diagnostico"
              onClick={() => track('cta_clicked_quiz', { source: 'homepage_teaser' })}
              style={{
                background: EDSTYLE.accent, color: EDSTYLE.paper, textDecoration: 'none',
                padding: pick(isMobile, '18px 26px', '14px 20px'),
                fontFamily: EDSTYLE.sans, fontSize: pick(isMobile, 16, 15), fontWeight: 500,
                borderRadius: 2, display: 'inline-flex', alignItems: 'center', gap: 10,
              }}
            >
              Hacer el diagnóstico
              <span style={{ fontSize: 20 }}>→</span>
            </a>
            <a
              href="#contacto"
              onClick={() => track('cta_clicked_call', { source: 'homepage_teaser' })}
              style={{
                fontFamily: EDSTYLE.sans, fontSize: pick(isMobile, 15, 14), color: EDSTYLE.ink, textDecoration: 'underline',
                textUnderlineOffset: 4, textDecorationColor: 'rgba(26,23,20,0.3)',
              }}
            >
              o agenda una llamada →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function EdCases({ isMobile }) {
  const cases = [
    {
      n: '01', tag: 'Chatbot de ventas', co: 'Distribuidora industrial', loc: 'Guadalajara',
      metric: '+38%', metricLabel: 'leads calificados',
      reto: 'Perdían consultas fuera de horario y el equipo comercial no daba abasto para calificar.',
      resultado: 'Atención 24/7 en WhatsApp con canalización automática al asesor correcto.',
    },
    {
      n: '02', tag: 'Agente de voz · soporte', co: 'Aseguradora regional', loc: 'Zona Occidente',
      metric: '−62%', metricLabel: 'tiempo de espera',
      reto: 'Líneas saturadas en horas pico; reclamos repetidos colapsaban al equipo humano.',
      resultado: 'Agente de voz para primer nivel; escala lo complejo con contexto.',
    },
    {
      n: '03', tag: 'Capacitación a líderes', co: 'Grupo restaurantero', loc: '14 sucursales',
      metric: '14/14', metricLabel: 'gerentes operando con IA',
      reto: 'Gerencia sin criterio para decidir qué herramienta usar ni cómo evaluar resultados.',
      resultado: 'Cuatro talleres y playbooks por área para mantener el ritmo.',
    },
  ];

  return (
    <section id="casos" style={{ padding: pick(isMobile, '140px 40px', '88px 20px'), borderTop: `1px solid ${EDSTYLE.rule}` }}>
      <div style={{ display: 'grid', gridTemplateColumns: pick(isMobile, '220px 1fr', '1fr'), gap: pick(isMobile, 60, 20), marginBottom: pick(isMobile, 56, 32) }}>
        <div style={{ fontFamily: EDSTYLE.mono, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: EDSTYLE.inkDim, paddingTop: pick(isMobile, 18, 0) }}>§ Casos recientes</div>
        <h2 style={{
          fontFamily: EDSTYLE.serif, fontSize: pick(isMobile, 64, 34),
          letterSpacing: pick(isMobile, -1.4, -0.7),
          margin: 0, fontWeight: 400, color: EDSTYLE.ink,
        }}>
          Lo que hemos <span style={{ fontStyle: 'italic' }}>hecho.</span>
        </h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: pick(isMobile, 'repeat(3, 1fr)', '1fr'),
        gap: pick(isMobile, 24, 20),
      }}>
        {cases.map((c, i) => (
          <article key={i} style={{
            background: EDSTYLE.paperDim,
            border: `1px solid ${EDSTYLE.rule}`,
            borderTop: `2px solid ${EDSTYLE.accent}`,
            padding: pick(isMobile, '32px 28px 28px', '28px 22px 24px'),
            display: 'flex', flexDirection: 'column',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: pick(isMobile, 28, 22) }}>
              <span style={{ fontFamily: EDSTYLE.mono, fontSize: 10, letterSpacing: 2, color: EDSTYLE.inkDim }}>
                Caso {c.n}
              </span>
              <span style={{ fontFamily: EDSTYLE.mono, fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', color: EDSTYLE.accent, textAlign: 'right' }}>
                {c.tag}
              </span>
            </div>

            <div style={{
              fontFamily: EDSTYLE.serif, fontSize: pick(isMobile, 84, 72),
              lineHeight: 0.9, color: EDSTYLE.ink, letterSpacing: -2.5, fontWeight: 400,
            }}>
              {c.metric}
            </div>
            <div style={{ fontFamily: EDSTYLE.sans, fontSize: 13, color: EDSTYLE.inkDim, marginTop: 8, letterSpacing: 0.2 }}>
              {c.metricLabel}
            </div>

            <div style={{ borderTop: `1px solid ${EDSTYLE.rule}`, margin: pick(isMobile, '28px 0 20px', '22px 0 16px') }} />

            <div style={{ fontFamily: EDSTYLE.serif, fontSize: pick(isMobile, 26, 22), lineHeight: 1.15, color: EDSTYLE.ink, letterSpacing: -0.4 }}>
              {c.co}
            </div>
            <div style={{ fontFamily: EDSTYLE.sans, fontSize: 13, color: EDSTYLE.inkDim, marginTop: 4, marginBottom: pick(isMobile, 24, 20) }}>
              {c.loc}
            </div>

            <div style={{ marginBottom: pick(isMobile, 20, 16) }}>
              <div style={{ fontFamily: EDSTYLE.mono, fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: EDSTYLE.inkDim, marginBottom: 6 }}>El reto</div>
              <p style={{ fontFamily: EDSTYLE.sans, fontSize: pick(isMobile, 15, 14), lineHeight: 1.55, color: EDSTYLE.ink, margin: 0 }}>
                {c.reto}
              </p>
            </div>
            <div>
              <div style={{ fontFamily: EDSTYLE.mono, fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: EDSTYLE.accent, marginBottom: 6 }}>Lo que hicimos</div>
              <p style={{ fontFamily: EDSTYLE.sans, fontSize: pick(isMobile, 15, 14), lineHeight: 1.55, color: EDSTYLE.ink, margin: 0 }}>
                {c.resultado}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div style={{
        marginTop: pick(isMobile, 56, 36),
        paddingTop: pick(isMobile, 36, 24),
        borderTop: `1px solid ${EDSTYLE.rule}`,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16,
      }}>
        <p style={{ fontFamily: EDSTYLE.sans, fontSize: pick(isMobile, 16, 14), color: EDSTYLE.inkDim, margin: 0, maxWidth: 520 }}>
          Cada empresa es distinta. Agenda una llamada y revisamos qué podría funcionar para la tuya.
        </p>
        <a href="#contacto" style={{
          fontFamily: EDSTYLE.sans, fontSize: pick(isMobile, 15, 14), color: EDSTYLE.accent, textDecoration: 'none', whiteSpace: 'nowrap',
        }}>Cuéntanos tu caso →</a>
      </div>
    </section>
  );
}

function EdFAQ({ isMobile }) {
  const qs = [
    { q: '¿Qué tan rápido se ven resultados?', a: 'Desde el primer día. La auditoría completa la entregamos en menos de una semana, y una implementación típica queda lista en 2–3 semanas.' },
    { q: '¿Necesito tener mis datos organizados?', a: 'No. Parte del trabajo es ayudarte a preparar lo que ya tienes. Empezamos con lo que haya.' },
    { q: '¿Trabajan fuera de Guadalajara?', a: 'Sí, en toda la República. La mayoría del trabajo es remoto; visitamos cuando hace sentido.' },
    { q: '¿Qué necesito para empezar?', a: 'Nada. Agendas la llamada, te escuchamos y te guiamos paso a paso en todo el proceso.' },
  ];
  return (
    <section style={{ padding: pick(isMobile, '120px 40px', '72px 20px'), background: EDSTYLE.paperDim, borderTop: `1px solid ${EDSTYLE.rule}` }}>
      <div style={{ display: 'grid', gridTemplateColumns: pick(isMobile, '340px 1fr', '1fr'), gap: pick(isMobile, 80, 28) }}>
        <div>
          <div style={{ fontFamily: EDSTYLE.mono, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: EDSTYLE.inkDim, marginBottom: 20 }}>§ Dudas frecuentes</div>
          <h2 style={{
            fontFamily: EDSTYLE.serif, fontSize: pick(isMobile, 56, 32),
            lineHeight: 1, letterSpacing: pick(isMobile, -1.2, -0.6),
            margin: 0, fontWeight: 400, color: EDSTYLE.ink,
          }}>
            Lo que suelen <span style={{ fontStyle: 'italic' }}>preguntar.</span>
          </h2>
        </div>
        <div>
          {qs.map((x, i) => (
            <div key={i} style={{ padding: pick(isMobile, '28px 0', '20px 0'), borderTop: `1px solid ${EDSTYLE.rule}` }}>
              <div style={{ fontFamily: EDSTYLE.serif, fontSize: pick(isMobile, 28, 21), color: EDSTYLE.ink, marginBottom: 10, letterSpacing: -0.3 }}>{x.q}</div>
              <div style={{ fontFamily: EDSTYLE.sans, fontSize: pick(isMobile, 16, 15), lineHeight: 1.6, color: EDSTYLE.inkDim, maxWidth: 620 }}>{x.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const CAL_LINK = 'https://cal.com/saul-lopez/30min';
const CONTACT_EMAIL = 'saul@iaadomicilio.com';
const WHATSAPP_NUMBER = '+52 229 850 3858';
const WHATSAPP_LINK = '5212298503858';

function EdCalBooking({ isMobile }) {
  return (
    <div style={{
      background: 'rgba(244,240,232,0.04)',
      border: '1px solid rgba(244,240,232,0.15)',
      padding: pick(isMobile, '36px 32px', '28px 24px'),
      display: 'flex', flexDirection: 'column', gap: pick(isMobile, 22, 18),
    }}>
      <div style={{ fontFamily: EDSTYLE.mono, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', opacity: 0.6 }}>
        ◦ Reserva tu horario
      </div>
      <div style={{ fontFamily: EDSTYLE.serif, fontSize: pick(isMobile, 40, 30), lineHeight: 1.1, letterSpacing: -0.6 }}>
        Elige el día y la hora. <span style={{ fontStyle: 'italic', color: EDSTYLE.accent }}>Así de fácil.</span>
      </div>
      <a
        href={CAL_LINK}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track('cta_clicked_call', { source: 'contact_cal_card' })}
        style={{
          background: EDSTYLE.accent, color: EDSTYLE.paper, border: 'none',
          padding: pick(isMobile, '18px 24px', '16px 20px'),
          fontFamily: EDSTYLE.sans, fontSize: pick(isMobile, 16, 15), fontWeight: 500,
          cursor: 'pointer', borderRadius: 2, textDecoration: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}
      >
        Ver calendario y reservar
        <span style={{ fontSize: 20 }}>→</span>
      </a>
    </div>
  );
}

function EdCTA({ isMobile }) {
  const waMsg = encodeURIComponent('Hola, vi el sitio de IA a Domicilio y me gustaría agendar una consulta.');
  return (
    <section id="contacto" style={{
      padding: pick(isMobile, '140px 40px 120px', '80px 20px 72px'),
      background: EDSTYLE.ink, color: EDSTYLE.paper, position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ fontFamily: EDSTYLE.mono, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', opacity: 0.6, marginBottom: pick(isMobile, 32, 20) }}>◦ Empieza aquí</div>
      <h2 style={{
        fontFamily: EDSTYLE.serif, fontSize: pick(isMobile, 112, 44),
        lineHeight: 0.95, letterSpacing: pick(isMobile, -3, -1.2),
        margin: 0, fontWeight: 400, maxWidth: 1100,
      }}>
        Una llamada <span style={{ fontStyle: 'italic', color: EDSTYLE.accent }}>de 30 minutos</span> y sabes qué sigue.
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: pick(isMobile, '1fr 1.1fr', '1fr'),
        gap: pick(isMobile, 80, 48),
        marginTop: pick(isMobile, 72, 40),
        alignItems: 'start',
      }}>
        <div>
          <p style={{ fontFamily: EDSTYLE.sans, fontSize: pick(isMobile, 19, 16), lineHeight: 1.55, maxWidth: 480, margin: pick(isMobile, '0 0 40px', '0 0 28px'), opacity: 0.85 }}>
            Sin presentación de ventas. Te escuchamos, te decimos qué haríamos nosotros, y decidimos si tiene sentido trabajar juntos.
          </p>

          <a
            href={`https://wa.me/${WHATSAPP_LINK}?text=${waMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('cta_clicked_whatsapp', { source: 'contact_section' })}
            style={{
              background: EDSTYLE.accent, color: EDSTYLE.paper, textDecoration: 'none',
              padding: pick(isMobile, '20px 26px', '16px 20px'),
              fontFamily: EDSTYLE.sans, fontSize: pick(isMobile, 17, 15), fontWeight: 500,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              borderRadius: 2, marginBottom: pick(isMobile, 28, 22),
            }}
          >
            {pick(isMobile, 'Escríbenos por WhatsApp — lo más rápido', 'WhatsApp — lo más rápido')}
            <span style={{ fontSize: 22 }}>→</span>
          </a>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontFamily: EDSTYLE.sans, fontSize: pick(isMobile, 14, 13), opacity: 0.75 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 10, borderBottom: '1px solid rgba(244,240,232,0.12)' }}>
              <span style={{ opacity: 0.7 }}>Teléfono / WhatsApp</span>
              <a href={`tel:+52${WHATSAPP_LINK.slice(3)}`} style={{ color: EDSTYLE.paper, textDecoration: 'none' }}>{WHATSAPP_NUMBER}</a>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 10, borderBottom: '1px solid rgba(244,240,232,0.12)', gap: 16 }}>
              <span style={{ opacity: 0.7 }}>Email</span>
              <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: EDSTYLE.paper, textDecoration: 'none', wordBreak: 'break-all', textAlign: 'right' }}>{CONTACT_EMAIL}</a>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ opacity: 0.7 }}>Base</span>
              <span>Guadalajara, MX</span>
            </div>
          </div>
        </div>

        <div>
          <EdCalBooking isMobile={isMobile} />
        </div>
      </div>
    </section>
  );
}

function EdFooter({ isMobile }) {
  return (
    <footer style={{
      padding: pick(isMobile, '50px 40px 40px', '32px 20px 28px'),
      background: EDSTYLE.ink, color: 'rgba(244,240,232,0.55)',
      borderTop: `1px solid rgba(244,240,232,0.1)`,
      display: 'flex', justifyContent: 'space-between', alignItems: pick(isMobile, 'center', 'flex-start'),
      fontFamily: EDSTYLE.sans, fontSize: 13, flexWrap: 'wrap', gap: pick(isMobile, 20, 12),
      flexDirection: pick(isMobile, 'row', 'column'),
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 18, height: 18, borderRadius: '50%', background: EDSTYLE.accent }} />
        <span style={{ fontFamily: EDSTYLE.serif, fontSize: 20, color: EDSTYLE.paper }}>IA a Domicilio</span>
      </div>
      <div>Guadalajara, Jalisco · MX</div>
      <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: 'inherit', textDecoration: 'none', wordBreak: 'break-all' }}>{CONTACT_EMAIL}</a>
      <a href={`tel:+52${WHATSAPP_LINK.slice(3)}`} style={{ color: 'inherit', textDecoration: 'none' }}>{WHATSAPP_NUMBER}</a>
      <div style={{ fontFamily: EDSTYLE.mono, fontSize: 11 }}>MMXXVI</div>
    </footer>
  );
}

export default function Dir1Editorial({ tweaks = {} }) {
  const scrollRef = useRef(null);
  const [scroll, setScroll] = useState(0);
  const isMobile = useIsMobile();
  const cssVars = {
    '--ed-paper': tweaks.paper || '#F4F0E8',
    '--ed-ink': tweaks.ink || '#1A1714',
    '--ed-accent': tweaks.accent || '#C8491E',
    '--ed-serif': tweaks.serif ? `"${tweaks.serif}"` : '"Instrument Serif"',
  };
  return (
    <div
      ref={scrollRef}
      data-ed-scroll
      onScroll={(e) => setScroll(e.currentTarget.scrollTop)}
      style={{
        width: '100%', height: '100vh', overflowY: 'auto', overflowX: 'hidden',
        background: EDSTYLE.paper, color: EDSTYLE.ink, fontFamily: EDSTYLE.sans,
        ...cssVars,
      }}
    >
      <style>{`
        @keyframes ed-scroll { from { transform: translateX(0); } to { transform: translateX(-33.33%); } }
      `}</style>
      <EdNav isMobile={isMobile} />
      <EdHero scroll={scroll} tweaks={tweaks} isMobile={isMobile} />
      {tweaks.showMarquee !== false && <EdMarquee isMobile={isMobile} />}
      <EdPitch isMobile={isMobile} />
      <EdServices isMobile={isMobile} />
      <EdProcess isMobile={isMobile} />
      <EdDiagnosticoTeaser isMobile={isMobile} />
      <EdCases isMobile={isMobile} />
      <EdFAQ isMobile={isMobile} />
      <EdCTA isMobile={isMobile} />
      <EdFooter isMobile={isMobile} />
      <DiagnosticoPopup />
    </div>
  );
}
