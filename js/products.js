/* ============================================
   Mithila Crafts - Product Data
   ============================================ */

const PRODUCTS = [
  {
    id: 1,
    name: "Madhubani Fish Painting",
    category: "paintings",
    price: 2500,
    originalPrice: 3200,
    description: "A traditional Madhubani painting depicting twin fish, symbolising fertility and prosperity. Hand-painted on handmade paper using natural dyes by artisans from Jitwarpur village.",
    details: {
      medium: "Natural dyes on handmade paper",
      size: "24 x 18 inches",
      origin: "Jitwarpur, Madhubani",
      artist: "Sita Devi collective"
    },
    badge: "Bestseller",
    image: "fish-painting"
  },
  {
    id: 2,
    name: "Kohbar Wedding Art",
    category: "paintings",
    price: 4500,
    originalPrice: 5500,
    description: "Intricate Kohbar art traditionally painted on the walls of bridal chambers. Features lotus, bamboo, and fish motifs symbolising love and fertility.",
    details: {
      medium: "Acrylic on canvas",
      size: "30 x 24 inches",
      origin: "Ranti, Madhubani",
      artist: "Pushpa Kumari"
    },
    badge: "Traditional",
    image: "kohbar-art"
  },
  {
    id: 3,
    name: "Tree of Life Wall Hanging",
    category: "wall-hangings",
    price: 3800,
    originalPrice: 4500,
    description: "A stunning Tree of Life design in Bharni style with rich colours and fine detailing. Painted on cotton fabric, ready to hang with bamboo rod.",
    details: {
      medium: "Natural pigments on cotton",
      size: "36 x 24 inches",
      origin: "Madhubani, Bihar",
      artist: "Rani Jha"
    },
    badge: "Featured",
    image: "tree-of-life"
  },
  {
    id: 4,
    name: "Peacock Madhubani Art",
    category: "paintings",
    price: 1800,
    originalPrice: 2200,
    description: "Vibrant peacock motif in the Kachni (line work) style of Madhubani art. A perfect piece for adding a splash of traditional art to modern interiors.",
    details: {
      medium: "Ink on handmade paper",
      size: "18 x 14 inches",
      origin: "Jitwarpur, Madhubani",
      artist: "Meena Devi"
    },
    badge: null,
    image: "peacock-art"
  },
  {
    id: 5,
    name: "Sujani Embroidered Cushion Set",
    category: "textiles",
    price: 1600,
    originalPrice: 2000,
    description: "Set of 2 cushion covers featuring traditional Sujani embroidery with Mithila motifs. Hand-stitched by women artisans from Muzaffarpur district.",
    details: {
      medium: "Cotton with hand embroidery",
      size: "16 x 16 inches (set of 2)",
      origin: "Muzaffarpur, Bihar",
      artist: "Sujani Women's Cooperative"
    },
    badge: "Handmade",
    image: "sujani-cushion"
  },
  {
    id: 6,
    name: "Sikki Grass Decorative Basket",
    category: "handicrafts",
    price: 950,
    originalPrice: 1200,
    description: "Beautifully woven basket made from golden Sikki grass, a craft unique to Mithila region. Decorated with colourful patterns, perfect for storage or display.",
    details: {
      medium: "Sikki grass with natural dyes",
      size: "10 inches diameter",
      origin: "Darbhanga, Bihar",
      artist: "Sikki Artisans Group"
    },
    badge: "Eco-Friendly",
    image: "sikki-basket"
  },
  {
    id: 7,
    name: "Godna Art Print - Tribal Patterns",
    category: "paintings",
    price: 1200,
    originalPrice: 1500,
    description: "Godna (tattoo) art print featuring geometric tribal patterns traditional to the Mithila region. This art form was historically tattooed on the body.",
    details: {
      medium: "Archival print on cotton paper",
      size: "14 x 11 inches",
      origin: "Madhubani, Bihar",
      artist: "Dulari Devi"
    },
    badge: null,
    image: "godna-art"
  },
  {
    id: 8,
    name: "Mithila Painted Clay Pot Set",
    category: "handicrafts",
    price: 2200,
    originalPrice: 2800,
    description: "Set of 3 terracotta pots hand-painted with Madhubani motifs. Each pot features traditional designs of fish, flowers, and peacocks.",
    details: {
      medium: "Painted terracotta",
      size: "Small (4\"), Medium (6\"), Large (8\")",
      origin: "Madhubani, Bihar",
      artist: "Kumhar Artisan Family"
    },
    badge: "Set of 3",
    image: "clay-pots"
  },
  {
    id: 9,
    name: "Krishna Leela Painting",
    category: "paintings",
    price: 5500,
    originalPrice: 6800,
    description: "A magnificent large-format Madhubani painting depicting scenes from Krishna's life. Rich Bharni style with vibrant natural colours.",
    details: {
      medium: "Natural pigments on silk",
      size: "36 x 30 inches",
      origin: "Ranti, Madhubani",
      artist: "Baua Devi School"
    },
    badge: "Premium",
    image: "krishna-leela"
  },
  {
    id: 10,
    name: "Madhubani Printed Saree",
    category: "textiles",
    price: 3500,
    originalPrice: 4200,
    description: "Hand-painted Tussar silk saree with Madhubani motifs along the border and pallu. A wearable piece of Mithila art tradition.",
    details: {
      medium: "Hand-painted Tussar silk",
      size: "5.5 meters with blouse piece",
      origin: "Bhagalpur, Bihar",
      artist: "Mithila Silk Weavers"
    },
    badge: "Artisan Made",
    image: "madhubani-saree"
  },
  {
    id: 11,
    name: "Wooden Carved Elephant",
    category: "handicrafts",
    price: 1400,
    originalPrice: 1800,
    description: "Hand-carved wooden elephant decorated with Madhubani-style painted designs. A unique fusion of wood carving and Mithila painting traditions.",
    details: {
      medium: "Carved wood with acrylic paint",
      size: "8 x 6 inches",
      origin: "Darbhanga, Bihar",
      artist: "Ram Kumar Paswan"
    },
    badge: null,
    image: "wooden-elephant"
  },
  {
    id: 12,
    name: "Mithila Art Table Runner",
    category: "textiles",
    price: 1100,
    originalPrice: 1400,
    description: "Handblock-printed cotton table runner featuring traditional Mithila motifs. Adds an artistic touch to dining tables and sideboards.",
    details: {
      medium: "Block-printed cotton",
      size: "72 x 14 inches",
      origin: "Madhubani, Bihar",
      artist: "Artisan Women's Group"
    },
    badge: null,
    image: "table-runner"
  },
  {
    id: 13,
    name: "5 Mukhi Rudraksha Mala (108 Beads)",
    category: "rudraksha",
    price: 1100,
    originalPrice: 1500,
    description: "Authentic 5 Mukhi (five-faced) Rudraksha mala with 108 beads, hand-knotted on a cotton thread. Worn for spiritual practice, meditation, and japa. Lab-certified for authenticity.",
    details: {
      medium: "Natural Rudraksha beads, cotton thread",
      size: "Bead size 6-7mm, full mala length ~32 inches",
      origin: "Nepal-origin Rudraksha",
      artist: "Certified by in-house gemologist"
    },
    badge: "Bestseller",
    image: "rudraksha-mala"
  },
  {
    id: 14,
    name: "Original Nepali Rudraksha Bracelet",
    category: "rudraksha",
    price: 650,
    originalPrice: 900,
    description: "Elegant Rudraksha bracelet strung with silver-toned spacer beads. Comfortable elastic fit, suitable for daily wear by men and women alike.",
    details: {
      medium: "Natural Rudraksha beads with metal spacers",
      size: "Adjustable, fits most wrists",
      origin: "Nepal-origin Rudraksha",
      artist: "Hand-strung in-house"
    },
    badge: "New",
    image: "rudraksha-bracelet"
  },
  {
    id: 15,
    name: "1 Mukhi Rudraksha Pendant (Silver Cap)",
    category: "rudraksha",
    price: 2200,
    originalPrice: 2800,
    description: "Rare single-faced (Ek Mukhi) Rudraksha pendant set in a silver-capped frame with chain. Comes with an authenticity certificate.",
    details: {
      medium: "Natural Rudraksha bead, sterling silver cap",
      size: "Pendant 1.5 inches, 20 inch chain included",
      origin: "Nepal-origin Rudraksha",
      artist: "Certified by in-house gemologist"
    },
    badge: "Premium",
    image: "rudraksha-pendant"
  },
  {
    id: 16,
    name: "Tulsi & Rudraksha Combination Mala",
    category: "rudraksha",
    price: 850,
    originalPrice: 1100,
    description: "A traditional combination mala alternating Tulsi (holy basil) wood beads with Rudraksha beads, used widely for daily prayer and meditation.",
    details: {
      medium: "Tulsi wood and Rudraksha beads",
      size: "108 beads, ~30 inch length",
      origin: "Bihar & Nepal-sourced beads",
      artist: "Hand-knotted in-house"
    },
    badge: null,
    image: "rudraksha-mala"
  },
  {
    id: 17,
    name: "Rudraksha Bead Loose Pack (Pack of 5)",
    category: "rudraksha",
    price: 450,
    originalPrice: 600,
    description: "Loose 5 Mukhi Rudraksha beads sold in a pack of 5, ideal for custom jewellery-making, gifting, or adding to an existing mala.",
    details: {
      medium: "Natural Rudraksha beads, unstrung",
      size: "6-7mm per bead, pack of 5",
      origin: "Nepal-origin Rudraksha",
      artist: "Sorted & graded in-house"
    },
    badge: "Value Pack",
    image: "rudraksha-loose"
  }
];

const CATEGORIES = [
  { id: "all", name: "All Products", icon: "🎨", description: "Browse our full collection" },
  { id: "paintings", name: "Paintings", icon: "🖼️", description: "Traditional Madhubani paintings" },
  { id: "wall-hangings", name: "Wall Hangings", icon: "🏠", description: "Fabric art for your walls" },
  { id: "textiles", name: "Textiles", icon: "🧵", description: "Sarees, cushions & runners" },
  { id: "handicrafts", name: "Handicrafts", icon: "🏺", description: "Handmade craft items" },
  { id: "rudraksha", name: "Rudraksha & Spiritual", icon: "📿", description: "Malas, bracelets & pendants" }
];

// Art pattern colors for product image placeholders
const ART_COLORS = {
  "fish-painting": { bg: "#FFF3E0", accent: "#E65100", pattern: "fish" },
  "kohbar-art": { bg: "#FCE4EC", accent: "#AD1457", pattern: "lotus" },
  "tree-of-life": { bg: "#E8F5E9", accent: "#2E7D32", pattern: "tree" },
  "peacock-art": { bg: "#E3F2FD", accent: "#1565C0", pattern: "peacock" },
  "sujani-cushion": { bg: "#F3E5F5", accent: "#7B1FA2", pattern: "geometric" },
  "sikki-basket": { bg: "#FFF8E1", accent: "#F9A825", pattern: "weave" },
  "godna-art": { bg: "#EFEBE9", accent: "#4E342E", pattern: "tribal" },
  "clay-pots": { bg: "#FBE9E7", accent: "#BF360C", pattern: "pots" },
  "krishna-leela": { bg: "#E8EAF6", accent: "#283593", pattern: "divine" },
  "madhubani-saree": { bg: "#FFF3E0", accent: "#E65100", pattern: "textile" },
  "wooden-elephant": { bg: "#EFEBE9", accent: "#5D4037", pattern: "elephant" },
  "table-runner": { bg: "#F1F8E9", accent: "#558B2F", pattern: "runner" },
  "rudraksha-mala": { bg: "#3E2723", accent: "#D7A86E", pattern: "mala" },
  "rudraksha-bracelet": { bg: "#3E2723", accent: "#D7A86E", pattern: "mala" },
  "rudraksha-pendant": { bg: "#3E2723", accent: "#D7A86E", pattern: "mala" },
  "rudraksha-loose": { bg: "#3E2723", accent: "#D7A86E", pattern: "mala" }
};

function generateProductSVG(imageKey, width, height) {
  const colors = ART_COLORS[imageKey] || { bg: "#FFF3E0", accent: "#C62828", pattern: "default" };
  const patterns = {
    fish: `<circle cx="${width/2}" cy="${height/2}" r="${Math.min(width,height)*0.3}" fill="none" stroke="${colors.accent}" stroke-width="3"/>
           <ellipse cx="${width/2-30}" cy="${height/2}" rx="50" ry="25" fill="${colors.accent}" opacity="0.7"/>
           <ellipse cx="${width/2+30}" cy="${height/2}" rx="50" ry="25" fill="${colors.accent}" opacity="0.5"/>
           <polygon points="${width/2-80},${height/2} ${width/2-95},${height/2-15} ${width/2-95},${height/2+15}" fill="${colors.accent}" opacity="0.7"/>
           <polygon points="${width/2+80},${height/2} ${width/2+95},${height/2-15} ${width/2+95},${height/2+15}" fill="${colors.accent}" opacity="0.5"/>
           <circle cx="${width/2-45}" cy="${height/2-5}" r="3" fill="${colors.bg}"/>
           <circle cx="${width/2+45}" cy="${height/2-5}" r="3" fill="${colors.bg}"/>`,
    lotus: `<ellipse cx="${width/2}" cy="${height/2+20}" rx="30" ry="15" fill="${colors.accent}" opacity="0.3"/>
            <ellipse cx="${width/2}" cy="${height/2}" rx="20" ry="40" fill="${colors.accent}" opacity="0.6"/>
            <ellipse cx="${width/2-25}" cy="${height/2+5}" rx="20" ry="35" fill="${colors.accent}" opacity="0.4" transform="rotate(-30 ${width/2-25} ${height/2+5})"/>
            <ellipse cx="${width/2+25}" cy="${height/2+5}" rx="20" ry="35" fill="${colors.accent}" opacity="0.4" transform="rotate(30 ${width/2+25} ${height/2+5})"/>
            <circle cx="${width/2}" cy="${height/2}" r="8" fill="${colors.accent}"/>`,
    tree: `<line x1="${width/2}" y1="${height/2+60}" x2="${width/2}" y2="${height/2-40}" stroke="${colors.accent}" stroke-width="6"/>
           <circle cx="${width/2}" cy="${height/2-50}" r="40" fill="${colors.accent}" opacity="0.3"/>
           <circle cx="${width/2-30}" cy="${height/2-30}" r="25" fill="${colors.accent}" opacity="0.4"/>
           <circle cx="${width/2+30}" cy="${height/2-30}" r="25" fill="${colors.accent}" opacity="0.4"/>
           <circle cx="${width/2}" cy="${height/2-70}" r="20" fill="${colors.accent}" opacity="0.5"/>
           <line x1="${width/2}" y1="${height/2+60}" x2="${width/2-20}" y2="${height/2+80}" stroke="${colors.accent}" stroke-width="3"/>
           <line x1="${width/2}" y1="${height/2+60}" x2="${width/2+20}" y2="${height/2+80}" stroke="${colors.accent}" stroke-width="3"/>`,
    peacock: `<circle cx="${width/2}" cy="${height/2}" r="15" fill="${colors.accent}"/>
              <ellipse cx="${width/2}" cy="${height/2-50}" rx="35" ry="45" fill="none" stroke="${colors.accent}" stroke-width="2" opacity="0.6"/>
              <ellipse cx="${width/2}" cy="${height/2-50}" rx="50" ry="60" fill="none" stroke="${colors.accent}" stroke-width="2" opacity="0.4"/>
              <ellipse cx="${width/2}" cy="${height/2-50}" rx="65" ry="75" fill="none" stroke="${colors.accent}" stroke-width="2" opacity="0.3"/>
              <circle cx="${width/2-25}" cy="${height/2-70}" r="6" fill="${colors.accent}" opacity="0.5"/>
              <circle cx="${width/2+25}" cy="${height/2-70}" r="6" fill="${colors.accent}" opacity="0.5"/>
              <circle cx="${width/2}" cy="${height/2-85}" r="6" fill="${colors.accent}" opacity="0.5"/>
              <line x1="${width/2}" y1="${height/2+15}" x2="${width/2}" y2="${height/2+50}" stroke="${colors.accent}" stroke-width="3"/>`,
    geometric: `<rect x="${width/2-50}" y="${height/2-50}" width="100" height="100" fill="none" stroke="${colors.accent}" stroke-width="2"/>
                <rect x="${width/2-35}" y="${height/2-35}" width="70" height="70" fill="none" stroke="${colors.accent}" stroke-width="2" transform="rotate(45 ${width/2} ${height/2})"/>
                <circle cx="${width/2}" cy="${height/2}" r="20" fill="none" stroke="${colors.accent}" stroke-width="2"/>
                <circle cx="${width/2}" cy="${height/2}" r="10" fill="${colors.accent}" opacity="0.3"/>`,
    weave: `<line x1="${width/2-60}" y1="${height/2-30}" x2="${width/2+60}" y2="${height/2-30}" stroke="${colors.accent}" stroke-width="3" opacity="0.6"/>
            <line x1="${width/2-60}" y1="${height/2}" x2="${width/2+60}" y2="${height/2}" stroke="${colors.accent}" stroke-width="3" opacity="0.6"/>
            <line x1="${width/2-60}" y1="${height/2+30}" x2="${width/2+60}" y2="${height/2+30}" stroke="${colors.accent}" stroke-width="3" opacity="0.6"/>
            <line x1="${width/2-30}" y1="${height/2-60}" x2="${width/2-30}" y2="${height/2+60}" stroke="${colors.accent}" stroke-width="3" opacity="0.4"/>
            <line x1="${width/2}" y1="${height/2-60}" x2="${width/2}" y2="${height/2+60}" stroke="${colors.accent}" stroke-width="3" opacity="0.4"/>
            <line x1="${width/2+30}" y1="${height/2-60}" x2="${width/2+30}" y2="${height/2+60}" stroke="${colors.accent}" stroke-width="3" opacity="0.4"/>`,
    tribal: `<circle cx="${width/2}" cy="${height/2}" r="40" fill="none" stroke="${colors.accent}" stroke-width="2"/>
             <circle cx="${width/2}" cy="${height/2}" r="30" fill="none" stroke="${colors.accent}" stroke-width="2" stroke-dasharray="5,5"/>
             <line x1="${width/2-40}" y1="${height/2}" x2="${width/2+40}" y2="${height/2}" stroke="${colors.accent}" stroke-width="2"/>
             <line x1="${width/2}" y1="${height/2-40}" x2="${width/2}" y2="${height/2+40}" stroke="${colors.accent}" stroke-width="2"/>
             <circle cx="${width/2}" cy="${height/2}" r="8" fill="${colors.accent}" opacity="0.5"/>`,
    pots: `<ellipse cx="${width/2}" cy="${height/2+30}" rx="35" ry="10" fill="${colors.accent}" opacity="0.3"/>
           <path d="M${width/2-25} ${height/2+20} Q${width/2-30} ${height/2-20} ${width/2-15} ${height/2-35} Q${width/2} ${height/2-45} ${width/2+15} ${height/2-35} Q${width/2+30} ${height/2-20} ${width/2+25} ${height/2+20}" fill="none" stroke="${colors.accent}" stroke-width="3"/>
           <ellipse cx="${width/2}" cy="${height/2-35}" rx="15" ry="5" fill="none" stroke="${colors.accent}" stroke-width="2"/>`,
    divine: `<circle cx="${width/2}" cy="${height/2-20}" r="25" fill="${colors.accent}" opacity="0.2"/>
             <circle cx="${width/2}" cy="${height/2-20}" r="15" fill="${colors.accent}" opacity="0.3"/>
             <path d="M${width/2-40} ${height/2+10} Q${width/2} ${height/2-10} ${width/2+40} ${height/2+10}" fill="none" stroke="${colors.accent}" stroke-width="2"/>
             <line x1="${width/2}" y1="${height/2-50}" x2="${width/2}" y2="${height/2-60}" stroke="${colors.accent}" stroke-width="2"/>
             <circle cx="${width/2}" cy="${height/2-65}" r="5" fill="${colors.accent}" opacity="0.5"/>`,
    textile: `<rect x="${width/2-50}" y="${height/2-40}" width="100" height="80" fill="none" stroke="${colors.accent}" stroke-width="2" rx="4"/>
              <line x1="${width/2-50}" y1="${height/2-20}" x2="${width/2+50}" y2="${height/2-20}" stroke="${colors.accent}" stroke-width="1" opacity="0.5"/>
              <line x1="${width/2-50}" y1="${height/2}" x2="${width/2+50}" y2="${height/2}" stroke="${colors.accent}" stroke-width="1" opacity="0.5"/>
              <line x1="${width/2-50}" y1="${height/2+20}" x2="${width/2+50}" y2="${height/2+20}" stroke="${colors.accent}" stroke-width="1" opacity="0.5"/>
              <circle cx="${width/2-25}" cy="${height/2-10}" r="5" fill="${colors.accent}" opacity="0.4"/>
              <circle cx="${width/2+25}" cy="${height/2+10}" r="5" fill="${colors.accent}" opacity="0.4"/>`,
    elephant: `<ellipse cx="${width/2}" cy="${height/2}" rx="35" ry="25" fill="${colors.accent}" opacity="0.3"/>
               <ellipse cx="${width/2-30}" cy="${height/2-10}" rx="15" ry="20" fill="${colors.accent}" opacity="0.3"/>
               <path d="M${width/2-35} ${height/2+5} Q${width/2-45} ${height/2+30} ${width/2-35} ${height/2+40}" fill="none" stroke="${colors.accent}" stroke-width="3"/>
               <circle cx="${width/2-28}" cy="${height/2-15}" r="3" fill="${colors.accent}"/>
               <line x1="${width/2-15}" y1="${height/2+25}" x2="${width/2-15}" y2="${height/2+45}" stroke="${colors.accent}" stroke-width="4"/>
               <line x1="${width/2+15}" y1="${height/2+25}" x2="${width/2+15}" y2="${height/2+45}" stroke="${colors.accent}" stroke-width="4"/>`,
    runner: `<rect x="${width/2-60}" y="${height/2-15}" width="120" height="30" fill="none" stroke="${colors.accent}" stroke-width="2" rx="4"/>
             <circle cx="${width/2-40}" cy="${height/2}" r="6" fill="${colors.accent}" opacity="0.4"/>
             <circle cx="${width/2}" cy="${height/2}" r="6" fill="${colors.accent}" opacity="0.4"/>
             <circle cx="${width/2+40}" cy="${height/2}" r="6" fill="${colors.accent}" opacity="0.4"/>
             <line x1="${width/2-60}" y1="${height/2-5}" x2="${width/2+60}" y2="${height/2-5}" stroke="${colors.accent}" stroke-width="1" opacity="0.3"/>
             <line x1="${width/2-60}" y1="${height/2+5}" x2="${width/2+60}" y2="${height/2+5}" stroke="${colors.accent}" stroke-width="1" opacity="0.3"/>`,
    mala: (() => {
      const cx = width / 2, cy = height / 2, r = Math.min(width, height) * 0.32;
      let beads = "";
      const count = 18;
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
        const bx = cx + r * Math.cos(angle);
        const by = cy + r * Math.sin(angle);
        beads += `<circle cx="${bx.toFixed(1)}" cy="${by.toFixed(1)}" r="9" fill="${colors.accent}" stroke="#2a1a12" stroke-width="1"/>`;
      }
      return `${beads}<circle cx="${cx}" cy="${cy + r + 18}" r="6" fill="${colors.accent}" opacity="0.7"/>`;
    })(),
    default: `<circle cx="${width/2}" cy="${height/2}" r="30" fill="none" stroke="${colors.accent}" stroke-width="2"/>
              <circle cx="${width/2}" cy="${height/2}" r="15" fill="${colors.accent}" opacity="0.3"/>`
  };

  const border = `<rect x="10" y="10" width="${width-20}" height="${height-20}" fill="none" stroke="${colors.accent}" stroke-width="1.5" opacity="0.2" rx="8"/>
                   <rect x="20" y="20" width="${width-40}" height="${height-40}" fill="none" stroke="${colors.accent}" stroke-width="1" opacity="0.1" rx="4"/>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect width="${width}" height="${height}" fill="${colors.bg}"/>
    ${border}
    ${patterns[colors.pattern] || patterns.default}
  </svg>`;
}

function getProductImageDataURI(imageKey, width = 400, height = 400) {
  const svg = generateProductSVG(imageKey, width, height);
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/* ---------- Live catalog loader ----------
   PRODUCTS above is the offline/starter catalog so pages render
   instantly. As soon as this script runs in the browser, it fetches
   the live catalog from the backend (which the admin panel edits)
   and swaps PRODUCTS' contents in place - any page that does
   `await window.productsReady` before rendering will always show
   the live, up-to-date catalog (including anything added via the
   Admin Panel, like new Rudraksha products). On the server (Node,
   inside Netlify Functions) this block is skipped entirely. */
if (typeof window !== 'undefined' && typeof fetch !== 'undefined') {
  window.productsReady = (async function loadLiveProducts() {
    try {
      const res = await fetch('/.netlify/functions/products-api');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.products) && data.products.length > 0) {
          PRODUCTS.length = 0;
          PRODUCTS.push(...data.products);
        }
      }
    } catch (err) {
      console.warn('Live catalog unavailable, using built-in starter catalog:', err);
    }
    return PRODUCTS;
  })();
}

if (typeof module !== 'undefined') {
  module.exports = { PRODUCTS, CATEGORIES, ART_COLORS, getProductImageDataURI };
}
