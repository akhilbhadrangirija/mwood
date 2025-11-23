"use client";

import Image from 'next/image';
import { CheckCircleIcon, CheckBadgeIcon, ShieldCheckIcon, SparklesIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useEffect, useState, useRef } from 'react';
import { useMessages } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

interface EquipmentItem {
  id: string;
  title: string;
  tabLabel?: string;
  image: string;
  summary: string;
  bullets: string[];
  description?: string[];
  benefitsTitle?: string;
  subheadline?: string;
  specs?: string[];
}

// Original simple feature list (fallback) remains available
const featureIds = ['feature1', 'feature2', 'feature3', 'feature4'] as const;

type EquipmentProps = {
  variant?: 'simple' | 'tabs';
};

export default function Equipment({ variant = 'simple' }: EquipmentProps) {
  const t = useTranslations('Equipment');
  const left = { hidden: { opacity: 0, x: -30 }, show: { opacity: 1, x: 0 } };
  const right = { hidden: { opacity: 0, x: 30 }, show: { opacity: 1, x: 0 } };
  const router = useRouter();
  const pathname = usePathname();

  // Build equipment items from translation messages (English currently)
  const messages = useMessages() as any;
  const itemsObject = (messages?.Equipment?.items || {}) as Record<string, any>;
  const equipmentItems: EquipmentItem[] = Object.entries(itemsObject).map(([id, data]) => ({
    id,
    title: data.title,
    tabLabel: data.tabLabel || data.title,
    image: data.image,
    summary: data.summary,
    bullets: data.bullets || [],
    description: data.description || [],
    benefitsTitle: data.benefitsTitle,
    subheadline: data.subheadline,
    specs: data.specs || []
  }));

  // State for tabs variant (default to first item if available)
  const [active, setActive] = useState(equipmentItems[0]?.id);
  const [showSpecs, setShowSpecs] = useState(false);
  const userSelectedRef = useRef(false);
  const current = equipmentItems.find(e => e.id === active);

  // State for simple variant - track expanded specs for each item
  const [expandedSpecs, setExpandedSpecs] = useState<Record<string, boolean>>({});

  useEffect(() => { setShowSpecs(false); }, [active]);

  // Auto-switch tabs every 3 seconds unless user has manually selected
  useEffect(() => {
    if (variant !== 'tabs' || equipmentItems.length === 0) return;
    
    const interval = setInterval(() => {
      if (!userSelectedRef.current) {
        const currentIndex = equipmentItems.findIndex(item => item.id === active);
        const nextIndex = (currentIndex + 1) % equipmentItems.length;
        setActive(equipmentItems[nextIndex].id);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [active, equipmentItems, variant]);

  if (variant === 'tabs') {
    if (!current) {
      return null; // No data loaded yet
    }
    return (
      <section id="equipment" className="w-full bg-linear-to-br from-[#007bff] to-[#5ba8f3] py-28">
        <div className="page-margin">
          {/* Localized section heading/description */}
          <div className="mb-10 max-w-3xl text-white">
            <motion.h2
              variants={left}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mb-3 text-3xl font-bold md:text-4xl lg:text-5xl"
            >
              {t('heading')}
            </motion.h2>
            <motion.p
              variants={left}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-base leading-relaxed opacity-90 md:text-lg"
            >
              {t('description')}
            </motion.p>
          </div>
          <div className="mb-6 flex flex-wrap gap-3">
            {equipmentItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  userSelectedRef.current = true;
                  setActive(item.id);
                }}
                className={`rounded-full cursor-pointer px-5 py-2 transition-all ${
                  active === item.id
                    ? 'bg-white text-[#0f5db6] shadow-md ring-2 ring-white/70'
                    : 'bg-white/15 text-white/90 hover:bg-white/25'
                }`}
              >
                {item.tabLabel ?? item.title}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-3 text-white"
              >
                <h3 className="text-3xl font-semibold md:text-4xl">{current.title}</h3>
                {current.subheadline && (
                  <p className="text-base italic text-[#e6f0fa] opacity-90">{current.subheadline}</p>
                )}
                {current.description && (
                  <div className="space-y-4 text-base leading-relaxed opacity-90">
                    {current.description.map(paragraph => (
                      <p key={paragraph} className="text-[#eaf3fd]">{paragraph}</p>
                    ))}
                  </div>
                )}
                <div className="space-y-4">
                  {current.benefitsTitle && (
                    <h4 className="text-xl font-semibold tracking-tight">{current.benefitsTitle}</h4>
                  )}
                  <ul className="space-y-3">
                    {current.bullets.map(b => (
                      <li key={b} className="flex items-start gap-3">
                        <CheckCircleIcon className="mt-1 h-5 w-5 shrink-0 text-white" />
                        <span className="leading-relaxed text-[#eaf3fd]">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {current.specs && current.specs.length > 0 && (
                  <div className="pt-2">
                    <button
                      onClick={() => setShowSpecs(s => !s)}
                      className="text-sm font-semibold text-white/95 underline underline-offset-4 hover:text-white"
                    >
                      {showSpecs ? t('specs.hide') : t('specs.show')}
                    </button>
                    <AnimatePresence initial={false}>
                      {showSpecs && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <ul className="mt-3 list-disc space-y-1 pl-5 text-[#eaf3fd]">
                            {current.specs.map(s => (
                              <li key={s}>{s}</li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-wrap items-center gap-3 text-white/95">
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-medium">
                      <ShieldCheckIcon className="h-4 w-4" /> {t('badges.iso')}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-medium">
                      <SparklesIcon className="h-4 w-4" /> {t('badges.ecoSafe')}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-medium">
                      <CheckBadgeIcon className="h-4 w-4" /> {t('badges.karcherAuthorized')}
                    </span>
                  </div>
                  
                </div>
              </motion.div>
            </AnimatePresence>
              <div className="relative h-80 w-full overflow-hidden rounded-2xl shadow-2xl md:h-[600px]">
                <Image src={current.image} alt={`${t('imageAlt')}: ${current.title}`} fill className="object-cover" />
                
              </div>
              <button
                    type="button"
                    onClick={() => {
                      router.push(pathname, { scroll: false });
                      setTimeout(() => {
                        const el = document.getElementById('contact-form');
                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }, 0);
                    }}
                    className="cursor-pointer inline-flex items-center justify-center rounded-full bg-white px-5 py-2 font-semibold text-[#0f5db6] shadow-sm transition hover:shadow"
                  >
                    {t('ctaExperience')}
                  </button>
            </div>
          </div>
      </section>
    );
  }

  // Default simple variant - show all equipment items in a grid
  if (equipmentItems.length === 0) {
    return null; // No data loaded yet
  }

  return (
    <section id="equipment" className="w-full bg-linear-to-br from-[#009fe3] via-[#007bff] to-[#5ba8f3] py-20 md:py-32">
      <div className="page-margin">
        {/* Section heading */}
        <div className="mb-12 text-center text-white">
          <motion.h2
            variants={left}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl"
          >
            {t('heading')}
          </motion.h2>
          <motion.p
            variants={left}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-3xl text-base leading-relaxed opacity-90 md:text-lg"
          >
            {t('description')}
          </motion.p>
        </div>

        {/* Equipment items grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {equipmentItems.map((item, index) => (
            <motion.div
              key={item.id}
              variants={left}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm shadow-xl transition-all duration-300 hover:bg-white/15 hover:shadow-2xl"
            >
              {/* Image */}
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={`${t('imageAlt')}: ${item.title}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6 text-white">
                <h3 className="mb-2 text-2xl font-semibold md:text-3xl">{item.title}</h3>
                {item.subheadline && (
                  <p className="mb-4 text-sm italic text-white/80">{item.subheadline}</p>
                )}
                
                {item.description && item.description.length > 0 && (
                  <div className="mb-4 space-y-2 text-sm leading-relaxed text-white/90">
                    {item.description.slice(0, 2).map((paragraph, idx) => (
                      <p key={idx} className="line-clamp-2">{paragraph}</p>
                    ))}
                  </div>
                )}

                {item.benefitsTitle && (
                  <h4 className="mb-3 text-lg font-semibold">{item.benefitsTitle}</h4>
                )}

                {item.bullets && item.bullets.length > 0 && (
                  <ul className="mb-4 space-y-2">
                    {item.bullets.slice(0, 4).map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-white" />
                        <span className="leading-relaxed text-white/90">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Specs (expandable) */}
                {item.specs && item.specs.length > 0 && (
                  <div className="mb-4">
                    <button
                      onClick={() => setExpandedSpecs(prev => ({
                        ...prev,
                        [item.id]: !prev[item.id]
                      }))}
                      className="text-xs font-semibold text-white/95 underline underline-offset-4 hover:text-white"
                    >
                      {expandedSpecs[item.id] ? t('specs.hide') : t('specs.show')}
                    </button>
                    <AnimatePresence initial={false}>
                      {expandedSpecs[item.id] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-white/80">
                            {item.specs.map((spec, idx) => (
                              <li key={idx}>{spec}</li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* Badges */}
                <div className="mb-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-1 text-xs font-medium">
                    <ShieldCheckIcon className="h-3 w-3" /> {t('badges.iso')}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-1 text-xs font-medium">
                    <SparklesIcon className="h-3 w-3" /> {t('badges.ecoSafe')}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-1 text-xs font-medium">
                    <CheckBadgeIcon className="h-3 w-3" /> {t('badges.karcherAuthorized')}
                  </span>
                </div>

                {/* CTA Button */}
                <button
                  type="button"
                  onClick={() => {
                    router.push(pathname, { scroll: false });
                    setTimeout(() => {
                      const el = document.getElementById('contact-form');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 0);
                  }}
                  className="mt-auto cursor-pointer inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0f5db6] shadow-sm transition hover:shadow-md"
                >
                  {t('ctaExperience')}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}