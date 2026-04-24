// Dynamic sitemap — Next.js builds /sitemap.xml from this.
export default function sitemap() {
  const base = 'https://iaadomicilio.com';
  const lastModified = new Date();
  return [
    { url: `${base}/`, lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/diagnostico`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
  ];
}
