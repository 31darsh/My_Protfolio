import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Cpu, Play } from 'lucide-react';

export default function BootScreen({ onBootComplete }) {
  const [logs, setLogs] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [progress, setProgress] = useState(0);
  const [booted, setBooted] = useState(false);
  const logEndRef = useRef(null);

  const bootSequence = [
    { text: 'Initializing SYSTEM BOOT SEQUENCE v2.0.4...', delay: 100, type: 'info' },
    { text: 'CPU: ARM Cortex-M4 (STM32F407VGT6) @ 168 MHz ... OK', delay: 200, type: 'success' },
    { text: 'Core Voltage: 1.2V | Internal Flash: 1024 KB ... OK', delay: 150, type: 'success' },
    { text: 'SRAM: 192 KB System RAM allocated ... OK', delay: 100, type: 'success' },
    { text: 'System Clock Configuration: HSE (8MHz) -> PLL -> 168MHz ... Stable', delay: 250, type: 'info' },
    { text: '==================================================', delay: 50, type: 'muted' },
    { text: 'Configuring GPIO Port A, B, C, D registers...', delay: 150, type: 'info' },
    { text: 'SPI1 Bus Speed 42.0 Mbps, Host Mode ... Configured', delay: 200, type: 'success' },
    { text: 'I2C1 Bus Standard Mode (100 kHz), Address 0x3C ... Initialized', delay: 250, type: 'success' },
    { text: 'USART2 Baud Rate 115200 bps, 8-N-1 ... Opened', delay: 150, type: 'success' },
    { text: 'CAN Bus active (250 kbps) ... Channel 1 Enabled', delay: 300, type: 'info' },
    { text: '==================================================', delay: 50, type: 'muted' },
    { text: 'Scanning external peripherals on I2C bus...', delay: 200, type: 'info' },
    { text: 'Device found: OLED SSD1306 at [0x3C]', delay: 100, type: 'success' },
    { text: 'Device found: Temp Sensor BMP280 at [0x76]', delay: 150, type: 'success' },
    { text: 'Device found: Accelerometer MPU6050 at [0x68]', delay: 120, type: 'success' },
    { text: 'Reading calibration coefficients... Verification success', delay: 200, type: 'success' },
    { text: '==================================================', delay: 50, type: 'muted' },
    { text: 'Starting FreeRTOS Kernel Scheduler...', delay: 150, type: 'info' },
    { text: 'Task "Telemetry_Task" created (Priority: 3, Stack: 512 words)', delay: 100, type: 'info' },
    { text: 'Task "Sensor_Reader" created (Priority: 2, Stack: 256 words)', delay: 80, type: 'info' },
    { text: 'Task "MQTT_Handler" created (Priority: 4, Stack: 1024 words)', delay: 120, type: 'info' },
    { text: 'Scheduler initiated. Preemption ENABLED. Tick rate 1000 Hz.', delay: 200, type: 'success' },
    { text: '==================================================', delay: 50, type: 'muted' },
    { text: 'Connecting to network module via AT Commands (ESP32)...', delay: 350, type: 'info' },
    { text: 'Network status: Connected. IP obtained: 192.168.1.104', delay: 200, type: 'success' },
    { text: 'Connecting to MQTT Broker broker.emqx.io:1883...', delay: 400, type: 'info' },
    { text: 'MQTT Handshake complete. Subscribing to "darshan/portfolio/telemetry"...', delay: 300, type: 'success' },
    { text: '==================================================', delay: 50, type: 'muted' },
    { text: 'Fetching project repository databases: github.com/31darsh/My_Protfolio ...', delay: 350, type: 'info' },
    { text: 'Loading portfolio graphics, style systems, and credentials...', delay: 300, type: 'info' },
    { text: 'Integrity Check: sha256 checksum MATCHED.', delay: 150, type: 'success' },
    { text: 'System Boot Completed Successfully.', delay: 100, type: 'success' },
    { text: 'READY. Firmware v2.0.4 initialized.', delay: 100, type: 'success' },
  ];

  useEffect(() => {
    if (currentLine < bootSequence.length) {
      const timer = setTimeout(() => {
        setLogs((prev) => [...prev, bootSequence[currentLine]]);
        setCurrentLine((prev) => prev + 1);
        setProgress(Math.round(((currentLine + 1) / bootSequence.length) * 100));
      }, bootSequence[currentLine].delay);
      return () => clearTimeout(timer);
    } else {
      setBooted(true);
    }
  }, [currentLine]);

  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const handleSkip = () => {
    onBootComplete();
  };

  const getLogClass = (type) => {
    switch (type) {
      case 'success':
        return 'text-green-500 text-glow-green';
      case 'error':
        return 'text-red-500';
      case 'muted':
        return 'text-slate-600';
      case 'info':
      default:
        return 'text-cyan-400 text-glow-cyan';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#02050b] flex flex-col font-mono text-xs select-none">
      {/* Top Banner Bar */}
      <div className="bg-[#090e1a] border-b border-cyan-950 px-4 py-2 flex items-center justify-between text-slate-500 font-sans">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-cyan-500 animate-pulse" />
          <span className="font-semibold text-xs tracking-wider text-cyan-400">DARSHAN_K_FIRMWARE v2.0.4</span>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span>BAUD_RATE: 115200</span>
          <span>TEMP: 32.4°C</span>
          <button 
            onClick={handleSkip} 
            className="px-2 py-0.5 border border-cyan-700 hover:border-cyan-400 hover:text-cyan-400 transition-all rounded text-[10px]"
          >
            SKIP BOOT [ESC]
          </button>
        </div>
      </div>

      {/* Terminal Viewport */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col gap-1.5 custom-scroll">
        <div className="text-slate-500 mb-2">
          AMI BIOS (C) 2026. ALL RIGHTS RESERVED.<br />
          M.TECH IoT & Sensor Systems, Ramaiah Institute of Technology
        </div>
        
        {logs.map((log, index) => (
          <div key={index} className="flex gap-2 leading-relaxed">
            <span className="text-slate-600">[{new Date().toLocaleTimeString()}]</span>
            <span className={getLogClass(log.type)}>
              {log.type === 'success' ? '✓ ' : log.type === 'error' ? '✗ ' : '> '}
              {log.text}
            </span>
          </div>
        ))}
        <div ref={logEndRef} />
      </div>

      {/* Progress & Bottom Bar */}
      <div className="bg-[#050914] border-t border-cyan-950 p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Loading Progress */}
        <div className="flex items-center gap-4 w-full md:w-2/3">
          <span className="text-cyan-500 min-w-[32px] text-right">{progress}%</span>
          <div className="flex-1 bg-slate-900 border border-cyan-950 h-3 rounded-full overflow-hidden p-0.5">
            <div 
              className="bg-cyan-500 h-full rounded-full transition-all duration-100 ease-out shadow-cyan"
              style={{ width: `${progress}%`, boxShadow: '0 0 8px #00f0ff' }}
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="w-full md:w-auto flex justify-end">
          {booted ? (
            <button
              onClick={handleSkip}
              className="w-full md:w-auto px-6 py-2.5 bg-green-500/20 text-green-400 border border-green-500 rounded font-sans font-bold hover:bg-green-500 hover:text-black transition-all flex items-center justify-center gap-2 cursor-pointer text-glow-green"
              style={{ boxShadow: '0 0 15px rgba(0,255,102,0.3)' }}
            >
              <Play className="w-4 h-4 fill-current" />
              RUN APPLICATION [ENTER]
            </button>
          ) : (
            <div className="flex items-center gap-2 text-slate-500 text-xs animate-pulse font-sans">
              <Terminal className="w-4 h-4 text-cyan-500" />
              <span>INITIALIZING PERIPHERALS...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
