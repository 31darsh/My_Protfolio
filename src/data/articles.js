import { Cpu, Radio, Terminal, Award, BookOpen } from 'lucide-react';

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
    image: 'iot_featured.jpg',
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
