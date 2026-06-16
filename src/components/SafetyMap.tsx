import { useState } from 'react';
import { useInView } from '../hooks';

const CITIES = [
  { name: 'Mumbai', lat: 19.076, lng: 72.877, safe: true },
  { name: 'Delhi', lat: 28.679, lng: 77.069, safe: false },
  { name: 'Bangalore', lat: 12.972, lng: 77.594, safe: true },
  { name: 'Chennai', lat: 13.083, lng: 80.27, safe: true },
  { name: 'Kolkata', lat: 22.573, lng: 88.363, safe: false },
  { name: 'Hyderabad', lat: 17.386, lng: 78.487, safe: true },
  { name: 'Pune', lat: 18.521, lng: 73.857, safe: true },
  { name: 'Ahmedabad', lat: 23.022, lng: 72.571, safe: false },
];

function AIRouteSafetyScore({ inView }: { inView: boolean }) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const checkRoute = () => {
    if (!from.trim() || !to.trim()) return;
    setLoading(true); setScore(null);
    setTimeout(() => { setScore(Math.floor(Math.random() * 40) + 55); setLoading(false); }, 1800);
  };

  return (
    <div className={`mt-8 glass-card p-6 sm:p-8 reveal ${inView ? 'visible' : ''} delay-4`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-pink-500/15 border border-pink-500/30 flex items-center justify-center">
          <span className="text-lg">🤖</span>
        </div>
        <div>
          <h3 className="text-white font-bold">AI Route Safety Score</h3>
          <p className="text-(--text-secondary) text-xs">Enter origin and destination for a safety analysis</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <input type="text" value={from} onChange={e => setFrom(e.target.value)} placeholder="From (e.g. Connaught Place)"
          className="flex-1 min-w-[160px] bg-white/5 border border-pink-500/25 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 text-sm outline-hidden focus:border-pink-500/60 transition-colors"
          aria-label="Starting location" />
        <input type="text" value={to} onChange={e => setTo(e.target.value)} placeholder="To (e.g. Lajpat Nagar)"
          className="flex-1 min-w-[160px] bg-white/5 border border-pink-500/25 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 text-sm outline-hidden focus:border-pink-500/60 transition-colors"
          aria-label="Destination" />
        <button onClick={checkRoute} disabled={loading || !from || !to}
          className="pink-glow-btn px-6 py-2.5 text-sm disabled:opacity-50 disabled:cursor-not-allowed">
          {loading ? 'Analyzing…' : 'Check Score'}
        </button>
      </div>
      {score !== null && (
        <div className="mt-5 flex items-center gap-4 flex-wrap animate-fade-in-up">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-(--text-secondary)">Safety Score</span>
              <span className={`font-black text-lg ${score >= 75 ? 'text-green-400' : score >= 55 ? 'text-yellow-400' : 'text-red-400'}`}>{score}/100</span>
            </div>
            <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-1000"
                style={{ width: `${score}%`, background: score >= 75 ? 'linear-gradient(90deg,#22c55e,#4ade80)' : score >= 55 ? 'linear-gradient(90deg,#eab308,#facc15)' : 'linear-gradient(90deg,#ef4444,#f87171)' }} />
            </div>
          </div>
          <div className={`tag-pill ${score >= 75 ? 'border-green-500/40 text-green-400 bg-green-500/10' : score >= 55 ? 'border-yellow-500/40 text-yellow-400 bg-yellow-500/10' : 'border-red-500/40 text-red-400 bg-red-500/10'}`}>
            {score >= 75 ? '✓ Generally Safe' : score >= 55 ? '⚠ Moderate Risk' : '⛔ High Risk'}
          </div>
        </div>
      )}
    </div>
  );
}

export default function SafetyMap() {
  const { ref, inView } = useInView();
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [activeCity, setActiveCity] = useState<string | null>(null);

  return (
    <section ref={ref as React.RefObject<HTMLElement>} id="about" className="py-24 px-4 sm:px-6">
      <div className="w-full max-w-[92%] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto">
        <div className={`text-center mb-12 reveal ${inView ? 'visible' : ''}`}>
          <div className="tag-pill mx-auto mb-4">AI-Powered</div>
          <h2 className="font-['Playfair_Display'] font-extrabold text-3xl sm:text-5xl mb-4">
            <span className="text-white">Live </span><span className="shimmer-text">Safety Map</span>
          </h2>
          <p className="text-(--text-secondary) max-w-lg mx-auto">Real-time safety intelligence powered by AI — identifying safe and alert zones across major cities.</p>
        </div>

        <div className={`glass-card overflow-hidden reveal-scale ${inView ? 'visible' : ''} delay-2`}>
          <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-pink-500/20">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-pulse" />
              <span className="text-white font-semibold text-sm">AI-Powered Zone Analysis</span>
              <span className="tag-pill text-xs py-1">LIVE</span>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-green-500" /><span className="text-gray-400">Safe Zone</span></div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500" /><span className="text-gray-400">Alert Zone</span></div>
            </div>
          </div>

          <div className="relative w-full max-w-[420px] aspect-[4/5] mx-auto overflow-hidden bg-[#0a0005] rounded-2xl border border-pink-500/10">
            {/* India Map Image Background with Filters */}
            <img 
              src="https://s3.envato.com/files/195496717/India-States-Map.png" 
              alt="India States Map" 
              className="absolute inset-0 w-full h-full object-contain opacity-40 select-none pointer-events-none"
              style={{ filter: 'invert(1) hue-rotate(140deg) brightness(0.65) contrast(1.35)' }}
            />
            {/* Grid Overlay for high-tech HUD look */}
            <div className="absolute inset-0 opacity-15"
              style={{ backgroundImage: 'linear-gradient(rgba(255,31,110,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,31,110,0.1) 1px,transparent 1px)', backgroundSize: '30px 30px' }} />

            <div className="absolute inset-0 z-10">
              {CITIES.map((city, i) => {
                const x = ((city.lng - 65) / 25) * 100;
                const y = ((35 - city.lat) / 30) * 100;
                const isActive = activeCity === city.name;
                return (
                  <button
                    key={city.name}
                    onClick={() => setActiveCity(isActive ? null : city.name)}
                    style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%,-50%)', position: 'absolute' }}
                    className="group"
                    aria-label={`${city.name} — ${city.safe ? 'Safe' : 'Alert'} Zone`}
                  >
                    <div
                      className="absolute inset-0 rounded-full animate-pulse-ring"
                      style={{ background: city.safe ? 'rgba(34,197,94,0.4)' : 'rgba(239,68,68,0.4)', animationDelay: `${i * 0.3}s` }}
                    />
                    <div
                      className="relative w-4 h-4 rounded-full border-2 border-white/40 transition-transform duration-200 group-hover:scale-125 cursor-pointer"
                      style={{ background: city.safe ? '#22c55e' : '#ef4444', boxShadow: `0 0 10px ${city.safe ? 'rgba(34,197,94,0.8)' : 'rgba(239,68,68,0.8)'}` }}
                    />
                    {isActive && (
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 glass-card px-3 py-1.5 whitespace-nowrap z-30 animate-fade-in shadow-xl">
                        <p className="text-white text-xs font-bold">{city.name}</p>
                        <p className={`text-xs font-semibold ${city.safe ? 'text-green-400' : 'text-red-400'}`}>{city.safe ? 'Safe Zone' : 'Alert Zone'}</p>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="absolute inset-0 pointer-events-none z-10" aria-hidden="true">
              <div className="absolute top-[25%] left-[55%] w-32 h-32 rounded-full" style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.1) 0%, transparent 70%)' }} />
              <div className="absolute top-[60%] left-[25%] w-40 h-40 rounded-full" style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.1) 0%, transparent 70%)' }} />
            </div>
          </div>

          <div className="px-6 py-4 flex items-center justify-between flex-wrap gap-4 border-t border-pink-500/10">
            <p className="text-(--text-secondary) text-sm">Showing data for <span className="text-white font-semibold">{CITIES.length} cities</span></p>
            <button
              onClick={() => setLocationEnabled(!locationEnabled)}
              className={`text-sm font-semibold px-5 py-2 rounded-full transition-all duration-300 ${locationEnabled ? 'bg-green-500/20 text-green-400 border border-green-500/40' : 'pink-glow-btn'}`}
              aria-pressed={locationEnabled}
            >
              {locationEnabled ? '✓ Location Enabled' : 'Enable Location for Personalized Insights'}
            </button>
          </div>
        </div>

        <AIRouteSafetyScore inView={inView} />
      </div>
    </section>
  );
}
