import { ProductSheet } from "./types";

export const TEMPLATES: ProductSheet[] = [
  {
    id: "aw-hera-11",
    circuitName: "Saudi Heritage & Red Sea Coastal Wonders",
    productCode: "AW-HERA-11",
    duration: "11 days / 10 nights",
    tagline: "The definitive route connecting millennia of desert archaeology with the untouched coral gardens of the Saudi Red Sea.",
    heroImage: "https://images.unsplash.com/photo-1586724237569-f38559db82a7?auto=format&fit=crop&w=1600&q=80", // AlUla Hegra-like tombs / golden desert
    routeList: ["Riyadh", "Hail", "AlUla", "Jeddah", "Red Sea"],
    format: "Small group (min 4 / max 14) or Private Tailor-Made",
    hotelTier: "4★ Standard Boutique, 5★ Luxury Upgrade available",
    languages: ["Spanish", "English", "Italian", "Arabic"],
    physicalLevel: "Moderate (includes some light dune hiking and reef snorkeling)",
    bestSeason: "October – April",
    departureCity: "Riyadh (RUH)",
    positioningParagraph: "Unlike typical grand loops, the HERA circuit integrates an active adventure layer with elite coastal highlights. Guests explore the ancient Nabataean Hegra tombs and the petroglyphs of Hail, then transition to a private yacht charter over the pristine reefs of the Saudi Red Sea, avoiding long highway drives through smart premium logistics.",
    itinerary: [
      {
        day: 1,
        route: "Riyadh Arrival",
        highlights: "VIP meet & greet, evening welcome briefing, and a traditional Saudi degustation dinner under the stars.",
        overnight: "Al Faisaliah Hotel or voco Riyadh",
        meals: "Dinner"
      },
      {
        day: 2,
        route: "Riyadh · Edge of the World Extended",
        highlights: "Off-road drive through acacia valleys, custom-equipped trek along the dramatic Tuwaiq Escarpment cliffs, and sunset coordinates with tea and bonfire.",
        overnight: "voco Riyadh",
        meals: "Breakfast, Lunch, Dinner"
      },
      {
        day: 3,
        route: "Riyadh · Hail via Jubbah Art",
        highlights: "Morning high-speed train to Hail, exploration of Jabal Umm Sinman (UNESCO) petroglyphs dating back 10,000 years, and traditional Hail hospitality.",
        overnight: "Millennium Hail",
        meals: "Breakfast, Lunch"
      },
      {
        day: 4,
        route: "Hail · AlUla Valley",
        highlights: "Scenic mountain transition, Red Dunes desert driving in custom 4x4s, and a magical first twilight arrival at the Elephant Rock landmark.",
        overnight: "Cloud7 Residence or Habitas AlUla",
        meals: "Breakfast, Dinner"
      },
      {
        day: 5,
        route: "AlUla · Ancient Hegra & Dadan",
        highlights: "In-depth privately guided exploration of Nabataean Hegra (UNESCO tombs), the ancient capital of Dadan, and the inscriptions of Jabal Ikmah gorge.",
        overnight: "Cloud7 Residence or Habitas AlUla",
        meals: "Breakfast, Lunch"
      },
      {
        day: 6,
        route: "AlUla · Trails & Elite Stable",
        highlights: "Stroll through the shaded Oasis Heritage Trail, afternoon visit to an elite local Arabian horse stable with standard local tea, and high-altitude stargazing.",
        overnight: "Cloud7 Residence or Caravan by Habitas",
        meals: "Breakfast"
      },
      {
        day: 7,
        route: "AlUla · Medina Gate · Jeddah",
        highlights: "Express transit bypassing Medina outer rings for photos of the historic rail station, followed by high-speed Haramain train to the coastal city of Jeddah.",
        overnight: "Radisson Blu Plaza Jeddah or Park Hyatt Jeddah",
        meals: "Breakfast, Lunch"
      },
      {
        day: 8,
        route: "Jeddah · Al-Balad Walkthrough",
        highlights: "Guided walking tour inside UNESCO Al-Balad old quarter, custom entry into the beautifully restored Nassif House, and standard Hijazi spice shopping.",
        overnight: "Radisson Blu Plaza Jeddah",
        meals: "Breakfast, Lunch"
      },
      {
        day: 9,
        route: "Jeddah · Private Red Sea Charter",
        highlights: "Boarding a premium 45ft private catamaran yacht charter from Marine Club. Snorkeling and scuba exploring virgin coral wall reefs, lunch prepared by onboard chef.",
        overnight: "Radisson Blu Plaza Jeddah or Bay La Sun Resort",
        meals: "Breakfast, Lunch, Dinner"
      },
      {
        day: 10,
        route: "Red Sea Maldives of Arabia & Dunes",
        highlights: "Relaxation at private beach club at Yam Beach, optional jet ski or stand-up paddleboarding, and a farewell seafood banquet on the marina.",
        overnight: "Bay La Sun Resort or St. Regis Red Sea",
        meals: "Breakfast, Dinner"
      },
      {
        day: 11,
        route: "Jeddah Departure",
        highlights: "Private transfer to King Abdulaziz International Airport (JED) for outbound flights.",
        overnight: "None",
        meals: "Breakfast"
      }
    ],
    inclusions: [
      "10 nights premium boutique hotel and boutique resort accommodations",
      "Private transfers in luxury executive Sprinters (with Wi-Fi, refreshments, on-board safe)",
      "Certified English, Spanish, or Italian-speaking professional native guide throughout",
      "Alba Ways on-ground 24/7 operations coordinator & safety escort escorting the tour",
      "All site permits, UNESCO monument passes, national park admissions, and ranger fees",
      "Edge of the World extended private trek, Red Dunes 4x4 safaris, and Arabian Horse farm access",
      "Private Red Sea boat charter (catamaran / motor yacht) with certified master guide and equipment",
      "High-speed first class rail tickets (Riyadh to Hail & Medina to Jeddah)"
    ],
    exclusions: [
      "International flights to Riyadh and out of Jeddah",
      "Saudi entry tourist visa (eVisa processing available via B2B agency portal)",
      "Standard international personal travel & medical insurance (mandatory)",
      "Discretionary tips, driver/guide gratuities, and porterage fees",
      "Alcoholic beverages and optional soft-drink mini bar orders",
      "Any unlisted secondary tours or activity supplements"
    ],
    leadInPrice: "$4,850",
    singleSupplement: "$1,120",
    rateCardNote: "Rates are indicative peak/low seasonal averages. Complete nett rates, allotments, and customizable seasonality schedules are listed in partner.albaways.com XML portal.",
    premiumUpgradeLine: "Upgrade to 5★ Ultra-Luxury properties: The Ritz-Carlton Riyadh, Twin Farms/Habitas AlUla, and The St. Regis Red Sea Resort from +$2,450 per person double occupancy.",
    logoText: "alba ways",
    motLicense: "MoT Inbound Saudi Operator License No. 71-002845",
    insurance: "Inbound Comprehensive Public Liability Insurance coverage underwritten by Lloyd's Coverholders",
    contact: "Saudi B2B Desk: partners@albaways.com | WhatsApp Ops: +966 54 809 3322",
    website: "partners.albaways.com",
    whyAlbaWays: [
      "El Corte Inglés & major Spanish travel consortia preferred official Saudi inbound DMC",
      "Proven governmental delegational & European embassy protocol track record with custom VIP escorts",
      "Bespoke contract arrangements & modular itineraries suitable for premium white-labeling",
      "Own physical offices, fleet operations, and certified host guides based in Riyadh, Jeddah, and AlUla"
    ],
    customizationNote: "This circuit is 100% modular. You can add nights in AlUla, bypass Jubbah, or upgrade exclusively to private heli-transfers between sites on request via our partner desk."
  },
  {
    id: "aw-desert-7",
    circuitName: "Arabian Desert Legends & Escarpments",
    productCode: "AW-DESERT-7",
    duration: "7 days / 6 nights",
    tagline: "An immersive overland traverse designed for high-end adventurers seeking the pristine silence of the Nafud desert.",
    heroImage: "https://images.unsplash.com/photo-1547234935-80c7145ec969?auto=format&fit=crop&w=1600&q=80", // Desert dunes
    routeList: ["Riyadh", "Hail", "Nafud", "AlUla"],
    format: "Private 4x4 Overland or Small Group",
    hotelTier: "Premium Desert Camps & Eco-lodges",
    languages: ["English", "Spanish", "Arabic"],
    physicalLevel: "Challenging (Desert walking, off-road dunes navigation)",
    bestSeason: "November – March",
    departureCity: "Riyadh (RUH)",
    positioningParagraph: "Designed specifically to capture the romantic heritage of Arab explorers, the DESERT-7 package focuses on luxury overland travel. Guests traverse the raw orange sands of the Great Nafud Desert in modified Land Cruisers, sleep under clear celestial skies in luxury setups, and conclude amidst the ancient rock vaults of AlUla.",
    itinerary: [
      {
        day: 1,
        route: "Riyadh Arrival",
        highlights: "Private reception, luxury transfer to capital lounge, and sunset briefing.",
        overnight: "Four Seasons Riyadh",
        meals: "Dinner"
      },
      {
        day: 2,
        route: "Riyadh · Heritage & Clay Forts",
        highlights: "Historical stroll in Diriyah (At-Turaif), Clay fort archaeology, and dinner in Bujairi Terrace.",
        overnight: "Four Seasons Riyadh",
        meals: "Breakfast, Lunch"
      },
      {
        day: 3,
        route: "Riyadh · Hail Overland",
        highlights: "High speed train to Hail, sunset over the historic A'arif Fort, and tasting local Najdi dishes.",
        overnight: "Millennium Hail",
        meals: "Breakfast, Dinner"
      },
      {
        day: 4,
        route: "Hail · Great Nafud Luxury Camp",
        highlights: "Overland 4x4 expedition into the true Nafud crimson desert. Private setup nomadic luxury camp, Arabic coffee workshops, and falconry displays.",
        overnight: "Alba Ways Nomadic Camp (Private Luxury Setup)",
        meals: "Breakfast, Lunch, Dinner"
      },
      {
        day: 5,
        route: "Nafud Desert · AlUla",
        highlights: "Morning desert dune crossing, transitioning to the Sandstone towers of AlUla, elephant rock stargazing.",
        overnight: "Caravan by Habitas AlUla",
        meals: "Breakfast, Lunch"
      },
      {
        day: 6,
        route: "AlUla Archaeology",
        highlights: "Full day private access to Hegra and Nabataean tombs, sunset Hegra picnic with curated coordinates.",
        overnight: "Caravan by Habitas AlUla",
        meals: "Breakfast, Dinner"
      },
      {
        day: 7,
        route: "AlUla Departure",
        highlights: "Transfer to AlUla International Airport (ULH) for onward flights.",
        overnight: "None",
        meals: "Breakfast"
      }
    ],
    inclusions: [
      "6 nights high-end luxury camp and premium resort accommodations",
      "Private expedition-prepared Toyota Land Cruisers with expert off-road drivers",
      "Professional certified native guide & desert safety crew",
      "Exclusive private nomadic desert camp experience under the stars",
      "All VIP entry permits, archaeological approvals, and site fees"
    ],
    exclusions: [
      "Visas & flights",
      "Mandatory insurance",
      "Tips and optional spa treatments"
    ],
    leadInPrice: "$3,650",
    singleSupplement: "$820",
    rateCardNote: "Rates are based on double occupancy. Custom configurations and private single departure additions are managed via the Alba Ways B2B system.",
    premiumUpgradeLine: "Upgrade AlUla stay to Habitas Canyon Pool Villa from +$980 per person secondary rate.",
    logoText: "alba ways",
    motLicense: "MoT Inbound Saudi Operator License No. 71-002845",
    insurance: "Inbound Comprehensive Public Liability Insurance coverage underwritten by Lloyd's Coverholders",
    contact: "Saudi B2B Desk: partners@albaways.com | WhatsApp Ops: +966 54 809 3322",
    website: "partners.albaways.com",
    whyAlbaWays: [
      "Official Saudi Inbound DMC with private equipment & VIP vehicles",
      "Proven safety-record in deep-desert expeditions with satellite tracking and emergency medic team"
    ],
    customizationNote: "Can be prolonged with a private flight charter to Makkah/Madinah or Tabuk coastline."
  }
];
