import { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, Download } from 'lucide-react';
import type { Page } from '../router';

const navLinks: { label: string; page: Page }[] = [
  { label: 'Home', page: 'home' },
  { label: 'Features', page: 'features' },
  { label: 'How It Works', page: 'how-it-works' },
  { label: 'Resources', page: 'resources' },
  { label: 'About Us', page: 'about' },
  { label: 'Contact', page: 'contact' },
];

interface NavbarProps {
  darkMode: boolean;
  toggleDark: () => void;
  currentPage: Page;
  navigate: (p: Page) => void;
}

export function SafeHerLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 110" fill="none" className="transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(255,31,110,0.95)]" aria-hidden="true">
      <path d="M50 5 L90 20 L90 55 C90 80 70 98 50 105 C30 98 10 80 10 55 L10 20 Z" fill="url(#logoShieldGrad)" stroke="#FF1F6E" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M55 28 C43 28 38 36 38 44 C38 50 41 52 39 55 C37 58 33 61 33 67 C33 74 39 77 43 79 C48 81 55 81 60 79 C65 77 67 73 67 67 C67 61 65 58 63 55 C61 52 64 50 64 44 C64 36 59 28 55 28 Z" fill="url(#faceGrad)" />
      <path d="M48 33 C42 33 39 38 39 45 C39 50 42 52 44 54 C46 56 45 59 43 61 C40 63 38 66 38 70 C38 75 42 79 48 79 C54 79 58 75 58 70 C58 66 56 63 53 61 C51 59 50 56 52 54 C54 52 57 50 57 45 C57 38 54 33 48 33 Z" fill="#FFF" opacity="0.95" />
      <defs>
        <linearGradient id="logoShieldGrad" x1="50" y1="5" x2="50" y2="105" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF1F6E" stopOpacity="0.3"/>
          <stop offset="1" stopColor="#7a0035" stopOpacity="0.7"/>
        </linearGradient>
        <linearGradient id="faceGrad" x1="50" y1="28" x2="50" y2="79" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF6B9D"/>
          <stop offset="1" stopColor="#FF1F6E"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Navbar({ darkMode, toggleDark, currentPage, navigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on page change
  useEffect(() => { setMobileOpen(false); }, [currentPage]);

  const handleNav = (page: Page) => {
    navigate(page);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-500 glass-nav transition-all duration-500 ${scrolled ? 'py-2' : 'py-4'}`}
        style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(-20px)', transition: 'padding 0.3s ease, opacity 0.6s ease, transform 0.6s ease' }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="w-full max-w-[92%] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-2.5 group bg-transparent border-none outline-hidden"
            aria-label="SafeHer — Home"
          >
            <SafeHerLogo size={32} />
            <div className="flex flex-col items-start">
              <span className="font-['Playfair_Display'] font-bold text-xl text-white group-hover:text-pink-400 transition-colors duration-300"
                style={{ textShadow: '0 0 20px rgba(255,31,110,0.4)', lineHeight: 1.2 }}>
                SafeHer
              </span>
              <span className="text-[9px] text-pink-300/70 font-medium tracking-wide" style={{ marginTop: '-1px' }}>
                Your Safety, Our Priority
              </span>
            </div>
          </button>

          {/* Desktop Links */}
          <ul className="hidden lg:flex items-center gap-1" role="list">
            {navLinks.map(({ label, page }) => {
              const isActive = currentPage === page;
              return (
                <li key={page}>
                  <button
                    onClick={() => handleNav(page)}
                    className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 bg-transparent border-none outline-hidden ${
                      isActive
                        ? 'text-pink-400'
                        : 'text-(--text-secondary) hover:text-white hover:bg-pink-500/8'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {label}
                    {isActive && (
                      <span
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-pink-500"
                        style={{ boxShadow: '0 0 6px rgba(255,31,110,0.9)' }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleDark}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              className="p-2 rounded-full border border-pink-500/20 hover:border-pink-500/60 hover:bg-pink-500/10 transition-all duration-300"
            >
              {darkMode ? <Sun size={17} className="text-yellow-300" /> : <Moon size={17} className="text-pink-400" />}
            </button>

            <button className="hidden sm:flex pink-glow-btn items-center gap-2 px-5 py-2.5 text-sm" aria-label="Download SafeHer app">
              <Download size={15} />
              Download App
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-white hover:text-pink-400 transition-colors bg-transparent border-none outline-hidden"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className="fixed inset-0 z-490 lg:hidden flex flex-col items-center justify-center gap-7"
        style={{
          background: 'rgba(13,0,8,0.97)',
          backdropFilter: 'blur(20px)',
          transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.32s cubic-bezier(0.4,0,0.2,1)',
          pointerEvents: mobileOpen ? 'auto' : 'none',
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        aria-hidden={!mobileOpen}
      >
        {/* Close button top-right */}
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white transition-colors bg-transparent border-none outline-hidden"
          aria-label="Close menu"
        >
          <X size={24} />
        </button>

        {/* Logo in mobile menu */}
        <div className="flex items-center gap-2 mb-4">
          <SafeHerLogo size={30} />
          <span className="font-['Playfair_Display'] font-bold text-2xl text-white">SafeHer</span>
        </div>

        {navLinks.map(({ label, page }) => {
          const isActive = currentPage === page;
          return (
            <button
              key={page}
              onClick={() => handleNav(page)}
              className={`text-xl font-semibold transition-colors bg-transparent border-none outline-hidden px-6 py-2 rounded-xl ${
                isActive ? 'text-pink-400 bg-pink-500/10' : 'text-white hover:text-pink-400'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              {label}
            </button>
          );
        })}

        <button className="pink-glow-btn flex items-center gap-2 px-8 py-3 mt-3">
          <Download size={17} />
          Download App
        </button>
      </div>
    </>
  );
}
