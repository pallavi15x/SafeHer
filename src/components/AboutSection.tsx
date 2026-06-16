import { useEffect, useRef } from 'react';
import { Shield, Globe, Users, Heart } from 'lucide-react';
import { useInView } from '../hooks';

const TEAM = [
  { name: 'Anika Sharma', role: 'Co-Founder & CEO', bio: 'Former cybersecurity expert with 10+ years building safety platforms for underserved communities.', img: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=120&h=120&fit=crop' },
  { name: 'Preethi Nair', role: 'Co-Founder & CTO', bio: 'AI/ML engineer who previously built emergency response systems for the Indian government.', img: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=120&h=120&fit=crop' },
  { name: 'Riya Kapoor', role: 'Head of Community', bio: 'Social impact leader who has helped 50,000+ women connect with support networks across India.', img: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?w=120&h=120&fit=crop' },
];

const VALUES = [
  { icon: Shield, title: 'Safety First', desc: 'Every decision we make starts with asking: does this make our users safer?' },
  { icon: Globe, title: 'Inclusive Design', desc: 'Built for every woman — regardless of language, location, or technical ability.' },
  { icon: Users, title: 'Community', desc: 'We believe safety is stronger together. Our community model empowers collective protection.' },
  { icon: Heart, title: 'Empathy', desc: 'We design with deep empathy for every situation a woman might face.' },
];

function GlobeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = 280, H = 280, cx = W / 2, cy = H / 2, R = 110;
    canvas.width = W; canvas.height = H;
    let angle = 0, animId: number;

    const DOTS = [
      { lat: 20, lng: 77 }, { lat: 40, lng: -74 }, { lat: 51, lng: 0 },
      { lat: -33, lng: 151 }, { lat: 35, lng: 139 }, { lat: -23, lng: -46 },
      { lat: 48, lng: 2 }, { lat: 52, lng: 13 },
    ];

    const toXYZ = (lat: number, lng: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + angle) * (Math.PI / 180);
      return { x: R * Math.sin(phi) * Math.cos(theta), y: R * Math.cos(phi), z: R * Math.sin(phi) * Math.sin(theta) };
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const g = ctx.createRadialGradient(cx - 20, cy - 20, 10, cx, cy, R);
      g.addColorStop(0, 'rgba(255,31,110,0.08)');
      g.addColorStop(1, 'rgba(13,0,8,0.4)');
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = g; ctx.fill();
      ctx.strokeStyle = 'rgba(255,31,110,0.2)'; ctx.lineWidth = 1; ctx.stroke();

      for (let lat = -60; lat <= 60; lat += 30) {
        const r = R * Math.cos(lat * Math.PI / 180);
        const y = cy - R * Math.sin(lat * Math.PI / 180);
        ctx.beginPath(); ctx.ellipse(cx, y, r, r * 0.25, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255,31,110,0.07)'; ctx.lineWidth = 0.5; ctx.stroke();
      }

      for (let lng = 0; lng < 360; lng += 45) {
        ctx.beginPath();
        for (let lat = -90; lat <= 90; lat += 5) {
          const p = toXYZ(lat, lng);
          if (p.z > 0) { lat === -90 ? ctx.moveTo(cx + p.x, cy - p.y) : ctx.lineTo(cx + p.x, cy - p.y); }
        }
        ctx.strokeStyle = 'rgba(255,31,110,0.06)'; ctx.lineWidth = 0.5; ctx.stroke();
      }

      for (const dot of DOTS) {
        const p = toXYZ(dot.lat, dot.lng);
        if (p.z > 0) {
          const x2 = cx + p.x, y2 = cy - p.y, a = (p.z / R) * 0.8 + 0.2;
          ctx.beginPath(); ctx.arc(x2, y2, 6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,31,110,${a * 0.2})`; ctx.fill();
          ctx.beginPath(); ctx.arc(x2, y2, 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,107,157,${a})`; ctx.fill();
        }
      }

      angle += 0.2;
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} className="rounded-full" style={{ boxShadow: '0 0 60px rgba(255,31,110,0.2)' }} aria-label="Globe showing active SafeHer users worldwide" />;
}

export default function AboutSection() {
  const { ref, inView } = useInView();

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="py-24">
      <div className="w-full max-w-[92%] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-20 reveal ${inView ? 'visible' : ''}`}>
          <div className="tag-pill mx-auto mb-4">Our Mission</div>
          <h2 className="font-['Playfair_Display'] font-extrabold text-3xl sm:text-5xl mb-4">
            <span className="text-white">Building a </span>
            <span className="shimmer-text">Safer World</span>
            <span className="text-white"> for Women</span>
          </h2>
          <p className="text-(--text-secondary) max-w-2xl mx-auto leading-relaxed">
            SafeHer was born from a simple belief: every woman deserves to feel safe everywhere, every time. We combine cutting-edge technology with deep community understanding to create safety tools that actually work when it matters most.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className={`flex flex-col items-center reveal-left ${inView ? 'visible' : ''}`}>
            <a 
              href="https://www.mappicker.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="relative group block cursor-pointer hover:scale-[1.02] transition-transform duration-300"
              aria-label="Open MapPicker Rotating Globe"
            >
              <GlobeCanvas />
              <div className="absolute inset-0 rounded-full border border-pink-500/0 group-hover:border-pink-500/25 group-hover:bg-pink-500/5 transition-all duration-300 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 bg-pink-600/95 text-white text-xs px-3.5 py-2 rounded-xl font-bold shadow-lg transition-opacity duration-300 tracking-wide">
                  Spin Globe 🌍
                </span>
              </div>
            </a>
            <p className="text-(--text-secondary) text-sm mt-4 text-center">
              Active users across <span className="text-white font-semibold">100+ cities</span> worldwide. Click globe to view on <a href="https://www.mappicker.com/" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-300 font-semibold underline">mappicker.com</a>
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {VALUES.map((val, i) => {
              const Icon = val.icon;
              return (
                <div key={val.title} className={`glass-card p-5 group hover:border-pink-500/60 transition-all duration-300 reveal ${inView ? 'visible' : ''} delay-${i + 1}`}>
                  <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center mb-3 group-hover:bg-pink-500/20 transition-colors">
                    <Icon size={20} className="text-pink-400" />
                  </div>
                  <h3 className="text-white font-bold text-sm mb-1">{val.title}</h3>
                  <p className="text-(--text-secondary) text-xs leading-relaxed">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className={`reveal ${inView ? 'visible' : ''} delay-4`}>
          <h3 className="text-white font-bold text-2xl text-center mb-10">
            The Team Behind <span className="shimmer-text">SafeHer</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {TEAM.map((member, i) => (
              <div key={member.name}
                className={`glass-card p-6 text-center group hover:border-pink-500/60 transition-all duration-300 hover:-translate-y-2 reveal ${inView ? 'visible' : ''} delay-${i + 5}`}>
                <div className="relative w-20 h-20 mx-auto mb-4">
                  <img src={member.img} alt={member.name}
                    className="w-full h-full rounded-full object-cover border-2 border-pink-500/40 group-hover:border-pink-500/80 transition-colors" />
                </div>
                <h4 className="text-white font-bold text-base mb-1">{member.name}</h4>
                <p className="text-pink-400 text-xs font-semibold mb-3">{member.role}</p>
                <p className="text-(--text-secondary) text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
