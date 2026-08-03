'use client';

import { useEffect, useRef, useState } from 'react';

// Auto-scrolling brands conveyor belt (CSS animation, left-moving).
// Logos are repeated COPY_COUNT times so the track is always wider than any
// screen; the track slides by exactly one set's width (measured in px) for a
// seamless, gap-free loop.
const BRANDS = [
  { name: 'Apple', src: '/brands/apple.png' },
  { name: 'realme', src: '/brands/realme.png' },
  { name: 'Tecno', src: '/brands/tecno.png' },
  { name: 'Xiaomi', src: '/brands/xiaomi.png' },
];

// Enough copies to cover 4K (4096px) screens comfortably
const COPY_COUNT = 6;

// ⚙️ SPEED CONTROL — seconds it takes one set of logos to pass once.
// Lower = faster (10 = quick drift), higher = slower (60 = lazy crawl).
// Default 30. Just change this one number and redeploy.
const SECONDS_PER_SET = 10;

export default function BrandsMarquee({ label = 'Authorized Partner Brands' }) {
  const trackRef = useRef(null);
  const [distance, setDistance] = useState('0px');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      // One set = total track width / number of copies
      const setWidth = track.scrollWidth / COPY_COUNT;
      if (setWidth > 0) {
        setDistance(`-${setWidth}px`);
        setReady(true);
      }
    };

    measure();
    // Re-measure once images load or on resize
    window.addEventListener('resize', measure);
    const timer = setTimeout(measure, 300);
    return () => {
      window.removeEventListener('resize', measure);
      clearTimeout(timer);
    };
  }, []);

  const loop = Array.from({ length: COPY_COUNT }, (_, copy) =>
    BRANDS.map((brand) => ({ ...brand, key: `${brand.name}-${copy}` }))
  ).flat();

  return (
    <div className="w-full">
      {label && (
        <p className="text-center text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/70 mb-4">
          {label}
        </p>
      )}
      <div className="relative overflow-hidden">
        {/* soft edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-16 z-10 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-16 z-10 bg-gradient-to-l from-background to-transparent" />

        <div
          ref={trackRef}
          className="flex w-max items-center"
          style={{
            animation: ready ? `marquee-px ${SECONDS_PER_SET * COPY_COUNT}s linear infinite` : 'none',
            '--marquee-distance': distance,
          }}
        >
          {loop.map((brand) => (
            <span
              key={brand.key}
              className="flex items-center px-6 sm:px-8"
            >
              <img
                src={brand.src}
                alt={brand.name}
                title={brand.name}
                className="h-5 sm:h-6 w-auto object-contain opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                draggable={false}
              />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
