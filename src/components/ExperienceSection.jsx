import React, { useState } from 'react';
import { Briefcase, Award, ArrowUpRight, Cpu } from 'lucide-react';

export default function ExperienceSection() {
  const [hoveredNode, setHoveredNode] = useState(null);

  const experiences = [
    {
      id: 0,
      type: 'work',
      role: 'Technical Engineer',
      company: 'TechVoc Finesse Consultancy Pvt. Ltd.',
      location: 'Bengaluru, India',
      duration: 'Jan 2025 – Nov 2025',
      bullets: [
        'Designed core firmware in Embedded C optimized for low-latency performance on STM32 microcontrollers.',
        'Engineered custom PCB modules using KiCad, optimizing trace routes for signal integrity.',
        'Led hardware-software integration debug cycles using logic analyzers and digital oscilloscopes.',
        'Mentored junior trainees in circuit design, firmware architecture, and PCB validation workflows.'
      ]
    },
    {
      id: 1,
      type: 'intern',
      role: 'IoT, Embedded & STEM Technology Intern',
      company: 'Tescom Technologies Pvt. Ltd.',
      location: 'Bengaluru, India',
      duration: 'Nov 2025 – May 2026',
      bullets: [
        'Selected to contribute to IoT and Embedded systems development initiatives under direct mentorship of the Senior Innovation Engineer Mrs. Shruti Patil.',
        'Developed and integrated components for IoT, Embedded systems, and STEM hardware modules at client locations and in-office labs.'
      ]
    },
    {
      id: 2,
      type: 'work',
      role: 'Graduate Engineering Trainee',
      company: 'Univision Technology Consulting Pvt. Ltd.',
      location: 'Bengaluru, India',
      duration: 'Aug 2024 – Jan 2025',
      bullets: [
        'Deployed firmware modules in Embedded C for STM32, ESP32, and Raspberry Pi platforms.',
        'Configured low-level peripheral drivers for SPI, I2C, and UART, improving data throughput by 12%.',
        'Executed system-level debugging on Intel architecture prototypes to isolate performance anomalies.',
        'Streamlined firmware builds via cross-compilation and Linux CLI shell debugging environments.'
      ]
    },
    {
      id: 3,
      type: 'intern',
      role: 'Embedded Firmware Intern',
      company: 'PECSOL TECHNOLOGIES Pvt. Ltd.',
      location: 'India',
      duration: 'Nov 2023 – May 2024',
      bullets: [
        'Programmed and validated applications for STM32 and ESP32 boards in STM32CubeIDE and Keil uVision5.',
        'Contributed to an electric cycle management project, validating sensor data ingestion logic.',
        'Tested onboard behavior via AT Commands and MQTT over cellular and Wi-Fi networks.'
      ]
    }
  ];

  return (
    <section id="experience" className="py-8 md:py-16 border-b border-cyan-950 select-none">
      <div className="flex flex-col gap-8">
        {/* Section Header */}
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[10px] text-cyan-500 uppercase tracking-widest">SUB_SYSTEM_02: TIMELINE_TRACE</span>
          <h2 className="font-tech text-2xl md:text-3xl font-extrabold text-bright tracking-wider">
            EXPERIENCE LOGS
          </h2>
        </div>

        {/* Timeline body simulating a circuit trace */}
        <div className="relative pl-6 md:pl-10 flex flex-col gap-10">
          {/* Vertical copper trace line */}
          <div className="absolute left-[7px] md:left-[11px] top-4 bottom-4 w-[2px] bg-slate-900 border-l border-cyan-950/60 z-0">
            {/* Glowing active pulse tracing down */}
            <div className="absolute top-0 bottom-0 left-[-1px] w-[2px] bg-cyan-500 transition-all duration-300"
              style={{
                height: hoveredNode !== null ? `${(hoveredNode + 1) * 25}%` : '0%',
                boxShadow: '0 0 10px #00f0ff'
              }}
            />
          </div>

          {experiences.map((exp, index) => {
            const isHovered = hoveredNode === index;
            return (
              <div 
                key={exp.id}
                className="relative z-10 flex flex-col gap-2"
                onMouseEnter={() => setHoveredNode(index)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {/* Circuit Node dot */}
                <div 
                  className={`absolute left-[-24px] md:left-[-34px] top-1.5 w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${isHovered ? 'bg-[#060913] border-cyan-400 scale-125' : 'bg-slate-950 border-cyan-950'}`}
                  style={{
                    boxShadow: isHovered ? '0 0 10px #00f0ff' : 'none'
                  }}
                >
                  <div className={`w-2 h-2 rounded-full transition-all duration-300 ${isHovered ? 'bg-cyan-400' : 'bg-slate-800'}`} />
                </div>

                {/* Experience Card */}
                <div className={`glass-panel p-5 transition-all duration-300 ${isHovered ? 'border-cyan-400' : 'border-cyan-950/60'}`}
                  style={{
                    boxShadow: isHovered ? '0 0 20px rgba(0, 240, 255, 0.15), inset 0 0 8px rgba(0, 240, 255, 0.05)' : 'none'
                  }}
                >
                  {/* Card Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-cyan-950/50 pb-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        {exp.type === 'work' ? (
                          <Briefcase className="w-4 h-4 text-cyan-400" />
                        ) : (
                          <Award className="w-4 h-4 text-green-400" />
                        )}
                        <h3 className="font-tech text-sm md:text-base font-bold text-bright tracking-wider">
                          {exp.role}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-300 font-semibold mt-1">
                        {exp.company} <span className="text-[10px] text-slate-500 font-normal">| {exp.location}</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-xs text-cyan-500 bg-cyan-950/30 px-2 py-0.5 border border-cyan-900/50 rounded inline-block">
                        {exp.duration}
                      </span>
                    </div>
                  </div>

                  {/* Achievements bullet list */}
                  <ul className="flex flex-col gap-2 pl-4 list-disc text-xs text-slate-300 font-sans leading-relaxed">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="hover:text-slate-100 transition-colors">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
