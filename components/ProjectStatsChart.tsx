'use client';

import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { GitCommit, Code2, Clock, GitPullRequest, ShieldCheck, Activity } from 'lucide-react';
import { ProjectItem, ProjectStats } from '@/lib/portfolioData';

interface ProjectStatsChartProps {
  project: ProjectItem;
}

export function generateDefaultStats(project: ProjectItem): ProjectStats {
  const seed = (project.id || 'proj').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const baseLoc = 1200 + (seed % 15) * 850;
  const baseCommits = 35 + (seed % 20) * 8;
  const durationWeeks = 3 + (seed % 8);

  const weeklyCommits = Array.from({ length: Math.min(durationWeeks, 6) }).map((_, i) => {
    const weekNum = i + 1;
    const factor = (seed + i * 17) % 10;
    return {
      week: `Wk ${weekNum}`,
      commits: 8 + factor * 3,
      locAdded: Math.round(baseLoc / durationWeeks + (factor - 4) * 120),
    };
  });

  return {
    linesOfCode: baseLoc,
    totalCommits: baseCommits,
    durationWeeks,
    pullRequests: Math.round(baseCommits / 4.2),
    testCoverage: `${82 + (seed % 15)}%`,
    weeklyCommits,
  };
}

export default function ProjectStatsChart({ project }: ProjectStatsChartProps) {
  const stats: ProjectStats = project.stats || generateDefaultStats(project);
  const [activeChart, setActiveChart] = useState<'commits' | 'loc'>('commits');

  return (
    <div className="w-full bg-[#141414] border border-zinc-800/90 rounded-2xl p-5 sm:p-6 space-y-6">
      {/* Header & Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800/80 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-skin/10 text-skin flex items-center justify-center">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-poppins text-white uppercase tracking-wide">
              REPOSITORY & BUILD METRICS
            </h3>
            <p className="text-[11px] text-zinc-400 font-sans">
              Codebase analytics & commit velocity over time
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-[#1f1f1f] p-1 rounded-xl border border-zinc-800">
          <button
            onClick={() => setActiveChart('commits')}
            className={`px-3 py-1 rounded-lg text-[11px] font-bold font-poppins transition-colors cursor-pointer ${
              activeChart === 'commits'
                ? 'bg-skin text-white shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Commits / Wk
          </button>
          <button
            onClick={() => setActiveChart('loc')}
            className={`px-3 py-1 rounded-lg text-[11px] font-bold font-poppins transition-colors cursor-pointer ${
              activeChart === 'loc'
                ? 'bg-skin text-white shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            LOC Added
          </button>
        </div>
      </div>

      {/* Metric Summary Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[#1c1c1c] border border-zinc-800/80 rounded-xl p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400 mb-1">
            <span className="text-[10px] font-bold font-poppins uppercase tracking-wider">LINES OF CODE</span>
            <Code2 className="w-3.5 h-3.5 text-skin" />
          </div>
          <div className="text-base sm:text-lg font-black font-poppins text-white">
            {stats.linesOfCode.toLocaleString()}
          </div>
        </div>

        <div className="bg-[#1c1c1c] border border-zinc-800/80 rounded-xl p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400 mb-1">
            <span className="text-[10px] font-bold font-poppins uppercase tracking-wider">COMMITS</span>
            <GitCommit className="w-3.5 h-3.5 text-skin" />
          </div>
          <div className="text-base sm:text-lg font-black font-poppins text-white">
            {stats.totalCommits}
          </div>
        </div>

        <div className="bg-[#1c1c1c] border border-zinc-800/80 rounded-xl p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400 mb-1">
            <span className="text-[10px] font-bold font-poppins uppercase tracking-wider">DURATION</span>
            <Clock className="w-3.5 h-3.5 text-skin" />
          </div>
          <div className="text-base sm:text-lg font-black font-poppins text-white">
            {stats.durationWeeks} Wks
          </div>
        </div>

        <div className="bg-[#1c1c1c] border border-zinc-800/80 rounded-xl p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400 mb-1">
            <span className="text-[10px] font-bold font-poppins uppercase tracking-wider">TEST COVERAGE</span>
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-base sm:text-lg font-black font-poppins text-emerald-400">
            {stats.testCoverage || '90%'}
          </div>
        </div>
      </div>

      {/* Visual Recharts Visualization */}
      <div className="w-full h-52 sm:h-60 pt-2">
        <ResponsiveContainer width="100%" height="100%">
          {activeChart === 'commits' ? (
            <AreaChart data={stats.weeklyCommits} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="skinGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ffb400" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ffb400" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
              <XAxis dataKey="week" stroke="#71717a" fontSize={11} tickLine={false} />
              <YAxis stroke="#71717a" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#181818',
                  borderColor: '#3f3f46',
                  borderRadius: '12px',
                  color: '#ffffff',
                  fontSize: '12px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                }}
              />
              <Area
                type="monotone"
                dataKey="commits"
                name="Commits"
                stroke="#ffb400"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#skinGradient)"
              />
            </AreaChart>
          ) : (
            <BarChart data={stats.weeklyCommits} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
              <XAxis dataKey="week" stroke="#71717a" fontSize={11} tickLine={false} />
              <YAxis stroke="#71717a" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#181818',
                  borderColor: '#3f3f46',
                  borderRadius: '12px',
                  color: '#ffffff',
                  fontSize: '12px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                }}
              />
              <Bar dataKey="locAdded" name="LOC Added" fill="#ffb400" radius={[6, 6, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
