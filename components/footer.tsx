import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { Instagram, Facebook, MessageCircle, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { SOCIAL_LINKS, BUSINESS_INFO } from '@/config/site';

export function Footer() {
  const t = useTranslations('Footer');
  const tNav = useTranslations('Nav');
  const year = new Date().getFullYear();

  return (
    <footer className="glass-footer mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
              {/* Logo */}
              <Link href="/" className="flex shrink-0 items-center">
                <Image
                  src="/header/logo-alta.png"
                  alt="FLFG Pools"
                  width={220}
                  height={136}
                  style={{ width: 'auto', height: 'auto' }}
                  className="h-9 w-auto"
                  priority
                />
              </Link>
            <p className="mt-3 text-sm text-pool-deep/70">
              {t('tagline')}
            </p>

            {/* 10-Year Seal */}
            <div className="mt-5">
            </div>
          </div>

          {/* Sitemap */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-pool-deep/60">
              {t('sitemap')}
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/" className="link-underline">{tNav('home')}</Link></li>
              <li><Link href="/about" className="link-underline">{tNav('about')}</Link></li>
              <li><Link href="/products" className="link-underline">{tNav('products')}</Link></li>
              <li><Link href="/showroom" className="link-underline">{tNav('showroom')}</Link></li>
              <li><Link href="/info/faqs" className="link-underline">{tNav('faqs')}</Link></li>
              <li><Link href="/info/pool-benefits" className="link-underline">{tNav('poolBenefits')}</Link></li>
              <li><Link href="/info/pool-pricing-guide" className="link-underline">{tNav('poolPricingGuide')}</Link></li>
              <li><Link href="/info/fiberglass-concrete" className="link-underline">{tNav('fiberglassVsConcrete')}</Link></li>
              <li><Link href="/contact" className="link-underline">{tNav('contact')}</Link></li>
            </ul>
          </div>

          {/* Pools & Spa */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-pool-deep/60">
              {t('poolsSpa')}
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/products?size=upTo16" className="link-underline">{t('sizes.upTo16')}</Link></li>
              <li><Link href="/products?size=16to22" className="link-underline">{t('sizes.16to22')}</Link></li>
              <li><Link href="/products?size=22plus" className="link-underline">{t('sizes.22plus')}</Link></li>
              <li><Link href="/products?size=spa" className="link-underline">{t('sizes.spa')}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-pool-deep/60">
              {t('contact')}
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href={`tel:${SOCIAL_LINKS.phone}`} className="flex items-start gap-2 link-underline">
                  <Phone className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>{SOCIAL_LINKS.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${SOCIAL_LINKS.email}`} className="flex items-start gap-2 link-underline">
                  <Mail className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>{SOCIAL_LINKS.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>
                  {SOCIAL_LINKS.address.street}<br />
                  {SOCIAL_LINKS.address.city}, {SOCIAL_LINKS.address.state} {SOCIAL_LINKS.address.zip}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="h-4 w-4 mt-0.5 shrink-0" />
                <span>
                  {t('hours.monFri')}: {SOCIAL_LINKS.hours.weekday}<br />
                  {t('hours.sat')}: {SOCIAL_LINKS.hours.saturday}<br />
                  {t('hours.sun')}: {SOCIAL_LINKS.hours.sunday}
                </span>
              </li>
            </ul>
            
            <div className="mt-4 flex gap-3">
              <a
                href={SOCIAL_LINKS.instagram}
                aria-label="Instagram"
                className="glass-chip"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={SOCIAL_LINKS.facebook}
                aria-label="Facebook"
                className="glass-chip"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={`https://wa.me/${SOCIAL_LINKS.whatsapp}`}
                aria-label="WhatsApp"
                className="glass-chip"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-10 glass-card p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div>
              <h4 className="font-display font-bold text-lg">{t('newsletter')}</h4>
              <p className="text-sm text-pool-deep/70 mt-1">{t('languages')}</p>
            </div>
            <form className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder={t('newsletterPlaceholder')}
                className="glass-chip w-full sm:flex-1 md:w-64"
                required
              />
              <button type="submit" className="glass-btn-primary px-5 py-2 text-white text-sm font-medium whitespace-nowrap">
                {t('newsletterCta')}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-8 border-t border-pool-deep/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-pool-deep/60">
          <p>© {year} {BUSINESS_INFO.legalName}. {t('rights')}</p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            {/* <Link href="/privacy-policy" className="link-underline">{t('privacyPolicy')}</Link>
            <Link href="/terms-and-conditions" className="link-underline">{t('termsAndConditions')}</Link> */}
            <span>{t('languages')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}