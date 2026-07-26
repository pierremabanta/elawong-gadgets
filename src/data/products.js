export const products = [
  // === iPhones ===
  {
    id: "iphone-15-pro-max",
    name: "iPhone 15 Pro Max",
    category: "iPhones",
    price: 76990,
    originalPrice: 79990,
    image: "/images/iphone-15-pro-max/black-titanium.png",
    images: [
      "/images/iphone-15-pro-max/natural-titanium.png",
      "/images/iphone-15-pro-max/blue-titanium.png",
      "/images/iphone-15-pro-max/white-titanium.png",
      "/images/iphone-15-pro-max/black-titanium.png",
    ],
    description: "The most powerful iPhone ever. A17 Pro chip, 48MP camera system, titanium design, and all-day battery life.",
    specs: [
      "A17 Pro chip (3nm)",
      "48MP Main | 12MP Ultra Wide | 12MP Telephoto | 5x optical zoom",
      "6.7-inch Super Retina XDR display (2796x1290)",
      "Titanium design",
      "Up to 29 hours video playback",
      "USB-C connector",
    ],
    badge: "New",
    featured: true,
    colors: [
      { name: "Natural Titanium", hex: "#8f8f8f", image: "/images/iphone-15-pro-max/natural-titanium.png" },
      { name: "Blue Titanium", hex: "#4a6fa5", image: "/images/iphone-15-pro-max/blue-titanium.png" },
      { name: "White Titanium", hex: "#f0f0f0", image: "/images/iphone-15-pro-max/white-titanium.png" },
      { name: "Black Titanium", hex: "#2d2d2d", image: "/images/iphone-15-pro-max/black-titanium.png" },
    ],
  },
  {
    id: "iphone-15",
    name: "iPhone 15",
    category: "iPhones",
    price: 54990,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1592286927505-1a2513d4e3f9?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=800&h=800&fit=crop",
    ],
    badge: null,
    featured: true,
    colors: [
      { name: "Pink", hex: "#ffc0cb", image: "" },
      { name: "Yellow", hex: "#fce689", image: "" },
      { name: "Green", hex: "#a8e6cf", image: "" },
      { name: "Blue", hex: "#a0c4ff", image: "" },
      { name: "Black", hex: "#2d2d2d", image: "" },
    ],
  },
  {
    id: "iphone-14",
    name: "iPhone 14",
    category: "iPhones",
    price: 46990,
    originalPrice: 49990,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1512054502237-3eaa4b5a6c8e?w=800&h=800&fit=crop",
    ],
    badge: "Sale",
    featured: false,
    colors: [
      { name: "Midnight", hex: "#2d2d2d", image: "" },
      { name: "Starlight", hex: "#f5f5f0", image: "" },
      { name: "Blue", hex: "#a0c4ff", image: "" },
      { name: "Purple", hex: "#c8b8e8", image: "" },
      { name: "Red", hex: "#dc143c", image: "" },
    ],
  },

  // === iPads ===
  {
    id: "ipad-pro-m4",
    name: "iPad Pro M4",
    category: "iPads",
    price: 59990,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1587033411391-5d9e51cce126?w=800&h=800&fit=crop",
    ],
    badge: "New",
    featured: true,
    colors: [
      { name: "Silver", hex: "#e8e8e8", image: "" },
      { name: "Space Black", hex: "#2d2d2d", image: "" },
    ],
  },
  {
    id: "ipad-air-m2",
    name: "iPad Air M2",
    category: "iPads",
    price: 34990,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1601944179066-29786cb9d32a?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1601944179066-29786cb9d32a?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&h=800&fit=crop",
    ],
    badge: null,
    featured: false,
    colors: [
      { name: "Space Gray", hex: "#4a4a4a", image: "" },
      { name: "Starlight", hex: "#f5f5f0", image: "" },
      { name: "Purple", hex: "#c8b8e8", image: "" },
      { name: "Blue", hex: "#a0c4ff", image: "" },
    ],
  },

  // === MacBooks ===
  {
    id: "macbook-pro-14",
    name: 'MacBook Pro 14" M3 Pro',
    category: "MacBooks",
    price: 109990,
    originalPrice: 119990,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&h=800&fit=crop",
    ],
    badge: "Sale",
    featured: true,
    colors: [
      { name: "Space Black", hex: "#2d2d2d", image: "" },
      { name: "Silver", hex: "#e8e8e8", image: "" },
    ],
  },
  {
    id: "macbook-air-m3",
    name: 'MacBook Air 15" M3',
    category: "MacBooks",
    price: 79990,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=800&fit=crop",
    ],
    badge: null,
    featured: true,
    colors: [
      { name: "Midnight", hex: "#2d2d2d", image: "" },
      { name: "Starlight", hex: "#f5f5f0", image: "" },
      { name: "Space Gray", hex: "#4a4a4a", image: "" },
      { name: "Silver", hex: "#e8e8e8", image: "" },
    ],
  },

  // === AirPods ===
  {
    id: "airpods-pro-2",
    name: "AirPods Pro (2nd Gen)",
    category: "AirPods",
    price: 13990,
    originalPrice: 14990,
    image: "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=800&fit=crop",
    ],
    badge: "Sale",
    featured: true,
    colors: [
      { name: "White", hex: "#ffffff", image: "" },
    ],
  },
  {
    id: "airpods-3",
    name: "AirPods (3rd Gen)",
    category: "AirPods",
    price: 9490,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=800&h=800&fit=crop",
    ],
    badge: null,
    featured: false,
    colors: [
      { name: "White", hex: "#ffffff", image: "" },
    ],
  },

  // === Apple Watch ===
  {
    id: "apple-watch-ultra-2",
    name: "Apple Watch Ultra 2",
    category: "Apple Watch",
    price: 44990,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&h=800&fit=crop",
    ],
    badge: "New",
    featured: true,
    colors: [
      { name: "Natural Titanium", hex: "#8f8f8f", image: "" },
    ],
  },
  {
    id: "apple-watch-series-9",
    name: "Apple Watch Series 9",
    category: "Apple Watch",
    price: 26990,
    originalPrice: 29990,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop",
    ],
    badge: "Sale",
    featured: false,
    colors: [
      { name: "Midnight", hex: "#2d2d2d", image: "" },
      { name: "Starlight", hex: "#f5f5f0", image: "" },
      { name: "Silver", hex: "#e8e8e8", image: "" },
      { name: "Red", hex: "#dc143c", image: "" },
      { name: "Pink", hex: "#ffc0cb", image: "" },
    ],
  },

  // === Accessories ===
  {
    id: "mag-safe-charger",
    name: "MagSafe Charger",
    category: "Accessories",
    price: 2590,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=800&h=800&fit=crop",
    ],
    badge: null,
    featured: false,
    colors: [
      { name: "White", hex: "#ffffff", image: "" },
    ],
  },
  {
    id: "iphone-silicone-case",
    name: "iPhone Silicone Case",
    category: "Accessories",
    price: 2190,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&h=800&fit=crop",
    ],
    badge: null,
    featured: false,
    colors: [
      { name: "Sage", hex: "#87ae73", image: "" },
      { name: "Storm Blue", hex: "#4a7c8c", image: "" },
      { name: "Pink", hex: "#ffc0cb", image: "" },
      { name: "Clay", hex: "#c4a882", image: "" },
      { name: "White", hex: "#ffffff", image: "" },
    ],
  },
  {
    id: "apple-usb-c-adapter",
    name: "Apple 20W USB-C Adapter",
    category: "Accessories",
    price: 1290,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&h=800&fit=crop",
    ],
    badge: null,
    featured: false,
    colors: [
      { name: "White", hex: "#ffffff", image: "" },
    ],
  },
];

export const categories = [
  { id: "all", name: "All Products" },
  { id: "iPhones", name: "iPhones" },
  { id: "iPads", name: "iPads" },
  { id: "MacBooks", name: "MacBooks" },
  { id: "AirPods", name: "AirPods" },
  { id: "Apple Watch", name: "Apple Watch" },
  { id: "Accessories", name: "Accessories" },
];

export const getProductById = (id) => products.find((p) => p.id === id);
export const getProductsByCategory = (category) =>
  category === "all" ? products : products.filter((p) => p.category === category);
export const getFeaturedProducts = () => products.filter((p) => p.featured);
