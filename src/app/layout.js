import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { CompareProvider } from "@/context/CompareContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CompareDrawer from "@/components/CompareDrawer";
import MessengerChat from "@/components/MessengerChat";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ela Wong Gadgets Shop — Ayala Marikina Branch",
  description:
    "Apple Authorized Reseller in Marikina City. Shop iPhones, iPads, MacBooks, AirPods, Apple Watch, and accessories. Genuine Apple products with official warranty.",
  openGraph: {
    title: "Ela Wong Gadgets Shop — Ayala Marikina Branch",
    description:
      "Apple Authorized Reseller in Marikina City. Shop the latest Apple products.",
    type: "website",
    locale: "en_US",
    siteName: "Ela Wong Gadgets",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Facebook Messenger SDK */}
        <meta property="fb:pages" content="100094755281207" />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <CompareProvider>
          <CartProvider>
            <Navbar />
            <CompareDrawer />
            <main className="flex-1">{children}</main>
            <Footer />
            <MessengerChat />
          </CartProvider>
        </CompareProvider>
      </body>
    </html>
  );
}