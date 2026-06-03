import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
app.use(express.json());
const PORT = 3000;

// Lazy initialization of GoogleGenAI to prevent crashing at startup if the API key is not yet set
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    console.warn("⚠️ GEMINI_API_KEY is not configured or uses placeholder value. AI features will run in sandbox demo mode.");
    return null;
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// 1. API: AI Sheet Generation with structured JSON Schema output
app.post("/api/generate", async (req, res) => {
  const { prompt, currentSheet } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "No prompt provided" });
  }

  const ai = getGeminiClient();
  if (!ai) {
    // Elegant fallback simulation so the application remains functional with visual mockup feedback
    return res.json({
      isDemo: true,
      data: {
        circuitName: `Alba Ways Private Expedition: ${prompt.slice(0, 30)}...`,
        productCode: "AW-AI-GEN-01",
        duration: "8 days / 7 nights",
        tagline: "Unveiling Saudi Arabia's hidden coordinates with elite B2B concierge services.",
        heroImage: "https://images.unsplash.com/photo-1547234935-80c7145ec969?auto=format&fit=crop&w=1600&q=80",
        routeList: ["Riyadh", "Desert Dunes", "AlUla", "Jeddah"],
        format: "Private tailored dispatch (min 2 / max 8 pax)",
        hotelTier: "5★ Ultra-Luxury Upgrade Standard",
        languages: ["English", "Spanish", "Italian"],
        physicalLevel: "Moderate",
        bestSeason: "Nov–Mar",
        departureCity: "Riyadh (RUH)",
        positioningParagraph: "This AI-suggested itinerary combines the dramatic vistas of the high plateaus with local archaeological legacy. Seamless transition vectors and bespoke private activities create a product sheet perfectly tuned for demanding European consortia.",
        itinerary: [
          { day: 1, route: "Riyadh Arrival", highlights: "VIP airport lounge meet, premium private Sprinter check-in.", overnight: "Ritz-Carlton Riyadh", meals: "Dinner" },
          { day: 2, route: "Riyadh Explorer", highlights: "Private Diriyah walkthrough and custom Edge of the World sunset picnic.", overnight: "Ritz-Carlton Riyadh", meals: "Breakfast, Lunch" },
          { day: 3, route: "Desert Dunes Crossing", highlights: "Premium 4x4 dune bashing adventure with private chef bedouin lunch.", overnight: "Red Dunes Safari Camp", meals: "Breakfast, Lunch, Dinner" },
          { day: 4, route: "AlUla Transition", highlights: "Flight to AlUla, twilight arrival at Elephant Rock landscape.", overnight: "Habitas AlUla Canyon Villa", meals: "Breakfast" },
          { day: 5, route: "Hegra Monuments", highlights: "Exclusivity guided tour on vintage Land Rovers through UNESCO tombs.", overnight: "Habitas AlUla Canyon Villa", meals: "Breakfast, Lunch" },
          { day: 6, route: "Jeddah Red Sea Coastal Escape", highlights: "Haramain Express train to Jeddah, coastal yacht briefing.", overnight: "Park Hyatt Jeddah Marina", meals: "Breakfast, Dinner" },
          { day: 7, route: "Maritime Yacht Charter", highlights: "Private luxury yacht snorkeling and pristine beach club access.", overnight: "Park Hyatt Jeddah Marina", meals: "Breakfast, Lunch" },
          { day: 8, route: "Departure JED", highlights: "Private executive airport shuttle.", overnight: "None", meals: "Breakfast" }
        ],
        inclusions: [
          "Bespoke luxury accommodations at leading 5★ landmarks",
          "Private Mercedes sprinter ground logistics with custom refreshment bar",
          "Fully certified multilingual host guides (Spanish/Italian/English)",
          "Private catamaran reef snorkeling exploration",
          "All UNESCO admissions, VIP clearance permits, and national reserve tickets"
        ],
        exclusions: [
          "International flights",
          "Saudi eVisa fees",
          "Guides international tipping standards",
          "Personal optional purchases in AlUla old market"
        ],
        leadInPrice: "$5,120",
        singleSupplement: "$1,240",
        rateCardNote: "Demo mock rate. Configure GEMINI_API_KEY in Secrets for real-time generative outputs.",
        premiumUpgradeLine: "Private helicopter transport can be arranged for inter-property desert segments +$3,800/segment.",
        logoText: "alba ways",
        motLicense: "MoT Inbound Saudi Operator License No. 71-002845",
        insurance: "Comprehensive public safety policy via Lloyd's Coverholders",
        contact: "partners@albaways.com | +966 54 809 3322",
        website: "partners.albaways.com",
        whyAlbaWays: [
          "Spain and Italy's leading custom inbound luxury gateway directly operating in KSA",
          "100% white label flexibility with native professional ground managers"
        ],
        customizationNote: "100% modifiable route blueprint managed immediately by our B2B team."
      }
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Generate a premium B2B tourism product sheet for Saudi Arabia.
      User request/theme: "${prompt}"
      Make it highly realistic, luxurious, using Saudi Arabia locations (e.g. Riyadh, AlUla, Jeddah, Red Sea, Tabuk, Hail, Taif, Abha, Madinah, Farasan Islands, Makkah, Najran).
      Incorporate Saudi historic archaeological, coastal or desert highlights.
      Conform the days logically (aim for a logical length, preferably around 5 to 11 days).
      
      Respond STRICTLY in the exact JSON format defined below:`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: [
            "circuitName", "productCode", "duration", "tagline", "heroImage",
            "routeList", "format", "hotelTier", "languages", "physicalLevel",
            "bestSeason", "departureCity", "positioningParagraph", "itinerary",
            "inclusions", "exclusions", "leadInPrice", "singleSupplement",
            "rateCardNote", "premiumUpgradeLine", "logoText", "motLicense",
            "insurance", "contact", "website", "whyAlbaWays", "customizationNote"
          ],
          properties: {
            circuitName: { type: Type.STRING, description: "Elegant name of the tour circuit" },
            productCode: { type: Type.STRING, description: "Format: AW-CODE-DAYS, e.g., AW-NEOM-8" },
            duration: { type: Type.STRING, description: "e.g., '8 days / 7 nights'" },
            tagline: { type: Type.STRING, description: "Punchy, luxurious B2B positioning selling tagline" },
            heroImage: { type: Type.STRING, description: "A high-quality Unsplash image URL suitable for Saudi tourism" },
            routeList: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Array of major ciudades matching the route" },
            format: { type: Type.STRING, description: "e.g., 'Small group min 4 / max 12 or Private'" },
            hotelTier: { type: Type.STRING, description: "e.g., '4★ standard boutique, 5★ upgrade'" },
            languages: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Languages, e.g., ['English', 'Spanish', 'Italian']" },
            physicalLevel: { type: Type.STRING, description: "Moderate, Easy, or Challenging" },
            bestSeason: { type: Type.STRING, description: "e.g., 'Oct–Apr'" },
            departureCity: { type: Type.STRING, description: "Starting airport city" },
            positioningParagraph: { type: Type.STRING, description: "2-3 highly evocative, professional sentences on what makes this circuit distinct (the adventure layer, special details vs standard grand tours)" },
            itinerary: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: ["day", "route", "highlights", "overnight", "meals"],
                properties: {
                  day: { type: Type.INTEGER },
                  route: { type: Type.STRING, description: "Day route title, e.g., 'Riyadh · Edge of the World'" },
                  highlights: { type: Type.STRING, description: "1-2 detailed sentences about premium experiences" },
                  overnight: { type: Type.STRING, description: "Specific luxury or boutique hotels" },
                  meals: { type: Type.STRING, description: "Breakfast, Lunch, Dinner combinations" }
                }
              }
            },
            inclusions: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Comprehensive ticks" },
            exclusions: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Clear boundaries to avoid claims" },
            leadInPrice: { type: Type.STRING, description: "Lead-in rate, e.g., '$3,990 per person'" },
            singleSupplement: { type: Type.STRING, description: "Single room supplement, e.g., '+$840'" },
            rateCardNote: { type: Type.STRING, description: "XML connection and B2B tariff note" },
            premiumUpgradeLine: { type: Type.STRING, description: "The 5★ hotel upgrade properties and extra cost" },
            logoText: { type: Type.STRING, description: "Constant value: 'alba ways'" },
            motLicense: { type: Type.STRING, description: "e.g., 'Saudi MoT License No. 71-002845'" },
            insurance: { type: Type.STRING, description: "Comprehensive coverage detail" },
            contact: { type: Type.STRING, description: "B2B desk email and phone" },
            website: { type: Type.STRING, description: "e.g., 'partners.albaways.com'" },
            whyAlbaWays: { type: Type.ARRAY, items: { type: Type.STRING }, description: "2-4 B2B track records and credential strips" },
            customizationNote: { type: Type.STRING, description: "Note on private departures and fully customizable modules" }
          }
        }
      }
    });

    const parsedData = JSON.parse(response.text || "{}");
    return res.json({ success: true, data: parsedData });
  } catch (error: any) {
    console.error("AI Generation Error:", error);
    return res.status(500).json({ error: error.message || "Failed to generate sheet via AI" });
  }
});

// 2. API: Highlight Polishing (Professionalize selected text fields)
app.post("/api/polish", async (req, res) => {
  const { text, fieldName } = req.body;
  if (!text) {
    return res.status(400).json({ error: "No text provided" });
  }

  const ai = getGeminiClient();
  if (!ai) {
    return res.json({
      success: true,
      text: `[Sandbox Premium Edits] ${text} – Elegantly re-crafted: Experience bespoke KSA hospitality at its absolute pinnacle with certified hosts, curated logistics, and legendary local guides.`
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Polish the following text for a B2B premium tour operator product sheet.
      Field context: "${fieldName || "description"}"
      Original text: "${text}"
      
      Requirements:
      - Elevate the tone to be highly evocative, luxury-oriented, sophisticated, yet professional and transparent.
      - Keep it succinct (maximum 3 sentences).
      - Do not include any meta comments. Just output the polished text.`,
      config: {
        temperature: 0.7,
      }
    });

    return res.json({ success: true, text: response.text?.trim() });
  } catch (error: any) {
    console.error("AI Polishing Error:", error);
    return res.status(500).json({ error: error.message || "Failed to polish text" });
  }
});

// 3. API: Dynamic Translation of the entire pack (Eng -> Spa / Ita / Ara)
app.post("/api/translate", async (req, res) => {
  const { sheet, targetLanguage } = req.body;
  if (!sheet || !targetLanguage) {
    return res.status(400).json({ error: "Missing sheet or target language" });
  }

  const ai = getGeminiClient();
  if (!ai) {
    // Sandbox translation indicator
    return res.json({
      isDemo: true,
      sheet: {
        ...sheet,
        circuitName: `[Translated to ${targetLanguage}] ` + sheet.circuitName,
        tagline: `[Translated to ${targetLanguage}] ` + sheet.tagline,
        positioningParagraph: `[Translated to ${targetLanguage}] ` + sheet.positioningParagraph,
      }
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Act as an elite multi-lingual luxury travel copywriter. Translate the following tour product sheet details into native, grammatically perfect travel agent style in ${targetLanguage}.
      Ensure correct regional B2B terminology (e.g. "itinerario", "suplemento individual", "tarifa neta", "incluido", "excluido" etc., for Spain/Italy).
      
      Here is the complete sheet object in JSON:
      ${JSON.stringify(sheet, null, 2)}
      
      Respond with the EXACT same JSON schema, containing translated values, keeping constants like "productCode", "logoText" (alba ways), "id", and numeric values identical.`,
      config: {
        responseMimeType: "application/json",
      }
    });

    const translatedSheet = JSON.parse(response.text || "{}");
    return res.json({ success: true, data: translatedSheet });
  } catch (error: any) {
    console.error("AI Translation Error:", error);
    return res.status(500).json({ error: error.message || "Failed to translate product sheet" });
  }
});

// Serve frontend assets
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 B2B Tourism Sheet Server running on http://localhost:${PORT}`);
  });
}

startServer();
