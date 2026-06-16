import AboutSection from '../components/AboutSection';
import SafetyMap from '../components/SafetyMap';
import { useInView } from '../hooks';

const stats = [
  { value: '2022', label: 'Founded' },
  { value: '100+', label: 'Cities Covered' },
  { value: '10K+', label: 'Women Protected' },
  { value: '4.9★', label: 'App Rating' },
];

export default function AboutPage() {
  const { ref, inView } = useInView();

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Page header */}
      <div className="w-full max-w-[92%] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 text-center mb-12">
        <div ref={ref as React.RefObject<HTMLDivElement>} className={`reveal ${inView ? 'visible' : ''}`}>
          <div className="tag-pill mx-auto mb-4">Our Story</div>
          <h1 className="font-['Playfair_Display'] font-extrabold mb-4" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', lineHeight: 1.12 }}>
            <span className="text-white">About </span>
            <span className="shimmer-text">SafeHer</span>
          </h1>
          <p className="text-(--text-secondary) text-lg max-w-2xl mx-auto leading-relaxed">
            We're a team of women engineers, designers, and safety advocates building technology that gives every woman the confidence to live life without fear.
          </p>
        </div>

        {/* Mini stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
          {stats.map((s, i) => (
            <div key={s.label} className={`glass-card p-4 text-center reveal-scale ${inView ? 'visible' : ''} delay-${i + 2}`}>
              <p className="font-black text-2xl mb-1" style={{ background: 'linear-gradient(135deg, #FF1F6E, #FF6B9D)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {s.value}
              </p>
              <p className="text-(--text-secondary) text-xs">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <AboutSection />
      <SafetyMap />
    </div>
  );
}
