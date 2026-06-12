import React, { useState, useEffect } from 'react';
import { 
  Terminal, Cpu, Hammer, Briefcase, Code, Mail, 
  Menu, X, Shield, RefreshCw, HardDrive, Wifi 
} from 'lucide-react';
import HeroSection from './HeroSection';
import SkillsSection from './SkillsSection';
import ExperienceSection from './ExperienceSection';
import ProjectsSection from './ProjectsSection';
import ContactSection from './ContactSection';

export default function Dashboard() {
  const [uptime, setUptime] = useState({ h: 0, m: 0, s: 0 });
  const [cpuTemp, setCpuTemp] = useState(38.2);
  const [cpuUsage, setCpuUsage] = useState(14);
  const [activeSec, setActiveSec] = useState('hero');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // System Uptime Clock
  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const diff = Date.now() - start;
      const s = Math.floor(diff / 1000) % 60;
      const m = Math.floor(diff / (1000 * 60)) % 60;
      const h = Math.floor(diff / (1000 * 60 * 60));
      setUptime({ h, m, s });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // System Telemetry Fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuTemp((prev) => +(prev + (Math.random() * 0.4 - 0.2)).toFixed(1));
      setCpuUsage(Math.floor(Math.random() * 12 + 10));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Scroll spy to highlight active nav
  useEffect(() => {
    const sections = ['hero', 'skills', 'experience', 'projects', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSec(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setSidebarOpen(false);
  };

  const pad = (num) => String(num).padStart(2, '0');

  const navItems = [
    { id: 'hero', label: '0x00 HERO', icon: Terminal },
    { id: 'skills', label: '0x01 SKILLS', icon: Cpu },
    { id: 'experience', label: '0x02 EXPERIENCE', icon: Briefcase },
    { id: 'projects', label: '0x03 PROJECTS', icon: Code },
    { id: 'contact', label: '0x04 CONTACT', icon: Mail },
  ];

  return (
    <div className="app-container">
      {/* Background patterns */}
      <div className="bg-grid" />
      <div className="circuit-overlay" />

      {/* Responsive Hamburger Toggle for Mobile */}
      <button 
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 right-4 z-40 lg:hidden p-2 glass-panel text-cyan-400 hover:text-cyan-300 rounded"
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar Control Panel */}
      <aside className={`fixed inset-y-0 left-0 z-30 w-[260px] glass-panel border-y-0 border-l-0 rounded-none transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Brand / Logo Info */}
        <div className="p-6 border-b border-cyan-950 flex flex-col gap-1 select-none">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-cyan-500" />
            <span className="font-tech text-base font-extrabold tracking-widest text-bright">PORTFOLIO OS</span>
          </div>
          <span className="font-mono text-[10px] text-slate-500">SYSTEM: ONLINE v2.0.4</span>
        </div>

        {/* Sidebar Nav links */}
        <nav className="flex-1 p-4 flex flex-col gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activeSec === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded text-left font-tech text-xs tracking-wider transition-all border ${active ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400 text-glow-cyan font-bold' : 'border-transparent text-slate-400 hover:bg-slate-900/40 hover:text-slate-200'}`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-cyan-400 animate-pulse' : 'text-slate-500'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Diagnostic Status in Sidebar */}
        <div className="p-6 border-t border-cyan-950 font-mono text-[10px] text-slate-500 flex flex-col gap-2 select-none">
          <div className="flex justify-between items-center">
            <span>CORE TEMPERATURE:</span>
            <span className="text-amber-500">{cpuTemp}°C</span>
          </div>
          <div className="flex justify-between items-center">
            <span>CORE UTILIZATION:</span>
            <span className="text-cyan-400">{cpuUsage}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span>RAM (192KB TOTAL):</span>
            <span className="text-green-500">81KB (42%)</span>
          </div>
          <div className="h-1.5 w-full bg-slate-900 rounded overflow-hidden mt-1 border border-cyan-950 p-0.5">
            <div 
              className="bg-cyan-500 h-full rounded transition-all duration-300"
              style={{ width: `${cpuUsage}%` }}
            />
          </div>
        </div>
      </aside>

      {/* Main Content Dashboard Frame */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Fixed Header Bar */}
        <header className="h-[60px] glass-panel border-x-0 border-t-0 rounded-none px-6 flex items-center justify-between text-xs font-mono text-slate-400 select-none z-20">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <span className="led-indicator led-green" />
              <span>SYS_OK</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <Wifi className="w-4 h-4 text-green-500" />
              <span>MQTT_CONN</span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-cyan-500 animate-pulse" />
              <span>FLASH_ACC</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1 rounded border border-cyan-950">
              <RefreshCw className="w-3.5 h-3.5 text-cyan-500 animate-spin" style={{ animationDuration: '4s' }} />
              <span>UPTIME:</span>
              <span className="text-bright font-bold">{pad(uptime.h)}:{pad(uptime.m)}:{pad(uptime.s)}</span>
            </div>
          </div>
        </header>

        {/* Scrollable Panel Viewport */}
        <div className="flex-1 overflow-y-auto custom-scroll">
          <div className="content-area">
            {/* Sections */}
            <HeroSection />
            <SkillsSection />
            <ExperienceSection />
            <ProjectsSection />
            <ContactSection />
            
            {/* Footer */}
            <footer className="py-8 border-t border-cyan-950 mt-12 text-center text-xs font-mono text-slate-600">
              <p>&copy; {new Date().getFullYear()} DARSHAN K. DESIGNED AND PROGRAMMED IN EMBEDDED C & REACT.</p>
              <p className="mt-2 text-[10px] text-cyan-900">SYSTEM REGISTER // SPI_BUS_CONNECTED // RTOS_SCHEDULER_RUNNING</p>
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
}
