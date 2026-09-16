import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { SectionReveal, RevealItem } from '@/lib/motion/scroll-components';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { SITE_URL, BUSINESS_INFO } from '@/config/site';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'Meta.blog' });
  const title = t('title');
  const description = t('description');
  const ogImage = `/${params.locale}/opengraph-image`;

  return {
    title,
    description,
    alternates: {
      canonical: `/${params.locale}/blog`,
      languages: {
        'en-US': '/en/blog',
        'es-US': '/es/blog',
        'pt-BR': '/pt/blog',
        'x-default': '/en/blog',
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${params.locale}/blog`,
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

const posts = [
  {
    slug: 'fiberglass-pool-cost-miami-2026',
    title: 'How Much Does a Fiberglass Pool Cost in Miami? (2026 Guide)',
    excerpt: 'Complete breakdown of fiberglass pool costs in South Florida: shell, installation, permits, decking, and hidden fees.',
    date: '2026-06-15',
    dateFormatted: 'June 15, 2026',
    readTime: 8,
    image: '/blog/cost-guide.jpg',
    locale: 'en',
  },
  {
    slug: 'cuanto-cuesta-piscina-fibra-miami',
    title: '¿Cuánto Cuesta una Piscina de Fibra de Vidrio en Miami?',
    excerpt: 'Guía completa de costos de piscinas de fibra de vidrio en el sur de Florida: carcasa, instalación, permisos y más.',
    date: '2026-06-10',
    dateFormatted: '10 de junio de 2026',
    readTime: 7,
    image: '/blog/cost-guide-es.jpg',
    locale: 'es',
  },
  {
    slug: 'fiberglass-vs-concrete-pools-florida',
    title: 'Fiberglass vs Concrete Pools: Which Is Better for Florida?',
    excerpt: 'Climate, soil, hurricanes, maintenance — we compare fiberglass and concrete pools for South Florida homeowners.',
    date: '2026-05-28',
    dateFormatted: 'May 28, 2026',
    readTime: 10,
    image: '/blog/fiberglass-vs-concrete.jpg',
    locale: 'en',
  },
  {
    slug: 'pool-maintenance-checklist-florida',
    title: 'The Ultimate Florida Pool Maintenance Checklist',
    excerpt: 'Weekly, monthly, and seasonal tasks to keep your fiberglass pool crystal clear in the Florida climate.',
    date: '2026-05-15',
    dateFormatted: 'May 15, 2026',
    readTime: 6,
    image: '/blog/maintenance.jpg',
    locale: 'en',
  },
];

export default function BlogPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations('Blog');
  return (
    <>
      <section className="container mx-auto px-4 py-12">
        <div className="mb-6">
          <Breadcrumbs locale={locale} items={[{ name: t('hero.title'), href: '/blog' }]} />
        </div>
        <h1 className="text-4xl md:text-6xl font-display font-bold text-pool-deep">
          {t('hero.title')}
        </h1>
        <p className="mt-4 text-xl text-pool-deep/70 max-w-2xl">
          {t('hero.subtitle')}
        </p>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <RevealItem key={post.slug} custom={i}>
              <Link href={`/blog/${post.slug}`} className="glass-card group overflow-hidden block">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-pool-deep/50">
                    <time>{post.dateFormatted}</time>
                    <span>·</span>
                    <span>{t('minRead', { minutes: post.readTime })}</span>
                  </div>
                  <h2 className="mt-3 text-xl font-display font-bold text-pool-deep group-hover:text-pool-aqua transition-colors">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm text-pool-deep/70 line-clamp-3">{post.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-pool-aqua">
                    {t('readMore')} →
                  </span>
                </div>
              </Link>
            </RevealItem>
          ))}
        </div>
      </section>
    </>
  );
}