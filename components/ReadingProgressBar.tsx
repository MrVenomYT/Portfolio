'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { BookOpen } from 'lucide-react';

interface ReadingProgressBarProps {
  title?: string;
}

export default function ReadingProgressBar({ title }: ReadingProgressBarProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const [percent, setPercent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (latest) => {
      const rounded = Math.min(100, Math.max(0, Math.round(latest * 100)));
      setPercent(rounded);
      setIsVisible(window.scrollY > 120);
    });
    return () => unsub();
  }, [scrollYProgress]);

  return (
    <>
      {/* Top Fixed Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-[100] h-1.5 bg-zinc-950/80 backdrop-blur-md pointer-events-none">
        <motion.div
          className="h-full bg-gradient-to-r from-skin via-amber-400 to-yellow-300 origin-left shadow-[0_0_14px_rgba(234,179,8,0.8)]"
          style={{ scaleX }}
        />
      </div>

      {/* Floating Sticky Reading Bar Header when scrolled */}
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: isVisible ? 0 : -60, opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-[90] bg-[#141414]/95 backdrop-blur-md border-b border-zinc-800/80 px-4 py-2.5 shadow-2xl flex items-center justify-between"
      >
        <div className="flex items-center gap-3 min-w-0 max-w-3xl">
          <div className="w-7 h-7 rounded-lg bg-skin/10 text-skin flex items-center justify-center shrink-0">
            <BookOpen className="w-4 h-4" />
          </div>
          {title && (
            <span className="text-xs font-bold font-poppins text-zinc-200 truncate hidden sm:block">
              {title}
            </span>
          )}
        </div>

        {/* Live Reading Percentage Indicator */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-24 sm:w-36 h-2 rounded-full bg-zinc-800 overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-skin to-amber-400 transition-all duration-150 rounded-full"
              style={{ width: `${percent}%` }}
            />
          </div>
          <span className="text-xs font-mono font-bold text-skin bg-skin/10 px-2.5 py-0.5 rounded-full border border-skin/20">
            {percent}% READ
          </span>
        </div>
      </motion.div>
    </>
  );
}
