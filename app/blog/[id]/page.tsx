'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Bookmark,
  Check,
  Copy,
  Tag,
  User,
  BookOpen,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { blogPostsData } from '@/lib/blogPosts';
import ReadingProgressBar from '@/components/ReadingProgressBar';

export default function BlogPostDetailPage() {
  const params = useParams();
  const postId = params?.id as string;

  const post = blogPostsData.find((p) => p.id === postId);

  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);
  const [bookmarked, setBookmarked] = useState(false);
  const [shared, setShared] = useState(false);

  if (!post) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 bg-[#121212] text-white">
        <h1 className="text-4xl font-bold font-poppins text-skin mb-3">Article Not Found</h1>
        <p className="text-xs text-zinc-400 mb-6">The requested blog post could not be located.</p>
        <Link
          href="/blog"
          className="px-6 py-2.5 rounded-full bg-skin text-black font-bold font-poppins text-xs uppercase flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>
      </div>
    );
  }

  const handleCopyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIndex(idx);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  // Find related posts
  const relatedPosts = blogPostsData.filter((p) => p.id !== post.id).slice(0, 2);

  return (
    <div className="w-full min-h-screen flex flex-col items-center py-8 sm:py-12 px-4 sm:px-6 lg:px-12 relative text-white">
      {/* Scroll-based Reading Progress Bar */}
      <ReadingProgressBar title={post.title} />

      <div className="max-w-4xl w-full">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold font-poppins text-zinc-400 hover:text-skin transition-colors bg-[#181818] px-4 py-2 rounded-full border border-zinc-800"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO ALL ARTICLES</span>
          </Link>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`p-2.5 rounded-full border transition-all text-xs flex items-center gap-1.5 ${
                bookmarked
                  ? 'bg-skin text-black border-skin'
                  : 'bg-[#181818] border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700'
              }`}
              title="Bookmark Article"
            >
              <Bookmark className="w-4 h-4" fill={bookmarked ? 'currentColor' : 'none'} />
            </button>
            <button
              onClick={handleShare}
              className="p-2.5 rounded-full bg-[#181818] border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-all text-xs flex items-center gap-1.5"
              title="Share Article"
            >
              {shared ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Article Meta Header */}
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold font-poppins uppercase tracking-wider bg-skin/10 text-skin border border-skin/20">
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-zinc-400 font-sans">
              <Calendar className="w-3.5 h-3.5 text-skin" /> {post.date}
            </span>
            <span className="text-zinc-600">·</span>
            <span className="flex items-center gap-1 text-xs text-zinc-400 font-sans">
              <Clock className="w-3.5 h-3.5 text-skin" /> {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-poppins text-white leading-tight mb-6 tracking-tight">
            {post.title}
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 font-sans leading-relaxed mb-8 border-l-4 border-skin pl-4 italic bg-zinc-900/40 py-3 rounded-r-xl">
            {post.excerpt}
          </p>

          {/* Author info */}
          <div className="flex items-center justify-between border-t border-b border-zinc-800/80 py-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-800 border border-zinc-700 shrink-0">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div>
                <h4 className="text-sm font-bold font-poppins text-white">{post.author.name}</h4>
                <p className="text-xs text-zinc-400 font-sans">{post.author.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <BookOpen className="w-4 h-4 text-skin" />
              <span>Scroll to read</span>
            </div>
          </div>
        </header>

        {/* Cover Image */}
        <div className="w-full h-64 sm:h-96 rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 mb-12 shadow-2xl relative">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        </div>

        {/* Article Body Content */}
        <article className="prose prose-invert max-w-none space-y-8 font-sans text-sm sm:text-base leading-relaxed text-zinc-300">
          {/* Introduction */}
          <div className="bg-[#181818] border border-zinc-800/80 rounded-2xl p-6 sm:p-8 shadow-xl">
            <h2 className="text-xl font-bold font-poppins text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-skin" />
              Overview & Context
            </h2>
            <p className="text-zinc-300 leading-relaxed font-sans">{post.content.intro}</p>
          </div>

          {/* Main Sections */}
          {post.content.sections.map((section, idx) => (
            <section
              key={idx}
              className="bg-[#181818] border border-zinc-800/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-4"
            >
              <h2 className="text-xl sm:text-2xl font-bold font-poppins text-white leading-snug">
                {section.heading}
              </h2>
              <p className="text-zinc-300 leading-relaxed font-sans">{section.body}</p>

              {/* Code Snippet Box */}
              {section.codeSnippet && (
                <div className="mt-4 rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800">
                  <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-zinc-800 text-xs font-mono text-zinc-400">
                    <span className="uppercase">{section.codeSnippet.language}</span>
                    <button
                      onClick={() => handleCopyCode(section.codeSnippet!.code, idx)}
                      className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
                    >
                      {copiedCodeIndex === idx ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-green-400" />
                          <span className="text-green-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 text-xs sm:text-sm font-mono overflow-x-auto text-amber-200 leading-relaxed">
                    <code>{section.codeSnippet.code}</code>
                  </pre>
                </div>
              )}

              {/* Key Takeaways Callout */}
              {section.keyTakeaways && section.keyTakeaways.length > 0 && (
                <div className="mt-4 p-4 rounded-xl bg-skin/5 border border-skin/20">
                  <h4 className="text-xs font-bold font-poppins uppercase tracking-wider text-skin mb-2 flex items-center gap-1.5">
                    <Check className="w-4 h-4" /> Key Takeaways
                  </h4>
                  <ul className="space-y-1.5 text-xs text-zinc-300 list-disc list-inside">
                    {section.keyTakeaways.map((takeaway, tIdx) => (
                      <li key={tIdx}>{takeaway}</li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          ))}

          {/* Conclusion */}
          <div className="bg-[#181818] border border-zinc-800/80 rounded-2xl p-6 sm:p-8 shadow-xl border-l-4 border-l-skin">
            <h2 className="text-xl font-bold font-poppins text-white mb-3">Conclusion</h2>
            <p className="text-zinc-300 leading-relaxed font-sans">{post.content.conclusion}</p>
          </div>
        </article>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 my-10 pt-6 border-t border-zinc-800">
          <Tag className="w-4 h-4 text-skin" />
          <span className="text-xs font-bold font-poppins uppercase text-zinc-400 mr-2">Tags:</span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 font-poppins"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Author Bio Box */}
        <div className="bg-[#181818] border border-zinc-800 rounded-2xl p-6 sm:p-8 mb-12 flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-xl">
          <div className="w-20 h-20 rounded-2xl overflow-hidden bg-zinc-800 border border-zinc-700 shrink-0">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <div>
            <span className="text-[10px] font-bold font-poppins uppercase tracking-wider text-skin">
              WRITTEN BY
            </span>
            <h3 className="text-lg font-bold font-poppins text-white mb-1">{post.author.name}</h3>
            <p className="text-xs text-zinc-400 font-sans leading-relaxed mb-4">
              Full-Stack Developer, MERN Stack Specialist, Discord.js Bot Architect, and Lead Generation Engineer based in Lahore, Pakistan.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-xs font-bold font-poppins text-skin hover:underline"
            >
              <span>GET IN TOUCH FOR PROJECTS</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div className="mb-12">
            <h3 className="text-xl font-bold font-poppins text-white uppercase mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-skin" />
              Related Articles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/blog/${rel.id}`}
                  className="bg-[#181818] border border-zinc-800 rounded-2xl p-5 hover:border-skin transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold font-poppins uppercase text-skin block mb-2">
                      {rel.category}
                    </span>
                    <h4 className="text-sm font-bold font-poppins text-white group-hover:text-skin transition-colors line-clamp-2 mb-2">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-zinc-400 line-clamp-2 font-sans mb-4">{rel.excerpt}</p>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-zinc-500 font-sans pt-2 border-t border-zinc-800/60">
                    <span>{rel.readTime}</span>
                    <span className="text-skin font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Read <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
