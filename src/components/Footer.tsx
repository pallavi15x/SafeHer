import { SafeHerLogo } from './Navbar';
import { Instagram, Facebook, Twitter, Youtube } from './SocialIcons';
import type { Page } from '../router';

const quickLinks: { label: string; page: Page }[] = [
  { label: 'Home', page: 'home' },
  { label: 'Features', page: 'features' },
  { label: 'How It Works', page: 'how-it-works' },
  { label: 'Resources', page: 'resources' },
  { label: 'Contact Us', page: 'contact' },
];

const supportLinks = ['Help Center', 'Safety Tips', 'Privacy Policy', 'Terms & Conditions'];

const socials = [
  { Icon: Instagram, label: 'Instagram' },
  { Icon: Facebook, label: 'Facebook' },
  { Icon: Twitter, label: 'Twitter / X' },
  { Icon: Youtube, label: 'YouTube' },
];

interface FooterProps {
  navigate: (p: Page) => void;
}

export default function Footer({ navigate }: FooterProps) {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,31,110,0.12)', background: 'rgba(8,0,5,0.97)' }} role="contentinfo">
      <div className="w-full max-w-[92%] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Col 1 — Brand */}
          <div>
            <button
              onClick={() => navigate('home')}
              className="flex items-center gap-2.5 mb-4 bg-transparent border-none outline-hidden"
              aria-label="SafeHer home"
            >
              <SafeHerLogo size={28} />
              <span className="font-['Playfair_Display'] font-bold text-xl text-white"
                style={{ textShadow: '0 0 20px rgba(255,31,110,0.4)' }}>SafeHer</span>
            </button>
            <p className="text-(--text-secondary) text-sm leading-relaxed mb-5">
              Your trusted companion for personal safety. Empowering women with real-time protection and community support.
            </p>
            <div className="flex gap-2">
              {socials.map(({ Icon, label }) => (
                <a key={label} href="#" aria-label={label}
                  className="w-9 h-9 rounded-full border border-pink-500/30 flex items-center justify-center text-gray-400 hover:text-pink-400 hover:border-pink-500/70 hover:bg-pink-500/10 transition-all duration-200 hover:scale-110">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-pink-500 rounded-sm" />Quick Links
            </h3>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map(({ label, page }) => (
                <li key={page}>
                  <button
                    onClick={() => navigate(page)}
                    className="text-(--text-secondary) text-sm hover:text-pink-400 transition-colors text-left bg-transparent border-none outline-hidden"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Support */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-pink-500 rounded-sm" />Support
            </h3>
            <ul className="flex flex-col gap-2.5">
              {supportLinks.map(link => (
                <li key={link}>
                  <a href="#" className="text-(--text-secondary) text-sm hover:text-pink-400 transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-pink-500 rounded-sm" />Contact
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-(--text-secondary)">
              <li><a href="mailto:support@safeher.com" className="hover:text-pink-400 transition-colors">support@safeher.com</a></li>
              <li><a href="tel:+919876643210" className="hover:text-pink-400 transition-colors">+91 98766 43210</a></li>
              <li className="text-green-400 font-semibold text-xs">● Available 24/7</li>
            </ul>
            <div className="mt-6 flex flex-col gap-2">
              <button className="glass-card px-4 py-2.5 flex items-center gap-2 hover:border-pink-500/60 transition-all duration-200 text-left group">
                <span className="text-2xl">📱</span>
                <div>
                  <p className="text-gray-500 text-xs">Download on the</p>
                  <p className="text-white font-bold text-sm group-hover:text-pink-300 transition-colors">App Store</p>
                </div>
              </button>
              <button className="glass-card px-4 py-2.5 flex items-center gap-2 hover:border-pink-500/60 transition-all duration-200 text-left group">
                <span className="text-2xl">▶</span>
                <div>
                  <p className="text-gray-500 text-xs">Get it on</p>
                  <p className="text-white font-bold text-sm group-hover:text-pink-300 transition-colors">Google Play</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-wrap items-center justify-between gap-4" style={{ borderTop: '1px solid rgba(255,31,110,0.08)' }}>
          <p className="text-gray-500 text-sm">© 2025 SafeHer. All rights reserved. Built with ❤️ for every woman's safety.</p>
          <div className="flex gap-4 text-gray-600 text-xs">
            <a href="#" className="hover:text-pink-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-pink-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-pink-400 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
