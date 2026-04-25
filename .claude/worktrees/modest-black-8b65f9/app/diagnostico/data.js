// Data + scoring for the diagnostic. Ported from diagnostico-ia.tsx.
// Kept in its own module so the API route can import the same label maps
// when building the LLM prompt server-side.

export const QUESTIONS = [
  {
    id: 'q1',
    dim: 'uso',
    type: 'single',
    title: '¿Usas herramientas de IA en tu trabajo hoy?',
    options: [
      { label: 'Nunca las he usado', pts: 0 },
      { label: 'He jugado con ChatGPT un par de veces', pts: 4 },
      { label: 'Las uso de vez en cuando', pts: 8 },
      { label: 'Son parte de mi rutina semanal', pts: 12 },
      { label: 'Las uso a diario y mi equipo también', pts: 15 },
    ],
  },
  {
    id: 'q2',
    dim: 'uso',
    type: 'multi',
    title: '¿Qué herramientas has probado?',
    hint: 'Selecciona todas las que apliquen',
    maxPts: 10,
    perItem: 3,
    options: [
      { label: 'ChatGPT' },
      { label: 'Claude o Gemini' },
      { label: 'Copilot (Microsoft)' },
      { label: 'Automatizaciones (Zapier, Make, n8n)' },
      { label: 'Ninguna todavía', exclusive: true },
    ],
  },
  {
    id: 'q3',
    dim: 'uso',
    type: 'multi',
    title: '¿Para qué la usas hoy en el negocio?',
    hint: 'Selecciona todas las que apliquen',
    maxPts: 10,
    options: [
      { label: 'Aún no la uso en el negocio', pts: 0, exclusive: true },
      { label: 'Redactar correos o textos', pts: 3 },
      { label: 'Atención a clientes', pts: 3 },
      { label: 'Contenido o redes sociales', pts: 3 },
      { label: 'Automatizar tareas repetitivas', pts: 4 },
    ],
  },
  {
    id: 'q4',
    dim: 'operacion',
    type: 'single',
    title: '¿Qué tanto te come el tiempo lo operativo del día a día?',
    options: [
      { label: 'Todo fluye, estamos bien', pts: 5 },
      { label: 'Manejable, pero hay días pesados', pts: 8 },
      { label: 'Mucho — siempre sentimos que corremos atrás', pts: 12 },
      { label: 'Es un dolor constante, no damos abasto', pts: 15 },
    ],
  },
  {
    id: 'q5',
    dim: 'operacion',
    type: 'single',
    title: '¿Cómo opera tu negocio hoy, en general?',
    options: [
      { label: 'WhatsApp, correo y todo en la cabeza del equipo', pts: 3 },
      { label: 'WhatsApp + Google Workspace / Microsoft 365', pts: 6 },
      { label: 'Usamos algunas hojas de cálculo organizadas', pts: 8 },
      { label: 'Tenemos sistemas conectados (CRM, ERP, etc.)', pts: 10 },
    ],
  },
  {
    id: 'q6',
    dim: 'operacion',
    type: 'single',
    title: '¿Cuál es el cuello de botella más grande de tu operación hoy?',
    hint: 'Esta respuesta personaliza tus resultados',
    flatPts: 10,
    options: [
      { label: 'Atención a clientes (tiempo de respuesta, volumen)', key: 'atencion' },
      { label: 'Ventas (prospección, seguimiento, cierre)', key: 'ventas' },
      { label: 'Operaciones (tareas repetitivas, errores humanos)', key: 'operaciones' },
      { label: 'Marketing y contenido', key: 'marketing' },
      { label: 'Administración (facturación, reportes, RH)', key: 'admin' },
      { label: 'No estoy seguro', key: 'incierto' },
    ],
  },
  {
    id: 'q7',
    dim: 'vision',
    type: 'single',
    title: '¿Cómo ves la IA para tu negocio?',
    options: [
      { label: 'Una moda que va a pasar', pts: 0 },
      { label: 'Interesante, pero no es prioridad hoy', pts: 3 },
      { label: 'Una herramienta útil que quiero aprovechar', pts: 7 },
      { label: 'Una ventaja competitiva que no puedo ignorar', pts: 10 },
    ],
  },
  {
    id: 'q8',
    dim: 'vision',
    type: 'single',
    title: '¿Has intentado implementar IA antes?',
    options: [
      { label: 'No, sería mi primera vez', pts: 5 },
      { label: 'Sí, pero no funcionó como esperaba', pts: 6 },
      { label: 'Sí, algo funciona y algo no', pts: 8 },
      { label: 'Sí, ya tenemos varias implementaciones sólidas', pts: 10 },
    ],
  },
  {
    id: 'q9',
    dim: 'vision',
    type: 'single',
    title: '¿Qué tan rápido querrías empezar?',
    options: [
      { label: 'Solo estoy explorando por ahora', pts: 3 },
      { label: 'En los próximos meses', pts: 6 },
      { label: 'Lo antes posible, tengo un dolor claro', pts: 10 },
    ],
  },
];

export const ARCHETYPES = [
  {
    min: 0, max: 25, emoji: '🌱', name: 'AI Curioso',
    tagline: 'Estás escuchando de IA, pero no sabes por dónde empezar. Buenas noticias: estás justo donde necesitas estar para dar un salto importante.',
  },
  {
    min: 26, max: 50, emoji: '🧭', name: 'AI Explorador',
    tagline: 'Ya jugaste con IA, pero de forma desordenada. Hay 10x más valor esperándote si lo haces con método.',
  },
  {
    min: 51, max: 75, emoji: '🚀', name: 'AI Adoptador',
    tagline: 'Ya tienes IA en algún proceso. Es momento de escalar, conectar y sistematizar lo que funciona.',
  },
  {
    min: 76, max: 100, emoji: '⚡', name: 'AI Estratega',
    tagline: 'Estás adelantado al 90% de las PyMEs de México. Tu siguiente paso no son tutoriales — son implementaciones a la medida.',
  },
];

export function scoreAnswers(answers) {
  const dims = { uso: 0, operacion: 0, vision: 0 };
  let bottleneck = null;

  QUESTIONS.forEach((q) => {
    const a = answers[q.id];
    if (a === undefined || a === null) return;

    if (q.type === 'single') {
      const opt = q.options[a];
      if (!opt) return;
      if (q.flatPts) {
        dims[q.dim] += q.flatPts;
        if (q.id === 'q6') bottleneck = opt.key;
      } else {
        dims[q.dim] += opt.pts || 0;
      }
    } else if (q.type === 'multi') {
      const selected = Array.isArray(a) ? a : [];
      let pts = 0;
      selected.forEach((idx) => {
        const opt = q.options[idx];
        if (!opt) return;
        const p = opt.pts !== undefined ? opt.pts : (q.perItem || 0);
        pts += p;
      });
      if (q.maxPts) pts = Math.min(pts, q.maxPts);
      dims[q.dim] += pts;
    }
  });

  const total = dims.uso + dims.operacion + dims.vision;
  const archetype = ARCHETYPES.find((a) => total >= a.min && total <= a.max) || ARCHETYPES[0];
  return { total, dims, archetype, bottleneck };
}

export function getOpportunities(_archetype, bottleneck) {
  const byBottleneck = {
    atencion: [
      { tag: 'Quick win', title: 'Plantillas de respuesta con IA', desc: 'Crea 10 respuestas base para tus preguntas más comunes usando ChatGPT. Tu equipo las personaliza en segundos.' },
      { tag: 'Requiere implementación', title: 'Chatbot en WhatsApp', desc: 'Atención 24/7 con canalización inteligente al asesor correcto según el tipo de consulta.' },
      { tag: 'Requiere implementación', title: 'Análisis de conversaciones', desc: 'Detecta patrones en reclamos y oportunidades de venta automáticamente.' },
    ],
    ventas: [
      { tag: 'Quick win', title: 'Prospección con IA', desc: 'Usa Claude o ChatGPT para investigar prospectos y redactar mensajes personalizados en minutos.' },
      { tag: 'Requiere implementación', title: 'Seguimiento automático', desc: 'Secuencias inteligentes que nutren leads según su comportamiento, sin dejar nada en el tintero.' },
      { tag: 'Requiere implementación', title: 'CRM asistido con IA', desc: 'Resúmenes automáticos de cada cliente, próximos pasos sugeridos y alertas inteligentes.' },
    ],
    operaciones: [
      { tag: 'Quick win', title: 'Documenta con IA', desc: 'Graba una llamada explicando un proceso y usa Claude para convertirlo en un SOP limpio.' },
      { tag: 'Requiere implementación', title: 'Automatización de tareas', desc: 'Conecta tus herramientas con Make/n8n para eliminar pasos manuales repetitivos.' },
      { tag: 'Requiere implementación', title: 'Agente operativo', desc: 'Un asistente que se encarga de tareas específicas de ti — cotizaciones, reportes, alertas.' },
    ],
    marketing: [
      { tag: 'Quick win', title: 'Calendario de contenido con IA', desc: 'Genera 30 ideas de posts en 10 minutos, adaptados a tu industria y tono de marca.' },
      { tag: 'Requiere implementación', title: 'Creación de contenido a escala', desc: 'Sistema que produce copy, imágenes y videos cortos consistentes con tu marca.' },
      { tag: 'Requiere implementación', title: 'Análisis de audiencia', desc: 'Descubre qué dice tu mercado de ti y tu competencia, automáticamente.' },
    ],
    admin: [
      { tag: 'Quick win', title: 'Resúmenes de documentos', desc: 'Sube contratos, facturas o reportes a Claude y obtén resúmenes y puntos clave al instante.' },
      { tag: 'Requiere implementación', title: 'Automatización de facturación', desc: 'Conecta tu sistema de facturación con IA que genera, valida y envía sin intervención.' },
      { tag: 'Requiere implementación', title: 'Reportes automáticos', desc: 'Dashboards que se actualizan solos y te mandan el resumen al WhatsApp cada lunes.' },
    ],
    incierto: [
      { tag: 'Quick win', title: 'Empieza por ChatGPT o Claude', desc: 'Úsalo 15 minutos al día durante una semana. Identificarás rápido dónde te hace más falta.' },
      { tag: 'Quick win', title: 'Mapea tus tareas repetitivas', desc: 'Anota todo lo que haces por rutina durante 3 días. Ahí están tus oportunidades de IA.' },
      { tag: 'Requiere implementación', title: 'Empieza con una auditoría', desc: 'Una revisión externa te dirá en 30 minutos dónde empezar sin perder tiempo.' },
    ],
  };
  return byBottleneck[bottleneck] || byBottleneck.incierto;
}

// Used by the API route to resolve numeric answer indices into human-readable
// labels for the LLM prompt.
export function answersToLabels(answers) {
  const out = {};
  QUESTIONS.forEach((q) => {
    const a = answers[q.id];
    if (a === undefined || a === null) return;
    if (q.type === 'single') {
      const opt = q.options[a];
      out[q.id] = opt ? opt.label : null;
    } else if (q.type === 'multi' && Array.isArray(a)) {
      out[q.id] = a.map((i) => q.options[i]?.label).filter(Boolean);
    }
  });
  return out;
}

export const CAL_LINK = 'https://cal.com/saul-lopez/30min';
export const WHATSAPP_INTL = '5212298503858';
export const CONTACT_EMAIL = 'saul@iaadomicilio.com';
