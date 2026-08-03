import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { getFeaturedProducts } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { SiriBallHero } from '@/components/ui/siri-ball-hero';
import BrandsMarquee from '@/components/BrandsMarquee';

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

      {/* ===== Brands conveyor belt ===== */}
      <section className="border-t border-border/20 bg-background py-8 md:py-10 w-full">
        <div className="px-4 sm:px-6 lg:px-10">
          <BrandsMarquee label="Authorized Partner Brands" />
        </div>
      </section>

      {/* ===== Featured Products ===== */}
      <section className="container py-20 md:py-28">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-xs font-semibold text-primary uppercase tracking-[0.15em] mb-2 block">Featured</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">Popular Products</h2>
          </div>
          <Link
            href="/shop"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/70 transition-colors"
          >
            View All
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {featured.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-10 text-center sm:hidden">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/70"
          >
            View All Products
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ===== Categories — clean text-only ===== */}
      <section className="border-t border-border/20">
        <div className="container py-20 md:py-28">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold text-primary uppercase tracking-[0.15em] mb-2 block">Categories</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">Shop by Category</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { name: 'iPhones', desc: 'Latest models' },
              { name: 'iPads', desc: 'Power & portability' },
              { name: 'MacBooks', desc: 'Pro performance' },
              { name: 'AirPods', desc: 'Wireless audio' },
              { name: 'Apple Watch', desc: 'Stay connected' },
              { name: 'Accessories', desc: 'Cases, cables & more' },
            ].map((cat) => (
              <Link
                key={cat.name}
                href={`/shop?category=${cat.name}`}
                className="group border border-border/20 px-5 py-6 text-center hover:border-primary/40 transition-all duration-300"
              >
                <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors tracking-tight">
                  {cat.name}
                </h3>
                <p className="text-xs text-muted-foreground/50 mt-1.5">{cat.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA — direct, no fluff ===== */}
      <section className="container py-20 md:py-28">
        <div className="bg-foreground px-8 py-16 sm:px-14 sm:py-20 md:px-20 md:py-24 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Visit Our Store Today
          </h2>
          <p className="text-white/60 text-sm sm:text-base max-w-md mx-auto mb-10">
            Located at Ayala Marikina. Drop by to see our full selection of Apple products.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/80 transition-colors"
          >
            Get Directions
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}