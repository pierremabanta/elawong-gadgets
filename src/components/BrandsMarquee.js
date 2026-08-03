'use client';

// Auto-scrolling brands conveyor belt (CSS animation, left-moving).
// Logos are duplicated once and the track slides -50% for a seamless loop.
// Desktop: label on the left, belt on the right (side by side).
// Mobile: stacked — label centered above the belt.
const BRANDS = [
  { name: 'Apple', src: '/brands/apple.png' },
  { name: 'realme', src: '/brands/realme.png' },
  { name: 'Tecno', src: '/brands/tecno.png' },
  { name: 'Xiaomi', src: '/brands/xiaomi.png' },
];

export default function BrandsMarquee({ label = 'Authorized Partner Brands' }) {
  const loop = [...BRANDS, ...BRANDS];

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-10">
        {label && (
          <p className="shrink-0 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/50 md:leading-none">
            {label}
          </p>
        )}

        <div className="relative flex-1 overflow-hidden">
          {/* soft edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-16 z-10 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-16 z-10 bg-gradient-to-l from-background to-transparent" />

          <div className="flex w-max animate-marquee items-center">
            {loop.map((brand, i) => (
              <span
                key={`${brand.name}-${i}`}
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
    </div>
  );
}
