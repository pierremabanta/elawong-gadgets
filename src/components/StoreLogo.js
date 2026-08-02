import Link from 'next/link';

export default function StoreLogo({ className = '', link = true }) {
  const content = (
    <div className={`inline-flex flex-col leading-none ${className}`}>
      <span
        className="font-serif italic text-2xl sm:text-3xl md:text-4xl tracking-tight"
        style={{
          fontFamily: "'Georgia', 'Times New Roman', serif",
          color: '#b8942c',
          lineHeight: 0.85,
        }}
      >
        Ela Wong
      </span>
      <span
        className="font-bold text-sm sm:text-base md:text-lg tracking-[0.2em] -mt-0.5"
        style={{ color: '#0a0a0a', lineHeight: 1 }}
      >
        GADGETS SHOP
      </span>
      <span className="inline-flex items-center justify-center gap-1 mt-1 bg-foreground px-1.5 py-0.5">
        <svg viewBox="0 0 24 24" className="w-2 h-2" fill="currentColor" aria-hidden="true">
          <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
        </svg>
        <span className="text-[8px] sm:text-[9px] font-semibold uppercase tracking-wider text-white">
          Authorized Reseller
        </span>
      </span>
    </div>
  );

  if (link) {
    return <Link href="/">{content}</Link>;
  }

  return content;
}
