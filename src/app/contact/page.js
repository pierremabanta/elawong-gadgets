import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, ExternalLink, MessageCircle, ChevronRight, Apple } from 'lucide-react';

export default function ContactPage() {
  return (
    <div>
      {/* Header */}
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 to-background pointer-events-none" />
        <div className="absolute top-0 left-1/3 w-80 h-80 bg-gradient-to-bl from-primary/5 to-transparent rounded-full blur-3xl pointer-events-none" />
        
        <div className="container relative py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-foreground text-primary-foreground text-xs font-medium rounded-full mb-6">
            <Apple className="w-3.5 h-3.5 text-chart-2" />
            Contact
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            Get in Touch
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Have a question? Want to check product availability? We&apos;d love to hear from you. 
            Reach out through any of the channels below.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="container py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[
            {
              icon: MapPin,
              label: 'Visit Us',
              value: 'Ayala Marikina\nMarikina City',
              action: 'Get Directions',
              href: 'https://maps.google.com/?q=Ayala+Marikina+Marikina+City',
            },
            {
              icon: Phone,
              label: 'Call Us',
              value: '+63 948 2334 101',
              action: 'Call Now',
              href: 'tel:+639482334101',
            },
            {
              icon: Mail,
              label: 'Email Us',
              value: 'andre.mabanta@gmail.com',
              action: 'Send Email',
              href: 'mailto:andre.mabanta@gmail.com',
            },
            {
              icon: Clock,
              label: 'Store Hours',
              value: 'Mon–Sat: 9AM–7PM\nSunday: By appointment',
              action: null,
              href: null,
            },
          ].map((item) => (
            <div key={item.label} className="bg-card border border-border/60 rounded-2xl p-6 hover:border-primary/30 hover:shadow-sm transition-all duration-300">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <item.icon className="w-4 h-4 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-2">{item.label}</h3>
              <p className="text-xs text-muted-foreground whitespace-pre-line mb-4">{item.value}</p>
              {item.action && item.href && (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  {item.action}
                  <ChevronRight className="w-3 h-3" />
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Social & Messaging */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Facebook Card */}
          <div className="bg-secondary/30 border border-border/60 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <ExternalLink className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Facebook Page</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Follow us on Facebook for the latest updates, promotions, and new arrivals.
            </p>
            <a
              href="https://www.facebook.com/elawonggadgetsayalamarikina"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
            >
              <ExternalLink className="w-4 h-4" />
              Visit Our Page
            </a>
          </div>

          {/* Messenger Card */}
          <div className="bg-secondary/30 border border-border/60 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <MessageCircle className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Chat with Us</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Message us directly on Facebook Messenger for quick inquiries and product questions.
            </p>
            <a
              href="https://m.me/100094755281207"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              Message Us
            </a>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="mt-8 bg-secondary/30 border border-border/60 rounded-2xl h-64 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-8 h-8 text-primary/30 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Ayala Marikina, Marikina City</p>
            <a
              href="https://maps.google.com/?q=Ayala+Marikina+Marikina+City"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary hover:underline mt-1 inline-block"
            >
              Open in Google Maps →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}