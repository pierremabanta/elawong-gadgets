import Link from 'next/link';

export default function StoreLogo({ className = '', link = true }) {
  const content = (
    <img
      src="/logo.png"
      alt="Ela Wong Gadgets Shop — Authorized Reseller"
      className={`h-10 md:h-12 w-auto object-contain ${className}`}
      width={287}
      height={288}
    />
  );

  if (link) {
    return <Link href="/" className="inline-flex shrink-0">{content}</Link>;
  }

  return content;
}
