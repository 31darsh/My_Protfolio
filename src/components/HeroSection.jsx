import React, { useState } from 'react';
import { Download, ExternalLink, Command, Cpu, GraduationCap, MapPin } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export default function HeroSection() {
  const [consoleInput, setConsoleInput] = useState('');
  const [consoleLogs, setConsoleLogs] = useState([
    { text: 'Initial handshake complete.', type: 'sys' },
    { text: 'Type "help" to view available micro-commands.', type: 'sys' }
  ]);

  const handleConsoleSubmit = (e) => {
    e.preventDefault();
    const cmd = consoleInput.trim().toLowerCase();
    if (!cmd) return;

    let response = [];
    switch (cmd) {
      case 'help':
        response = [
          { text: '> help', type: 'user' },
          { text: 'Available commands:', type: 'sys' },
          { text: '  about      - Display brief engineer profile', type: 'sys' },
          { text: '  education  - Display academic record', type: 'sys' },
          { text: '  protocols  - Print active bus configurations', type: 'sys' },
          { text: '  clear      - Clear terminal history', type: 'sys' },
        ];
        break;
      case 'about':
        response = [
          { text: '> about', type: 'user' },
          { text: 'DARSHAN K: Embedded Systems & Firmware Engineer.', type: 'info' },
          { text: 'Specializes in STM32/ARM-Cortex-M microcontrollers, ESP32 modules, FreeRTOS scheduler, KiCad PCB designs, and low-latency firmware in Embedded C.', type: 'info' },
        ];
        break;
      case 'education':
        response = [
          { text: '> education', type: 'user' },
          { text: '1. M.Tech in IoT & Sensor Systems', type: 'info' },
          { text: '   M S Ramaiah Institute of Technology | CGPA: 8.86 (2025-2027)', type: 'muted' },
          { text: '2. B.E. in Electronics', type: 'info' },
          { text: '   Maharaja Institute of Technology, Mysore | CGPA: 7.79 (2020-2024)', type: 'muted' },
        ];
        break;
      case 'protocols':
        response = [
          { text: '> protocols', type: 'user' },
          { text: 'SPI: SPI1 Active (Mode 0, MSB First, 42MHz Baud)', type: 'success' },
          { text: 'I2C: I2C1 Active (Standard Mode, Addr: 0x3C)', type: 'success' },
          { text: 'UART: USART2 Baud: 115200, Parity: None', type: 'success' },
          { text: 'MQTT: Connected to broker.emqx.io:1883', type: 'success' },
        ];
        break;
      case 'clear':
        setConsoleLogs([]);
        setConsoleInput('');
        return;
      default:
        response = [
          { text: `> ${cmd}`, type: 'user' },
          { text: `Command "${cmd}" not recognized. Type "help" for options.`, type: 'err' }
        ];
    }

    setConsoleLogs((prev) => [...prev, ...response]);
    setConsoleInput('');
  };

  return (
    <section id="hero" className="min-h-[calc(100vh-120px)] flex flex-col justify-center py-8 md:py-16 border-b border-cyan-950">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Side: Pitch and Bio */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full w-fit text-cyan-400 font-mono text-xs select-none">
            <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>FIRMWARE_ENGINEER_INITIALIZED</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-cyan-400 overflow-hidden shadow-cyan select-none group flex-shrink-0">
              <img 
                src={`${import.meta.env.BASE_URL}profile.png`} 
                alt="Darshan K" 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="font-tech text-3xl md:text-4xl lg:text-5xl font-black tracking-wider text-bright">
                DARSHAN K
              </h1>
              <h2 className="font-tech text-base md:text-lg text-cyan-400 text-glow-cyan font-bold uppercase tracking-wider">
                Embedded Systems & Firmware Engineer
              </h2>
            </div>
          </div>

          <p className="text-slate-300 leading-relaxed text-sm md:text-base max-w-xl font-sans">
            Results-driven Embedded Systems & Firmware Engineer and M.Tech candidate with 2+ years of hands-on experience designing low-level firmware, custom PCB modules, and validating hardware-software integrations. Expert in arming STM32 and ESP32 architectures with FreeRTOS scheduler, SPI/I2C/UART protocols, and MQTT networks.
          </p>

          {/* Social Links & Action Buttons */}
          <div className="flex flex-wrap gap-4 select-none">
            <a 
              href={`${import.meta.env.BASE_URL}Darshan_K_Resume_Signify.pdf`} 
              download="Darshan_K_Resume.pdf"
              className="btn-tech btn-tech-green shadow-green"
            >
              <Download className="w-4 h-4" />
              DOWNLOAD RESUME
            </a>
            <a 
              href="https://www.linkedin.com/in/darshank123/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-tech"
            >
              <LinkedinIcon className="w-4 h-4" />
              LINKEDIN
            </a>
            <a 
              href="https://github.com/31darsh" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-tech"
            >
              <GithubIcon className="w-4 h-4" />
              GITHUB
            </a>
            <a 
              href="https://share.google/iTYL0XvZgfDPGX6m1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-tech btn-tech-violet"
            >
              <ExternalLink className="w-4 h-4" />
              DRIVE FILE / PHOTO
            </a>
          </div>

          {/* Info Panels Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 select-none">
            <div className="glass-panel p-4 flex gap-4 items-center">
              <div className="p-3 bg-cyan-950/50 border border-cyan-800 text-cyan-400 rounded">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-tech text-xs text-bright tracking-wider">ACADEMIC PATH</h3>
                <p className="text-xs text-slate-300 font-bold">M.Tech in IoT & Sensor Systems</p>
                <p className="text-[10px] text-slate-500 font-mono">M S Ramaiah Institute, CGPA: 8.86</p>
              </div>
            </div>

            <div className="glass-panel p-4 flex gap-4 items-center">
              <div className="p-3 bg-cyan-950/50 border border-cyan-800 text-cyan-400 rounded">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-tech text-xs text-bright tracking-wider">LOCATION</h3>
                <p className="text-xs text-slate-300 font-bold">Bengaluru, Karnataka</p>
                <p className="text-[10px] text-slate-500 font-mono">India - 560104</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Shell Console */}
        <div className="lg:col-span-5 select-none">
          <div className="glass-panel border-cyan-900 rounded-lg overflow-hidden flex flex-col h-[340px] font-mono text-xs shadow-2xl">
            {/* Console Header */}
            <div className="bg-[#050914] px-4 py-2 flex items-center justify-between border-b border-cyan-950 text-slate-500 select-none">
              <div className="flex items-center gap-2">
                <Command className="w-3.5 h-3.5 text-cyan-500 animate-pulse" />
                <span className="font-semibold text-[10px] tracking-wider text-cyan-400">MCU_SHELL_SIMULATION</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/30" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/30" />
              </div>
            </div>

            {/* Console Output */}
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-1.5 custom-scroll bg-black/40">
              {consoleLogs.map((log, index) => {
                let logClass = 'text-cyan-400';
                if (log.type === 'sys') logClass = 'text-slate-500';
                if (log.type === 'user') logClass = 'text-bright';
                if (log.type === 'info') logClass = 'text-green-400';
                if (log.type === 'muted') logClass = 'text-slate-600';
                if (log.type === 'err') logClass = 'text-red-500';
                if (log.type === 'success') logClass = 'text-emerald-400';
                return (
                  <div key={index} className="leading-relaxed whitespace-pre-wrap">
                    <span className={logClass}>{log.text}</span>
                  </div>
                );
              })}
            </div>

            {/* Console Input Bar */}
            <form onSubmit={handleConsoleSubmit} className="border-t border-cyan-950 bg-[#050914] px-4 py-3 flex items-center gap-2">
              <span className="text-cyan-400 font-bold">$</span>
              <input
                type="text"
                value={consoleInput}
                onChange={(e) => setConsoleInput(e.target.value)}
                placeholder="type 'about', 'education', 'protocols'..."
                className="flex-1 bg-transparent border-none outline-none text-bright font-mono text-xs placeholder-slate-700"
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
