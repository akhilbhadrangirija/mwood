'use client';

export default function Navbar() {
  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'About Us', href: '#about' },
    { name: 'Equipment', href: '#equipment' },
    { name: 'Clients', href: '#clients' },
  ];

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
    <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md shadow-md animate-fade-in">
      <div className="page-margin">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <a 
            href="#home" 
            onClick={(e) => handleSmoothScroll(e, '#home')}
            className="text-3xl font-bold text-[#007ec7] transition-all duration-300 hover:scale-105"
          >
            MWood <span className="text-[#009fe3]">Services</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden space-x-6 md:flex">
            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className={`text-gray-700 hover:text-[#007ec7] transition-all duration-300 hover:scale-105 animate-fade-in animate-delay-${(index + 1) * 100}`}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Contact Button */}
          <a
            href="#contact"
            onClick={(e) => handleSmoothScroll(e, '#contact')}
            className="hidden rounded-md bg-[#007ec7] px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-[#007ec7]/90 md:block"
          >
            Get a Free Quote
          </a>
          
          {/* Mobile Menu Button (Add functionality later) */}
          <div className="md:hidden">
            <button className="text-gray-700 focus:outline-none">
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
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}