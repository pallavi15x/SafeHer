import ResourcesSection from '../components/ResourcesSection';
import FAQSection from '../components/FAQSection';
import { useInView } from '../hooks';
import { BookOpen, Phone, FileText } from 'lucide-react';

const quickLinks = [
  { icon: BookOpen, title: 'Safety Tips', desc: 'Expert-curated tips for physical safety, travel, digital privacy, and emergencies.' },
  { icon: Phone, title: 'Emergency Numbers', desc: 'Quick-access emergency contact numbers for police, ambulance, and women\'s helplines worldwide.' },
  { icon: FileText, title: 'Articles & Guides', desc: 'In-depth guides on legal rights, workplace safety, travel, and digital privacy.' },
];

export default function ResourcesPage() {
  const { ref, inView } = useInView();

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Page header */}
      <div className="w-full max-w-[92%] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 text-center mb-12">
        <div ref={ref as React.RefObject<HTMLDivElement>} className={`reveal ${inView ? 'visible' : ''}`}>
          <div className="tag-pill mx-auto mb-4">Knowledge Hub</div>
          <h1 className="font-['Playfair_Display'] font-extrabold mb-4" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', lineHeight: 1.12 }}>
            <span className="text-white">Safety </span>
            <span className="shimmer-text">Resources</span>
          </h1>
          <p className="text-(--text-secondary) text-lg max-w-2xl mx-auto leading-relaxed">
            Knowledge is your first line of defence. Explore safety tips, emergency contacts, and expert articles curated to keep you informed and prepared.
          </p>
        </div>

        {/* Quick overview cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
          {quickLinks.map((ql, i) => {
            const Icon = ql.icon;
            return (
              <div key={ql.title} className={`glass-card p-5 text-left group hover:border-pink-500/60 transition-all duration-300 reveal ${inView ? 'visible' : ''} delay-${i + 2}`}>
                <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center mb-3 group-hover:bg-pink-500/20 transition-colors">
                  <Icon size={20} className="text-pink-400" />
                </div>
                <h3 className="text-white font-bold text-sm mb-1">{ql.title}</h3>
                <p className="text-(--text-secondary) text-xs leading-relaxed">{ql.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      <ResourcesSection />
      <FAQSection />
    </div>
  );
}
