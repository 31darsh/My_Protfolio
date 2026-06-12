import React, { useState } from 'react';
import { Send, Mail, Phone, MapPin, Radio, Terminal, Wifi } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sendingState, setSendingState] = useState('idle'); // idle | transmitting | success | error
  const [logs, setLogs] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTransmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSendingState('transmitting');
    setLogs([
      'INITIATING telemetry tx handshake...',
      'CONNECTING to Broker at broker.emqx.io...',
    ]);

    // Simulate firmware logs during MQTT transmit
    setTimeout(() => {
      setLogs((prev) => [...prev, 'CONNACK received from broker (Code: 0).']);
    }, 600);

    setTimeout(() => {
      setLogs((prev) => [...prev, 'PACKET SERIALIZATION: Payload length ' + JSON.stringify(formData).length + ' bytes.']);
    }, 1200);

    setTimeout(() => {
      setLogs((prev) => [...prev, 'PUBLISHING to topic: "darshan/contact/incoming"...']);
    }, 1800);

    setTimeout(() => {
      setLogs((prev) => [...prev, 'TRANSMIT SUCCESS: Packet acknowledged (PUBACK received).']);
      setSendingState('success');
      // Clear form
      setFormData({ name: '', email: '', message: '' });
    }, 2400);
  };

  return (
    <section id="contact" className="py-8 md:py-16 select-none">
      <div className="flex flex-col gap-8">
        {/* Section Header */}
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[10px] text-cyan-500 uppercase tracking-widest">SUB_SYSTEM_04: TELEMETRY_LINK</span>
          <h2 className="font-tech text-2xl md:text-3xl font-extrabold text-bright tracking-wider">
            TRANSMIT SIGNAL
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Side: Contact Form styled like hardware controller */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="glass-panel p-5 flex flex-col gap-5">
              <div className="flex items-center gap-2 border-b border-cyan-950 pb-3">
                <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
                <h3 className="font-tech text-sm font-bold text-bright tracking-wider">
                  RF TELEMETRY PACKET INJECTOR
                </h3>
              </div>

              <form onSubmit={handleTransmit} className="flex flex-col gap-4">
                {/* Name Input */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
                    <span>REGISTER: REG_0x10_NAME</span>
                    <span className={formData.name ? 'text-green-500' : 'text-amber-500'}>
                      {formData.name ? '✓ VALIDATED' : '✗ EMPTY'}
                    </span>
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name..."
                    required
                    disabled={sendingState === 'transmitting'}
                    className="tech-input"
                  />
                </div>

                {/* Email Input */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
                    <span>REGISTER: REG_0x11_EMAIL</span>
                    <span className={formData.email ? 'text-green-500' : 'text-amber-500'}>
                      {formData.email ? '✓ VALIDATED' : '✗ EMPTY'}
                    </span>
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address..."
                    required
                    disabled={sendingState === 'transmitting'}
                    className="tech-input"
                  />
                </div>

                {/* Message Input */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
                    <span>REGISTER: REG_0x12_PAYLOAD</span>
                    <span className={formData.message ? 'text-green-500' : 'text-amber-500'}>
                      {formData.message ? '✓ VALIDATED' : '✗ EMPTY'}
                    </span>
                  </div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Type message telemetry payload..."
                    rows="4"
                    required
                    disabled={sendingState === 'transmitting'}
                    className="tech-input resize-none"
                  />
                </div>

                {/* Submit button */}
                <div className="flex justify-end select-none pt-2">
                  <button
                    type="submit"
                    disabled={sendingState === 'transmitting'}
                    className="btn-tech btn-tech-green w-full sm:w-auto font-sans"
                  >
                    <Send className="w-4 h-4" />
                    {sendingState === 'transmitting' ? 'TRANSMITTING...' : 'SEND TELEMETRY PACKET'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Side: Telemetry status terminal logs & Direct details */}
          <div className="lg:col-span-5 flex flex-col gap-6 select-none">
            {/* Terminal logs showing sending status */}
            <div className="glass-panel border-cyan-900 flex-1 min-h-[180px] p-4 font-mono text-[10px] flex flex-col gap-2 bg-black/40">
              <div className="flex items-center gap-2 text-cyan-400 border-b border-cyan-950 pb-2 mb-1">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>TX_CON_MESSAGES</span>
              </div>
              <div className="flex-1 flex flex-col gap-1.5 overflow-y-auto custom-scroll">
                {logs.length === 0 ? (
                  <span className="text-slate-600">Idle. Waiting for payload packet injection...</span>
                ) : (
                  logs.map((log, lIdx) => (
                    <div key={lIdx} className="flex gap-1.5">
                      <span className="text-slate-700">[{lIdx}]</span>
                      <span className={log.includes('SUCCESS') ? 'text-green-400 text-glow-green' : 'text-cyan-500'}>
                        {log}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Direct details cards */}
            <div className="glass-panel p-5 flex flex-col gap-4">
              <div className="flex items-center gap-2 border-b border-cyan-950 pb-3">
                <Wifi className="w-4 h-4 text-cyan-400" />
                <h3 className="font-tech text-xs font-bold text-bright tracking-wider">
                  DIRECT CHANNELS
                </h3>
              </div>

              <div className="flex flex-col gap-3 font-mono text-xs">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <a href="mailto:darshank9036@gmail.com" className="text-slate-300 hover:text-cyan-400 transition-colors">
                    darshank9036@gmail.com
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-cyan-400" />
                  <a href="tel:+918861457997" className="text-slate-300 hover:text-cyan-400 transition-colors">
                    +91 8861457997
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <span className="text-slate-300">
                    Bengaluru, Karnataka - 560104
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
