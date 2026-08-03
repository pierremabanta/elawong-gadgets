'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Minus, Plus, ShoppingBag, Check, Shield, Truck, RotateCcw, GitCompare, Star, ChevronDown } from 'lucide-react';
import { getProductById, getProductsByCategory } from '@/data/products';
import { branches, DEFAULT_BRANCH_ID, getBranchById } from '@/data/branches';
import { useCart } from '@/context/CartContext';
import ColorSwatches from '@/components/ColorSwatches';
import { useCompare } from '@/context/CompareContext';
import ProductGallery from '@/components/ProductGallery';
import ProductCard from '@/components/ProductCard';

// Sample reviews — replace with real customer reviews later
const sampleReviews = [
  {
    name: 'Juan D.',
    date: '2 weeks ago',
    rating: 5,
    title: 'Genuine and sealed',
    text: 'Bought an iPhone here. Sealed box, warranty activated right in front of me. Trusted this store for years.',
  },
  {
    name: 'Maria S.',
    date: '1 month ago',
    rating: 5,
    title: 'Great deal with installment',
    text: 'Got 0% installment for 12 months. Staff was patient and explained everything clearly.',
  },
  {
    name: 'Carlo R.',
    date: '2 months ago',
    rating: 4,
    title: 'Fast transaction',
    text: 'Reserved via Messenger and paid via GCash. Picked up at Ayala Marikina the same day.',
  },
];

const faqs = [
  {
    q: 'Are your products 100% original?',
    a: 'Yes. We are an Apple Authorized Reseller. Every unit is brand new, sealed, and covered by the official Apple Philippines warranty.',
  },
  {
    q: 'Do you offer installments?',
    a: 'Yes, we accept 0% installment plans with major credit cards and Home Credit. Message us on Facebook Messenger for the exact monthly breakdown.',
  },
  {
    q: 'Can I reserve a unit and pay via GCash?',
    a: 'Absolutely. Reserve through Messenger and pay via GCash or bank transfer, then pick up at our Ayala Marikina store or have it delivered.',
  },
  {
    q: 'What if my unit has an issue?',
    a: 'All units carry the official Apple warranty. For any defect within 7 days, we replace the unit. After that, it is covered by Apple PH service centers.',
  },
];

export default function ProductDetailPage() {
  const params = useParams();
  const product = getProductById(params.id);
  const { addToCart, cart } = useCart();
  const { addToCompare, isInCompare, canAddMore } = useCompare();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || null);
  const [selectedBranch, setSelectedBranch] = useState(DEFAULT_BRANCH_ID);
  const [activeTab, setActiveTab] = useState('details');
  const [openFaq, setOpenFaq] = useState(0);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-8">The product you&apos;re looking for doesn&apos;t exist.</p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-white text-sm font-medium"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Shop
        </Link>
      </div>
    );
  }

  const formatPrice = (p) => '₱' + p.toLocaleString('en-PH');
  const inCart = cart.find((item) => item.id === product.id);
  const inCompare = isInCompare(product.id);
  const related = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);
  const avgRating = sampleReviews.reduce((s, r) => s + r.rating, 0) / sampleReviews.length;

  // ---- Stock logic (static for now) ----
  const stockByBranch = product.stock || {};
  const stock = stockByBranch[selectedBranch] ?? 0;
  const selectedBranchInfo = getBranchById(selectedBranch);
  const stockStatus = stock <= 0 ? 'out' : stock <= 3 ? 'low' : 'in';

  const handleBranchChange = (branchId) => {
    setSelectedBranch(branchId);
    setQuantity(1);
  };

  const tabs = [
    { id: 'details', label: 'Details' },
    { id: 'shipping', label: 'Shipping' },
    { id: 'returns', label: 'Returns' },
  ];

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleCompareClick = () => {
    if (canAddMore || inCompare) {
      addToCompare(product);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground/60 mb-6 overflow-x-auto whitespace-nowrap scrollbar-none">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3 h-3 shrink-0" />
        <Link href="/shop" className="hover:text-foreground transition-colors">
          Shop
        </Link>
        <ChevronRight className="w-3 h-3 shrink-0" />
        <Link href={`/shop?category=${product.category}`} className="hover:text-foreground transition-colors">
          {product.category}
        </Link>
        <ChevronRight className="w-3 h-3 shrink-0" />
        <span className="text-foreground/80">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Gallery */}
        <ProductGallery
          images={product.images}
          productName={product.name}
          syncImage={selectedColor?.image}
        />

        {/* Details */}
        <div className="flex flex-col">
          <p className="text-xs font-semibold text-muted-foreground/60 uppercase tracking-wider mb-2">
            {product.category}
          </p>
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">{product.name}</h1>
            {product.badge && (
              <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 bg-primary/15 text-primary">
                {product.badge}
              </span>
            )}
          </div>

          {/* Reviews summary — scrolls to reviews section */}
          <a href="#reviews" className="inline-flex items-center gap-1.5 mb-5 w-fit">
            <span className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${i < Math.round(avgRating) ? 'text-chart-2 fill-chart-2' : 'text-border'}`}
                />
              ))}
            </span>
            <span className="text-xs font-medium text-foreground">{avgRating.toFixed(1)}</span>
            <span className="text-xs text-muted-foreground/70">({sampleReviews.length} reviews)</span>
          </a>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-5">
            <span className="text-3xl font-bold text-foreground tracking-tight">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-base text-muted-foreground/50 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            {product.originalPrice && (
              <span className="text-xs font-bold text-primary bg-primary/15 px-2 py-0.5">
                -{Math.round((1 - product.price / product.originalPrice) * 100)}%
              </span>
            )}
          </div>

          {/* Punchy description */}
          <p className="text-sm text-muted-foreground leading-relaxed mb-8">{product.description}</p>

          {/* Branch selector + stock */}
          <div className="mb-8">
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">
              Check Availability
            </h3>
            <div className="relative">
              <select
                value={selectedBranch}
                onChange={(e) => handleBranchChange(e.target.value)}
                className="w-full appearance-none pl-4 pr-10 py-3 text-sm bg-background border border-input focus:outline-none focus:border-ring transition-colors"
              >
                {branches.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>

            <div className="mt-3 flex items-center gap-2.5">
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 ${
                  stockStatus === 'in'
                    ? 'bg-primary/10 text-primary'
                    : stockStatus === 'low'
                    ? 'bg-destructive/10 text-destructive'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {stockStatus === 'in' && (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    In Stock — {stock} {stock === 1 ? 'unit' : 'units'}
                  </>
                )}
                {stockStatus === 'low' && (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-destructive" />
                    Low Stock — Only {stock} {stock === 1 ? 'unit' : 'units'} left
                  </>
                )}
                {stockStatus === 'out' && (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                    Out of Stock
                  </>
                )}
              </span>
              <span className="text-xs text-muted-foreground/60">
                {selectedBranchInfo.name}
              </span>
            </div>
          </div>

          {/* Color Options */}
          {product.colors && product.colors.length > 1 && (
            <div className="mb-8">
              <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">
                Color — <span className="text-muted-foreground font-normal normal-case">{selectedColor?.name}</span>
              </h3>
              <ColorSwatches
                colors={product.colors}
                selectedColor={selectedColor}
                onSelect={setSelectedColor}
              />
            </div>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-semibold text-foreground uppercase tracking-wider">Qty</span>
            <div className={`flex items-center border border-border/60 ${stock === 0 ? 'opacity-40 pointer-events-none' : ''}`}>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2.5 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-10 text-center text-sm font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(stock, quantity + 1))}
                className="p-2.5 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
            {stock > 0 && stock <= 5 && (
              <span className="text-xs text-destructive/80">Max {stock} per order</span>
            )}
            {inCart && (
              <span className="text-xs text-muted-foreground/60">
                ({inCart.quantity} in cart)
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={stock === 0}
            className={`w-full flex items-center justify-center gap-2 py-3.5 text-sm font-medium transition-all ${
              stock === 0
                ? 'bg-muted text-muted-foreground cursor-not-allowed'
                : added
                ? 'bg-primary/20 text-primary border border-primary/30'
                : 'bg-foreground text-white hover:bg-foreground/90'
            }`}
          >
            {stock === 0 ? (
              <>
                <ShoppingBag className="w-4 h-4" />
                Out of Stock at this Branch
              </>
            ) : added ? (
              <>
                <Check className="w-4 h-4" />
                Added to Cart!
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                Add to Cart — {formatPrice(product.price * quantity)}
              </>
            )}
          </button>

          {/* Compare Button */}
          <button
            onClick={handleCompareClick}
            className={`w-full flex items-center justify-center gap-2 py-3 text-sm font-medium border transition-colors ${
              inCompare
                ? 'bg-primary/10 text-primary border-primary/30'
                : 'bg-secondary/50 text-muted-foreground border-border/60 hover:text-foreground'
            }`}
          >
            <GitCompare className="w-4 h-4" />
            {inCompare ? 'Remove from Compare' : 'Add to Compare'}
          </button>

          {/* Trust badges */}
          <div className="mt-8 grid grid-cols-3 gap-4 pt-6 border-t border-border/20">
            {[
              { icon: Shield, label: 'Official Warranty' },
              { icon: Truck, label: 'Free Delivery' },
              { icon: RotateCcw, label: '7-Day Returns' },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <item.icon className="w-4 h-4 text-muted-foreground/60 mx-auto mb-1" />
                <p className="text-[10px] text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs: Details / Shipping / Returns */}
      <div className="mt-16 md:mt-20 border-t border-border/20">
        <div className="flex gap-8 border-b border-border/20 overflow-x-auto scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 py-4 text-sm font-medium border-b-2 -mb-px transition-colors ${
                activeTab === tab.id
                  ? 'border-primary text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="py-8">
          {activeTab === 'details' && (
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">Overview</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {product.specs.map((spec, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'shipping' && (
            <ul className="space-y-4 text-sm text-muted-foreground max-w-2xl">
              <li className="flex items-start gap-3">
                <Truck className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span>
                  <strong className="text-foreground font-medium">Free delivery within Marikina.</strong>{' '}
                  Orders are usually delivered the same day or within 24 hours.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span>
                  <strong className="text-foreground font-medium">Pickup at the store.</strong>{' '}
                  Reserve via Messenger and pick up at Ayala Marikina when ready.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <ChevronRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span>
                  <strong className="text-foreground font-medium">Nationwide delivery.</strong>{' '}
                  We ship across the Philippines via courier. Shipping fee depends on your location.
                </span>
              </li>
            </ul>
          )}

          {activeTab === 'returns' && (
            <ul className="space-y-4 text-sm text-muted-foreground max-w-2xl">
              <li className="flex items-start gap-3">
                <RotateCcw className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span>
                  <strong className="text-foreground font-medium">7-day replacement.</strong>{' '}
                  If your unit has a defect within 7 days of purchase, we replace it.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span>
                  <strong className="text-foreground font-medium">Original packaging required.</strong>{' '}
                  For any return or exchange, the unit must be in its original box with all accessories.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Shield className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span>
                  <strong className="text-foreground font-medium">Apple PH warranty.</strong>{' '}
                  All units are covered by the official Apple Philippines warranty after the 7-day window.
                </span>
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* Reviews */}
      <section id="reviews" className="mt-16 md:mt-20 border-t border-border/20 pt-12 scroll-mt-28">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-semibold text-primary uppercase tracking-[0.15em] block mb-2">Reviews</span>
            <h2 className="text-2xl font-bold text-foreground tracking-tight">What customers say</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-foreground">{avgRating.toFixed(1)}</span>
            <div>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${i < Math.round(avgRating) ? 'text-chart-2 fill-chart-2' : 'text-border'}`}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground/70">{sampleReviews.length} reviews</p>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sampleReviews.map((r) => (
            <div key={r.title} className="border border-border/20 p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm font-semibold text-foreground">{r.name}</p>
                  <p className="text-[10px] text-muted-foreground/60 mt-0.5">{r.date}</p>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${i < r.rating ? 'text-chart-2 fill-chart-2' : 'text-border'}`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-xs font-medium text-foreground mb-1">{r.title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{r.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-16 md:mt-20 border-t border-border/20 pt-12">
        <span className="text-xs font-semibold text-primary uppercase tracking-[0.15em] block mb-2">FAQ</span>
        <h2 className="text-2xl font-bold text-foreground tracking-tight mb-8">Frequently Asked Questions</h2>

        <div className="max-w-2xl border border-border/20 divide-y divide-border/20">
          {faqs.map((f, i) => (
            <div key={i}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="text-sm font-medium text-foreground">{f.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${
                    openFaq === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openFaq === i && (
                <p className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="mt-16 md:mt-20 border-t border-border/20 pt-12">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-xs font-semibold text-primary uppercase tracking-[0.15em] block mb-2">
                You may also like
              </span>
              <h2 className="text-2xl font-bold text-foreground tracking-tight">Related Products</h2>
            </div>
            <Link
              href={`/shop?category=${product.category}`}
              className="hidden sm:inline-flex items-center gap-1 text-sm text-primary hover:text-primary/70 transition-colors"
            >
              View all
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
