// Direction A — Editorial Warm (single-page landing)
// Cream paper, terracotta accent, Instrument Serif + Inter Tight.
// Single-page: Hero → Servicios → Cómo trabajamos → Casos → CTA.
// Concept: "Tu persona de IA" / AI guy on dial. Calm, serviced-focused.

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

function EdNav() {
  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 10, background: EDSTYLE.paper,
      borderBottom: `1px solid ${EDSTYLE.rule}`,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '18px 40px', fontFamily: EDSTYLE.sans, fontSize: 14,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 22, height: 22, borderRadius: '50%', background: EDSTYLE.accent }} />
        <span style={{ fontFamily: EDSTYLE.serif, fontSize: 22, letterSpacing: -0.3, color: EDSTYLE.ink }}>
          IA a Domicilio
        </span>
      </div>
      <nav style={{ display: 'flex', gap: 32, color: EDSTYLE.ink }}>
        <a href="#servicios" style={{ color: 'inherit', textDecoration: 'none' }}>Servicios</a>
        <a href="#proceso" style={{ color: 'inherit', textDecoration: 'none' }}>Cómo trabajamos</a>
        <a href="#casos" style={{ color: 'inherit', textDecoration: 'none' }}>Casos</a>
        <a href="#contacto" style={{ color: 'inherit', textDecoration: 'none' }}>Contacto</a>
      </nav>
      <a href="#contacto" style={{
        background: EDSTYLE.ink, color: EDSTYLE.paper, border: 'none',
        padding: '10px 18px', borderRadius: 999, cursor: 'pointer', textDecoration: 'none',
        fontFamily: 'inherit', fontSize: 13, letterSpacing: 0.1,
      }}>Agenda una consulta →</a>
    </div>
  );
}

function EdHero({ scroll, tweaks = {} }) {
  const y = Math.min(scroll * 0.15, 60);
  const headlineSize = tweaks.heroHeadlineSize || 132;
  const tagline = tweaks.heroTagline || 'Somos tu implementador de IA de confianza. Auditamos, implementamos y capacitamos a tu equipo — sin tecnicismos y sin humo.';
  const emphasis = tweaks.heroEmphasis || 'No te quedes atrás.';
  const ctaPrimary = tweaks.ctaPrimary || 'Agenda tu consulta';
  return (
    <section style={{ padding: '100px 40px 80px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ fontFamily: EDSTYLE.mono, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: EDSTYLE.inkDim, marginBottom: 40 }}>
        ◦ Consultoría en inteligencia artificial · Guadalajara, MX
      </div>
      <h1 style={{
        fontFamily: EDSTYLE.serif, fontSize: headlineSize, lineHeight: 0.95, letterSpacing: -3,
        margin: 0, color: EDSTYLE.ink, fontWeight: 400, transform: `translateY(${-y}px)`,
      }}>
        IA para<br/>
        <span style={{ fontStyle: 'italic', color: EDSTYLE.accent }}>tu negocio.</span>
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 80, marginTop: 72, alignItems: 'end' }}>
        <p style={{ fontFamily: EDSTYLE.sans, fontSize: 22, lineHeight: 1.45, color: EDSTYLE.ink, maxWidth: 560, margin: 0, fontWeight: 400 }}>
          {tagline}
          <span style={{ display: 'block', marginTop: 16, color: EDSTYLE.accent, fontStyle: 'italic' }}>{emphasis}</span>
        </p>

        {/* Refined hero CTA — card style, clear commitment, conversion-focused */}
        <div style={{
          background: EDSTYLE.ink, color: EDSTYLE.paper, padding: 28, borderRadius: 4,
          boxShadow: '0 20px 40px -20px rgba(0,0,0,0.3)',
        }}>
          <div style={{ fontFamily: EDSTYLE.mono, fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', opacity: 0.6, marginBottom: 14 }}>
            ◦ Primera llamada — gratis
          </div>
          <div style={{ fontFamily: EDSTYLE.serif, fontSize: 32, lineHeight: 1.15, marginBottom: 20, letterSpacing: -0.5 }}>
            30 minutos contigo.<br/>
            <span style={{ fontStyle: 'italic', color: EDSTYLE.accent }}>Sales con un plan.</span>
          </div>
          <a href="#contacto" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: EDSTYLE.accent, color: EDSTYLE.paper, textDecoration: 'none',
            padding: '16px 22px', fontFamily: EDSTYLE.sans, fontSize: 16, fontWeight: 500,
            letterSpacing: 0.1, borderRadius: 2,
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

function EdMarquee() {
  const items = ['Chatbots', 'Automatizaciones', 'Agentes', 'Capacitación', 'Auditoría', 'Seguimiento', 'Reportes'];
  return (
    <div style={{
      borderTop: `1px solid ${EDSTYLE.rule}`, borderBottom: `1px solid ${EDSTYLE.rule}`,
      overflow: 'hidden', padding: '22px 0', background: EDSTYLE.paperDim,
    }}>
      <div style={{ display: 'flex', gap: 60, whiteSpace: 'nowrap', animation: 'ed-scroll 30s linear infinite' }}>
        {[...items, ...items, ...items].map((x, i) => (
          <span key={i} style={{ fontFamily: EDSTYLE.serif, fontSize: 28, fontStyle: 'italic', color: EDSTYLE.ink, display: 'inline-flex', alignItems: 'center', gap: 60 }}>
            {x}<span style={{ color: EDSTYLE.accent }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function EdPitch() {
  return (
    <section style={{ padding: '120px 40px', borderBottom: `1px solid ${EDSTYLE.rule}` }}>
      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 60 }}>
        <div style={{ fontFamily: EDSTYLE.mono, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: EDSTYLE.inkDim, paddingTop: 18 }}>◦ La idea</div>
        <div>
          <p style={{ fontFamily: EDSTYLE.serif, fontSize: 56, lineHeight: 1.1, letterSpacing: -1, margin: 0, fontWeight: 400, color: EDSTYLE.ink, maxWidth: 980 }}>
            La mayoría de pymes no necesita <span style={{ fontStyle: 'italic', color: EDSTYLE.accent }}>“transformación digital”</span> —
            necesita a alguien que entienda su operación y sepa qué IA sirve <em>hoy</em>.
          </p>
          <p style={{ fontFamily: EDSTYLE.sans, fontSize: 18, lineHeight: 1.55, color: EDSTYLE.inkDim, margin: '40px 0 0', maxWidth: 680 }}>
            Eso es IA a Domicilio. Llegamos, evaluamos, instalamos y capacitamos — para que tu empresa opere 10x.
          </p>
        </div>
      </div>
    </section>
  );
}

function EdServices() {
  const items = [
    { n: '01', t: 'Auditoría de IA', d: 'Revisamos tu operación y detectamos dónde la inteligencia artificial genera más valor — antes de tocar una sola herramienta.', time: '1–2 semanas' },
    { n: '02', t: 'Implementación', d: 'Diseñamos, configuramos y conectamos sistemas de IA al corazón de tu negocio. No nos vamos hasta que funcionan en producción.', time: '4–8 semanas' },
    { n: '03', t: 'Capacitación', d: 'Entrenamos a tu equipo para usar IA con criterio, a su ritmo. El conocimiento se queda en tu empresa.', time: '2–4 semanas' },
    { n: '04', t: 'Seguimiento continuo', d: 'Monitoreo, reportes y mejoras mes a mes. Tu equipo de IA sigue iterando contigo después del lanzamiento.', time: 'mensual' },
  ];
  return (
    <section id="servicios" style={{ padding: '140px 40px 60px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 60, marginBottom: 80 }}>
        <div style={{ fontFamily: EDSTYLE.mono, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: EDSTYLE.inkDim, paddingTop: 8 }}>§ Servicios</div>
        <h2 style={{ fontFamily: EDSTYLE.serif, fontSize: 72, lineHeight: 1, letterSpacing: -1.5, margin: 0, color: EDSTYLE.ink, fontWeight: 400, maxWidth: 880 }}>
          Cuatro formas de trabajar juntos. <span style={{ fontStyle: 'italic', color: EDSTYLE.inkDim }}>Escoge la que te quede.</span>
        </h2>
      </div>
      <div>
        {items.map((s, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '80px 1fr 1fr 180px', gap: 40,
            padding: '40px 0', borderTop: `1px solid ${EDSTYLE.rule}`, alignItems: 'baseline',
          }}>
            <div style={{ fontFamily: EDSTYLE.mono, fontSize: 13, color: EDSTYLE.inkDim }}>{s.n}</div>
            <div>
              <div style={{ fontFamily: EDSTYLE.serif, fontSize: 40, lineHeight: 1.05, color: EDSTYLE.ink, letterSpacing: -0.8 }}>{s.t}</div>
              <div style={{ fontFamily: EDSTYLE.mono, fontSize: 11, color: EDSTYLE.inkDim, marginTop: 8, letterSpacing: 1, textTransform: 'uppercase' }}>{s.time}</div>
            </div>
            <p style={{ fontFamily: EDSTYLE.sans, fontSize: 16, lineHeight: 1.55, color: EDSTYLE.ink, margin: 0, maxWidth: 420 }}>{s.d}</p>
            <a href="#contacto" style={{ textAlign: 'right', fontFamily: EDSTYLE.sans, fontSize: 13, color: EDSTYLE.accent, textDecoration: 'none' }}>Hablemos de esto →</a>
          </div>
        ))}
      </div>
    </section>
  );
}

function EdProcess() {
  const steps = [
    { n: 'I', t: 'Llamada', d: '30 min. Entendemos tu operación y qué duele.' },
    { n: 'II', t: 'Diagnóstico', d: 'Mapa de oportunidades con ROI estimado.' },
    { n: 'III', t: 'Plan', d: 'Qué, cuándo, cuánto, y qué queda por escrito.' },
    { n: 'IV', t: 'Implementación', d: 'Construimos, probamos, conectamos.' },
    { n: 'V', t: 'Entrega', d: 'Capacitación, playbooks y seguimiento continuo.' },
  ];
  return (
    <section id="proceso" style={{ padding: '120px 40px', background: EDSTYLE.paperDim, borderTop: `1px solid ${EDSTYLE.rule}`, borderBottom: `1px solid ${EDSTYLE.rule}` }}>
      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 60, marginBottom: 64 }}>
        <div style={{ fontFamily: EDSTYLE.mono, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: EDSTYLE.inkDim, paddingTop: 8 }}>§ Cómo trabajamos</div>
        <h2 style={{ fontFamily: EDSTYLE.serif, fontSize: 64, lineHeight: 1, letterSpacing: -1.4, margin: 0, color: EDSTYLE.ink, fontWeight: 400 }}>
          Cinco pasos, <span style={{ fontStyle: 'italic' }}>sin sorpresas.</span>
        </h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 24 }}>
        {steps.map((s, i) => (
          <div key={i} style={{ borderTop: `1px solid ${EDSTYLE.ink}`, paddingTop: 20 }}>
            <div style={{ fontFamily: EDSTYLE.serif, fontSize: 52, lineHeight: 1, color: EDSTYLE.accent, fontStyle: 'italic', marginBottom: 14 }}>{s.n}</div>
            <div style={{ fontFamily: EDSTYLE.serif, fontSize: 26, lineHeight: 1.1, color: EDSTYLE.ink, marginBottom: 10 }}>{s.t}</div>
            <div style={{ fontFamily: EDSTYLE.sans, fontSize: 14, lineHeight: 1.5, color: EDSTYLE.inkDim }}>{s.d}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function EdCases() {
  // Horizontal-row layout: big number left, context right. Reads as an editorial
  // index of recent work, not as heavy individual cards.
  const cases = [
    { tag: 'Chatbot de ventas', co: 'Distribuidora · GDL', result: '+38%', label: 'leads calificados', detail: 'Atención 24/7 en WhatsApp, canalización automática al equipo comercial.' },
    { tag: 'Agente de voz · soporte', co: 'Aseguradora regional', result: '−62%', label: 'tiempo de espera', detail: 'Agente de voz que resuelve consultas de primer nivel y escala lo complejo.' },
    { tag: 'Capacitación', co: 'Grupo restaurantero', result: '14 líderes', label: 'operando con IA', detail: 'Cuatro talleres a gerentes y supervisores — prompts, herramientas, criterio.' },
  ];
  return (
    <section id="casos" style={{ padding: '140px 40px', borderTop: `1px solid ${EDSTYLE.rule}` }}>
      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 60, marginBottom: 40 }}>
        <div style={{ fontFamily: EDSTYLE.mono, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: EDSTYLE.inkDim, paddingTop: 18 }}>§ Casos recientes</div>
        <h2 style={{ fontFamily: EDSTYLE.serif, fontSize: 64, letterSpacing: -1.4, margin: 0, fontWeight: 400, color: EDSTYLE.ink }}>
          Lo que hemos <span style={{ fontStyle: 'italic' }}>hecho.</span>
        </h2>
      </div>
      <div>
        {cases.map((c, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '220px 280px 1fr 160px', gap: 40,
            padding: '36px 0', borderTop: `1px solid ${EDSTYLE.rule}`, alignItems: 'center',
          }}>
            <div>
              <div style={{ fontFamily: EDSTYLE.mono, fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', color: EDSTYLE.accent, marginBottom: 6 }}>{c.tag}</div>
              <div style={{ fontFamily: EDSTYLE.sans, fontSize: 14, color: EDSTYLE.inkDim }}>{c.co}</div>
            </div>
            <div>
              <div style={{ fontFamily: EDSTYLE.serif, fontSize: 72, lineHeight: 0.9, color: EDSTYLE.ink, letterSpacing: -2, fontWeight: 400 }}>{c.result}</div>
              <div style={{ fontFamily: EDSTYLE.sans, fontSize: 14, color: EDSTYLE.ink, marginTop: 6 }}>{c.label}</div>
            </div>
            <p style={{ fontFamily: EDSTYLE.sans, fontSize: 15, lineHeight: 1.55, color: EDSTYLE.ink, margin: 0, maxWidth: 480 }}>{c.detail}</p>
            <a href="#contacto" style={{ textAlign: 'right', fontFamily: EDSTYLE.sans, fontSize: 13, color: EDSTYLE.accent, textDecoration: 'none' }}>Ver caso →</a>
          </div>
        ))}
      </div>
    </section>
  );
}

function EdFAQ() {
  const qs = [
    { q: '¿Qué tan rápido se ven resultados?', a: 'La auditoría entrega valor en 2 semanas. Un chatbot sencillo puede estar vivo en 3–4 semanas. Los sistemas grandes, 2 meses.' },
    { q: '¿Necesito tener "data" organizada?', a: 'No. Parte del trabajo es ayudarte a preparar lo que tengas. Funcionamos con lo que hay.' },
    { q: '¿Trabajas con empresas fuera de Guadalajara?', a: 'Sí, toda la República. La mayoría del trabajo es remoto; visitamos cuando hace sentido.' },
    { q: '¿Qué pasa si ya contratamos a alguien más?', a: 'Podemos auditar lo que tengas montado y darte una segunda opinión. Sin agenda oculta.' },
  ];
  return (
    <section style={{ padding: '120px 40px', background: EDSTYLE.paperDim, borderTop: `1px solid ${EDSTYLE.rule}` }}>
      <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 80 }}>
        <div>
          <div style={{ fontFamily: EDSTYLE.mono, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: EDSTYLE.inkDim, marginBottom: 20 }}>§ Dudas frecuentes</div>
          <h2 style={{ fontFamily: EDSTYLE.serif, fontSize: 56, lineHeight: 1, letterSpacing: -1.2, margin: 0, fontWeight: 400, color: EDSTYLE.ink }}>
            Lo que suelen <span style={{ fontStyle: 'italic' }}>preguntar.</span>
          </h2>
        </div>
        <div>
          {qs.map((x, i) => (
            <div key={i} style={{ padding: '28px 0', borderTop: `1px solid ${EDSTYLE.rule}` }}>
              <div style={{ fontFamily: EDSTYLE.serif, fontSize: 28, color: EDSTYLE.ink, marginBottom: 10, letterSpacing: -0.4 }}>{x.q}</div>
              <div style={{ fontFamily: EDSTYLE.sans, fontSize: 16, lineHeight: 1.6, color: EDSTYLE.inkDim, maxWidth: 620 }}>{x.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EdContactForm() {
  const [data, setData] = React.useState({ name: '', company: '', email: '', phone: '', message: '' });
  const [sent, setSent] = React.useState(false);
  const set = (k) => (e) => setData({ ...data, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    // Opens the user's mail client with the form data pre-filled.
    // Zero backend needed — perfect for static deploys.
    const subject = encodeURIComponent(`Consulta de ${data.name || 'sitio web'}`);
    const body = encodeURIComponent(
      `Nombre: ${data.name}\nEmpresa: ${data.company}\nEmail: ${data.email}\nTeléfono: ${data.phone}\n\nMensaje:\n${data.message}`
    );
    window.location.href = `mailto:Saul.lo.es@outlook.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const fieldStyle = {
    background: 'rgba(244,240,232,0.06)', border: '1px solid rgba(244,240,232,0.15)',
    color: EDSTYLE.paper, padding: '14px 16px', fontFamily: EDSTYLE.sans, fontSize: 15,
    borderRadius: 2, width: '100%', outline: 'none',
  };

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <style>{`
        .ed-field::placeholder { color: rgba(244,240,232,0.4); }
        .ed-field:focus { border-color: var(--ed-accent, #C8491E) !important; }
      `}</style>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <input className="ed-field" required placeholder="Nombre" value={data.name} onChange={set('name')} style={fieldStyle} />
        <input className="ed-field" placeholder="Empresa" value={data.company} onChange={set('company')} style={fieldStyle} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <input className="ed-field" type="email" required placeholder="Email" value={data.email} onChange={set('email')} style={fieldStyle} />
        <input className="ed-field" type="tel" placeholder="Teléfono" value={data.phone} onChange={set('phone')} style={fieldStyle} />
      </div>
      <textarea className="ed-field" required placeholder="Cuéntame brevemente sobre tu empresa y qué buscas" rows={4} value={data.message} onChange={set('message')} style={{ ...fieldStyle, resize: 'vertical', fontFamily: EDSTYLE.sans }} />
      <button type="submit" style={{
        background: EDSTYLE.accent, color: EDSTYLE.paper, border: 'none',
        padding: '18px 24px', fontFamily: EDSTYLE.sans, fontSize: 16, fontWeight: 500,
        cursor: 'pointer', borderRadius: 2, marginTop: 6,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {sent ? '¡Enviado! Revisa tu cliente de correo' : 'Enviar mensaje'}
        <span style={{ fontSize: 20 }}>→</span>
      </button>
    </form>
  );
}

function EdCTA() {
  const waMsg = encodeURIComponent('Hola Saúl, vi el sitio de IA a Domicilio y me gustaría agendar una consulta.');
  return (
    <section id="contacto" style={{ padding: '140px 40px 120px', background: EDSTYLE.ink, color: EDSTYLE.paper, position: 'relative', overflow: 'hidden' }}>
      <div style={{ fontFamily: EDSTYLE.mono, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', opacity: 0.6, marginBottom: 32 }}>◦ Empieza aquí</div>
      <h2 style={{
        fontFamily: EDSTYLE.serif, fontSize: 112, lineHeight: 0.95, letterSpacing: -3,
        margin: 0, fontWeight: 400, maxWidth: 1100,
      }}>
        Una llamada <span style={{ fontStyle: 'italic', color: EDSTYLE.accent }}>de 30 minutos</span> y sabes qué sigue.
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 80, marginTop: 72, alignItems: 'start' }}>
        <div>
          <p style={{ fontFamily: EDSTYLE.sans, fontSize: 19, lineHeight: 1.55, maxWidth: 480, margin: '0 0 40px', opacity: 0.85 }}>
            Sin presentación de ventas. Te escuchamos, te decimos qué haríamos nosotros, y decidimos si tiene sentido trabajar juntos.
          </p>

          <a href={`https://wa.me/5212298503858?text=${waMsg}`} target="_blank" rel="noopener" style={{
            background: EDSTYLE.accent, color: EDSTYLE.paper, textDecoration: 'none',
            padding: '20px 26px', fontFamily: EDSTYLE.sans, fontSize: 17, fontWeight: 500,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            borderRadius: 2, marginBottom: 28,
          }}>
            Escríbenos por WhatsApp — lo más rápido <span style={{ fontSize: 22 }}>→</span>
          </a>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontFamily: EDSTYLE.sans, fontSize: 14, opacity: 0.75 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 10, borderBottom: '1px solid rgba(244,240,232,0.12)' }}>
              <span style={{ opacity: 0.7 }}>Teléfono / WhatsApp</span>
              <a href="tel:+5212298503858" style={{ color: EDSTYLE.paper, textDecoration: 'none' }}>229 850 3858</a>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 10, borderBottom: '1px solid rgba(244,240,232,0.12)' }}>
              <span style={{ opacity: 0.7 }}>Email</span>
              <a href="mailto:Saul.lo.es@outlook.com" style={{ color: EDSTYLE.paper, textDecoration: 'none' }}>Saul.lo.es@outlook.com</a>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ opacity: 0.7 }}>Base</span>
              <span>Guadalajara, MX</span>
            </div>
          </div>
        </div>

        <div>
          <div style={{ fontFamily: EDSTYLE.mono, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', opacity: 0.5, marginBottom: 16 }}>· o escríbenos</div>
          <EdContactForm />
        </div>
      </div>
    </section>
  );
}

function EdFooter() {
  return (
    <footer style={{ padding: '50px 40px 40px', background: EDSTYLE.ink, color: 'rgba(244,240,232,0.55)', borderTop: `1px solid rgba(244,240,232,0.1)`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: EDSTYLE.sans, fontSize: 13, flexWrap: 'wrap', gap: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 18, height: 18, borderRadius: '50%', background: EDSTYLE.accent }} />
        <span style={{ fontFamily: EDSTYLE.serif, fontSize: 20, color: EDSTYLE.paper }}>IA a Domicilio</span>
      </div>
      <div>Guadalajara, Jalisco · MX</div>
      <a href="mailto:Saul.lo.es@outlook.com" style={{ color: 'inherit', textDecoration: 'none' }}>Saul.lo.es@outlook.com</a>
      <a href="tel:+5212298503858" style={{ color: 'inherit', textDecoration: 'none' }}>229 850 3858</a>
      <div style={{ fontFamily: EDSTYLE.mono, fontSize: 11 }}>MMXXVI</div>
    </footer>
  );
}

function Dir1Editorial({ tweaks = {} }) {
  const scrollRef = React.useRef(null);
  const [scroll, setScroll] = React.useState(0);
  const cssVars = {
    '--ed-paper': tweaks.paper || '#F4F0E8',
    '--ed-ink': tweaks.ink || '#1A1714',
    '--ed-accent': tweaks.accent || '#C8491E',
    '--ed-serif': tweaks.serif ? `"${tweaks.serif}"` : '"Instrument Serif"',
  };
  return (
    <div ref={scrollRef}
      onScroll={(e) => setScroll(e.currentTarget.scrollTop)}
      style={{ width: '100%', height: '100%', overflowY: 'auto', overflowX: 'hidden',
        background: EDSTYLE.paper, color: EDSTYLE.ink, fontFamily: EDSTYLE.sans,
        ...cssVars,
      }}>
      <style>{`
        @keyframes ed-scroll { from { transform: translateX(0); } to { transform: translateX(-33.33%); } }
      `}</style>
      <EdNav />
      <EdHero scroll={scroll} tweaks={tweaks} />
      {tweaks.showMarquee !== false && <EdMarquee />}
      <EdPitch />
      <EdServices />
      <EdProcess />
      <EdCases />
      <EdFAQ />
      <EdCTA />
      <EdFooter />
    </div>
  );
}

window.Dir1Editorial = Dir1Editorial;
