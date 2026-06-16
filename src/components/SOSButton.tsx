import { useState } from 'react';
import { X, MapPin, Phone, Volume2 } from 'lucide-react';

function SOSDemo({ onClose }: { onClose: () => void }) {
  const [stage, setStage] = useState<'idle' | 'counting' | 'sent'>('idle');
  const [count, setCount] = useState(3);

  const triggerSOS = () => {
    setStage('counting');
    let c = 3;
    setCount(3);
    const iv = setInterval(() => {
      c -= 1;
      setCount(c);
      if (c <= 0) { clearInterval(iv); setStage('sent'); }
    }, 700);
  };

  return (
    <div
      className="fixed inset-0 z-850 flex items-center justify-center p-4 animate-fade-in"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
      role="dialog" aria-modal="true" aria-label="SOS Demo"
      onClick={onClose}
    >
      <div
        className="glass-card p-8 max-w-sm w-full text-center relative animate-fade-in-up"
        style={{ border: '1px solid rgba(255,31,110,0.4)' }}
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors" aria-label="Close demo">
          <X size={20} />
        </button>

        <div className="tag-pill mx-auto mb-4">Demo Mode</div>
        <h2 className="text-white font-bold text-xl mb-2">SafeHer SOS Demo</h2>
        <p className="text-(--text-secondary) text-sm mb-8">This is a simulation. In real mode, your contacts receive instant alerts.</p>

        {stage === 'idle' && (
          <div>
            <button
              onClick={triggerSOS}
              className="w-32 h-32 rounded-full mx-auto flex items-center justify-center text-white font-black text-3xl mb-6 animate-glow-pulse"
              style={{ background: 'linear-gradient(135deg, #FF1F6E, #c20057)', boxShadow: '0 0 40px rgba(255,31,110,0.6)' }}
              aria-label="Activate SOS demo"
            >SOS</button>
            <p className="text-gray-500 text-sm">Tap the SOS button to see a demo</p>
          </div>
        )}

        {stage === 'counting' && (
          <div>
            <div
              key={count}
              className="text-8xl font-black text-pink-500 mb-6 animate-count-pop"
              style={{ textShadow: '0 0 30px rgba(255,31,110,0.8)' }}
              aria-live="polite"
            >{count}</div>
            <p className="text-white font-semibold">Sending SOS alert…</p>
          </div>
        )}

        {stage === 'sent' && (
          <div className="animate-fade-in-up">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-green-400 font-bold text-xl mb-4">SOS Sent!</h3>
            <div className="flex flex-col gap-3 text-left">
              {[
                { icon: Phone, text: 'Notified 3 emergency contacts' },
                { icon: MapPin, text: 'Live location shared: Connaught Place, Delhi' },
                { icon: Volume2, text: 'Audio recording started silently' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 glass-card px-4 py-2.5">
                  <Icon size={16} className="text-pink-400 shrink-0" />
                  <span className="text-(--text-secondary) text-sm">{text}</span>
                </div>
              ))}
            </div>
            <button onClick={() => setStage('idle')} className="pink-glow-btn px-6 py-2.5 text-sm mt-6">Try Again</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SOSButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className="sos-float-btn" aria-label="Open SOS demo">
        🆘 SOS Demo
      </button>
      {open && <SOSDemo onClose={() => setOpen(false)} />}
    </>
  );
}
