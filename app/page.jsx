'use client';

import { useEffect, useRef, useState } from 'react';
import Dir1Editorial from './components/Dir1Editorial';
import TweaksPanel from './components/TweaksPanel';

// Tweak defaults — the host parses this block and rewrites it to disk on edit.
// Keep the /*EDITMODE-BEGIN*/ ... /*EDITMODE-END*/ markers intact for the parser.
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "paper": "#F4F0E8",
  "ink": "#1A1714",
  "accent": "#C8491E",
  "serif": "Instrument Serif",
  "heroHeadlineSize": 132,
  "heroTagline": "Somos tu implementador de IA de confianza. Auditamos, implementamos y capacitamos a tu equipo — sin tecnicismos y sin humo.",
  "heroEmphasis": "No te quedes atrás.",
  "ctaPrimary": "Agenda tu consulta gratis",
  "showMarquee": true
}/*EDITMODE-END*/;

export default function HomePage() {
  const [tweaks, setTweaks] = useState(TWEAK_DEFAULTS);
  const [showPanel, setShowPanel] = useState(false);

  // Register listener FIRST, then announce availability to the host.
  useEffect(() => {
    const onMsg = (e) => {
      if (!e.data || typeof e.data !== 'object') return;
      if (e.data.type === '__activate_edit_mode') setShowPanel(true);
      if (e.data.type === '__deactivate_edit_mode') setShowPanel(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  // Persist tweak changes to the host — debounced.
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    const t = setTimeout(() => {
      window.parent.postMessage({ type: '__edit_mode_set_keys', edits: tweaks }, '*');
    }, 400);
    return () => clearTimeout(t);
  }, [tweaks]);

  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      <Dir1Editorial tweaks={tweaks} />
      {showPanel && <TweaksPanel tweaks={tweaks} setTweaks={setTweaks} onClose={() => setShowPanel(false)} />}
    </div>
  );
}
