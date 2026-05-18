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
  imageUrl: string;
}

export const vehicles: Vehicle[] = [
  {
    slug: "1957-chevrolet-bel-air-custom",
    year: 1957,
    make: "Chevrolet",
    model: "Bel Air",
    trim: "Custom Convertible Build",
    category: "lowrider",
    categoryLabel: "Classic Build",
    mileage: 52100,
    price: 75000,
    monthlyPayment: 1296,
    color: "Triple Black / Candy Red Interior",
    description:
      "The crown jewel of the Shafik N Sons collection. This 1957 Bel Air convertible is a frame-off custom build — triple black exterior, candy red interior, show-quality chrome throughout. Known around the shop as 'SHAFIK57,' this one doesn't sit on the lot for long.",
    features: [
      "Frame-off custom restoration",
      "Triple black exterior with mirror finish",
      "Candy red custom interior",
      "Show-quality chrome engine bay",
      "Custom steering wheel",
      "Rebuilt V8 engine",
      "Smooth-riding lowered suspension",
      "Convertible soft top",
    ],
    specs: [
      { label: "Engine", value: "V8 Rebuilt" },
      { label: "Transmission", value: "Automatic" },
      { label: "Drive", value: "RWD" },
      { label: "Body", value: "Convertible" },
      { label: "Exterior", value: "Triple Black" },
      { label: "Interior", value: "Candy Red Custom" },
    ],
    gradient: "from-zinc-900 via-neutral-950 to-[#080808]",
    accentColor: "#EF4444",
    featured: true,
    imageUrl: "/inventory/bel-air-1957.jpg",
  },
  {
    slug: "1963-chevrolet-impala-lowrider",
    year: 1963,
    make: "Chevrolet",
    model: "Impala",
    trim: "Custom Lowrider Convertible",
    category: "lowrider",
    categoryLabel: "Lowrider",
    mileage: 61400,
    price: 65000,
    monthlyPayment: 1123,
    color: "Royal Blue / Chrome",
    description:
      "A true West Coast lowrider straight out of Oxnard. This 1963 Impala convertible is built right — royal blue paint that catches every eye, chrome wire wheels, white walls, and hydraulics that put on a show. Real car, real culture, real craftsmanship.",
    features: [
      "Full hydraulic suspension system",
      "Royal blue custom paint",
      "Chrome wire wheels with white wall tires",
      "Convertible soft top",
      "Custom chrome front grille",
      "Lowrider stance with proper drop",
      "Show-quality undercarriage",
      "California original",
    ],
    specs: [
      { label: "Engine", value: "327 V8" },
      { label: "Transmission", value: "Automatic" },
      { label: "Drive", value: "RWD" },
      { label: "Suspension", value: "Hydraulics" },
      { label: "Wheels", value: "Chrome Wire" },
      { label: "Body", value: "Convertible" },
    ],
    gradient: "from-blue-950 via-sky-950 to-[#080808]",
    accentColor: "#3B82F6",
    featured: true,
    imageUrl: "/inventory/impala-1963.jpg",
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
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80",
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
    imageUrl: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=900&q=80",
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
    imageUrl: "https://images.unsplash.com/photo-1563694983011-6f4d90358083?auto=format&fit=crop&w=900&q=80",
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
    color: "Matte Silver / Blacked Out Wheels",
    description:
      "Presence. That's the only word for it. This S580 pulls up and the conversation stops. Matte silver wrap, blacked-out wheels, tinted glass — this is what quiet power looks like. One owner, impeccably maintained, and ready to hand off to the next serious buyer.",
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
    imageUrl: "/inventory/mercedes-s580.jpg",
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
