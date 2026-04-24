import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'IA a Domicilio — Tu implementador de IA de confianza en México';
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 32, height: 32, borderRadius: 999, background: '#C8491E' }} />
          <span style={{ fontSize: 28, color: '#1A1714', letterSpacing: -0.5 }}>IA a Domicilio</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 24, color: '#6A615A', letterSpacing: 4, textTransform: 'uppercase', marginBottom: 24 }}>
            ◦ CONSULTORÍA EN IA · GUADALAJARA, MX
          </div>
          <div style={{ fontSize: 120, color: '#1A1714', lineHeight: 0.95, letterSpacing: -3, display: 'flex', flexDirection: 'column' }}>
            <span>IA para</span>
            <span style={{ fontStyle: 'italic', color: '#C8491E' }}>tu negocio.</span>
          </div>
        </div>
        <div style={{ fontSize: 22, color: '#1A1714', display: 'flex', justifyContent: 'space-between' }}>
          <span>Auditoría · Implementación · Capacitación</span>
          <span style={{ color: '#6A615A' }}>iaadomicilio.com</span>
        </div>
      </div>
    ),
    size
  );
}
