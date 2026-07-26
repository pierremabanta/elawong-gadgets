import Link from 'next/link';
import { ChevronRight, Shield, Star, Truck, CreditCard, Apple } from 'lucide-react';
import { getFeaturedProducts } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { SiriBallHero } from '@/components/ui/siri-ball-hero';

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <div>
      {/* ===== Siri Ball Hero ===== */}
      <SiriBallHero
        description="Genuine Apple products with official warranty. From the latest iPhones to MacBooks, AirPods, and accessories."
        ctaText="Shop Now"
        ctaLink="/shop"
      />

      {/* ===== Trust Badges ===== */}
      <section className="border-y border-border/40 bg-secondary/30">
        <div className="container py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Shield, label: 'Genuine Products', desc: '100% authentic Apple items' },
              { icon: Star, label: 'Official Warranty', desc: 'Apple warranty included' },
              { icon: Truck, label: 'Free Delivery', desc: 'Within Marikina area' },
              { icon: CreditCard, label: 'Flexible Payment', desc: 'Cash, GCash, bank transfer' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <item.icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground/70">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Featured Products ===== */}
      <section className="container py-16 md:py-24">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Featured</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Popular Products</h2>
          </div>
          <Link
            href="/shop"
            className="hidden sm:inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors"
          >
            View All
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {featured.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80"
          >
            View All Products
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* ===== Categories ===== */}
      <section className="border-t border-border/40 bg-secondary/30">
        <div className="container py-16 md:py-24">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Categories</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Shop by Category</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'iPhones', emoji: '📱', desc: 'Latest models' },
              { name: 'iPads', emoji: '📟', desc: 'Power & portability' },
              { name: 'MacBooks', emoji: '💻', desc: 'Pro performance' },
              { name: 'AirPods', emoji: '🎧', desc: 'Wireless audio' },
              { name: 'Apple Watch', emoji: '⌚', desc: 'Stay connected' },
              { name: 'Accessories', emoji: '🔌', desc: 'Cases, cables & more' },
            ].map((cat) => (
              <Link
                key={cat.name}
                href={`/shop?category=${cat.name}`}
                className="group bg-background rounded-xl border border-border/60 p-6 text-center hover:shadow-sm hover:border-primary/30 hover:bg-primary/[0.02] transition-all duration-300"
              >
                <span className="text-3xl block mb-3">{cat.emoji}</span>
                <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-muted-foreground/60 mt-1">{cat.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA - Logo-themed black badge style ===== */}
      <section className="container py-16 md:py-24">
        <div className="relative overflow-hidden bg-foreground rounded-2xl p-8 sm:p-12 md:p-16 text-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-primary/5 to-transparent rounded-full blur-3xl pointer-events-none" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground mb-4 relative">
            Visit Our Store Today
          </h2>
          <p className="text-primary-foreground/60 text-sm sm:text-base max-w-md mx-auto mb-8 relative">
            Located at Ayala Marikina. Drop by to see our full selection of Apple products.
          </p>
          <Link
            href="/contact"
            className="relative inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm shadow-primary/30"
          >
            Get Directions
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}