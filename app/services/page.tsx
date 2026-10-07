'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Code2,
  Bot,
  Database,
  Layout,
  Zap,
  Shield,
  Server,
  Terminal,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Layers,
  Cpu,
  ChevronDown,
  ChevronUp,
  Clock,
  DollarSign,
  Tag,
  Check,
} from 'lucide-react';
import { usePortfolio } from '@/lib/portfolioContext';

export default function ServicesPage() {
  const { services, faqs } = usePortfolio();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="w-full flex flex-col items-center py-10 sm:py-14 px-4 sm:px-6 lg:px-12 min-h-screen">
      <div className="max-w-7xl w-full">
        {/* Page Title */}
        <div className="text-center mb-12 sm:mb-16 relative">
          <div className="title-bg">SERVICES</div>
          <h1 className="text-3xl sm:text-5xl font-black font-poppins text-white uppercase relative z-10 tracking-tight">
            SERVICES & <span className="text-skin">SOLUTIONS</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 font-sans mt-2 relative z-10 max-w-xl mx-auto">
            High-Performance Web Engineering, Bespoke UI/UX Design, Custom Admin Dashboards & Database Architecture
          </p>
        </div>

        {/* Section 1: Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-[#181818] border border-zinc-800/90 hover:border-skin/70 rounded-3xl p-6 sm:p-8 shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-skin/10 text-skin flex items-center justify-center font-bold">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-skin/10 text-skin border border-skin/20">
                      {service.badge || 'Professional'}
                    </span>
                    <span className="text-[11px] text-zinc-400 font-sans">{service.category}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold font-poppins text-white mb-2 group-hover:text-skin transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Price & Turnaround Bar */}
                <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-[#141414] border border-zinc-800/80 mb-6">
                  <div className="flex items-center gap-1.5 text-xs text-zinc-300">
                    <Tag className="w-3.5 h-3.5 text-skin" />
                    <span>Starts at:</span>
                    <strong className="text-skin font-poppins font-bold">{service.startingPrice}</strong>
                  </div>
                  <div className="h-4 w-px bg-zinc-800" />
                  <div className="flex items-center gap-1.5 text-xs text-zinc-300">
                    <Clock className="w-3.5 h-3.5 text-skin" />
                    <span>Timeline:</span>
                    <strong className="text-white font-poppins">{service.deliveryTime}</strong>
                  </div>
                </div>

                {/* Deliverables */}
                <div className="mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-poppins mb-3">
                    Key Deliverables:
                  </h4>
                  <ul className="space-y-2">
                    {service.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-zinc-300 font-sans">
                        <Check className="w-3.5 h-3.5 text-skin shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div className="mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-poppins mb-2">
                    Tech Stack:
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {service.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] px-2.5 py-0.5 rounded-lg bg-zinc-800/80 text-zinc-300 font-poppins border border-zinc-700/50"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-zinc-800 flex items-center justify-between gap-4">
                <Link
                  href="/contact"
                  className="flex-1 py-3 px-4 rounded-xl bg-skin hover:opacity-90 text-white font-bold font-poppins text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-skin/30 transition-all cursor-pointer"
                >
                  <span>Request Proposal</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="https://pro.fiverr.com/users/venomdesigne613/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-zinc-200 transition-colors"
                >
                  Order on Fiverr Pro
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Section 2: Frequently Asked Questions */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold font-poppins text-white uppercase flex items-center justify-center gap-2">
              <Shield className="w-6 h-6 text-skin" /> FREQUENTLY ASKED QUESTIONS
            </h3>
            <p className="text-xs text-zinc-400 font-sans mt-1">
              Everything you need to know about working together, pricing, deliverables, and commercial rights.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-[#181818] border border-zinc-800 rounded-2xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-5 text-left text-sm font-bold font-poppins text-white hover:text-skin transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-skin shrink-0 ml-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0 ml-4" />
                    )}
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

        {/* Bottom CTA Banner */}
        <div className="bg-[#181818] border border-zinc-800 rounded-3xl p-8 sm:p-10 text-center relative overflow-hidden">
          <h2 className="text-2xl sm:text-3xl font-black font-poppins text-white uppercase mb-3">
            Have a custom project or bot idea in mind?
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-sans max-w-xl mx-auto mb-6">
            Let's discuss your requirements and turn your vision into a scalable, high-performance web product.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-full bg-skin text-white font-bold font-poppins text-xs tracking-wider uppercase shadow-lg shadow-skin/30 hover:scale-105 transition-all cursor-pointer"
            >
              Start a Conversation
            </Link>
            <Link
              href="/products"
              className="px-8 py-3.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 font-bold font-poppins text-xs tracking-wider uppercase transition-colors"
            >
              Browse Digital Store
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
