import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useInView } from '../hooks';

const TESTIMONIALS = [
  { name: 'Priya S.', city: 'Mumbai', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=80&h=80&fit=crop', rating: 5, quote: "The SOS feature saved me when I felt followed at night. Within seconds my family knew exactly where I was. I can't imagine going anywhere without SafeHer now." },
  { name: 'Ananya K.', city: 'Delhi', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=80&h=80&fit=crop', rating: 5, quote: "Fake Call feature is genius. Got out of an uncomfortable situation at work so smoothly. Nobody even noticed I was using a safety app. Absolute lifesaver!" },
  { name: 'Ritu M.', city: 'Bangalore', avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?w=80&h=80&fit=crop', rating: 5, quote: "Knowing there's a safety timer running gives me so much confidence when I travel alone. My family stays updated without me having to text constantly." },
  { name: 'Kavya R.', city: 'Hyderabad', avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?w=80&h=80&fit=crop', rating: 5, quote: "The AI route analysis helped me choose a safer path home. It's not just an app, it feels like having a personal safety guardian watching over you." },
  { name: 'Neha T.', city: 'Pune', avatar: 'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?w=80&h=80&fit=crop', rating: 5, quote: "SafeHer's community feature connected me with other women in my area. We share safety tips and look out for each other. It's built a real sisterhood." },
];

export default function Testimonials() {
  const { ref, inView } = useInView();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const t = setInterval(() => setCurrent(c => (c + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, [inView]);

  const prev = () => setCurrent(c => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setCurrent(c => (c + 1) % TESTIMONIALS.length);
  const getIdx = (off: number) => (current + off + TESTIMONIALS.length) % TESTIMONIALS.length;

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="py-24 px-4 sm:px-6 overflow-hidden">
      <div className="w-full max-w-[92%] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto">
        <div className={`text-center mb-16 reveal ${inView ? 'visible' : ''}`}>
          <div className="tag-pill mx-auto mb-4">Testimonials</div>
          <h2 className="font-['Playfair_Display'] font-extrabold text-3xl sm:text-5xl mb-4">
            <span className="text-white">Women Who </span><span className="shimmer-text">Trust SafeHer</span>
          </h2>
          <p className="text-(--text-secondary) max-w-lg mx-auto">Real stories from real women who felt safer with SafeHer by their side</p>
        </div>

        <div className={`reveal-scale ${inView ? 'visible' : ''} delay-2`}>
          {/* Cards */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 min-h-[300px]">
            {[-1, 0, 1].map(offset => {
              const t = TESTIMONIALS[getIdx(offset)];
              const isCenter = offset === 0;
              return (
                <div
                  key={getIdx(offset)}
                  className={`testimonial-card p-6 sm:p-8 shrink-0 transition-all duration-500 ${isCenter ? 'w-full max-w-lg opacity-100 scale-100 z-10' : 'hidden sm:block w-72 opacity-50 scale-90 z-0'}`}
                >
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(t.rating)].map((_, i) => <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />)}
                  </div>
                  <p className="text-(--text-primary) text-base leading-relaxed mb-6 italic">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border-2 border-pink-500/50 object-cover" />
                    <div>
                      <p className="text-white font-bold text-sm">{t.name}</p>
                      <p className="text-(--text-secondary) text-xs">{t.city}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button onClick={prev} className="w-11 h-11 rounded-full border border-pink-500/40 flex items-center justify-center text-pink-400 hover:bg-pink-500/10 hover:border-pink-500/80 transition-all duration-200" aria-label="Previous">
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)}
                  className="rounded-full transition-all duration-300"
                  style={{ width: i === current ? '24px' : '8px', height: '8px', background: i === current ? '#FF1F6E' : 'rgba(255,31,110,0.3)' }}
                  aria-label={`Testimonial ${i + 1}`} aria-current={i === current} />
              ))}
            </div>
            <button onClick={next} className="w-11 h-11 rounded-full border border-pink-500/40 flex items-center justify-center text-pink-400 hover:bg-pink-500/10 hover:border-pink-500/80 transition-all duration-200" aria-label="Next">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
