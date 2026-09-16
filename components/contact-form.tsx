'use client';

import { useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { FormConsentNotice, useFormConsent } from '../components/form-consent';
import { Recaptcha, RECAPTCHA_ENABLED, type RecaptchaRef } from './recaptcha';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, AlertCircle, Loader2, MapPin, ExternalLink } from 'lucide-react';
import { SOCIAL_LINKS } from '@/config/site';

export function ContactForm() {
  const t = useTranslations('Contact.form');
  const locale = useLocale();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [zipError, setZipError] = useState('');
  const [addressValue, setAddressValue] = useState('');
  const [mailto, setMailto] = useState('');
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const recaptchaRef = useRef<RecaptchaRef>(null);
  const { accepted: consentAccepted, accept: acceptConsent } = useFormConsent();

  const validateZip = (zip: string) => {
    const zipNum = parseInt(zip, 10);
    if (zip.length !== 5 || isNaN(zipNum)) {
      setZipError(t('zipError'));
      return false;
    }
    if (zipNum < 33000 || zipNum > 33499) {
      setZipError(t('zipError'));
      return false;
    }
    setZipError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const zip = (formData.get('zip') as string | null)?.trim();

    if (zip && !validateZip(zip)) return;

    const token = recaptchaRef.current?.getToken() || recaptchaToken;
    if (RECAPTCHA_ENABLED && !token) return;

    setStatus('loading');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: formData.get('role'),
          name: formData.get('name'),
          phone: formData.get('phone'),
          email: formData.get('email'),
          address: formData.get('address') || '',
          ...(zip ? { zip } : {}),
          message: formData.get('message') || '',
          locale,
          consent: consentAccepted,
          recaptchaToken: token,
        }),
      });
      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error || 'Unable to send request');
      }

      setMailto(data.delivered ? '' : data.mailto || '');
      setStatus('success');
      form.reset();
      setAddressValue('');
      recaptchaRef.current?.reset();
      setRecaptchaToken('');
    } catch {
      setStatus('error');
      recaptchaRef.current?.reset();
      setRecaptchaToken('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8 space-y-5">
      {/* Role */}
      <div>
        <label htmlFor="role" className="block text-sm font-medium text-pool-deep mb-1">
          {t('role')}
        </label>
        <p className="text-xs text-pool-deep/60 mb-2">{t('roleHelper')}</p>
        <select
          id="role"
          name="role"
          required
          defaultValue=""
          className="w-full glass-chip rounded-xl px-4 py-3"
        >
          <option value="" disabled>Select…</option>
          <option value="homeowner">{t('roleOptions.homeowner')}</option>
          <option value="contractor">{t('roleOptions.contractor')}</option>
          <option value="realtor">{t('roleOptions.realtor')}</option>
          <option value="investor">{t('roleOptions.investor')}</option>
        </select>
      </div>

      {/* Name & Phone */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-pool-deep mb-1">
            {t('name')}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder={t('namePlaceholder')}
            className="w-full glass-chip rounded-xl px-4 py-3"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-pool-deep mb-1">
            {t('phone')}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            placeholder={t('phonePlaceholder')}
            className="w-full glass-chip rounded-xl px-4 py-3"
          />
        </div>
      </div>

      {/* Email & ZIP */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-pool-deep mb-1">
            {t('email')}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder={t('emailPlaceholder')}
            className="w-full glass-chip rounded-xl px-4 py-3"
          />
        </div>
        {/* <div>
          <label htmlFor="zip" className="block text-sm font-medium text-pool-deep mb-1">
            {t('zip')}
          </label>
          <p className="text-xs text-pool-deep/60 mb-2">{t('zipHelper')}</p>
          <input
            id="zip"
            name="zip"
            type="text"
            inputMode="numeric"
            pattern="[0-9]{5}"
            required
            placeholder="33189"
            onChange={(e) => validateZip(e.target.value)}
            className={`w-full glass-chip rounded-xl px-4 py-3 ${zipError ? 'border-red-400' : ''}`}
          />
          {zipError && (
            <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {zipError}
            </p>
          )}
        </div> */}
      

      

      {/* Address with Google Maps link */}
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-pool-deep mb-1">
          {t('address')}
        </label>
        <p className="text-xs text-pool-deep/60 mb-2">{t('addressHelper')}</p>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-pool-deep/30 pointer-events-none" />
          <input
            id="address"
            name="address"
            type="text"
            value={addressValue}
            onChange={(e) => setAddressValue(e.target.value)}
            placeholder={t('addressPlaceholder')}
            className="w-full glass-chip rounded-xl pl-10 pr-4 py-3"
          />
        </div>
        <div className="mt-2 flex items-center gap-2">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressValue || 'Miami, FL')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-pool-aqua hover:text-pool-deep transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            {t('addressMapButton')}
          </a>
          <span className="text-xs text-pool-deep/40">{t('addressMapHint')}</span>
        </div>
      </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-pool-deep mb-1">
          {t('message')}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder={t('messagePlaceholder')}
          className="w-full glass-chip rounded-xl px-4 py-3 resize-none"
        />
      </div>

      {/* Submit */}
      <FormConsentNotice
        accepted={consentAccepted}
        onAccept={acceptConsent}
        id="contact-consent"
      />

      <Recaptcha
        ref={recaptchaRef}
        onVerify={setRecaptchaToken}
        onExpire={() => setRecaptchaToken('')}
        onError={() => setRecaptchaToken('')}
        className="py-1"
      />

      <button
        type="submit"
        disabled={status === 'loading' || !consentAccepted || (RECAPTCHA_ENABLED && !recaptchaToken)}
        className="w-full glass-btn-primary px-6 py-3 text-white font-medium disabled:opacity-60"
      >
        {status === 'loading' ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending…
          </span>
        ) : (
          t('submit')
        )}
      </button>

      {/* Feedback */}
      <AnimatePresence>
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-3 rounded-xl"
          >
            <Check className="h-5 w-5" />
            {t('success')}
            {mailto ? (
              <a href={mailto} className="font-semibold underline">
                {t('openEmailFallback')}
              </a>
            ) : null}
          </motion.div>
        )}
        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-3 rounded-xl"
          >
            <AlertCircle className="h-5 w-5" />
            {t('error')}{' '}
            <a href={`tel:${SOCIAL_LINKS.phone}`} className="underline">
              {SOCIAL_LINKS.phoneDisplay}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}