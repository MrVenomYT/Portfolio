'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, Briefcase, ShoppingBag, Mail, Menu, X, Cpu, Shield } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'About', href: '/about', icon: User },
  { name: 'Services', href: '/services', icon: Cpu },
  { name: 'Portfolio', href: '/portfolio', icon: Briefcase },
  { name: 'Store', href: '/products', icon: ShoppingBag },
  { name: 'Contact', href: '/contact', icon: Mail },
  { name: 'Admin', href: '/admin', icon: Shield },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Fixed Right Navigation */}
      <nav className="fixed right-6 xl:right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href === '/admin' && pathname === '/login');
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                isActive
                  ? 'bg-skin text-white shadow-lg shadow-skin scale-110'
                  : 'bg-[#2b2a2a] text-zinc-300 hover:bg-skin hover:text-white hover:scale-105'
              }`}
            >
              <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />

              {/* Slide-out tooltip label */}
              <span className="absolute right-15 px-3.5 py-1.5 rounded-md bg-skin text-white text-xs font-semibold tracking-wider uppercase opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-300 group-hover:right-16 whitespace-nowrap shadow-md">
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Mobile Top Header with Hamburger */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#111111]/95 backdrop-blur-md border-b border-zinc-800/80 px-4 sm:px-5 py-3.5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-black font-poppins text-white tracking-wider">
            MUHAMMAD <span className="text-skin">HASIL</span>
          </span>
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-[#242424] text-white hover:text-skin focus:outline-none transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Menu Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/85 backdrop-blur-sm pt-20 px-4 sm:px-6">
          <div className="bg-[#181818] border border-zinc-800 rounded-3xl p-5 shadow-2xl flex flex-col gap-2 max-h-[85vh] overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href === '/admin' && pathname === '/login');
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold font-poppins transition-all duration-200 ${
                    isActive ? 'bg-skin text-white shadow-md' : 'text-zinc-300 hover:bg-[#252525] hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
