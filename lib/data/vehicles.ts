export type VehicleCategory =
  | "lowrider"
  | "exotic"
  | "luxury-suv"
  | "mercedes";

export interface Vehicle {
  slug: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  category: VehicleCategory;
  categoryLabel: string;
  mileage: number;
  price: number;
  monthlyPayment: number;
  color: string;
  description: string;
  features: string[];
  specs: { label: string; value: string }[];
  gradient: string;
  accentColor: string;
  featured: boolean;
}

export const vehicles: Vehicle[] = [
  {
    slug: "1964-chevrolet-impala-lowrider",
    year: 1964,
    make: "Chevrolet",
    model: "Impala",
    trim: "Custom Lowrider Build",
    category: "lowrider",
    categoryLabel: "Lowrider",
    mileage: 48200,
    price: 85000,
    monthlyPayment: 1469,
    color: "Candy Purple / Chrome",
    description:
      "A meticulously built 1964 Impala lowrider — the pinnacle of West Coast custom culture. Full hydraulics, flake paint, and a show-quality interior. Every inch has been touched by master craftsmen.",
    features: [
      "Full hydraulic system (4 pumps, 8 batteries)",
      "Custom candy purple flake paint",
      "Wire wheels with vogues",
      "Custom interior with embroidered seats",
      "Show-quality chrome engine bay",
      "Bose sound system",
      "Air freshener custom plaque",
      "LOWRIDER Magazine featured build",
    ],
    specs: [
      { label: "Engine", value: "350 V8 Rebuilt" },
      { label: "Transmission", value: "Automatic" },
      { label: "Drive", value: "RWD" },
      { label: "Suspension", value: "Full Hydraulics" },
      { label: "Wheels", value: '13" Wire Wheels' },
      { label: "Exterior", value: "Candy Purple Flake" },
    ],
    gradient: "from-violet-950 via-purple-950 to-[#080808]",
    accentColor: "#A855F7",
    featured: true,
  },
  {
    slug: "lamborghini-huracan-spyder",
    year: 2022,
    make: "Lamborghini",
    model: "Huracán",
    trim: "Spyder LP 610-4",
    category: "exotic",
    categoryLabel: "Exotic",
    mileage: 6400,
    price: 280000,
    monthlyPayment: 4838,
    color: "Giallo Orion / Black",
    description:
      "One of the most visceral driving experiences on the planet. This Huracán Spyder delivers 610 horses through an all-wheel-drive system and a naturally aspirated V10 — a sound you feel in your chest.",
    features: [
      "5.2L naturally aspirated V10 (610 hp)",
      "All-wheel drive (Haldex)",
      "7-speed dual-clutch transmission",
      "Carbon ceramic brakes",
      "Lifting system (front)",
      "Carbon fiber interior package",
      "Apple CarPlay / Android Auto",
      "Original window sticker on file",
    ],
    specs: [
      { label: "Engine", value: "5.2L V10 NA" },
      { label: "Horsepower", value: "610 hp" },
      { label: "0 – 60", value: "3.2 seconds" },
      { label: "Top Speed", value: "202 mph" },
      { label: "Drive", value: "AWD" },
      { label: "Transmission", value: "7-Speed DCT" },
    ],
    gradient: "from-amber-950 via-orange-950 to-[#080808]",
    accentColor: "#F59E0B",
    featured: true,
  },
  {
    slug: "mclaren-720s-coupe",
    year: 2021,
    make: "McLaren",
    model: "720S",
    trim: "Performance",
    category: "exotic",
    categoryLabel: "Exotic",
    mileage: 4100,
    price: 320000,
    monthlyPayment: 5530,
    color: "Papaya Spark / Onyx",
    description:
      "The 720S isn't a supercar — it's a paradigm shift. Every panel, every surface is active. With 710 hp and a chassis designed by Formula 1 engineers, this is what peak performance looks like at road legal speeds.",
    features: [
      "4.0L twin-turbo V8 (710 hp)",
      "McLaren Variable Drift Control",
      "Electrochromic glass roof",
      "Carbon fiber MonoCell II-T chassis",
      "McLaren Track Telemetry",
      "Bowers & Wilkins audio",
      "Pirelli P-Zero Corsa tires",
      "Full service history (McLaren Beverly Hills)",
    ],
    specs: [
      { label: "Engine", value: "4.0L TT V8" },
      { label: "Horsepower", value: "710 hp" },
      { label: "0 – 60", value: "2.8 seconds" },
      { label: "Top Speed", value: "212 mph" },
      { label: "Drive", value: "RWD" },
      { label: "Transmission", value: "7-Speed SSG" },
    ],
    gradient: "from-red-950 via-rose-950 to-[#080808]",
    accentColor: "#F97316",
    featured: true,
  },
  {
    slug: "range-rover-autobiography-lwb",
    year: 2023,
    make: "Range Rover",
    model: "Autobiography",
    trim: "LWB P530",
    category: "luxury-suv",
    categoryLabel: "Luxury SUV",
    mileage: 9200,
    price: 185000,
    monthlyPayment: 3197,
    color: "Carpathian Grey / Satin",
    description:
      "The most refined luxury SUV on the planet. The long-wheelbase Autobiography commands attention with bespoke materials, rear executive seating, and a level of cabin refinement that rivals private aviation.",
    features: [
      "4.4L BMW-sourced twin-turbo V8 (530 hp)",
      "Rear executive seating (recline + massage)",
      "Head-up display",
      "22-speaker Meridian Signature audio",
      "Air suspension with Terrain Response 2",
      "Night Vision with pedestrian detection",
      "Rear-seat entertainment (dual screens)",
      "Panoramic sunroof",
    ],
    specs: [
      { label: "Engine", value: "4.4L TT V8" },
      { label: "Horsepower", value: "530 hp" },
      { label: "Drive", value: "4WD" },
      { label: "Seating", value: "5 Passengers" },
      { label: "Wheelbase", value: "Long Wheelbase" },
      { label: "Towing", value: "8,201 lbs" },
    ],
    gradient: "from-emerald-950 via-teal-950 to-[#080808]",
    accentColor: "#10B981",
    featured: false,
  },
  {
    slug: "mercedes-benz-g63-amg",
    year: 2023,
    make: "Mercedes-Benz",
    model: "G63 AMG",
    trim: "G-Wagon",
    category: "luxury-suv",
    categoryLabel: "Luxury SUV",
    mileage: 3800,
    price: 195000,
    monthlyPayment: 3370,
    color: "Obsidian Black / Designo Red",
    description:
      "The G63 is the only vehicle that's simultaneously a fashion icon, an off-road beast, and a 577-horsepower supercar in an SUV body. This one-owner example is factory-spec with zero compromises.",
    features: [
      "4.0L AMG V8 biturbo (577 hp)",
      "AMG SPEEDSHIFT TCT 9G transmission",
      "3 locking differentials",
      "AMG RIDE CONTROL+ suspension",
      "Designo Nappa leather",
      "Burmester surround sound",
      "Night Package (gloss black trim)",
      "AMG Performance exhaust",
    ],
    specs: [
      { label: "Engine", value: "4.0L AMG V8 TT" },
      { label: "Horsepower", value: "577 hp" },
      { label: "0 – 60", value: "4.5 seconds" },
      { label: "Drive", value: "4MATIC AWD" },
      { label: "Body", value: "Body-on-Frame" },
      { label: "Differentials", value: "3 Locking" },
    ],
    gradient: "from-zinc-800 via-zinc-900 to-[#080808]",
    accentColor: "#A1A1AA",
    featured: false,
  },
  {
    slug: "mercedes-benz-s580-maybach",
    year: 2023,
    make: "Mercedes-Benz",
    model: "S580",
    trim: "Maybach 4MATIC",
    category: "mercedes",
    categoryLabel: "Mercedes-Benz",
    mileage: 5600,
    price: 215000,
    monthlyPayment: 3714,
    color: "High-tech Silver / Obsidian Black",
    description:
      "The Maybach S580 is the apex of German automotive luxury — a hand-built statement piece. Rear-seat passengers enjoy first-class airline seats, a dedicated refrigerator, and near-complete silence at highway speeds.",
    features: [
      "4.0L V8 biturbo (503 hp) + EQ Boost",
      "Rear axle steering",
      "AIRMATIC suspension with E-Active Body Control",
      "Rear Executive Plus seats (recline fully flat)",
      "MBUX with 12.8″ OLED center display",
      "First-Class rear console with refrigerator",
      "Burmester 4D surround sound (30 speakers)",
      "Maybach two-tone exterior with exclusive badging",
    ],
    specs: [
      { label: "Engine", value: "4.0L V8 + EQ Boost" },
      { label: "Horsepower", value: "503 hp" },
      { label: "0 – 60", value: "4.4 seconds" },
      { label: "Drive", value: "4MATIC AWD" },
      { label: "Wheelbase", value: "Extended +8 inches" },
      { label: "Classification", value: "Maybach" },
    ],
    gradient: "from-blue-950 via-indigo-950 to-[#080808]",
    accentColor: "#60A5FA",
    featured: false,
  },
];

export function getVehicleBySlug(slug: string): Vehicle | undefined {
  return vehicles.find((v) => v.slug === slug);
}

export function getVehiclesByCategory(cat: VehicleCategory): Vehicle[] {
  return vehicles.filter((v) => v.category === cat);
}

export function getFeaturedVehicles(): Vehicle[] {
  return vehicles.filter((v) => v.featured);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatMileage(miles: number): string {
  return new Intl.NumberFormat("en-US").format(miles) + " mi";
}
