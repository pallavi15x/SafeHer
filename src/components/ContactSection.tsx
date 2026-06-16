import { useState } from 'react';
import { Mail, Phone, Clock, CheckCircle, Upload } from 'lucide-react';
import { Instagram, Facebook, Twitter, Youtube } from './SocialIcons';
import { useInView } from '../hooks';

type FormData = { name: string; email: string; phone: string; subject: string; message: string; };
type Errors = Partial<Record<keyof FormData, string>>;

function validate(data: FormData): Errors {
  const e: Errors = {};
  if (!data.name.trim()) e.name = 'Name is required';
  if (!data.email.trim()) e.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'Invalid email';
  if (!data.subject) e.subject = 'Please select a subject';
  if (!data.message.trim()) e.message = 'Message is required';
  else if (data.message.length < 20) e.message = 'At least 20 characters';
  return e;
}

export default function ContactSection() {
  const { ref, inView } = useInView();
  const [form, setForm] = useState<FormData>({ name: '', email: '', phone: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState('');

  const set = (k: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1000));
    setSubmitted(true);
    setSubmitting(false);
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  const inputCls = (err?: string) =>
    `w-full bg-white/5 border ${err ? 'border-red-500/60' : 'border-pink-500/25'} rounded-xl px-4 py-3 text-(--text-primary) placeholder-gray-500 text-sm outline-hidden focus:border-pink-500/60 transition-colors`;

  const contacts = [
    { icon: Mail, label: 'Email', value: 'support@safeher.com', href: 'mailto:support@safeher.com' },
    { icon: Phone, label: 'Phone', value: '+91 98766 43210', href: 'tel:+919876643210' },
    { icon: Clock, label: 'Availability', value: 'Available 24/7', href: null },
  ];
  const socials = [
    { Icon: Instagram, label: 'Instagram' }, { Icon: Facebook, label: 'Facebook' },
    { Icon: Twitter, label: 'Twitter / X' }, { Icon: Youtube, label: 'YouTube' },
  ];

  return (
    <section id="contact" ref={ref as React.RefObject<HTMLElement>} className="py-24 px-4 sm:px-6">
      <div className="w-full max-w-[92%] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto">
        <div className={`text-center mb-16 reveal ${inView ? 'visible' : ''}`}>
          <div className="tag-pill mx-auto mb-4">Contact Us</div>
          <h2 className="font-['Playfair_Display'] font-extrabold text-3xl sm:text-5xl mb-4">
            <span className="text-white">Get in </span><span className="shimmer-text">Touch</span>
          </h2>
          <p className="text-(--text-secondary) max-w-lg mx-auto">Have a question, partnership inquiry, or need help? We're here 24/7 for you.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left */}
          <div className={`reveal-left ${inView ? 'visible' : ''}`}>
            <div className="flex flex-col gap-4 mb-8">
              {contacts.map(({ icon: Icon, label, value, href }, i) => (
                <div key={label} className={`glass-card p-5 flex items-center gap-4 group hover:border-pink-500/60 transition-all duration-300 reveal-left ${inView ? 'visible' : ''} delay-${i + 1}`}>
                  <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center shrink-0 group-hover:bg-pink-500/20 transition-colors">
                    <Icon size={22} className="text-pink-400" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-0.5">{label}</p>
                    {href ? (
                      <a href={href} className="text-white font-semibold hover:text-pink-400 transition-colors">{value}</a>
                    ) : (
                      <p className="text-white font-semibold">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-(--text-secondary) text-sm font-semibold mb-4">Follow Us</p>
            <div className="flex gap-3">
              {socials.map(({ Icon, label }) => (
                <a key={label} href="#" aria-label={label}
                  className="w-11 h-11 rounded-full border border-pink-500/30 flex items-center justify-center text-(--text-secondary) hover:text-pink-400 hover:border-pink-500/70 hover:bg-pink-500/10 transition-all duration-200 hover:scale-110">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div className={`glass-card p-6 sm:p-8 reveal-right ${inView ? 'visible' : ''}`}>
            {submitted ? (
              <div className="flex flex-col items-center gap-3 py-6 text-center animate-fade-in-up">
                <CheckCircle size={48} className="text-green-400" />
                <h3 className="text-white font-bold text-xl">Message Sent!</h3>
                <p className="text-(--text-secondary) text-sm">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4" aria-label="Contact form">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input value={form.name} onChange={set('name')} placeholder="Full Name *" className={inputCls(errors.name)} />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <input type="email" value={form.email} onChange={set('email')} placeholder="Email Address *" className={inputCls(errors.email)} />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>
                <input type="tel" value={form.phone} onChange={set('phone')} placeholder="Phone Number (Optional)" className={inputCls()} />
                <div>
                  <select value={form.subject} onChange={set('subject')} className={`${inputCls(errors.subject)} bg-[#0D0008]`}>
                    <option value="" disabled>Select Subject *</option>
                    <option value="general">General Inquiry</option>
                    <option value="technical">Technical Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="emergency">Emergency Help</option>
                  </select>
                  {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject}</p>}
                </div>
                <div>
                  <textarea value={form.message} onChange={set('message')} placeholder="Your message *" rows={4} className={`${inputCls(errors.message)} resize-none`} />
                  {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                </div>
                <label className="flex items-center gap-3 glass-card px-4 py-3 hover:border-pink-500/50 transition-colors">
                  <Upload size={18} className="text-pink-400 shrink-0" />
                  <span className="text-gray-500 text-sm flex-1">{fileName || 'Attach file (optional)'}</span>
                  <input type="file" className="hidden" onChange={e => setFileName(e.target.files?.[0]?.name || '')} aria-label="Attach file" />
                </label>
                <button type="submit" disabled={submitting} className="pink-glow-btn py-3.5 text-base w-full disabled:opacity-60 disabled:cursor-not-allowed">
                  {submitting ? 'Sending...' : 'Send Message →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
