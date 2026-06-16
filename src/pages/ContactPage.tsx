import ContactSection from '../components/ContactSection';
import Newsletter from '../components/Newsletter';
import { useInView } from '../hooks';
import { Clock, MessageCircle, Shield } from 'lucide-react';

const commitments = [
  { icon: Clock, title: '24/7 Support', desc: 'Our team is available around the clock for emergency help and general queries.' },
  { icon: MessageCircle, title: 'Quick Response', desc: 'We respond to all support requests within 2 hours — guaranteed.' },
  { icon: Shield, title: 'Your Privacy', desc: 'Any information you share with us is treated with strict confidentiality.' },
];

export default function ContactPage() {
  const { ref, inView } = useInView();

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Page header */}
      <div className="w-full max-w-[92%] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 text-center mb-12">
        <div ref={ref as React.RefObject<HTMLDivElement>} className={`reveal ${inView ? 'visible' : ''}`}>
          <div className="tag-pill mx-auto mb-4">We're Here For You</div>
          <h1 className="font-['Playfair_Display'] font-extrabold mb-4" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', lineHeight: 1.12 }}>
            <span className="text-white">Get in </span>
            <span className="shimmer-text">Touch</span>
          </h1>
          <p className="text-(--text-secondary) text-lg max-w-2xl mx-auto leading-relaxed">
            Whether you have a question, need technical support, want to partner with us, or just want to share your story — we'd love to hear from you.
          </p>
        </div>

        {/* Commitments */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
          {commitments.map((c, i) => {
            const Icon = c.icon;
            return (
              <div key={c.title} className={`glass-card p-5 text-left group hover:border-pink-500/60 transition-all duration-300 reveal ${inView ? 'visible' : ''} delay-${i + 2}`}>
                <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center mb-3 group-hover:bg-pink-500/20 transition-colors">
                  <Icon size={20} className="text-pink-400" />
                </div>
                <h3 className="text-white font-bold text-sm mb-1">{c.title}</h3>
                <p className="text-(--text-secondary) text-xs leading-relaxed">{c.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      <ContactSection />
      <Newsletter />
    </div>
  );
}
