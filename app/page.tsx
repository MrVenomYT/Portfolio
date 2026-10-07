'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  User,
  Briefcase,
  Mail,
  Github,
  ExternalLink,
  Code2,
  Terminal,
  Layers,
  Sparkles,
  ChevronDown,
  Star,
  Quote,
  HelpCircle,
  Send,
  CheckCircle2,
  Lock,
  Zap,
  ShoppingBag,
  ShieldCheck,
  Check,
  Eye,
  Sliders,
  DollarSign,
  Tag,
  Clock,
  ArrowUpRight,
} from 'lucide-react';
import D3RadarChart from '@/components/D3RadarChart';
import ProjectLifecycleTimeline from '@/components/ProjectLifecycleTimeline';
import ProjectStatsChart from '@/components/ProjectStatsChart';
import ErrorBoundary from '@/components/ErrorBoundary';
import { usePortfolio } from '@/lib/portfolioContext';
import { ProjectItem } from '@/lib/portfolioData';

export default function HomePage() {
  const { profile, projects, products, services, testimonials, faqs } = usePortfolio();

  // Dynamic Typing Subtitle
  const [typedText, setTypedText] = useState('');
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [filter, setFilter] = useState<'all' | 'fullstack' | 'vanilla' | 'react' | 'uiux' | 'agency'>('all');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const subtitles = profile.subtitles && profile.subtitles.length > 0 ? profile.subtitles : [profile.tagline];

  useEffect(() => {
    const currentFullText = subtitles[subtitleIndex % subtitles.length];
    const typingSpeed = isDeleting ? 30 : 70;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setTypedText(currentFullText.substring(0, typedText.length + 1));
        if (typedText.length + 1 === currentFullText.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setTypedText(currentFullText.substring(0, typedText.length - 1));
        if (typedText.length - 1 === 0) {
          setIsDeleting(false);
          setSubtitleIndex((prev) => (prev + 1) % subtitles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, subtitleIndex, subtitles]);

  const filteredProjects = projects.filter((p) => {
    if (filter === 'all') return true;
    return p.category === filter;
  });

  return (
    <div className="w-full flex flex-col items-center">
      {/* ======================================================== */}
      {/* 1. HERO SECTION */}
      {/* ======================================================== */}
      <ErrorBoundary fallbackTitle="Hero Introduction">
        <section className="w-full min-h-[92vh] flex items-center justify-center py-12 sm:py-16 px-4 sm:px-6 lg:px-12 relative overflow-hidden border-b border-zinc-800/60">
          {/* Glow ambient backdrops */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-skin/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center z-10">
            {/* Avatar Graphic Card */}
            <div className="lg:col-span-5 flex justify-center lg:justify-start order-2 lg:order-1">
              <div className="relative group">
                <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-3xl overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-900 border-2 border-zinc-700/80 shadow-2xl relative">
                  <img
                    src="/img/2.jpg"
                    alt={profile.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-black/75 backdrop-blur-md border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold font-poppins text-white">{profile.name}</div>
                      <div className="text-[10px] text-skin font-mono">{profile.tagline}</div>
                    </div>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" title="Available for hire" />
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Typography */}
            <div className="lg:col-span-7 flex flex-col space-y-6 order-1 lg:order-2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-skin font-poppins font-semibold mx-auto lg:mx-0 w-fit">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{profile.availability}</span>
              </div>

              <div className="space-y-2">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-poppins text-white uppercase tracking-tight leading-tight">
                  I'M <span className="text-skin">{profile.name}</span>.
                </h1>
                <div className="text-lg sm:text-2xl font-bold font-poppins text-zinc-300 min-h-[2.2rem] flex items-center justify-center lg:justify-start gap-1">
                  <span>{typedText}</span>
                  <span className="w-1.5 h-6 bg-skin animate-pulse inline-block" />
                </div>
              </div>

              <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed max-w-xl mx-auto lg:mx-0">
                {profile.bio}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <Link
                  href="/contact"
                  className="px-8 py-3.5 rounded-full bg-skin hover:opacity-90 text-white font-bold font-poppins text-xs tracking-wider uppercase shadow-lg shadow-skin/30 transition-all flex items-center gap-2 cursor-pointer hover:scale-102"
                >
                  <span>Hire Me / Start Project</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/projects"
                  className="px-7 py-3.5 rounded-full bg-[#1e1e1e] hover:bg-[#252525] border border-zinc-700 text-zinc-200 hover:text-white font-bold font-poppins text-xs tracking-wider uppercase transition-colors"
                >
                  Explore Works ({projects.length})
                </Link>
              </div>

              {/* Metrics Counters Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-zinc-800/80">
                <div className="p-3 bg-[#181818] border border-zinc-800/80 rounded-2xl text-center lg:text-left">
                  <div className="text-xl sm:text-2xl font-black font-poppins text-skin">{profile.stats.experienceYears}</div>
                  <div className="text-[10px] uppercase font-bold text-zinc-400 font-poppins">Experience</div>
                </div>
                <div className="p-3 bg-[#181818] border border-zinc-800/80 rounded-2xl text-center lg:text-left">
                  <div className="text-xl sm:text-2xl font-black font-poppins text-skin">{profile.stats.completedProjects}</div>
                  <div className="text-[10px] uppercase font-bold text-zinc-400 font-poppins">Completed</div>
                </div>
                <div className="p-3 bg-[#181818] border border-zinc-800/80 rounded-2xl text-center lg:text-left">
                  <div className="text-xl sm:text-2xl font-black font-poppins text-skin">{profile.stats.happyClients}</div>
                  <div className="text-[10px] uppercase font-bold text-zinc-400 font-poppins">Happy Clients</div>
                </div>
                <div className="p-3 bg-[#181818] border border-zinc-800/80 rounded-2xl text-center lg:text-left">
                  <div className="text-xl sm:text-2xl font-black font-poppins text-skin">{profile.stats.hoursCoded}</div>
                  <div className="text-[10px] uppercase font-bold text-zinc-400 font-poppins">Hours Coded</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ErrorBoundary>

      {/* ======================================================== */}
      {/* 2. FEATURED PROJECTS SHOWCASE */}
      {/* ======================================================== */}
      <ErrorBoundary fallbackTitle="Project Showcase">
        <section className="w-full py-16 px-4 sm:px-6 lg:px-12 border-b border-zinc-800/60 flex flex-col items-center">
          <div className="max-w-7xl w-full">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <div className="text-xs font-bold font-poppins text-skin uppercase tracking-wider mb-1">
                  Portfolio Showcase
                </div>
                <h2 className="text-2xl sm:text-4xl font-black font-poppins text-white uppercase tracking-tight">
                  FEATURED BUILDS & <span className="text-skin">PROJECTS</span>
                </h2>
              </div>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-xs font-bold font-poppins text-skin hover:underline"
              >
                <span>View All {projects.length} Projects</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Project Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-10">
              {projects.slice(0, 6).map((project) => (
                <div
                  key={project.id}
                  className="bg-[#181818] border border-zinc-800/90 hover:border-skin/70 rounded-3xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
                >
                  <div>
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
                          <Eye className="w-3.5 h-3.5" /> Case Study
                        </span>
                      </div>

                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold font-poppins uppercase tracking-wider bg-black/75 backdrop-blur-md border border-white/10 text-skin">
                        {project.categoryLabel || 'Web App'}
                      </span>
                    </div>

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

                  <div className="p-5 sm:p-6 pt-0 flex items-center gap-2.5">
                    <a
                      href={project.githubUrl || 'https://github.com/MrVenomYT'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-zinc-200 transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Code</span>
                    </a>
                    <a
                      href={project.demoUrl || 'https://muhammad-hasil.vercel.app/'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-skin hover:opacity-90 text-xs font-semibold text-white transition-opacity shadow-md"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>{project.demoLabel || 'Live Demo'}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/portfolio"
                className="px-8 py-3.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 font-bold font-poppins text-xs tracking-wider uppercase transition-colors inline-flex items-center gap-2"
              >
                <span>Explore All {projects.length} Uploaded Projects</span>
                <ArrowRight className="w-4 h-4 text-skin" />
              </Link>
            </div>
          </div>
        </section>
      </ErrorBoundary>

      {/* ======================================================== */}
      {/* 3. DIGITAL PRODUCTS STORE PREVIEW */}
      {/* ======================================================== */}
      <ErrorBoundary fallbackTitle="Digital Products Showcase">
        <section className="w-full py-16 px-4 sm:px-6 lg:px-12 border-b border-zinc-800/60 flex flex-col items-center bg-[#131313]">
          <div className="max-w-7xl w-full">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <div className="text-xs font-bold font-poppins text-skin uppercase tracking-wider mb-1">
                  Store & Source Code
                </div>
                <h2 className="text-2xl sm:text-4xl font-black font-poppins text-white uppercase tracking-tight">
                  DIGITAL <span className="text-skin">PRODUCTS</span> & STARTERS
                </h2>
              </div>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-xs font-bold font-poppins text-skin hover:underline"
              >
                <span>Browse All {products.length} Products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.slice(0, 4).map((product) => (
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
        </section>
      </ErrorBoundary>

      {/* ======================================================== */}
      {/* 4. SERVICES & SOLUTIONS */}
      {/* ======================================================== */}
      <ErrorBoundary fallbackTitle="Services & Solutions">
        <section className="w-full py-16 px-4 sm:px-6 lg:px-12 border-b border-zinc-800/60 flex flex-col items-center">
          <div className="max-w-7xl w-full">
            <div className="text-center mb-12">
              <div className="text-xs font-bold font-poppins text-skin uppercase tracking-wider mb-1">
                What I Deliver
              </div>
              <h2 className="text-2xl sm:text-4xl font-black font-poppins text-white uppercase tracking-tight">
                SERVICES & <span className="text-skin">SOLUTIONS</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((srv) => (
                <div
                  key={srv.id}
                  className="bg-[#181818] border border-zinc-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between hover:border-skin/60 transition-all group"
                >
                  <div>
                    <div className="w-10 h-10 rounded-2xl bg-skin/10 text-skin flex items-center justify-center font-bold mb-4">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-skin font-bold block mb-1">
                      Starts {srv.startingPrice}
                    </span>
                    <h3 className="text-base font-bold font-poppins text-white mb-2 group-hover:text-skin transition-colors">
                      {srv.title}
                    </h3>
                    <p className="text-xs text-zinc-400 font-sans leading-relaxed mb-4 line-clamp-3">
                      {srv.description}
                    </p>
                  </div>

                  <Link
                    href="/services"
                    className="inline-flex items-center gap-1.5 text-xs font-bold font-poppins text-skin hover:underline pt-3 border-t border-zinc-800/80"
                  >
                    <span>Explore Deliverables</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ErrorBoundary>

      {/* ======================================================== */}
      {/* 5. RADAR PROFICIENCIES */}
      {/* ======================================================== */}
      <ErrorBoundary fallbackTitle="Proficiency Evaluation">
        <section className="w-full py-16 px-4 sm:px-6 lg:px-12 border-b border-zinc-800/60 flex flex-col items-center">
          <div className="max-w-7xl w-full">
            <div className="text-center mb-8">
              <div className="text-xs font-bold font-poppins text-skin uppercase tracking-wider mb-1">
                Interactive Evaluation
              </div>
              <h2 className="text-2xl sm:text-4xl font-black font-poppins text-white uppercase tracking-tight">
                TECHNICAL <span className="text-skin">PROFICIENCY</span> RADAR
              </h2>
              <p className="text-xs text-zinc-400 font-sans mt-2 max-w-lg mx-auto">
                Visual evaluation across Frontend, Backend, Databases, Discord Bots, and Sales Engineering.
              </p>
            </div>

            <D3RadarChart />
          </div>
        </section>
      </ErrorBoundary>

      {/* ======================================================== */}
      {/* 6. CLIENT TESTIMONIALS & REVIEWS */}
      {/* ======================================================== */}
      <ErrorBoundary fallbackTitle="Client Testimonials">
        <section className="w-full py-16 px-4 sm:px-6 lg:px-12 border-b border-zinc-800/60 flex flex-col items-center bg-[#141414]">
          <div className="max-w-7xl w-full">
            <div className="text-center mb-12">
              <div className="text-xs font-bold font-poppins text-skin uppercase tracking-wider mb-1">
                Verified Endorsements
              </div>
              <h2 className="text-2xl sm:text-4xl font-black font-poppins text-white uppercase tracking-tight">
                CLIENT <span className="text-skin">TESTIMONIALS</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="bg-[#181818] border border-zinc-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-1 text-skin mb-3">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-skin text-skin" />
                      ))}
                    </div>
                    <p className="text-xs text-zinc-300 font-sans leading-relaxed italic mb-4">
                      "{t.comment}"
                    </p>
                  </div>
                  <div className="pt-3 border-t border-zinc-800/80">
                    <div className="text-xs font-bold font-poppins text-white">{t.name}</div>
                    <div className="text-[11px] text-zinc-400 font-sans">{t.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ErrorBoundary>

      {/* ======================================================== */}
      {/* 7. FAQ SECTION */}
      {/* ======================================================== */}
      <ErrorBoundary fallbackTitle="FAQ Section">
        <section className="w-full py-16 px-4 sm:px-6 lg:px-12 border-b border-zinc-800/60 flex flex-col items-center">
          <div className="max-w-4xl w-full">
            <div className="text-center mb-10">
              <div className="text-xs font-bold font-poppins text-skin uppercase tracking-wider mb-1">
                Got Questions?
              </div>
              <h2 className="text-2xl sm:text-4xl font-black font-poppins text-white uppercase tracking-tight">
                FREQUENTLY ASKED <span className="text-skin">QUESTIONS</span>
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className="bg-[#181818] border border-zinc-800 rounded-2xl overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full flex items-center justify-between p-5 text-left text-xs sm:text-sm font-bold font-poppins text-white hover:text-skin transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-zinc-400 transition-transform ${isOpen ? 'rotate-180 text-skin' : ''}`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-xs text-zinc-300 font-sans leading-relaxed border-t border-zinc-800/80 pt-4 bg-[#141414]">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </ErrorBoundary>

      {/* ======================================================== */}
      {/* 8. BOTTOM CTA BANNER */}
      {/* ======================================================== */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-12 flex flex-col items-center">
        <div className="max-w-5xl w-full bg-[#181818] border border-zinc-800 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-skin/10 text-skin flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-black font-poppins text-white uppercase mb-3">
            Let's Build Something Exceptional Together
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-sans max-w-xl mx-auto mb-8">
            Available for full-stack web development, Discord bot architecture, and custom internal dashboards.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-full bg-skin text-white font-bold font-poppins text-xs tracking-wider uppercase shadow-lg shadow-skin/30 hover:scale-105 transition-all cursor-pointer"
            >
              Get In Touch
            </Link>
            <a
              href="https://pro.fiverr.com/users/venomdesigne613/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 font-bold font-poppins text-xs tracking-wider uppercase transition-colors"
            >
              Hire on Fiverr Pro
            </a>
          </div>
        </div>
      </section>

      {/* Modal Case Study Lightbox for Home page */}
      {activeModalProject && (
        <ErrorBoundary fallbackTitle="Project Details">
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <div className="bg-[#181818] border border-zinc-700 rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative p-5 sm:p-8">
              <button
                onClick={() => setActiveModalProject(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center hover:bg-zinc-700 transition-colors cursor-pointer"
              >
                ✕
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
                <ProjectStatsChart project={activeModalProject} />
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
        </ErrorBoundary>
      )}
    </div>
  );
}
