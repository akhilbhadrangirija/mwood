"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const serviceItems = [
  {
    id: 'carpet',
    imageUrl: 'https://images.pexels.com/photos/4107286/pexels-photo-4107286.jpeg',
  },
  {
    id: 'sofa',
    imageUrl: 'https://images.pexels.com/photos/7534547/pexels-photo-7534547.jpeg',
  },
  {
    id: 'curtain',
    imageUrl: 'https://images.pexels.com/photos/17573843/pexels-photo-17573843.jpeg',
  },
  {
    id: 'deep',
    imageUrl: 'https://images.pexels.com/photos/4098778/pexels-photo-4098778.jpeg',
  },
] as const;

export default function Services() {
  const t = useTranslations('Services');
  const router = useRouter();
  const pathname = usePathname();

  const handleBook = (serviceId: string) => {
    const url = `${pathname}?service=${encodeURIComponent(serviceId)}`;
    router.push(url, { scroll: false });
    // Let Contact component center the form based on the param; no hash jump to top.
  };

  return (
    <section id="services" className="relative w-full bg-[#007ec7] py-20 md:py-32 overflow-hidden">
      {/* Premium background gradients */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute top-1/2 -right-32 h-96 w-96 rounded-full bg-[#41c0f0]/20 blur-3xl" />
        <div className="absolute -bottom-24 left-1/4 h-80 w-80 rounded-full bg-[#009fe3]/15 blur-3xl" />
      </div>

      <div className="page-margin relative z-10">
        {/* Header */}
        <div className="mb-20 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl font-bold text-white md:text-5xl"
          >
            {t('heading')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-6 max-w-3xl text-xl text-white/90"
          >
            {t('subheading')}
          </motion.p>
        </div>

        {/* Alternating service rows (Equipment-style) */}
        <div className="space-y-24">
          {serviceItems.map((service, index) => {
            const title = t(`items.${service.id}.title`);
            const tagline = t(`items.${service.id}.tagline`);
            const description = t(`items.${service.id}.description`);
            // Safely read bullets array
            const bullets = [];
            try {
              for (let i = 0; i < 4; i++) {
                const key = `items.${service.id}.bullets.${i}` as any;
                const bullet = t(key);
                if (bullet && bullet !== key) bullets.push(bullet);
              }
            } catch (e) {
              // No bullets available
            }

            const isEven = index % 2 === 0;

            return (
              <div
                key={service.id}
                className={`grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center ${
                  isEven ? '' : 'md:[&>div:first-child]:order-last'
                }`}
              >
                {/* Text content */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6 text-white"
                >
                  <div>
                    <h3 className="text-3xl font-bold md:text-4xl">{title}</h3>
                    <p className="mt-2 text-xl font-medium text-white/80">{tagline}</p>
                  </div>
                  <p className="text-lg leading-relaxed text-white/90">{description}</p>
                  {bullets.length > 0 && (
                    <ul className="space-y-3">
                      {bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-3">
                          <CheckCircleIcon className="mt-1 h-5 w-5 flex-shrink-0 text-white" />
                          <span className="text-white/90">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => handleBook(service.id)}
                      className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-3 text-base font-semibold text-[#007ec7] shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                    >
                      {t('bookThisService')}
                    </button>
                  </div>
                </motion.div>

                {/* Image */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6 }}
                  className="relative h-80 w-full overflow-hidden rounded-2xl shadow-2xl md:h-[420px]"
                >
                  <Image src={service.imageUrl} alt={title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/20" />
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}