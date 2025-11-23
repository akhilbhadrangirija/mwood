'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function Hero() {
  const tHero = useTranslations('Hero');
  const tCommon = useTranslations('Common');

  return (
  <section id="home" className="relative flex h-[70vh] w-full min-h-[520px] items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.pexels.com/photos/4107286/pexels-photo-4107286.jpeg"
          alt="Clean modern living room"
          fill
          priority
          className="object-cover"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
        {/* Brand gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-accent/40 to-secondary/80" />
      </div>

      {/* Content */}
      <div className="page-margin relative z-10 text-center w-full">
        <div className="max-w-4xl mx-auto">
          {/* MWood Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 flex justify-center"
          >
            <div className="relative h-20 w-48 md:h-28 md:w-64">
              <Image
                src="/mwood_logo.png"
                alt="MWood Services logo"
                fill
                priority
                className="object-contain drop-shadow-2xl"
                sizes="(min-width: 768px) 256px, 192px"
              />
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 text-4xl font-extrabold tracking-tight text-white text-shadow-white md:text-6xl"
          >
            {tHero('title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 max-w-2xl mx-auto text-lg text-gray-100 md:text-xl leading-relaxed"
          >
            {tHero('subtitle')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center"
          >
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#007ec7] to-[#009fe3] px-10 py-4 text-lg font-bold text-white shadow-xl transition-all duration-300 hover:shadow-2xl hover:from-[#006bb3] hover:to-[#008bd6] transform hover:-translate-y-1 focus:ring-4 focus:ring-[#007ec7]/50"
            >
              {tCommon('cta')}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}