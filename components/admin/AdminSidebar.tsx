'use client';

import React from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  Layers,
  ShoppingBag,
  Server,
  User,
  Sliders,
  Briefcase,
  GraduationCap,
  Award,
  Star,
  HelpCircle,
  Mail,
  BookOpen,
  LogOut,
  ExternalLink,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  LucideIcon,
} from 'lucide-react';

export type AdminTab =
  | 'overview'
  | 'projects'
  | 'products'
  | 'services'
  | 'profile'
  | 'skills'
  | 'experience'
  | 'education'
  | 'certifications'
  | 'testimonials'
  | 'faqs'
  | 'inquiries'
  | 'guestbook';

interface NavItem {
  id: AdminTab;
  label: string;
  icon: LucideIcon;
  count?: number;
  alert?: boolean;
}

interface NavGroup {
  group: string;
  items: NavItem[];
}

interface AdminSidebarProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  counts: {
    projects: number;
    products: number;
    services: number;
    experience: number;
    education: number;
    certifications: number;
    testimonials: number;
    faqs: number;
    inquiries: number;
    guestbook: number;
  };
  onSignOut: () => void;
  onSeedDatabase: () => void;
  isSeeding: boolean;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export default function AdminSidebar({
  activeTab,
  setActiveTab,
  counts,
  onSignOut,
  onSeedDatabase,
  isSeeding,
  collapsed,
  setCollapsed,
}: AdminSidebarProps) {
  const navGroups: NavGroup[] = [
    {
      group: 'Core Showcase',
      items: [
        { id: 'overview', label: 'Overview & Stats', icon: LayoutDashboard },
        { id: 'projects', label: 'Projects Showcase', icon: Layers, count: counts.projects },
        { id: 'products', label: 'Digital Products', icon: ShoppingBag, count: counts.products },
        { id: 'services', label: 'Services & Plans', icon: Server, count: counts.services },
      ],
    },
    {
      group: 'Profile & Resume',
      items: [
        { id: 'profile', label: 'Profile & Bio Info', icon: User },
        { id: 'skills', label: 'Radar Skills', icon: Sliders },
        { id: 'experience', label: 'Work Experience', icon: Briefcase, count: counts.experience },
        { id: 'education', label: 'Education Degrees', icon: GraduationCap, count: counts.education },
        { id: 'certifications', label: 'Certifications', icon: Award, count: counts.certifications },
      ],
    },
    {
      group: 'Marketing & Reviews',
      items: [
        { id: 'testimonials', label: 'Client Testimonials', icon: Star, count: counts.testimonials },
        { id: 'faqs', label: 'FAQs Accordion', icon: HelpCircle, count: counts.faqs },
      ],
    },
    {
      group: 'Visitor Communications',
      items: [
        { id: 'inquiries', label: 'Contact Inquiries', icon: Mail, count: counts.inquiries, alert: counts.inquiries > 0 },
        { id: 'guestbook', label: 'Guestbook Entries', icon: BookOpen, count: counts.guestbook },
      ],
    },
  ];

  return (
    <aside
      className={`h-screen sticky top-0 flex flex-col justify-between bg-[#141414] border-r border-zinc-800/90 z-30 transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-72'
      } shrink-0 select-none`}
    >
      {/* Top Header */}
      <div>
        <div className="p-4 flex items-center justify-between border-b border-zinc-800/80">
          {!collapsed && (
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-skin to-amber-500 flex items-center justify-center text-white font-black font-poppins text-lg shadow-lg shadow-skin/20 shrink-0">
                MH
              </div>
              <div className="truncate">
                <div className="text-sm font-bold font-poppins text-white flex items-center gap-1.5 truncate">
                  <span>Hasil Studio</span>
                  <ShieldCheck className="w-4 h-4 text-skin shrink-0" />
                </div>
                <div className="text-[10px] text-zinc-400 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Admin Mode</span>
                </div>
              </div>
            </div>
          )}

          {collapsed && (
            <div className="mx-auto w-10 h-10 rounded-2xl bg-gradient-to-tr from-skin to-amber-500 flex items-center justify-center text-white font-black font-poppins text-lg">
              MH
            </div>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-xl bg-zinc-800/60 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation List */}
        <div className="p-3 space-y-5 overflow-y-auto max-h-[calc(100vh-210px)] custom-scrollbar">
          {navGroups.map((group) => (
            <div key={group.group} className="space-y-1">
              {!collapsed && (
                <div className="px-3 text-[10px] font-bold font-poppins uppercase tracking-wider text-zinc-400 mb-1.5">
                  {group.group}
                </div>
              )}
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold font-poppins transition-all cursor-pointer ${
                      isActive
                        ? 'bg-skin text-white shadow-lg shadow-skin/25 font-bold'
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                    } ${collapsed ? 'justify-center px-0' : 'justify-between'}`}
                    title={item.label}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-zinc-400'}`} />
                      {!collapsed && <span className="truncate">{item.label}</span>}
                    </div>

                    {!collapsed && item.count !== undefined && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                          isActive
                            ? 'bg-black/30 text-white'
                            : item.alert
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-zinc-800 text-zinc-400'
                        }`}
                      >
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Sider Footer Controls */}
      <div className="p-3 border-t border-zinc-800/80 bg-[#111111]/80 space-y-2">
        <button
          onClick={onSeedDatabase}
          disabled={isSeeding}
          className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold font-poppins bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 transition-colors border border-zinc-700/50 cursor-pointer disabled:opacity-50 ${
            collapsed ? 'justify-center px-0' : ''
          }`}
          title="Push & Sync All Data to Firestore"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-skin ${isSeeding ? 'animate-spin' : ''}`} />
          {!collapsed && <span>{isSeeding ? 'Syncing...' : 'Sync to Firestore'}</span>}
        </button>

        <Link
          href="/"
          target="_blank"
          className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold font-poppins bg-zinc-900 hover:bg-zinc-800 text-zinc-300 transition-colors border border-zinc-800 ${
            collapsed ? 'justify-center px-0' : ''
          }`}
          title="Open Live Portfolio"
        >
          <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
          {!collapsed && <span>View Live Site</span>}
        </Link>

        <button
          onClick={onSignOut}
          className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold font-poppins text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer ${
            collapsed ? 'justify-center px-0' : ''
          }`}
          title="Sign Out of Admin"
        >
          <LogOut className="w-3.5 h-3.5" />
          {!collapsed && <span>Log Out</span>}
        </button>
      </div>
    </aside>
  );
}
