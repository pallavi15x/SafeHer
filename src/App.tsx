import { useState, useEffect } from 'react';
import { useRouter } from './router';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AIChatbot from './components/AIChatbot';
import SOSButton from './components/SOSButton';

import HomePage from './pages/HomePage';
import FeaturesPage from './pages/FeaturesPage';
import HowItWorksPage from './pages/HowItWorksPage';
import ResourcesPage from './pages/ResourcesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';


function PageTransition({ children, pageKey }: { children: React.ReactNode; pageKey: string }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 40);
    return () => clearTimeout(t);
  }, [pageKey]);

  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(16px)',
      transition: 'opacity 0.4s ease, transform 0.4s ease',
    }}>
      {children}
    </div>
  );
}

// Loading screen component
function LoadingScreen({ done }: { done: boolean }) {
  const [hide, setHide] = useState(false);
  useEffect(() => {
    if (done) {
      setHide(true);
    }
  }, [done]);
  if (hide) return null;
  return (
    <div
      className="fixed inset-0 z-9999 flex flex-col items-center justify-center"
      style={{ background: '#0D0008', pointerEvents: done ? 'none' : 'auto' }}
    >
      <div className="relative mb-6">
        <svg width="80" height="88" viewBox="0 0 100 110" fill="none" className="animated-shield draw" aria-hidden="true">
          <path d="M50 5 L90 20 L90 55 C90 80 70 98 50 105 C30 98 10 80 10 55 L10 20 Z"
            stroke="#FF1F6E" strokeWidth="2.5" fill="rgba(255,31,110,0.1)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M36 52 L46 62 L66 42" stroke="#FF6B9D" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="absolute inset-0 rounded-full animate-glow-pulse"
          style={{ background: 'radial-gradient(circle, rgba(255,31,110,0.4) 0%, transparent 70%)' }} />
      </div>
      <h1 className="font-['Playfair_Display'] font-bold text-3xl text-white mb-2"
        style={{ textShadow: '0 0 30px rgba(255,31,110,0.7)' }}>
        SafeHer
      </h1>
      <p className="text-pink-400 text-sm">Your Safety, Our Priority</p>
      <div className="mt-6 flex gap-1">
        {[0, 1, 2].map(i => (
          <div key={i} className="w-2 h-2 rounded-full bg-pink-500 animate-glow-pulse"
            style={{ animationDelay: `${i * 0.2}s` }} />
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const { page, navigate } = useRouter();
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const [scrollPct, setScrollPct] = useState(0);

  // Show loading screen for exactly 2.5 seconds
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      setScrollPct((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.remove('light');
    else document.documentElement.classList.add('light');
  }, [darkMode]);

  // Scroll to top on page change
  useEffect(() => { window.scrollTo({ top: 0 }); }, [page]);

  const renderPage = () => {
    switch (page) {
      case 'home':         return <HomePage navigate={navigate} />;
      case 'features':     return <FeaturesPage />;
      case 'how-it-works': return <HowItWorksPage />;
      case 'resources':    return <ResourcesPage />;
      case 'about':        return <AboutPage />;
      case 'contact':      return <ContactPage />;
      default:             return <HomePage navigate={navigate} />;
    }
  };

  return (
  <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <LoadingScreen done={!loading} />
      {/* Scroll progress bar */}
      <div
        className="scroll-progress"
        style={{ width: `${scrollPct}%` }}
        role="progressbar"
        aria-valuenow={scrollPct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page scroll progress"
      />

      {/* Navbar — always visible */}
      <Navbar
        darkMode={darkMode}
        toggleDark={() => setDarkMode(!darkMode)}
        currentPage={page}
        navigate={navigate}
      />

      {/* Page content with transition */}
      <main>
        <PageTransition pageKey={page}>
          {renderPage()}
        </PageTransition>
      </main>

      {/* Footer — always visible */}
      <Footer navigate={navigate} />

      {/* Floating widgets */}
      <AIChatbot />
      <SOSButton />
    </div>
  );
}
