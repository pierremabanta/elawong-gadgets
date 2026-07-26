import Link from 'next/link';

export default function StoreLogo({ className = '', link = true }) {
  const content = (
    <div className={`inline-flex flex-col leading-none ${className}`}>
      <span
        className="font-serif italic text-2xl sm:text-3xl md:text-4xl tracking-tight"
        style={{
          fontFamily: "'Georgia', 'Times New Roman', serif",
          color: '#c9a84c',
          lineHeight: 0.85,
        }}
      >
        Ela Wong
      </span>
      <span
        className="font-bold text-sm sm:text-base md:text-lg tracking-[0.2em] -mt-0.5"
        style={{ color: '#ffffff', lineHeight: 1 }}
      >
        GADGETS SHOP
      </span>
      <span
        className="text-[9px] sm:text-[10px] italic self-end -mt-0.5"
        style={{ color: '#c9a84c' }}
      >
        by Shannela Co.
      </span>
    </div>
  );

  if (link) {
    return <Link href="/">{content}</Link>;
  }

  return content;
}