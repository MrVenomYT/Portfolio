'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, User, Tag, ArrowRight, Search, BookOpen, Clock } from 'lucide-react';

const blogPosts = [
  {
    id: 'mern-architecture-2026',
    title: 'Architecting Scalable MERN Stack Applications for Production in 2026',
    excerpt: 'Deep-dive into clean controller patterns, MongoDB schema indexing strategies, JWT refresh token rotation, and Next.js App Router hybrid rendering.',
    category: 'Full-Stack',
    date: 'Oct 04, 2026',
    readTime: '6 min read',
    image: '/img/blog/blog-post-1.jpg',
    tags: ['React', 'Node.js', 'MongoDB', 'Architecture'],
  },
  {
    id: 'discord-bot-sharding',
    title: 'Scaling Discord.js v14 Bots: Gateway Sharding, FFmpeg Audio, and WebSockets',
    excerpt: 'How to build high-concurrency Discord bots with low-memory footprint, thread-safe voice connections, slash command autocompletion, and WebSockets.',
    category: 'Bot Dev',
    date: 'Sep 28, 2026',
    readTime: '8 min read',
    image: '/img/blog/blog-post-2.jpg',
    tags: ['Discord.js', 'WebSockets', 'Node.js', 'Automation'],
  },
  {
    id: 'nextjs-performance-tuning',
    title: 'Optimizing Next.js Web App Core Web Vitals to Reach Perfect 100 Scores',
    excerpt: 'Actionable techniques for reducing Total Blocking Time (TBT), dynamic asset streaming, responsive image decoding, and caching strategies on Vercel Edge.',
    category: 'Frontend',
    date: 'Sep 15, 2026',
    readTime: '5 min read',
    image: '/img/blog/blog-post-3.jpg',
    tags: ['Next.js', 'Performance', 'Lighthouse', 'Vercel'],
  },
  {
    id: 'python-scraping-pipelines',
    title: 'Building Resilient Automated Web Scraping & Data Extraction Pipelines in Python',
    excerpt: 'Handling dynamic JavaScript SPAs with BeautifulSoup, header spoofing, proxy rotation, and syncing ingested data into MongoDB with automated cron jobs.',
    category: 'Python',
    date: 'Aug 29, 2026',
    readTime: '7 min read',
    image: '/img/blog/blog-post-4.jpg',
    tags: ['Python', 'BeautifulSoup', 'MongoDB', 'Automation'],
  },
  {
    id: 'rest-api-security-guide',
    title: 'Defensive REST API Security: Rate Limiting, CORS, and Sanitizing Injection Vectors',
    excerpt: 'Comprehensive blueprint for locking down Express & Node.js backends against NoSQL injections, CSRF attacks, and API key exposure in production.',
    category: 'Security',
    date: 'Aug 14, 2026',
    readTime: '9 min read',
    image: '/img/blog/blog-post-5.jpg',
    tags: ['Security', 'Express', 'JWT', 'DevOps'],
  },
  {
    id: 'd3-charts-react-integration',
    title: 'Crafting Interactive D3.js Radar & Bar Charts Inside React & Next.js Components',
    excerpt: 'A seamless guide on combining D3 mathematical scales and SVG curves with React component state lifecycles and Tailwind CSS theming.',
    category: 'Data Viz',
    date: 'Jul 30, 2026',
    readTime: '5 min read',
    image: '/img/blog/blog-post-6.jpg',
    tags: ['D3.js', 'React', 'SVG', 'Frontend'],
  },
];

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Full-Stack', 'Bot Dev', 'Frontend', 'Python', 'Security', 'Data Viz'];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = activeCategory === 'All' || post.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="w-full flex flex-col items-center py-12 px-6 lg:px-16 min-h-screen">
      <div className="max-w-6xl w-full">
        {/* Page Title */}
        <div className="text-center mb-12 relative">
          <div className="title-bg">POSTS</div>
          <h1 className="text-4xl sm:text-5xl font-black font-poppins text-white uppercase relative z-10">
            MY <span>BLOG</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 font-sans mt-2 relative z-10">
            Articles & Case Studies on MERN Stack, Discord Bot Engineering & Web Performance
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12 bg-[#181818] border border-zinc-800 p-4 rounded-2xl shadow-xl">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search articles & topics..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 text-xs font-sans focus:outline-none focus:border-skin"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto justify-start md:justify-end">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-poppins transition-all ${
                  activeCategory === cat
                    ? 'bg-skin text-white shadow-md'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Post Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-[#181818] border border-zinc-800 rounded-2xl overflow-hidden shadow-xl hover:border-skin transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
            >
              <div>
                {/* Post Cover Image */}
                <div className="relative w-full h-48 bg-zinc-900 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-108"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold font-poppins uppercase tracking-wider bg-black/70 backdrop-blur-md border border-white/10 text-skin">
                    {post.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-3 text-[11px] text-zinc-400 font-sans mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-skin" /> {post.date}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-skin" /> {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-base font-bold font-poppins text-white mb-2 group-hover:text-skin transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-zinc-400 font-sans leading-relaxed mb-4">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 font-poppins"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Read Action */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => alert(`Article '${post.title}' is available in full dev notes.`)}
                  className="w-full py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-skin flex items-center justify-center gap-2 group-hover:bg-skin group-hover:text-white transition-all"
                >
                  <span>READ FULL ARTICLE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
