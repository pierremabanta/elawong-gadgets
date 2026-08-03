'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Menu, X, GitCompare } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useCompare } from '@/context/CompareContext';
import { useState } from 'react';
import StoreLogo from './StoreLogo';
import CompareDrawer from './CompareDrawer';

export default function Navbar() {
  const { cartCount } = useCart();
  const { items } = useCompare();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border/60">
      <nav className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <StoreLogo />

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative inline-flex items-center justify-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  active
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/70'
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute inset-x-1 -bottom-0.5 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Desktop Cart & Compare */}
        <div className="hidden md:flex items-center gap-1">
          <Link
            href="/compare"
            className="relative inline-flex items-center justify-center p-2.5 text-muted-foreground hover:text-foreground hover:bg-secondary/70 rounded-lg transition-colors"
            aria-label="Compare products"
          >
            <GitCompare className="w-4 h-4" />
            {items.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Link>
          <Link
            href="/cart"
            className="relative inline-flex items-center justify-center p-2.5 text-muted-foreground hover:text-foreground hover:bg-secondary/70 rounded-lg transition-colors"
            aria-label="Shopping cart"
          >
            <ShoppingCart className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile actions */}
        <div className="flex md:hidden items-center gap-1">
          <Link
            href="/cart"
            className="relative inline-flex items-center justify-center p-2.5 text-muted-foreground hover:text-foreground hover:bg-secondary/70 rounded-lg transition-colors"
            aria-label="Shopping cart"
          >
            <ShoppingCart className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            className="p-2.5 text-muted-foreground hover:text-foreground hover:bg-secondary/70 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/60 bg-background/90 backdrop-blur-xl">
          <div className="container py-3 space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'bg-secondary/80 text-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                  }`}
                >
                  <span>{link.label}</span>
                  {active && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                </Link>
              );
            })}
            <div className="pt-2 mt-2 border-t border-border/60">
              <Link
                href="/compare"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
              >
                <GitCompare className="w-4 h-4" />
                Compare
                {items.length > 0 && (
                  <span className="ml-auto text-xs text-muted-foreground/70">{items.length} selected</span>
                )}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}