'use client';

import Link from 'next/link';
import { useCompare } from '@/context/CompareContext';
import { ChevronLeft, X, GitCompare, ShoppingBag, Crown } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

/* ---------- ranking helpers ---------- */

const CHIP_RANK = [
  'a17', 'a16', 'a15', 'a14', 'a13',
  'm4', 'm3', 'm2', 'm1',
  's9', 's8', 's7',
];

function normalize(text) {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

function chipRank(text) {
  const lower = normalize(text);
  for (let i = 0; i < CHIP_RANK.length; i++) {
    if (lower.includes(CHIP_RANK[i])) return i;
  }
  return 999;
}

function firstNumber(text) {
  const m = text.match(/(\d+\.?\d*)/);
  return m ? parseFloat(m[1]) : null;
}

function mp(text) {
  const m = text.match(/(\d+)\s*mp/i);
  return m ? parseInt(m[1], 10) : null;
}

function inches(text) {
  const m = text.match(/(\d+\.?\d*)\s*inch/i);
  return m ? parseFloat(m[1]) : null;
}

function hours(text) {
  const m = text.match(/up to (\d+) hours/);
  return m ? parseInt(m[1], 10) : null;
}

const CATEGORIES = [
  { key: 'chip', words: ['chip', 'processor', 'cpu', 'soc'] },
  { key: 'camera', words: ['camera', 'mp', 'lens', 'photo', 'video'] },
  { key: 'display', words: ['display', 'screen', 'inch', 'retina', 'xdr', 'oled', 'lcd'] },
  { key: 'battery', words: ['battery', 'hours', 'charging', 'magsafe'] },
  { key: 'design', words: ['design', 'titanium', 'aluminum', 'glass', 'ceramic', 'shield'] },
  { key: 'memory', words: ['gb', 'tb', 'ram', 'storage', 'memory', 'unified'] },
  { key: 'connectivity', words: ['wifi', 'bluetooth', '5g', 'cellular', 'usb', 'nfc', 'gps', 'port', 'connector'] },
  { key: 'software', words: ['ios', 'ipados', 'macos', 'watchos', 'os', 'siri'] },
  { key: 'sensors', words: ['sensor', 'lidar', 'face id', 'touch id', 'gyro', 'accelerometer'] },
];

function categoryOf(spec) {
  const lower = normalize(spec);
  for (const c of CATEGORIES) {
    if (c.words.some((w) => lower.includes(w))) return c.key;
  }
  return 'other';
}

function sameCategory(a, b) {
  if (!a || !b) return false;
  return categoryOf(a) === categoryOf(b);
}

function betterSide(a, b) {
  if (!a && !b) return null;
  if (!a) return 'b';
  if (!b) return 'a';

  const cat = categoryOf(a);

  if (cat === 'chip') {
    const ra = chipRank(a);
    const rb = chipRank(b);
    if (ra !== rb) return ra < rb ? 'a' : 'b';
  }

  if (cat === 'camera') {
    const ma = mp(a);
    const mb = mp(b);
    if (ma !== null && mb !== null && ma !== mb) return ma > mb ? 'a' : 'b';
  }

  if (cat === 'display') {
    const ia = inches(a);
    const ib = inches(b);
    if (ia !== null && ib !== null && ia !== ib) return ia > ib ? 'a' : 'b';
  }

  if (cat === 'battery') {
    const ha = hours(a);
    const hb = hours(b);
    if (ha !== null && hb !== null && ha !== hb) return ha > hb ? 'a' : 'b';
  }

  if (cat === 'memory') {
    const na = firstNumber(a);
    const nb = firstNumber(b);
    if (na !== null && nb !== null && na !== nb) return na > nb ? 'a' : 'b';
  }

  return null;
}

const LABELS = {
  chip: 'Chip',
  camera: 'Camera',
  display: 'Display',
  battery: 'Battery',
  design: 'Design',
  memory: 'Memory',
  connectivity: 'Connectivity',
  software: 'Software',
  sensors: 'Sensors',
  other: 'Feature',
};

function buildRows(items) {
  if (items.length < 2) return [];
  const [A, B] = items;
  const sA = A.specs || [];
  const sB = B.specs || [];

  const usedA = new Set();
  const usedB = new Set();
  const rows = [];

  for (const a of sA) {
    for (const b of sB) {
      if (usedB.has(b)) continue;
      if (sameCategory(a, b)) {
        usedA.add(a);
        usedB.add(b);
        rows.push({ category: categoryOf(a), a, b, better: betterSide(a, b) });
        break;
      }
    }
  }

  for (const a of sA) {
    if (!usedA.has(a)) rows.push({ category: categoryOf(a), a, b: null, better: 'a' });
  }
  for (const b of sB) {
    if (!usedB.has(b)) rows.push({ category: categoryOf(b), a: null, b, better: 'b' });
  }

  return rows;
}

/* ---------- page ---------- */

export default function ComparePage() {
  const { items, removeFromCompare, clearCompare } = useCompare();
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState(null);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  const rows = buildRows(items);
  const [productA, productB] = items;

  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-foreground text-white text-xs font-medium rounded-full mb-4">
          <GitCompare className="w-3.5 h-3.5" />
          Compare Products
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Product Comparison</h1>
        <p className="text-sm text-muted-foreground mt-2">Side-by-side specs, features, and pricing.</p>
      </div>

      {items.length < 2 ? (
        <div className="text-center py-20">
          <GitCompare className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">Not enough products to compare</h2>
          <p className="text-sm text-muted-foreground mb-8">Add at least 2 products to compare them.</p>
          <Link href="/shop" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm">
            <ChevronLeft className="w-4 h-4" />
            Browse Products
          </Link>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-card border border-border/60 rounded-2xl p-4 flex items-center gap-4">
              <img src={productA.image} alt={productA.name} className="w-16 h-16 object-contain" />
              <div>
                <p className="text-xs text-muted-foreground/60 uppercase tracking-wider">{productA.category}</p>
                <h3 className="text-base font-semibold text-foreground">{productA.name}</h3>
                <p className="text-sm font-bold text-foreground">₱{productA.price.toLocaleString('en-PH')}</p>
              </div>
            </div>
            <div className="hidden md:flex items-center justify-center">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">VS</span>
            </div>
            <div className="bg-card border border-border/60 rounded-2xl p-4 flex items-center gap-4">
              <img src={productB.image} alt={productB.name} className="w-16 h-16 object-contain" />
              <div>
                <p className="text-xs text-muted-foreground/60 uppercase tracking-wider">{productB.category}</p>
                <h3 className="text-base font-semibold text-foreground">{productB.name}</h3>
                <p className="text-sm font-bold text-foreground">₱{productB.price.toLocaleString('en-PH')}</p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border/60 rounded-2xl overflow-hidden mb-8">
            <div className="px-6 py-4 border-b border-border/60 bg-secondary/30">
              <h2 className="text-lg font-semibold text-foreground">Specifications Comparison</h2>
            </div>
            <div className="divide-y divide-border/40">
              {rows.map((row, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 px-4 md:px-6 py-3 md:py-4 items-center"
                >
                  <div className={`text-sm ${row.a ? 'text-foreground' : 'text-muted-foreground/40'}`}>
                    {row.a ? (
                      <span className="inline-flex items-center gap-2">
                        {row.a}
                        {row.better === 'a' && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                            <Crown className="w-3 h-3" /> Better
                          </span>
                        )}
                      </span>
                    ) : (
                      '—'
                    )}
                  </div>

                  <div className="text-sm font-medium text-foreground md:text-center capitalize">
                    {LABELS[row.category] || row.category}
                  </div>

                  <div className={`text-sm md:text-right ${row.b ? 'text-foreground' : 'text-muted-foreground/40'}`}>
                    {row.b ? (
                      <span className="inline-flex items-center gap-2">
                        {row.b}
                        {row.better === 'b' && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                            <Crown className="w-3 h-3" /> Better
                          </span>
                        )}
                      </span>
                    ) : (
                      '—'
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
              <Crown className="w-3 h-3" /> Better spec
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/shop" className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground text-sm font-medium rounded-lg hover:bg-accent/50 transition-colors">
              <ChevronLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
            <button onClick={clearCompare} className="inline-flex items-center gap-2 px-6 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
              Clear Comparison
            </button>
          </div>
        </div>
      )}
    </div>
  );
}