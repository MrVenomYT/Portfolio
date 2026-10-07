'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers,
  Code2,
  Sparkles,
  Terminal,
  Github,
  ExternalLink,
  Eye,
  X,
  ArrowUpRight,
  FolderGit2,
  ShoppingBag,
  Check,
} from 'lucide-react';
import { usePortfolio } from '@/lib/portfolioContext';
import { ProjectItem } from '@/lib/portfolioData';
import ProjectLifecycleTimeline from '@/components/ProjectLifecycleTimeline';
import ProjectStatsChart from '@/components/ProjectStatsChart';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function ProjectsPage() {
  const { projects, products } = usePortfolio();
  const [activeTab, setActiveTab] = useState<'all' | 'fullstack' | 'react' | 'products' | 'uiux' | 'vanilla' | 'agency' | 'bot'>('all');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  const fullstackCount = projects.filter((p) => p.category === 'fullstack').length;
  const reactCount = projects.filter((p) => p.category === 'react' || p.category === 'mern').length;
  const uiuxCount = projects.filter((p) => p.category === 'uiux' || p.category === 'vanilla').length;
  const botCount = projects.filter((p) => p.category === 'bot').length;

  const filteredProjects = projects.filter((p) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'products') return false;
    if (activeTab === 'react') return p.category === 'react' || p.category === 'mern';
    if (activeTab === 'uiux') return p.category === 'uiux' || p.category === 'vanilla';
    return p.category === activeTab;
  });

  const showProducts = activeTab === 'all' || activeTab === 'products';

  return (
    <div className="w-full flex flex-col items-center py-10 sm:py-14 px-4 sm:px-6 lg:px-12 min-h-screen">
      <div className="max-w-7xl w-full">
        {/* Page Header */}
        <div className="text-center mb-10 sm:mb-14 relative">
          <div className="title-bg">PROJECTS</div>
          <h1 className="text-3xl sm:text-5xl font-black font-poppins text-white uppercase relative z-10 tracking-tight">
            PROJECTS & <span className="text-skin">DIGITAL PRODUCTS</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 font-sans mt-2 relative z-10 max-w-2xl mx-auto">
            Interactive showcase merging Full-Stack Client Applications, MERN Systems, SaaS Starters, and Custom Discord Integrations.
          </p>
        </div>

        {/* Responsive Filter Categories Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 sm:mb-12">
          {[
            { id: 'all', label: `All Projects & Products (${projects.length + products.length})`, icon: Layers },
            { id: 'fullstack', label: `Full-Stack Apps (${fullstackCount})`, icon: Code2 },
            { id: 'react', label: `React & MERN (${reactCount})`, icon: Sparkles },
            { id: 'products', label: `Digital Products (${products.length})`, icon: ShoppingBag },
            { id: 'uiux', label: `UI/UX & Web (${uiuxCount})`, icon: FolderGit2 },
            { id: 'bot', label: `Discord Bots (${botCount})`, icon: Terminal },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-semibold font-poppins transition-all cursor-pointer ${
                  isActive
                    ? 'bg-skin text-white shadow-lg shadow-skin/30 scale-102 font-bold'
                    : 'bg-[#181818] border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        <ErrorBoundary fallbackTitle="Projects Grid">
          {/* Framer Motion Grid Container with Fluid Entrance & Exit Animations */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => {
                const projectTechs = project.techs || (project as any).tags || [];
                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 24, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.2 } }}
                    transition={{
                      duration: 0.35,
                      delay: Math.min(index * 0.04, 0.25),
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    whileHover={{ y: -6 }}
                    className="bg-[#181818] border border-zinc-800/90 hover:border-skin/70 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between group cursor-pointer"
                    onClick={() => setActiveModalProject(project)}
                  >
                    <div>
                      {/* Image Container with Preview Overlay */}
                      <div className="relative w-full aspect-[16/10] bg-zinc-900 overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent opacity-80" />

                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold font-poppins tracking-wider uppercase bg-black/70 backdrop-blur-md text-skin border border-skin/30">
                          {project.categoryLabel || project.category}
                        </span>

                        {/* Quick Preview Hover CTA */}
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 p-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveModalProject(project);
                            }}
                            className="px-4 py-2 rounded-xl bg-skin text-white text-xs font-bold font-poppins flex items-center gap-1.5 shadow-lg hover:scale-105 transition-transform cursor-pointer"
                          >
                            <Eye className="w-4 h-4" />
                            <span>View Details</span>
                          </button>
                          {project.demoUrl && (
                            <a
                              href={project.demoUrl}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
                              title="Open Live Demo"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-5 sm:p-6">
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <h3 className="text-lg font-bold font-poppins text-white hover:text-skin transition-colors line-clamp-1">
                            {project.title}
                          </h3>
                        </div>

                        <p className="text-xs text-zinc-400 font-sans line-clamp-2 leading-relaxed mb-4">
                          {project.description}
                        </p>

                        {/* Tech Stack Pills */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {projectTechs.slice(0, 4).map((tech: string, idx: number) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 rounded-md bg-[#222222] text-[10px] font-medium font-mono text-zinc-300 border border-zinc-800"
                            >
                              {tech}
                            </span>
                          ))}
                          {projectTechs.length > 4 && (
                            <span className="px-2 py-1 rounded-md bg-[#222222] text-[10px] font-mono text-zinc-500">
                              +{projectTechs.length - 4}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Footer Links */}
                    <div className="px-5 sm:px-6 pb-5 pt-0 flex items-center justify-between border-t border-zinc-800/60 mt-auto pt-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveModalProject(project);
                        }}
                        className="text-xs font-bold font-poppins text-skin hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>Inspect Build & Stats</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center gap-2">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                            title="GitHub Source"
                          >
                            <Github className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-1.5 rounded-lg bg-skin/10 text-skin hover:bg-skin hover:text-white transition-colors"
                            title="Live Site"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </ErrorBoundary>

        {/* Digital Products Section (Merged) */}
        {showProducts && (
          <div className="mt-12 pt-12 border-t border-zinc-800">
            <div className="text-center mb-10">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold font-poppins uppercase bg-skin/10 text-skin border border-skin/20">
                PROD & READY-TO-DEPLOY
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold font-poppins text-white uppercase mt-2">
                DIGITAL PRODUCTS & <span className="text-skin">STARTERS</span>
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 font-sans mt-1 max-w-xl mx-auto">
                Production Next.js / MERN Boilerplates, Custom Discord Bots, and UI Kits built for instant deployment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-[#181818] border border-zinc-800 hover:border-skin/60 rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 rounded-lg bg-skin/10 text-skin text-[10px] font-bold uppercase font-poppins">
                        {prod.category}
                      </span>
                      <span className="text-sm font-black font-poppins text-white bg-zinc-800 px-3 py-1 rounded-xl">
                        {prod.price}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold font-poppins text-white mb-2">{prod.title}</h3>
                    <p className="text-xs text-zinc-400 font-sans leading-relaxed mb-4">
                      {prod.description}
                    </p>

                    <ul className="space-y-1.5 mb-6">
                      {prod.features.slice(0, 3).map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-zinc-300 font-sans">
                          <Check className="w-3.5 h-3.5 text-skin shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href={prod.demoUrl || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 rounded-2xl bg-zinc-800 hover:bg-skin hover:text-white text-zinc-300 text-xs font-bold font-poppins uppercase tracking-wider text-center transition-colors flex items-center justify-center gap-2"
                  >
                    <span>View Product Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal for Deep Project Inspection & Recharts Visual Stats */}
        <AnimatePresence>
          {activeModalProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 20 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="bg-[#181818] border border-zinc-800 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl"
              >
                {/* Close Button */}
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="absolute top-5 right-5 p-2 rounded-full bg-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold font-poppins uppercase bg-skin/10 text-skin border border-skin/20">
                    {activeModalProject.categoryLabel}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black font-poppins text-white mb-3">
                  {activeModalProject.title}
                </h2>

                <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed mb-6">
                  {activeModalProject.description}
                </p>

                {/* Banner Image */}
                <div className="w-full aspect-video rounded-2xl overflow-hidden bg-zinc-900 mb-6 border border-zinc-800">
                  <img
                    src={activeModalProject.image}
                    alt={activeModalProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Technologies */}
                <div className="mb-6">
                  <h4 className="text-xs font-bold font-poppins text-zinc-400 uppercase tracking-wider mb-2">
                    TECHNOLOGY STACK:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {(activeModalProject.techs || (activeModalProject as any).tags || []).map((tech: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg bg-[#222222] border border-zinc-800 text-xs font-mono font-medium text-skin"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Visual Stats Section using Recharts */}
                <div className="mb-6 border-t border-zinc-800 pt-6">
                  <ProjectStatsChart project={activeModalProject} />
                </div>

                {/* Lifecycle Stage Breakdown */}
                <div className="mb-8 border-t border-zinc-800 pt-6">
                  <ProjectLifecycleTimeline stages={activeModalProject.stages} projectName={activeModalProject.title} />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 pt-4 border-t border-zinc-800">
                  {activeModalProject.demoUrl && (
                    <a
                      href={activeModalProject.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-3 rounded-2xl bg-skin text-white font-bold font-poppins text-xs uppercase flex items-center gap-2 hover:opacity-90 transition-opacity"
                    >
                      <span>Launch Live Demo</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {activeModalProject.githubUrl && (
                    <a
                      href={activeModalProject.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-3 rounded-2xl bg-zinc-800 text-white font-bold font-poppins text-xs uppercase flex items-center gap-2 hover:bg-zinc-700 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span>View Repository</span>
                    </a>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
