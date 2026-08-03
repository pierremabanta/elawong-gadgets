'use client';

import { useState, useEffect, useRef } from 'react';

export default function ColorSwatches({ colors, selectedColor, onSelect, outOfStock = [] }) {
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const containerRef = useRef(null);
  const buttonRefs = useRef({});

  useEffect(() => {
    if (!containerRef.current) return;
    const selectedKey = selectedColor?.name;
    const btn = buttonRefs.current[selectedKey];
    if (!btn) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();

    setIndicatorStyle({
      width: `${btnRect.width}px`,
      transform: `translateX(${btnRect.left - containerRect.left}px)`,
    });
  }, [selectedColor]);

  if (!colors || colors.length <= 1) return null;

  return (
    <div className="relative flex items-center gap-2" ref={containerRef}>
      {/* Sliding background indicator */}
      <span
        className="absolute top-1/2 -translate-y-1/2 h-5 bg-foreground/10 border border-foreground/20 rounded-full transition-all duration-300 ease-out"
        style={indicatorStyle}
        aria-hidden="true"
      />

      {colors.map((color, index) => {
        const isSelected = selectedColor?.name === color.name;
        const isOut = outOfStock.includes(color.name);
        return (
          <button
            key={color.name}
            ref={(el) => (buttonRefs.current[color.name] = el)}
            onClick={() => !isOut && onSelect?.(color)}
            title={isOut ? `${color.name} — Out of stock at this branch` : color.name}
            disabled={isOut}
            aria-disabled={isOut}
            className={`relative z-10 block w-5 h-5 rounded-full border transition-all duration-200 focus:outline-none ${
              isOut ? 'opacity-30 cursor-not-allowed' : ''
            } ${!isOut ? 'focus:ring-2 focus:ring-foreground/40 focus:ring-offset-2 focus:ring-offset-background' : ''}`}
            style={{
              backgroundColor: color.hex,
              borderColor: isSelected ? '#0a0a0a' : 'transparent',
              boxShadow: isSelected ? '0 0 0 1px rgba(10,10,10,0.8)' : 'none',
              transform: isSelected ? 'scale(1.1)' : 'scale(1)',
            }}
          >
            {isOut && (
              <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                <span className="block w-4 h-px bg-foreground/60 rotate-45" />
              </span>
            )}
            <span className="sr-only">{color.name}</span>
          </button>
        );
      })}
    </div>
  );
}