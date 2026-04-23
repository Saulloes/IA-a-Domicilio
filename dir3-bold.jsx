// Direction 3 — Bold Motion
// Contemporary studio. Dark mode, oversized type, scroll-driven reveals.
// Founder-forward, building-in-public energy.

const BLDSTYLE = {
  bg: '#0B0B0C',
  bgSoft: '#141416',
  ink: '#F2F0EA',
  inkDim: '#8A8680',
  accent: '#D9FF3F',   // electric lime
  accent2: '#FF6B3D',
  rule: 'rgba(242,240,234,0.12)',
  sans: '"Inter Tight", -apple-system, system-ui, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
  display: '"Inter Tight", system-ui, sans-serif',
};

function useScrollProgress(ref) {
  const [p, setP] = React.useState(0);
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    const fn = () => {
      const max = el.scrollHeight - el.clientHeight;
      setP(max > 0 ? el.scrollTop / max : 0);
    };
    el.addEventListener('scroll', fn, { passive: true });
    fn();
    return () => el.removeEventListener('scroll', fn);
  }, []);
  return p;
}

function useReveal(rootRef) {
  React.useEffect(() => {
    const root = rootRef.current; if (!root) return;
    const els = root.querySelectorAll('[data-reveal]');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.setAttribute('data-visible', ''); });
    }, { root, threshold: 0.15 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function BldNav({ progress }) {
  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 20, background: 'rgba(11,11,12,0.85)',
      backdropFilter: 'blur(12px)', borderBottom: `1px solid ${BLDSTYLE.rule}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 32px', fontFamily: BLDSTYLE.sans, fontSize: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 24, height: 24, background: BLDSTYLE.accent, borderRadius: '50%' }} />
          <span style={{ fontWeight: 600, letterSpacing: -0.2, color: BLDSTYLE.ink }}>IA a Domicilio</span>
          <span style={{ fontFamily: BLDSTYLE.mono, fontSize: 11, color: BLDSTYLE.inkDim, marginLeft: 8 }}>◦ construyendo en público</span>
        </div>
        <nav style={{ display: 'flex', gap: 28, color: BLDSTYLE.ink, fontSize: 14 }}>
          <a style={{ color: 'inherit', textDecoration: 'none' }}>Servicios</a>
          <a style={{ color: 'inherit', textDecoration: 'none' }}>Casos</a>
          <a style={{ color: 'inherit', textDecoration: 'none' }}>Diario</a>
          <a style={{ color: 'inherit', textDecoration: 'none' }}>Nosotros</a>
        </nav>
        <button style={{
          background: BLDSTYLE.accent, color: BLDSTYLE.bg, border: 'none',
          padding: '10px 18px', borderRadius: 999, cursor: 'pointer',
          fontFamily: 'inherit', fontSize: 13, fontWeight: 600,
        }}>Agenda →</button>
      </div>
      <div style={{ height: 2, background: BLDSTYLE.rule }}>
        <div style={{ height: '100%', width: `${progress * 100}%`, background: BLDSTYLE.accent, transition: 'width 0.1s' }} />
      </div>
    </div>
  );
}

function BldHero({ progress }) {
  // letter-by-letter entrance + parallax
  const title1 = 'IA que sirve';
  const title2 = 'el viernes.';
  return (
    <section style={{ padding: '80px 32px 60px', position: 'relative', minHeight: '90vh' }}>
      <div style={{ fontFamily: BLDSTYLE.mono, fontSize: 11, color: BLDSTYLE.inkDim, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 40, display: 'flex', justifyContent: 'space-between' }}>
        <span>◦ IA a Domicilio — Guadalajara, MX</span>
        <span>◦ 2026 / EN VIVO</span>
      </div>
      <h1 style={{
        fontFamily: BLDSTYLE.display, fontSize: 200, lineHeight: 0.88, letterSpacing: -8,
        margin: 0, color: BLDSTYLE.ink, fontWeight: 700,
      }}>
        {title1.split(' ').map((w, i) => (
          <span key={i} data-reveal style={{ display: 'inline-block', marginRight: 24 }}>
            {w}
          </span>
        ))}<br/>
        <span data-reveal style={{ display: 'inline-block', color: BLDSTYLE.accent, fontStyle: 'italic' }}>
          {title2}
        </span>
      </h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 40, marginTop: 100, alignItems: 'flex-end' }}>
        <div />
        <p style={{ fontFamily: BLDSTYLE.sans, fontSize: 20, lineHeight: 1.45, color: BLDSTYLE.ink, margin: 0, maxWidth: 420 }}>
          Auditamos, construimos y enseñamos IA a empresas medianas en México.
          Llegamos, lo dejamos funcionando, y tu equipo queda autónomo.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-end' }}>
          <button style={{
            background: BLDSTYLE.accent, color: BLDSTYLE.bg, border: 'none',
            padding: '20px 28px', borderRadius: 999, cursor: 'pointer',
            fontFamily: BLDSTYLE.sans, fontSize: 16, fontWeight: 600,
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            Agenda una consulta gratis
            <span style={{
              width: 24, height: 24, borderRadius: '50%', background: BLDSTYLE.bg, color: BLDSTYLE.accent,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12,
            }}>→</span>
          </button>
          <span style={{ fontFamily: BLDSTYLE.mono, fontSize: 11, color: BLDSTYLE.inkDim }}>
            30 min · sin compromiso · Saúl responde
          </span>
        </div>
      </div>
    </section>
  );
}

function BldMarquee() {
  const items = ['• CHATBOTS', '• AGENTES', '• AUDITORÍAS', '• CAPACITACIÓN', '• AUTOMATIZACIONES', '• A TU MEDIDA'];
  return (
    <div style={{ padding: '28px 0', borderTop: `1px solid ${BLDSTYLE.rule}`, borderBottom: `1px solid ${BLDSTYLE.rule}`, overflow: 'hidden', background: BLDSTYLE.bgSoft }}>
      <div style={{ display: 'flex', gap: 48, whiteSpace: 'nowrap', animation: 'bld-scroll 28s linear infinite', fontFamily: BLDSTYLE.display, fontSize: 40, fontWeight: 600, letterSpacing: -1, color: BLDSTYLE.ink }}>
        {[...items, ...items, ...items].map((x, i) => <span key={i}>{x}</span>)}
      </div>
    </div>
  );
}

function BldServices() {
  const items = [
    { n: '01', title: 'Auditoría', d: 'Dos semanas. Mapa de oportunidades de IA con ROI estimado para tu empresa.', color: BLDSTYLE.accent },
    { n: '02', title: 'Sistemas', d: 'Chatbots, agentes y automatizaciones conectados a tus herramientas reales.', color: BLDSTYLE.accent2 },
    { n: '03', title: 'Capacitación', d: 'Tu equipo aprende a usar IA con criterio. De CEO a becario.', color: BLDSTYLE.ink },
    { n: '04', title: 'De cabecera', d: 'Plan mensual. Un experto en IA al alcance de WhatsApp.', color: BLDSTYLE.accent },
  ];
  return (
    <section style={{ padding: '140px 32px 120px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 80 }}>
        <h2 data-reveal style={{ fontFamily: BLDSTYLE.display, fontSize: 96, lineHeight: 0.95, letterSpacing: -3, margin: 0, fontWeight: 700, color: BLDSTYLE.ink, maxWidth: 900 }}>
          Cuatro formas de trabajar juntos.
        </h2>
        <span style={{ fontFamily: BLDSTYLE.mono, fontSize: 11, color: BLDSTYLE.inkDim, letterSpacing: 2, textTransform: 'uppercase' }}>§ Servicios</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {items.map((s, i) => (
          <div key={i} data-reveal style={{
            display: 'grid', gridTemplateColumns: '100px 1fr 2fr 120px',
            gap: 40, padding: '48px 0', borderTop: `1px solid ${BLDSTYLE.rule}`,
            alignItems: 'center', cursor: 'pointer', transition: 'padding 0.3s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.paddingLeft = '24px'; }}
          onMouseLeave={(e) => { e.currentTarget.style.paddingLeft = '0'; }}>
            <div style={{ fontFamily: BLDSTYLE.mono, fontSize: 12, color: s.color, letterSpacing: 1 }}>{s.n} —</div>
            <div style={{ fontFamily: BLDSTYLE.display, fontSize: 64, fontWeight: 600, letterSpacing: -1.5, color: BLDSTYLE.ink, lineHeight: 1 }}>{s.title}</div>
            <p style={{ fontFamily: BLDSTYLE.sans, fontSize: 18, lineHeight: 1.45, color: BLDSTYLE.inkDim, margin: 0, maxWidth: 560 }}>{s.d}</p>
            <div style={{ textAlign: 'right', fontSize: 40, color: s.color, fontWeight: 300 }}>→</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function BldBigQuote() {
  return (
    <section style={{ padding: '160px 32px', background: BLDSTYLE.accent, color: BLDSTYLE.bg }}>
      <div style={{ fontFamily: BLDSTYLE.mono, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', opacity: 0.6, marginBottom: 40 }}>
        ◦ TESIS
      </div>
      <p data-reveal style={{
        fontFamily: BLDSTYLE.display, fontSize: 100, lineHeight: 0.98, letterSpacing: -3.5,
        margin: 0, fontWeight: 600,
      }}>
        Si yo aprendí esto en semanas, <span style={{ fontStyle: 'italic' }}>tu equipo también</span>. Esa es toda la tesis.
      </p>
      <div style={{ marginTop: 40, fontFamily: BLDSTYLE.mono, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase' }}>
        — Saúl, fundador
      </div>
    </section>
  );
}

function BldCases() {
  const cases = [
    { tag: 'CHATBOT', co: 'Distribuidora · Zapopan', result: '+38%', label: 'leads calificados', color: BLDSTYLE.accent },
    { tag: 'AGENTE WHATSAPP', co: 'Clínica dental', result: '−4 hrs', label: 'día en recepción', color: BLDSTYLE.accent2 },
    { tag: 'CAPACITACIÓN', co: 'Despacho legal', result: '12 pers.', label: 'usando IA diaria', color: BLDSTYLE.ink },
  ];
  return (
    <section style={{ padding: '140px 32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 64 }}>
        <h2 data-reveal style={{ fontFamily: BLDSTYLE.display, fontSize: 96, lineHeight: 0.95, letterSpacing: -3, margin: 0, fontWeight: 700, color: BLDSTYLE.ink }}>
          Casos recientes.
        </h2>
        <span style={{ fontFamily: BLDSTYLE.mono, fontSize: 11, color: BLDSTYLE.inkDim, letterSpacing: 2, textTransform: 'uppercase' }}>§ 2026</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>
        {cases.map((c, i) => (
          <div key={i} data-reveal style={{
            background: BLDSTYLE.bgSoft, borderRadius: 16,
            padding: 28, aspectRatio: '3/4',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            border: `1px solid ${BLDSTYLE.rule}`, transition: 'transform 0.3s, border-color 0.3s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.borderColor = c.color; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.borderColor = BLDSTYLE.rule; }}>
            <div>
              <div style={{ display: 'inline-block', padding: '4px 10px', borderRadius: 999, background: c.color, color: BLDSTYLE.bg, fontFamily: BLDSTYLE.mono, fontSize: 10, letterSpacing: 1, textTransform: 'uppercase' }}>{c.tag}</div>
              <div style={{ marginTop: 16, fontFamily: BLDSTYLE.sans, fontSize: 15, color: BLDSTYLE.inkDim }}>{c.co}</div>
            </div>
            <div>
              <div style={{ fontFamily: BLDSTYLE.display, fontSize: 96, lineHeight: 0.9, letterSpacing: -3, fontWeight: 700, color: BLDSTYLE.ink }}>{c.result}</div>
              <div style={{ fontFamily: BLDSTYLE.sans, fontSize: 16, color: BLDSTYLE.ink, marginTop: 8 }}>{c.label}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function BldFounder() {
  return (
    <section style={{ padding: '140px 32px', background: BLDSTYLE.bgSoft }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 64, alignItems: 'center' }}>
        <div data-reveal style={{
          aspectRatio: '3/4', borderRadius: 16,
          background: `linear-gradient(135deg, ${BLDSTYLE.accent}22, ${BLDSTYLE.accent2}22), repeating-linear-gradient(45deg, ${BLDSTYLE.bg}, ${BLDSTYLE.bg} 14px, ${BLDSTYLE.bgSoft} 14px, ${BLDSTYLE.bgSoft} 28px)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: BLDSTYLE.inkDim, fontFamily: BLDSTYLE.mono, fontSize: 11, letterSpacing: 1,
          border: `1px solid ${BLDSTYLE.rule}`,
        }}>[ retrato · Saúl ]</div>
        <div>
          <div data-reveal style={{ fontFamily: BLDSTYLE.mono, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: BLDSTYLE.accent, marginBottom: 28 }}>◦ FUNDADOR · 24 · GDL</div>
          <h3 data-reveal style={{ fontFamily: BLDSTYLE.display, fontSize: 72, lineHeight: 1, letterSpacing: -2, color: BLDSTYLE.ink, margin: '0 0 32px', fontWeight: 700 }}>
            Hola, soy <span style={{ color: BLDSTYLE.accent, fontStyle: 'italic' }}>Saúl</span>.
          </h3>
          <p data-reveal style={{ fontFamily: BLDSTYLE.sans, fontSize: 18, lineHeight: 1.6, color: BLDSTYLE.ink, maxWidth: 560, margin: '0 0 20px' }}>
            Uso ChatGPT desde 2022. Hace unas semanas entré al nuevo stack de IA —
            agentes, automatizaciones, chatbots — y ahora lo construyo para empresas medianas.
          </p>
          <p data-reveal style={{ fontFamily: BLDSTYLE.sans, fontSize: 18, lineHeight: 1.6, color: BLDSTYLE.inkDim, maxWidth: 560, margin: 0 }}>
            Documento el proceso completo en LinkedIn y X. Newsletter semanal. Si yo puedo aprenderlo a esta velocidad, tu equipo también.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 40 }}>
            {['Newsletter', 'LinkedIn', 'X / Twitter'].map((s) => (
              <button key={s} style={{
                background: 'transparent', color: BLDSTYLE.ink, border: `1px solid ${BLDSTYLE.rule}`,
                padding: '10px 18px', borderRadius: 999, cursor: 'pointer', fontFamily: BLDSTYLE.sans, fontSize: 13,
              }}>{s} →</button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BldCTA() {
  return (
    <section style={{ padding: '180px 32px 140px', textAlign: 'center' }}>
      <div style={{ fontFamily: BLDSTYLE.mono, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: BLDSTYLE.inkDim, marginBottom: 40 }}>◦ Empieza aquí</div>
      <h2 data-reveal style={{
        fontFamily: BLDSTYLE.display, fontSize: 160, lineHeight: 0.9, letterSpacing: -6,
        margin: 0, color: BLDSTYLE.ink, fontWeight: 700,
      }}>
        Una llamada.<br/>
        <span style={{ color: BLDSTYLE.accent, fontStyle: 'italic' }}>30 minutos.</span>
      </h2>
      <div style={{ marginTop: 60, display: 'flex', gap: 16, justifyContent: 'center' }}>
        <button style={{
          background: BLDSTYLE.accent, color: BLDSTYLE.bg, border: 'none',
          padding: '22px 36px', borderRadius: 999, cursor: 'pointer',
          fontFamily: BLDSTYLE.sans, fontSize: 17, fontWeight: 600,
        }}>Agenda gratis →</button>
        <button style={{
          background: 'transparent', color: BLDSTYLE.ink, border: `1px solid ${BLDSTYLE.rule}`,
          padding: '22px 36px', borderRadius: 999, cursor: 'pointer',
          fontFamily: BLDSTYLE.sans, fontSize: 17,
        }}>WhatsApp</button>
      </div>
    </section>
  );
}

function BldFooter() {
  return (
    <footer style={{ padding: '40px 32px', borderTop: `1px solid ${BLDSTYLE.rule}`, display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, fontFamily: BLDSTYLE.sans, fontSize: 13, color: BLDSTYLE.inkDim }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <div style={{ width: 20, height: 20, background: BLDSTYLE.accent, borderRadius: '50%' }} />
          <span style={{ fontWeight: 600, color: BLDSTYLE.ink }}>IA a Domicilio</span>
        </div>
        <div>Guadalajara, MX · 2026</div>
      </div>
      <div><div style={{ color: BLDSTYLE.ink, marginBottom: 8 }}>Servicios</div>Auditoría<br/>Sistemas<br/>Capacitación</div>
      <div><div style={{ color: BLDSTYLE.ink, marginBottom: 8 }}>Conecta</div>LinkedIn<br/>X<br/>Newsletter</div>
      <div><div style={{ color: BLDSTYLE.ink, marginBottom: 8 }}>Contacto</div>hola@iadomicilio.mx<br/>WhatsApp</div>
    </footer>
  );
}

function Dir3Bold() {
  const ref = React.useRef(null);
  const progress = useScrollProgress(ref);
  useReveal(ref);
  return (
    <div ref={ref} style={{
      width: '100%', height: '100%', overflowY: 'auto', overflowX: 'hidden',
      background: BLDSTYLE.bg, color: BLDSTYLE.ink, fontFamily: BLDSTYLE.sans,
    }}>
      <style>{`
        @keyframes bld-scroll { from { transform: translateX(0); } to { transform: translateX(-33.33%); } }
        [data-reveal] { opacity: 0; transform: translateY(28px); transition: opacity 0.9s cubic-bezier(.2,.7,.2,1), transform 0.9s cubic-bezier(.2,.7,.2,1); }
        [data-reveal][data-visible] { opacity: 1; transform: translateY(0); }
      `}</style>
      <BldNav progress={progress} />
      <BldHero progress={progress} />
      <BldMarquee />
      <BldServices />
      <BldBigQuote />
      <BldCases />
      <BldFounder />
      <BldCTA />
      <BldFooter />
    </div>
  );
}

window.Dir3Bold = Dir3Bold;
