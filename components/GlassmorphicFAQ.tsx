'use client';

import React, { useEffect, useRef, useState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    question: "How do I get started with the platform?",
    answer: "Getting started is simple. Just sign up for an account, choose your workspace plan, and follow our onboarding wizard to set up your first project within minutes."
  },
  {
    question: "Is there a free trial available?",
    answer: "Yes! We offer a 14-day full-featured free trial with no credit card required so you can explore all capabilities before committing."
  },
  {
    question: "Can I integrate with third-party tools?",
    answer: "Our platform offers robust REST APIs, webhooks, and native integrations with popular tools like Slack, GitHub, Jira, and Google Workspace."
  },
  {
    question: "How secure is my data?",
    answer: "We adhere to enterprise-grade security standards, including SOC 2 Type II compliance, end-to-end encryption at rest and in transit, and role-based access control."
  },
  {
    question: "What kind of support do you provide?",
    answer: "All plans include 24/7 email support and access to our community forum. Pro and Enterprise tiers also receive dedicated account managers and priority live chat."
  },
  {
    question: "Can I cancel or change my subscription anytime?",
    answer: "You can upgrade, downgrade, or cancel your subscription at any time directly from your billing dashboard with prorated billing applied automatically."
  },
  {
    question: "Do you offer custom enterprise solutions?",
    answer: "Yes, we work closely with enterprise clients to provide customized SLA agreements, dedicated cloud infrastructure, and custom security audits."
  }
];

export default function GlassmorphicFAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Open 1st item by default after mount
    if (contentRefs.current[0]) {
      contentRefs.current[0].style.maxHeight = `${contentRefs.current[0].scrollHeight}px`;
    }

    const handleResize = () => {
      if (activeIndex !== null && contentRefs.current[activeIndex]) {
        contentRefs.current[activeIndex]!.style.maxHeight = `${contentRefs.current[activeIndex]!.scrollHeight}px`;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeIndex]);

  const toggleAccordion = (index: number) => {
    const nextIndex = activeIndex === index ? null : index;
    setActiveIndex(nextIndex);

    contentRefs.current.forEach((el, idx) => {
      if (!el) return;
      if (idx === nextIndex) {
        el.style.maxHeight = `${el.scrollHeight}px`;
      } else {
        el.style.maxHeight = '0px';
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-20 px-4 relative overflow-hidden font-sans text-white antialiased">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed inset-0 w-full h-full object-cover -z-20 pointer-events-none"
        src="https://strvid.nyc3.digitaloceanspaces.com/motionitems/source/1781983008187-motion_51.mp4"
      />

      {/* Radial Gradient Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle at center, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.8) 100%)'
        }}
      />

      {/* Header Container */}
      <div className="text-center mb-12 relative z-10 max-w-2xl mx-auto transition-all duration-800 ease-out">
        <h2 
          className="font-serif font-bold text-white tracking-tight drop-shadow-sm mb-4"
          style={{ fontSize: 'clamp(32px, 5vw, 42px)', lineHeight: 1.15 }}
        >
          Frequently Asked Questions
        </h2>
        <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-[500px] mx-auto font-sans">
          Everything you need to know about our platform and how it works.
        </p>
      </div>

      {/* FAQ Card Wrapper with Glowing Border */}
      <div className="relative w-full max-w-[700px] mx-auto z-10 transition-all duration-800 delay-200 ease-out">
        {/* Animated Glow Border */}
        <div 
          className="absolute -inset-[4px] rounded-[1.45rem] p-[4px] pointer-events-none"
          style={{
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            filter: 'drop-shadow(0 0 12px rgba(59, 130, 246, 0.6))',
          }}
        >
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250%] h-[250%] animate-spin-slow"
            style={{
              background: 'conic-gradient(from 0deg, transparent 0%, transparent 30%, rgba(96, 165, 250, 0.6) 70%, rgba(37, 99, 235, 1) 100%)',
              animationDuration: '4s',
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite'
            }}
          />
        </div>

        {/* Inner Glassmorphic FAQ Card */}
        <div 
          className="relative z-10 w-full rounded-[1.25rem] overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.02) 100%)',
            backdropFilter: 'blur(32px)',
            WebkitBackdropFilter: 'blur(32px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderTopColor: 'rgba(255, 255, 255, 0.3)',
            borderLeftColor: 'rgba(255, 255, 255, 0.3)',
            boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.8), inset 0 0 20px rgba(255, 255, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
          }}
        >
          {faqData.map((item, index) => {
            const isOpen = activeIndex === index;
            return (
              <div 
                key={index}
                className="transition-all duration-400"
                style={{
                  borderBottom: index !== faqData.length - 1 ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
                  opacity: 1,
                  transform: 'translateY(0)'
                }}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex justify-between items-center py-5 px-6 text-left bg-transparent text-white font-medium cursor-pointer group transition-colors duration-300"
                >
                  <span className="text-[16px] md:text-[22px] group-hover:text-blue-300 transition-colors duration-300">
                    {item.question}
                  </span>

                  {/* Plus/Minus Icon */}
                  <div 
                    className="w-[26px] h-[26px] rounded-full flex items-center justify-center ml-4 shrink-0 transition-colors duration-300"
                    style={{ backgroundColor: isOpen ? '#3b82f6' : '#1f1f1f' }}
                  >
                    <div className="relative w-[10px] h-[10px] flex items-center justify-center">
                      {/* Horizontal line */}
                      <span 
                        className="absolute w-[10px] h-[1.5px] bg-[#60a5fa] transition-all duration-300 ease-in-out"
                        style={{
                          backgroundColor: isOpen ? '#ffffff' : '#60a5fa',
                          transform: isOpen ? 'rotate(180deg)' : 'none'
                        }}
                      />
                      {/* Vertical line */}
                      <span 
                        className="absolute w-[10px] h-[1.5px] bg-[#60a5fa] transition-all duration-300 ease-in-out"
                        style={{
                          backgroundColor: isOpen ? '#ffffff' : '#60a5fa',
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(90deg)',
                          opacity: isOpen ? 0 : 1
                        }}
                      />
                    </div>
                  </div>
                </button>

                {/* Answer Content */}
                <div
                  ref={(el) => { contentRefs.current[index] = el; }}
                  className="overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]"
                  style={{ maxHeight: isOpen ? '200px' : '0px' }}
                >
                  <div className="px-6 pb-6 text-[16px] text-gray-400 leading-relaxed font-sans">
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
