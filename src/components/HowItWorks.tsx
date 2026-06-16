import { useInView } from '../hooks';
import { Download, Settings, Shield, HelpCircle } from 'lucide-react';

const steps = [
  { icon: Download, step: '01', title: 'Download', desc: 'Download the SafeHer app and sign up in seconds with just your phone number.' },
  { icon: Settings, step: '02', title: 'Set Up', desc: 'Add emergency contacts, set preferences, and customize your alert settings.' },
  { icon: Shield, step: '03', title: 'Stay Protected', desc: 'Use powerful safety features anytime you need help or feel unsafe anywhere.' },
  { icon: HelpCircle, step: '04', title: 'Get Help', desc: 'Instant alerts and your live location are sent to trusted contacts automatically.' },
];

export default function HowItWorks() {
  const { ref, inView } = useInView();

  return (
    <section id="how-it-works" ref={ref as React.RefObject<HTMLElement>} className="py-24 px-4 sm:px-6 overflow-hidden">
      <div
        className="w-full max-w-[92%] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto rounded-3xl p-10 sm:p-16 relative"
        style={{ background: 'radial-gradient(ellipse at top, rgba(255,31,110,0.07) 0%, rgba(13,0,8,0.8) 100%)', border: '1px solid rgba(255,31,110,0.15)' }}
      >
        <div className={`text-center mb-16 reveal ${inView ? 'visible' : ''}`}>
          <div className="tag-pill mx-auto mb-4">Simple Process</div>
          <h2 className="font-['Playfair_Display'] font-extrabold text-3xl sm:text-5xl mb-4">
            <span className="text-white">How </span>
            <span className="shimmer-text">SafeHer</span>
            <span className="text-white"> Works</span>
          </h2>
          <p className="text-(--text-secondary) max-w-md mx-auto">Four simple steps to total peace of mind.</p>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px" style={{ background: 'rgba(255,31,110,0.12)' }}>
            <div
              className="h-full origin-left"
              style={{
                background: 'linear-gradient(90deg, #FF1F6E, #FF6B9D, #FF1F6E)',
                transform: inView ? 'scaleX(1)' : 'scaleX(0)',
                transition: 'transform 1.5s ease 0.8s',
              }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  className={`flex flex-col items-center text-center reveal ${inView ? 'visible' : ''} delay-${i + 2}`}
                >
                  <div className="relative mb-6">
                    <div
                      className="w-20 h-20 rounded-2xl bg-pink-500/10 border-2 border-pink-500/30 flex items-center justify-center animate-glow-pulse"
                    >
                      <Icon size={32} className="text-pink-400" />
                    </div>
                    <div
                      className="absolute -top-3 -right-3 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-white"
                      style={{ background: 'linear-gradient(135deg, #FF1F6E, #c20057)', boxShadow: '0 0 12px rgba(255,31,110,0.6)' }}
                    >
                      {i + 1}
                    </div>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-(--text-secondary) text-sm leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className={`text-center mt-12 reveal ${inView ? 'visible' : ''} delay-7`}>
          <button className="pink-glow-btn px-10 py-3.5 text-base">Get Started Today — It's Free</button>
        </div>
      </div>
    </section>
  );
}
