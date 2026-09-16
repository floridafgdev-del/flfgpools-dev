import { z } from 'zod';
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

export const contactLeadSchema = z.object({
  role: z.enum(['homeowner', 'contractor', 'realtor', 'investor']),
  name: z.string().trim().min(2),
  phone: z.string().trim().min(7),
  email: z.string().trim().email(),
  address: z.string().trim().optional().default(''),
  zip: z
    .string()
    .trim()
    .regex(/^\d{5}$/)
    .optional(),
  message: z.string().trim().max(4000).optional().default(''),
  consent: z.literal(true),
  locale: z.enum(['en', 'es', 'pt']).optional().default('en'),
  recaptchaToken: z.string().optional(),
});

export type ContactLead = z.infer<typeof contactLeadSchema>;

const labels: Record<string, string> = {
  homeowner: 'Homeowner',
  contractor: 'Contractor',
  realtor: 'Realtor',
  investor: 'Investor',
  en: 'English',
  es: 'Spanish',
  pt: 'Portuguese',
};

function readable(value: string) {
  return labels[value] || value;
}

function mapUrl(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

export function buildContactEmail(lead: ContactLead) {
  const subject = `New contact lead · ${lead.name} (${readable(lead.role)})`;

  const propertyRows: LeadRow[] = lead.address
    ? [['Address', lead.address, mapUrl(lead.address)]]
    : [['Address', 'Not provided']];
  if (lead.zip) propertyRows.push(['ZIP', lead.zip]);

  const content: LeadContent = {
    kicker: 'Contact form',
    headline: lead.name,
    subhead: [readable(lead.role), `replies in ${readable(lead.locale)}`].join(' · '),
    phone: lead.phone,
    email: lead.email,
    sections: [
      {
        heading: 'Contact',
        rows: [
          ['Phone', lead.phone, telHref(lead.phone)],
          ['Email', lead.email, `mailto:${lead.email}`],
          ['Customer type', readable(lead.role)],
          ['Preferred language', readable(lead.locale)],
        ],
      },
      { heading: 'Property', rows: propertyRows },
      { heading: 'Message', text: lead.message || 'No message provided.' },
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

export async function sendContactLead(lead: ContactLead) {
  const email = buildContactEmail(lead);
  const { delivered } = await sendLeadEmail(email, { form: 'contact', lead, email });

  return { delivered, ...email };
}
