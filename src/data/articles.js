import { Cpu, Radio, Terminal, Award, BookOpen, Layers, Settings, Server, Zap, Compass, Eye, Video, Smartphone, MapPin, Network } from 'lucide-react';

export const articles = [
  {
    id: 'iot-access-control',
    title: 'Server-Based IoT Access Control: A Low-Latency MQTT Architecture',
    category: 'FIRMWARE & IoT',
    tag: 'FIRMWARE',
    icon: Cpu,
    date: 'Dec 12, 2025',
    readTime: '6 MIN READ',
    author: 'Darshan K',
    excerpt: 'How I engineered a secure asset deployment stack using ESP32, optimized SPI flash transactions, and encrypted MQTT protocols to reduce validation latency by 18%.',
    featured: true,
    image: 'iot_access.png',
    github: 'https://github.com/31darsh/My_Protfolio',
    content: `
<p>In modern industrial and smart building access systems, speed and security are often in a direct tug-of-war. For my project, the <strong>Server-Based IoT Access Control System</strong>, the goal was to build a system that verified card credentials against an encrypted database and logged events with minimal delay.</p>

<h2>The Challenge: Memory and Network Latency</h2>
<p>Working with the ESP32 microcontroller, standard Wi-Fi polling and heavy encryption schemes can introduce noticeable delays. If verification takes more than 500 milliseconds, users perceive it as sluggish. I needed a design that achieved less than 200ms latency, while keeping communication packets secure.</p>

<blockquote>
  "In embedded systems, optimization isn't just about saving bytes; it directly affects the real-world responsiveness and user experience of hardware."
</blockquote>

<h2>Architecture Optimization</h2>
<p>To reduce latency, I tackled three main areas: hardware interface speed, packet structuring, and thread scheduling.</p>

<h3>1. SPI DMA Optimization</h3>
<p>The ESP32 communicates with the RFID reader/secure element via the Serial Peripheral Interface (SPI). By configuring Direct Memory Access (DMA), the CPU was freed from waiting for transaction bytes. The SPI clock frequency was boosted to 40 MHz with custom bus timing registers, accelerating local peripheral reads by 15%.</p>

<h3>2. Encrypted MQTT Telemetry</h3>
<p>Instead of bulky HTTP requests, I utilized the **MQTT protocol** (message queuing telemetry transport). MQTT maintains a persistent, lightweight TCP connection, significantly reducing handshake overhead. The access payload was serialized using a compact binary schema (MsgPack) and encrypted using lightweight AES-128-GCM to ensure confidentiality and integrity without exhausting the MCU's hardware accelerators.</p>

<h3>3. RTOS Thread Priorities</h3>
<p>Using **FreeRTOS**, the application tasks were segregated. The high-speed RFID scanning task was assigned a higher priority, while the MQTT publishing and logging tasks were pushed to a background task with a queue buffer. This prevented network latency from blocking the physical badge-in action.</p>

<h2>Results</h2>
<p>The optimizations proved highly successful. The physical verification latency dropped by **18%**, stabilizing around **160ms** from badge scan to relay activation. The telemetry logs verified error-free data ingestion across cellular and Wi-Fi networks under test stress conditions.</p>
    `
  },
  {
    id: 'electric-cycle-telemetry',
    title: 'Electric Cycle Management: Sensor Ingestion & GSM Telemetry Validation',
    category: 'FIRMWARE & IoT',
    tag: 'FIRMWARE',
    icon: Settings,
    date: 'May 20, 2024',
    readTime: '5 MIN READ',
    author: 'Darshan K',
    excerpt: 'How I programmed sensor ingestion logic and validated cellular network telemetry for an electric cycle management project using AT commands and MQTT protocols.',
    featured: false,
    image: 'electric_cycle.png',
    github: 'https://github.com/31darsh/My_Protfolio',
    content: `
<p>During my internship at PECSOL Technologies, I contributed to an **electric cycle management system**. The objective was to design a robust sensor ingestion pipeline and test onboard cellular modules to transmit telemetry logs (speed, throttle inputs, battery state-of-charge, battery temperature) to a cloud broker.</p>

<h2>Sensor Data Ingestion Pipeline</h2>
<p>The electric cycle features multiple sensors, including hall-effect speed sensors, analog throttle potentiometers, and I2C-based battery management system (BMS) metrics. I programmed the ingestion logic in Embedded C:</p>
<ul class="bullet-list">
  <li><strong>ADC Calibration:</strong> To prevent throttle drift, I implemented moving-average filtering algorithms on the analog inputs.</li>
  <li><strong>Interrupt-Driven Pulse Counting:</strong> Wheel speed was computed using hardware external interrupts linked to hall-effect sensor pulses, avoiding CPU blocking.</li>
  <li><strong>BMS Interfacing:</strong> Wrote I2C peripheral drivers to read cell temperatures and voltages periodically.</li>
</ul>

<h2>GSM/Cellular Telemetry Testing</h2>
<p>To support wireless connectivity, the cycle utilized a cellular module. I was responsible for writing cellular modem test scripts and validation flows:</p>
<h3>1. AT Command Modulating</h3>
<p>Wrote UART-based drivers to configure network states, APNs, and socket bindings using standard AT Commands (e.g. <code>AT+CGATT</code>, <code>AT+CIPSTART</code>). Wrote state-machine parsing logic to handle module error responses and initiate auto-reconnects on dropouts.</p>

<h3>2. MQTT Link Validation</h3>
<p>Tested network message payloads published to the cloud broker. Validated MQTT topic mapping and connection stability under simulated signal dropouts, verifying local backup flash queuing when the cellular network was offline.</p>

<h2>Results</h2>
<p>The battery sensor telemetry and throttle filters ran with zero drift. Ingestion validation confirmed accurate battery state transmission over MQTT with a cellular socket success rate exceeding 98% during driving simulation tests.</p>
    `
  },
  {
    id: 'flight-telemetry',
    title: 'Real-Time Flight Telemetry Tracker: Designing Safe Parsers in Bare-Metal C',
    category: 'EMBEDDED SYSTEMS',
    tag: 'EMBEDDED',
    icon: Radio,
    date: 'Oct 04, 2025',
    readTime: '5 MIN READ',
    author: 'Darshan K',
    excerpt: 'How I built an embedded telemetry system handling UART streams and created a custom string-token parser to prevent buffer overruns under high-speed data feeds.',
    featured: false,
    image: 'flight_telemetry.png',
    github: 'https://github.com/31darsh/My_Protfolio',
    content: `
<p>Telemetry parsing is a critical task in aerospace and robotics. A single buffer overflow or unhandled interrupt can crash the microcontroller, bringing down the entire flight system. For the **Flight Telemetry Tracker**, I set out to write a bare-metal parser in Embedded C on an ARM Cortex-M4 (STM32F4) chip.</p>

<h2>Bare-Metal UART Interrupts</h2>
<p>Instead of using standard polling methods which block the main CPU execution loop, I configured the STM32's **USART2 interface** with custom Interrupt Service Routines (ISRs). When a character is received over the UART channel, the hardware triggers an interrupt, prompting the CPU to quickly store the byte into a circular ring buffer.</p>

<pre><code>// UART RX Interrupt Handler Example
void USART2_IRQHandler(void) {
    if (USART2->SR & USART_SR_RXNE) {
        uint8_t byte = (uint8_t)(USART2->DR & 0xFF);
        RingBuffer_Write(&rx_buffer, byte);
    }
}</code></pre>

<h2>Solving Buffer Overrun Vulnerabilities</h2>
<p>Most string tokenizers (like standard <code>strtok</code> in C) modify memory in-place and rely on null-terminators. Under noisy transmission lines, a missing null-terminator can cause the parser to read beyond buffer boundaries, causing a system fault. To solve this, I designed a fixed-buffer string-token parser:</p>
<ul class="bullet-list">
  <li><strong>Bounds Checking:</strong> The parser checks the index boundary on every character, ignoring packets that exceed the pre-allocated telemetry struct size.</li>
  <li><strong>State-Machine Based:</strong> Rather than buffer the entire frame, the parser processes characters stream-by-stream using a state-machine (Header, Payload, Checksum, Footer).</li>
  <li><strong>Checksum Verification:</strong> A lightweight CRC-16 checksum is computed on-the-fly and checked against the package tail.</li>
</ul>

<h2>Achievements</h2>
<p>The parser successfully processed packet feeds at **115200 baud** with zero overflow faults over 24-hour continuous tests. By running on bare-metal rather than an operating system, the telemetry scheduler consumed less than 5% of the STM32F4's internal clock cycles, leaving the rest of the processor resources free for active flight control calculations.</p>
    `
  },
  {
    id: 'pcb-signal-integrity',
    title: 'KiCad High-Speed PCB Layout: Optimizing Trace Geometry for Signal Integrity',
    category: 'HARDWARE DESIGN',
    tag: 'EMBEDDED',
    icon: Layers,
    date: 'Sep 15, 2025',
    readTime: '5 MIN READ',
    author: 'Darshan K',
    excerpt: 'Optimizing trace width, routing paths, and ground plane splits to maintain signal integrity and avoid EMI coupling in microcontroller boards designed in KiCad.',
    featured: false,
    image: 'pcb_design.png',
    github: 'https://github.com/31darsh/My_Protfolio',
    content: `
<p>PCB design is not just about connecting copper traces; at higher clock rates, every trace acts as a transmission line. During my work at TechVoc Finesse, I designed **custom PCB modules** for STM32 microcontrollers, focusing on schematic layout optimizations and signal integrity.</p>

<h2>Ground Plane Routing & Noise Control</h2>
<p>Poor layout designs can introduce electromagnetic interference (EMI) and cross-talk. To mitigate this, my routing strategy in KiCad included:</p>
<ul class="bullet-list">
  <li><strong>Continuous Ground Reference:</strong> Designed a dedicated ground layer directly beneath high-speed signals. Keeping a continuous ground plane minimizes the loop area, preventing return current path impedance loops.</li>
  <li><strong>Decoupling Capacitor Placement:</strong> Positioned decoupling capacitors (0.1µF and 10nF) as close as possible to the STM32's power pins, reducing high-frequency transient noise.</li>
  <li><strong>Differential Pair Routing:</strong> Hand-routed critical high-speed signal lines (like USB/CAN) with matched track lengths and calculated differential trace impedances to prevent reflections.</li>
</ul>

<h2>Lab Validation</h2>
<p>Once prototypes were assembled, I validated signal waveforms using high-bandwidth digital storage oscilloscopes. Oscilloscope probing verified clean, sharp rise times on clock channels and confirmed that decoupling filters minimized power plane voltage ripples under full peripheral load.</p>
    `
  },
  {
    id: 'intel-prototype-debugging',
    title: 'Intel Prototype Debugging: Driver Validation & Waveform Diagnostics',
    category: 'EMBEDDED SYSTEMS',
    tag: 'EMBEDDED',
    icon: Settings,
    date: 'Jan 10, 2025',
    readTime: '4 MIN READ',
    author: 'Darshan K',
    excerpt: 'Isolating hardware performance anomalies and configuring low-level serial drivers on Intel architecture prototypes using logic analyzers and oscilloscopes.',
    featured: false,
    image: 'oscilloscope_bench.png',
    github: 'https://github.com/31darsh/My_Protfolio',
    content: `
<p>At Univision Technology, I worked on **Intel architecture prototypes**, executing hardware-software integration loops to isolate timing bugs and configure low-level peripheral drivers.</p>

<h2>Low-Level Driver Configurations</h2>
<p>My daily tasks involved setting register parameters and validating driver libraries in Embedded C:</p>
<ul class="bullet-list">
  <li><strong>Serial Driver Configurations:</strong> Set up and configured USART, I2C, and SPI serial registers. Adjusted driver interrupt timings to improve device data throughput.</li>
  <li><strong>DMA Ingestion:</strong> Linked peripheral receive channels directly to DMA ring buffers to prevent byte drops during burst transactions.</li>
</ul>

<h2>Hardware-in-the-Loop Debugging</h2>
<p>When the firmware behaved unexpectedly, software debuggers were combined with physical test equipment. I connected digital oscilloscopes and **logic analyzers** directly to the hardware bus channels:</p>
<ul class="bullet-list">
  <li><strong>Bus Timing Analysis:</strong> Captured and decoded serial data frames (SPI, I2C) to verify slave chip addresses and timing constraints.</li>
  <li><strong>Glitch Hunting:</strong> Isolated transient voltage spikes and signal reflections that caused driver task failures, diagnosing PCB impedance issues.</li>
</ul>

<h2>Achievements</h2>
<p>My diagnostic validation loops reduced verification cycles, and driver timing configurations successfully resolved I2C address conflict bugs, boosting peripheral data throughput by 12%.</p>
    `
  },
  {
    id: 'portfolio-redesign',
    title: 'Designing an Editorial Developer Showcase: The Architecture of This Website',
    category: 'WEB SOFTWARE',
    tag: 'WEB CODE',
    icon: Terminal,
    date: 'Jun 12, 2026',
    readTime: '4 MIN READ',
    author: 'Darshan K',
    excerpt: 'A review of the design principles and build configurations behind this React + Vite magazine portfolio. Highlighting asset pipelines, CNAME configurations, and clean UI.',
    featured: false,
    image: 'portfolio_showcase.png',
    github: 'https://github.com/31darsh/My_Protfolio',
    content: `
<p>As an Embedded Engineer, I wanted my portfolio to be different from the typical generic layouts. Following inspiration from editorial platforms like **GatesNotes**, I decided to build a clean, magazine-like blog to document my projects and tech journey.</p>

<h2>Tech Stack Details</h2>
<p>The application is built as a single-page React app served by **Vite** for rapid hot-module reloading and optimized static assets bundling. Styling is written using custom **Vanilla CSS** with variables to maintain custom control over the editorial spacing, typography, and card margins without bloat.</p>

<h2>GitHub Pages Deployment Architecture</h2>
<p>To automate publishing, I set up a custom deployment pipeline in <code>package.json</code> using the <code>gh-pages</code> package. The deployment process follows two automated stages:</p>
<pre><code>"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}</code></pre>
<p>Vite's asset path resolution is adjusted via the <code>base</code> config parameter to map to the subfolder directory <code>/My_Protfolio/</code> on GitHub. When <code>npm run deploy</code> is invoked, Vite builds the production bundle into the <code>/dist</code> directory, and the deploy script automatically commits and pushes it to the <code>gh-pages</code> branch on GitHub.</p>

<h2>Responsive Reading Layouts</h2>
<p>Special care was given to the typographic hierarchy. The title tags use the Lora serif font, which mimics print media. The margins, paragraph width, and blockquote accents adjust dynamically to mobile, tablet, and widescreen viewports using pure CSS media queries, ensuring maximum reading comfort.</p>
    `
  },
  {
    id: 'academic-journey',
    title: 'Academic & Training Journey: Specializing in IoT & Real-Time Systems',
    category: 'EDUCATION & PATHWAY',
    tag: 'JOURNAL',
    icon: Award,
    date: 'May 15, 2026',
    readTime: '3 MIN READ',
    author: 'Darshan K',
    excerpt: 'An editorial chronicle of my master\'s degree studies in IoT & Sensor Systems at Ramaiah Institute of Technology and certifications in Embedded Systems validation.',
    featured: false,
    content: `
<p>My academic foundation blends electronics theory with hands-on labs in microcontrollers, signal conditioning, and wireless networking. This journal tracks the key milestones that shaped my firmware engineering skill sets.</p>

<h2>M.Tech in IoT & Sensor Systems</h2>
<p><strong>M S Ramaiah Institute of Technology, Bengaluru</strong> (2025 – 2027) | <strong>CGPA: 8.86</strong></p>
<p>During my Master's studies, my research and coursework focused directly on advanced communication networks, sensor interfacing, and low-power system designs. Projects included designing sensor nodes for environmental monitoring and programming FreeRTOS tasks to balance battery consumption against transmit power.</p>

<h2>B.E. in Electronics & Communication</h2>
<p><strong>Maharaja Institute of Technology, Mysore</strong> (2020 – 2024) | <strong>CGPA: 7.79</strong></p>
<p>My undergraduate education focused on analog and digital electronics, microprocessor architectures, signal processing, and telecommunication principles. Here, I developed my first Embedded C projects, working with the classic 8051 and PIC microcontrollers before moving to modern 32-bit ARM Cortex processors.</p>

<h2>Professional Certifications</h2>
<p>To complement my academic studies, I completed focused training programs in industry validation workflows:</p>
<ul class="bullet-list">
  <li><strong>Advanced Embedded Systems Validation</strong> (eTech Prowess, Feb 2025): Deep dive into firmware test methodologies, hardware-in-the-loop (HIL) testing, and automated test script design.</li>
  <li><strong>IoT-Network Specialist Professional Certificate</strong> (Skill India, Mar 2026): Focused on network design, cellular modems (LTE-M, NB-IoT), and protocol architectures.</li>
  <li><strong>C Development & Programming Foundations</strong> (Great Learning Academy, Jun 2023): Core training in memory pointers, preprocessor directives, and standard C library programming.</li>
</ul>
    `
  },
  {
    id: 'server-relay-control',
    title: 'Server-Based Relay Control: High-Reliability W5500 & STM32 Architecture',
    category: 'FIRMWARE & IoT',
    tag: 'FIRMWARE',
    icon: Server,
    date: 'Apr 15, 2026',
    readTime: '6 MIN READ',
    author: 'Darshan K',
    excerpt: 'Engineering an industrial-grade relay control board pairing STM32 firmware with W5500 Ethernet, a Node.js TCP daemon, and a custom React web console.',
    featured: false,
    image: 'server_relay_control.png',
    github: 'https://github.com/31darsh/Server_based_Relay_control_W5500',
    content: `
<p>In telemetry and remote controls, Wi-Fi can be unreliable due to RF noise and physical barriers. For the <strong>Server-Based Relay Control System</strong>, I engineered a high-reliability hardware-software interface utilizing the STM32F103 microcontroller, a hardwired W5500 SPI-to-Ethernet controller, a Node.js TCP/HTTP daemon, and an admin web interface.</p>

<h2>Hardware Design & Pin Configuration</h2>
<p>The firmware was written in C using STM32 HAL libraries, targeting the SPI1 interface of the STM32F103 board. Pin mapping was as follows:</p>
<ul class="bullet-list">
  <li><strong>W5500 SPI1 SCK/MISO/MOSI:</strong> <code>PA5</code>, <code>PA6</code>, <code>PA7</code></li>
  <li><strong>W5500 CS (Chip Select):</strong> <code>PA4</code></li>
  <li><strong>W5500 Reset Pin:</strong> <code>PB1</code></li>
  <li><strong>Relay Control Channel 1:</strong> <code>PB5</code> (configured as push-pull output, active high)</li>
</ul>

<h2>Ethernet Controller Integration (W5500)</h2>
<p>The W5500 houses a hardwired TCP/IP stack. I programmed custom drivers to communicate with the chip via SPI DMA at 18 MHz:</p>
<h3>1. Link-State & PHY Ingestion</h3>
<p>Implements a background loop monitoring the PHY register. If a line break or cable disconnect is detected, the device enters a soft-reconnection loop, debouncing the interface registers to avoid packet dropouts.</p>

<h3>2. Socket Buffer Management</h3>
<p>Configured separate 2KB circular buffers for TX/RX packets, establishing a persistent TCP connection to the backend server (port 9000). Keep-alive heartbeats are sent every 5 seconds to notify the central daemon of the device status.</p>

<h2>Backend Node.js & React Dashboard</h2>
<p>The server infrastructure operates a dual-port listener architecture:</p>
<ul class="bullet-list">
  <li><strong>TCP Daemon (Port 9000):</strong> A Node.js raw socket listener that parses incoming binary messages from the STM32, updating device statuses in a thread-safe JSON datastore.</li>
  <li><strong>HTTP API & Static Server (Port 8080):</strong> Exposes REST API endpoints for user authentication (default credentials: <code>admin</code>/<code>admin123</code>) and serves a dashboard to monitor logs and toggle the relay state remotely.</li>
</ul>

<h2>Performance & Verification</h2>
<p>With hardwired Ethernet, the system achieved a sub-millisecond local network response time. Physical relay triggers occurred in under 12ms from clicking the button on the React dashboard. Tested continuously for 72 hours, the connection remained active with zero packet loss.</p>
    `
  },
  {
    id: 'iot-smart-energy-meter',
    title: 'Advanced Smart Energy Meter: 1kHz Waveform Ingestion & Load Disaggregation',
    category: 'FIRMWARE & IoT',
    tag: 'FIRMWARE',
    icon: Zap,
    date: 'Mar 28, 2026',
    readTime: '6 MIN READ',
    author: 'Darshan K',
    excerpt: 'An ESP32 AC Smart Energy Meter capturing real-time telemetry, calculating domestic billing slabs, and executing automatic overcurrent load trips.',
    featured: false,
    image: 'iot_smart_energy_meter.png',
    github: 'https://github.com/31darsh/IoT-Enable-Smart-Energy-Meter',
    content: `
<p>Smart grid monitoring requires real-time accuracy and resilient local safety mechanisms. For the <strong>Advanced AC Smart Energy Meter</strong>, I designed an ESP32-based hardware node integrated with a FastAPI Python server to track parameters and trigger automatic load disconnections on anomalies.</p>

<h2>Dual-Core ESP32 Architecture</h2>
<p>To ensure high-frequency measurements while maintaining cloud connectivity, the firmware splits processing across the ESP32's dual cores using FreeRTOS:</p>
<ul class="bullet-list">
  <li><strong>Core 0 (1kHz RMS Math):</strong> Dedicated to high-speed analog sampling of current and voltage waveforms. Computes Root-Mean-Square (RMS) voltage, current, power factor (PF), and active power ($P = V \times I \times \text{PF}$) in real-time.</li>
  <li><strong>Core 1 (Networking & UI):</strong> Drives the local SPI LCD display and streams telemetry payloads via WebSockets to the Python server. Confirms socket heartbeats every 1 second.</li>
</ul>

<h2>FastAPI Telemetry Daemon</h2>
<p>The backend was built using Python and FastAPI, serving as a real-time data aggregator and event logger:</p>
<ul class="bullet-list">
  <li><strong>WebSocket Relays:</strong> Connects hardware and frontend dashboards. The backend acts as a low-latency conduit, pushing JSON telemetry to clients instantly.</li>
  <li><strong>Data Storage:</strong> Writes parameters to a thread-safe SQLite database and logs events to a local Excel sheet with self-healing checks to recover from sudden power dropouts.</li>
  <li><strong>Billing Slab Logic:</strong> Computes power consumption costs in real-time according to local utility standards (BESCOM slabs).</li>
</ul>

<h2>Offline Simulation & Safety Triggers</h2>
<p>A web-based simulation mode is built into the FastAPI UI, enabling testing without physical AC wiring. Safety thresholds are configured in <code>config.h</code>:</p>
<ul class="bullet-list">
  <li><strong>Overvoltage (OV):</strong> $&gt;265\text{V}$</li>
  <li><strong>Undervoltage (UV):</strong> $&lt;180\text{V}$</li>
  <li><strong>Overcurrent (OC):</strong> $&gt;5\text{A}$</li>
</ul>
<p>When thresholds are crossed, the ESP32's physical relay instantly opens, protecting connected loads from damage.</p>
    `
  },
  {
    id: 'namma-civic-ai',
    title: 'Namma Civic: Bridging Governance and Citizens via Conversational AI',
    category: 'AI & WEB SOFTWARE',
    tag: 'AI',
    icon: Compass,
    date: 'Feb 10, 2026',
    readTime: '7 MIN READ',
    author: 'Darshan K',
    excerpt: 'A React PWA conversational AI agent utilizing Google Gemini 2.0 Flash and Firebase to match citizens with 3000+ government welfare schemes.',
    featured: false,
    image: 'namma_civic_ai.png',
    github: 'https://github.com/31darsh/Namma-Civic',
    content: `
<p>Out of thousands of government welfare schemes, over 70% of eligible citizens in India never apply due to bureaucratic complexity and language barriers. During Hackathon 2026, I built <strong>Namma Civic</strong>, an AI-powered conversational PWA that guides citizens through scheme discovery, eligibility assessment, and application pre-filling.</p>

<h2>Multi-Agent AI Architecture</h2>
<p>Namma Civic operates using a state machine of <strong>8 domain-isolated AI agents</strong> powered by <strong>Google Gemini 2.0 Flash</strong>:</p>
<ul class="bullet-list">
  <li><strong>Housing Agent:</strong> Analyzes eligibility for PMAY Urban and PMAY Gramin housing grants.</li>
  <li><strong>Business Agent:</strong> Guides users on PMEGP subsidies and PM Mudra micro-loans.</li>
  <li><strong>Jobs & Education Agents:</strong> Matches profiles to national scholarship portals (NSP) and skill trainings.</li>
  <li><strong>Family & Health Agents:</strong> Checks eligibility for PMJAY health insurance and pension schemes.</li>
</ul>
<p>Each agent maintains user session context and scores eligibility match percentages dynamically based on age, income, caste, and occupation.</p>

<h2>Tech Stack & Offline-First Design</h2>
<p>The application is built for maximum accessibility in low-connectivity areas:</p>
<ul class="bullet-list">
  <li><strong>Frontend:</strong> React 19 and Vite 8 with a mobile-first responsive layout matching native app guidelines.</li>
  <li><strong>Database & Auth:</strong> Firebase Firestore stores user profiles and applications anonymously. LocalStorage is utilized as a primary cache, allowing the app to load instantly and run offline queries.</li>
  <li><strong>Integrations:</strong> Features DigiLocker deep-linking in pre-fill screens and direct apply routes to official GOI portals.</li>
</ul>

<h2>Impact & Hackathon Metrics</h2>
<p>The JS bundle size was compressed to <strong>221 KB</strong> (gzip), enabling quick load times over 2G networks. The AI reasoning latency averaged 1.8 seconds. Namma Civic demonstrates how conversational AI can democratize access to public digital infrastructure, turning complex government processes into simple chat flows.</p>
    `
  },
  {
    id: 'faceid-pro-ai',
    title: 'FaceID Pro: 100% Browser-Based Biometric Verification with FaceNet',
    category: 'COMPUTER VISION',
    tag: 'AI',
    icon: Eye,
    date: 'Jan 22, 2026',
    readTime: '5 MIN READ',
    author: 'Darshan K',
    excerpt: 'Implementing real-time face detection, 68-point facial landmark alignment, and FaceNet recognition in vanilla JS utilizing face-api.js.',
    featured: false,
    image: 'faceid_pro_ai.png',
    github: 'https://github.com/31darsh/AI-Face-Recognition-System',
    content: `
<p>Traditional biometric systems rely on high-cost cloud computing platforms that introduce privacy risks and network latency. I engineered <strong>FaceID Pro</strong>, a browser-based, client-side identity verification dashboard that executes face detection and recognition locally on device webcams.</p>

<h2>AI Pipeline & Model Architectures</h2>
<p>The app loads three compressed deep learning models via CDN, running them in the browser using TensorFlow.js:</p>
<h3>1. SSD MobileNet V1</h3>
<p>A lightweight Single Shot Multibox Detector optimized for mobile devices, used to detect face locations in the camera frame with high precision.</p>

<h3>2. 68-Point Landmark Model</h3>
<p>Extracts geometric landmarks across the eyebrows, eyes, nose, mouth, and jawline. This geometry is used to align the face, correcting for tilt and head rotation before matching.</p>

<h3>3. FaceNet Embeddings</h3>
<p>A deep convolutional neural network that maps aligned faces into a 128-dimensional vector space. Known vectors are compared against current captures using Euclidean distance calculations.</p>

<h2>Identity Enrollment & Database</h2>
<p>The frontend dashboard features: (1) <strong>Enrollment Portal:</strong> Allows users to capture or upload images, assigning names, access levels, and departments; (2) <strong>Euclidean Matching:</strong> Compares incoming descriptors. A threshold of <code>&lt; 0.50</code> signifies a match; (3) <strong>Local Database:</strong> Encodes and saves face profiles directly into browser LocalStorage, ensuring absolute data privacy.</p>

<h2>Real-Time Diagnostics</h2>
<p>If an unknown face enters the camera frame, FaceID Pro highlights the bounding box in red, logs a snapshot in the alert panel, and plays an audio warning. Processing frames at a debounced rate of 600ms, the system runs smoothly on standard laptops without GPU acceleration, demonstrating highly efficient client-side edge intelligence.</p>
    `
  },
  {
    id: 'ai-hand-gesture',
    title: 'AI Hand Gesture Counter: Real-Time Hand Landmark Tracking',
    category: 'COMPUTER VISION',
    tag: 'AI',
    icon: Video,
    date: 'Dec 18, 2025',
    readTime: '4 MIN READ',
    author: 'Darshan K',
    excerpt: 'Building a real-time finger-counting dashboard using Google MediaPipe Hands tracking 21 key coordinate points.',
    featured: false,
    image: 'ai_hand_gesture.png',
    github: 'https://github.com/31darsh/AI-Hand-Gesture-Control-System',
    content: `
<p>Human-Computer Interaction (HCI) is moving toward touchless gesture interfaces. For the <strong>AI Hand Gesture Counter</strong>, I built an interactive web dashboard that detects and counts fingers in real-time using Google MediaPipe AI libraries.</p>

<h2>Landmark Coordinate Analysis</h2>
<p>MediaPipe Hands detects 21 landmark nodes per hand (joint coordinates in a 3D coordinate space). I wrote detection logic in Vanilla Javascript to process these landmarks:</p>
<ul class="bullet-list">
  <li><strong>Finger Detection:</strong> Evaluates the Y-axis position of each fingertip relative to its corresponding PIP joint. If the tip coordinate is above the joint, the finger is counted as raised.</li>
  <li><strong>Thumb Detection:</strong> Computes coordinate distances along the horizontal X-axis, comparing the thumb tip to the MCP joint to determine if the thumb is extended outward.</li>
</ul>

<h2>Local Server Configurations</h2>
<p>Due to modern browser security policies, camera access is blocked on raw file paths (<code>file://</code>). I structured the app with setup instructions for: (1) VS Code Live Server; (2) Python <code>http.server</code> modules; and (3) Node.js <code>http-server</code> packages, ensuring seamless deployment over local hostnames.</p>

<h2>Achievements</h2>
<p>The app tracks up to two hands simultaneously (supporting up to 10 finger counts). It achieves 30 FPS tracking speeds on standard web browsers without native application wrappers, opening up options for touchless interfaces in medical consoles and smart displays.</p>
    `
  },
  {
    id: 'voice-controlled-robot',
    title: 'Voice Controlled Robot: Embedded Parse Engines & Bluetooth Serial Control',
    category: 'ROBOTICS & EMBEDDED',
    tag: 'EMBEDDED',
    icon: Radio,
    date: 'Aug 20, 2025',
    readTime: '4 MIN READ',
    author: 'Darshan K',
    excerpt: 'Programming a differential drive mobile robot using an ESP32, parsing serial Bluetooth commands, and controlling an L298N motor driver.',
    featured: false,
    image: 'voice_controlled_robot.png',
    github: 'https://github.com/31darsh/Voice_Controlled_Robot',
    content: `
<p>Voice interaction offers intuitive control pathways for mobile robots. For the <strong>Voice Controlled Robot</strong>, I developed a firmware stack in Embedded C++ that allows an ESP32 robot chassis to navigate based on voice commands sent via Bluetooth.</p>

<h2>Firmware Serial Parsing</h2>
<p>The ESP32 uses its built-in Bluetooth Classic radio configured as a Serial Port Profile (SPP) receiver. I wrote a string parsing engine in the main loop:</p>
<ul class="bullet-list">
  <li><strong>Buffer Handling:</strong> Receives character packets asynchronously via Bluetooth UART. Stores them in a char array buffer until a line terminator is encountered.</li>
  <li><strong>Keyword Matching:</strong> Trims and parses the buffer against preset movement commands: <code>"move forward"</code>, <code>"stop"</code>, <code>"turn left"</code>, <code>"turn right"</code>.</li>
</ul>

<h2>Motor Control Interface (L298N)</h2>
<p>Upon detecting a keyword, the ESP32 adjusts GPIO logic levels connected to an L298N dual H-bridge motor driver. It outputs Pulse-Width Modulation (PWM) signals to control speed, ensuring smooth acceleration and deceleration curves for the wheels.</p>
    `
  },
  {
    id: 'smart-robot-control',
    title: 'SmartRobotControl: Dual-Mode Mobile Robot Remote Administration',
    category: 'ROBOTICS & EMBEDDED',
    tag: 'EMBEDDED',
    icon: Smartphone,
    date: 'Jul 30, 2025',
    readTime: '4 MIN READ',
    author: 'Darshan K',
    excerpt: 'An ESP32-based administration panel to control mobile robots in manual or autonomous navigation configurations.',
    featured: false,
    image: 'smart_robot_control.png',
    github: 'https://github.com/31darsh/SmartRobotControl',
    content: `
<p>Modern service and warehouse robots require interfaces to switch between manual overrides and autonomous operation. I created <strong>SmartRobotControl</strong>, a unified administration application that connects to ESP32 robots over local networks.</p>

<h2>Dual Control Modes</h2>
<ul class="bullet-list">
  <li><strong>Manual Mode:</strong> Renders virtual joystick interfaces on a mobile web view, transmitting directional vector payloads over WebSocket/UDP to the robot CPU for immediate movement responses.</li>
  <li><strong>Autonomous Mode:</strong> Uploads coordinate waypoints to the microcontroller. The robot navigates autonomously using ultrasonic sensors and optical encoders, while sending telemetry updates back to the UI.</li>
</ul>

<h2>Diagnostics Dashboard</h2>
<p>The console displays battery voltage charts, sensor distance indicators, and status reports, allowing operators to diagnose driving issues in real-time.</p>
    `
  },
  {
    id: 'caterpillar-asset-tracking',
    title: 'Caterpillar Asset Tracker: Remote Telemetry via GPS & GSM Modems',
    category: 'EMBEDDED SYSTEMS',
    tag: 'EMBEDDED',
    icon: MapPin,
    date: 'May 10, 2025',
    readTime: '5 MIN READ',
    author: 'Darshan K',
    excerpt: 'Developing a rugged industrial tracker utilizing STM32 microcontrollers, GPS positioning chips, and GSM cellular modems.',
    featured: false,
    image: 'caterpillar_asset_tracking.png',
    github: 'https://github.com/31darsh/caterpillar_asset_tracking_system',
    content: `
<p>Monitoring heavy industrial equipment requires rugged hardware and reliable long-range data transmission. For the <strong>Caterpillar Asset Tracking System</strong>, I programmed STM32 firmware to log GPS location coordinates and stream them over cellular networks.</p>

<h2>Embedded GPS & GSM Drivers</h2>
<ul class="bullet-list">
  <li><strong>GPS NMEA Parsing:</strong> Interfaces with a GPS receiver via UART. Implements a parser to extract latitude, longitude, speed, and time metrics from raw NMEA sentences.</li>
  <li><strong>GSM Modem Modulating:</strong> Configures cellular modems via AT commands. Establishes socket connections over mobile networks to publish telemetry to a remote server.</li>
  <li><strong>Power Conservation:</strong> Manages STM32 low-power modes (Stop/Sleep), waking up periodically or upon sensing movement from a built-in accelerometer to conserve battery.</li>
</ul>
    `
  },
  {
    id: '5g-network-slicing',
    title: 'QoS-Aware 5G Network Slicing: Hybrid AHP-TOPSIS & DQN Allocation Engine',
    category: 'TELECOM & NETWORKS',
    tag: '5G CORE',
    icon: Network,
    date: 'Jun 10, 2026',
    readTime: '7 MIN READ',
    author: 'Darshan K',
    excerpt: 'Designing an industrial-grade 5G Network Slice Selection Function (NSSF) decision engine running AHP-TOPSIS multi-criteria models and self-learning DQN agents.',
    featured: false,
    image: '5g_network_slicing.png',
    github: 'https://github.com/31darsh/5G-Network-Slicing-QoS-Decision-Engine',
    content: `
<p>Modern 5G networks must support diverse applications with highly contrasting Quality of Service (QoS) requirements—from ultra-reliable low-latency communications (URLLC) to massive machine-type communications (mMTC) and enhanced mobile broadband (eMBB). For my M.Tech mini-project in Wireless Communication Technologies, I engineered a **QoS-Aware Slice Selection Decision Engine** functioning as a 5G Core Network Slice Selection Function (NSSF) control service.</p>

<h2>Mathematical Foundations: AHP & TOPSIS</h2>
<p>The core selection engine implements a hybrid Multi-Criteria Decision-Making (MCDM) algorithm combining two mathematical workflows:</p>
<h3>1. Analytic Hierarchy Process (AHP)</h3>
<p>AHP calculates the weights of QoS criteria (Throughput, Latency, Packet Loss, Jitter, Cost) dynamically based on the requested 3GPP service class. For example, URLLC prioritizes latency and jitter, while eMBB demands throughput. The engine builds a pairwise comparison matrix and calculates the principal eigenvector. It also verifies the **Consistency Ratio ($CR &lt; 0.1$)** to ensure logical consistency in weighting.</p>

<h3>2. TOPSIS Method</h3>
<p>The Technique for Order of Preference by Similarity to Ideal Solution (TOPSIS) ranks the candidate network slices. It computes the normalized decision matrix, identifies the Positive-Ideal Solution (best slice parameters) and Negative-Ideal Solution (worst slice parameters) in the active state, and ranks candidate slices based on their Euclidean distance to these ideal targets.</p>

<h2>Deep Q-Network (DQN) Reinforcement Learning Agent</h2>
<p>Alongside AHP-TOPSIS, I developed a dependency-free **DQN Reinforcement Learning Agent** using raw **NumPy**. The agent consists of a multi-layer neural network that estimates state-action values ($Q$-values). It takes slice congestion telemetry as input, outputs allocation actions, and learns optimal allocation strategies from reward feedback based on SLA compliance and user satisfaction scores.</p>

<h2>Core Architecture & 5G Lab Integration</h2>
<p>The application is written in Python, featuring a modular core, a FastAPI API gateway, and a glassmorphic HTML5 dashboard displaying telemetry charts:</p>
<ul class="bullet-list">
  <li><strong>FastAPI SBI Gateway:</strong> Serves Service Based Interface REST API endpoints (e.g. <code>/select-slice</code>) for session slice queries.</li>
  <li><strong>Traffic Injector:</strong> A Python client script that simulates traffic from the Access and Mobility Management Function (AMF), injecting random multi-service connection queries to stress-test NSSF selection.</li>
  <li><strong>Core Config Exporters:</strong> Generates configuration templates for open-source 5G cores, mapping selected S-NSSAI slices directly to <strong>Open5GS</strong> (<code>nssf.yaml</code>) and <strong>free5GC</strong> configurations.</li>
</ul>

<h2>Achievements & Performance Metrics</h2>
<p>The NSSF decision gateway handles selection requests in **less than 4.5ms** under simulated peak load conditions. In comparison runs, AHP-TOPSIS consistently maintained SLA requirements with zero latency violations, while the DQN agent learned to balance traffic loads across virtual slices, lowering congestion dropouts by 14% compared to standard static mapping algorithms.</p>
`
  }
];

export const bookshelf = [
  {
    title: 'The C Programming Language',
    author: 'Brian W. Kernighan & Dennis M. Ritchie',
    category: 'CORE SOFTWARE',
    review: 'The absolute bible for C programmers. It teaches you how to write compact, readable, and highly optimized code, which is crucial when working with limited microcontroller RAM.',
    link: 'https://archive.org/details/TheCProgrammingLanguageSecondEdition'
  },
  {
    title: 'Making Embedded Systems',
    author: 'Elecia White',
    category: 'FIRMWARE PATTERNS',
    review: 'An outstanding book covering embedded software design patterns, sensor integration, battery optimization, and diagnostic design. It bridges the gap between basic coding and professional systems architecture.',
    link: 'https://www.oreilly.com/library/view/making-embedded-systems/9781449308889/'
  },
  {
    title: 'STM32 Microcontroller Reference Manual (RM0090)',
    author: 'STMicroelectronics',
    category: 'HARDWARE SPECS',
    review: 'Not a traditional book, but a 1700-page manual that is on my desk daily. Essential for understanding register maps, DMA channel configurations, interrupt vectors, and clock trees for STM32F4 chips.',
    link: 'https://www.st.com/resource/en/reference_manual/rm0090-stm32f405415-stm32f407417-and-stm32f427437-advanced-armbased-32bit-mcus-stmicroelectronics.pdf'
  }
];
