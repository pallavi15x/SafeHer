import { useState, useEffect, useRef } from 'react';
import { Star, ArrowRight, Shield, Download } from 'lucide-react';
import type { Page } from '../router';

const STAR_COUNT = 140;

/* ─── Particle + Grid Background Canvas ─── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.3 + 0.2,
      dy: Math.random() * 0.3 + 0.06,
      opacity: Math.random() * 0.6 + 0.2,
      hue: Math.random() > 0.6 ? 'rgba(255,107,157,' : 'rgba(255,255,255,',
    }));

    const orbs = [
      { x: 0, y: 0, bx: 0.22, by: 0.28, r: 150, color: 'rgba(255,31,110,0.07)' },
      { x: 0, y: 0, bx: -0.18, by: 0.22, r: 190, color: 'rgba(145,0,80,0.06)' },
    ];
    const initOrbs = () => {
      orbs[0].x = canvas.width * 0.22;
      orbs[0].y = canvas.height * 0.38;
      orbs[1].x = canvas.width * 0.78;
      orbs[1].y = canvas.height * 0.62;
    };
    initOrbs();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const orb of orbs) {
        const g = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
        g.addColorStop(0, orb.color);
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
        ctx.fill();
        orb.x += orb.bx;
        orb.y += orb.by;
        if (orb.x < 0 || orb.x > canvas.width) orb.bx *= -1;
        if (orb.y < 0 || orb.y > canvas.height) orb.by *= -1;
      }

      // Subtle grid
      ctx.strokeStyle = 'rgba(255,31,110,0.025)';
      ctx.lineWidth = 1;
      for (let gx = 0; gx < canvas.width; gx += 80) {
        ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, canvas.height); ctx.stroke();
      }
      for (let gy = 0; gy < canvas.height; gy += 80) {
        ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(canvas.width, gy); ctx.stroke();
      }

      for (const star of stars) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `${star.hue}${star.opacity})`;
        ctx.fill();
        star.y -= star.dy;
        if (star.y < -5) { star.y = canvas.height + 5; star.x = Math.random() * canvas.width; }
      }

      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" />;
}

/* ─── Animated Shield SVG – central hero visual ─── */
function HeroShield() {
  return (
    <div className="relative flex items-center justify-center select-none" style={{ animation: 'float 6s ease-in-out infinite' }}>
      {/* Outer pulsing rings */}
      <div className="absolute w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full border border-pink-500/10 animate-spin-slow" style={{ borderStyle: 'dashed' }} aria-hidden="true" />
      <div className="absolute w-60 h-60 sm:w-68 sm:h-68 md:w-80 md:h-80 rounded-full border border-pink-500/15 animate-spin-slow-rev" aria-hidden="true" />

      {/* Glow behind shield */}
      <div className="absolute w-52 h-52 sm:w-60 sm:h-60 md:w-72 md:h-72 rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,31,110,0.35) 0%, rgba(145,0,80,0.1) 50%, transparent 70%)', filter: 'blur(30px)' }} aria-hidden="true" />

      {/* Pulse ring */}
      <div className="absolute w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full animate-pulse-ring" style={{ border: '2px solid rgba(255,31,110,0.3)' }} aria-hidden="true" />

      {/* Shield SVG */}
      <svg width="160" height="176" viewBox="0 0 100 110" fill="none" className="animated-shield draw relative z-10 drop-shadow-[0_0_40px_rgba(255,31,110,0.6)]" style={{ width: 'clamp(120px, 18vw, 180px)', height: 'auto' }}>
        <defs>
          <linearGradient id="heroShieldGrad" x1="50" y1="5" x2="50" y2="105" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF1F6E" stopOpacity="0.35" />
            <stop offset="1" stopColor="#7a0035" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="heroFaceGrad" x1="50" y1="28" x2="50" y2="79" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF6B9D" />
            <stop offset="1" stopColor="#FF1F6E" />
          </linearGradient>
          <filter id="shieldGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Shield body */}
        <path d="M50 5 L90 20 L90 55 C90 80 70 98 50 105 C30 98 10 80 10 55 L10 20 Z"
          fill="url(#heroShieldGrad)" stroke="#FF1F6E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" filter="url(#shieldGlow)" />
        {/* Woman silhouette */}
        <path d="M55 28 C43 28 38 36 38 44 C38 50 41 52 39 55 C37 58 33 61 33 67 C33 74 39 77 43 79 C48 81 55 81 60 79 C65 77 67 73 67 67 C67 61 65 58 63 55 C61 52 64 50 64 44 C64 36 59 28 55 28 Z"
          fill="url(#heroFaceGrad)" opacity="0.9" />
        <path d="M48 33 C42 33 39 38 39 45 C39 50 42 52 44 54 C46 56 45 59 43 61 C40 63 38 66 38 70 C38 75 42 79 48 79 C54 79 58 75 58 70 C58 66 56 63 53 61 C51 59 50 56 52 54 C54 52 57 50 57 45 C57 38 54 33 48 33 Z"
          fill="#FFF" opacity="0.9" />
        {/* Checkmark */}
        <path d="M36 52 L46 62 L66 42" stroke="#FF6B9D" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
      </svg>

      {/* Floating mini icons around the shield */}
      <div className="absolute top-2 right-4 sm:top-0 sm:right-8 w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/25 flex items-center justify-center backdrop-blur-sm" style={{ animation: 'float 5s ease-in-out 0.5s infinite' }}>
        <span className="text-lg">📍</span>
      </div>
      <div className="absolute bottom-4 left-2 sm:bottom-2 sm:left-6 w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/25 flex items-center justify-center backdrop-blur-sm" style={{ animation: 'float 5s ease-in-out 1s infinite' }}>
        <span className="text-lg">🔔</span>
      </div>
      <div className="absolute top-1/2 -left-4 sm:-left-8 w-9 h-9 rounded-lg bg-pink-500/10 border border-pink-500/25 flex items-center justify-center backdrop-blur-sm" style={{ animation: 'float 4.5s ease-in-out 1.5s infinite' }}>
        <span className="text-sm">📞</span>
      </div>
      <div className="absolute top-8 -left-2 sm:top-6 sm:-left-6 w-9 h-9 rounded-lg bg-pink-500/10 border border-pink-500/25 flex items-center justify-center backdrop-blur-sm" style={{ animation: 'float 5.5s ease-in-out 2s infinite' }}>
        <span className="text-sm">🎙️</span>
      </div>
    </div>
  );
}

/* ─── Phone Mockup ─── */
function PhoneMockup() {
  const [active, setActive] = useState(false);
  useEffect(() => {
    const t = setInterval(() => setActive((a: boolean) => !a), 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative flex items-center justify-center select-none shrink-0" style={{ animation: 'float 6s ease-in-out 1.5s infinite' }}>
      {/* Phone Frame */}
      <div
        className="relative bg-gray-950 overflow-hidden flex flex-col pt-6 pb-2.5 px-2.5"
        style={{
          width: '185px',
          height: '385px',
          borderRadius: '2.2rem',
          border: '1.5px solid rgba(255,31,110,0.3)',
          boxShadow: '0 0 45px rgba(255,31,110,0.25), 0 15px 50px rgba(0,0,0,0.5)',
        }}
      >
        {/* Dynamic Island */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 h-4 bg-gray-900 rounded-full z-10" />

        {/* Status Bar */}
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 100 110" fill="none">
              <path d="M50 5 L90 20 L90 55 C90 80 70 98 50 105 C30 98 10 80 10 55 L10 20 Z" fill="rgba(255,31,110,0.3)" stroke="#FF1F6E" strokeWidth="6" />
            </svg>
            <span className="text-[10px] font-bold text-pink-400">SafeHer</span>
          </div>
          <div className="flex gap-1 items-center">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
            <span className="text-green-400 text-[8px] font-semibold">Protected</span>
          </div>
        </div>

        {/* App Header */}
        <div className="mb-3 text-left px-1">
          <p className="text-gray-400 text-[8px]">Welcome back,</p>
          <h4 className="text-white text-[11px] font-bold leading-tight">Hi, Ananya 👋</h4>
          <p className="text-green-400 text-[7px] mt-0.5">You are protected</p>
        </div>

        {/* SOS Circle */}
        <div className="flex-1 flex flex-col items-center justify-center my-1">
          <div
            className="w-20 h-20 rounded-full flex flex-col items-center justify-center cursor-pointer relative"
            style={{
              background: 'radial-gradient(circle, #FF1F6E 0%, #C20057 100%)',
              boxShadow: active ? '0 0 35px rgba(255,31,110,0.85)' : '0 0 20px rgba(255,31,110,0.45)',
              transition: 'box-shadow 0.3s ease',
            }}
          >
            <div className="absolute inset-0 rounded-full bg-pink-500/30 animate-ping opacity-50" />
            <span className="text-white font-black text-lg tracking-wider select-none z-10">SOS</span>
            <span className="text-white/60 text-[7px] font-medium z-10 mt-0.5">Tap to Alert</span>
          </div>
          <p className="text-gray-500 text-[7px] mt-2 text-center">Notify 5 emergency contacts</p>
        </div>

        {/* Emergency contacts */}
        <div className="p-2 text-left mb-1 mt-auto rounded-xl" style={{ background: 'rgba(20,0,14,0.7)', border: '1px solid rgba(255,31,110,0.15)' }}>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-gray-300 text-[8px] font-semibold">Emergency Contacts</span>
            <span className="text-pink-400 text-[7px] font-semibold">View All</span>
          </div>
          <div className="flex flex-col gap-1.5">
            {[
              { name: 'Mom', phone: '+91 98765-43210', initial: 'M', color: '#ff1f6e' },
              { name: 'Sister', phone: '+91 91234-56789', initial: 'S', color: '#ec4899' },
            ].map(c => (
              <div key={c.name} className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center text-[6px] font-bold text-white shrink-0" style={{ backgroundColor: c.color }}>{c.initial}</div>
                  <div className="leading-none">
                    <p className="text-white text-[7px] font-semibold">{c.name}</p>
                    <p className="text-gray-500 text-[6px]">{c.phone}</p>
                  </div>
                </div>
                <div className="w-3.5 h-3.5 rounded-full bg-pink-500/15 flex items-center justify-center">
                  <span className="text-[7px]">📞</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Hero Export ─── */
interface HeroProps {
  navigate?: (p: Page) => void;
}

export default function Hero({ navigate }: HeroProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 30% 50%, #1e0016 0%, #0D0008 50%, #000000 100%)',
        paddingTop: '80px',
      }}
    >
      <ParticleCanvas />
      {/* Top pink ambient glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,31,110,0.12) 0%, transparent 65%)' }}
        aria-hidden="true" />

      <div className="relative z-10 w-full max-w-[92%] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 py-8 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">

          {/* ─── Column 1: Text Content ─── */}
          <div className="col-span-1 lg:col-span-4 flex flex-col items-center text-center lg:text-left lg:items-start">
            {/* Badge */}
            <div
              className="tag-pill mb-5 flex items-center gap-2 border border-pink-500/35 bg-pink-500/10 text-pink-300"
              style={{ opacity: ready ? 1 : 0, transform: ready ? 'scale(1)' : 'scale(0.8)', transition: 'opacity 0.5s ease, transform 0.5s ease' }}
            >
              <Shield size={13} className="text-pink-400 fill-pink-500/20" />
              #HerSafetyOurPriority
            </div>

            {/* Headline */}
            <h1
              className="font-['Playfair_Display'] font-extrabold text-center lg:text-left mb-5"
              style={{
                fontSize: 'clamp(2rem, 4.2vw, 3.6rem)',
                lineHeight: 1.1,
                opacity: ready ? 1 : 0,
                transform: ready ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s',
              }}
            >
              <span className="text-white block">Empowering Women,</span>
              <span className="block text-white">Ensuring <span className="text-pink-500 shimmer-text">Safety</span></span>
            </h1>

            {/* Description */}
            <p
              className="text-[var(--text-secondary)] text-sm sm:text-base max-w-md mb-7 leading-relaxed"
              style={{
                opacity: ready ? 1 : 0,
                transform: ready ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.7s ease 0.35s, transform 0.7s ease 0.35s',
              }}
            >
              SafeHer is your trusted companion for personal safety.
              Real-time protection, instant alerts, and a supportive
              community — because every woman deserves to feel safe.
            </p>

            {/* CTA Buttons */}
            <div
              className="flex flex-wrap gap-3 mb-5 justify-center lg:justify-start"
              style={{
                opacity: ready ? 1 : 0,
                transform: ready ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.7s ease 0.55s, transform 0.7s ease 0.55s',
              }}
            >
              <button className="pink-glow-btn px-7 py-3 text-sm sm:text-base flex items-center gap-2" aria-label="Get Started Free">
                Get Started Free <ArrowRight size={16} />
              </button>
              <button
                className="outline-btn px-7 py-3 text-sm sm:text-base text-white flex items-center gap-2"
                onClick={() => navigate ? navigate('features') : undefined}
              >
                Explore Features <span className="text-xs">▷</span>
              </button>
            </div>

            {/* Download Button */}
            <div
              className="mb-6 flex justify-center lg:justify-start"
              style={{
                opacity: ready ? 1 : 0,
                transform: ready ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.7s ease 0.7s, transform 0.7s ease 0.7s',
              }}
            >
              <button
                className="flex items-center gap-2.5 px-6 py-2.5 text-sm font-semibold text-white rounded-full transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,31,110,0.15), rgba(145,0,80,0.25))',
                  border: '1px solid rgba(255,31,110,0.35)',
                  boxShadow: '0 0 15px rgba(255,31,110,0.12)',
                }}
              >
                <Download size={16} className="text-pink-400" />
                Download App
                <span className="text-[10px] text-pink-300 bg-pink-500/20 px-2 py-0.5 rounded-full">Free</span>
              </button>
            </div>

            {/* Social proof */}
            <div
              className="flex items-center gap-3"
              style={{ opacity: ready ? 1 : 0, transition: 'opacity 0.7s ease 0.85s' }}
            >
              <div className="flex -space-x-2.5">
                {[
                  'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=60&h=60&fit=crop',
                  'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=60&h=60&fit=crop',
                  'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?w=60&h=60&fit=crop',
                  'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?w=60&h=60&fit=crop',
                ].map((src, i) => (
                  <img key={i} src={src} alt={`User ${i + 1}`}
                    className="w-8 h-8 rounded-full border-2 border-pink-500 object-cover" />
                ))}
              </div>
              <div className="text-left">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} size={13} className="text-yellow-400 fill-yellow-400" />)}
                </div>
                <span className="text-gray-400 text-xs mt-0.5 block">
                  Trusted by <span className="text-white font-semibold">10,000+</span> women
                </span>
              </div>
            </div>
          </div>

          {/* ─── Column 2: Animated Shield (Center Visual) ─── */}
          <div className="col-span-1 lg:col-span-4 flex items-center justify-center py-6 lg:py-0">
            <div
              style={{
                opacity: ready ? 1 : 0,
                transform: ready ? 'scale(1)' : 'scale(0.85)',
                transition: 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s',
              }}
            >
              <HeroShield />
            </div>
          </div>

          {/* ─── Column 3: Phone Mockup ─── */}
          <div className="col-span-1 lg:col-span-4 flex items-center justify-center lg:justify-end">
            <div
              style={{
                opacity: ready ? 1 : 0,
                transform: ready ? 'translateX(0)' : 'translateX(40px)',
                transition: 'opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s',
              }}
            >
              <PhoneMockup />
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-20" aria-hidden="true">
        <span className="text-gray-500 text-[10px] tracking-widest uppercase">Scroll</span>
        <div className="w-5 h-7 rounded-full border-2 border-pink-500/30 flex items-start justify-center p-1">
          <div className="w-1 h-1.5 rounded-full bg-pink-500 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
