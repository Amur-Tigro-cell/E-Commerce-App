const products = [
  // Electronics
  {
    id: 1,
    name: "Wireless Headphones",
    price: 79.99,
    category: "Electronics",
    rating: 4.5,
    reviews: 128,
    image: "https://picsum.photos/seed/headphones1/400/400",
    description:
      "Premium wireless headphones with active noise cancellation and 30-hour battery life. Experience crystal-clear audio with deep, immersive bass response.",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 199.99,
    category: "Electronics",
    rating: 4.7,
    reviews: 256,
    image: "https://picsum.photos/seed/watch2/400/400",
    description:
      "Track your fitness goals, receive notifications, and monitor your heart rate with this sleek, feature-packed smartwatch. Water-resistant up to 50m.",
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    price: 49.99,
    category: "Electronics",
    rating: 4.3,
    reviews: 89,
    image: "https://picsum.photos/seed/speaker3/400/400",
    description:
      "Portable waterproof Bluetooth speaker with 360° surround sound and 12-hour playtime. Built-in microphone for hands-free calls.",
  },
  {
    id: 4,
    name: "Mechanical Keyboard",
    price: 129.99,
    category: "Electronics",
    rating: 4.8,
    reviews: 312,
    image: "https://picsum.photos/seed/keyboard4/400/400",
    description:
      "RGB backlit mechanical keyboard with tactile switches for the ultimate typing and gaming experience. Fully programmable with anti-ghosting technology.",
  },
  {
    id: 5,
    name: "USB-C Hub 7-in-1",
    price: 39.99,
    category: "Electronics",
    rating: 4.4,
    reviews: 167,
    image: "https://picsum.photos/seed/usbhub5/400/400",
    description:
      "7-in-1 USB-C hub with HDMI 4K output, 3× USB 3.0 ports, SD card reader, and 100W power delivery pass-through.",
  },
  {
    id: 6,
    name: "Laptop Stand",
    price: 34.99,
    category: "Electronics",
    rating: 4.6,
    reviews: 203,
    image: "https://picsum.photos/seed/laptopstand6/400/400",
    description:
      "Ergonomic aluminum laptop stand with adjustable height and angle. Foldable and portable, compatible with all 10–17 inch laptops.",
  },

  // Clothing
  {
    id: 7,
    name: "Classic White Tee",
    price: 24.99,
    category: "Clothing",
    rating: 4.2,
    reviews: 445,
    image: "https://picsum.photos/seed/tshirt7/400/400",
    description:
      "100% organic cotton classic-fit t-shirt. Soft, breathable, and durable for everyday wear. Pre-shrunk fabric maintains its shape wash after wash.",
  },
  {
    id: 8,
    name: "Slim Fit Jeans",
    price: 59.99,
    category: "Clothing",
    rating: 4.5,
    reviews: 321,
    image: "https://picsum.photos/seed/jeans8/400/400",
    description:
      "Premium stretch denim slim-fit jeans with a comfortable mid-rise. Perfect for casual and semi-formal occasions.",
  },
  {
    id: 9,
    name: "Hooded Sweatshirt",
    price: 44.99,
    category: "Clothing",
    rating: 4.6,
    reviews: 278,
    image: "https://picsum.photos/seed/hoodie9/400/400",
    description:
      "Cozy pullover hoodie made from a soft cotton-polyester blend. Features a front kangaroo pocket and an adjustable drawcord hood.",
  },
  {
    id: 10,
    name: "Running Sneakers",
    price: 89.99,
    category: "Clothing",
    rating: 4.7,
    reviews: 512,
    image: "https://picsum.photos/seed/sneakers10/400/400",
    description:
      "Lightweight running shoes with responsive foam cushioning and a breathable mesh upper. Designed for road running and everyday training.",
  },
  {
    id: 11,
    name: "Genuine Leather Belt",
    price: 29.99,
    category: "Clothing",
    rating: 4.3,
    reviews: 189,
    image: "https://picsum.photos/seed/belt11/400/400",
    description:
      "Full-grain genuine leather belt with a sturdy silver-tone buckle. Available in multiple sizes. Cut to fit with standard notch spacing.",
  },

  // Home & Living
  {
    id: 12,
    name: "Ceramic Coffee Mug",
    price: 18.99,
    category: "Home & Living",
    rating: 4.8,
    reviews: 634,
    image: "https://picsum.photos/seed/mug12/400/400",
    description:
      "Hand-crafted ceramic mug with an ergonomic handle, holding 12 oz. Microwave and dishwasher safe. Available in a variety of glazed colors.",
  },
  {
    id: 13,
    name: "Scented Candle Set",
    price: 32.99,
    category: "Home & Living",
    rating: 4.6,
    reviews: 287,
    image: "https://picsum.photos/seed/candles13/400/400",
    description:
      "Set of 3 premium soy-wax candles in calming Lavender, Vanilla, and Eucalyptus scents. Each candle offers up to 40 hours of clean burn time.",
  },
  {
    id: 14,
    name: "Decorative Throw Pillow",
    price: 22.99,
    category: "Home & Living",
    rating: 4.4,
    reviews: 156,
    image: "https://picsum.photos/seed/pillow14/400/400",
    description:
      "Soft decorative throw pillow with a machine-washable removable cover. Filled with hypoallergenic polyester fill. Perfect for sofas, beds, or chairs.",
  },
  {
    id: 15,
    name: "Bamboo Desk Organizer",
    price: 41.99,
    category: "Home & Living",
    rating: 4.5,
    reviews: 223,
    image: "https://picsum.photos/seed/organizer15/400/400",
    description:
      "Eco-friendly bamboo desktop organizer with multiple compartments for pens, papers, phones, and accessories. Keeps your workspace clean and tidy.",
  },
  {
    id: 16,
    name: "Minimalist Plant Pot Set",
    price: 28.99,
    category: "Home & Living",
    rating: 4.7,
    reviews: 398,
    image: "https://picsum.photos/seed/plantpots16/400/400",
    description:
      "Set of 3 minimalist ceramic-style planter pots with drainage holes and saucers. Perfect for succulents, cacti, and small indoor plants.",
  },

  // Sports
  {
    id: 17,
    name: "Non-Slip Yoga Mat",
    price: 34.99,
    category: "Sports",
    rating: 4.6,
    reviews: 478,
    image: "https://picsum.photos/seed/yogamat17/400/400",
    description:
      "6mm thick TPE yoga mat with alignment lines and a non-slip texture on both sides. Includes a carrying strap. Lightweight and eco-friendly.",
  },
  {
    id: 18,
    name: "Resistance Bands Set",
    price: 19.99,
    category: "Sports",
    rating: 4.5,
    reviews: 367,
    image: "https://picsum.photos/seed/bands18/400/400",
    description:
      "Set of 5 color-coded resistance bands with varying tension levels (5–40 lbs). Great for home workouts, stretching, and physical therapy.",
  },
  {
    id: 19,
    name: "Insulated Water Bottle",
    price: 24.99,
    category: "Sports",
    rating: 4.8,
    reviews: 892,
    image: "https://picsum.photos/seed/bottle19/400/400",
    description:
      "32 oz double-walled stainless steel water bottle. Keeps drinks cold for 24 hours or hot for 12 hours. BPA-free with a leak-proof lid.",
  },
  {
    id: 20,
    name: "Speed Jump Rope",
    price: 14.99,
    category: "Sports",
    rating: 4.4,
    reviews: 234,
    image: "https://picsum.photos/seed/jumprope20/400/400",
    description:
      "Adjustable speed jump rope with 360° ball-bearing handles for smooth, tangle-free rotation. Perfect for cardio, boxing training, and endurance workouts.",
  },
];

export default products;
