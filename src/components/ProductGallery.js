'use client';

import { useState } from 'react';

export default function ProductGallery({ images = [], productName }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const currentImage = images[selectedIndex] || null;

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-secondary/30 rounded-3xl flex items-center justify-center">
        <p className="text-sm text-muted-foreground">No images available</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="aspect-square bg-secondary/30 rounded-3xl flex items-center justify-center p-8 sm:p-12 md:p-16 overflow-hidden">
        <img
          key={currentImage}
          src={currentImage}
          alt={`${productName} - Image ${selectedIndex + 1}`}
          className="w-full h-full object-contain transition-opacity duration-300"
          style={{ opacity: 1 }}
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
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