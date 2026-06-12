import React from 'react';
import { Download, ExternalLink, Mail, Phone, MapPin } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export default function AboutSection() {
  return (
    <section id="about" className="border-t border-slate-200 pt-12 pb-6">
      <div className="flex flex-col gap-8">
        <h3 className="font-tech text-sm font-extrabold uppercase tracking-widest text-slate-800 border-b border-slate-200 pb-3">
          Profile & Biography
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Profile Image & Contact details */}
          <div className="md:col-span-4 flex flex-col gap-6 select-none">
            <div className="profile-card">
              <div className="w-32 h-32 md:w-full md:h-auto md:max-h-[300px] rounded overflow-hidden border border-slate-200">
                <img 
                  src={`${import.meta.env.BASE_URL}profile.png`} 
                  alt="Darshan K" 
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>

            {/* Quick stats / contacts */}
            <div className="bg-white border border-slate-200 p-6 rounded flex flex-col gap-3 font-mono text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-teal-600" />
                <span>Bengaluru, India - 560104</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-600" />
                <a href="mailto:darshank9036@gmail.com" className="hover:text-teal-800 transition-colors">
                  darshank9036@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-600" />
                <a href="tel:+918861457997" className="hover:text-teal-800 transition-colors">
                  +91 8861457997
                </a>
              </div>
            </div>
          </div>

          {/* Detailed Biography narrative */}
          <div className="md:col-span-8 flex flex-col gap-6">
            <h4 className="title-serif text-2xl font-bold">About Darshan K</h4>
            <p className="text-editorial text-sm md:text-base leading-relaxed">
              I am an Embedded Systems & Firmware Engineer with a strong academic background and more than two years of project and internship experience designing low-level firmware pipelines and custom PCB layouts. My engineering design philosophy centers on writing optimized, bounds-checked C code that communicates securely over real-time interfaces (SPI, I2C, UART) and IoT telemetry networks (MQTT).
            </p>
            <p className="text-editorial text-sm md:text-base leading-relaxed">
              Currently, I am pursuing my M.Tech in Internet of Things (IoT) & Sensor Systems at the **M S Ramaiah Institute of Technology** in Bengaluru. My academic research focuses on integrating smart hardware components, optimizing DMA channels on ARM cores, and developing FreeRTOS tasks to support high-efficiency data logging.
            </p>

            {/* Academic highlights list */}
            <div className="flex flex-col gap-4 bg-white border border-slate-200 p-6 rounded">
              <h5 className="title-sans text-xs font-extrabold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2 mb-2 select-none">
                Academic Qualifications
              </h5>
              <div className="flex flex-col gap-3">
                <div>
                  <h6 className="font-sans text-xs font-bold text-slate-800">M.Tech in IoT & Sensor Systems</h6>
                  <p className="text-xs text-slate-500 font-sans mt-0.5">M S Ramaiah Institute of Technology | 2025 – 2027 | <strong>CGPA: 8.86</strong></p>
                </div>
                <div>
                  <h6 className="font-sans text-xs font-bold text-slate-800">B.E. in Electronics & Communication</h6>
                  <p className="text-xs text-slate-500 font-sans mt-0.5">Maharaja Institute of Technology, Mysore | 2020 – 2024 | <strong>CGPA: 7.79</strong></p>
                </div>
              </div>
            </div>

            {/* Social action buttons */}
            <div className="flex flex-wrap gap-3 mt-2 select-none">
              <a 
                href={`${import.meta.env.BASE_URL}Darshan_K_Resume_Signify.pdf`}
                download="Darshan_K_Resume.pdf"
                className="btn-editorial btn-editorial-brand"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </a>
              <a 
                href="https://www.linkedin.com/in/darshank123/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-editorial"
              >
                <LinkedinIcon className="w-4 h-4" />
                LinkedIn
              </a>
              <a 
                href="https://github.com/31darsh" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-editorial"
              >
                <GithubIcon className="w-4 h-4" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
