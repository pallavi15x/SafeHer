import { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { useInView } from '../hooks';

const FAQS = [
  { q: 'How does the SOS feature work?', a: 'Press and hold the SOS button for 2 seconds. SafeHer instantly sends your GPS location, a distress message, and begins audio recording. All your emergency contacts are notified simultaneously.' },
  { q: 'Is SafeHer available for both Android and iOS?', a: 'Yes! SafeHer is available on both Google Play Store and Apple App Store. Download the latest version for the best experience.' },
  { q: 'How do I add emergency contacts?', a: "Go to Profile → Emergency Contacts → tap the + button. You can add up to 10 trusted contacts. They'll receive a verification request via SMS before being added." },
  { q: 'Does SafeHer work without internet?', a: 'Yes! Core features like SOS alerts via SMS, audio recording, and pre-set location sharing work in offline mode. GPS-based features require a network connection.' },
  { q: 'Is my data secure and private?', a: 'Absolutely. SafeHer uses AES-256 end-to-end encryption. We never sell your data. Your location is only shared with your designated contacts and only when you activate a feature.' },
  { q: 'What is Stealth Mode?', a: 'Stealth Mode disguises SafeHer as a regular calculator or utility app. Your home screen shows a different icon, but pressing a secret code opens SafeHer instantly.' },
  { q: 'Can I use SafeHer for my child\'s safety?', a: "SafeHer works for anyone who needs personal safety. For teens, parents can be added as emergency contacts to receive all safety alerts and location updates." },
  { q: 'Is SafeHer free to use?', a: 'The core safety features are completely free. Premium features like AI Route Analysis, Safety Analytics, and Wearable Integration are available with SafeHer Pro.' },
];

function FAQItem({ q, a, delay }: { q: string; a: string; delay: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`faq-item reveal ${delay}`} style={{}}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left bg-transparent border-none outline-hidden"
        aria-expanded={open}
      >
        <span className="text-white font-semibold text-sm sm:text-base pr-4">{q}</span>
        <ChevronDown
          size={18}
          className="text-pink-400 shrink-0 transition-transform duration-300"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>
      <div
        style={{
          maxHeight: open ? '400px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.35s ease',
        }}
      >
        <p className="px-5 pb-4 text-(--text-secondary) text-sm leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const { ref, inView } = useInView();
  const [search, setSearch] = useState('');

  const filtered = FAQS.filter(
    f => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="py-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className={`text-center mb-12 reveal ${inView ? 'visible' : ''}`}>
          <div className="tag-pill mx-auto mb-4">FAQ</div>
          <h2 className="font-['Playfair_Display'] font-extrabold text-3xl sm:text-5xl mb-4">
            <span className="text-white">Frequently Asked </span>
            <span className="shimmer-text">Questions</span>
          </h2>
          <p className="text-(--text-secondary) mb-8">Everything you need to know about SafeHer</p>
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search FAQs..."
              className="w-full bg-white/5 border border-pink-500/25 rounded-2xl pl-11 pr-4 py-3 text-white placeholder-gray-500 text-sm outline-hidden focus:border-pink-500/60 transition-colors"
              aria-label="Search FAQs" />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {filtered.length > 0
            ? filtered.map((faq, i) => (
                <FAQItem key={faq.q} q={faq.q} a={faq.a} delay={inView ? `delay-${Math.min(i + 1, 8)} visible` : ''} />
              ))
            : <div className="text-center py-8 text-gray-500">No results for "{search}"</div>
          }
        </div>

        <div className={`text-center mt-10 glass-card p-6 reveal ${inView ? 'visible' : ''} delay-8`}>
          <p className="text-white font-semibold mb-2">Still have questions?</p>
          <p className="text-(--text-secondary) text-sm mb-4">Chat with our AI or contact our support team directly.</p>
          <button onClick={() => { window.location.hash = 'contact'; window.scrollTo({ top: 0 }); }}
            className="pink-glow-btn px-6 py-2.5 text-sm">Contact Support</button>
        </div>
      </div>
    </section>
  );
}
