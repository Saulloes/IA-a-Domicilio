import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = '¿Qué tan listo está tu negocio para la IA? — Diagnóstico de 5 minutos';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#F4F0E8',
          padding: 80,
          fontFamily: 'serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 28, height: 28, borderRadius: 999, background: '#C8491E' }} />
            <span style={{ fontSize: 26, color: '#1A1714', letterSpacing: -0.4 }}>IA a Domicilio</span>
          </div>
          <div style={{ fontSize: 18, color: '#6A615A', letterSpacing: 3, textTransform: 'uppercase' }}>
            ◦ DIAGNÓSTICO GRATUITO · 5 MIN
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 88, color: '#1A1714', lineHeight: 1, letterSpacing: -2.5, display: 'flex', flexDirection: 'column' }}>
            <span>¿Qué tan listo está</span>
            <span>tu negocio para la</span>
            <span style={{ fontStyle: 'italic', color: '#C8491E' }}>IA?</span>
          </div>
        </div>
        <div style={{ fontSize: 22, color: '#1A1714', display: 'flex', justifyContent: 'space-between' }}>
          <span>9 preguntas · sin registro · sin humo</span>
          <span style={{ color: '#6A615A' }}>iaadomicilio.com/diagnostico</span>
        </div>
      </div>
    ),
    size
  );
}
