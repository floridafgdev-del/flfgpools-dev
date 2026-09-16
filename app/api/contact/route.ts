import { NextResponse } from 'next/server';
import { contactLeadSchema, sendContactLead } from '@/lib/contact-email';
import { getRequestIp, verifyRecaptcha } from '@/lib/recaptcha';

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const lead = contactLeadSchema.parse(payload);

    const recaptcha = await verifyRecaptcha(payload.recaptchaToken, getRequestIp(request));
    if (!recaptcha.success) {
      return NextResponse.json(
        { ok: false, error: 'reCAPTCHA verification failed', recaptchaErrors: recaptcha.errorCodes },
        { status: 400 }
      );
    }

    const { delivered, mailto } = await sendContactLead(lead);

    // The mailto: fallback is only useful when delivery is not configured.
    return NextResponse.json({ ok: true, delivered, mailto: delivered ? undefined : mailto });
  } catch (error) {
    console.error('[api/contact] lead not sent', error);
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Invalid request',
      },
      { status: 400 }
    );
  }
}
