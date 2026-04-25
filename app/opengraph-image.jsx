import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'IA a Domicilio — Tu implementador de IA de confianza en México';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const SERIF_TEXT = 'IA paratu negocio.';
const SANS_TEXT = 'IA a Domicilio CONSULTORÍA EN GUADALAJARA, MX Auditoría · Implementación · Capacitación iaadomicilio.com';

async function loadGoogleFont(family, text, weight = 400) {
  const fam = family.replace(/ /g, '+');
  const cssUrl = `https://fonts.googleapis.com/css2?family=${fam}:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await fetch(cssUrl, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    },
  }).then((r) => r.text());
  const match = css.match(/src:\s*url\(([^)]+?)\)\s*format/);
  if (!match) throw new Error(`Font URL not found for ${family}`);
  const res = await fetch(match[1]);
  if (!res.ok) throw new Error(`Font fetch failed for ${family}: ${res.status}`);
  return res.arrayBuffer();
}

export default async function OG() {
  let fonts;
  try {
    const [serif, sans] = await Promise.all([
      loadGoogleFont('Instrument Serif', SERIF_TEXT, 400),
      loadGoogleFont('Inter Tight', SANS_TEXT, 500),
    ]);
    fonts = [
      { name: 'Instrument Serif', data: serif, style: 'normal', weight: 400 },
      { name: 'Inter Tight', data: sans, style: 'normal', weight: 500 },
    ];
  } catch (err) {
    console.error('[opengraph-image] font load failed', err?.message);
  }

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
          fontFamily: 'Inter Tight, sans-serif',
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
          <div
            style={{
              fontSize: 120,
              color: '#1A1714',
              lineHeight: 0.95,
              letterSpacing: -3,
              display: 'flex',
              flexDirection: 'column',
              fontFamily: 'Instrument Serif, serif',
            }}
          >
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
    { ...size, fonts },
  );
}
