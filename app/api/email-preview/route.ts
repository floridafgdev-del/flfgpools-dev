import { buildContactEmail } from '@/lib/contact-email';
import { buildCreateByYourselfEmail } from '@/lib/create-by-yourself-email';

export async function GET(request: Request) {
  const which = new URL(request.url).searchParams.get('form');

  const email =
    which === 'cby'
      ? buildCreateByYourselfEmail({
          poolType: 'pool',
          size: '16to22',
          model: 'r4-cali-cove',
          color: 'Caribbean Blue',
          extras: ['heater', 'deck-patio', 'water-fall', 'deck-jet'],
          city: 'Coral Gables',
          zip: '33134',
          backyardAccess: 'crane-needed',
          timeline: 'asap',
          role: 'homeowner',
          name: 'Ana Lopez',
          phone: '786-555-0300',
          email: 'ana.lopez@example.com',
          notes: 'Prefiero llamada por la tarde. El patio tiene un muro de 6 pies en el lado este.',
          consent: true,
          locale: 'es',
        })
      : buildContactEmail({
          role: 'contractor',
          name: 'Juan Perez',
          phone: '(786) 555-0100',
          email: 'juan.perez@example.com',
          address: '456 Ocean Dr, Miami Beach, FL 33139',
          zip: '33139',
          message:
            'Necesito 3 piscinas para un proyecto residencial en Miami Beach. Busco entrega escalonada entre marzo y mayo.',
          consent: true,
          locale: 'es',
        });

  return new Response(email.html.replace(/cid:flfg-logo/g, '/header/logo-alta.png'), {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
