import { useInView } from '../hooks';
import {
  AlertCircle, MapPin, PhoneCall, Mic, Timer, Users,
  WifiOff, FileText, Brain, Watch, EyeOff, BarChart2,
  ArrowRight
} from 'lucide-react';

const features = [
  { icon: AlertCircle, title: 'SOS Alert', desc: 'Instantly notify all emergency contacts with one tap and your live location. Works in under 2 seconds even in offline mode via SMS.', color: '#FF1F6E' },
  { icon: MapPin, title: 'Live Location', desc: 'Share real-time GPS location with trusted contacts in emergencies. They can follow your journey and get alerted if you deviate from your route.', color: '#22c55e' },
  { icon: PhoneCall, title: 'Fake Call', desc: 'Get a fake incoming call to escape uncomfortable or dangerous situations without drawing attention.', color: '#3b82f6' },
  { icon: Mic, title: 'Audio Recording', desc: 'Silently record audio in dangerous situations as evidence. Recordings are encrypted and backed up to the cloud automatically.', color: '#f59e0b' },
  { icon: Timer, title: 'Safety Timer', desc: "Set a timer before entering an uncertain situation. If you don't check in before it expires, alerts are automatically sent to your contacts.", color: '#a855f7' },
  { icon: Users, title: 'Community Support', desc: 'Connect with nearby SafeHer users, seek peer help, and report unsafe zones. Safety is stronger together.', color: '#ec4899' },
  { icon: WifiOff, title: 'Offline Mode', desc: 'Core safety features — SOS via SMS, audio recording, pre-set location sharing — work even without internet connection.', color: '#14b8a6' },
  { icon: FileText, title: 'Incident Report', desc: 'File a detailed safety report with photo evidence and GPS location. Share directly with law enforcement when needed.', color: '#f97316' },
  { icon: Brain, title: 'AI Risk Assessment', desc: "AI analyzes your route and flags high-risk zones before you travel. Enter origin and destination to get your personalized safety score.", color: '#06b6d4' },
  { icon: Watch, title: 'Wearable Integration', desc: 'Sync with your smartwatch for silent SOS activation without taking out your phone. Compatible with major wearables.', color: '#84cc16' },
  { icon: EyeOff, title: 'Stealth Mode', desc: 'App disguises itself as a regular calculator or utility app. A secret code opens SafeHer instantly without anyone noticing.', color: '#6366f1' },
  { icon: BarChart2, title: 'Safety Analytics', desc: 'View your personal safety history, patterns, and insights. Know which routes, times, and areas are statistically safer for you.', color: '#d946ef' },
];

export default function FeaturesPage() {
  const { ref, inView } = useInView();

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6" style={{ background: 'radial-gradient(ellipse at top, rgba(255,31,110,0.08) 0%, transparent 60%)' }}>
      <div className="w-full max-w-[92%] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto">
        {/* Page Header */}
        <div ref={ref as React.RefObject<HTMLDivElement>} className={`text-center mb-16 reveal ${inView ? 'visible' : ''}`}>
          <div className="tag-pill mx-auto mb-4">12 Powerful Features</div>
          <h1 className="font-['Playfair_Display'] font-extrabold mb-4" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', lineHeight: 1.12 }}>
            <span className="text-white">Features Built for </span>
            <span className="shimmer-text">Every Situation</span>
          </h1>
          <p className="text-(--text-secondary) max-w-2xl mx-auto text-lg leading-relaxed">
            SafeHer packs 12 carefully designed safety tools — from one-tap SOS to AI route analysis — so you're protected in any scenario, anywhere in the world.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            const delay = Math.min(i % 6, 7) + 1;
            return (
              <div
                key={feat.title}
                className={`feature-card p-7 group reveal ${inView ? 'visible' : ''} delay-${delay}`}
              >
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300"
                  style={{ background: `${feat.color}18`, border: `1.5px solid ${feat.color}40` }}
                >
                  <Icon size={26} style={{ color: feat.color }} />
                </div>

                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-pink-300 transition-colors">{feat.title}</h3>
                <p className="text-(--text-secondary) text-sm leading-relaxed mb-4">{feat.desc}</p>

                <button className="flex items-center gap-1.5 text-xs font-semibold text-pink-400 hover:text-pink-300 transition-colors group/btn">
                  Learn More
                  <ArrowRight size={13} className="transition-transform group-hover/btn:translate-x-1" />
                </button>

                {/* Bottom glow line on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl"
                  style={{ background: `linear-gradient(90deg, transparent, ${feat.color}, transparent)` }} />
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className={`text-center mt-16 reveal ${inView ? 'visible' : ''} delay-8`}>
          <div className="glass-card inline-flex flex-col sm:flex-row items-center gap-4 px-8 py-6">
            <div className="text-left">
              <p className="text-white font-bold text-lg">Ready to stay safe?</p>
              <p className="text-(--text-secondary) text-sm">All core features are free forever.</p>
            </div>
            <button className="pink-glow-btn px-8 py-3 text-base whitespace-nowrap">Get Started Free →</button>
          </div>
        </div>
      </div>
    </div>
  );
}
