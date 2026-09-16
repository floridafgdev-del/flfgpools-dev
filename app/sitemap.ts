import type { MetadataRoute } from 'next';
import { locales } from '@/i18n/routing';
import { pools } from '@/lib/pools';
import { SITE_URL } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;
  const lastModified = new Date();

  const staticPages = [
    '',
    '/about',
    '/products',
    '/showroom',
    '/contact',
    '/create-by-yourself',
    '/info/faqs',
    '/info/fiberglass-concrete',
    '/info/pool-benefits',
    '/info/pool-pricing-guide',
  ];

  const entries: MetadataRoute.Sitemap = [];

  // Static pages
  staticPages.forEach((path) => {
    locales.forEach((locale) => {
      entries.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified,
        changeFrequency: path === '' ? 'weekly' : 'monthly',
        priority: path === '' ? 1 : path === '/products' ? 0.9 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}${path}`])
          ),
        },
      });
    });
  });

  // Pool detail pages
  pools
    .filter((p) => p.productClass === 'pool')
    .forEach((pool) => {
      locales.forEach((locale) => {
        entries.push({
          url: `${baseUrl}/${locale}/products/pools/${pool.slug}`,
          lastModified,
          changeFrequency: 'monthly',
          priority: 0.8,
          alternates: {
            languages: Object.fromEntries(
              locales.map((l) => [l, `${baseUrl}/${l}/products/pools/${pool.slug}`])
            ),
          },
        });
      });
    });

  // Spa detail pages
  pools
    .filter((p) => p.productClass === 'spa')
    .forEach((spa) => {
      locales.forEach((locale) => {
        entries.push({
          url: `${baseUrl}/${locale}/products/spa/${spa.slug}`,
          lastModified,
          changeFrequency: 'monthly',
          priority: 0.7,
          alternates: {
            languages: Object.fromEntries(
              locales.map((l) => [l, `${baseUrl}/${l}/products/spa/${spa.slug}`])
            ),
          },
        });
      });
    });

  return entries;
}