'use client';

import Link from 'next/link';
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft, ChevronRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  const formatPrice = (p) => '₱' + p.toLocaleString('en-PH');

  if (cart.length === 0) {
    return (
      <div className="container py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-6 h-6 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-3">Your Cart is Empty</h1>
        <p className="text-sm text-muted-foreground mb-8">Looks like you haven&apos;t added anything yet.</p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="mb-10">
        <span className="text-xs font-semibold text-primary uppercase tracking-[0.15em] block mb-1">Cart</span>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
          Shopping Cart ({cartCount} item{cartCount !== 1 ? 's' : ''})
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 sm:gap-6 p-4 bg-card border border-border/60 rounded-2xl shadow-sm"
            >
              {/* Image */}
              <Link
                href={`/shop/${item.id}`}
                className="w-20 h-20 sm:w-24 sm:h-24 bg-muted/30 rounded-xl flex items-center justify-center p-3 shrink-0 border border-border/40"
              >
                <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
              </Link>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <Link
                  href={`/shop/${item.id}`}
                  className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors line-clamp-1"
                >
                  {item.name}
                </Link>
                <p className="text-[10px] text-muted-foreground/70 uppercase tracking-wider mt-0.5">{item.category}</p>
                <p className="text-sm font-semibold text-foreground mt-2">
                  {formatPrice(item.price)}
                </p>

                {/* Quantity & Remove */}
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-input rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={`Decrease quantity for ${item.name}`}
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-9 text-center text-xs font-medium text-foreground">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={`Increase quantity for ${item.name}`}
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-muted-foreground/50 hover:text-destructive transition-colors"
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-secondary/40 border border-border/60 rounded-2xl p-6 sticky top-24 shadow-sm">
            <h2 className="text-sm font-semibold text-foreground mb-4">Order Summary</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal ({cartCount} items)</span>
                <span className="text-foreground">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Delivery Fee</span>
                <span className="text-primary font-medium">Free</span>
              </div>
              <div className="border-t border-border/60 pt-3 flex justify-between font-semibold text-foreground">
                <span>Total</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="mt-6 w-full flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground text-sm font-medium rounded-xl hover:bg-primary/90 transition-colors shadow-sm"
            >
              Proceed to Checkout
              <ChevronRight className="w-4 h-4" />
            </Link>

            <Link
              href="/shop"
              className="mt-3 w-full flex items-center justify-center gap-2 py-3 border border-border text-muted-foreground text-sm font-medium rounded-xl hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}