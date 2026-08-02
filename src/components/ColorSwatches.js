'use client';

import { useState, useEffect, useRef } from 'react';

export default function ColorSwatches({ colors, selectedColor, onSelect }) {
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

      {colors.map((color, index) => (
        <button
          key={color.name}
          ref={(el) => (buttonRefs.current[color.name] = el)}
          onClick={() => onSelect?.(color)}
          title={color.name}
          className="relative z-10 block w-5 h-5 rounded-full border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-foreground/40 focus:ring-offset-2 focus:ring-offset-background"
          style={{
            backgroundColor: color.hex,
            borderColor: selectedColor?.name === color.name ? '#0a0a0a' : 'transparent',
            boxShadow:
              selectedColor?.name === color.name ? '0 0 0 1px rgba(10,10,10,0.8)' : 'none',
            transform: selectedColor?.name === color.name ? 'scale(1.1)' : 'scale(1)',
          }}
        >
          <span className="sr-only">{color.name}</span>
        </button>
      ))}
    </div>
  );
}