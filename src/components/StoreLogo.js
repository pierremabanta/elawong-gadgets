import Link from 'next/link';

export default function StoreLogo({ className = '', link = true }) {
  const content = (
    <img
      src="/logo.png"
      alt="Ela Wong Gadgets Shop — Authorized Reseller"
      className={`h-8 md:h-10 w-auto object-contain ${className}`}
      width={274}
      height={100}
    />
  );

  if (link) {
    return <Link href="/" className="inline-flex shrink-0">{content}</Link>;
  }

  return content;
}
