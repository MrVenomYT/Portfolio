'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function ProjectCardSkeleton() {
  return (
    <div className="bg-[#181818] border border-zinc-800/80 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between relative">
      <div>
        {/* Aspect ratio banner skeleton with shimmer */}
        <div className="relative w-full aspect-[16/10] bg-zinc-850 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-800/50 via-zinc-700/30 to-zinc-800/50 animate-pulse" />
          {/* Badge placeholder */}
          <div className="absolute top-3 left-3 w-20 h-5 rounded-full bg-zinc-700/60 animate-pulse border border-zinc-700/40" />
        </div>

        {/* Card Content Skeleton */}
        <div className="p-5 sm:p-6 space-y-3">
          {/* Title */}
          <div className="w-3/4 h-5 rounded-lg bg-zinc-800 animate-pulse" />

          {/* Description lines */}
          <div className="space-y-2 pt-1">
            <div className="w-full h-3 rounded bg-zinc-800/70 animate-pulse" />
            <div className="w-5/6 h-3 rounded bg-zinc-800/70 animate-pulse" />
          </div>

          {/* Tech tags skeleton */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            <div className="w-14 h-5 rounded-md bg-zinc-800 animate-pulse" />
            <div className="w-16 h-5 rounded-md bg-zinc-800 animate-pulse" />
            <div className="w-12 h-5 rounded-md bg-zinc-800 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Footer skeleton */}
      <div className="px-5 sm:px-6 pb-5 pt-3 flex items-center justify-between border-t border-zinc-800/60 mt-auto">
        <div className="w-28 h-4 rounded bg-zinc-800/90 animate-pulse" />
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-zinc-800 animate-pulse" />
          <div className="w-7 h-7 rounded-lg bg-zinc-800 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

interface ProjectsGridSkeletonProps {
  count?: number;
}

const skeletonContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.15,
    },
  },
};

const skeletonItemVariants = {
  hidden: { opacity: 0, y: 15, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.25, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.15 },
  },
};

export default function ProjectsGridSkeleton({ count = 6 }: ProjectsGridSkeletonProps) {
  return (
    <motion.div
      variants={skeletonContainerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16"
      aria-label="Loading projects"
    >
      {Array.from({ length: count }).map((_, i) => (
        <motion.div key={`skeleton-${i}`} variants={skeletonItemVariants}>
          <ProjectCardSkeleton />
        </motion.div>
      ))}
    </motion.div>
  );
}
