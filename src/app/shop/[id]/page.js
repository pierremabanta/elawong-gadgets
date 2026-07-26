'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Minus, Plus, ShoppingBag, Check, Shield, Truck, RotateCcw, GitCompare } from 'lucide-react';
import { getProductById } from '@/data/products';
import { useCart } from '@/context/CartContext';
import ColorSwatches from '@/components/ColorSwatches';
import { useCompare } from '@/context/CompareContext';
import ProductGallery from '@/components/ProductGallery';

export default function ProductDetailPage() {
  const params = useParams();
  const product = getProductById(params.id);
  const { addToCart, cart } = useCart();
  const { addToCompare, isInCompare, canAddMore } = useCompare();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || null);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-8">The product you&apos;re looking for doesn&apos;t exist.</p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-primary-foreground text-sm font-medium rounded-lg"
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

  // Smooth image crossfade
  const baseImage = selectedColor?.image || product.image;
  const [displayImage, setDisplayImage] = useState(baseImage);
  const [fade, setFade] = useState(true);
  const prevBaseImage = useRef(baseImage);

  useEffect(() => {
    if (prevBaseImage.current !== baseImage) {
      setFade(false);
      const timer = setTimeout(() => {
        setDisplayImage(baseImage);
        setFade(true);
        prevBaseImage.current = baseImage;
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [baseImage]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link
          href="/shop"
          className="inline-flex items-center gap-1 text-xs text-muted-foreground/60 hover:text-foreground transition-colors"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          Back to Shop
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Gallery */}
        <ProductGallery images={product.images} productName={product.name} />

        {/* Details */}
        <div className="flex flex-col">
          <p className="text-xs font-semibold text-muted-foreground/60 uppercase tracking-wider mb-2">
            {product.category}
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">{product.name}</h1>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-2xl font-bold text-foreground">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-base text-muted-foreground/60 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            {product.originalPrice && (
              <span className="text-xs font-medium text-foreground bg-primary/20 px-2 py-0.5 rounded-lg">
                -{Math.round((1 - product.price / product.originalPrice) * 100)}%
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed mb-8">{product.description}</p>

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

          {/* Specs */}
          <div className="mb-8">
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">Key Features</h3>
            <ul className="space-y-2">
              {product.specs.map((spec, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="w-3.5 h-3.5 text-muted-foreground/60 mt-0.5 shrink-0" />
                  {spec}
                </li>
              ))}
            </ul>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-semibold text-foreground uppercase tracking-wider">Qty</span>
            <div className="flex items-center border border-border/60 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2.5 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-10 text-center text-sm font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2.5 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
            {inCart && (
              <span className="text-xs text-muted-foreground/60">
                ({inCart.quantity} in cart)
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className={`w-full flex items-center justify-center gap-2 py-3.5 text-sm font-medium rounded-lg transition-all ${
              added
                ? 'bg-primary/20 text-primary border border-primary/30'
                : 'bg-foreground text-white hover:bg-foreground/90'
            }`}
          >
            {added ? (
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
            className={`w-full flex items-center justify-center gap-2 py-3 text-sm font-medium rounded-lg border transition-colors ${
              inCompare
                ? 'bg-primary/10 text-primary border-primary/30'
                : 'bg-secondary/50 text-muted-foreground border-border/60 hover:text-foreground'
            }`}
          >
            <GitCompare className="w-4 h-4" />
            {inCompare ? 'Remove from Compare' : 'Add to Compare'}
          </button>

          {/* Trust badges */}
          <div className="mt-8 grid grid-cols-3 gap-4 pt-6 border-t border-border/40">
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
    </div>
  );
}