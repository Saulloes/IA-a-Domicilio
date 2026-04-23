// Direction 2 — Technical Label
// Teenage Engineering DNA: labels everywhere, numbered sections, visible grid,
// monospace annotations, one electric accent. Off-white + matte black.
// Reads like a product manual for AI.

const TECSTYLE = {
  bg: '#EDEBE6',
  panel: '#FFFFFF',
  ink: '#121212',
  inkDim: '#757471',
  accent: '#FF4D1F',
  accent2: '#1D50FF',
  rule: '#121212',
  ruleFaint: 'rgba(18,18,18,0.18)',
  mono: '"JetBrains Mono", ui-monospace, "SF Mono", monospace',
  sans: '"Inter Tight", -apple-system, system-ui, sans-serif',
};

function TecLabel({ n, children, color }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8, padding: '3px 8px',
      background: color || TECSTYLE.ink, color: TECSTYLE.panel,
      fontFamily: TECSTYLE.mono, fontSize: 10, letterSpacing: 1, textTransform: 'uppercase',
    }}>
      {n && <span style={{ opacity: 0.6 }}>{n}</span>}{children}
    </div>
  );
}

function TecNav() {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center',
      padding: '14px 24px', borderBottom: `1px solid ${TECSTYLE.ink}`,
      fontFamily: TECSTYLE.mono, fontSize: 11, letterSpacing: 1, textTransform: 'uppercase',
      background: TECSTYLE.bg, position: 'sticky', top: 0, zIndex: 10,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 16, height: 16, background: TECSTYLE.accent, borderRadius: 2 }} />
        <span style={{ fontWeight: 700 }}>IA_DOMICILIO</span>
        <span style={{ color: TECSTYLE.inkDim }}>v.0.1</span>
      </div>
      <nav style={{ display: 'flex', gap: 28 }}>
        <span>01 · SERVICIOS</span>
        <span>02 · CASOS</span>
        <span>03 · NOSOTROS</span>
        <span>04 · DIARIO</span>
      </nav>
      <div style={{ justifySelf: 'end', display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ color: TECSTYLE.inkDim }}>GDL 21°C</span>
        <button style={{
          background: TECSTYLE.ink, color: TECSTYLE.panel, border: 'none',
          padding: '8px 14px', fontFamily: TECSTYLE.mono, fontSize: 10, letterSpacing: 1, textTransform: 'uppercase', cursor: 'pointer',
        }}>CONTACT ▸</button>
      </div>
    </div>
  );
}

function TecHero() {
  return (
    <section style={{ padding: '0 0 0 0', borderBottom: `1px solid ${TECSTYLE.ink}`, position: 'relative' }}>
      {/* Top annotation strip */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        padding: '10px 24px', borderBottom: `1px solid ${TECSTYLE.ruleFaint}`,
        fontFamily: TECSTYLE.mono, fontSize: 10, letterSpacing: 1, color: TECSTYLE.inkDim, textTransform: 'uppercase',
      }}>
        <span>◦ FIG. 01 — HOME</span>
        <span>GUADALAJARA · JAL · MX</span>
        <span>ESTABLECIDO 2026</span>
        <span>AI / ML / AGENTS</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', borderBottom: `1px solid ${TECSTYLE.ink}` }}>
        <div style={{ padding: '80px 40px 60px', borderRight: `1px solid ${TECSTYLE.ink}`, position: 'relative' }}>
          <div style={{ position: 'absolute', top: 20, left: 40 }}>
            <TecLabel n="A">PRODUCT</TecLabel>
          </div>
          <h1 style={{
            fontFamily: TECSTYLE.sans, fontSize: 180, lineHeight: 0.88, letterSpacing: -6,
            margin: '40px 0 0', color: TECSTYLE.ink, fontWeight: 800,
          }}>
            IA<br/>para tu<br/>
            <span style={{ color: TECSTYLE.accent }}>negocio.</span>
          </h1>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginTop: 56 }}>
            <button style={{
              background: TECSTYLE.ink, color: TECSTYLE.panel, border: 'none',
              padding: '16px 24px', fontFamily: TECSTYLE.mono, fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase', cursor: 'pointer',
              borderRadius: 2,
            }}>▸ AGENDA CONSULTA</button>
            <span style={{ fontFamily: TECSTYLE.mono, fontSize: 11, color: TECSTYLE.inkDim, letterSpacing: 1, textTransform: 'uppercase' }}>
              30 MIN · GRATIS
            </span>
          </div>
        </div>

        {/* Side spec panel */}
        <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 0, background: TECSTYLE.panel }}>
          <div style={{ fontFamily: TECSTYLE.mono, fontSize: 10, letterSpacing: 1.5, color: TECSTYLE.inkDim, textTransform: 'uppercase', marginBottom: 16 }}>SPEC / OPERATOR</div>
          {[
            ['OPERADOR', 'S. RAMÍREZ'],
            ['BASE', 'GDL / JAL'],
            ['SECTOR', 'PYMES 10–50'],
            ['STACK', 'LLM · RAG · AGT'],
            ['IDIOMA', 'ES / EN'],
            ['DISPONIB.', 'L–V · 9–18h'],
          ].map(([k, v], i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between',
              padding: '10px 0', borderBottom: `1px solid ${TECSTYLE.ruleFaint}`,
              fontFamily: TECSTYLE.mono, fontSize: 11, letterSpacing: 0.5,
            }}>
              <span style={{ color: TECSTYLE.inkDim }}>{k}</span>
              <span style={{ color: TECSTYLE.ink, fontWeight: 600 }}>{v}</span>
            </div>
          ))}
          <div style={{ marginTop: 20, padding: 16, background: TECSTYLE.bg, border: `1px solid ${TECSTYLE.ink}` }}>
            <div style={{ fontFamily: TECSTYLE.mono, fontSize: 10, letterSpacing: 1, color: TECSTYLE.inkDim, textTransform: 'uppercase', marginBottom: 6 }}>◦ NOTA</div>
            <div style={{ fontFamily: TECSTYLE.sans, fontSize: 13, lineHeight: 1.4, color: TECSTYLE.ink }}>
              Sin humo. Sin NDAs de 40 páginas. IA que sirve o te devuelvo la llamada.
            </div>
          </div>
        </div>
      </div>

      {/* Subtitle row */}
      <div style={{ padding: '24px 40px', display: 'grid', gridTemplateColumns: '100px 1fr auto', gap: 40, alignItems: 'baseline' }}>
        <span style={{ fontFamily: TECSTYLE.mono, fontSize: 10, color: TECSTYLE.inkDim, letterSpacing: 1.5, textTransform: 'uppercase' }}>◦ RESUMEN</span>
        <p style={{ margin: 0, fontFamily: TECSTYLE.sans, fontSize: 20, lineHeight: 1.4, color: TECSTYLE.ink, maxWidth: 760 }}>
          Implementamos y enseñamos IA a empresas medianas en México. Auditoría, sistemas, capacitación, solucionador de cabecera. Sin jerga.
        </p>
        <span style={{ fontFamily: TECSTYLE.mono, fontSize: 10, color: TECSTYLE.inkDim, letterSpacing: 1.5, textTransform: 'uppercase' }}>↓ SCROLL</span>
      </div>
    </section>
  );
}

function TecServices() {
  const services = [
    { id: '01', code: 'AUD', name: 'AUDITORÍA IA', time: '~2 sem', color: TECSTYLE.accent, d: 'Revisión de flujos, data y equipo. Mapa de oportunidades priorizado por ROI.' },
    { id: '02', code: 'SYS', name: 'SISTEMAS', time: '~6 sem', color: TECSTYLE.accent2, d: 'Chatbots, agentes, automatizaciones. Conectados a tus herramientas, probados en producción.' },
    { id: '03', code: 'TRN', name: 'CAPACITACIÓN', time: '~4 sem', color: TECSTYLE.ink, d: 'Talleres a tu equipo. De CEO a becario. Protocolos, prompts, criterio.' },
    { id: '04', code: 'RTN', name: 'RETAINER', time: 'mensual', color: TECSTYLE.accent, d: 'Tu consultor en IA en modo “de cabecera”. Respuesta en el día, iteración continua.' },
  ];
  return (
    <section style={{ borderBottom: `1px solid ${TECSTYLE.ink}` }}>
      <div style={{ padding: '16px 24px', borderBottom: `1px solid ${TECSTYLE.ink}`, background: TECSTYLE.ink, color: TECSTYLE.panel, display: 'flex', justifyContent: 'space-between', fontFamily: TECSTYLE.mono, fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase' }}>
        <span>§ 01 · SERVICIOS</span><span>4 UNIDADES</span><span>DISPONIBLES</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
        {services.map((s, i) => (
          <div key={i} style={{
            padding: 32, borderRight: i % 2 === 0 ? `1px solid ${TECSTYLE.ink}` : 'none',
            borderBottom: i < 2 ? `1px solid ${TECSTYLE.ink}` : 'none',
            position: 'relative', background: TECSTYLE.panel, minHeight: 320,
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 40 }}>
                <TecLabel n={s.id} color={s.color}>{s.code}</TecLabel>
                <span style={{ fontFamily: TECSTYLE.mono, fontSize: 10, color: TECSTYLE.inkDim, letterSpacing: 1, textTransform: 'uppercase' }}>{s.time}</span>
              </div>
              <h3 style={{ fontFamily: TECSTYLE.sans, fontSize: 56, lineHeight: 0.95, letterSpacing: -1.5, fontWeight: 800, margin: 0, color: TECSTYLE.ink }}>{s.name}</h3>
              <p style={{ fontFamily: TECSTYLE.sans, fontSize: 15, lineHeight: 1.5, color: TECSTYLE.ink, marginTop: 20, maxWidth: 360 }}>{s.d}</p>
            </div>
            <div style={{ fontFamily: TECSTYLE.mono, fontSize: 11, color: TECSTYLE.ink, letterSpacing: 1, textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between' }}>
              <span>▸ VER DETALLE</span>
              <span style={{ color: TECSTYLE.inkDim }}>CÓD. {s.code}-{i+1}01</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TecMetrics() {
  return (
    <section style={{ padding: '64px 24px', borderBottom: `1px solid ${TECSTYLE.ink}`, background: TECSTYLE.ink, color: TECSTYLE.panel }}>
      <div style={{ fontFamily: TECSTYLE.mono, fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 40 }}>§ 02 · CASOS / MÉTRICAS</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40 }}>
        {[
          { n: '+38%', label: 'LEADS CALIFICADOS', sub: 'CHATBOT · DISTRIBUIDORA GDL' },
          { n: '−4h', label: 'DÍA EN RECEPCIÓN', sub: 'AGENTE WHATSAPP · CLÍNICA' },
          { n: '12×', label: 'USUARIOS ACTIVOS', sub: 'CAPACITACIÓN · DESPACHO LEGAL' },
        ].map((m, i) => (
          <div key={i} style={{ borderLeft: `2px solid ${TECSTYLE.accent}`, paddingLeft: 20 }}>
            <div style={{ fontFamily: TECSTYLE.sans, fontSize: 120, lineHeight: 1, fontWeight: 800, letterSpacing: -3, color: TECSTYLE.panel }}>{m.n}</div>
            <div style={{ fontFamily: TECSTYLE.mono, fontSize: 11, letterSpacing: 1.5, marginTop: 12, color: TECSTYLE.panel }}>{m.label}</div>
            <div style={{ fontFamily: TECSTYLE.mono, fontSize: 10, letterSpacing: 1, marginTop: 4, color: 'rgba(255,255,255,0.5)' }}>{m.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TecFounder() {
  return (
    <section style={{ borderBottom: `1px solid ${TECSTYLE.ink}`, background: TECSTYLE.panel }}>
      <div style={{ padding: '16px 24px', borderBottom: `1px solid ${TECSTYLE.ink}`, background: TECSTYLE.ink, color: TECSTYLE.panel, display: 'flex', justifyContent: 'space-between', fontFamily: TECSTYLE.mono, fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase' }}>
        <span>§ 03 · OPERADOR</span><span>CONSTRUYENDO EN PÚBLICO</span><span>FIG. 02</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr' }}>
        <div style={{
          borderRight: `1px solid ${TECSTYLE.ink}`,
          background: `repeating-linear-gradient(135deg, ${TECSTYLE.bg}, ${TECSTYLE.bg} 10px, ${TECSTYLE.panel} 10px, ${TECSTYLE.panel} 20px)`,
          aspectRatio: '3/4', display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: TECSTYLE.inkDim, fontFamily: TECSTYLE.mono, fontSize: 11, letterSpacing: 1,
        }}>[ RETRATO · FIG. 02 ]</div>
        <div style={{ padding: 40, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <TecLabel>SAÚL · 24 · FUNDADOR</TecLabel>
            <h3 style={{ fontFamily: TECSTYLE.sans, fontSize: 48, lineHeight: 1.1, letterSpacing: -1, fontWeight: 700, margin: '24px 0 20px', color: TECSTYLE.ink }}>
              Aprendí IA en semanas. Ahora la instalo.
            </h3>
            <p style={{ fontFamily: TECSTYLE.sans, fontSize: 16, lineHeight: 1.55, color: TECSTYLE.ink, maxWidth: 520 }}>
              Usé ChatGPT por curiosidad desde 2022. Hace pocas semanas descubrí la capa nueva
              de herramientas — agentes, automatizaciones reales — y me volví obsesivo. Hoy
              construyo chatbots para empresas medianas. Documento todo en público.
            </p>
          </div>
          <div style={{ marginTop: 40, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, border: `1px solid ${TECSTYLE.ink}` }}>
            {[
              ['NEWSLETTER', '→'],
              ['LINKEDIN', '→'],
              ['X / TWITTER', '→'],
            ].map(([k, v], i) => (
              <div key={i} style={{ padding: '14px 18px', borderRight: i < 2 ? `1px solid ${TECSTYLE.ink}` : 'none', display: 'flex', justifyContent: 'space-between', fontFamily: TECSTYLE.mono, fontSize: 11, letterSpacing: 1, textTransform: 'uppercase' }}>
                <span>{k}</span><span>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TecCTA() {
  return (
    <section style={{ padding: '100px 40px', background: TECSTYLE.accent, color: TECSTYLE.ink, borderBottom: `1px solid ${TECSTYLE.ink}`, position: 'relative' }}>
      <div style={{ position: 'absolute', top: 16, left: 24, fontFamily: TECSTYLE.mono, fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase' }}>§ 04 · CONTACT</div>
      <div style={{ position: 'absolute', top: 16, right: 24, fontFamily: TECSTYLE.mono, fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase' }}>[PULSA] ▸</div>
      <h2 style={{ fontFamily: TECSTYLE.sans, fontSize: 148, lineHeight: 0.9, letterSpacing: -5, fontWeight: 800, margin: '20px 0 0' }}>
        AGENDA<br/>UNA LLAMADA.
      </h2>
      <div style={{ marginTop: 40, display: 'flex', gap: 16 }}>
        <button style={{
          background: TECSTYLE.ink, color: TECSTYLE.panel, border: 'none',
          padding: '20px 32px', fontFamily: TECSTYLE.mono, fontSize: 13, letterSpacing: 1.5, textTransform: 'uppercase', cursor: 'pointer',
        }}>▸ RESERVAR 30 MIN</button>
        <button style={{
          background: 'transparent', color: TECSTYLE.ink, border: `2px solid ${TECSTYLE.ink}`,
          padding: '20px 32px', fontFamily: TECSTYLE.mono, fontSize: 13, letterSpacing: 1.5, textTransform: 'uppercase', cursor: 'pointer',
        }}>WHATSAPP ▸</button>
      </div>
    </section>
  );
}

function TecFooter() {
  return (
    <footer style={{ padding: '30px 24px', background: TECSTYLE.ink, color: TECSTYLE.panel, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, fontFamily: TECSTYLE.mono, fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase' }}>
      <div>IA_DOMICILIO · v.0.1</div>
      <div>GUADALAJARA / JAL / MX</div>
      <div>HOLA@IADOMICILIO.MX</div>
      <div style={{ textAlign: 'right' }}>© MMXXVI · ALL RIGHTS RES.</div>
    </footer>
  );
}

function Dir2Technical() {
  return (
    <div style={{
      width: '100%', height: '100%', overflowY: 'auto', overflowX: 'hidden',
      background: TECSTYLE.bg, color: TECSTYLE.ink, fontFamily: TECSTYLE.sans,
    }}>
      <TecNav />
      <TecHero />
      <TecServices />
      <TecMetrics />
      <TecFounder />
      <TecCTA />
      <TecFooter />
    </div>
  );
}

window.Dir2Technical = Dir2Technical;
