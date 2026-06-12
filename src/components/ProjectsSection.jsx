import React, { useState } from 'react';
import { ExternalLink, Cpu, Terminal, Layers, Radio } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function ProjectsSection() {
  const [expandedProject, setExpandedProject] = useState(null);

  const projects = [
    {
      id: 'iot-access',
      title: 'Server-Based IoT Access Control System',
      category: 'FIRMWARE & IoT',
      icon: Cpu,
      github: 'https://github.com/31darsh',
      description: 'Engineered an automated asset deployment stack using ESP32, encrypted MQTT protocols, and SPI optimization. Built secure card verification algorithms and peripheral integration rules to reduce local query latencies.',
      specifications: [
        { label: 'MCU Platform', val: 'ESP32-WROOM-32D (Xtensa Dual-core)' },
        { label: 'Network Stack', val: 'MQTT over TCP/IP (TLS Encrypted)' },
        { label: 'SPI Configuration', val: 'DMA enabled, 40MHz clock, Mode 0' },
        { label: 'Latency Reduction', val: '18% improvement over legacy code' },
        { label: 'Hardware Pins', val: 'MOSI: GPIO23 | MISO: GPIO19 | CLK: GPIO18 | CS: GPIO5' }
      ],
      tags: ['Embedded C', 'ESP-IDF', 'MQTT', 'SPI Protocol', 'EEPROM Encryption']
    },
    {
      id: 'flight-telemetry',
      title: 'Real-Time Flight Telemetry Tracker',
      category: 'EMBEDDED SYSTEMS',
      icon: Radio,
      github: 'https://github.com/31darsh',
      description: 'Built an embedded telemetry system handling fast UART sensor streams. Developed a custom lightweight string-token parser in bare-metal Embedded C to safely deserialize telemetry structures and prevent memory buffer overruns.',
      specifications: [
        { label: 'MCU Platform', val: 'STM32F407 (ARM Cortex-M4 @ 168MHz)' },
        { label: 'Sensor Ingestion', val: 'UART Interrupt RX Ring Buffer' },
        { label: 'Parser Safety', val: 'Fixed-buffer string-token parser' },
        { label: 'OS Configuration', val: 'Bare-metal ISR (Interrupt Service Routine)' },
        { label: 'Hardware Pins', val: 'TX: GPIO_PIN_2 | RX: GPIO_PIN_3 (USART2)' }
      ],
      tags: ['Embedded C', 'STM32CubeIDE', 'Bare-Metal', 'UART Interrupts', 'Buffer Management']
    },
    {
      id: 'portfolio-os',
      title: 'Firmware Developer Interactive Portfolio',
      category: 'WEB SOFTWARE',
      icon: Terminal,
      github: 'https://github.com/31darsh/My_Protfolio.git',
      description: 'A custom developer portfolio designed to resemble a microcontroller diagnostics dashboard. Simulates BIOS boot loaders, hardware register queries, and system uptime logs, with responsive styled components.',
      specifications: [
        { label: 'Architecture', val: 'React Single Page App + Vite' },
        { label: 'Styling', val: 'Custom CSS variables with responsive design' },
        { label: 'Visual Elements', val: 'CRT Scanlines overlay, grid patterns, micro-animations' },
        { label: 'Deployment Stack', val: 'GitHub Pages CI/CD workflow' },
        { label: 'Diagnostic Tools', val: 'Lucide-react icons, mock MCU shell compiler' }
      ],
      tags: ['React', 'Vite', 'Vanilla CSS', 'Responsive UI', 'Deployment Scripts']
    }
  ];

  const toggleExpand = (id) => {
    setExpandedProject(expandedProject === id ? null : id);
  };

  return (
    <section id="projects" className="py-8 md:py-16 border-b border-cyan-950 select-none">
      <div className="flex flex-col gap-8">
        {/* Section Header */}
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[10px] text-cyan-500 uppercase tracking-widest">SUB_SYSTEM_03: MODULE_SHOWCASE</span>
          <h2 className="font-tech text-2xl md:text-3xl font-extrabold text-bright tracking-wider">
            PROJECT ARCHIVES
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj) => {
            const IconComponent = proj.icon;
            const isExpanded = expandedProject === proj.id;
            return (
              <div 
                key={proj.id} 
                className={`glass-panel p-5 flex flex-col gap-4 relative transition-all duration-300 ${isExpanded ? 'border-cyan-400 lg:col-span-2' : 'border-cyan-950/60'}`}
                style={{
                  boxShadow: isExpanded ? '0 0 20px rgba(0, 240, 255, 0.15)' : 'none'
                }}
              >
                {/* Project Header */}
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[9px] text-cyan-500 tracking-wider">
                      {proj.category}
                    </span>
                    <h3 className="font-tech text-sm md:text-base font-bold text-bright tracking-wider">
                      {proj.title}
                    </h3>
                  </div>
                  <div className="p-2.5 bg-cyan-950/40 border border-cyan-900 rounded-lg text-cyan-400">
                    <IconComponent className="w-5 h-5" />
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {proj.tags.map((tag, tIdx) => (
                    <span 
                      key={tIdx} 
                      className="font-mono text-[9px] bg-slate-950 text-slate-400 px-2 py-0.5 border border-cyan-950/60 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p className="text-xs text-slate-400 font-sans leading-relaxed flex-1">
                  {proj.description}
                </p>

                {/* Action Buttons & Expansion trigger */}
                <div className="flex justify-between items-center border-t border-cyan-950/60 pt-4 mt-2">
                  <button
                    onClick={() => toggleExpand(proj.id)}
                    className="font-tech text-[10px] text-cyan-400 hover:text-cyan-300 hover:underline uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    {isExpanded ? 'Hide Specs' : 'Inspect Specs'}
                  </button>

                  <div className="flex gap-2">
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 border border-cyan-950 hover:border-cyan-500 rounded text-slate-400 hover:text-cyan-400 transition-colors"
                      title="View GitHub Repository"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Expandable Pinout/Hardware Spec Panel */}
                {isExpanded && (
                  <div className="mt-4 p-4 bg-slate-950/80 border border-cyan-900/60 rounded-md font-mono text-[10px] flex flex-col gap-2 animate-fade-in">
                    <div className="flex items-center gap-2 text-cyan-400 border-b border-cyan-950/80 pb-1.5 mb-1.5">
                      <Terminal className="w-3.5 h-3.5" />
                      <span>HARDWARE PINOUT & SPECIFICATION TABLE</span>
                    </div>
                    {proj.specifications.map((spec, sIdx) => (
                      <div key={sIdx} className="flex justify-between py-0.5 border-b border-cyan-950/40">
                        <span className="text-slate-500 uppercase">{spec.label}:</span>
                        <span className="text-slate-300 text-right">{spec.val}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
