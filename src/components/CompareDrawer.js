'use client';

import Link from 'next/link';
import { useCompare } from '@/context/CompareContext';
import { X, GitCompare } from 'lucide-react';

export default function CompareDrawer() {
  const { items, removeFromCompare, clearCompare } = useCompare();

  if (items.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-3xl px-4">
      <div className="bg-card/90 backdrop-blur-xl border border-border/80 rounded-2xl shadow-sm p-4 flex items-center gap-4">
        {/* Icon */}
        <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary shrink-0">
          <GitCompare className="w-5 h-5" />
        </div>

        {/* Items */}
        <div className="flex-1 flex items-center gap-3 overflow-x-auto">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-2 bg-secondary/60 border border-border/60 rounded-xl px-3 py-2 shrink-0"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-8 h-8 object-contain"
              />
              <div className="flex flex-col">
                <span className="text-xs font-medium text-foreground line-clamp-1">{item.name}</span>
                <span className="text-[10px] text-muted-foreground/70">{item.category}</span>
              </div>
              <button
                onClick={() => removeFromCompare(item.id)}
                aria-label={`Remove ${item.name} from compare`}
                className="ml-1 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}

          {/* Add more hint */}
          {items.length < 2 && (
            <span className="text-xs text-muted-foreground/70 shrink-0">
              Add {2 - items.length} more to compare
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={clearCompare}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors px-3 py-2"
          >
            Clear
          </button>
          <Link
            href="/compare"
            className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-xl transition-colors ${
              items.length === 2
                ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm'
                : 'bg-secondary text-muted-foreground cursor-not-allowed'
            }`}
            onClick={(e) => items.length < 2 && e.preventDefault()}
          >
            Compare Now
          </Link>
        </div>
      </div>
    </div>
  );
}