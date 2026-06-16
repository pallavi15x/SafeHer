import { useState } from 'react';
import { useInView } from '../hooks';
import { Shield, MapPin, Users, AlertCircle, Clock, Mic } from 'lucide-react';

const SCREENS = [
  {
    id: 'sos', label: 'SOS Alert', icon: AlertCircle, color: '#FF1F6E',
    title: 'One-Tap Emergency Alert',
    desc: 'Instantly alert all your emergency contacts with your live GPS location in under 2 seconds.',
    benefits: ['GPS location shared instantly', 'Notifies up to 10 contacts', 'Auto-starts audio recording', 'Works offline via SMS'],
  },
  {
    id: 'map', label: 'Live Location', icon: MapPin, color: '#22c55e',
    title: 'Real-Time GPS Tracking',
    desc: 'Share your live location with trusted contacts. They follow your journey and get alerted if you deviate.',
    benefits: ['Live location sharing', 'Route deviation alerts', 'Battery-optimized', 'Easy one-tap toggle'],
  },
  {
    id: 'community', label: 'Community', icon: Users, color: '#3b82f6',
    title: 'Community Safety Network',
    desc: 'Connect with nearby SafeHer users, report unsafe zones, and look out for each other.',
    benefits: ['Find nearby SafeHer users', 'Report unsafe zones', 'Community SOS alerts', 'Peer support system'],
  },
  {
    id: 'timer', label: 'Safety Timer', icon: Clock, color: '#f59e0b',
    title: 'Check-In Safety Timer',
    desc: "Set a timer before entering an uncertain situation. Auto-alerts sent if you don't check in.",
    benefits: ['Customizable duration', 'Auto-alert on expiry', 'Grace period + snooze', 'Recurring timer support'],
  },
  {
    id: 'record', label: 'Audio Record', icon: Mic, color: '#a855f7',
    title: 'Silent Audio Recording',
    desc: 'Covertly record evidence in dangerous situations. Recordings are encrypted and backed up.',
    benefits: ['Silent activation', 'Encrypted cloud backup', 'No storage limit', 'Share with authorities'],
  },
];

function PhoneScreen({ screen }: { screen: typeof SCREENS[0] }) {
  const Icon = screen.icon;
  return (
    <div className="w-full h-full bg-linear-to-b from-gray-900 to-black px-4 pt-8 pb-4 flex flex-col">
      <div className="flex items-center gap-2 mb-5">
        <Shield size={14} className="text-pink-400" />
        <span className="text-white text-xs font-bold">SafeHer</span>
      </div>
      <div className="flex flex-col items-center text-center mb-5">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3"
          style={{ background: `${screen.color}20`, border: `1.5px solid ${screen.color}50` }}>
          <Icon size={24} style={{ color: screen.color }} />
        </div>
        <p className="text-white font-bold text-sm">{screen.label}</p>
        <p style={{ color: screen.color }} className="text-xs font-semibold mt-0.5">Active</p>
      </div>
      <div className="flex flex-col gap-2">
        {screen.benefits.map((b) => (
          <div key={b} className="flex items-center gap-2 glass-card px-3 py-2">
            <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: screen.color }} />
            <span className="text-gray-300 text-xs">{b}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AppShowcase() {
  const { ref, inView } = useInView();
  const [active, setActive] = useState(0);

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="py-24 px-4 sm:px-6">
      <div className="w-full max-w-[92%] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto">
        <div className={`text-center mb-16 reveal ${inView ? 'visible' : ''}`}>
          <div className="tag-pill mx-auto mb-4">App Preview</div>
          <h2 className="font-['Playfair_Display'] font-extrabold text-3xl sm:text-5xl mb-4">
            <span className="text-white">See SafeHer </span>
            <span className="shimmer-text">In Action</span>
          </h2>
          <p className="text-(--text-secondary) max-w-lg mx-auto">
            Explore key features with this interactive preview of the SafeHer app.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Phone */}
          <div className={`shrink-0 reveal-left ${inView ? 'visible' : ''}`}>
            <div className="relative animate-float">
              <div className="absolute -inset-8 rounded-full border border-pink-500/15 animate-spin-slow" style={{ borderStyle: 'dashed' }} aria-hidden="true" />
              <div
                className="relative w-52 bg-gray-950 rounded-[2.2rem] border-2 border-pink-500/40 overflow-hidden"
                style={{ height: '440px', boxShadow: '0 0 50px rgba(255,31,110,0.3), inset 0 0 15px rgba(255,31,110,0.05)' }}
              >
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-4 bg-gray-900 rounded-full z-10" />
                <div
                  key={active}
                  className="w-full h-full animate-fade-in"
                >
                  <PhoneScreen screen={SCREENS[active]} />
                </div>
              </div>
            </div>
          </div>

          {/* Feature Selector */}
          <div className={`flex-1 flex flex-col gap-3 reveal-right ${inView ? 'visible' : ''}`}>
            {SCREENS.map((screen, i) => {
              const Icon = screen.icon;
              const isActive = i === active;
              return (
                <button
                  key={screen.id}
                  onClick={() => setActive(i)}
                  className={`text-left p-5 rounded-2xl border transition-all duration-300 hover:translate-x-1 ${
                    isActive ? 'border-pink-500/60 bg-pink-500/10' : 'border-pink-500/15 hover:border-pink-500/40 hover:bg-pink-500/5'
                  }`}
                  aria-pressed={isActive}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300"
                      style={{
                        background: isActive ? `${screen.color}20` : 'rgba(255,31,110,0.08)',
                        border: `1.5px solid ${isActive ? screen.color + '60' : 'rgba(255,31,110,0.2)'}`,
                      }}
                    >
                      <Icon size={18} style={{ color: isActive ? screen.color : '#FF6B9D' }} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-bold text-base mb-1 transition-colors ${isActive ? 'text-white' : 'text-gray-300'}`}>
                        {screen.title}
                      </h3>
                      {isActive && (
                        <p className="text-(--text-secondary) text-sm leading-relaxed animate-fade-in">
                          {screen.desc}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
