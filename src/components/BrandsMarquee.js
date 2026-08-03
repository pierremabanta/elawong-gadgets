'use client';

// Auto-scrolling brands conveyor belt (CSS animation, left-moving).
// Logos are duplicated once and the track slides -50% for a seamless loop.
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
      {label && (
        <p className="text-center text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/50 mb-4">
          {label}
        </p>
      )}
      <div className="relative overflow-hidden">
        {/* soft edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 z-10 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 z-10 bg-gradient-to-l from-background to-transparent" />

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
  );
}
