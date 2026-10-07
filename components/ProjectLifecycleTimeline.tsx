'use client';

import React, { useState } from 'react';
import { Lightbulb, Database, Code2, ShieldCheck, Rocket, ChevronDown, ChevronUp, CheckCircle2, Clock, Wrench } from 'lucide-react';

export interface LifecycleStage {
  step: number;
  name: string;
  phase: 'Concept' | 'Architecture' | 'Development' | 'Testing' | 'Deployment' | string;
  duration: string;
  summary: string;
  deliverables: string[];
  tools: string[];
  status: 'Completed' | 'In-Production' | 'Iterating' | 'Planned' | string;
}

interface ProjectLifecycleTimelineProps {
  projectName: string;
  stages?: LifecycleStage[];
  defaultExpanded?: boolean;
}

const defaultStages: LifecycleStage[] = [
  {
    step: 1,
    name: 'Discovery & Concept Design',
    phase: 'Concept',
    duration: 'Week 1',
    summary: 'Target audience analysis, feature scoping, and system wireframes.',
    deliverables: ['PRD Document', 'UI Wireframes', 'Feature Prioritization'],
    tools: ['Figma', 'Notion', 'Flowcharts'],
    status: 'Completed',
  },
  {
    step: 2,
    name: 'Architecture & Database Design',
    phase: 'Architecture',
    duration: 'Week 2',
    summary: 'NoSQL Schema normalization, REST API contracts, and Auth architecture.',
    deliverables: ['MongoDB Schemas', 'API Spec (OpenAPI)', 'Security Model'],
    tools: ['Mongoose', 'Postman', 'JWT'],
    status: 'Completed',
  },
  {
    step: 3,
    name: 'Core Full-Stack / Bot Dev',
    phase: 'Development',
    duration: 'Week 3–4',
    summary: 'Component hierarchy, state management, socket relays, and backend routes.',
    deliverables: ['React / Next.js Frontend', 'Express / Node Backend', 'Discord Slash Commands'],
    tools: ['React', 'Discord.js v14', 'Tailwind CSS'],
    status: 'Completed',
  },
  {
    step: 4,
    name: 'QA, Security & Performance',
    phase: 'Testing',
    duration: 'Week 5',
    summary: 'End-to-end integration tests, load tests, and responsive layout QA.',
    deliverables: ['Lighthouse 98+ Score', 'Rate-Limiting Tests', 'Cross-Device QA'],
    tools: ['Jest', 'Lighthouse', 'ESLint'],
    status: 'Completed',
  },
  {
    step: 5,
    name: 'Production Deployment & CI/CD',
    phase: 'Deployment',
    duration: 'Week 6',
    summary: 'Automated GitHub Actions pipeline, Vercel/Render hosting, and 24/7 uptime monitoring.',
    deliverables: ['Live HTTPS Domain', 'CI/CD Pipeline', 'Uptime Alerts'],
    tools: ['Vercel', 'Render', 'PM2', 'GitHub Actions'],
    status: 'In-Production',
  },
];

const phaseIcons: Record<string, any> = {
  Concept: Lightbulb,
  Architecture: Database,
  Development: Code2,
  Testing: ShieldCheck,
  Deployment: Rocket,
};

export default function ProjectLifecycleTimeline({
  projectName,
  stages = defaultStages,
  defaultExpanded = false,
}: ProjectLifecycleTimelineProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  if (!stages || stages.length === 0) return null;

  return (
    <div className="w-full mt-3 pt-3 border-t border-zinc-800/80">
      {/* Header Toggle */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-2.5 sm:py-2 sm:px-3 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 transition-all text-left group cursor-pointer"
        aria-label="Toggle development lifecycle timeline"
      >
        <div className="flex items-center gap-2 min-w-0 pr-2">
          <Rocket className="w-3.5 h-3.5 text-skin shrink-0 transition-transform group-hover:scale-110" />
          <span className="text-[11px] sm:text-xs font-bold font-poppins text-zinc-200 tracking-wide uppercase truncate">
            Lifecycle Timeline
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-zinc-800 text-zinc-400 font-mono shrink-0">
            {stages.length} Stages
          </span>
        </div>
        <div className="flex items-center gap-1 text-[11px] sm:text-xs text-skin font-semibold shrink-0">
          <span>{isExpanded ? 'Hide' : 'Inspect'}</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </div>
      </button>

      {/* Vertical Timeline Body */}
      {isExpanded && (
        <div className="mt-3 pl-1 pr-1 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="relative border-l-2 border-zinc-700/60 ml-2.5 sm:ml-3 space-y-4 pb-2">
            {stages.map((stage) => {
              const Icon = phaseIcons[stage.phase] || Code2;
              return (
                <div key={stage.step} className="relative pl-5 sm:pl-6 group">
                  {/* Timeline Dot Node */}
                  <div className="absolute -left-[15px] sm:-left-[17px] top-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#181818] border-2 border-skin flex items-center justify-center text-skin shadow-md transition-all group-hover:scale-110 group-hover:bg-skin group-hover:text-white">
                    <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </div>

                  {/* Stage Card */}
                  <div className="bg-zinc-900/95 border border-zinc-800/90 rounded-xl p-3 sm:p-3.5 shadow-sm transition-all group-hover:border-zinc-700">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 mb-1.5">
                      <span className="text-xs font-bold font-poppins text-white">
                        0{stage.step}. {stage.name}
                      </span>
                      <div className="flex items-center gap-2 text-[10px]">
                        <span className="flex items-center gap-1 text-zinc-400">
                          <Clock className="w-3 h-3 text-skin" /> {stage.duration}
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-950/90 border border-emerald-800/60 text-emerald-400 font-medium">
                          {stage.status}
                        </span>
                      </div>
                    </div>

                    <p className="text-[11px] sm:text-xs text-zinc-400 font-sans mb-2 leading-relaxed">
                      {stage.summary}
                    </p>

                    {/* Deliverables */}
                    {stage.deliverables && stage.deliverables.length > 0 && (
                      <div className="mb-2">
                        <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-zinc-500 block mb-1">
                          Deliverables:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {stage.deliverables.map((item, dIdx) => (
                            <span
                              key={dIdx}
                              className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-sans border border-zinc-700/50"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tools */}
                    {stage.tools && stage.tools.length > 0 && (
                      <div className="flex items-center gap-1.5 pt-1.5 border-t border-zinc-800/60 text-[10px] text-zinc-400 flex-wrap">
                        <Wrench className="w-3 h-3 text-skin shrink-0" />
                        <span className="text-zinc-500">Stack:</span>
                        <span className="text-zinc-300 font-medium">{stage.tools.join(' · ')}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
