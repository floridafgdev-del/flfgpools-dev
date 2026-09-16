'use client';

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';

/**
 * Public site key. When unset, the widget renders nothing so forms keep
 * working in local development without reCAPTCHA keys.
 */
const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

/** True when the site key is present, so forms can require the token. */
export const RECAPTCHA_ENABLED = Boolean(SITE_KEY);

declare global {
  interface Window {
    grecaptcha?: {
      render: (container: HTMLElement, options: {
        sitekey: string;
        callback?: (token: string) => void;
        'expired-callback'?: () => void;
        'error-callback'?: () => void;
        theme?: 'light' | 'dark' | 'auto';
        size?: 'normal' | 'compact' | 'invisible';
      }) => number;
      reset: (widgetId?: number) => void;
      getResponse: (widgetId?: number) => string;
    };
    __recaptchaOnLoad?: () => void;
  }
}

let scriptPromise: Promise<void> | null = null;

function loadRecaptchaScript(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  // The library is fully ready only when render is callable.
  if (window.grecaptcha && typeof window.grecaptcha.render === 'function') {
    return Promise.resolve();
  }
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise<void>((resolve, reject) => {
    // Google's api.js calls this global callback once the library is fully
    // bootstrapped and render/reset/getResponse are available. The script's
    // own onload fires earlier, when the file has just downloaded.
    window.__recaptchaOnLoad = () => resolve();

    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=explicit&hl=en&onload=__recaptchaOnLoad`;
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      scriptPromise = null;
      reject(new Error('Failed to load reCAPTCHA script'));
    };
    document.head.appendChild(script);
  });

  return scriptPromise;
}

export type RecaptchaRef = {
  /** Clears the checkbox so the user must verify again. */
  reset: () => void;
  /** Returns the current token, or '' if unchecked/expired. */
  getToken: () => string;
};

type RecaptchaProps = {
  /** Called every time Google issues a fresh token. */
  onVerify: (token: string) => void;
  /** Called when the challenge expires; the token is no longer valid. */
  onExpire?: () => void;
  /** Called when the widget fails to render/load. */
  onError?: () => void;
  theme?: 'light' | 'dark' | 'auto';
  className?: string;
};

/**
 * reCAPTCHA v2 checkbox widget.
 *
 * Renders nothing when `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` is unset, so forms
 * work without keys in local development.
 */
export const Recaptcha = forwardRef<RecaptchaRef, RecaptchaProps>(function Recaptcha(
  { onVerify, onExpire, onError, theme = 'light', className },
  ref
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);
  const [loaded, setLoaded] = useState(false);

  // Keep the latest callbacks in refs so the render options don't need to
  // re-run when the parent re-renders.
  const onVerifyRef = useRef(onVerify);
  const onExpireRef = useRef(onExpire);
  const onErrorRef = useRef(onError);
  onVerifyRef.current = onVerify;
  onExpireRef.current = onExpire;
  onErrorRef.current = onError;

  useImperativeHandle(
    ref,
    () => ({
      reset: () => {
        if (widgetIdRef.current !== null && window.grecaptcha) {
          window.grecaptcha.reset(widgetIdRef.current);
        }
      },
      getToken: () => {
        if (widgetIdRef.current !== null && window.grecaptcha) {
          return window.grecaptcha.getResponse(widgetIdRef.current);
        }
        return '';
      },
    }),
    []
  );

  const renderWidget = useCallback(() => {
    if (!containerRef.current || !window.grecaptcha || widgetIdRef.current !== null) return;
    if (typeof window.grecaptcha.render !== 'function') return;

    try {
      widgetIdRef.current = window.grecaptcha.render(containerRef.current, {
        sitekey: SITE_KEY as string,
        theme,
        callback: (token: string) => onVerifyRef.current(token),
        'expired-callback': () => onExpireRef.current?.(),
        'error-callback': () => onErrorRef.current?.(),
      });
      setLoaded(true);
    } catch (error) {
      console.error('[recaptcha] render failed', error);
      onErrorRef.current?.();
    }
  }, [theme]);

  useEffect(() => {
    if (!SITE_KEY) return;

    let cancelled = false;

    loadRecaptchaScript()
      .then(() => {
        if (cancelled) return;
        renderWidget();
      })
      .catch(() => {
        if (!cancelled) onErrorRef.current?.();
      });

    return () => {
      cancelled = true;
    };
  }, [renderWidget]);

  if (!SITE_KEY) return null;

  return (
    <div className={className}>
      {!loaded && (
        <div className="flex h-[78px] w-[304px] items-center justify-center rounded border border-pool-deep/10 bg-white/60 text-xs text-pool-deep/50">
          Loading reCAPTCHA…
        </div>
      )}
      {/* reCAPTCHA requires this container to be empty when render() is called. */}
      <div ref={containerRef} data-recaptcha-container aria-label="reCAPTCHA" />
    </div>
  );
});
