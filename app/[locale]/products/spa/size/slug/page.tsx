import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { redirect } from 'next/navigation';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { pools, getPoolBySlug } from '@/lib/pools';
import { poolProductSchema } from '@/lib/schema/product';
import { formatCurrency } from '@/lib/utils';
import { Check, Ruler, Maximize, Waves, Droplets, ImageIcon } from 'lucide-react';
import { SITE_URL, BUSINESS_INFO } from '@/config/site';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  return pools
    .filter((pool) => pool.productClass === 'spa')
    .map((pool) => ({
      size: pool.sizeCategory,
      slug: pool.slug,
    }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; size: string; slug: string };
}): Promise<Metadata> {
  const pool = getPoolBySlug(params.slug);
  if (!pool || pool.productClass !== 'spa') return {};

  const title = `${pool.modelCode} ${pool.name} — Fiberglass Spa`;
  const description = pool.description[params.locale as keyof typeof pool.description] || pool.description.en;
  const ogImage = `/${params.locale}/opengraph-image`;

  return {
    title,
    description,
    alternates: {
      canonical: `/${params.locale}/products/spa/${params.size}/${params.slug}`,
      languages: {
        'en-US': `/en/products/spa/${params.size}/${params.slug}`,
        'es-US': `/es/products/spa/${params.size}/${params.slug}`,
        'pt-BR': `/pt/products/spa/${params.size}/${params.slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${params.locale}/products/spa/${params.size}/${params.slug}`,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${pool.modelCode} ${pool.name} - ${BUSINESS_INFO.name}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function SpaDetailPage({
  params: { locale, size, slug },
}: {
  params: { locale: string; size: string; slug: string };
}) {
  setRequestLocale(locale);
  const t = useTranslations('Products');
  const pool = getPoolBySlug(slug);
  if (!pool || pool.productClass !== 'spa') redirect(`/${locale}`);

  const schema = poolProductSchema(pool, locale);
  const relatedSpas = pools
    .filter((p) => p.slug !== pool.slug && p.productClass === 'spa')
    .slice(0, 3);

  const hasImages = pool.images.length > 0;
  const hasPrice = pool.priceInitial != null && pool.priceInitial > 0;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Breadcrumbs */}
      <section className="container mx-auto px-4 py-8">
        <Breadcrumbs locale={locale}
          items={[
            { name: t('hero.title'), href: '/products' },
            { name: `${pool.modelCode} ${pool.name}`, href: `/products/spa/${size}/${slug}` },
          ]}
        />
      </section>

      {/* Spa detail */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-6">
            <div className="glass-card overflow-hidden relative aspect-[4/3]">
              {hasImages ? (
                <Image
                  src={pool.images[0]}
                  alt={`${pool.name} fiberglass spa`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-pool-deep/5">
                  <ImageIcon className="h-16 w-16 text-pool-deep/20" />
                </div>
              )}
            </div>

            {pool.imagesIsoModels && pool.imagesIsoModels.length > 0 && (
              <div className="glass-card p-5">
                <div className="flex items-center gap-2 mb-4">
                  <span className="glass-chip glass-chip-active text-lg font-bold">
                    {t('detail.isoModels')}
                  </span>
                </div>
                <div className={`grid gap-3 ${
                  pool.imagesIsoModels.length === 1 ? 'grid-cols-1' :
                  pool.imagesIsoModels.length === 2 ? 'grid-cols-2' :
                  pool.imagesIsoModels.length === 3 ? 'grid-cols-3' :
                  'grid-cols-2 md:grid-cols-4'
                }`}>
                  {pool.imagesIsoModels.map((src, i) => (
                    <div
                      key={i}
                      className="relative aspect-[4/3] rounded-xl overflow-hidden bg-pool-mist/50 border border-pool-deep/5"
                    >
                      <Image
                        src={src}
                        alt={`${pool.name} 3D model render ${i + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-contain p-2"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <div className="flex items-center gap-3">
              <span className="glass-chip glass-chip-active text-sm font-semibold">
                {pool.modelCode}
              </span>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-pool-deep">
                {pool.name}
              </h1>
            </div>
            <div className="mt-3 flex gap-2">
              {pool.inStock && (
                <span className="glass-chip glass-chip-active text-sm flex items-center gap-1">
                  <Check className="h-3 w-3" /> {t('card.inStock')}
                </span>
              )}
              {pool.inStock === false && (
                <span className="glass-chip text-sm">{t('card.madeToOrder')}</span>
              )}
            </div>

            <p className="mt-6 text-lg text-pool-deep/70">
              {pool.description[locale as keyof typeof pool.description] || pool.description.en}
            </p>

            {/* Specs */}
            <div className="mt-8 glass-card p-6">
              <h2 className="text-xl font-display font-bold mb-4">{t('detail.specs')}</h2>
              <dl className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm text-pool-deep/60 flex items-center gap-1">
                    <Ruler className="h-4 w-4" /> {t('detail.length')}
                  </dt>
                  <dd className="text-lg font-semibold">{pool.dimensionsText.length}</dd>
                </div>
                <div>
                  <dt className="text-sm text-pool-deep/60 flex items-center gap-1">
                    <Maximize className="h-4 w-4" /> {t('detail.width')}
                  </dt>
                  <dd className="text-lg font-semibold">{pool.dimensionsText.width}</dd>
                </div>
                <div>
                  <dt className="text-sm text-pool-deep/60 flex items-center gap-1">
                    <Waves className="h-4 w-4" /> {t('detail.depth')}
                  </dt>
                  <dd className="text-lg font-semibold">{pool.dimensionsText.depth}</dd>
                </div>
                <div>
                  <dt className="text-sm text-pool-deep/60 flex items-center gap-1">
                    <Droplets className="h-4 w-4" /> {t('detail.waterVolume')}
                  </dt>
                  <dd className="text-lg font-semibold">
                    {pool.waterVolumeGallons.toLocaleString()} gal
                  </dd>
                </div>
              </dl>
            </div>

            {/* Features */}
            <div className="mt-6">
              <h2 className="text-xl font-display font-bold mb-3">{t('detail.features')}</h2>
              <ul className="space-y-2">
                {pool.features[locale as keyof typeof pool.features]?.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-pool-aqua" />
                    {feature}
                  </li>
                )) || pool.features.en.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-pool-aqua" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Colors */}
            {pool.colors.length > 0 && (
              <div className="mt-6">
                <h2 className="text-xl font-display font-bold mb-3">{t('detail.colors')}</h2>
                <div className="flex flex-wrap gap-2">
                  {pool.colors.map((color) => (
                    <span key={color} className="glass-chip text-sm">{color}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Price + CTA */}
            <div className="mt-8 flex flex-col gap-5 glass-panel p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div>
                {hasPrice && pool.priceInitial != null ? (
                  <>
                    <p className="text-sm text-pool-deep/60">{t('detail.priceRange')}</p>
                    <p className="text-3xl font-bold text-gradient">
                      {formatCurrency(pool.priceInitial, locale)}
                      {pool.priceMax != null && pool.priceMax !== pool.priceInitial
                        ? ` – ${formatCurrency(pool.priceMax, locale)}`
                        : ''}
                    </p>
                    {pool.priceAverage != null && (
                      <p className="text-sm text-pool-deep/50">
                        {t('detail.avgPrice')}: {formatCurrency(pool.priceAverage, locale)}
                      </p>
                    )}
                  </>
                ) : (
                  <p className="text-sm text-pool-deep/60">{t('detail.contactForPricing')}</p>
                )}
              </div>
              <Link
                href="/contact"
                className="glass-btn-primary inline-flex w-full justify-center px-6 py-3 text-white font-medium sm:w-auto"
              >
                {t('detail.requestQuote')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {relatedSpas.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-display font-bold text-center mb-8">
            {t('detail.relatedPools')}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedSpas.map((p) => (
              <Link
                key={p.slug}
                href={`/products/spa/${p.sizeCategory}/${p.slug}`}
                className="glass-card group overflow-hidden"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  {p.images.length > 0 ? (
                    <Image
                      src={p.images[0]}
                      alt={p.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-pool-deep/5">
                      <ImageIcon className="h-10 w-10 text-pool-deep/20" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-display font-bold">{p.modelCode} {p.name}</h3>
                  <p className="text-sm text-pool-deep/60">
                    {p.dimensionsText.length} × {p.dimensionsText.width}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
