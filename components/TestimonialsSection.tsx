'use client';

import React, { useEffect } from 'react';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
}

const row1Testimonials: Testimonial[] = [
  {
    quote: "The speed and architectural clarity delivered transformed our core platform. We scaled 10x without breaking a sweat.",
    name: "Sarah Jenkins",
    role: "VP of Engineering",
    company: "TechFlow",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
  },
  {
    quote: "An absolute masterclass in full-stack execution. Every component was engineered with pristine precision.",
    name: "Michael Chang",
    role: "Founder & CEO",
    company: "ApexScale",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  },
  {
    quote: "The glassmorphic UI and fluid micro-interactions blew our stakeholders away. Truly world-class frontend engineering.",
    name: "Emily Rodriguez",
    role: "Product Lead",
    company: "Veloce",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  },
  {
    quote: "Exceptional database design and blazingly fast API response times. Our latency dropped by 65% immediately.",
    name: "David Kim",
    role: "Lead Architect",
    company: "CloudScale",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
  },
  {
    quote: "The attention to typography, spacing, and accessibility standards is rare to find. Exceeded every expectation.",
    name: "Jessica Taylor",
    role: "Head of Design",
    company: "PixelCraft",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
  },
];

const row2Testimonials: Testimonial[] = [
  {
    quote: "Working together was seamless. Clean code, robust test coverage, and immaculate documentation throughout.",
    name: "Alex Rivera",
    role: "CTO",
    company: "QuantumDev",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
  },
  {
    quote: "The custom Discord bot and automated workflow systems built for us saved our community management team countless hours.",
    name: "Rachel Green",
    role: "Senior PM",
    company: "InnovateX",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80",
  },
  {
    quote: "Outstanding problem-solving skills and incredible responsiveness. Delivered a complex SaaS product ahead of schedule.",
    name: "Marcus Vance",
    role: "Founder",
    company: "ByteCraft",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
  },
  {
    quote: "The UI animations and layout transitions feel like native desktop software. Phenomenal engineering quality.",
    name: "Sofia Martinez",
    role: "Lead Engineer",
    company: "Nexa",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
  },
  {
    quote: "A rare blend of high-end design sensibility and rigorous backend systems architecture. Absolute pleasure to collaborate with.",
    name: "Liam O'Connor",
    role: "Director of Tech",
    company: "AlphaPulse",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
  },
];

export default function TestimonialsSection() {
  useEffect(() => {
    const tracks = document.querySelectorAll('.carousel-track');
    tracks.forEach((track) => {
      const handleTouchStart = () => {
        (track as HTMLElement).style.animationPlayState = 'paused';
      };
      const handleTouchEnd = () => {
        (track as HTMLElement).style.animationPlayState = 'running';
      };

      track.addEventListener('touchstart', handleTouchStart, { passive: true });
      track.addEventListener('touchend', handleTouchEnd, { passive: true });

      return () => {
        track.removeEventListener('touchstart', handleTouchStart);
        track.removeEventListener('touchend', handleTouchEnd);
      };
    });
  }, []);

  const renderCard = (t: Testimonial, index: number) => (
    <div key={index} className="card-wrapper flex shrink-0 px-[12px]">
      <div className="w-[320px] sm:w-[380px] bg-[#181818] border border-zinc-800 rounded-[24px] p-8 md:p-10 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-skin/60 flex flex-col justify-between">
        <div>
          {/* Quote SVG */}
          <svg
            aria-hidden="true"
            className="w-10 h-10 text-skin opacity-90 mb-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.998v10h-9.998z" />
          </svg>
          <p className="text-zinc-300 text-[1.1rem] font-medium leading-relaxed mb-8">
            &ldquo;{t.quote}&rdquo;
          </p>
        </div>
        <div className="flex items-center gap-4 pt-4 border-t border-zinc-800">
          <img
            src={t.avatar}
            alt={t.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-skin/40 shadow-sm"
            referrerPolicy="no-referrer"
          />
          <div>
            <h4 className="font-bold text-white text-base">{t.name}</h4>
            <p className="text-sm text-zinc-400 font-medium">
              {t.role}, <span className="text-skin font-semibold">{t.company}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="w-full bg-[#111111] py-20 md:py-28 overflow-hidden antialiased selection:bg-skin selection:text-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        {/* Top Pill (Trust Badge) */}
        <div className="inline-flex items-center px-1.5 py-1.5 pr-5 rounded-full bg-[#181818] border border-zinc-800 shadow-xl transition-transform duration-300 hover:scale-105 cursor-pointer mb-8">
          <div className="w-8 h-8 rounded-full bg-skin flex items-center justify-center shadow-skin mr-3">
            <svg
              aria-hidden="true"
              className="w-4 h-4 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <span className="text-white text-sm md:text-base font-medium tracking-wide">
            Trusted by industry leaders worldwide
          </span>
        </div>

        {/* Main Heading */}
        <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-tight text-white max-w-4xl mx-auto font-poppins">
          Loved by engineers, founders, and product teams
        </h2>
      </div>

      {/* Carousel Container with Mask Image */}
      <div
        className="w-full pb-8"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        }}
      >
        {/* Row 1: Marquee Left */}
        <div className="flex overflow-hidden mb-6">
          <div className="carousel-track flex w-max animate-marquee-left hover:[animation-play-state:paused]">
            {row1Testimonials.map((t, i) => renderCard(t, i))}
            {row1Testimonials.map((t, i) => renderCard(t, i + 100))}
          </div>
        </div>

        {/* Row 2: Marquee Right */}
        <div className="flex overflow-hidden">
          <div className="carousel-track flex w-max animate-marquee-right hover:[animation-play-state:paused]">
            {row2Testimonials.map((t, i) => renderCard(t, i))}
            {row2Testimonials.map((t, i) => renderCard(t, i + 100))}
          </div>
        </div>
      </div>
    </section>
  );
}
