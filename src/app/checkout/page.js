'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Check, CreditCard, Landmark, Smartphone, Building2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const paymentMethods = [
  { id: 'gcash', name: 'GCash', icon: Smartphone },
  { id: 'bank', name: 'Bank Transfer', icon: Landmark },
  { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
  { id: 'cod', name: 'Cash on Delivery', icon: Building2 },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartTotal, cartCount, clearCart } = useCart();
  const [step, setStep] = useState('form'); // form | review | success
  const [paymentMethod, setPaymentMethod] = useState('gcash');
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Marikina',
    province: 'Metro Manila',
    zip: '',
    notes: '',
  });

  const formatPrice = (p) => '₱' + p.toLocaleString('en-PH');
  const deliveryFee = 0;

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handlePlaceOrder = () => {
    setStep('success');
    setTimeout(() => clearCart(), 500);
  };

  if (step === 'success') {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-xl bg-primary/15 flex items-center justify-center mx-auto mb-6">
          <Check className="w-6 h-6 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-3">Order Placed!</h1>
        <p className="text-sm text-muted-foreground mb-2">
          Thank you for shopping with Ela Wong Gadgets!
        </p>
        <p className="text-xs text-muted-foreground/70 mb-8">
          This is a demo — no actual payment was processed. In production, you&apos;d receive a confirmation email with your order details.
        </p>
        <div className="bg-secondary/40 border border-border/60 rounded-2xl p-6 mb-8 text-left">
          <p className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider mb-3">Demo Order Summary</p>
          <p className="text-sm text-muted-foreground">
            <strong>Name:</strong> {form.firstName} {form.lastName}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            <strong>Payment:</strong> {paymentMethods.find((m) => m.id === paymentMethod)?.name}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            <strong>Total:</strong> {formatPrice(cartTotal)}
          </p>
          <p className="text-[10px] text-muted-foreground/70 mt-3 italic">
            This is a prototype. Contact the store via Facebook Messenger to place a real order.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-medium rounded-xl transition-colors"
          >
            Continue Shopping
          </Link>
          <a
            href="https://www.facebook.com/elawonggadgetsayalamarikina"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border text-muted-foreground text-sm font-medium rounded-xl hover:bg-secondary/40 transition-colors"
          >
            Visit Facebook Page
          </a>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-3">Your Cart is Empty</h1>
        <p className="text-sm text-muted-foreground mb-8">Add some items to proceed with checkout.</p>
        <Link href="/shop" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-medium rounded-xl transition-colors">
          <ChevronLeft className="w-4 h-4" />
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="mb-8">
        <p className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider mb-2">Checkout</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Complete Your Order</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-3 space-y-6">
          {/* Contact Information */}
          <div className="bg-card border border-border/60 rounded-2xl p-6">
            <h2 className="text-sm font-semibold text-foreground mb-4">Contact Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5">First Name</label>
                <input
                  type="text"
                  value={form.firstName}
                  onChange={(e) => updateField('firstName', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm border border-input rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all"
                  placeholder="Juan"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5">Last Name</label>
                <input
                  type="text"
                  value={form.lastName}
                  onChange={(e) => updateField('lastName', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm border border-input rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all"
                  placeholder="Dela Cruz"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs text-muted-foreground mb-1.5">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm border border-input rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all"
                  placeholder="juan@example.com"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs text-muted-foreground mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm border border-input rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all"
                  placeholder="0917 123 4567"
                />
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="bg-card border border-border/60 rounded-2xl p-6">
            <h2 className="text-sm font-semibold text-foreground mb-4">Delivery Address</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5">Address</label>
                <input
                  type="text"
                  value={form.address}
                  onChange={(e) => updateField('address', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm border border-input rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all"
                  placeholder="123 Rizal St., Brgy. San Roque"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5">City</label>
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) => updateField('city', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border border-input rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5">Province</label>
                  <input
                    type="text"
                    value={form.province}
                    onChange={(e) => updateField('province', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border border-input rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5">ZIP Code</label>
                  <input
                    type="text"
                    value={form.zip}
                    onChange={(e) => updateField('zip', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border border-input rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all"
                    placeholder="1800"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5">Order Notes (Optional)</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => updateField('notes', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm border border-input rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all resize-none"
                  rows={3}
                  placeholder="Special instructions, delivery time preferences, etc."
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-card border border-border/60 rounded-2xl p-6">
            <h2 className="text-sm font-semibold text-foreground mb-4">Payment Method</h2>
            <div className="space-y-2">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                const selected = paymentMethod === method.id;
                return (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`w-full flex items-center gap-3 p-3 border rounded-xl text-left transition-colors ${
                      selected
                        ? 'border-foreground bg-secondary/40'
                        : 'border-border/60 hover:border-border'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">{method.name}</span>
                    {selected && <Check className="w-3.5 h-3.5 text-foreground ml-auto" />}
                  </button>
                );
              })}
            </div>
            <p className="text-[10px] text-muted-foreground/70 mt-3 italic">
              Demo mode — no payment will be processed.
            </p>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-2">
          <div className="bg-secondary/40 border border-border/60 rounded-2xl p-6 sticky top-24 shadow-sm">
            <h2 className="text-sm font-semibold text-foreground mb-4">Order Summary</h2>

            {/* Items */}
            <div className="space-y-3 mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-card rounded-lg flex items-center justify-center p-2">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground line-clamp-1">{item.name}</p>
                    <p className="text-[10px] text-muted-foreground/70">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-xs font-medium text-foreground">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-2 text-sm border-t border-border/60 pt-4">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Delivery</span>
                <span className="text-primary font-medium">Free</span>
              </div>
              <div className="flex justify-between font-semibold text-foreground text-base border-t border-border/60 pt-2 mt-2">
                <span>Total</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="mt-6 w-full py-3 bg-primary text-primary-foreground text-sm font-medium rounded-xl hover:bg-primary/90 transition-colors shadow-sm"
            >
              Place Order (Demo)
            </button>

            <p className="text-[10px] text-muted-foreground/70 text-center mt-3">
              This is a demo prototype. No real payment will be processed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
