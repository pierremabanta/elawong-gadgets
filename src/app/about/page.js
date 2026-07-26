import Link from 'next/link';
import { Apple, Shield, Award, Users, Star, MapPin, ChevronRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 to-background pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/5 to-transparent rounded-full blur-3xl pointer-events-none" />
        
        <div className="container relative py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-foreground text-primary-foreground text-xs font-medium rounded-full mb-6">
            <Apple className="w-3.5 h-3.5 text-chart-2" />
            About Us
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            Your Trusted Apple Partner in Marikina
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Ela Wong Gadgets Shop — Ayala Marikina Branch is an Apple Authorized Reseller 
            dedicated to providing genuine Apple products and exceptional customer service 
            to the Marikina community.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="container py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">Our Story</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
              Bringing Apple&apos;s Best to Ayala Marikina
            </h2>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                Ela Wong Gadgets Shop started with a simple mission: to make authentic Apple 
                products accessible to the people of Marikina City. As an Apple Authorized 
                Reseller, we offer the full range of Apple products — from the latest iPhones 
                and iPads to MacBooks, AirPods, and accessories.
              </p>
              <p>
                Located at Ayala Marikina, our store is committed to providing a premium 
                shopping experience. Every product we sell comes with an official Apple 
                warranty, ensuring peace of mind with every purchase.
              </p>
              <p>
                Whether you&apos;re a creative professional, a student, or someone who simply 
                loves great technology, we&apos;re here to help you find the perfect Apple device 
                for your needs.
              </p>
            </div>
          </div>
          <div className="aspect-square bg-secondary/50 rounded-3xl flex items-center justify-center border border-border/40">
            <div className="text-center p-8">
              <Apple className="w-16 h-16 text-primary/40 mx-auto mb-4" />
              <p className="text-sm text-muted-foreground">Apple Authorized Reseller</p>
              <p className="text-xs text-muted-foreground/60 mt-1">Ayala Marikina Branch</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-border/40 bg-secondary/30">
        <div className="container py-16 md:py-24">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Why Choose Us</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">What We Stand For</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: 'Genuine Products',
                desc: '100% authentic Apple products with official warranty.',
              },
              {
                icon: Award,
                title: 'Authorized Reseller',
                desc: 'Certified by Apple to sell their full product line.',
              },
              {
                icon: Users,
                title: 'Expert Support',
                desc: 'Knowledgeable staff to help you choose the right device.',
              },
              {
                icon: Star,
                title: 'Customer First',
                desc: 'Your satisfaction is our top priority, always.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-card rounded-2xl border border-border/60 p-6 text-center hover:border-primary/30 hover:shadow-sm transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-4 h-4 text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location CTA */}
      <section className="container py-16 md:py-24 text-center">
        <div className="flex items-center justify-center gap-2 text-primary mb-4">
          <MapPin className="w-4 h-4" />
          <span className="text-xs font-semibold uppercase tracking-wider">Visit Us</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
          Come Visit Our Store
        </h2>
        <p className="text-sm text-muted-foreground mb-8 max-w-md mx-auto">
          Drop by our branch at Ayala Marikina to see our full selection of Apple products 
          in person. Our team is ready to assist you!
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
        >
          Get in Touch
          <ChevronRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}