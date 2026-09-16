'use client';

import Image from 'next/image';
import { useMemo, useRef, useState, type ComponentType, type ReactNode } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Check,
  ChevronLeft,
  Droplets,
  Loader2,
  Mail,
  MapPin,
  Palette,
  Ruler,
  Sparkles,
  Waves,
} from 'lucide-react';
import { pools, poolColors } from '@/lib/pools';
import { cn, formatCurrency } from '@/lib/utils';
import { FormConsentNotice, useFormConsent } from '../components/form-consent';
import { Recaptcha, RECAPTCHA_ENABLED, type RecaptchaRef } from './recaptcha';
import type { CreateByYourselfLead } from '@/lib/create-by-yourself-email';

const poolTypes = [
  { value: 'pool', icon: Waves },
  { value: 'spa', icon: Droplets },
  { value: 'tanning-ledge', icon: Sparkles },
] as const;

const sizeOptions = [
  { value: 'upTo16' },
  { value: '16to22' },
  { value: '22plus' },
  { value: 'spa' },
  { value: 'ledge' },
] as const;

const fallbackImages = [
  '/projects/R2-RS4.jpg',
  '/projects/R4.jpg',
  '/projects/R9.jpg',
  '/home/medium-pools.png',
];

const extras = [
  'integrated-spa',
  'led-lighting',
  'heater',
  'deck-patio',
  'salt-system',
] as const;

const accessOptions = [
  { value: 'wide-open' },
  { value: 'standard-gate' },
  { value: 'tight-access' },
  { value: 'crane-needed' },
  { value: 'not-sure' },
] as const;

const timelineOptions = [
  { value: 'asap' },
  { value: '1-3-months' },
  { value: '3-6-months' },
  { value: 'planning' },
] as const;

const roles = [
  { value: 'homeowner' },
  { value: 'contractor' },
  { value: 'realtor' },
  { value: 'investor' },
] as const;

const stepKeys = ['pool', 'finish', 'site', 'contact'] as const;

type FormState = Omit<CreateByYourselfLead, 'extras' | 'locale'> & { extras: string[] };

const initialState: FormState = {
  poolType: 'pool',
  size: '16to22',
  model: pools[0]?.slug || 'r15-oasis',
  color: 'Caribbean Blue',
  extras: ['led-lighting'],
  city: 'Miami',
  zip: '',
  backyardAccess: 'not-sure',
  timeline: '1-3-months',
  role: 'homeowner',
  name: '',
  phone: '',
  email: '',
  notes: '',
  consent: true,
};

export function CreateByYourself() {
  const t = useTranslations('CreateByYourself');
  const locale = useLocale();
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [mailto, setMailto] = useState('');
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const recaptchaRef = useRef<RecaptchaRef>(null);
  const { accepted: consentAccepted, accept: acceptConsent } = useFormConsent();

  const compatiblePools = useMemo(() => {
    if (form.poolType === 'spa') return pools.filter((pool) => pool.productClass === 'spa');
    if (form.size === 'spa') return pools.filter((pool) => pool.productClass === 'spa');
    if (form.size === 'ledge') return pools.filter((pool) => pool.productClass === 'ledge');
    return pools.filter((pool) => pool.productClass !== 'spa' && pool.productClass !== 'ledge' && pool.sizeCategory === form.size);
  }, [form.poolType, form.size]);

  const selectedPool = useMemo(() => {
    return pools.find((pool) => pool.slug === form.model) || compatiblePools[0] || pools[0];
  }, [compatiblePools, form.model]);

  const estimatedFrom = useMemo(() => {
    const extrasCost = form.extras.length * 2400;
    const accessCost = form.backyardAccess === 'crane-needed' ? 6500 : form.backyardAccess === 'tight-access' ? 3500 : 0;
    return (selectedPool.priceInitial ?? 0) + extrasCost + accessCost;
  }, [form.backyardAccess, form.extras.length, selectedPool.priceInitial]);

  const selectedColor = poolColors.find((c) => c.name === form.color) || poolColors[0];
  const previewImage = selectedPool.images[0] || fallbackImages[step] || fallbackImages[0];

  const update = <Key extends keyof FormState>(key: Key, value: FormState[Key]) => {
    setForm((current) => ({ ...current, [key]: value }));
    setStatus('idle');
  };

  const toggleExtra = (extra: string) => {
    setForm((current) => ({
      ...current,
      extras: current.extras.includes(extra)
        ? current.extras.filter((item) => item !== extra)
        : [...current.extras, extra],
    }));
  };

  const canContinue = () => {
    if (step < 3) return true;
    return Boolean(
      consentAccepted &&
        form.name.trim() &&
        form.phone.trim() &&
        form.email.trim() &&
        /^\d{5}$/.test(form.zip) &&
        (!RECAPTCHA_ENABLED || recaptchaToken)
    );
  };

  const submit = async () => {
    if (!canContinue()) return;

    const token = recaptchaRef.current?.getToken() || recaptchaToken;
    if (RECAPTCHA_ENABLED && !token) return;

    setStatus('loading');
    try {
      const response = await fetch('/api/create-by-yourself', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, locale, consent: consentAccepted, recaptchaToken: token }),
      });
      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error || 'Unable to send request');
      }

      setMailto(data.delivered ? '' : (data.mailto || ''));
      setStatus('success');
      recaptchaRef.current?.reset();
      setRecaptchaToken('');
    } catch {
      setStatus('error');
      recaptchaRef.current?.reset();
      setRecaptchaToken('');
    }
  };

  const next = () => {
    if (step === stepKeys.length - 1) {
      submit();
      return;
    }
    setStep((current) => Math.min(current + 1, stepKeys.length - 1));
  };

  return (
    <section id="create-by-yourself" className="relative overflow-hidden py-14 sm:py-20 md:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(14,165,233,0.20),transparent_34%),linear-gradient(135deg,#06283D_0%,#0A2540_46%,#F3EEE7_46%,#FFFBF5_100%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-white/50" />

      <div className="container relative mx-auto px-4">
        <div className="mb-10 max-w-3xl text-white">
          <span className="glass-chip inline-flex items-center gap-2 text-white">
            <Sparkles className="h-4 w-4" /> {t('badge')}
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl md:text-6xl font-display font-bold leading-tight text-white">
            {t('heading')}
          </h2>
          <p className="mt-5 text-lg text-white/78">
            {t('description')}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] items-stretch">
          <motion.div
            initial={reduce ? false : { opacity: 0, x: -24 }}
            whileInView={reduce ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card min-h-[380px] sm:min-h-[620px] overflow-hidden bg-pool-deep/20"
          >
            <div className="relative h-full min-h-[380px] sm:min-h-[620px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={previewImage}
                  initial={reduce ? false : { opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.45 }}
                  className="absolute inset-0 h-full w-full"
                >
                  <Image
                    src={previewImage}
                    alt={t('previewAlt')}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-pool-deep via-pool-deep/40 to-transparent" />
              <div className="absolute left-4 right-4 top-4 sm:left-6 sm:right-6 sm:top-6 flex items-center justify-between gap-3">
                <div className="glass-chip-2 text-white">{selectedPool.modelCode} {selectedPool.name}</div>
                <div className="glass-chip-2 text-white">{selectedPool.dimensionsText.length} × {selectedPool.dimensionsText.width}</div>
              </div>
              <div className="absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6">
                <div className="glass-panel p-5 text-white">
                  <div className="flex items-end justify-between gap-5">
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-white/60">{t('orientativeFrom')}</p>
                      <p className="mt-1 text-2xl sm:text-4xl font-bold">{selectedPool.priceInitial != null ? formatCurrency(estimatedFrom, 'en-US') : t('contactForPricing')}</p>
                    </div>
                    <div className="h-10 w-10 sm:h-14 sm:w-14 overflow-hidden rounded-full shadow-lg ring-1 ring-white/50 relative">
                      <Image
                        src={selectedColor.colorChip}
                        alt={form.color}
                        fill
                        sizes="(max-width: 768px) 40px, 56px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-white/70">
                    {t('priceNote')}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={reduce ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card bg-white/75 p-5 md:p-7"
          >
            <div className="mb-6 grid grid-cols-2 sm:grid-cols-4 gap-2">
              {stepKeys.map((key, index) => (
                <button
                  key={key}
                  onClick={() => setStep(index)}
                  className={cn(
                    'rounded-full px-3 py-2 text-sm font-semibold transition-all',
                    index === step ? 'bg-pool-aqua text-white shadow-lg' : 'bg-white/50 text-pool-deep/60 hover:text-pool-deep'
                  )}
                >
                  <span className="hidden sm:inline">{index + 1}. </span>{t(`steps.${key}`)}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={reduce ? false : { opacity: 0, y: 10, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -8, filter: 'blur(6px)' }}
                transition={{ duration: 0.25 }}
                className="min-h-[430px]"
              >
                {step === 0 && (
                  <div className="space-y-6">
                    <StepTitle icon={Waves} label={t('stepLabels.step1')} title={t('step1Title')} />
                    <OptionGrid>
                      {poolTypes.map((item) => (
                        <OptionButton
                          key={item.value}
                          active={form.poolType === item.value}
                          onClick={() => update('poolType', item.value)}
                        >
                          <item.icon className="h-5 w-5" />
                          {t(`poolTypes.${item.value}`)}
                        </OptionButton>
                      ))}
                    </OptionGrid>
                    <div>
                      <FieldLabel icon={Ruler}>{t('sizeRange')}</FieldLabel>
                      <OptionGrid>
                        {sizeOptions.map((item) => (
                          <OptionButton
                            key={item.value}
                            active={form.size === item.value}
                            onClick={() => {
                              update('size', item.value);
                              const first = pools.find((pool) => pool.sizeCategory === item.value && pool.productClass !== 'spa' && pool.productClass !== 'ledge');
                              if (first) update('model', first.slug);
                            }}
                          >
                            {t(`sizeOptions.${item.value}`)}
                          </OptionButton>
                        ))}
                      </OptionGrid>
                    </div>
                    <div>
                      <FieldLabel icon={Waves}>{t('baseModel')}</FieldLabel>
                      <select
                        value={form.model}
                        onChange={(event) => update('model', event.target.value)}
                        aria-label={t('baseModel')}
                        className="w-full glass-chip rounded-2xl px-4 py-3 text-left"
                      >
                        {(compatiblePools.length ? compatiblePools : pools).map((pool) => (
                          <option key={pool.slug} value={pool.slug}>{pool.modelCode} {pool.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-6">
                    <StepTitle icon={Palette} label={t('stepLabels.step2')} title={t('step2Title')} />
                    <div>
                      <FieldLabel icon={Palette}>{t('finishColor')}</FieldLabel>
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-4">
                        {poolColors.map((color) => (
                          <button
                            key={color.name}
                            onClick={() => update('color', color.name)}
                            className={cn(
                              'overflow-hidden rounded-2xl border p-2 text-left transition-all',
                              form.color === color.name ? 'border-pool-aqua bg-pool-aqua/10 ring-2 ring-pool-aqua/30' : 'border-pool-deep/10 bg-white/50 hover:border-pool-aqua/40'
                            )}
                          >
                            <div className="relative h-20 overflow-hidden rounded-xl">
                              <Image
                                src={color.modelImage}
                                alt={color.name}
                                fill
                                sizes="(max-width: 768px) 50vw, 25vw"
                                className={cn(
                                  'object-cover transition-transform duration-300',
                                  form.color === color.name ? 'scale-105' : 'scale-100'
                                )}
                              />
                            </div>
                            <span className="mt-2 block text-xs font-semibold text-pool-deep">{color.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <FieldLabel icon={Sparkles}>{t('projectExtras')}</FieldLabel>
                      <OptionGrid>
                        {extras.map((extra) => (
                          <OptionButton key={extra} active={form.extras.includes(extra)} onClick={() => toggleExtra(extra)}>
                            <Check className="h-4 w-4" />
                            {t(`extras.${extra}`)}
                          </OptionButton>
                        ))}
                      </OptionGrid>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <StepTitle icon={MapPin} label={t('stepLabels.step3')} title={t('step3Title')} />
                    <div className="grid gap-4 md:grid-cols-2">
                      <TextField label={t('city')} value={form.city} onChange={(value) => update('city', value)} placeholder="Miami" />
                      <TextField label={t('zipCode')} value={form.zip} onChange={(value) => update('zip', value.replace(/\D/g, '').slice(0, 5))} placeholder="33189" />
                    </div>
                    <div>
                      <FieldLabel icon={MapPin}>{t('backyardAccess')}</FieldLabel>
                      <OptionGrid>
                        {accessOptions.map((item) => (
                          <OptionButton key={item.value} active={form.backyardAccess === item.value} onClick={() => update('backyardAccess', item.value)}>
                            {t(`accessOptions.${item.value}`)}
                          </OptionButton>
                        ))}
                      </OptionGrid>
                    </div>
                    <div>
                      <FieldLabel icon={Ruler}>{t('desiredTimeline')}</FieldLabel>
                      <OptionGrid>
                        {timelineOptions.map((item) => (
                          <OptionButton key={item.value} active={form.timeline === item.value} onClick={() => update('timeline', item.value)}>
                            {t(`timelineOptions.${item.value}`)}
                          </OptionButton>
                        ))}
                      </OptionGrid>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-5">
                    <StepTitle icon={Mail} label={t('stepLabels.step4')} title={t('step4Title')} />
                    <OptionGrid>
                      {roles.map((item) => (
                        <OptionButton key={item.value} active={form.role === item.value} onClick={() => update('role', item.value)}>
                          {t(`roles.${item.value}`)}
                        </OptionButton>
                      ))}
                    </OptionGrid>
                    <div className="grid gap-4 md:grid-cols-2">
                      <TextField label={t('fullName')} value={form.name} onChange={(value) => update('name', value)} placeholder="Jane Smith" />
                      <TextField label={t('phone')} value={form.phone} onChange={(value) => update('phone', value)} placeholder="786-207-1634" />
                    </div>
                    <TextField label={t('email')} type="email" value={form.email} onChange={(value) => update('email', value)} placeholder="you@email.com" />
                    <label className="block">
                      <span className="mb-2 block text-sm font-semibold text-pool-deep">{t('notesLabel')}</span>
                      <textarea
                        value={form.notes}
                        onChange={(event) => update('notes', event.target.value)}
                        rows={4}
                        className="w-full rounded-2xl border border-pool-deep/10 bg-white/65 px-4 py-3 text-sm outline-none transition focus:border-pool-aqua"
                        placeholder={t('notesPlaceholder')}
                      />
                    </label>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {step === stepKeys.length - 1 ? (
              <>
                <FormConsentNotice
                  accepted={consentAccepted}
                  onAccept={acceptConsent}
                  id="create-by-yourself-consent"
                />
                <Recaptcha
                  ref={recaptchaRef}
                  onVerify={setRecaptchaToken}
                  onExpire={() => setRecaptchaToken('')}
                  onError={() => setRecaptchaToken('')}
                  className="mt-4"
                />
              </>
            ) : null}

            <div className="mt-8 flex flex-col gap-3 border-t border-pool-deep/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <button
                onClick={() => setStep((current) => Math.max(current - 1, 0))}
                disabled={step === 0 || status === 'loading'}
                className="glass-btn inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-pool-deep disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" /> {t('back')}
              </button>
              <button
                onClick={next}
                disabled={!canContinue() || status === 'loading'}
                className="glass-btn-primary hero-cta-primary inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white disabled:opacity-50"
              >
                {status === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {step === stepKeys.length - 1 ? t('send') : t('continue')}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <AnimatePresence>
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-5 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-green-800"
                >
                  {t('success')}
                  {mailto ? (
                    <a href={mailto} className="ml-1 font-semibold underline">{t('openEmailFallback')}</a>
                  ) : null}
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                >
                  {t('error')}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function StepTitle({ icon: Icon, label, title }: { icon: ComponentType<{ className?: string }>; label: string; title: string }) {
  return (
    <div>
      <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-pool-aqua">
        <Icon className="h-4 w-4" /> {label}
      </span>
      <h3 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-display font-bold text-pool-deep">{title}</h3>
    </div>
  );
}

function FieldLabel({ icon: Icon, children }: { icon: ComponentType<{ className?: string }>; children: ReactNode }) {
  return (
    <span className="mb-3 flex items-center gap-2 text-sm font-semibold text-pool-deep">
      <Icon className="h-4 w-4 text-pool-aqua" /> {children}
    </span>
  );
}

function OptionGrid({ children }: { children: ReactNode }) {
  return <div className="grid gap-3 sm:grid-cols-2">{children}</div>;
}

function OptionButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex min-h-12 items-center gap-2 rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition-all',
        active
          ? 'border-pool-aqua bg-pool-aqua text-white shadow-lg shadow-sky-500/20'
          : 'border-pool-deep/10 bg-white/60 text-pool-deep hover:border-pool-aqua/50 hover:bg-white'
      )}
    >
      {children}
    </button>
  );
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-pool-deep">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-pool-deep/10 bg-white/65 px-4 py-3 text-sm outline-none transition focus:border-pool-aqua"
      />
    </label>
  );
}
