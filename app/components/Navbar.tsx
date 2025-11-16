"use client";

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';
import { Suspense } from 'react';
import Image from 'next/image';

export default function Navbar() {
  const tNav = useTranslations('Navbar');
  const tCommon = useTranslations('Common');
  const [isOpen, setIsOpen] = useState(false);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  // Optional: lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape key for accessibility
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);
  const navItems = [
    { name: tNav('home'), href: '#home' },
    { name: tNav('services'), href: '#services' },
    { name: tNav('about'), href: '#about' },
    { name: tNav('equipment'), href: '#equipment' },
    { name: tNav('clients'), href: '#clients' },
  ];

  return (
    <>
    <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md shadow-md animate-fade-in">
      <div className="page-margin">
  <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center transition-transform duration-300 hover:scale-105"
            aria-label="MWood Services Home"
          >
            <Image
              src={`${basePath}/mwood_logo.png`}
              alt="MWood Services logo"
              width={220}
              height={56}
              priority
              className="h-12 md:h-14 w-auto"
              sizes="(min-width: 768px) 224px, 180px"
            />
          </a>

          {/* Desktop Nav (links) */}
          <div className="hidden items-center gap-6 md:flex">
            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                className={`text-gray-700 hover:text-[#007ec7] transition-all duration-300 hover:scale-105 animate-fade-in animate-delay-${(index + 1) * 100}`}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Desktop Actions: Language + CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Suspense fallback={null}>
              <LanguageSwitcher />
            </Suspense>
            <a
              href="#contact"
              className="rounded-md bg-[#007ec7] px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-[#007ec7]/90"
            >
              {tCommon('cta')}
            </a>
          </div>
          
          {/* Mobile Menu Button (Add functionality later) */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-700 focus:outline-none"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsOpen((o) => !o)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
  </nav>
    {/* Portal: Mobile menu overlay rendered at body level to avoid navbar stacking context */}
    {typeof document !== 'undefined' && createPortal(
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            aria-hidden={!isOpen}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 md:hidden z-[9999] bg-white"
          >
            {/* Close button */}
            <div className="absolute top-6 right-6 z-10">
              <button
                type="button"
                aria-label="Close menu"
                className="p-3 rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Brand heading */}
            <div className="absolute top-6 left-6 right-16 flex items-center justify-center">
              <div className="text-center">
                <div className="flex items-center justify-center">
                  <Image
                    src={`${basePath}/mwood_logo.png`}
                    alt="MWood Services logo"
                    width={180}
                    height={48}
                    className="h-12 w-auto"
                    sizes="(max-width: 768px) 180px, 224px"
                  />
                </div>
                <div className="mt-1 text-xs text-gray-500">Premium Cleaning in Dubai</div>
              </div>
            </div>

            {/* Centered Menu Links */}
            <div className="absolute inset-0 flex items-center justify-center px-6">
              <nav className="text-center w-full max-w-sm">
                <motion.ul className="flex flex-col items-center gap-4">
                  {navItems.map((item, idx) => (
                    <motion.li
                      key={item.name}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * idx }}
                    >
                      <a
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="text-2xl font-semibold text-gray-800 hover:text-[#007ec7] transition-colors"
                      >
                        {item.name}
                      </a>
                    </motion.li>
                  ))}
                </motion.ul>
              </nav>
            </div>

            {/* Bottom Actions */}
            <div className="absolute inset-x-0 bottom-0 p-6">
              <div className="mb-3 flex items-center gap-3">
                <Suspense fallback={null}>
                  <LanguageSwitcher placement="top" onSelect={() => setIsOpen(false)} />
                </Suspense>
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#007ec7] to-[#009fe3] px-5 py-3 text-white text-base font-semibold shadow-lg hover:from-[#006bb3] hover:to-[#008bd6] transition-colors"
                >
                  {tCommon('cta')}
                </a>
              </div>
              <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                <a href="tel:+971503545972" className="inline-flex items-center gap-2 hover:text-[#007ec7]">
                  <PhoneIcon className="h-4 w-4" /> +971 50-3545972
                </a>
                <span className="text-gray-300">|</span>
                <a href="mailto:info@mwooduae.com" className="inline-flex items-center gap-2 hover:text-[#007ec7]">
                  <EnvelopeIcon className="h-4 w-4" /> info@mwooduae.com
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
    )}
    </>
  );
}