'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Layers, Code2, Sparkles, Terminal, Github, ExternalLink, Eye, X, ArrowUpRight, FolderGit2 } from 'lucide-react';
import { usePortfolio } from '@/lib/portfolioContext';
import { ProjectItem } from '@/lib/portfolioData';
import ProjectLifecycleTimeline from '@/components/ProjectLifecycleTimeline';

export default function PortfolioPage() {
  const { projects } = usePortfolio();
  const [filter, setFilter] = useState<'all' | 'mern' | 'frontend' | 'bot' | 'fullstack'>('all');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  const filteredProjects = projects.filter((p) => {
    if (filter === 'all') return true;
    return p.category === filter;
  });

  const mernCount = projects.filter((p) => p.category === 'mern').length;
  const frontendCount = projects.filter((p) => p.category === 'frontend').length;
  const botCount = projects.filter((p) => p.category === 'bot').length;

  return (
    <div className="w-full flex flex-col items-center py-10 sm:py-14 px-4 sm:px-6 lg:px-12 min-h-screen">
      <div className="max-w-7xl w-full">
        {/* Page Title */}
        <div className="text-center mb-10 sm:mb-14 relative">
          <div className="title-bg">WORKS</div>
          <h1 className="text-3xl sm:text-5xl font-black font-poppins text-white uppercase relative z-10 tracking-tight">
            MY <span className="text-skin">PORTFOLIO</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 font-sans mt-2 relative z-10 max-w-xl mx-auto">
            Interactive showcase of Full-Stack MERN Platforms, Discord Bots & Modern Reactive Web Applications
          </p>
        </div>

        {/* Responsive Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 sm:mb-12">
          {[
            { id: 'all', label: `All Works (${projects.length})`, icon: Layers },
            { id: 'mern', label: `Full-Stack MERN (${mernCount})`, icon: Code2 },
            { id: 'frontend', label: `Frontend UI/UX (${frontendCount})`, icon: Sparkles },
            { id: 'bot', label: `Discord Bots (${botCount})`, icon: Terminal },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = filter === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setFilter(item.id as any)}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-semibold font-poppins transition-all cursor-pointer ${
                  isActive
                    ? 'bg-skin text-white shadow-lg shadow-skin/30 scale-102'
                    : 'bg-[#181818] border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Projects Responsive Grid (1 col on mobile, 2 on tablet, 3 on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-[#181818] border border-zinc-800/90 hover:border-skin/70 rounded-3xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
            >
              <div>
                {/* Image Container with Preview Overlay & Aspect Ratio */}
                <div
                  className="relative w-full aspect-[16/10] bg-zinc-900 overflow-hidden cursor-pointer"
                  onClick={() => setActiveModalProject(project)}
                >
                  <img
                    src={project.image || '/img/projects/project-1.jpg'}
                    alt={project.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity flex items-center justify-center p-4">
                    <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 px-4 py-2 rounded-full bg-skin text-white text-xs font-bold font-poppins flex items-center gap-2 shadow-xl">
                      <Eye className="w-3.5 h-3.5" /> Full Case Study
                    </span>
                  </div>

                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold font-poppins uppercase tracking-wider bg-black/75 backdrop-blur-md border border-white/10 text-skin">
                    {project.categoryLabel || 'Web Project'}
                  </span>

                  {/* Quick Expand Icon on Mobile */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveModalProject(project);
                    }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/70 backdrop-blur-md text-zinc-300 flex md:hidden items-center justify-center text-xs"
                    aria-label="Expand preview"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  <h3
                    onClick={() => setActiveModalProject(project)}
                    className="text-base sm:text-lg font-bold font-poppins text-white mb-2 group-hover:text-skin transition-colors cursor-pointer line-clamp-1"
                  >
                    {project.title}
                  </h3>
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {project.techs?.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] sm:text-[11px] px-2.5 py-1 rounded-lg bg-zinc-900 text-zinc-300 font-poppins border border-zinc-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Vertical Development Lifecycle Timeline (Responsive Collapsible) */}
                  <ProjectLifecycleTimeline
                    projectName={project.title}
                    stages={project.stages}
                    defaultExpanded={false}
                  />
                </div>
              </div>

              {/* Action Buttons (Responsive flex wrap / column on tiny mobile, 2-col on standard) */}
              <div className="p-5 sm:p-6 pt-0 flex flex-col sm:flex-row items-center gap-2.5">
                <a
                  href={project.githubUrl || 'https://github.com/MrVenomYT'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-zinc-200 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                <a
                  href={project.demoUrl || 'https://muhammad-hasil.vercel.app/'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-skin hover:opacity-90 text-xs font-semibold text-white transition-opacity shadow-md"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>{project.demoLabel || 'Live Preview'}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Case Study Lightbox (Fully Responsive Mobile/Desktop) */}
        {activeModalProject && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <div className="bg-[#181818] border border-zinc-700 rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative p-5 sm:p-8">
              <button
                onClick={() => setActiveModalProject(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center hover:bg-zinc-700 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="inline-block px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold font-poppins uppercase tracking-wider bg-skin/20 text-skin border border-skin/30 mb-3">
                {activeModalProject.categoryLabel || 'Portfolio Project'}
              </span>

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black font-poppins text-white mb-4 pr-8">
                {activeModalProject.title}
              </h2>

              <div className="w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-zinc-900 mb-6 border border-zinc-800">
                <img
                  src={activeModalProject.image || '/img/projects/project-1.jpg'}
                  alt={activeModalProject.title}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed mb-6">
                {activeModalProject.description}
              </p>

              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-poppins mb-2">
                  Technologies Employed:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeModalProject.techs?.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-lg bg-zinc-800 text-zinc-200 text-xs font-semibold font-poppins border border-zinc-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Complete Vertical Timeline in Modal */}
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-poppins mb-2">
                  Full Development Lifecycle Breakdown:
                </h4>
                <ProjectLifecycleTimeline
                  projectName={activeModalProject.title}
                  stages={activeModalProject.stages}
                  defaultExpanded={true}
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-zinc-800">
                <a
                  href={activeModalProject.githubUrl || 'https://github.com/MrVenomYT'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold font-poppins text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>View GitHub Repository</span>
                </a>
                <a
                  href={activeModalProject.demoUrl || 'https://muhammad-hasil.vercel.app/'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-skin text-white font-bold font-poppins text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-skin/30 hover:opacity-90 transition-opacity"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>{activeModalProject.demoLabel || 'Launch Live Project'}</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
