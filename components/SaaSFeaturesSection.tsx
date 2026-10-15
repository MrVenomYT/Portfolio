'use client';

import React, { useEffect, useRef } from 'react';

interface Feature {
  title: string;
  description: string;
  iconSvg: string;
}

const featuresData: Feature[] = [
  {
    title: "Team Sync & Collab",
    description: "Real-time synchronization across all team members with instant updates and presence indicators.",
    iconSvg: `<svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>`,
  },
  {
    title: "Smart Automations",
    description: "Build robust event-driven workflows with intuitive triggers and zero-latency execution.",
    iconSvg: `<svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>`,
  },
  {
    title: "Advanced Analytics",
    description: "Deep data insights and customizable dashboards to track key performance metrics effortlessly.",
    iconSvg: `<svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>`,
  },
  {
    title: "Cloud Storage",
    description: "Enterprise-grade scalable storage with automated backups and 99.999% uptime guarantee.",
    iconSvg: `<svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 15a4 4 0 004 4h10a4 4 0 004-4M7 10l5-5 5 5M12 15V3"/></svg>`,
  },
  {
    title: "Bank-Grade Security",
    description: "End-to-end encryption, SOC2 compliance, and advanced threat detection to secure your assets.",
    iconSvg: `<svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>`,
  },
  {
    title: "Developer APIs",
    description: "Extensive REST and GraphQL APIs with comprehensive SDKs for seamless integrations.",
    iconSvg: `<svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>`,
  },
];

export default function SaaSFeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const drawLines = () => {
      if (!containerRef.current || !svgRef.current) return;
      if (window.innerWidth < 1024) {
        svgRef.current.innerHTML = '';
        return;
      }

      const container = containerRef.current;
      const svg = svgRef.current;
      const containerRect = container.getBoundingClientRect();
      const iconBoxes = container.querySelectorAll('.icon-box');

      if (iconBoxes.length !== 6) return;

      const coords: { x: number; y: number }[] = [];
      iconBoxes.forEach((box) => {
        const boxRect = box.getBoundingClientRect();
        coords.push({
          x: boxRect.left + boxRect.width / 2 - containerRect.left,
          y: boxRect.top + boxRect.height / 2 - containerRect.top,
        });
      });

      // Row 1: 0, 1, 2
      // Row 2: 3, 4, 5
      const width = containerRect.width;

      // Row 1 horizontal line: from x=0 through coords[0], coords[1], coords[2] to slightly past coords[2]
      const r1StartX = 0;
      const r1Y = coords[0].y;
      const r1EndX = coords[2].x + 40;

      // Row 2 horizontal line: from coords[3] (or slightly before) through coords[4], coords[5] to width
      const r2StartX = coords[3].x - 40;
      const r2Y = coords[3].y;
      const r2EndX = width;

      let svgContent = '';

      // Row 1 solid line
      svgContent += `<line x1="${r1StartX}" y1="${r1Y}" x2="${r1EndX}" y2="${r1Y}" stroke="#c7d2fe" stroke-width="2" fill="none" />`;

      // Row 2 solid line
      svgContent += `<line x1="${r2StartX}" y1="${r2Y}" x2="${r2EndX}" y2="${r2Y}" stroke="#c7d2fe" stroke-width="2" fill="none" />`;

      // S-curve connecting R1 end (r1EndX, r1Y) to R2 start (r2StartX, r2Y)
      svgContent += `<path d="M ${r1EndX} ${r1Y} C ${r1EndX + 80} ${r1Y}, ${r2StartX - 80} ${r2Y}, ${r2StartX} ${r2Y}" stroke="#c7d2fe" stroke-width="2" fill="none" stroke-dasharray="6 6" />`;

      // Decorative dots halfway between cards on row 1 and row 2
      // Between card 0 and 1
      const dot1x = (coords[0].x + coords[1].x) / 2;
      const dot1y = coords[0].y;
      svgContent += `<circle cx="${dot1x}" cy="${dot1y}" r="4" fill="#818cf8" />`;
      svgContent += `<circle cx="${dot1x}" cy="${dot1y}" r="8" stroke="#818cf8" stroke-width="2" fill="none" opacity="0.5" />`;

      // Between card 1 and 2
      const dot2x = (coords[1].x + coords[2].x) / 2;
      const dot2y = coords[1].y;
      svgContent += `<circle cx="${dot2x}" cy="${dot2y}" r="4" fill="#818cf8" />`;

      // Between card 3 and 4
      const dot3x = (coords[3].x + coords[4].x) / 2;
      const dot3y = coords[3].y;
      svgContent += `<circle cx="${dot3x}" cy="${dot3y}" r="4" fill="#818cf8" />`;
      svgContent += `<circle cx="${dot3x}" cy="${dot3y}" r="8" stroke="#818cf8" stroke-width="2" fill="none" opacity="0.5" />`;

      // Between card 4 and 5
      const dot4x = (coords[4].x + coords[5].x) / 2;
      const dot4y = coords[4].y;
      svgContent += `<circle cx="${dot4x}" cy="${dot4y}" r="4" fill="#818cf8" />`;

      svg.innerHTML = svgContent;
    };

    drawLines();
    const handleResize = () => {
      requestAnimationFrame(drawLines);
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('load', drawLines);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('load', drawLines);
    };
  }, []);

  return (
    <section className="min-h-screen flex flex-col justify-center py-24 lg:py-32 bg-gradient-to-br from-[#F8F9FE] to-[#F0F3FF] overflow-hidden relative font-['Plus_Jakarta_Sans',sans-serif] text-gray-900 antialiased">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top Left */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-indigo-400/10 rounded-full blur-2xl animate-float"></div>
        <div className="absolute top-24 left-32 w-12 h-12 bg-purple-400/20 rounded-full blur-xl animate-float-delayed"></div>

        {/* Top Right */}
        <div className="absolute top-16 right-16 w-64 h-64 bg-blue-400/10 rounded-[3rem] blur-3xl rotate-12 animate-float"></div>
        <div className="absolute top-36 right-48 w-20 h-20 bg-indigo-300/20 rounded-2xl backdrop-blur-sm rotate-25 animate-float-delayed"></div>

        {/* Bottom Left */}
        <div className="absolute bottom-20 left-20 w-64 h-64 border border-indigo-200/40 rounded-full -rotate-45 opacity-60 animate-float-delayed"></div>

        {/* Bottom Right */}
        <div className="absolute bottom-16 right-24 w-40 h-40 bg-purple-400/10 rounded-full blur-2xl animate-float"></div>
      </div>

      {/* Inner Wrapper */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full" ref={containerRef}>
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-24">
          <span className="text-xl font-bold text-indigo-600 uppercase tracking-wide">Our Features</span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#4338ca] mt-6 mb-6">
            Powerful Integrations
          </h2>
          <p className="text-lg md:text-xl text-gray-500 leading-relaxed">
            Everything you need to scale your workflows, automate repetitive tasks, and connect your favorite tools seamlessly.
          </p>
        </div>

        {/* Features Grid & SVG Connecting Lines Layer */}
        <div className="relative z-10">
          {/* SVG Connecting Lines Layer */}
          <svg
            ref={svgRef}
            className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block"
            style={{ overflow: 'visible', zIndex: 0 }}
          ></svg>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 relative z-10">
            {featuresData.map((feat, index) => (
              <div
                key={index}
                className="feature-card bg-white p-8 rounded-3xl border border-white/60 flex items-center gap-6 group transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-10px_rgba(99,102,241,0.15)]"
              >
                {/* Icon Box */}
                <div className="icon-box w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center shrink-0 text-white shadow-[0_8px_24px_-6px_rgba(99,102,241,0.6)] transition-transform duration-300 group-hover:scale-110">
                  <div dangerouslySetInnerHTML={{ __html: feat.iconSvg }} />
                </div>
                {/* Card Content */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1.5">{feat.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{feat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
