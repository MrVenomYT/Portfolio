'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
  Star,
  Check,
} from 'lucide-react';
import { usePortfolio } from '@/lib/portfolioContext';
import { ProjectItem, DigitalProduct } from '@/lib/portfolioData';
import ProjectLifecycleTimeline from '@/components/ProjectLifecycleTimeline';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function PortfolioPage() {
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
            PROJECTS & <span className="text-skin">PRODUCTS</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 font-sans mt-2 relative z-10 max-w-2xl mx-auto">
            Interactive repository of Full-Stack Web Applications, Digital SaaS Starters, UI Kits, and Discord Bots.
          </p>
        </div>

        {/* Responsive Filter Categories Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 sm:mb-12">
          {[
            { id: 'all', label: `All Items (${projects.length + products.length})`, icon: Layers },
            { id: 'fullstack', label: `Full-Stack Apps (${fullstackCount})`, icon: Code2 },
            { id: 'react', label: `React & MERN (${reactCount})`, icon: Sparkles },
            { id: 'products', label: `Digital Products (${products.length})`, icon: ShoppingBag },
            { id: 'uiux', label: `UI/UX & Design (${uiuxCount})`, icon: FolderGit2 },
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
          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-[#181818] border border-zinc-800/90 hover:border-skin/70 rounded-3xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
              >
                <div>
                  {/* Image Container with Preview Overlay */}
                  <div
                    className="relative w-full aspect-[16/10] bg-zinc-900 overflow-hidden cursor-pointer"
                    onClick={() => setActiveModalProject(project)}
                  >
                    <img
                      src={project.image || '/img/projects/project-1.jpg'}
                      alt={project.title}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="375" viewBox="0 0 600 375"><rect fill="%23222222" width="600" height="375"/><text fill="%23ffb400" font-family="sans-serif" font-size="18" font-weight="bold" x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">Muhammad Hasil Project</text></svg>';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity flex items-center justify-center p-4">
                      <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 px-4 py-2 rounded-full bg-skin text-white text-xs font-bold font-poppins flex items-center gap-2 shadow-xl">
                        <Eye className="w-3.5 h-3.5" /> Full Case Study
                      </span>
                    </div>

                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold font-poppins uppercase tracking-wider bg-black/75 backdrop-blur-md border border-white/10 text-skin">
                      {project.categoryLabel || 'Web Project'}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6">
                    <h3
                      onClick={() => setActiveModalProject(project)}
                      className="text-base sm:text-lg font-bold font-poppins text-white mb-2 group-hover:text-skin transition-colors cursor-pointer line-clamp-1"
                    >
                      {project.title}
                    </h3>
                    <p className="text-xs text-zinc-400 font-sans leading-relaxed mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {project.techs?.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] px-2.5 py-1 rounded-lg bg-zinc-900 text-zinc-300 font-poppins border border-zinc-800"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <ProjectLifecycleTimeline
                      projectName={project.title}
                      stages={project.stages}
                      defaultExpanded={false}
                    />
                  </div>
                </div>

                {/* Footer Link Actions */}
                <div className="p-5 sm:p-6 pt-0 flex items-center gap-2.5">
                  <a
                    href={project.githubUrl || 'https://github.com/MrVenomYT'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-zinc-200 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Source</span>
                  </a>
                  <a
                    href={project.demoUrl || 'https://muhammad-hasil.vercel.app/'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-skin hover:opacity-90 text-xs font-semibold text-white transition-opacity shadow-md"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>{project.demoLabel || 'Live Preview'}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </ErrorBoundary>

        {/* Digital Products Section (Integrated into same view) */}
        {showProducts && products.length > 0 && (
          <ErrorBoundary fallbackTitle="Digital Products Showcase">
            <div className="mt-8 pt-12 border-t border-zinc-800">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                  <div className="text-xs font-bold font-poppins text-skin uppercase tracking-wider mb-1">
                    Direct Purchase & Download
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black font-poppins text-white uppercase tracking-tight">
                    DIGITAL <span className="text-skin">PRODUCTS</span> & STARTERS
                  </h2>
                </div>
                <Link
                  href="/products"
                  className="text-xs font-bold font-poppins text-skin hover:underline inline-flex items-center gap-1.5"
                >
                  <span>Open Full Storefront</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-[#181818] border border-zinc-800 rounded-3xl p-5 shadow-xl flex flex-col justify-between hover:border-skin/60 transition-all group"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="px-2.5 py-1 rounded-xl bg-skin text-white font-black font-poppins text-xs">
                          {product.price}
                        </span>
                        {product.badge && (
                          <span className="px-2 py-0.5 rounded-full bg-skin/10 text-skin text-[10px] font-bold font-poppins border border-skin/20">
                            {product.badge}
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-bold font-poppins text-white mb-2 group-hover:text-skin transition-colors line-clamp-1">
                        {product.title}
                      </h3>
                      <p className="text-xs text-zinc-400 font-sans line-clamp-2 mb-4">
                        {product.description}
                      </p>

                      <div className="space-y-1 mb-4 text-[11px] text-zinc-300 font-sans">
                        {product.features?.slice(0, 2).map((f, i) => (
                          <div key={i} className="flex items-center gap-1.5">
                            <Check className="w-3 h-3 text-skin shrink-0" />
                            <span className="truncate">{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <a
                      href={product.purchaseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-skin text-zinc-200 hover:text-white text-xs font-bold font-poppins uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Get on Fiverr</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </ErrorBoundary>
        )}
      </div>

      {/* Modal Lightbox Case Study */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-[#181818] border border-zinc-700 rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative p-5 sm:p-8">
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center hover:bg-zinc-700 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
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
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="375" viewBox="0 0 600 375"><rect fill="%23222222" width="600" height="375"/><text fill="%23ffb400" font-family="sans-serif" font-size="18" font-weight="bold" x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">Muhammad Hasil Project</text></svg>';
                }}
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

            <div className="mb-6">
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
                <span>GitHub Repository</span>
              </a>
              <a
                href={activeModalProject.demoUrl || 'https://muhammad-hasil.vercel.app/'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-skin text-white font-bold font-poppins text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-skin/30 hover:opacity-90 transition-opacity"
              >
                <ExternalLink className="w-4 h-4" />
                <span>{activeModalProject.demoLabel || 'Launch Live'}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
