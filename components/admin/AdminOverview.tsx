'use client';

import React from 'react';
import Link from 'next/link';
import {
  Layers,
  ShoppingBag,
  Server,
  User,
  Star,
  Mail,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';
import { ProfileData, ProjectItem } from '@/lib/portfolioData';

interface AdminOverviewProps {
  profile: ProfileData;
  projects: ProjectItem[];
  productsCount: number;
  servicesCount: number;
  testimonialsCount: number;
  inquiriesCount: number;
  guestbookCount: number;
  onNavigate: (tab: any) => void;
  onSeedDatabase: () => void;
  isSeeding: boolean;
}

export default function AdminOverview({
  profile,
  projects,
  productsCount,
  servicesCount,
  testimonialsCount,
  inquiriesCount,
  guestbookCount,
  onNavigate,
  onSeedDatabase,
  isSeeding,
}: AdminOverviewProps) {
  const statCards = [
    {
      title: 'Projects Showcase',
      value: `${projects.length} Builds`,
      subtitle: `${projects.filter((p) => p.featured).length} Featured on Home`,
      icon: Layers,
      color: 'text-amber-400',
      tab: 'projects',
    },
    {
      title: 'Digital Products',
      value: `${productsCount} Items`,
      subtitle: 'Live Starters & Templates',
      icon: ShoppingBag,
      color: 'text-emerald-400',
      tab: 'products',
    },
    {
      title: 'Services & Plans',
      value: `${servicesCount} Plans`,
      subtitle: 'Fixed Deliverables & Pricing',
      icon: Server,
      color: 'text-blue-400',
      tab: 'services',
    },
    {
      title: 'Client Endorsements',
      value: `${testimonialsCount} Reviews`,
      subtitle: '5-Star Verified Ratings',
      icon: Star,
      color: 'text-purple-400',
      tab: 'testimonials',
    },
    {
      title: 'Contact Inquiries',
      value: `${inquiriesCount} Leads`,
      subtitle: 'Incoming Messages',
      icon: Mail,
      color: 'text-rose-400',
      tab: 'inquiries',
    },
    {
      title: 'Guestbook Entries',
      value: `${guestbookCount} Signatures`,
      subtitle: 'Community Notes',
      icon: BookOpen,
      color: 'text-cyan-400',
      tab: 'guestbook',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-zinc-900 via-[#1a1a1a] to-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-skin/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-skin/10 border border-skin/20 text-xs font-bold font-poppins text-skin mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Executive Admin Studio</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black font-poppins text-white uppercase tracking-tight">
              Welcome Back, <span className="text-skin">{profile.name}</span>
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 font-sans mt-2 max-w-xl">
              Manage your showcase projects, digital products, service packages, and incoming client inquiries in one unified control plane.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onSeedDatabase}
              disabled={isSeeding}
              className="px-6 py-3 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold font-poppins text-xs uppercase tracking-wider transition-all border border-zinc-700/60 flex items-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 text-skin ${isSeeding ? 'animate-spin' : ''}`} />
              <span>{isSeeding ? 'Syncing...' : 'Sync All to Firestore'}</span>
            </button>
            <Link
              href="/"
              target="_blank"
              className="px-6 py-3 rounded-2xl bg-skin hover:opacity-90 text-white font-bold font-poppins text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-skin/30"
            >
              <span>View Portfolio</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              onClick={() => onNavigate(card.tab)}
              className="bg-[#181818] border border-zinc-800 hover:border-skin/60 rounded-3xl p-6 shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold font-poppins text-zinc-400 uppercase tracking-wider">
                  {card.title}
                </span>
                <div className={`p-2.5 rounded-2xl bg-zinc-900 border border-zinc-800 ${card.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-black font-poppins text-white mb-1">
                  {card.value}
                </div>
                <div className="text-xs text-zinc-400 font-sans flex items-center justify-between">
                  <span>{card.subtitle}</span>
                  <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-skin group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Showcase Highlights */}
      <div className="bg-[#181818] border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-800">
          <div>
            <div className="text-xs font-bold font-poppins text-skin uppercase tracking-wider">
              Recent Featured Projects
            </div>
            <h3 className="text-lg font-bold font-poppins text-white uppercase">
              Showcase Live Roster
            </h3>
          </div>
          <button
            onClick={() => onNavigate('projects')}
            className="text-xs font-bold font-poppins text-skin hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Manage All Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {projects.slice(0, 4).map((p) => (
            <div
              key={p.id}
              className="p-4 bg-zinc-900/90 border border-zinc-800 rounded-2xl flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold font-poppins uppercase text-skin block mb-1">
                  {p.categoryLabel || p.category}
                </span>
                <h4 className="text-sm font-bold text-white mb-1 line-clamp-1">{p.title}</h4>
                <p className="text-[11px] text-zinc-400 line-clamp-2">{p.description}</p>
              </div>
              <div className="pt-3 mt-3 border-t border-zinc-800 flex items-center justify-between text-[10px] text-zinc-400 font-mono">
                <span>{p.stages?.length || 0} Stages</span>
                <span className="text-emerald-400 font-bold">● Active</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
