'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import ColorSwatches from './ColorSwatches';
import { useCompare } from '@/context/CompareContext';
import { GitCompare } from 'lucide-react';
import { DEFAULT_BRANCH_ID } from '@/data/branches';

export default function ProductCard({ product }) {
  const { id, name, category, price, originalPrice, image, badge, colors, images = [], stock } = product;
  const [selectedColor, setSelectedColor] = useState(colors?.[0] || null);
  const { addToCompare, isInCompare, canAddMore } = useCompare();

  // Stock for the main branch (Ayala Marikina) — per selected color
  const colorStock = selectedColor?.stock?.[DEFAULT_BRANCH_ID];
  const mainStock = colorStock ?? (stock?.[DEFAULT_BRANCH_ID] ?? 0);
  const stockStatus = mainStock <= 0 ? 'out' : mainStock <= 3 ? 'low' : 'in';

  // Use color-specific image if available and selected, otherwise default image
  const colorImage = selectedColor?.image 
    ? selectedColor.image 
    : images[0] || image;

  // Smooth image crossfade
  const [displayImage, setDisplayImage] = useState(colorImage);
  const [fade, setFade] = useState(true);
  const prevColorImage = useRef(colorImage);

  useEffect(() => {
    if (prevColorImage.current !== colorImage) {
      setFade(false);
      const timer = setTimeout(() => {
        setDisplayImage(colorImage);
        setFade(true);
        prevColorImage.current = colorImage;
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [colorImage]);

  const formatPrice = (p) =>
    '₱' + p.toLocaleString('en-PH');

  const handleCompareClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (canAddMore || isInCompare(id)) {
      addToCompare(product);
    }
  };

  const inCompare = isInCompare(id);

  return (
    <div className="group relative bg-card border border-border/60 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden">
      {/* Image */}
      <Link
        href={`/shop/${id}`}
        className="relative aspect-square bg-muted/30 flex items-center justify-center p-6 sm:p-8"
      >
        <img
          src={displayImage}
          alt={name}
          className="w-full h-full object-contain group-hover:scale-105 transition-all duration-500 ease-out"
          style={{ opacity: fade ? 1 : 0, transition: 'opacity 0.3s ease, transform 0.5s ease' }}
          loading="lazy"
        />
        {badge && (
          <span
            className={`absolute top-3 left-3 px-2.5 py-1 text-[10px] font-semibold rounded-lg ${
              badge === 'New'
                ? 'bg-primary/10 text-primary'
                : badge === 'Sale'
                ? 'bg-foreground text-white'
                : 'bg-primary text-primary-foreground'
            }`}
          >
            {badge}
          </span>
        )}
        
        {/* Compare Button */}
        <button
          onClick={handleCompareClick}
          title={inCompare ? 'Remove from compare' : 'Add to compare'}
          aria-label={inCompare ? 'Remove from compare' : 'Add to compare'}
          className={`absolute top-3 right-3 p-2 rounded-lg transition-all duration-200 backdrop-blur-sm ${
            inCompare
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'bg-background/70 text-muted-foreground hover:text-foreground'
          }`}
        >
          <GitCompare className="w-3.5 h-3.5" />
        </button>
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-[10px] text-muted-foreground/70 uppercase tracking-wider mb-1">{category}</p>
        <Link
          href={`/shop/${id}`}
          className="text-sm font-medium text-foreground group-hover:text-muted-foreground transition-colors line-clamp-1"
        >
          {name}
        </Link>
        
        {/* Color swatches */}
        {colors && colors.length > 1 && (
          <div className="mt-2" onClick={(e) => e.preventDefault()}>
            <ColorSwatches
              colors={colors}
              selectedColor={selectedColor}
              onSelect={setSelectedColor}
            />
          </div>
        )}

        <div className="mt-auto pt-3 flex items-baseline gap-2">
          <span className="text-base font-semibold text-foreground">{formatPrice(price)}</span>
          {originalPrice && (
            <span className="text-xs text-muted-foreground/50 line-through">{formatPrice(originalPrice)}</span>
          )}
        </div>

        {/* Stock indicator (selected color · Ayala Marikina branch) */}
        <p className="mt-1.5 flex items-center gap-1.5 text-[11px]">
          <span
            className={`w-1.5 h-1.5 rounded-full shrink-0 ${
              stockStatus === 'in' ? 'bg-primary' : stockStatus === 'low' ? 'bg-destructive' : 'bg-muted-foreground/40'
            }`}
          />
          {stockStatus === 'in' && <span className="text-primary font-medium">In Stock</span>}
          {stockStatus === 'low' && <span className="text-destructive font-medium">Low Stock</span>}
          {stockStatus === 'out' && <span className="text-muted-foreground/60">Out of Stock</span>}
        </p>
      </div>
    </div>
  );
}