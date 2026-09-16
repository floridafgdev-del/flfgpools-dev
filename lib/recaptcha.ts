/**
 * Server-side reCAPTCHA verification.
 *
 * Verifies a reCAPTCHA v2 token against Google's siteverify endpoint. When
 * `RECAPTCHA_SECRET_KEY` is not configured the check is skipped (useful for
 * local development) and a warning is logged so it is not silently disabled
 * in production.
 */

const VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';

export type RecaptchaResult = {
  success: boolean;
  /** reCAPTCHA v2 does not return a score, but v3 does; kept for forward-compat. */
  score?: number;
  errorCodes?: string[];
};

export function recaptchaConfigured() {
  return Boolean(process.env.RECAPTCHA_SECRET_KEY);
}

export async function verifyRecaptcha(
  token: string | undefined | null,
  remoteip?: string
): Promise<RecaptchaResult> {
  if (!recaptchaConfigured()) {
    console.warn(
      '[recaptcha] RECAPTCHA_SECRET_KEY is not set — verification skipped. ' +
        'Configure it in production to enforce the challenge.'
    );
    return { success: true };
  }

  if (!token) {
    return { success: false, errorCodes: ['missing-input-response'] };
  }

  const body = new URLSearchParams({
    secret: process.env.RECAPTCHA_SECRET_KEY as string,
    response: token,
  });
  if (remoteip) body.set('remoteip', remoteip);

  try {
    const response = await fetch(VERIFY_URL, {
      method: 'POST',
      body,
    });
    const data = (await response.json()) as {
      success: boolean;
      score?: number;
      'error-codes'?: string[];
    };

    return {
      success: data.success,
      score: data.score,
      errorCodes: data['error-codes'],
    };
  } catch (error) {
    console.error('[recaptcha] verification request failed', error);
    return { success: false, errorCodes: ['verify-failed'] };
  }
}

/**
 * Extracts the visitor IP from a Request, preferring the forwarded headers
 * Vercel and other proxies set. Falls back to the socket address.
 */
export function getRequestIp(request: Request): string | undefined {
  const headers = request.headers;
  return (
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headers.get('x-real-ip') ||
    undefined
  );
}
