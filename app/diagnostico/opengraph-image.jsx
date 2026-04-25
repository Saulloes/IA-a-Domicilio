import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = '¿Qué tan listo está tu negocio para la IA? — Diagnóstico de 5 minutos';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const SERIF_TEXT = '¿Qué tan listo estátu negocio para laIA?';
const SANS_TEXT = 'IA a Domicilio DIAGNÓSTICO GRATUITO · 5 MIN 9 preguntas · sin registro · sin humo iaadomicilio.com/diagnostico';

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
    console.error('[opengraph-image:diagnostico] font load failed', err?.message);
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
          <div
            style={{
              fontSize: 88,
              color: '#1A1714',
              lineHeight: 1,
              letterSpacing: -2.5,
              display: 'flex',
              flexDirection: 'column',
              fontFamily: 'Instrument Serif, serif',
            }}
          >
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
    { ...size, fonts },
  );
}
