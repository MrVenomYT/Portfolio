'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Layers, Sparkles, Compass, CheckCircle2, TrendingUp, Info } from 'lucide-react';

interface RadarAxis {
  axis: string;
  value: number; // 0 to 100
  benchmark: number;
  highlight: string;
  category: string;
}

interface DomainPreset {
  id: string;
  name: string;
  subtitle: string;
  axes: RadarAxis[];
}

const presets: DomainPreset[] = [
  {
    id: 'full-profile',
    name: 'Comprehensive Engineering',
    subtitle: 'Holistic cross-discipline competency mapping',
    axes: [
      { axis: 'React & Next.js', value: 96, benchmark: 80, highlight: 'App Router, Hooks, SSR, Performance', category: 'MERN' },
      { axis: 'Node & Express', value: 94, benchmark: 75, highlight: 'REST APIs, Middleware, Async, JWT', category: 'MERN' },
      { axis: 'MongoDB & Data', value: 90, benchmark: 70, highlight: 'Aggregations, Schemas, Mongoose, Redis', category: 'Database' },
      { axis: 'Discord.js & Bots', value: 93, benchmark: 65, highlight: 'v14, WebSockets, Sharding, Audio', category: 'Bots' },
      { axis: 'DevOps & CI/CD', value: 87, benchmark: 72, highlight: 'Vercel, Render, GitHub Actions, Docker', category: 'DevOps' },
      { axis: 'Python Automation', value: 88, benchmark: 68, highlight: 'Web Scraping, BeautifulSoup, Scripts', category: 'Automation' },
      { axis: 'UI/UX & CSS/D3', value: 95, benchmark: 78, highlight: 'Tailwind, Responsive, Animations, D3 Charts', category: 'Frontend' },
    ],
  },
  {
    id: 'mern',
    name: 'MERN Stack Domain',
    subtitle: 'Full-Stack JavaScript & NoSQL Architecture',
    axes: [
      { axis: 'React.js Component Arch', value: 98, benchmark: 82, highlight: 'Custom Hooks, Context, Suspense', category: 'MERN' },
      { axis: 'Node.js Runtime', value: 95, benchmark: 78, highlight: 'Event Loop, Cluster, Buffers, Streams', category: 'MERN' },
      { axis: 'Express.js Framework', value: 94, benchmark: 75, highlight: 'Route Controllers, Error Handlers', category: 'MERN' },
      { axis: 'MongoDB Aggregations', value: 92, benchmark: 70, highlight: 'Pipelines, Indexing, Replica Sets', category: 'MERN' },
      { axis: 'REST & GraphQL APIs', value: 93, benchmark: 80, highlight: 'OpenAPI, JWT Authentication, CORS', category: 'MERN' },
      { axis: 'Next.js Fullstack', value: 91, benchmark: 75, highlight: 'Server Actions, ISR, Route Handlers', category: 'MERN' },
    ],
  },
  {
    id: 'bots',
    name: 'Discord & Bot Engineering',
    subtitle: 'Event-Driven Real-Time Automation & WebSockets',
    axes: [
      { axis: 'Discord.js v14', value: 95, benchmark: 65, highlight: 'Slash Commands, Modals, Autocomplete', category: 'Bots' },
      { axis: 'WebSockets & Realtime', value: 92, benchmark: 70, highlight: 'Gateway Events, Socket.io, Heartbeats', category: 'Bots' },
      { axis: 'OAuth2 & Web Dashboard', value: 90, benchmark: 68, highlight: 'Guild Perms, Express Sessions, Token Refresh', category: 'Bots' },
      { axis: 'Audio Streaming (FFmpeg)', value: 88, benchmark: 60, highlight: 'Voice Connections, Queue Systems, Spotify', category: 'Bots' },
      { axis: 'SQLite & Quick.db', value: 89, benchmark: 65, highlight: 'Server Configs, Mod Logs, Transcripts', category: 'Bots' },
      { axis: '24/7 Hosting & Process Mgr', value: 94, benchmark: 72, highlight: 'PM2, Uptime Monitoring, Webhooks', category: 'Bots' },
    ],
  },
  {
    id: 'devops',
    name: 'DevOps & Cloud Systems',
    subtitle: 'Deployment Pipelines, Hosting & Observability',
    axes: [
      { axis: 'Git & Version Control', value: 95, benchmark: 82, highlight: 'Branching, Merge Strategies, Rebasing', category: 'DevOps' },
      { axis: 'Vercel & Next.js Edge', value: 96, benchmark: 75, highlight: 'Edge Middleware, Analytics, Serverless', category: 'DevOps' },
      { axis: 'Render & Node Hosting', value: 90, benchmark: 70, highlight: 'Web Services, Cron Jobs, Env Secrets', category: 'DevOps' },
      { axis: 'CI/CD & GitHub Actions', value: 86, benchmark: 68, highlight: 'Automated Test Suites, Lint & Deploy', category: 'DevOps' },
      { axis: 'Cloudflare & DNS', value: 88, benchmark: 70, highlight: 'SSL/TLS, CDN Caching, DDoS Protection', category: 'DevOps' },
      { axis: 'API Security & JWT', value: 92, benchmark: 75, highlight: 'Rate Limiting, Helmet, Token Expiry', category: 'DevOps' },
    ],
  },
];

export default function D3RadarChart() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activePreset, setActivePreset] = useState<DomainPreset>(presets[0]);
  const [showBenchmark, setShowBenchmark] = useState(true);
  const [hoveredAxis, setHoveredAxis] = useState<RadarAxis | null>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const data = activePreset.axes;
    const totalAxes = data.length;
    const width = 480;
    const height = 440;
    const margin = 50;
    const radius = Math.min(width, height) / 2 - margin;
    const angleSlice = (Math.PI * 2) / totalAxes;

    // Clear previous elements
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3
      .select(svgRef.current)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('width', '100%')
      .attr('height', '100%')
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    // Scale
    const rScale = d3.scaleLinear().range([0, radius]).domain([0, 100]);

    // Circular Grid Levels (20%, 40%, 60%, 80%, 100%)
    const levels = 5;
    const gridG = svg.append('g').attr('class', 'grid-levels');

    for (let j = 0; j < levels; j++) {
      const levelFactor = radius * ((j + 1) / levels);
      
      // Draw polygon/circle grid line
      gridG
        .append('circle')
        .attr('r', levelFactor)
        .attr('fill', 'none')
        .attr('stroke', '#27272a')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', j === levels - 1 ? 'none' : '3,3');

      // Level text label (20%, 40%, etc)
      gridG
        .append('text')
        .attr('x', 4)
        .attr('y', -levelFactor + 12)
        .attr('fill', '#71717a')
        .attr('font-size', '10px')
        .attr('font-family', 'Poppins, sans-serif')
        .text(`${((j + 1) * 20)}%`);
    }

    // Axes lines
    const axisG = svg.selectAll('.axis').data(data).enter().append('g').attr('class', 'axis');

    axisG
      .append('line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', (_d, i) => rScale(100) * Math.cos(angleSlice * i - Math.PI / 2))
      .attr('y2', (_d, i) => rScale(100) * Math.sin(angleSlice * i - Math.PI / 2))
      .attr('stroke', '#333338')
      .attr('stroke-width', 1.2);

    // Axis Text Labels
    axisG
      .append('text')
      .attr('class', 'legend')
      .attr('font-size', '11.5px')
      .attr('font-family', 'Poppins, sans-serif')
      .attr('font-weight', '600')
      .attr('text-anchor', (_d, i) => {
        const angle = angleSlice * i - Math.PI / 2;
        const x = Math.cos(angle);
        if (Math.abs(x) < 0.1) return 'middle';
        return x > 0 ? 'start' : 'end';
      })
      .attr('dy', (_d, i) => {
        const angle = angleSlice * i - Math.PI / 2;
        const y = Math.sin(angle);
        return y < -0.5 ? '-0.3em' : y > 0.5 ? '1em' : '0.35em';
      })
      .attr('x', (_d, i) => (rScale(100) + 16) * Math.cos(angleSlice * i - Math.PI / 2))
      .attr('y', (_d, i) => (rScale(100) + 16) * Math.sin(angleSlice * i - Math.PI / 2))
      .attr('fill', (d) => (hoveredAxis?.axis === d.axis ? 'var(--skin-color, #72b626)' : '#e4e4e7'))
      .style('cursor', 'pointer')
      .text((d) => d.axis)
      .on('mouseenter', (_e, d) => setHoveredAxis(d))
      .on('mouseleave', () => setHoveredAxis(null));

    // Radar line function
    const radarLine = d3
      .lineRadial<RadarAxis>()
      .radius((d) => rScale(d.value))
      .angle((_d, i) => i * angleSlice)
      .curve(d3.curveLinearClosed);

    const benchmarkLine = d3
      .lineRadial<RadarAxis>()
      .radius((d) => rScale(d.benchmark))
      .angle((_d, i) => i * angleSlice)
      .curve(d3.curveLinearClosed);

    // Draw Benchmark Polygon if toggled
    if (showBenchmark) {
      svg
        .append('path')
        .datum(data)
        .attr('d', benchmarkLine)
        .attr('fill', 'rgba(100, 116, 139, 0.15)')
        .attr('stroke', '#64748b')
        .attr('stroke-width', 1.5)
        .attr('stroke-dasharray', '4,4')
        .style('opacity', 0)
        .transition()
        .duration(700)
        .style('opacity', 1);
    }

    // Dynamic Skin Color polygon
    const skinColor = getComputedStyle(document.documentElement).getPropertyValue('--skin-color').trim() || '#72b626';

    const path = svg
      .append('path')
      .datum(data)
      .attr('d', radarLine)
      .attr('fill', `${skinColor}33`)
      .attr('stroke', skinColor)
      .attr('stroke-width', 2.5)
      .style('filter', 'drop-shadow(0 0 10px rgba(var(--skin-rgb, 114, 182, 38), 0.5))');

    // Animate path drawing
    path
      .attr('transform', 'scale(0.01)')
      .transition()
      .duration(900)
      .ease(d3.easeCubicOut)
      .attr('transform', 'scale(1)');

    // Vertices / Nodes
    const nodeG = svg.selectAll('.radar-node').data(data).enter().append('g').attr('class', 'radar-node');

    nodeG
      .append('circle')
      .attr('r', 5.5)
      .attr('cx', (d, i) => rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2))
      .attr('cy', (d, i) => rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2))
      .attr('fill', '#ffffff')
      .attr('stroke', skinColor)
      .attr('stroke-width', 2.5)
      .style('cursor', 'pointer')
      .style('transition', 'all 0.2s ease')
      .on('mouseenter', function (_e, d) {
        d3.select(this).attr('r', 8).attr('fill', skinColor);
        setHoveredAxis(d);
      })
      .on('mouseleave', function () {
        d3.select(this).attr('r', 5.5).attr('fill', '#ffffff');
        setHoveredAxis(null);
      });

  }, [activePreset, showBenchmark, hoveredAxis]);

  return (
    <div ref={containerRef} className="w-full bg-[#161616] border border-zinc-800 rounded-2xl p-6 lg:p-8 shadow-2xl relative overflow-hidden">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 pb-6 border-b border-zinc-800/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Compass className="w-5 h-5 text-skin" />
            <h3 className="text-xl font-bold font-poppins text-white">Interactive Radar Proficiency Chart</h3>
          </div>
          <p className="text-xs text-zinc-400 font-sans">{activePreset.subtitle}</p>
        </div>

        {/* Domain Preset Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-zinc-900 rounded-xl border border-zinc-800">
          {presets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => setActivePreset(preset)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-poppins transition-all ${
                activePreset.id === preset.id
                  ? 'bg-skin text-white shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              {preset.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Grid: Chart on Left, Interactive Metric Cards on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: SVG Radar Canvas */}
        <div className="lg:col-span-7 flex flex-col items-center relative">
          <div className="w-full max-w-[440px] aspect-square flex items-center justify-center relative">
            <svg ref={svgRef} className="w-full h-full overflow-visible" />
          </div>

          {/* Benchmark Toggle Button */}
          <div className="mt-4 flex items-center gap-4 text-xs font-poppins">
            <button
              onClick={() => setShowBenchmark(!showBenchmark)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border transition-all ${
                showBenchmark
                  ? 'border-slate-500 bg-slate-800/50 text-slate-200'
                  : 'border-zinc-800 bg-zinc-900 text-zinc-500'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-slate-400" />
              <span>Industry Benchmark (dashed)</span>
            </button>
            <div className="flex items-center gap-2 text-zinc-300 font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-skin" />
              <span>Muhammad Hasil ({activePreset.axes.reduce((a, b) => a + b.value, 0) / activePreset.axes.length | 0}% Avg)</span>
            </div>
          </div>
        </div>

        {/* Right: Active Dimension Breakdown */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800/90 mb-2">
            <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
              <span>Domain Metric Focus</span>
              <span className="text-skin font-semibold">{activePreset.name}</span>
            </div>
            <p className="text-sm text-white font-medium">
              {hoveredAxis
                ? `Hovered: ${hoveredAxis.axis} (${hoveredAxis.value}%)`
                : 'Hover over any chart vertex to inspect technical stack highlights.'}
            </p>
          </div>

          <div className="flex flex-col gap-2.5 max-h-[340px] overflow-y-auto pr-1">
            {activePreset.axes.map((item) => {
              const isHovered = hoveredAxis?.axis === item.axis;
              return (
                <div
                  key={item.axis}
                  onMouseEnter={() => setHoveredAxis(item)}
                  onMouseLeave={() => setHoveredAxis(null)}
                  className={`p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                    isHovered
                      ? 'bg-zinc-800/90 border-skin shadow-lg'
                      : 'bg-zinc-900/60 border-zinc-800/60 hover:bg-zinc-800/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold font-poppins text-white flex items-center gap-1.5">
                      <CheckCircle2 className={`w-3.5 h-3.5 ${isHovered ? 'text-skin' : 'text-zinc-500'}`} />
                      {item.axis}
                    </span>
                    <span className="text-xs font-bold text-skin font-poppins">{item.value}%</span>
                  </div>

                  {/* Progress bar visual */}
                  <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden mb-1.5">
                    <div
                      className="h-full bg-skin transition-all duration-500"
                      style={{ width: `${item.value}%` }}
                    />
                  </div>

                  <p className="text-[11px] text-zinc-400 font-sans leading-tight">
                    <span className="text-zinc-500">Highlights:</span> {item.highlight}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
