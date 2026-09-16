import { z } from 'zod';
import { pools } from '@/lib/pools';
import {
  buildMailto,
  leadsRecipient,
  renderLeadHtml,
  renderLeadText,
  sendLeadEmail,
  telHref,
  type LeadContent,
  type LeadRow,
} from '@/lib/mailer';

export const createByYourselfLeadSchema = z.object({
  poolType: z.enum(['pool', 'spa', 'tanning-ledge']),
  size: z.enum(['upTo16', '16to22', '22plus', 'spa', 'ledge']),
  model: z.string().min(1),
  color: z.string().min(1),
  extras: z.array(z.string()).default([]),
  city: z.string().min(2),
  zip: z.string().regex(/^\d{5}$/),
  backyardAccess: z.enum(['wide-open', 'standard-gate', 'tight-access', 'crane-needed', 'not-sure']),
  timeline: z.enum(['asap', '1-3-months', '3-6-months', 'planning']),
  role: z.enum(['homeowner', 'contractor', 'realtor', 'investor']),
  name: z.string().min(2),
  phone: z.string().min(7),
  email: z.string().email(),
  notes: z.string().optional().default(''),
  consent: z.literal(true),
  locale: z.enum(['en', 'es', 'pt']).optional().default('en'),
  recaptchaToken: z.string().optional(),
});

export type CreateByYourselfLead = z.infer<typeof createByYourselfLeadSchema>;

const labels: Record<string, string> = {
  pool: 'Pool',
  spa: 'Spa',
  'tanning-ledge': 'Tanning ledge',
  upTo16: 'Up to 16 ft',
  '16to22': '16 ft – 22 ft',
  '22plus': '22 ft or more',
  ledge: 'Tanning ledge',
  'wide-open': 'Wide open access',
  'standard-gate': 'Standard gate',
  'tight-access': 'Tight access',
  'crane-needed': 'Crane likely needed',
  'not-sure': 'Not sure',
  asap: 'ASAP',
  '1-3-months': '1–3 months',
  '3-6-months': '3–6 months',
  planning: 'Planning stage',
  homeowner: 'Homeowner',
  contractor: 'Contractor',
  realtor: 'Realtor',
  investor: 'Investor',
  'integrated-spa': 'Integrated spa',
  'led-lighting': 'LED lighting',
  'heater': 'Heater',
  'deck-patio': 'Deck / patio area',
  'salt-system': 'Salt system',
  en: 'English',
  es: 'Spanish',
  pt: 'Portuguese',
};

export function readable(value: string) {
  return labels[value] || value;
}

export function buildCreateByYourselfEmail(lead: CreateByYourselfLead) {
  const subject = `Create by Yourself · ${lead.name} (${lead.city} ${lead.zip})`;
  const pool = pools.find((item) => item.slug === lead.model);
  const model = pool ? `${pool.modelCode} ${pool.name}` : lead.model;
  const dimensions = pool
    ? `${pool.dimensionsText.length} × ${pool.dimensionsText.width} × ${pool.dimensionsText.depth}`
    : '';

  const configRows: LeadRow[] = [
    ['Type', readable(lead.poolType)],
    ['Size range', readable(lead.size)],
    ['Model', model],
  ];
  if (dimensions) configRows.push(['Dimensions', dimensions]);
  configRows.push(
    ['Finish color', lead.color],
    ['Extras', lead.extras.length ? lead.extras.map(readable).join(', ') : 'None selected']
  );

  const content: LeadContent = {
    kicker: 'Create by Yourself',
    headline: lead.name,
    subhead: [`${model} in ${lead.color}`, readable(lead.timeline)].join(' · '),
    phone: lead.phone,
    email: lead.email,
    sections: [
      { heading: 'Pool configuration', rows: configRows },
      {
        heading: 'Site details',
        rows: [
          ['Location', `${lead.city}, FL ${lead.zip}`, `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${lead.city}, FL ${lead.zip}`)}`],
          ['Backyard access', readable(lead.backyardAccess)],
          ['Desired timeline', readable(lead.timeline)],
        ],
      },
      {
        heading: 'Contact',
        rows: [
          ['Phone', lead.phone, telHref(lead.phone)],
          ['Email', lead.email, `mailto:${lead.email}`],
          ['Customer type', readable(lead.role)],
          ['Preferred language', readable(lead.locale)],
        ],
      },
      { heading: 'Notes', text: lead.notes || 'No notes provided.' },
    ],
  };

  const body = renderLeadText(content);
  const to = leadsRecipient();

  return {
    to,
    subject,
    body,
    html: renderLeadHtml(content),
    replyTo: lead.email,
    mailto: buildMailto(to, subject, body),
  };
}

export async function sendCreateByYourselfLead(lead: CreateByYourselfLead) {
  const email = buildCreateByYourselfEmail(lead);
  const { delivered } = await sendLeadEmail(email, { form: 'create-by-yourself', lead, email });

  return { delivered, ...email };
}
