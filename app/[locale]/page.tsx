import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ArrowRight, Shield, Package, Palette, Clock, Phone } from 'lucide-react';
import { SectionReveal, RevealItem, ScrollRevealItem, HorizontalScrollSection, ParallaxBackground, HeroReveal, HeroItem, ScrollIndicator, StatCounter } from '@/lib/motion/scroll-components';
import { PoolCard } from '@/components/pool-card';
import { CreateByYourself } from '@/components/create-by-yourself';
import { ReviewsWidget } from '@/components/reviews-widget';
import { Certifications } from '@/components/certifications';
import { Carousel } from '@/components/carousel';
import { getFeaturedPools } from '@/lib/pools';
import { STATS } from '@/config/stats';
import { SOCIAL_LINKS } from '@/config/site';
import { SITE_URL, BUSINESS_INFO } from '@/config/site';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'Meta.home' });
  const title = t('title');
  const description = t('description');
  const ogImage = `/${params.locale}/opengraph-image`;

  return {
    title,
    description,
    alternates: {
      canonical: `/${params.locale}`,
      languages: {
        'en-US': '/en',
        'es-US': '/es',
        'pt-BR': '/pt',
        'x-default': '/en',
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${params.locale}`,
      images: [{ url: ogImage, width: 1200, height: 630, alt: BUSINESS_INFO.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations('Home');
  const featuredPools = getFeaturedPools();

  return (
    <div className="home-page">
      {/* === HERO === */}
      <section className="relative min-h-[90vh] overflow-hidden">
        <ParallaxBackground className="absolute inset-0 h-[90vh] w-full">
          <div className="relative h-full w-full">
            {/* <video
              src="/about/bg-pool-about.mp4"
              className="h-full w-full object-cover"
              autoPlay
              loop
              muted
            /> */}
            <Image
              // src="/iso-models/Pools/Colombian-Beach/Showroom/Columbian-Beach.png"
              src="/iso-models/Pools/Macaw-Cove/Showroom/Macaw-Cove-Compressed.webp"
              // src="/iso-models/Pools/Nova/Showroom/Nova-1.jpg"
              alt="Fiberglass pool installation in South Florida backyard"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </ParallaxBackground>

        {/* Dual-layer overlay for richer depth */}
        <div className="absolute inset-0 glass-hero-overlay" />
        <div className="absolute inset-0 hero-gradient-accent" />

        <div className="relative container mx-auto px-4 min-h-[90vh] flex items-center">
          <HeroReveal>
            <div className="max-w-3xl text-white">
              <HeroItem custom={0}>
                <span className="glass-chip-hero inline-block mb-6 text-white">
                  {t('hero.badge')}
                </span>
              </HeroItem>
              <HeroItem custom={1}>
                <h1 className="hero-title text-4xl sm:text-5xl md:text-7xl font-display font-bold leading-tight text-balance">
                  {t('hero.title')}
                </h1>
              </HeroItem>
              <HeroItem custom={2}>
                <p className="mt-6 text-base sm:text-lg md:text-xl text-white/85 max-w-2xl leading-relaxed">
                  {t('hero.subtitle')}
                </p>
              </HeroItem>
              <HeroItem custom={3}>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Link
                    href="/products"
                    className="glass-btn-primary hero-cta-primary px-7 py-3.5 text-white font-semibold flex items-center gap-2 text-base"
                  >
                    {t('hero.ctaPrimary')}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/create-by-yourself"
                    className="glass-btn hero-cta-secondary px-7 py-3.5 text-pool-deep font-semibold text-base"
                  >
                    {t('hero.ctaSecondary')}
                  </Link>
                </div>
              </HeroItem>
            </div>
          </HeroReveal>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-sm animate-float">
          {t('hero.scroll')}
        </div>
      </section>

      {/* === STATS === */}
      <section className="container mx-auto px-4 -mt-16 sm:-mt-20 relative z-10">
        <div className="stats-band">
          <div className="stats-band-item stats-band-item-hover">
            <StatCounter to={STATS.soldPools} suffix="+" label={t('stats.soldPools')} />
          </div>
          <div className="stats-band-item stats-band-item-hover">
            <StatCounter to={STATS.stylesInStock} suffix="+" label={t('stats.stylesInStock')} />
          </div>
          <div className="stats-band-item stats-band-item-hover">
            <StatCounter to={STATS.yearsExperience} suffix="" label={t('stats.yearsExperience')} />
          </div>
          <div className="stats-band-item stats-band-item-hover">
            <StatCounter to={0} suffix="" label={t('stats.warranty')} textValue={t('stats.warrantyText')} />
          </div>
        </div>
      </section>

      {/* === ABOUT === */}
      {/* To re-enable horizontal scroll, replace this <section> with <HorizontalScrollSection className="relative isolate bg-pool-cream" background={...} topBar={...}> and add shrink-0 / min-[768px]:w-screen / min-[768px]:h-screen back to each <article> */}
      <SectionReveal>
        {/* <HorizontalScrollSection
          className="relative isolate bg-pool-cream"
          background={ */}
            <section className="relative isolate bg-pool-cream">
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
              <div className="absolute -right-40 top-[8%] h-[32rem] w-[32rem] rounded-full bg-pool-mist/60 blur-3xl" />
              <div className="absolute -left-48 top-[48%] h-[28rem] w-[28rem] rounded-full bg-pool-sand/80 blur-3xl" />
              <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-pool-cream to-transparent" />
            </div>
          {/*   }   
            topBar={
            <div className="pointer-events-none absolute inset-x-0 top-[5.8rem] z-40 flex items-center justify-center gap-2 border-b border-pool-deep/15 bg-pool-cream/75 px-3 py-3 backdrop-blur-xl transition-[background-color,border-color,backdrop-filter] duration-300 min-[768px]:justify-between min-[768px]:gap-4 min-[768px]:px-10 min-[768px]:py-4 min-[1024px]:px-20"> */}
            <div className="pointer-events-none sticky top-0 z-40 flex items-center justify-center gap-2 border-b border-pool-deep/15 bg-pool-cream/75 px-3 py-3 backdrop-blur-xl transition-[background-color,border-color,backdrop-filter] duration-300 min-[768px]:justify-between min-[768px]:gap-4 min-[768px]:px-10 min-[768px]:py-4 min-[1024px]:px-20">
              <span className="hidden h-px flex-1 bg-pool-deep/15 min-[768px]:block" />
              <span className="whitespace-nowrap font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-pool-deep/65 min-[768px]:text-[12px] min-[768px]:tracking-[0.28em]">
                FLFG Pools / About
              </span>
              <span className="hidden h-px flex-1 bg-pool-deep/15 min-[768px]:block" />
            </div>
        
          {/* <article className="flex w-full shrink-0 min-[768px]:w-screen flex-col justify-center px-4 py-28 sm:px-10 min-[768px]:h-screen min-[768px]:px-6 min-[768px]:py-24 min-[1024px]:px-[9vw]"> */}
          <article className="flex w-full flex-col justify-center px-4 py-28 sm:px-10 min-[768px]:px-6 min-[768px]:py-24 min-[1024px]:px-[9vw]">
            <ScrollRevealItem direction="fade" className="max-w-4xl">
              {/* <span className="glass-chip-section-title">{t('about.label')}</span> */}
              <h2 className="mt-6 max-w-4xl text-[clamp(3rem,7vw,7rem)] font-display font-bold leading-[0.88] tracking-[-0.055em] text-pool-deep">
                {t('about.editorial.openingTitle')}
              </h2>
              <p className="mt-8 max-w-xl font-[var(--font-about-body)] text-[1rem] leading-[1.65] text-pool-deep/65 sm:text-xl">
                {t('about.editorial.openingDescription')}
              </p>
              <div className="mt-12 flex items-center gap-3 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-pool-deep/45 lg:mt-16">
                <span className="h-px w-11 bg-pool-aqua" />
                {t('hero.scroll')}
              </div>
            </ScrollRevealItem>
          </article>

          {/* <article className="flex w-full shrink-0 min-[768px]:w-screen items-center px-4 py-28 sm:px-10 min-[768px]:h-screen min-[768px]:px-6 min-[1024px]:px-[9vw]"> */}
          <article className="flex w-full items-center px-4 py-28 sm:px-10 min-[768px]:px-6 min-[1024px]:px-[9vw]">
            <div className="grid min-w-0 w-full items-center gap-10 min-[768px]:grid-cols-[minmax(18rem,0.72fr)_minmax(0,1.28fr)] min-[768px]:gap-4 min-[1024px]:gap-[8vw]">
              <ScrollRevealItem direction="fade" className="min-w-0 max-w-xl">
                <span className="mb-5 block font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-pool-deep/45">
                  01 / {t('about.label')}
                </span>
                <h3 className="mb-6 max-w-xl font-display text-[clamp(2.25rem,5vw,3rem)] font-bold leading-[0.92] tracking-[-0.05em] text-pool-deep">
                  {t('about.editorial.showroomTitle')}
                </h3>
                <p className="max-w-[38rem] font-[var(--font-about-body)] text-[1rem] leading-[1.7] text-pool-deep/70 sm:text-2xl">
                  {t('about.editorial.showroomDescription')}
                </p>
              </ScrollRevealItem>

              <ScrollRevealItem direction="fade" className="min-w-0 w-full">
                <div className="mb-5 flex items-center justify-between gap-6 border-b border-pool-deep/10 pb-3 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-pool-deep/45">
                  <span className="flex items-center gap-3"><span className="h-px w-8 bg-pool-aqua" />FLFG Pools / Visual archive</span>
                  <span>02 / 04</span>
                </div>
                <div className="grid h-[55vh] grid-cols-[1.8fr_1.9fr_0.1fr] items-center gap-3 sm:gap-5 min-[768px]:h-[68vh] min-[768px]:gap-4 min-[1024px]:gap-8">
                  {[
                    // { src: '/about/FloridaFiberglassPools-39.jpg', alt: 'FLFG Pools fiberglass pool installation', className: 'h-[48%] self-end min-[768px]:h-[55%]' },
                    { src: '/about/FloridaFiberglassPools-147.jpg', alt: 'Florida Fiberglass Pools pool model', className: 'h-[76%] self-start min-[768px]:h-[78%]' },
                    { src: '/about/FloridaFiberglassPools-236.jpg', alt: 'FLFG Pools Type A pool model', className: 'h-[90%] self-center min-[768px]:h-[92%]' },
                  ].map((image) => (
                    <figure key={image.src} className={`group relative min-h-0 overflow-hidden bg-pool-mist/40 shadow-[0_24px_55px_rgba(8,47,73,0.16)] ring-1 ring-pool-deep/10 ${image.className}`}>
                      <Image src={image.src} alt={image.alt} fill sizes="(max-width: 640px) 30vw, 26vw" className="object-cover transition duration-700 ease-out motion-reduce:transition-none group-hover:scale-105" />
                      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-pool-deep/75 to-transparent px-3 pb-3 pt-10 font-sans text-[10px] uppercase tracking-[0.14em] text-white/85">
                        FLFG Pools
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </ScrollRevealItem>
            </div>
          </article>

          {/* <article className="flex w-full shrink-0 min-[768px]:w-screen items-center px-4 py-28 sm:px-10 min-[768px]:h-screen min-[768px]:px-6 min-[1024px]:px-[9vw]"> */}
           <article className="flex w-full items-center px-4 py-28 sm:px-10 min-[768px]:px-6 min-[1024px]:px-[9vw]">
            <div className="grid min-w-0 w-full items-center gap-10 min-[768px]:grid-cols-[minmax(0,1.28fr)_minmax(18rem,0.72fr)] min-[768px]:gap-4 min-[1024px]:gap-[8vw]">
              <ScrollRevealItem direction="fade" className="order-2 min-w-0 w-full min-[768px]:order-1">
                <div className="mb-5 flex items-center justify-between gap-6 border-b border-pool-deep/10 pb-3 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-pool-deep/45">
                  <span className="flex items-center gap-3"><span className="h-px w-8 bg-pool-aqua" />FLFG Pools / Visual archive</span>
                  <span>03 / 04</span>
                </div>
                <div className="grid h-[55vh] grid-cols-[1.8fr_1.72fr_0.1fr] items-center gap-3 sm:gap-5 min-[768px]:h-[68vh] min-[768px]:gap-4 min-[1024px]:gap-8">
                  {[
                    { src: '/about/FloridaFiberglassPools-252.jpg', alt: 'FLFG Pools large pool collection', className: 'h-[90%] self-start min-[768px]:h-[92%]' },
                    // { src: '/about/FloridaFiberglassPools-298.jpg', alt: 'FLFG Pools 16ft x 22ft pool model', className: 'h-[56%] self-end min-[768px]:h-[58%]' },
                    { src: '/about/FloridaFiberglassPools-326.jpg', alt: 'FLFG Pools showroom building', className: 'h-[76%] self-center min-[768px]:h-[78%]' },
                  ].map((image) => (
                    <figure key={image.src} className={`group relative min-h-0 overflow-hidden bg-pool-mist/40 shadow-[0_24px_55px_rgba(8,47,73,0.16)] ring-1 ring-pool-deep/10 ${image.className}`}>
                      <Image src={image.src} alt={image.alt} fill sizes="(max-width: 640px) 30vw, 26vw" className="object-cover transition duration-700 ease-out motion-reduce:transition-none group-hover:scale-105" />
                      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-pool-deep/75 to-transparent px-3 pb-3 pt-10 font-sans text-[10px] uppercase tracking-[0.14em] text-white/85">
                        FLFG Pools
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </ScrollRevealItem>

              <ScrollRevealItem direction="fade" className="order-1 min-w-0 max-w-xl min-[768px]:order-2">
                <span className="mb-5 block font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-pool-deep/45">
                  02 / {t('about.label')}
                </span>
                <h3 className="mb-6 max-w-xl font-display text-[clamp(2.25rem,5vw,3rem)] font-bold leading-[0.92] tracking-[-0.05em] text-pool-deep">
                  {t('about.editorial.processTitle')}
                </h3>
                <p className="max-w-[38rem] font-[var(--font-about-body)] text-[clamp(1rem,1.4vw,1.5rem)] leading-[1.7] text-pool-deep/70">
                  {t('about.editorial.processDescription')}
                </p>
              </ScrollRevealItem>
            </div>
          </article>

          {/* <article className="relative flex w-full shrink-0 min-[768px]:w-screen flex-col justify-center overflow-hidden px-4 py-28 sm:px-10 min-[768px]:h-screen min-[768px]:px-6 min-[1024px]:px-[9vw]"> */}
             <article className="relative flex w-full flex-col justify-center overflow-hidden px-4 py-28 sm:px-10 min-[768px]:px-6 min-[1024px]:px-[9vw]">
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[clamp(9rem,28vw,28rem)] font-bold leading-none tracking-[-0.1em] text-pool-deep/[0.035]">
                FLFG
              </span>
              <span className="absolute left-1/2 top-1/2 h-px w-[min(70vw,54rem)] -translate-x-1/2 bg-pool-deep/10" />
              <span className="absolute left-1/2 top-1/2 h-[min(70vw,54rem)] w-px -translate-x-1/2 -translate-y-1/2 bg-pool-deep/10" />
              <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-pool-aqua bg-pool-cream shadow-[0_0_0_10px_rgba(14,165,233,0.08)]" />
              <span className="absolute left-1/2 top-[calc(60%+min(12vw,8rem))] hidden -translate-x-1/2 font-sans text-[12px] font-semibold uppercase tracking-[0.28em] text-pool-deep/35 min-[768px]:block">
                South Florida · Since 2013
              </span>
            </div>
            <ScrollRevealItem direction="fade" className="relative z-10 mx-auto max-w-xl px-2 text-center sm:px-0">
              <span className="mb-5 block font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-pool-deep/45">
                03 / {t('about.label')}
              </span>
              <h3 className="mb-5 font-display text-5xl pb-5 font-bold leading-[0.9] tracking-[-0.05em] text-pool-deep sm:text-6xl">
                {t('about.editorial.closingTitle')}
              </h3>
              <p className="mx-auto mb-8 max-w-md font-[var(--font-about-body)] text-lg leading-[1.65] text-pool-deep/65">
                {t('about.editorial.closingDescription')}
              </p>
              <Link href="/about" className="glass-btn-primary hero-cta-primary inline-flex items-center gap-2 px-5 py-2.5 mb-8 font-[var(--font-about-body)] text-white">
                {t('about.cta')}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <span className="block font-sans text-[12px] font-semibold uppercase tracking-[0.2em] text-pool-deep/35 min-[768px]:hidden">
                South Florida · Since 2013
              </span>
            </ScrollRevealItem>
          </article>
        {/* </HorizontalScrollSection> */}
         </section>
      </SectionReveal>

      {/* === WHY US — editorial list, not card grid === */}
      <SectionReveal>
        <section className="container mx-auto px-4 py-14 sm:py-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <RevealItem>
              <span className="glass-chip-section-title">{t('whyUs.label')}</span>
            </RevealItem>
            <RevealItem custom={1}>
              <h2 className="text-3xl sm:text-4xl md:text-4xl font-display font-bold text-pool-deep">
                {t('whyUs.title')}
              </h2>
            </RevealItem>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"> */}
            {[
              { icon: Shield, key: 'safety' as const },
              { icon: Package, key: 'stock' as const },
              { icon: Palette, key: 'custom' as const },
              { icon: Clock, key: 'warranty' as const },
            ].map((item, i) => (
              <RevealItem key={item.key} custom={i}>
                <div className="glass-card p-6 h-full">
                  <div className="w-12 h-12 rounded-xl bg-pool-aqua/10 flex items-center justify-center mb-4">
                    <item.icon className="h-6 w-6 text-pool-aqua" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-pool-deep">
                      {t(`whyUs.features.${item.key}.title`)}
                    </h3>
                  <p className="mt-2 text-sm text-pool-deep/70">
                      {t(`whyUs.features.${item.key}.description`)}
                    </p>
                </div>
              </RevealItem>
            ))}
          </div>
        </section>
      </SectionReveal>

      {/* === FEATURED POOLS === */}
      <SectionReveal>
        <section className="container mx-auto px-4 py-14 sm:py-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <RevealItem>
              <span className="glass-chip-section-title">{t('featuredPools.label')}</span>
            </RevealItem>
            <RevealItem custom={1}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-pool-deep">
                {t('featuredPools.title')}
              </h2>
            </RevealItem>
            <RevealItem custom={2}>
              <p className="mt-4 text-pool-deep/70">{t('featuredPools.subtitle')}</p>
            </RevealItem>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPools.map((pool, i) => (
              <PoolCard key={pool.slug} pool={pool} locale={locale} index={i} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/products"
              className="glass-btn-primary hero-cta-primary mt-6 inline-flex items-center gap-2 glass-btn-primary px-6 py-3 text-white"
            >
              {t('featuredPools.viewAll')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </SectionReveal>

      {/* === CREATE BY YOURSELF === */}
      <CreateByYourself />

      {/* === CERTIFICATIONS & PARTNERS === */}
      <Certifications />

      
      {/* === FINANCING === */}
      <SectionReveal>
        <section className="container mx-auto px-4 py-14 sm:py-8">
          <div className="glass-panel p-6 sm:p-8 md:p-12 grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="glass-chip-section-title">{t('financing.label')}</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-pool-deep">
                {t('financing.title')}
              </h2>
              <p className="mt-4 text-pool-deep/70">{t('financing.description')}</p>
              <a
                href="https://app.gethearth.com/partners/florida-fiberglass-pools-llc?utm_campaign=55117&utm_content=darkblue&utm_medium=contractor-website&utm_source=contractor&utm_term=310x120"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-btn-primary hero-cta-primary mt-6 inline-flex items-center gap-2 glass-btn-primary px-5 py-2 text-white"
              >
                {t('financing.cta')}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="glass-card p-8">
              <div className="text-center">
                <p className="text-sm text-pool-deep/60">{t('financing.label')}</p>
                <p className="text-3xl sm:text-4xl font-bold text-gradient">$285/mo*</p>
                <p className="text-xs text-pool-deep/50 mt-2">
                  {t('financing.description')}
                </p>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* === REVIEWS === */}
      {/* <ReviewsWidget /> */}

      {/* === CTA === */}
      <section className="container mx-auto px-4 py-14 sm:py-20">
        <div className="glass-card p-6 sm:p-8 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pool-aqua/10 to-transparent" />
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-pool-deep">
              {t('cta.title')}
            </h2>
            <p className="mt-4 text-lg text-pool-deep/70 max-w-2xl mx-auto">
              {t('cta.subtitle')}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="glass-btn-primary hero-cta-primary px-6 py-3 text-white font-medium"
              >
                {t('cta.button')}
              </Link>
              <a
                href={`tel:${SOCIAL_LINKS.phone}`}
                className="glass-btn px-6 py-3 text-pool-deep font-medium inline-flex items-center gap-2"
              >
                <Phone className="h-4 w-4" />
                {SOCIAL_LINKS.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
