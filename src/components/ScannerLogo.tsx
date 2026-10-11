import React, { useState, useEffect } from 'react';

export interface ScannerLogoProps {
  size?: 'sm' | 'md' | 'lg';
  isTransparent?: boolean;
  className?: string;
  showLabel?: boolean;
}

// 4 Property types in the exact order requested by user:
// 1. Villa -> 2. Independent House -> 3. Apartment -> 4. Open Plot
const PROPERTY_SLIDES = [
  {
    type: 'Villa',
    shortLabel: 'Villa',
    image: 'https://images.pexels.com/photos/24805054/pexels-photo-24805054.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Luxury Villa with pool',
  },
  {
    type: 'Independent House',
    shortLabel: 'House',
    image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=940',
    alt: 'Independent residential house architecture',
  },
  {
    type: 'Apartment',
    shortLabel: 'Apartment',
    image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=940',
    alt: 'Modern residential apartment building with balconies',
  },
  {
    type: 'Open Plot',
    shortLabel: 'Open Plot',
    image: 'https://images.pexels.com/photos/15422584/pexels-photo-15422584.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Open residential land plot',
  },
];

// Preload all 4 images on script evaluation for instant rendering
if (typeof window !== 'undefined') {
  PROPERTY_SLIDES.forEach((slide) => {
    const img = new Image();
    img.src = slide.image;
  });
}

// ============================================================
// GLOBAL SYNCHRONIZER: Keeps Navbar and Footer logos 100% in sync
// ============================================================
let globalCurrentIndex = 0;
let globalCycleKey = 0;
const subscribers = new Set<() => void>();
let globalTimer: ReturnType<typeof setInterval> | null = null;

function startGlobalTimer() {
  if (globalTimer) return;
  globalTimer = setInterval(() => {
    globalCurrentIndex = (globalCurrentIndex + 1) % PROPERTY_SLIDES.length;
    globalCycleKey += 1;
    subscribers.forEach((callback) => callback());
  }, 2700);
}

function useScannerSync() {
  const [, setTick] = useState(0);

  useEffect(() => {
    const handleUpdate = () => setTick((t) => t + 1);
    subscribers.add(handleUpdate);
    startGlobalTimer();

    return () => {
      subscribers.delete(handleUpdate);
      if (subscribers.size === 0 && globalTimer) {
        clearInterval(globalTimer);
        globalTimer = null;
      }
    };
  }, []);

  return {
    currentIndex: globalCurrentIndex,
    cycleKey: globalCycleKey,
  };
}

export default function ScannerLogo({
  size = 'md',
  isTransparent = false,
  className = '',
  showLabel = true,
}: ScannerLogoProps) {
  // Synchronized state shared across Navbar and Footer instances
  const { currentIndex, cycleKey } = useScannerSync();

  const prevIndex = (currentIndex - 1 + PROPERTY_SLIDES.length) % PROPERTY_SLIDES.length;
  const currentSlide = PROPERTY_SLIDES[currentIndex];
  const prevSlide = PROPERTY_SLIDES[prevIndex];

  // Sizing definitions - increased height so images are clearly visible, reducing navbar gap
  const sizeClasses = {
    sm: 'w-14 h-11',
    md: 'w-[72px] h-[54px] sm:w-[78px] sm:h-[56px]',
    lg: 'w-20 h-16 sm:w-24 sm:h-18',
  }[size];

  // Corner bar bracket thickness and length
  const bracketSize = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4';

  return (
    <div
      className={`relative flex items-center justify-center select-none ${sizeClasses} ${className}`}
      title={`Scanning: ${currentSlide.type}`}
      aria-label={`Property Scanner logo - currently showing ${currentSlide.type}`}
    >
      {/* ============================================================ */}
      {/* 4 OUTER SCANNER BARS (Corner brackets framing the image)     */}
      {/* ============================================================ */}
      <div className="absolute inset-0 pointer-events-none z-30">
        {/* Top-Left Bar */}
        <div
          className={`absolute top-0 left-0 ${bracketSize} border-t-[3px] border-l-[3px] rounded-tl-[6px] transition-colors duration-300 ${
            isTransparent
              ? 'border-teal-300 shadow-[0_0_6px_rgba(45,212,191,0.9)]'
              : 'border-blue-600 shadow-[0_0_6px_rgba(37,99,235,0.7)]'
          }`}
        />
        {/* Top-Right Bar */}
        <div
          className={`absolute top-0 right-0 ${bracketSize} border-t-[3px] border-r-[3px] rounded-tr-[6px] transition-colors duration-300 ${
            isTransparent
              ? 'border-teal-300 shadow-[0_0_6px_rgba(45,212,191,0.9)]'
              : 'border-blue-600 shadow-[0_0_6px_rgba(37,99,235,0.7)]'
          }`}
        />
        {/* Bottom-Left Bar */}
        <div
          className={`absolute bottom-0 left-0 ${bracketSize} border-b-[3px] border-l-[3px] rounded-bl-[6px] transition-colors duration-300 ${
            isTransparent
              ? 'border-teal-300 shadow-[0_0_6px_rgba(45,212,191,0.9)]'
              : 'border-blue-600 shadow-[0_0_6px_rgba(37,99,235,0.7)]'
          }`}
        />
        {/* Bottom-Right Bar */}
        <div
          className={`absolute bottom-0 right-0 ${bracketSize} border-b-[3px] border-r-[3px] rounded-br-[6px] transition-colors duration-300 ${
            isTransparent
              ? 'border-teal-300 shadow-[0_0_6px_rgba(45,212,191,0.9)]'
              : 'border-blue-600 shadow-[0_0_6px_rgba(37,99,235,0.7)]'
          }`}
        />
      </div>

      {/* ============================================================ */}
      {/* INNER IMAGE FRAME - PERFECTLY FITTED INSIDE THE SCANNER BARS  */}
      {/* ============================================================ */}
      <div className="relative w-[calc(100%-4px)] h-[calc(100%-4px)] rounded-[5px] overflow-hidden bg-navy-950 shadow-md">
        {/* Layer 1: Previous image (base underlying layer) */}
        <img
          src={prevSlide.image}
          alt={prevSlide.alt}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        {/* Layer 2: Current image revealed as the minus bar descends */}
        <div
          key={`reveal-${cycleKey}`}
          className="absolute inset-0 h-full w-full overflow-hidden"
          style={{
            animation: 'logoScanReveal 1.85s cubic-bezier(0.4, 0, 0.2, 1) forwards',
          }}
        >
          <img
            src={currentSlide.image}
            alt={currentSlide.alt}
            className="h-full w-full object-cover object-center"
          />
        </div>

        {/* Digital lens vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/45 pointer-events-none" />

        {/* ============================================================ */}
        {/* THE INSIDE MINUS BAR (Laser beam sliding from up to down)    */}
        {/* ============================================================ */}
        <div
          key={`laser-${cycleKey}`}
          className="absolute inset-x-0 z-20 pointer-events-none -translate-y-1/2"
          style={{
            animation: 'logoLaserDown 1.85s cubic-bezier(0.4, 0, 0.2, 1) forwards',
          }}
        >
          {/* Soft trailing laser glow upwards */}
          <div className="w-full h-3.5 -translate-y-full bg-gradient-to-t from-teal-400/40 via-cyan-300/15 to-transparent pointer-events-none" />

          {/* The prominent horizontal Minus Bar */}
          <div className="w-full h-[3px] bg-gradient-to-r from-teal-200 via-white to-teal-200 shadow-[0_0_8px_#2dd4bf,0_0_12px_#38bdf8]" />
        </div>

        {/* Property Type Badge Overlay - Positioned at bottom edge so images are viewed clearly */}
        {showLabel && (
          <div className="absolute bottom-[1.5px] inset-x-0 z-20 flex justify-center pointer-events-none px-1">
            <span
              key={`tag-${cycleKey}`}
              className="px-2 py-[0.5px] leading-tight whitespace-nowrap rounded-[2px] bg-black/85 backdrop-blur-xs text-[6.5px] sm:text-[7px] font-extrabold uppercase tracking-tight text-teal-200 border border-teal-400/35 shadow-xs animate-fade-in"
            >
              {currentSlide.shortLabel}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
