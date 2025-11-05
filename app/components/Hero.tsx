'use client';

import Image from 'next/image';

export default function Hero() {
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      // Get the navbar height to account for offset
      const navbarHeight = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

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
        />
        {/* Brand gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-accent/40 to-secondary/80" />
      </div>

      {/* Content */}
      <div className="page-margin relative z-10 text-center w-full">
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white text-shadow-white md:text-6xl animate-fade-in-up">
            Sparkling Clean. Every Time.
          </h1>
          <p className="mb-8 max-w-2xl mx-auto text-lg text-gray-100 md:text-xl leading-relaxed animate-fade-in-up animate-delay-200">
            Professional residential and commercial cleaning in Dubai using safe chemicals and pro-grade equipment.
          </p>
          <div className="flex justify-center animate-fade-in-up animate-delay-400">
            <a
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, '#contact')}
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#007ec7] to-[#009fe3] px-10 py-4 text-lg font-bold text-white shadow-xl transition-all duration-300 hover:shadow-2xl hover:from-[#006bb3] hover:to-[#008bd6] transform hover:-translate-y-1 focus:ring-4 focus:ring-[#007ec7]/50"
            >
              Get a Free Quote
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}