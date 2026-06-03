export interface ItineraryDay {
  day: number;
  route: string;
  highlights: string;
  overnight: string;
  meals: string;
}

export interface ProductSheet {
  id: string;
  circuitName: string;
  productCode: string;
  duration: string;
  tagline: string;
  heroImage: string;
  
  // Quick reference
  routeList: string[]; // e.g. ["Riyadh", "Hail", "AlUla", "Jeddah", "Red Sea"]
  format: string; // e.g. "small group min 4 / max 14, or private"
  hotelTier: string; // e.g. "4★ standard, 5★ upgrade"
  languages: string[]; // e.g. ["Spanish", "English", "Italian", "Arabic"]
  physicalLevel: string; // e.g. "moderate"
  bestSeason: string; // e.g. "Oct–Apr"
  departureCity: string; // e.g. "Riyadh"

  // Positioning
  positioningParagraph: string;

  // Day-by-day itinerary
  itinerary: ItineraryDay[];

  // Inclusions & Exclusions
  inclusions: string[];
  exclusions: string[];

  // Pricing
  leadInPrice: string; // e.g. "$3,450"
  singleSupplement: string; // e.g. "$780"
  rateCardNote: string; // e.g. "Rates on request via B2B tariff sheet or XML connection"
  premiumUpgradeLine: string; // e.g. "Upgrade to 5★ Ultra-Luxury properties (Habitas AlUla, Ritz-Carlton Riyadh, St. Regis Red Sea) from +$1,980 per person."

  // Footer & trust block
  logoText: string;
  motLicense: string; // Ministry of Tourism License
  insurance: string; // e.g. "Lloyd's Coverholder / Inbound Premium Liability Insurance"
  contact: string; // e.g. "B2B Desk: inbound@albaways.com | +966 11 405 9224"
  website: string; // e.g. "partner.albaways.com"

  // Optional add-ons
  whyAlbaWays: string[]; // e.g. ["El Corte Inglés Preferred Inbound Partner", "Embassy & Official Delegation Track Record"]
  customizationNote: string; // e.g. "100% custom-tailor option: routes can be shortened, prolonged, or transformed into fully private single-family departures with dedicated concierge."
}
