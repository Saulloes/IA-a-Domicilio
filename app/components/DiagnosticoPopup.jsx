'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'diagnostico_popup_dismissed';
const SCROLL_THRESHOLD = 0.6;
const TIME_THRESHOLD_MS = 45_000;
const MIN_HEIGHT_MOBILE = 700;

const S = {
  paper: '#F4F0E8',
  ink: '#1A1714',
  inkDim: '#6A615A',
  accent: '#C8491E',
  rule: 'rgba(26,23,20,0.12)',
  serif: '"Instrument Serif", "Cormorant Garamond", Georgia, serif',
  sans: '"Inter Tight", -apple-system, system-ui, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
};

const track = (event, props) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', event, props || {});
  }
};

export default function DiagnosticoPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.location.pathname.startsWith('/diagnostico')) return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const isShortMobile = window.innerWidth < 768 && window.innerHeight < MIN_HEIGHT_MOBILE;
    if (isShortMobile) return;

    let shown = false;
    const show = () => {
      if (shown) return;
      shown = true;
      setVisible(true);
      track('popup_shown');
    };

    const timer = setTimeout(show, TIME_THRESHOLD_MS);

    const onScroll = () => {
      const winH = window.innerHeight;
      const docH = document.documentElement.scrollHeight;
      const winScroll = window.scrollY || window.pageYOffset || 0;
      const winProgress = (winScroll + winH) / Math.max(docH, 1);

      let innerProgress = 0;
      const inner = document.querySelector('[data-ed-scroll]');
      if (inner) {
        const h = inner.scrollHeight - inner.clientHeight;
        innerProgress = h > 0 ? inner.scrollTop / h : 0;
      }

      if (winProgress >= SCROLL_THRESHOLD || innerProgress >= SCROLL_THRESHOLD) show();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    const inner = document.querySelector('[data-ed-scroll]');
    if (inner) inner.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
      if (inner) inner.removeEventListener('scroll', onScroll);
    };
  }, []);

  const dismiss = (reason) => {
    sessionStorage.setItem(STORAGE_KEY, '1');
    setVisible(false);
    if (reason === 'dismiss') track('popup_dismissed');
    else if (reason === 'convert') track('popup_converted');
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Diagnóstico IA"
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 1000,
        width: 'min(440px, calc(100vw - 48px))',
        background: S.paper,
        border: `1px solid ${S.rule}`,
        borderTop: `3px solid ${S.accent}`,
        boxShadow: '0 24px 70px rgba(0,0,0,0.18)',
        padding: '28px 32px',
        fontFamily: S.sans,
        color: S.ink,
        animation: 'ed-popup-in 320ms ease-out',
      }}
    >
      <style>{`
        @keyframes ed-popup-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <button
        onClick={() => dismiss('dismiss')}
        aria-label="Cerrar"
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          background: 'transparent',
          border: 'none',
          fontSize: 22,
          lineHeight: 1,
          cursor: 'pointer',
          color: S.inkDim,
          padding: 4,
        }}
      >
        ×
      </button>
      <div style={{ fontFamily: S.mono, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: S.inkDim, marginBottom: 14 }}>
        ◦ Antes de irte
      </div>
      <div style={{ fontFamily: S.serif, fontSize: 28, lineHeight: 1.1, letterSpacing: -0.5, marginBottom: 12 }}>
        ¿Qué tan listo está tu negocio para la <span style={{ fontStyle: 'italic', color: S.accent }}>IA?</span>
      </div>
      <div style={{ fontSize: 15, lineHeight: 1.5, color: S.inkDim, marginBottom: 22 }}>
        5 minutos. Sin registro. Sabrás exactamente por dónde empezar.
      </div>
      <a
        href="/diagnostico"
        onClick={() => dismiss('convert')}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: S.accent,
          color: S.paper,
          textDecoration: 'none',
          padding: '14px 18px',
          borderRadius: 2,
          fontSize: 16,
          fontWeight: 500,
        }}
      >
        Hacer el diagnóstico
        <span style={{ fontSize: 18 }}>→</span>
      </a>
    </div>
  );
}
