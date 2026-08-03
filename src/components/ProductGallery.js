'use client';

import { useState, useEffect, useRef } from 'react';

export default function ProductGallery({ images = [], productName, syncImage }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const touchStartX = useRef(null);
  const currentImage = images[selectedIndex] || null;

  // Sync gallery with color swatch selection (when the color has a matching image)
  useEffect(() => {
    if (syncImage && images.length > 0) {
      const idx = images.indexOf(syncImage);
      if (idx >= 0) setSelectedIndex(idx);
    }
  }, [syncImage, images]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 40) {
      if (diff < 0 && selectedIndex < images.length - 1) {
        setSelectedIndex(selectedIndex + 1);
      } else if (diff > 0 && selectedIndex > 0) {
        setSelectedIndex(selectedIndex - 1);
      }
    }
    touchStartX.current = null;
  };

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-secondary/30 flex items-center justify-center">
        <p className="text-sm text-muted-foreground">No images available</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div
        className="aspect-square bg-secondary/30 flex items-center justify-center p-8 sm:p-12 md:p-16 overflow-hidden select-none rounded-2xl"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <img
          key={currentImage}
          src={currentImage}
          alt={`${productName} - Image ${selectedIndex + 1}`}
          className="w-full h-full object-contain transition-opacity duration-300"
          style={{ opacity: 1 }}
          draggable={false}
        />
      </div>

      {/* Mobile dots */}
      {images.length > 1 && (
        <div className="flex sm:hidden items-center justify-center gap-1.5">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              aria-label={`View image ${index + 1}`}
              className={`h-1.5 transition-all duration-200 rounded-full ${
                selectedIndex === index ? 'w-6 bg-primary' : 'w-1.5 bg-border hover:bg-border/80'
              }`}
            />
          ))}
        </div>
      )}

      {/* Desktop thumbnails */}
      {images.length > 1 && (
        <div className="hidden sm:flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              aria-label={`View image ${index + 1}`}
              className={`relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 overflow-hidden rounded-xl transition-all duration-200 ${
                selectedIndex === index
                  ? 'border-primary shadow-sm'
                  : 'border-border/60 hover:border-border'
              }`}
            >
              <img
                src={img}
                alt={`${productName} thumbnail ${index + 1}`}
                className="w-full h-full object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
