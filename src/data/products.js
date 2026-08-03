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
    image: "/images/iphone-15-pro-max/natural-titanium.png",
    images: [
      "/images/iphone-15-pro-max/natural-titanium.png",
      "/images/iphone-15-pro-max/blue-titanium.png",
      "/images/iphone-15-pro-max/white-titanium.png",
      "/images/iphone-15-pro-max/black-titanium.png",
    ],
    description: "Dynamic Island, 48MP main camera, and the A16 Bionic chip. A great all-around iPhone.",
    specs: [
      "A16 Bionic chip",
      "48MP Main | 12MP Ultra Wide | 2x optical zoom",
      "6.1-inch Super Retina XDR display (2556x1179)",
      "Aluminum design",
      "Up to 20 hours video playback",
      "USB-C connector",
    ],
    badge: null,
    featured: true,
    colors: [
      { name: "Pink", hex: "#ffc0cb", image: "/images/iphone-15-pro-max/natural-titanium.png" },
      { name: "Blue", hex: "#a0c4ff", image: "/images/iphone-15-pro-max/blue-titanium.png" },
      { name: "White", hex: "#f0f0f0", image: "/images/iphone-15-pro-max/white-titanium.png" },
      { name: "Black", hex: "#2d2d2d", image: "/images/iphone-15-pro-max/black-titanium.png" },
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
