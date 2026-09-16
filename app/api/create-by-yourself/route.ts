import { NextResponse } from 'next/server';
import {
  createByYourselfLeadSchema,
  sendCreateByYourselfLead,
} from '@/lib/create-by-yourself-email';
import { getRequestIp, verifyRecaptcha } from '@/lib/recaptcha';

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const lead = createByYourselfLeadSchema.parse(payload);

    const recaptcha = await verifyRecaptcha(payload.recaptchaToken, getRequestIp(request));
    if (!recaptcha.success) {
      return NextResponse.json(
        { ok: false, error: 'reCAPTCHA verification failed', recaptchaErrors: recaptcha.errorCodes },
        { status: 400 }
      );
    }

    const { delivered, mailto } = await sendCreateByYourselfLead(lead);

    // The mailto: fallback is only useful when delivery is not configured.
    return NextResponse.json({ ok: true, delivered, mailto: delivered ? undefined : mailto });
  } catch (error) {
    console.error('[api/create-by-yourself] lead not sent', error);
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Invalid request',
      },
      { status: 400 }
    );
  }
}
