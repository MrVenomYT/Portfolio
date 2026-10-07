'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Sparkles, ExternalLink, ArrowRight, Check, Code2, Layers, ShieldCheck, Download, Tag } from 'lucide-react';
import { usePortfolio } from '@/lib/portfolioContext';

export default function ProductsPage() {
  const { products } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = ['all', 'Web Apps', 'Source Code', 'UI Kits', 'Templates'];

  const filteredProducts = products.filter((p) => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  return (
    <div className="w-full flex flex-col items-center py-10 sm:py-14 px-4 sm:px-6 lg:px-12 min-h-screen">
      <div className="max-w-7xl w-full">
        {/* Page Header */}
        <div className="text-center mb-10 sm:mb-14 relative">
          <div className="title-bg">STORE</div>
          <h1 className="text-3xl sm:text-5xl font-black font-poppins text-white uppercase relative z-10 tracking-tight">
            DIGITAL <span className="text-skin">PRODUCTS</span> & STARTERS
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 font-sans mt-2 relative z-10 max-w-xl mx-auto">
            Production-ready full-stack templates, SaaS starters, UI kits, and booking engines with full commercial ownership.
          </p>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 sm:mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-semibold font-poppins transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-skin text-white shadow-lg shadow-skin/30 scale-102'
                  : 'bg-[#181818] border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              {cat === 'all' ? `All Products (${products.length})` : cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-[#181818] border border-zinc-800/90 hover:border-skin/70 rounded-3xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
            >
              <div>
                {/* Image / Header */}
                <div className="relative aspect-[16/10] bg-zinc-900 overflow-hidden">
                  <img
                    src={product.image || '/img/projects/project-1.jpg'}
                    alt={product.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-70" />

                  {/* Price Tag */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-xl bg-skin font-black font-poppins text-white text-sm shadow-md">
                      {product.price}
                    </span>
                    {product.badge && (
                      <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold font-poppins text-white border border-white/20">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-bold font-poppins uppercase tracking-wider bg-black/80 backdrop-blur-md text-zinc-300 border border-white/10">
                    {product.category}
                  </span>
                </div>

                {/* Details */}
                <div className="p-5 sm:p-6">
                  <h3 className="text-base sm:text-lg font-bold font-poppins text-white mb-2 group-hover:text-skin transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Features list */}
                  <div className="space-y-1.5 mb-4">
                    {product.features?.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-zinc-300 font-sans">
                        <Check className="w-3.5 h-3.5 text-skin shrink-0" />
                        <span className="line-clamp-1">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 sm:p-6 pt-0 flex flex-col sm:flex-row items-center gap-2.5">
                <a
                  href={product.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-zinc-200 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Live Demo</span>
                </a>
                <a
                  href={product.purchaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-skin hover:opacity-90 text-xs font-bold font-poppins uppercase tracking-wider text-white transition-opacity shadow-md"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Get on Fiverr Pro</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Commercial License Banner */}
        <div className="bg-[#181818] border border-zinc-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-skin/10 text-skin flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold font-poppins text-white">100% Full Source Code & Commercial Rights</h3>
              <p className="text-xs text-zinc-400 font-sans mt-0.5">
                All digital templates and SaaS starters include full source code, lifetime updates, and zero recurring royalties.
              </p>
            </div>
          </div>
          <a
            href="https://pro.fiverr.com/users/venomdesigne613/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-2xl bg-skin text-white font-bold font-poppins text-xs uppercase tracking-wider flex items-center gap-2 hover:opacity-90 transition-opacity shrink-0"
          >
            <span>Visit Fiverr Pro Store</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
