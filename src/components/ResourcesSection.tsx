import { useState } from 'react';
import { Search, ExternalLink } from 'lucide-react';
import { useInView } from '../hooks';

const TIPS = [
  { icon: '🥊', title: 'Self-Defense Basics', tip: 'Learn basic self-defense moves. Target vulnerable areas: eyes, nose, throat. Practice situational awareness daily.', category: 'Physical Safety' },
  { icon: '🌙', title: 'Night Travel Safety', tip: 'Stay on well-lit routes, share your live location, travel with company, keep your phone charged, and trust your instincts.', category: 'Travel' },
  { icon: '🔒', title: 'Digital Safety', tip: 'Use strong unique passwords, enable 2FA, avoid public Wi-Fi for sensitive tasks, and regularly audit your app permissions.', category: 'Digital' },
  { icon: '🆘', title: 'Emergency Situations', tip: 'Stay calm, call for help loudly, use your SOS app, go to a crowded public place, and memorize key emergency numbers.', category: 'Emergency' },
  { icon: '🚗', title: 'Ride Safety', tip: "Verify your driver's identity, share ride details with a contact, sit in the back, and always have SafeHer running.", category: 'Travel' },
  { icon: '🏠', title: 'Home Security', tip: "Install good locks, use security cameras, don't open doors to strangers, keep emergency numbers accessible.", category: 'Home' },
];

const EMERGENCY = [
  { country: '🇮🇳 India', police: '100', ambulance: '108', women: '1091', other: '112' },
  { country: '🇺🇸 USA', police: '911', ambulance: '911', women: '1-800-799-7233', other: '911' },
  { country: '🇬🇧 UK', police: '999', ambulance: '999', women: '0808 2000 247', other: '999' },
  { country: '🇦🇺 Australia', police: '000', ambulance: '000', women: '1800 737 732', other: '000' },
  { country: '🇨🇦 Canada', police: '911', ambulance: '911', women: '1-800-363-9010', other: '911' },
  { country: '🇩🇪 Germany', police: '110', ambulance: '112', women: '08000 116 016', other: '112' },
];

const ARTICLES = [
  { title: 'Know Your Legal Rights as a Woman', category: 'Legal', excerpt: 'A comprehensive guide to understanding laws protecting women from harassment, assault, and workplace discrimination.', date: 'Mar 2025', img: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?w=400&h=220&fit=crop' },
  { title: 'Workplace Safety: Building Boundaries', category: 'Workplace', excerpt: 'How to identify toxic work environments, document incidents, and take action against workplace harassment.', date: 'Feb 2025', img: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?w=400&h=220&fit=crop' },
  { title: 'Solo Travel Safety Guide for Women', category: 'Travel', excerpt: 'Everything you need to know about traveling alone safely — from planning to emergency preparedness.', date: 'Jan 2025', img: 'https://images.pexels.com/photos/1051073/pexels-photo-1051073.jpeg?w=400&h=220&fit=crop' },
  { title: 'Digital Privacy: Protecting Yourself Online', category: 'Digital', excerpt: 'Practical steps to safeguard your digital identity, prevent stalking, and secure your personal data online.', date: 'Dec 2024', img: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?w=400&h=220&fit=crop' },
];

export default function ResourcesSection() {
  const { ref, inView } = useInView();
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState('');

  const tabs = ['Safety Tips', 'Emergency Numbers', 'Articles & Guides'];
  const filteredEmergency = EMERGENCY.filter(e => e.country.toLowerCase().includes(search.toLowerCase()));

  return (
    <section id="resources" ref={ref as React.RefObject<HTMLElement>} className="py-24 px-4 sm:px-6">
      <div className="w-full max-w-[92%] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto">
        <div className={`text-center mb-12 reveal ${inView ? 'visible' : ''}`}>
          <div className="tag-pill mx-auto mb-4">Resources</div>
          <h2 className="font-['Playfair_Display'] font-extrabold text-3xl sm:text-5xl mb-4">
            <span className="text-white">Safety </span><span className="shimmer-text">Resources</span>
          </h2>
          <p className="text-(--text-secondary) max-w-lg mx-auto">Knowledge is power. Access guides, emergency contacts, and expert articles.</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 justify-center mb-10 flex-wrap">
          {tabs.map((t, i) => (
            <button key={t} onClick={() => setTab(i)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${tab === i ? 'pink-glow-btn' : 'border border-pink-500/30 text-(--text-secondary) hover:border-pink-500/60 hover:text-white'}`}
              aria-selected={tab === i} role="tab">
              {t}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {tab === 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TIPS.map((tip, i) => (
              <div key={tip.title} className={`feature-card p-6 group reveal ${inView ? 'visible' : ''} delay-${Math.min(i + 1, 8)}`}>
                <div className="text-3xl mb-3">{tip.icon}</div>
                <span className="tag-pill text-xs mb-3 inline-block">{tip.category}</span>
                <h3 className="text-white font-bold text-base mb-2 group-hover:text-pink-300 transition-colors">{tip.title}</h3>
                <p className="text-(--text-secondary) text-sm leading-relaxed mb-3">{tip.tip}</p>
                <button className="text-pink-400 text-xs font-semibold flex items-center gap-1 hover:text-pink-300 transition-colors">
                  Read More <ExternalLink size={12} />
                </button>
              </div>
            ))}
          </div>
        )}

        {tab === 1 && (
          <div>
            <div className="relative mb-6 max-w-sm mx-auto">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search by country..."
                className="w-full bg-white/5 border border-pink-500/25 rounded-xl pl-9 pr-4 py-2.5 text-white placeholder-gray-500 text-sm outline-hidden focus:border-pink-500/60 transition-colors"
                aria-label="Search emergency numbers" />
            </div>
            <div className="glass-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ background: 'rgba(255,31,110,0.08)', borderBottom: '1px solid rgba(255,31,110,0.15)' }}>
                      {['Country','Police','Ambulance','Women Helpline','General Emergency'].map(h => (
                        <th key={h} className="text-left px-5 py-3 text-pink-400 text-xs font-bold uppercase tracking-wide">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmergency.map((row, i) => (
                      <tr key={row.country} style={{ borderBottom: '1px solid rgba(255,31,110,0.08)', background: i % 2 === 0 ? 'transparent' : 'rgba(255,31,110,0.03)' }} className="hover:bg-pink-500/5 transition-colors">
                        <td className="px-5 py-4 text-white font-semibold text-sm">{row.country}</td>
                        <td className="px-5 py-4 text-green-400 font-bold">{row.police}</td>
                        <td className="px-5 py-4 text-blue-400 font-bold">{row.ambulance}</td>
                        <td className="px-5 py-4 text-pink-300 font-bold">{row.women}</td>
                        <td className="px-5 py-4 text-yellow-400 font-bold">{row.other}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {tab === 2 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {ARTICLES.map((art, i) => (
              <div key={art.title} className={`feature-card overflow-hidden group reveal ${inView ? 'visible' : ''} delay-${i + 1}`}>
                <div className="h-44 overflow-hidden">
                  <img src={art.img} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="tag-pill text-xs py-1">{art.category}</span>
                    <span className="text-gray-500 text-xs">{art.date}</span>
                  </div>
                  <h3 className="text-white font-bold text-base mb-2 group-hover:text-pink-300 transition-colors">{art.title}</h3>
                  <p className="text-(--text-secondary) text-sm leading-relaxed mb-3">{art.excerpt}</p>
                  <button className="text-pink-400 text-sm font-semibold flex items-center gap-1 hover:text-pink-300 transition-colors">
                    Read Full Article <ExternalLink size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
