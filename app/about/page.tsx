'use client';

import React from 'react';
import Link from 'next/link';
import {
  Download,
  Briefcase,
  GraduationCap,
  ArrowRight,
  Code,
  Terminal,
  Sparkles,
  CheckCircle2,
  Award,
  ExternalLink,
  ShieldCheck,
  Check,
  Building2,
  Calendar,
  Globe,
} from 'lucide-react';
import D3RadarChart from '@/components/D3RadarChart';
import GuestbookSection from '@/components/GuestbookSection';
import { usePortfolio } from '@/lib/portfolioContext';

export default function AboutPage() {
  const { profile, education, experiences, certifications } = usePortfolio();

  const personalInfo = [
    { label: 'Full Name', value: profile.name },
    { label: 'Tagline', value: profile.tagline },
    { label: 'Location', value: profile.address },
    { label: 'Availability', value: profile.availability },
    { label: 'Email', value: profile.email, isEmail: true },
    { label: 'Discord', value: profile.discord },
    { label: 'Experience', value: profile.stats.experienceYears },
    { label: 'Completed', value: `${profile.stats.completedProjects} Projects` },
  ];

  const statCards = [
    { count: profile.stats.experienceYears, label: 'YEARS OF EXPERIENCE', desc: 'Full-stack & bot engineering' },
    { count: profile.stats.completedProjects, label: 'PROJECTS COMPLETED', desc: 'Portals, SaaS, web apps & themes' },
    { count: profile.stats.happyClients, label: 'HAPPY CLIENTS', desc: 'Global clients, agencies & guilds' },
    { count: profile.stats.hoursCoded, label: 'HOURS CODED', desc: 'Clean modular architecture & APIs' },
  ];

  return (
    <div className="w-full flex flex-col items-center py-10 sm:py-14 px-4 sm:px-6 lg:px-12 min-h-screen">
      <div className="max-w-7xl w-full">
        {/* Page Title */}
        <div className="text-center mb-12 sm:mb-16 relative">
          <div className="title-bg">RESUME</div>
          <h1 className="text-3xl sm:text-5xl font-black font-poppins text-white uppercase relative z-10 tracking-tight">
            ABOUT <span className="text-skin">ME</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 font-sans mt-2 relative z-10 max-w-2xl mx-auto">
            {profile.headline}
          </p>
        </div>

        {/* Section 1: Biography & Key Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start mb-16">
          {/* Left: Info Grid & Bio */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <div>
              <h3 className="text-lg sm:text-xl font-bold font-poppins text-white uppercase mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-skin" /> PROFESSIONAL BIOGRAPHY
              </h3>
              <div className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed space-y-3 bg-[#181818] border border-zinc-800 rounded-3xl p-6 shadow-xl">
                <p>
                  I am a <strong className="text-white">Front End & Full Stack Web Developer</strong> with over 5 years of experience building fast, responsive, and user-focused web applications. I work with HTML5, CSS3, Bootstrap, JavaScript, jQuery, and React Redux to deliver clean, scalable, and high-performing interfaces.
                </p>
                <p>
                  I bring full-stack experience with the <strong className="text-skin">MERN stack (MongoDB, Express.js, React.js, Node.js)</strong> and <strong className="text-white">Next.js</strong>, supporting projects from conception and frontend UI design to backend database architecture and cloud deployment. WordPress is also a key part of my experience, having built and managed <strong className="text-white">500+ custom themes, plugins, and performance-optimized websites</strong> for businesses and agencies.
                </p>
                <p>
                  Alongside development, I possess extensive experience in <strong className="text-white">B2B and B2C sales, LinkedIn lead generation, email automation, and data mining</strong>. I identify ideal client prospects, generate high-converting qualified leads, and align technical software solutions with business and revenue goals.
                </p>
                <p>
                  Additionally, I specialize in <strong className="text-skin">Discord.js bot development</strong> and quick.db integrations for server automation, moderation, and community engagement. I also work with <strong className="text-white">Lunar Client as an official Hindi Translator</strong>, expanding community accessibility across global gaming networks.
                </p>
              </div>
            </div>

            {/* Personal Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm bg-[#161616] border border-zinc-800/80 rounded-2xl p-5">
              {personalInfo.map((info) => (
                <div key={info.label} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <span className="text-zinc-400 font-sans text-xs">{info.label}:</span>
                  {info.isEmail ? (
                    <a href={`mailto:${info.value}`} className="text-skin font-mono font-semibold hover:underline truncate">
                      {info.value}
                    </a>
                  ) : (
                    <span className="text-white font-semibold font-poppins truncate">{info.value}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Quick CTAs */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-skin text-white font-bold font-poppins text-xs tracking-wider uppercase shadow-lg shadow-skin/30 hover:scale-102 transition-all cursor-pointer"
              >
                <span>HIRE ME / CONTACT</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://pro.fiverr.com/users/venomdesigne613/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#202020] hover:bg-[#282828] text-zinc-300 hover:text-white font-bold font-poppins text-xs tracking-wider uppercase border border-zinc-700 transition-colors"
              >
                <span>FIVERR PRO PROFILE</span>
                <ExternalLink className="w-3.5 h-3.5 text-skin" />
              </a>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white font-bold font-poppins text-xs tracking-wider uppercase border border-zinc-800 transition-colors"
              >
                <span>VIEW PROJECTS</span>
              </Link>
            </div>
          </div>

          {/* Right: Counter Metric Cards */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {statCards.map((stat) => (
              <div
                key={stat.label}
                className="p-5 rounded-3xl bg-[#181818] border border-zinc-800 shadow-xl hover:border-skin/70 transition-all flex flex-col justify-between"
              >
                <div className="text-3xl sm:text-4xl font-black font-poppins text-skin mb-2 tracking-tight">
                  {stat.count}
                </div>
                <div>
                  <h4 className="text-xs font-bold font-poppins text-white uppercase tracking-wider mb-1">
                    {stat.label}
                  </h4>
                  <p className="text-[11px] text-zinc-400 font-sans leading-tight">{stat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Interactive D3 Radar Chart */}
        <div className="mb-20">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold font-poppins text-white uppercase flex items-center justify-center gap-2">
              <Terminal className="w-6 h-6 text-skin" /> TECHNICAL PROFICIENCY RADAR
            </h3>
            <p className="text-xs text-zinc-400 font-sans mt-1">
              Interactive visualization comparing technical expertise across Frontend, Backend, Databases, Discord Bots, and Sales Engineering.
            </p>
          </div>
          <D3RadarChart />
        </div>

        {/* Section 3: Work Experience Timeline */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold font-poppins text-white uppercase flex items-center justify-center gap-2">
              <Briefcase className="w-6 h-6 text-skin" /> WORK EXPERIENCE
            </h3>
            <p className="text-xs text-zinc-400 font-sans mt-1">
              Career trajectory across full-stack engineering, B2B sales automation, and enterprise systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="bg-[#181818] border border-zinc-800 rounded-3xl p-6 shadow-xl hover:border-zinc-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full bg-skin/10 text-skin text-[10px] font-mono font-bold border border-skin/20">
                      {exp.period}
                    </span>
                    {exp.link && (
                      <a
                        href={exp.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-zinc-400 hover:text-skin flex items-center gap-1 font-poppins"
                      >
                        <span>Verified Link</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <h4 className="text-base font-bold font-poppins text-white mb-1">{exp.role}</h4>
                  <div className="text-xs text-skin font-semibold font-poppins mb-3 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{exp.company}</span>
                  </div>
                  <p className="text-xs text-zinc-300 font-sans leading-relaxed">{exp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Education Milestones */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold font-poppins text-white uppercase flex items-center justify-center gap-2">
              <GraduationCap className="w-6 h-6 text-skin" /> ACADEMIC EDUCATION
            </h3>
            <p className="text-xs text-zinc-400 font-sans mt-1">
              Degrees and foundational training in Business, Information Technology, and Computer Science.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {education.map((edu) => (
              <div
                key={edu.id}
                className="bg-[#181818] border border-zinc-800 rounded-3xl p-6 shadow-xl hover:border-zinc-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="px-3 py-1 rounded-full bg-zinc-800 text-skin text-[10px] font-mono font-bold inline-block mb-3">
                    {edu.period}
                  </span>
                  <h4 className="text-sm font-bold font-poppins text-white mb-2">{edu.degree}</h4>
                  <div className="text-xs text-zinc-400 font-semibold font-poppins mb-3 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-skin" />
                    <span>{edu.school}</span>
                  </div>
                  <p className="text-xs text-zinc-300 font-sans leading-relaxed">{edu.desc}</p>
                </div>
                {edu.website && (
                  <div className="pt-4 mt-4 border-t border-zinc-800/60">
                    <a
                      href={edu.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-skin hover:underline font-mono flex items-center gap-1"
                    >
                      <span>{edu.website.replace('https://', '')}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Licenses & Certifications (Verified LinkedIn Learning links) */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold font-poppins text-white uppercase flex items-center justify-center gap-2">
              <Award className="w-6 h-6 text-skin" /> LICENSES & CERTIFICATIONS
            </h3>
            <p className="text-xs text-zinc-400 font-sans mt-1">
              Verified credentials from accredited institutes and industry experts with permanent verification links.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="bg-[#181818] border border-zinc-800 rounded-3xl p-6 shadow-xl hover:border-skin/60 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-zinc-800 text-skin text-[10px] font-mono font-bold">
                      {cert.date}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Verified
                    </span>
                  </div>
                  <h4 className="text-sm font-bold font-poppins text-white mb-1 group-hover:text-skin transition-colors">
                    {cert.title}
                  </h4>
                  <div className="text-xs text-zinc-400 font-sans mb-3">{cert.issuer}</div>
                  <div className="bg-[#121212] p-3 rounded-xl border border-zinc-800/80 text-[11px] text-zinc-300 font-mono mb-4">
                    {cert.skills}
                  </div>
                </div>

                <a
                  href={cert.verificationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-skin font-poppins flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Verify Certificate</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Section 6: Endorsements & Guestbook */}
        <GuestbookSection />
      </div>
    </div>
  );
}
