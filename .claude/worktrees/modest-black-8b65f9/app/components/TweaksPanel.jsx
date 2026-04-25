'use client';

export default function TweaksPanel({ tweaks, setTweaks, onClose }) {
  const row = { display: 'grid', gridTemplateColumns: '110px 1fr', gap: 12, alignItems: 'center', marginBottom: 12 };
  const labelS = { fontSize: 11, color: '#8a8680', letterSpacing: 0.5, textTransform: 'uppercase', fontFamily: 'JetBrains Mono, monospace' };
  const inputS = { padding: '6px 8px', border: '1px solid rgba(0,0,0,0.15)', borderRadius: 4, background: '#fff', fontFamily: 'Inter Tight, system-ui', fontSize: 13 };
  const set = (k) => (v) => setTweaks({ ...tweaks, [k]: v });

  return (
    <div style={{
      position: 'fixed', bottom: 20, right: 20, zIndex: 9999,
      width: 340, background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(8px)',
      border: '1px solid rgba(0,0,0,0.1)', borderRadius: 10,
      boxShadow: '0 20px 60px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.08)',
      padding: 18, fontFamily: 'Inter Tight, system-ui', color: '#1A1714',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
        <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: 22 }}>Tweaks</div>
        <button onClick={onClose} style={{ background: 'transparent', border: 'none', fontSize: 20, cursor: 'pointer', color: '#6a615a', lineHeight: 1 }}>×</button>
      </div>

      <div style={{ ...labelS, marginBottom: 8 }}>◦ Color</div>
      <div style={row}>
        <span style={{ fontSize: 12 }}>Papel</span>
        <input type="color" value={tweaks.paper} onChange={(e) => set('paper')(e.target.value)} style={{ width: '100%', height: 28, border: 'none', cursor: 'pointer' }} />
      </div>
      <div style={row}>
        <span style={{ fontSize: 12 }}>Tinta</span>
        <input type="color" value={tweaks.ink} onChange={(e) => set('ink')(e.target.value)} style={{ width: '100%', height: 28, border: 'none', cursor: 'pointer' }} />
      </div>
      <div style={row}>
        <span style={{ fontSize: 12 }}>Acento</span>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <input type="color" value={tweaks.accent} onChange={(e) => set('accent')(e.target.value)} style={{ width: 36, height: 28, border: 'none', cursor: 'pointer' }} />
          <div style={{ display: 'flex', gap: 4 }}>
            {['#C8491E', '#1F5C47', '#7A3B2E', '#1A1714', '#3B5BDB'].map((c) => (
              <button key={c} onClick={() => set('accent')(c)} style={{ width: 20, height: 20, border: tweaks.accent === c ? '2px solid #1A1714' : '1px solid rgba(0,0,0,0.2)', borderRadius: '50%', background: c, cursor: 'pointer', padding: 0 }} />
            ))}
          </div>
        </div>
      </div>

      <div style={{ ...labelS, margin: '18px 0 8px' }}>◦ Tipografía display</div>
      <div style={row}>
        <span style={{ fontSize: 12 }}>Fuente serif</span>
        <select value={tweaks.serif} onChange={(e) => set('serif')(e.target.value)} style={inputS}>
          <option>Instrument Serif</option>
          <option>Fraunces</option>
          <option>Georgia</option>
        </select>
      </div>
      <div style={row}>
        <span style={{ fontSize: 12 }}>Tamaño título</span>
        <input type="range" min="80" max="180" value={tweaks.heroHeadlineSize} onChange={(e) => set('heroHeadlineSize')(+e.target.value)} />
      </div>

      <div style={{ ...labelS, margin: '18px 0 8px' }}>◦ Copy del hero</div>
      <div style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 11, color: '#6a615a', marginBottom: 4 }}>Descripción</div>
        <textarea value={tweaks.heroTagline} onChange={(e) => set('heroTagline')(e.target.value)} style={{ ...inputS, width: '100%', minHeight: 64, resize: 'vertical', fontFamily: 'Inter Tight, system-ui' }} />
      </div>
      <div style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 11, color: '#6a615a', marginBottom: 4 }}>Énfasis (acento)</div>
        <input value={tweaks.heroEmphasis} onChange={(e) => set('heroEmphasis')(e.target.value)} style={{ ...inputS, width: '100%' }} />
      </div>
      <div style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 11, color: '#6a615a', marginBottom: 4 }}>Texto del CTA</div>
        <input value={tweaks.ctaPrimary} onChange={(e) => set('ctaPrimary')(e.target.value)} style={{ ...inputS, width: '100%' }} />
      </div>

      <div style={{ ...labelS, margin: '14px 0 8px' }}>◦ Secciones</div>
      <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}>
        <input type="checkbox" checked={tweaks.showMarquee} onChange={(e) => set('showMarquee')(e.target.checked)} />
        Mostrar marquesina de servicios
      </label>
    </div>
  );
}
