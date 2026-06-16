import { useInView } from '../hooks';
import {
  AlertCircle, MapPin, PhoneCall, Mic, Timer, Users,
  WifiOff, FileText, Brain, Watch, EyeOff, BarChart2
} from 'lucide-react';

const features = [
  { icon: AlertCircle, title: 'SOS Alert', desc: 'Instantly notify all emergency contacts with one tap and your live location.' },
  { icon: MapPin, title: 'Live Location', desc: 'Share real-time GPS location with trusted contacts in emergencies.' },
  { icon: PhoneCall, title: 'Fake Call', desc: 'Get a fake incoming call to escape uncomfortable or dangerous situations.' },
  { icon: Mic, title: 'Audio Recording', desc: 'Silently record audio in dangerous situations as evidence.' },
  { icon: Timer, title: 'Safety Timer', desc: "Set a timer; if you don't check in, alerts are automatically sent." },
  { icon: Users, title: 'Community Support', desc: 'Connect with nearby women and seek peer help when needed.' },
  { icon: WifiOff, title: 'Offline Mode', desc: 'Core safety features work even without internet connection.' },
  { icon: FileText, title: 'Incident Report', desc: 'File a detailed safety report with photo and location evidence.' },
  { icon: Brain, title: 'AI Risk Assessment', desc: 'AI analyzes your route and flags high-risk zones before you travel.' },
  { icon: Watch, title: 'Wearable Integration', desc: 'Sync with your smartwatch for silent SOS without touching your phone.' },
  { icon: EyeOff, title: 'Stealth Mode', desc: 'App disguises itself as a regular utility app for discreet use.' },
  { icon: BarChart2, title: 'Safety Analytics', desc: 'View personal safety history and patterns to stay proactive.' },
];

export default function FeaturesSection() {
  const { ref, inView } = useInView();

  return (
    <section id="features" ref={ref as React.RefObject<HTMLElement>} className="py-24 px-4 sm:px-6">
      <div className="w-full max-w-[92%] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto">
        <div className={`text-center mb-16 reveal ${inView ? 'visible' : ''}`}>
          <div className="tag-pill mx-auto mb-4">Features</div>
          <h2 className="font-['Playfair_Display'] font-extrabold text-3xl sm:text-5xl mb-4">
            <span className="text-white">Powerful Features for </span>
            <span className="shimmer-text">Every Situation</span>
          </h2>
          <p className="text-(--text-secondary) max-w-lg mx-auto text-base">
            Comprehensive safety tools designed with real women's needs in mind.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            const delay = Math.min(i, 7) + 1;
            return (
              <div
                key={feat.title}
                className={`feature-card p-6 group reveal ${inView ? 'visible' : ''} delay-${delay}`}
              >
                <div className="relative mb-4 w-fit">
                  <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center group-hover:bg-pink-500/20 group-hover:border-pink-500/60 transition-all duration-300">
                    <Icon size={22} className="text-pink-400 group-hover:text-pink-300 transition-colors" />
                  </div>
                </div>
                <h3 className="text-white font-bold text-base mb-2 group-hover:text-pink-300 transition-colors">{feat.title}</h3>
                <p className="text-(--text-secondary) text-sm leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
