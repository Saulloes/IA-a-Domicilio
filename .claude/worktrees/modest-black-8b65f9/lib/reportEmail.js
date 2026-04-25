// Renders the personalized report as a styled HTML email.
// Inline CSS only — email clients strip <style> and many don't support
// modern layout. No external assets.

import { marked } from 'marked';

const STYLES = {
  paper: '#F4F0E8',
  ink: '#1A1714',
  inkDim: '#6A615A',
  accent: '#C8491E',
  rule: 'rgba(26,23,20,0.15)',
};

// Narrow subset of markdown styling applied via inline replacements after
// marked() since we can't rely on CSS in email clients.
function styleMarkdownHtml(html) {
  return html
    .replace(/<h1>/g, `<h1 style="font-family:Georgia,serif;font-size:26px;line-height:1.1;color:${STYLES.ink};margin:28px 0 14px;font-weight:400;">`)
    .replace(/<h2>/g, `<h2 style="font-family:Georgia,serif;font-size:20px;line-height:1.15;color:${STYLES.ink};margin:24px 0 10px;font-weight:400;">`)
    .replace(/<h3>/g, `<h3 style="font-family:Georgia,serif;font-size:17px;line-height:1.2;color:${STYLES.accent};margin:20px 0 8px;font-weight:400;font-style:italic;">`)
    .replace(/<p>/g, `<p style="font-family:-apple-system,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:${STYLES.ink};margin:0 0 14px;">`)
    .replace(/<ul>/g, `<ul style="font-family:-apple-system,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:${STYLES.ink};padding-left:20px;margin:0 0 14px;">`)
    .replace(/<ol>/g, `<ol style="font-family:-apple-system,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:${STYLES.ink};padding-left:20px;margin:0 0 14px;">`)
    .replace(/<li>/g, `<li style="margin:0 0 8px;">`)
    .replace(/<strong>/g, `<strong style="font-weight:600;color:${STYLES.ink};">`)
    .replace(/<em>/g, `<em style="font-style:italic;color:${STYLES.accent};">`);
}

export function renderReportEmail({ archetype, markdown, calLink, email, whatsappIntl, contactEmail }) {
  const htmlBody = styleMarkdownHtml(marked.parse(markdown || ''));
  const today = new Date().toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' });

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Tu diagnóstico IA — IA a Domicilio</title>
</head>
<body style="margin:0;padding:0;background:${STYLES.paper};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${STYLES.paper};padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:${STYLES.paper};">
          <!-- Header -->
          <tr>
            <td style="padding:0 0 24px;border-bottom:1px solid ${STYLES.rule};">
              <table role="presentation" width="100%"><tr>
                <td style="font-family:-apple-system,Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${STYLES.inkDim};">◦ IA A DOMICILIO · REPORTE PERSONALIZADO</td>
                <td align="right" style="font-family:-apple-system,Helvetica,Arial,sans-serif;font-size:11px;color:${STYLES.inkDim};">${today}</td>
              </tr></table>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 0 8px;">
              <div style="font-family:Georgia,serif;font-size:32px;line-height:1.05;color:${STYLES.ink};letter-spacing:-0.5px;">
                Tu diagnóstico, <span style="font-style:italic;color:${STYLES.accent};">${archetype}.</span>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 0 24px;font-family:-apple-system,Helvetica,Arial,sans-serif;font-size:14px;color:${STYLES.inkDim};">
              Análisis basado en tus respuestas. Léelo sin prisa — no necesitas actuar hoy.
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:0 0 32px;">
              ${htmlBody}
            </td>
          </tr>

          <!-- CTA card -->
          <tr>
            <td style="padding:0 0 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${STYLES.ink};border-radius:2px;">
                <tr>
                  <td style="padding:28px 28px 24px;">
                    <div style="font-family:-apple-system,Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:rgba(244,240,232,0.6);margin-bottom:12px;">◦ SIGUIENTE PASO</div>
                    <div style="font-family:Georgia,serif;font-size:22px;line-height:1.15;color:${STYLES.paper};letter-spacing:-0.3px;margin-bottom:10px;">
                      30 minutos contigo y <span style="font-style:italic;color:${STYLES.accent};">sales con un plan.</span>
                    </div>
                    <p style="font-family:-apple-system,Helvetica,Arial,sans-serif;font-size:14px;line-height:1.5;color:rgba(244,240,232,0.85);margin:0 0 20px;">
                      Agenda una llamada. Revisamos este reporte juntos y definimos qué sigue para tu operación.
                    </p>
                    <a href="${calLink}" style="display:inline-block;background:${STYLES.accent};color:${STYLES.paper};text-decoration:none;padding:14px 22px;font-family:-apple-system,Helvetica,Arial,sans-serif;font-size:14px;font-weight:500;border-radius:2px;">
                      Reservar llamada →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 0 0;border-top:1px solid ${STYLES.rule};">
              <table role="presentation" width="100%"><tr>
                <td style="font-family:-apple-system,Helvetica,Arial,sans-serif;font-size:12px;color:${STYLES.inkDim};line-height:1.6;">
                  <div style="margin-bottom:4px;"><strong style="color:${STYLES.ink};font-weight:500;">IA a Domicilio</strong> · Guadalajara, MX</div>
                  <div>
                    <a href="mailto:${contactEmail}" style="color:${STYLES.inkDim};text-decoration:none;">${contactEmail}</a> ·
                    <a href="https://wa.me/${whatsappIntl}" style="color:${STYLES.inkDim};text-decoration:none;">WhatsApp</a> ·
                    <a href="${calLink}" style="color:${STYLES.inkDim};text-decoration:none;">Calendario</a>
                  </div>
                  <div style="margin-top:12px;color:${STYLES.inkDim};font-size:11px;">
                    Recibes este correo porque pediste tu reporte personalizado en iaadomicilio.com/diagnostico (${email}).
                  </div>
                </td>
              </tr></table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
