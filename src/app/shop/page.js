'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useState, useMemo } from 'react';
import { categories, getProductsByCategory } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { Search } from 'lucide-react';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');

  const products = useMemo(() => {
    const catProducts = getProductsByCategory(activeCategory);
    if (!searchQuery.trim()) return catProducts;
    const q = searchQuery.toLowerCase();
    return catProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [activeCategory, searchQuery]);

  return (
    <>
      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm border border-input focus:outline-none focus:border-ring transition-colors bg-background"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              setSearchQuery('');
            }}
            className={`shrink-0 px-4 py-2 text-xs font-medium transition-colors ${
              activeCategory === cat.id
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-secondary text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Results Info */}
      <p className="text-xs text-muted-foreground/60 mb-6">
        {products.length} product{products.length !== 1 ? 's' : ''} found
      </p>

      {/* Product Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-sm">No products found matching your search.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('all');
            }}
            className="mt-4 text-sm text-primary hover:text-primary/80 underline transition-colors"
          >
            Clear filters
          </button>
        </div>
      )}
    </>
  );
}

function ShopFallback() {
  return (
    <div className="text-center py-16">
      <p className="text-muted-foreground text-sm">Loading products...</p>
    </div>
  );
}

export default function ShopPage() {
  return (
    <div className="container py-8 md:py-12">
      {/* Header */}
      <div className="mb-10">
        <span className="text-xs font-semibold text-primary uppercase tracking-[0.15em] block mb-1">Shop</span>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">All Products</h1>
      </div>

      <Suspense fallback={<ShopFallback />}>
        <ShopContent />
      </Suspense>
    </div>
  );
}