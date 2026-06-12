import React, { useState } from 'react';
import { Terminal, Cpu, Network, ShieldAlert, Binary } from 'lucide-react';

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState('programming');

  const skillsData = {
    programming: [
      { name: 'Embedded C', level: 95, reg: '0x00A0', description: 'Real-time firmware, bare-metal development, interrupt handlers' },
      { name: 'C Programming', level: 90, reg: '0x00A1', description: 'Data structures, algorithm optimization, pointer management' },
      { name: 'Python', level: 80, reg: '0x00A2', description: 'Data analysis, hardware automation scripting, test fixtures' },
      { name: 'Shell Scripting', level: 75, reg: '0x00A3', description: 'Linux CLI automation, GCC build chains, Makefile scripts' }
    ],
    mcu: [
      { name: 'ARM Cortex-M (STM32)', level: 90, reg: '0x01B0', description: 'STM32F1/F4/L4 series, DMA controllers, peripheral configurations' },
      { name: 'ESP32 (RISC-V/Xtensa)', level: 85, reg: '0x01B1', description: 'Dual-core task synchronization, Wi-Fi/Bluetooth stack configuration' },
      { name: 'ESP8266', level: 80, reg: '0x01B2', description: 'IoT sensor telemetry, low-power sleep state implementation' },
      { name: 'Raspberry Pi', level: 78, reg: '0x01B3', description: 'Linux system configuration, Python hardware controls' }
    ],
    protocols: [
      { name: 'SPI Protocol', level: 92, reg: '0x02C0', description: 'High-speed serial flash, sensor interfaces, DMA data routing' },
      { name: 'I2C Protocol', level: 90, reg: '0x02C1', description: 'Multi-device bus configuration, clock stretching, scanner drivers' },
      { name: 'UART Protocol', level: 95, reg: '0x02C2', description: 'Debugging consoles, telemetry serial parsing, ring buffers' },
      { name: 'MQTT Protocol', level: 85, reg: '0x02C3', description: 'IoT cellular/Wi-Fi publish-subscribe network architectures' },
      { name: 'AT Commands', level: 88, reg: '0x02C4', description: 'GSM/Wi-Fi modem configuration and validation flows' },
      { name: 'CAN Bus', level: 72, reg: '0x02C5', description: 'Controller Area Network frame structuring for automotive/industrial' }
    ],
    hardware: [
      { name: 'KiCad (Schematic & PCB)', level: 85, reg: '0x03D0', description: 'Schematic capture, multi-layer routing, trace calculation' },
      { name: 'Logic Analyzers', level: 90, reg: '0x03D1', description: 'UART/SPI protocol decoding, signal timing error captures' },
      { name: 'Oscilloscopes', level: 88, reg: '0x03D2', description: 'Analog voltage profiling, clock signal ringing diagnosis' },
      { name: 'Multimeters & Tools', level: 92, reg: '0x03D3', description: 'Continuity checks, component test validations, power usage profiling' }
    ],
    environment: [
      { name: 'FreeRTOS', level: 88, reg: '0x04E0', description: 'Task creation, semaphores, queues, preemption scheduling' },
      { name: 'STM32CubeIDE', level: 92, reg: '0x04E1', description: 'HAL/LL configurations, debugging configurations, register reviews' },
      { name: 'Keil uVision5', level: 85, reg: '0x04E2', description: 'ARM compiler optimization, simulator modeling, hex generations' },
      { name: 'ESP-IDF', level: 80, reg: '0x04E3', description: 'Espressif official IoT framework, SDK configurations' },
      { name: 'Linux (Ubuntu)', level: 82, reg: '0x04E4', description: 'Shell utility, cross-compiler toolchains, terminal debugging' }
    ]
  };

  const tabs = [
    { id: 'programming', label: 'CORE CODE', icon: Terminal },
    { id: 'mcu', label: 'MCU CORES', icon: Cpu },
    { id: 'protocols', label: 'BUS PROTOCOLS', icon: Network },
    { id: 'hardware', label: 'LAB HARDWARE', icon: ShieldAlert },
    { id: 'environment', label: 'ENV & RTOS', icon: Binary }
  ];

  // Convert level% to simulated binary register bits (e.g. 90% = [1][1][1][1][1][1][1][0])
  const getRegBits = (level) => {
    const bits = Math.round(level / 12.5);
    const arr = [];
    for (let i = 0; i < 8; i++) {
      arr.push(i < bits ? '1' : '0');
    }
    return arr.reverse();
  };

  return (
    <section id="skills" className="py-8 md:py-16 border-b border-cyan-950 select-none">
      <div className="flex flex-col gap-8">
        {/* Section Header */}
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[10px] text-cyan-500 uppercase tracking-widest">SUB_SYSTEM_01: CAPABILITIES_CHECK</span>
          <h2 className="font-tech text-2xl md:text-3xl font-extrabold text-bright tracking-wider">
            TECHNICAL REGISTERS
          </h2>
        </div>

        {/* Tab Buttons bar */}
        <div className="flex flex-wrap gap-2 border-b border-cyan-950/60 pb-3">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 border font-tech text-xs tracking-wider transition-all rounded ${active ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400 text-glow-cyan font-bold' : 'border-cyan-950/60 bg-transparent text-slate-400 hover:border-cyan-800 hover:text-slate-200'}`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Contents: Render Skills list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillsData[activeTab].map((skill, index) => {
            const bits = getRegBits(skill.level);
            return (
              <div key={index} className="glass-panel p-5 flex flex-col gap-3 relative hover:translate-y-[-2px]">
                {/* Skill Title & Mock Register Address */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-cyan-500 bg-cyan-950/30 px-1.5 py-0.5 border border-cyan-900/50 rounded">
                      {skill.reg}
                    </span>
                    <h3 className="font-tech text-sm font-bold text-bright tracking-wider">
                      {skill.name}
                    </h3>
                  </div>
                  <span className="font-mono text-xs text-green-500 text-glow-green font-bold">
                    {skill.level}%
                  </span>
                </div>

                {/* Simulated Binary Register Bits */}
                <div className="flex gap-1.5 items-center select-none py-1">
                  <span className="text-[9px] font-mono text-slate-600 mr-1">REG_VAL:</span>
                  {bits.map((bit, bIdx) => (
                    <span 
                      key={bIdx}
                      className={`w-6 py-0.5 text-center font-mono text-[10px] rounded border select-none ${bit === '1' ? 'bg-green-500/10 border-green-500 text-green-400 text-glow-green' : 'bg-slate-950 border-cyan-950 text-slate-700'}`}
                    >
                      {bit}
                    </span>
                  ))}
                </div>

                {/* Skill Description */}
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  {skill.description}
                </p>

                {/* Graphic Progress Bar */}
                <div className="h-1 bg-slate-900 rounded overflow-hidden mt-1 p-0.5 border border-cyan-950/40">
                  <div 
                    className="bg-gradient-to-r bg-cyan-500 h-full rounded transition-all duration-500 shadow-cyan"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
