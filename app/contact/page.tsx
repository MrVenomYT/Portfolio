'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2, Github, Linkedin, Sparkles, Loader2, ExternalLink, Globe } from 'lucide-react';
import GuestbookSection from '@/components/GuestbookSection';
import { usePortfolio } from '@/lib/portfolioContext';

export default function ContactPage() {
  const { profile } = usePortfolio();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('success');
        setStatusMessage('Your message has been received! I will get back to you shortly.');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setStatusMessage(data.error || 'Failed to submit. Please try again.');
      }
    } catch {
      setStatus('error');
      setStatusMessage('Network error. Please try again or reach out directly.');
    }
  };

  return (
    <div className="w-full flex flex-col items-center py-10 sm:py-14 px-4 sm:px-6 lg:px-12 min-h-screen">
      <div className="max-w-7xl w-full">
        {/* Page Title */}
        <div className="text-center mb-12 sm:mb-16 relative">
          <div className="title-bg">CONTACT</div>
          <h1 className="text-3xl sm:text-5xl font-black font-poppins text-white uppercase relative z-10 tracking-tight">
            GET IN <span className="text-skin">TOUCH</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 font-sans mt-2 relative z-10 max-w-xl mx-auto">
            Let's Discuss Your Full-Stack Web Application, MERN Architecture, Custom Discord Bot, or Lead Generation Project
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-20">
          {/* Contact Details & Socials */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div>
              <h3 className="text-2xl font-bold font-poppins text-white uppercase mb-3">
                LET'S CONNECT !
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
                Feel free to get in touch with me. I am always open to discussing new projects, creative ideas, full-stack MERN opportunities, sales automation, or custom Discord bots.
              </p>
            </div>

            <div className="space-y-4">
              {/* Email */}
              <div className="flex items-center gap-4 bg-[#181818] border border-zinc-800/80 rounded-2xl p-4">
                <div className="w-10 h-10 rounded-xl bg-skin/10 text-skin flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-poppins block">
                    EMAIL
                  </span>
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-xs sm:text-sm font-semibold font-poppins text-white hover:text-skin transition-colors truncate block"
                  >
                    {profile.email}
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-4 bg-[#181818] border border-zinc-800/80 rounded-2xl p-4">
                <div className="w-10 h-10 rounded-xl bg-skin/10 text-skin flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-poppins block">
                    LOCATION & AVAILABILITY
                  </span>
                  <span className="text-xs sm:text-sm font-semibold font-poppins text-white">
                    {profile.address} (Remote Worldwide)
                  </span>
                </div>
              </div>

              {/* Discord */}
              <div className="flex items-center gap-4 bg-[#181818] border border-zinc-800/80 rounded-2xl p-4">
                <div className="w-10 h-10 rounded-xl bg-skin/10 text-skin flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-poppins block">
                    DISCORD
                  </span>
                  <span className="text-xs sm:text-sm font-semibold font-poppins text-white font-mono">
                    {profile.discord}
                  </span>
                </div>
              </div>
            </div>

            {/* Verified Platforms */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 font-poppins block mb-3">
                PROFESSIONAL PROFILES:
              </span>
              <div className="flex flex-wrap gap-2.5">
                <a
                  href={profile.fiverrPro}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#181818] border border-zinc-800 text-xs font-semibold text-skin font-poppins flex items-center gap-1.5 hover:border-skin/60 transition-colors"
                >
                  <span>Fiverr Pro Profile</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#181818] border border-zinc-800 text-xs font-semibold text-zinc-300 font-poppins flex items-center gap-1.5 hover:text-white hover:border-zinc-700 transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#181818] border border-zinc-800 text-xs font-semibold text-zinc-300 font-poppins flex items-center gap-1.5 hover:text-white hover:border-zinc-700 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                <a
                  href={profile.patreon}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#181818] border border-zinc-800 text-xs font-semibold text-zinc-300 font-poppins flex items-center gap-1.5 hover:text-white hover:border-zinc-700 transition-colors"
                >
                  <span>Patreon</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-[#181818] border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
            <h3 className="text-xl font-bold font-poppins text-white uppercase mb-2">
              SEND DIRECT INQUIRY
            </h3>
            <p className="text-xs text-zinc-400 font-sans mb-6">
              Fill in your details below and your message will be stored permanently and delivered immediately.
            </p>

            {status === 'success' && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 text-xs font-medium flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>{statusMessage}</span>
              </div>
            )}

            {status === 'error' && (
              <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/40 text-red-400 text-xs font-medium flex items-center gap-3">
                <span>{statusMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 font-poppins mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Sarah Connor"
                    className="w-full px-4 py-3.5 rounded-2xl bg-[#202020] border border-zinc-700/60 focus:border-skin focus:outline-none text-xs sm:text-sm text-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 font-poppins mb-1.5">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="sarah@example.com"
                    className="w-full px-4 py-3.5 rounded-2xl bg-[#202020] border border-zinc-700/60 focus:border-skin focus:outline-none text-xs sm:text-sm text-white transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 font-poppins mb-1.5">
                  Subject / Project Scope
                </label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="Full-Stack Web App / Custom Discord Bot / Lead Gen"
                  className="w-full px-4 py-3.5 rounded-2xl bg-[#202020] border border-zinc-700/60 focus:border-skin focus:outline-none text-xs sm:text-sm text-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 font-poppins mb-1.5">
                  Your Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me about your project goals, timelines, and technical requirements..."
                  className="w-full px-4 py-3.5 rounded-2xl bg-[#202020] border border-zinc-700/60 focus:border-skin focus:outline-none text-xs sm:text-sm text-white transition-colors resize-none leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-4 rounded-2xl bg-skin text-white font-bold font-poppins uppercase tracking-wider text-xs flex items-center justify-center gap-2 hover:opacity-90 shadow-lg shadow-skin/30 transition-all cursor-pointer disabled:opacity-60"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Transmitting Message...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Guestbook Section */}
        <GuestbookSection />
      </div>
    </div>
  );
}
