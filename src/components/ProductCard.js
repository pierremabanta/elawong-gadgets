'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import ColorSwatches from './ColorSwatches';
import { useCompare } from '@/context/CompareContext';
import { GitCompare } from 'lucide-react';

export default function ProductCard({ product }) {
  const { id, name, category, price, originalPrice, image, badge, colors, images = [] } = product;
  const [selectedColor, setSelectedColor] = useState(colors?.[0] || null);
  const { addToCompare, isInCompare, canAddMore } = useCompare();

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
    <div className="group relative bg-card rounded-xl border border-border/60 overflow-hidden hover:shadow-sm hover:border-border transition-all duration-300 flex flex-col">
      {/* Image */}
      <Link
        href={`/shop/${id}`}
        className="relative aspect-square bg-muted/30 flex items-center justify-center p-6 sm:p-8"
      >
        <img
          src={displayImage}
          alt={name}
          className="w-full h-full object-contain group-hover:scale-105 transition-all duration-500"
          style={{ opacity: fade ? 1 : 0, transition: 'opacity 0.3s ease, transform 0.5s ease' }}
          loading="lazy"
        />
        {badge && (
          <span
            className={`absolute top-3 left-3 px-2.5 py-1 text-[10px] font-semibold rounded-md ${
              badge === 'New'
                ? 'bg-primary/10 text-primary'
                : badge === 'Sale'
                ? 'bg-foreground text-primary-foreground'
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
          className={`absolute top-3 right-3 p-2 rounded-lg backdrop-blur-sm transition-all duration-200 ${
            inCompare
              ? 'bg-primary text-primary-foreground'
              : 'bg-background/80 text-muted-foreground hover:text-foreground'
          }`}
        >
          <GitCompare className="w-3.5 h-3.5" />
        </button>
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-[10px] text-muted-foreground/60 uppercase tracking-wider mb-1">{category}</p>
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
      </div>
    </div>
  );
}