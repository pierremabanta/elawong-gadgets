import Link from 'next/link';
import { Apple, ExternalLink, MapPin, Phone, Mail, Clock } from 'lucide-react';
import StoreLogo from './StoreLogo';

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-secondary/50">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <StoreLogo link={false} className="mb-4" />
            <p className="text-sm text-muted-foreground leading-relaxed mt-4">
              Your trusted Apple Authorized Reseller in Marikina City. Quality gadgets, genuine products, and exceptional service.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">Shop</h3>
            <ul className="space-y-2.5">
              {['iPhones', 'iPads', 'MacBooks', 'AirPods', 'Apple Watch', 'Accessories'].map((cat) => (
                <li key={cat}>
                  <Link href={`/shop?category=${cat}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span className="text-sm text-muted-foreground">Ayala Marikina, Marikina City, Philippines</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span className="text-sm text-muted-foreground">+63 948 2334 101</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span className="text-sm text-muted-foreground">andre.mabanta@gmail.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-primary shrink-0" />
                <span className="text-sm text-muted-foreground">Mon–Sat: 9AM–7PM</span>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">Follow Us</h3>
            <a
              href="https://www.facebook.com/elawonggadgetsayalamarikina"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <ExternalLink className="w-4 h-4 text-primary" />
              Facebook Page
            </a>
            <p className="text-sm text-muted-foreground/60">
              Visit our Facebook page for the latest promotions and new arrivals.
            </p>
          </div>
        </div>

        <div className="border-t border-border/40 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground/60">
            © {new Date().getFullYear()} Ela Wong Gadgets Shop — Ayala Marikina Branch. All rights reserved.
          </p>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary text-primary-foreground text-[10px] font-medium rounded-md">
            <Apple className="w-3 h-3" />
            Apple Authorized Reseller
          </div>
        </div>
      </div>
    </footer>
  );
}