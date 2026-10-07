'use client';

import React, { useState, useEffect } from 'react';
import { Settings, Sun, Moon } from 'lucide-react';

const skinColors = [
  { name: 'Green', hex: '#72b626', rgb: '114, 182, 38' },
  { name: 'Golden Yellow', hex: '#ffb400', rgb: '255, 180, 0' },
  { name: 'Royal Blue', hex: '#4169e1', rgb: '65, 105, 225' },
  { name: 'Crimson Red', hex: '#ee3158', rgb: '238, 49, 88' },
  { name: 'Purple', hex: '#6957af', rgb: '105, 87, 175' },
  { name: 'Vibrant Orange', hex: '#fa5b0f', rgb: '250, 91, 15' },
  { name: 'Cyan Blue', hex: '#00bcd4', rgb: '0, 188, 212' },
  { name: 'Hot Pink', hex: '#e91e63', rgb: '233, 30, 99' },
  { name: 'Emerald', hex: '#10b981', rgb: '16, 185, 129' },
  { name: 'Indigo', hex: '#6366f1', rgb: '99, 102, 241' },
];

export default function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(skinColors[0]);
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    // Load saved preferences
    const savedSkin = localStorage.getItem('theme-skin');
    const savedLight = localStorage.getItem('theme-mode');

    if (savedSkin) {
      const match = skinColors.find((c) => c.hex === savedSkin);
      if (match) {
        applySkin(match);
      }
    } else {
      applySkin(skinColors[0]);
    }

    if (savedLight === 'light') {
      setIsLightMode(true);
      document.body.classList.add('light');
    }
  }, []);

  const applySkin = (skin: typeof skinColors[0]) => {
    setSelectedColor(skin);
    document.documentElement.style.setProperty('--skin-color', skin.hex);
    document.documentElement.style.setProperty('--skin-rgb', skin.rgb);
    localStorage.setItem('theme-skin', skin.hex);
  };

  const toggleThemeMode = () => {
    if (isLightMode) {
      document.body.classList.remove('light');
      setIsLightMode(false);
      localStorage.setItem('theme-mode', 'dark');
    } else {
      document.body.classList.add('light');
      setIsLightMode(true);
      localStorage.setItem('theme-mode', 'light');
    }
  };

  return (
    <div className="fixed top-24 left-0 z-50 flex items-start">
      {/* Drawer Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-11 h-11 bg-[#252525] text-white flex items-center justify-center rounded-r-lg shadow-xl hover:bg-skin transition-colors focus:outline-none cursor-pointer border-y border-r border-zinc-700"
        aria-label="Theme Customizer"
      >
        <Settings className={`w-5 h-5 transition-transform duration-700 ${isOpen ? 'rotate-90' : 'animate-spin-slow'}`} />
      </button>

      {/* Settings Panel */}
      {isOpen && (
        <div className="bg-[#181818] border border-zinc-700 p-5 rounded-r-2xl shadow-2xl w-64 backdrop-blur-lg ml-0.5 animate-in slide-in-from-left duration-300">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-3 font-poppins flex items-center justify-between">
            <span>Theme Accent</span>
            <span className="text-xs px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">{selectedColor.name}</span>
          </h4>

          {/* Color swatches */}
          <div className="grid grid-cols-5 gap-2.5 mb-5">
            {skinColors.map((skin) => (
              <button
                key={skin.name}
                onClick={() => applySkin(skin)}
                className={`w-8 h-8 rounded-full transition-transform hover:scale-110 flex items-center justify-center ${
                  selectedColor.hex === skin.hex ? 'ring-2 ring-white scale-110' : ''
                }`}
                style={{ backgroundColor: skin.hex }}
                title={skin.name}
              />
            ))}
          </div>

          <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-300">Mode</span>
            <button
              onClick={toggleThemeMode}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-800 text-white hover:bg-zinc-700 text-xs font-semibold transition-colors"
            >
              {isLightMode ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" /> Light
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-blue-400" /> Dark
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
