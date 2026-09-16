'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check, ImageIcon } from 'lucide-react';
import type { Pool } from '@/lib/pools';
import { formatCurrency, formatNumber } from '@/lib/utils';

interface PoolCardProps {
  pool: Pool;
  locale: string;
  index?: number;
}

export function PoolCard({ pool, locale, index = 0 }: PoolCardProps) {
  const t = useTranslations('PoolCard');
  const reduce = useReducedMotion();
  const hasImage = pool.images.length > 0;
  const hasPrice = pool.priceInitial != null && pool.priceInitial > 0;
  const detailHref =
    pool.productClass === 'spa'
      ? `/products/spa/${pool.slug}`
      : pool.productClass === 'ledge'
        ? `/products/pools/${pool.slug}`
        : `/products/pools/${pool.slug}`;

  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
      // Check if already visible on mount
      if (ref.current.getBoundingClientRect().top < window.innerHeight) {
        setIsVisible(true);
      }
    }

    return () => observer.disconnect();
  }, []);

  const cardContent = (
    <>
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-glass">
        {hasImage ? (
          <Image
            src={pool.images[0]}
            alt={`${pool.name} fiberglass pool`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-pool-deep/5">
            <ImageIcon className="h-12 w-12 text-pool-deep/20" />
          </div>
        )}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="glass-chip glass-chip-active text-xs font-semibold">
            {pool.modelCode}
          </span>
          {pool.inStock && (
            <span className="glass-chip text-xs flex items-center gap-1">
              <Check className="h-3 w-3" /> In stock
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-display font-bold text-pool-deep">
          {pool.modelCode} - {pool.name}
        </h3>
        <p className="mt-1 text-sm text-pool-deep/60">
          {pool.dimensionsText.width} × {pool.dimensionsText.length} · {pool.dimensionsText.depth}
        </p>

        <p className="mt-3 text-sm text-pool-deep/70 line-clamp-2">
          {pool.description[locale as keyof typeof pool.description] || pool.description.en}
        </p>

        {pool.colors.length > 0 && (
          // <div className="mt-4 flex flex-wrap gap-1.5">
          //   {pool.colors.slice(0, 3).map((color) => (
          //     <span key={color} className="glass-chip text-xs">
          //       {color}
          //     </span>
          //   ))}
          // </div>
          <div className="mt-4 flex flex-wrap gap-1.5">
            <span className="glass-chip text-xs">{t('colorsCount', { count: pool.colors.length })}</span>
          </div>
        )}

        <div className="mt-5 flex items-center justify-between">
          <div>
            {hasPrice && pool.priceInitial != null ? (
              <>
                <span className="text-xs text-pool-deep/50">Price Range</span>
                <p className="text-2xl font-bold text-gradient">
                  {formatCurrency(pool.priceInitial, locale)}
                  {pool.priceMax != null && pool.priceMax !== pool.priceInitial
                    ? ` – ${formatCurrency(pool.priceMax, locale)}`
                    : ''}
                </p>
                {pool.priceAverage != null && (
                  <p className="text-xs text-pool-deep/50">
                    Avg: {formatCurrency(pool.priceAverage, locale)}
                  </p>
                )}
              </>
            ) : (
              <p className="text-sm text-pool-deep/50">
                {formatNumber(pool.waterVolumeGallons, locale)} gal · {formatNumber(pool.weight, locale)} lbs
              </p>
            )}
          </div>
          <div className="glass-btn-primary flex items-center gap-2 px-4 py-2 text-sm text-white">
            Details
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </>
  );

  return (
    <Link href={detailHref}>
      {reduce ? (
        <div ref={ref} className="glass-card group">
          {cardContent}
        </div>
      ) : (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          animate={isVisible ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 30, filter: 'blur(8px)' }}
          transition={{
            duration: 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="glass-card group"
        >
          {cardContent}
        </motion.div>
      )}
    </Link>
  );
}