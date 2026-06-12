import React, { useState } from 'react';
import { Send, Mail, CheckCircle } from 'lucide-react';

export default function NewsletterContact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sendingState, setSendingState] = useState('idle'); // idle | sending | success

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSendingState('sending');
    setTimeout(() => {
      setSendingState('success');
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <section id="contact" className="border-t border-slate-200 pt-12 pb-16 select-none">
      <div className="bg-slate-900 text-slate-100 p-8 md:p-12 rounded-lg relative overflow-hidden flex flex-col md:flex-row items-center gap-8 md:gap-12">
        {/* Subtle schematic background element */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#0d9488_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Text descriptions */}
        <div className="md:w-1/2 flex flex-col gap-4 relative z-10">
          <span className="font-mono text-[10px] text-teal-400 font-bold uppercase tracking-widest">
            CONTACT CHANNELS
          </span>
          <h3 className="title-serif text-2xl md:text-3xl font-bold text-white">
            Write a message or subscribe to my firmware updates
          </h3>
          <p className="font-sans text-xs text-slate-400 leading-relaxed">
            I post periodically on microcontrollers, hardware designs, and real-time operations. Drop a line to discuss research collaborations, job openings, or technical references.
          </p>
        </div>

        {/* Form elements */}
        <div className="md:w-1/2 w-full relative z-10">
          {sendingState === 'success' ? (
            <div className="flex flex-col items-center justify-center text-center p-6 bg-slate-950/40 rounded border border-teal-500/20 text-teal-400">
              <CheckCircle className="w-10 h-10 mb-3 text-teal-400" />
              <h4 className="title-sans text-sm font-bold">Transmission Successful!</h4>
              <p className="font-sans text-[10px] text-slate-400 mt-1">Thank you. Your message has been routed to my email inbox.</p>
              <button 
                onClick={() => setSendingState('idle')}
                className="mt-4 font-sans font-bold text-[10px] uppercase text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  disabled={sendingState === 'sending'}
                  className="bg-slate-800 border border-slate-700 rounded p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  required
                  disabled={sendingState === 'sending'}
                  className="bg-slate-800 border border-slate-700 rounded p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                />
              </div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your email payload message..."
                rows="4"
                required
                disabled={sendingState === 'sending'}
                className="bg-slate-800 border border-slate-700 rounded p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 resize-none"
              />
              <button
                type="submit"
                disabled={sendingState === 'sending'}
                className="btn-editorial btn-editorial-brand bg-teal-600 hover:bg-teal-700 text-white border-transparent select-none font-sans font-bold w-full"
              >
                <Send className="w-3.5 h-3.5" />
                {sendingState === 'sending' ? 'TRANSMITTING...' : 'SEND MESSAGE'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
