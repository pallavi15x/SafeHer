import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Mic, ChevronDown } from 'lucide-react';

const QUICK_QUERIES = [
  'How do I trigger SOS?',
  'How do I add emergency contacts?',
  'Is my data private?',
  'What cities are covered?',
];

const AI_RESPONSES: Record<string, string> = {
  'How do I trigger SOS?': 'Press and hold the red SOS button for 2 seconds. Your location and an emergency message will be instantly sent to all your emergency contacts.',
  'How do I add emergency contacts?': 'Go to Profile → Emergency Contacts → tap the + button. You can add up to 10 trusted contacts who will receive SOS alerts and your live location.',
  'Is my data private?': 'Absolutely! SafeHer uses end-to-end encryption for all your data. We never sell your information. Your location is only shared with your chosen contacts.',
  'What cities are covered?': 'SafeHer covers 100+ cities across India including Mumbai, Delhi, Bangalore, Chennai, Kolkata, Hyderabad, Pune, and more. We\'re expanding globally every month!',
};

const FALLBACK = "Thanks for your question! For urgent safety concerns, please call emergency services immediately. For app support, email support@safeher.com.";

type Message = { role: 'user' | 'ai'; text: string };

export default function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: "Hi! I'm SafeHer AI. How can I help you stay safe today? 💗" },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [listening, setListening] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      const response = AI_RESPONSES[text] || FALLBACK;
      setMessages(prev => [...prev, { role: 'ai', text: response }]);
      setTyping(false);
    }, 1200 + Math.random() * 600);
  };

  const startVoice = () => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;
    const r = new SR();
    r.lang = 'en-IN';
    r.onstart = () => setListening(true);
    r.onend = () => setListening(false);
    r.onresult = (e: any) => setInput(e.results[0][0].transcript);
    r.start();
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-800 w-14 h-14 rounded-full flex items-center justify-center text-white transition-transform duration-200 hover:scale-110"
        style={{ background: 'linear-gradient(135deg, #FF1F6E, #c20057)', boxShadow: '0 0 30px rgba(255,31,110,0.6)', animation: open ? 'none' : 'glow-pulse 2s ease-in-out infinite' }}
        aria-label={open ? 'Close AI chat' : 'Open AI chat'}
        aria-expanded={open}
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {/* Chat Window */}
      <div
        className="fixed bottom-24 right-6 z-799 w-[340px] sm:w-[380px] rounded-2xl overflow-hidden"
        style={{
          boxShadow: '0 0 60px rgba(255,31,110,0.25), 0 20px 60px rgba(0,0,0,0.5)',
          opacity: open ? 1 : 0,
          transform: open ? 'scale(1) translateY(0)' : 'scale(0.85) translateY(20px)',
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
          transformOrigin: 'bottom right',
        }}
        role="dialog"
        aria-label="SafeHer AI Assistant"
        aria-hidden={!open}
      >
        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, #FF1F6E, #c20057)' }} className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"><span className="text-sm">🤖</span></div>
            <div>
              <p className="text-white font-bold text-sm">SafeHer AI</p>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
                <span className="text-white/80 text-xs">Online</span>
              </div>
            </div>
          </div>
          <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white transition-colors" aria-label="Minimize chat">
            <ChevronDown size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="h-[300px] overflow-y-auto p-4 flex flex-col gap-3" style={{ background: 'rgba(13,0,8,0.97)' }}>
          {messages.map((msg, i) => (
            <div key={i} className={`animate-fade-in-up ${msg.role === 'user' ? 'flex justify-end' : 'flex justify-start'}`}>
              <div className={msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}>{msg.text}</div>
            </div>
          ))}
          {typing && (
            <div className="flex justify-start animate-fade-in">
              <div className="chat-bubble-ai flex items-center gap-1 px-4 py-3">
                {[0, 1, 2].map(i => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-pink-400"
                    style={{ animation: `typing-dot 1s ease-in-out ${i * 0.2}s infinite` }} />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Quick Queries */}
        <div className="px-3 py-2 flex gap-2 flex-wrap" style={{ background: 'rgba(18,0,10,0.97)', borderTop: '1px solid rgba(255,31,110,0.1)' }}>
          {QUICK_QUERIES.map(q => (
            <button key={q} onClick={() => sendMessage(q)}
              className="text-xs px-3 py-1.5 rounded-full text-pink-300 hover:text-white transition-all duration-200"
              style={{ background: 'rgba(255,31,110,0.1)', border: '1px solid rgba(255,31,110,0.25)' }}>
              {q}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="px-3 pb-3 pt-2 flex items-center gap-2" style={{ background: 'rgba(18,0,10,0.97)', borderTop: '1px solid rgba(255,31,110,0.1)' }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
            placeholder="Ask SafeHer AI..."
            className="flex-1 bg-white/5 border border-pink-500/20 rounded-xl px-3 py-2 text-white text-sm placeholder-gray-500 outline-hidden focus:border-pink-500/50 transition-colors"
            aria-label="Type your message"
          />
          <button onClick={startVoice}
            className={`p-2 rounded-full transition-all duration-200 ${listening ? 'bg-pink-500 text-white' : 'text-gray-400 hover:text-pink-400'}`}
            aria-label="Voice input"><Mic size={16} /></button>
          <button onClick={() => sendMessage(input)} disabled={!input.trim()}
            className="p-2 rounded-full bg-pink-500 text-white disabled:opacity-50 hover:bg-pink-600 transition-colors"
            aria-label="Send message"><Send size={16} /></button>
        </div>
      </div>
    </>
  );
}
