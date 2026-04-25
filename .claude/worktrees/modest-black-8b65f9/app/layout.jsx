import './globals.css';

export const metadata = {
  metadataBase: new URL('https://iaadomicilio.com'),
  title: {
    default: 'IA a Domicilio — Tu implementador de IA de confianza en México',
    template: '%s · IA a Domicilio',
  },
  description:
    'Consultoría de IA para PyMEs mexicanas. Auditoría, implementación y capacitación. Sin tecnicismos, sin humo. Agenda una llamada gratis.',
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: 'https://iaadomicilio.com',
    siteName: 'IA a Domicilio',
    title: 'IA a Domicilio — Tu implementador de IA de confianza en México',
    description:
      'Consultoría de IA para PyMEs mexicanas. Auditoría, implementación y capacitación. Sin tecnicismos, sin humo.',
  },
  alternates: { canonical: 'https://iaadomicilio.com' },
};

// Google Analytics 4 — Measurement ID comes from NEXT_PUBLIC_GA_ID (public is OK, it's exposed to the browser anyway).
// Cookieless mode: storage:'none' means no cookies, no consent banner required.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=Fraunces:ital,wght@0,400;0,500;1,400&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        {GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  window.gtag = gtag;
                  gtag('js', new Date());
                  // Cookieless mode — no cookies written, no consent banner needed.
                  gtag('config', '${GA_ID}', {
                    anonymize_ip: true,
                    client_storage: 'none',
                    storage: 'none'
                  });
                `,
              }}
            />
          </>
        )}
        {/* Schema.org: ProfessionalService for LocalBusiness rich results. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              name: 'IA a Domicilio',
              description:
                'Consultoría de IA para PyMEs mexicanas. Auditoría, implementación y capacitación.',
              url: 'https://iaadomicilio.com',
              email: 'saul@iaadomicilio.com',
              telephone: '+52-229-850-3858',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Guadalajara',
                addressRegion: 'Jalisco',
                addressCountry: 'MX',
              },
              areaServed: { '@type': 'Country', name: 'México' },
              priceRange: '$$',
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
