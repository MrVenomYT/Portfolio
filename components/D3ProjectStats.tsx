'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { BarChart3, PieChart, CheckCircle } from 'lucide-react';

interface StatCategory {
  name: string;
  count: number;
  color: string;
  pct: number;
}

const statsData: StatCategory[] = [
  { name: 'Full-Stack MERN', count: 48, color: '#61dafb', pct: 49 },
  { name: 'Discord Bots & APIs', count: 28, color: '#5865f2', pct: 29 },
  { name: 'Frontend & UI/UX', count: 14, color: '#f05032', pct: 15 },
  { name: 'Python Automation', count: 7, color: '#3776ab', pct: 7 },
];

export default function D3ProjectStats() {
  const chartRef = useRef<SVGSVGElement | null>(null);
  const [activeCategory, setActiveCategory] = useState<StatCategory | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const width = 500;
    const height = 180;
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };

    d3.select(chartRef.current).selectAll('*').remove();

    const svg = d3
      .select(chartRef.current)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('width', '100%')
      .attr('height', '100%')
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Scales
    const xScale = d3
      .scaleBand()
      .domain(statsData.map((d) => d.name))
      .range([0, innerWidth])
      .padding(0.35);

    const yScale = d3
      .scaleLinear()
      .domain([0, 55])
      .range([innerHeight, 0]);

    // Grid lines
    svg
      .append('g')
      .attr('class', 'grid')
      .call(
        d3
          .axisLeft(yScale)
          .ticks(4)
          .tickSize(-innerWidth)
          .tickFormat(() => '')
      )
      .selectAll('line')
      .attr('stroke', '#27272a')
      .attr('stroke-dasharray', '2,2');

    // Axes
    const xAxis = svg
      .append('g')
      .attr('transform', `translate(0, ${innerHeight})`)
      .call(d3.axisBottom(xScale).tickSize(0));

    xAxis.select('.domain').attr('stroke', '#3f3f46');
    xAxis
      .selectAll('text')
      .attr('fill', '#a1a1aa')
      .attr('font-size', '11px')
      .attr('font-family', 'Poppins, sans-serif')
      .attr('dy', '12px');

    const yAxis = svg.append('g').call(d3.axisLeft(yScale).ticks(4));
    yAxis.select('.domain').attr('stroke', '#3f3f46');
    yAxis
      .selectAll('text')
      .attr('fill', '#71717a')
      .attr('font-size', '10px');

    // Bars
    svg
      .selectAll('.bar')
      .data(statsData)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => xScale(d.name) || 0)
      .attr('y', innerHeight)
      .attr('width', xScale.bandwidth())
      .attr('height', 0)
      .attr('rx', 6)
      .attr('fill', (d) => d.color)
      .style('cursor', 'pointer')
      .on('mouseenter', (_e, d) => setActiveCategory(d))
      .on('mouseleave', () => setActiveCategory(null))
      .transition()
      .duration(800)
      .delay((_d, i) => i * 120)
      .attr('y', (d) => yScale(d.count))
      .attr('height', (d) => innerHeight - yScale(d.count));

    // Value Labels on top of bars
    svg
      .selectAll('.bar-label')
      .data(statsData)
      .enter()
      .append('text')
      .attr('class', 'bar-label')
      .attr('x', (d) => (xScale(d.name) || 0) + xScale.bandwidth() / 2)
      .attr('y', (d) => yScale(d.count) - 6)
      .attr('text-anchor', 'middle')
      .attr('fill', '#ffffff')
      .attr('font-size', '11px')
      .attr('font-weight', '700')
      .attr('font-family', 'Poppins, sans-serif')
      .text((d) => `${d.count}`);

  }, []);

  return (
    <div className="w-full bg-[#161616] border border-zinc-800 rounded-2xl p-6 shadow-xl mb-12">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4 pb-4 border-b border-zinc-800/80">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-skin" />
            <h4 className="text-lg font-bold font-poppins text-white">Project Distribution Metrics</h4>
          </div>
          <p className="text-xs text-zinc-400 font-sans">97+ production and open-source deliveries by category</p>
        </div>

        <div className="flex items-center gap-2 text-xs font-poppins text-zinc-300">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span>Active Engagements: 3 Live</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* D3 SVG Bar Canvas */}
        <div className="lg:col-span-8 flex justify-center">
          <div className="w-full max-w-[500px]">
            <svg ref={chartRef} className="w-full overflow-visible" />
          </div>
        </div>

        {/* Legend / Metrics list */}
        <div className="lg:col-span-4 flex flex-col gap-2.5">
          {statsData.map((item) => (
            <div
              key={item.name}
              onMouseEnter={() => setActiveCategory(item)}
              onMouseLeave={() => setActiveCategory(null)}
              className={`p-2.5 rounded-xl border transition-all ${
                activeCategory?.name === item.name
                  ? 'bg-zinc-800/90 border-skin scale-102'
                  : 'bg-zinc-900/60 border-zinc-800/60'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold font-poppins mb-1">
                <span className="text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  {item.name}
                </span>
                <span className="text-zinc-300">{item.count} Projects ({item.pct}%)</span>
              </div>
              <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${item.pct}%`, backgroundColor: item.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
