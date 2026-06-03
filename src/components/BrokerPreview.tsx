import React, { useState } from "react";
import { ProductSheet } from "../types";
import RouteMap from "./RouteMap";
import {
  MapPin,
  Calendar,
  Users,
  Award,
  PhoneCall,
  Compass,
  DollarSign,
  Layers,
  Globe,
  Printer,
  Sparkles,
  Check,
  Percent,
  TrendingUp,
  FileSpreadsheet,
  AlertOctagon,
  Languages
} from "lucide-react";

interface BrokerPreviewProps {
  sheet: ProductSheet;
  onPolishField: (fieldName: string, text: string) => void;
  isPolishing: boolean;
}

export default function BrokerPreview({ sheet, onPolishField, isPolishing }: BrokerPreviewProps) {
  const [printHighContrast, setPrintHighContrast] = useState(false);
  const [viewPdfGrid, setViewPdfGrid] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const getMealPills = (mealsStr: string) => {
    if (!mealsStr) return null;
    const parts = mealsStr.split(",").map(p => p.trim());
    return (
      <div className="flex gap-1 items-center">
        {parts.map((part, i) => (
          <span key={i} className="text-[9px] font-mono tracking-wider px-1.5 py-0.5 rounded-full bg-[#f2ebd9] text-[#705e45] uppercase font-bold border border-[#e8dfcf]">
            {part}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className={`w-full h-full flex flex-col ${printHighContrast ? 'bg-white' : 'bg-[#faf8f4]'}`}>
      
      {/* Upper Preview Header Panel (No Print) */}
      <div className="no-print bg-white border-b border-[#e8dfcf] px-6 py-4 flex flex-wrap gap-4 items-center justify-between">
        <div>
          <span className="text-xs font-mono tracking-widest text-[#a88854] uppercase font-semibold">Live Preview Workspace</span>
          <h2 className="text-lg font-sans font-bold text-[#12151c]">B2B Product Brochure Sheet</h2>
        </div>
        <div className="flex items-center gap-2">
          {/* Print Friendly Toggles */}
          <button
            onClick={() => setPrintHighContrast(!printHighContrast)}
            className={`cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-sans font-medium border transition-all ${
              printHighContrast
                ? "bg-[#12151c] text-white border-[#12151c]"
                : "bg-white text-[#705e45] border-[#dfd2bd] hover:bg-[#fafaf7]"
            }`}
            title="Saves ink by clearing sandy background tones to pure crisp white"
          >
            <Compass className="w-3.5 h-3.5" />
            {printHighContrast ? "Nett Ink Mode Active" : "Ink Saver White"}
          </button>

          <button
            onClick={() => setViewPdfGrid(!viewPdfGrid)}
            className={`cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-sans font-medium border transition-all ${
              viewPdfGrid
                ? "bg-[#a88854] text-white border-[#a88854]"
                : "bg-white text-[#705e45] border-[#dfd2bd] hover:bg-[#fafaf7]"
            }`}
            title="Draws standard page boundary lines to preview typical page boundaries"
          >
            <Layers className="w-3.5 h-3.5" />
            {viewPdfGrid ? "Hide Safe Margins" : "Show Page Boundaries"}
          </button>

          <button
            onClick={handlePrint}
            className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 bg-[#a88854] hover:bg-[#967645] text-white rounded-lg text-xs font-sans font-semibold tracking-wide shadow-md transition-all uppercase"
          >
            <Printer className="w-4 h-4" />
            Export or Print (PDF)
          </button>
        </div>
      </div>

      {/* Main Sheet Container */}
      <div className="flex-1 overflow-y-auto px-1 sm:px-6 py-8">
        <div id="print-brochure" className={`print-container print-full mx-auto p-4 sm:p-8 md:p-12 border ${
          viewPdfGrid ? "border-dashed border-red-400 max-w-[816px] min-h-[1056px]" : "border-[#e0d8c8] max-w-[880px]"
        } rounded-xl bg-white shadow-lg relative transition-all duration-300 font-sans`}>
          
          {viewPdfGrid && (
            <div className="no-print absolute top-1 right-1 bg-red-500 text-white text-[9px] font-mono px-2 py-0.5 rounded font-black uppercase z-20">
              Typical Page Limit Guide
            </div>
          )}

          {/* TOP HEADER / LOGO IDENTITY */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#f2eedf] pb-6 mb-6 gap-4">
            <div className="flex flex-col">
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#a88854] font-bold uppercase mb-1">Inbound Saudi Arabia Direct Solutions</span>
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-2xl tracking-tighter text-[#12151c] uppercase">
                  {sheet.logoText || "alba ways"}
                </span>
                <span className="text-[9px] border border-[#a88854]/40 text-[#a88854] rounded px-1.5 py-0.5 font-mono uppercase tracking-wide">
                  Licensed DMC
                </span>
              </div>
            </div>
            <div className="text-right sm:text-right flex flex-col items-start sm:items-end font-mono">
              <span className="text-[10px] text-[#705e45] uppercase tracking-wider font-semibold">B2B Confident Tariff Package</span>
              <span className="text-[11px] text-[#12151c] font-black">{sheet.productCode || "AW-HERA-11"}</span>
            </div>
          </div>

          {/* MAIN ITINERARY TITLE */}
          <div className="mb-6 flex flex-col">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#a88854] uppercase font-bold mb-1.5">
              <span>{sheet.duration || "11 Days / 10 Nights"}</span>
              <span className="text-[#e2dac6]">·</span>
              <span className="text-[#705e45]">{sheet.departureCity ? `Ex-Departure: ${sheet.departureCity}` : "Saudi Loop"}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-light text-[#12151c] leading-tight mb-3 tracking-tight">
              {sheet.circuitName || "Saudi Heritage & Luxury Wonders"}
            </h1>
            
            {/* Tagline / Positioning Hook */}
            <div className="relative pl-4 border-l-2 border-[#a88854] py-1">
              <p className="text-sm font-display italic text-[#3a4454] leading-relaxed select-text">
                "{sheet.tagline || "Capturing the pure golden contrast of archaeological stone and seaside coral reefs."}"
              </p>
              <button
                onClick={() => onPolishField("tagline", sheet.tagline)}
                disabled={isPolishing}
                className="no-print absolute right-2 top-1/2 -translate-y-1/2 p-1 text-[#a88854] hover:bg-[#fcf8ee] rounded opacity-0 group-hover:opacity-100 transition-all text-[11px] flex items-center gap-1 cursor-pointer"
                title="AI Professionalize this text"
              >
                <Sparkles className="w-3 h-3" />
                <span className="font-sans text-[9px] font-bold">Polish</span>
              </button>
            </div>
          </div>

          {/* HERO IMAGE BAND */}
          {sheet.heroImage && (
            <div className="relative w-full aspect-[21/9] rounded-xl overflow-hidden mb-6 bg-[#eae5d9] border border-[#f0e8dc]">
              <img
                src={sheet.heroImage}
                alt={sheet.circuitName}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback standard tourism cover if unsplash fails
                  e.currentTarget.src = "https://images.unsplash.com/photo-1547234935-80c7145ec969?auto=format&fit=crop&w=1600&q=80";
                }}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex justify-between items-end">
                <span className="text-[10px] font-mono tracking-widest text-[#eae5d9] uppercase font-bold">
                  DMC Operator Inventory
                </span>
                <span className="text-[9px] font-mono text-white/85 flex items-center gap-1 uppercase bg-white/10 backdrop-blur-xs px-2 py-1 rounded">
                  <Compass className="w-3 h-3 text-[#a88854]" /> Standard Group or Private Tailor
                </span>
              </div>
            </div>
          )}

          {/* QUICK-REFERENCE BOX (Scannable, Top of Page) */}
          <div className="bg-[#FAF9F5] border border-[#ece7dc] rounded-xl p-4 sm:p-5 mb-8 grid grid-cols-2 lg:grid-cols-4 gap-4 gap-y-5">
            <div className="flex gap-2.5 items-start">
              <div className="p-1.5 bg-white border border-[#dfd7c3] rounded text-[#a88854]">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-mono uppercase tracking-wider text-[#796d5b] font-medium">Route Vector</span>
                <span className="text-xs font-sans font-extrabold text-[#111] leading-tight">
                  {sheet.routeList && sheet.routeList.length > 0
                    ? sheet.routeList.join(" · ")
                    : "Riyadh, AlUla, Jeddah"}
                </span>
              </div>
            </div>

            <div className="flex gap-2.5 items-start">
              <div className="p-1.5 bg-white border border-[#dfd7c3] rounded text-[#a88854]">
                <Users className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-mono uppercase tracking-wider text-[#796d5b] font-medium">Format</span>
                <span className="text-xs font-sans font-bold text-[#111] leading-tight">
                  {sheet.format || "Min 4 / Max 14 Pax"}
                </span>
              </div>
            </div>

            <div className="flex gap-2.5 items-start">
              <div className="p-1.5 bg-white border border-[#dfd7c3] rounded text-[#a88854]">
                <Award className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-mono uppercase tracking-wider text-[#796d5b] font-medium">Hotel Level</span>
                <span className="text-xs font-sans font-bold text-[#111] leading-tight">
                  {sheet.hotelTier || "4★ and 5★ Upgrades"}
                </span>
              </div>
            </div>

            <div className="flex gap-2.5 items-start">
              <div className="p-1.5 bg-white border border-[#dfd7c3] rounded text-[#a88854]">
                <Languages className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-mono uppercase tracking-wider text-[#796d5b] font-medium">DMC Guide Langs</span>
                <span className="text-xs font-sans font-bold text-[#111] leading-tight">
                  {sheet.languages && sheet.languages.length > 0
                    ? sheet.languages.join(" · ")
                    : "English · Spanish · Italian"}
                </span>
              </div>
            </div>

            <div className="flex gap-2.5 items-start">
              <div className="p-1.5 bg-white border border-[#dfd7c3] rounded text-[#a88854]">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-mono uppercase tracking-wider text-[#796d5b] font-medium">Physical Demand</span>
                <span className="text-xs font-sans font-bold text-[#111] uppercase tracking-wide">
                  {sheet.physicalLevel || "Moderate"}
                </span>
              </div>
            </div>

            <div className="flex gap-2.5 items-start">
              <div className="p-1.5 bg-white border border-[#dfd7c3] rounded text-[#a88854]">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-mono uppercase tracking-wider text-[#796d5b] font-medium">Optimal Season</span>
                <span className="text-xs font-sans font-bold text-[#111]">
                  {sheet.bestSeason || "October – April"}
                </span>
              </div>
            </div>

            <div className="flex gap-2.5 items-start">
              <div className="p-1.5 bg-white border border-[#dfd7c3] rounded text-[#a88854]">
                <Compass className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-mono uppercase tracking-wider text-[#796d5b] font-medium">Start Coordinates</span>
                <span className="text-xs font-sans font-bold text-[#111]">
                  {sheet.departureCity || "Riyadh (RUH)"}
                </span>
              </div>
            </div>

            <div className="flex gap-2.5 items-start col-span-1 lg:col-span-1">
              <div className="p-1.5 bg-white border border-[#dfd7c3] rounded text-[#a88854]">
                <Layers className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-mono uppercase tracking-wider text-[#796d5b] font-medium">Logistics Agent</span>
                <span className="text-xs font-sans font-bold text-[#a88854] tracking-tight uppercase font-medium">
                  Alba Ways Direct
                </span>
              </div>
            </div>
          </div>

          {/* POSITIONING PARAGRAPH (The distinct adventure layer statement) */}
          <div className="relative group p-5 bg-[#fafbfb] border-l-2 border-[#12151c] rounded-r-xl mb-8">
            <h4 className="text-[10px] font-mono tracking-widest text-[#12151c] uppercase font-bold mb-1.5">
              Unique Circuit Positioning
            </h4>
            <p className="text-sm font-sans text-[#334155] leading-relaxed font-normal select-text">
              {sheet.positioningParagraph || "A curated experience blending the absolute highlights..."}
            </p>
            
            <button
              onClick={() => onPolishField("positioningParagraph", sheet.positioningParagraph)}
              disabled={isPolishing}
              className="no-print absolute right-3 top-3 p-1.5 text-[#705e45] bg-[#ebdcb9]/40 hover:bg-[#ebdcb9]/80 rounded text-[10px] flex items-center gap-1 transition-all pointer-events-auto cursor-pointer font-bold"
              title="AI Professionalize this positioning statement"
            >
              <Sparkles className="w-3 h-3 text-[#a88854]" />
              Polish Positioning
            </button>
          </div>

          {/* ROUTE MAP AND KEY NOTES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 page-break">
            <div>
              <h3 className="text-xs font-mono tracking-widest text-[#a88854] uppercase font-bold mb-3 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-[#a88854]" /> Geographic Routing Overview
              </h3>
              <p className="text-xs font-sans text-[#64748b] leading-relaxed mb-4">
                The map on the right illustrates client's transport trajectories. Transitions between distant central and coastal centers are supported via Haramain first-class bullet trains or private chartered executive logistics to guarantee comfort.
              </p>
              <div className="bg-[#FAF9F5] p-3.5 border border-[#ece7dc] rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-[#12151c]" />
                  <span className="text-xs font-sans font-bold text-[#12151c]">B2B Customization Ready</span>
                </div>
                <p className="text-[11px] font-sans text-[#475569] leading-relaxed">
                  {sheet.customizationNote || "Our routes are fully modular. Extensions, localized guides, or specific VIP flight transfers are coordinated on request via our partner portal desk."}
                </p>
              </div>
            </div>
            
            <div>
              <RouteMap cities={sheet.routeList || []} />
            </div>
          </div>

          {/* DAY BY DAY EXPANSION */}
          <div className="mb-10 page-break">
            <h3 className="text-sm font-mono tracking-widest text-[#a88854] uppercase font-bold mb-5 border-b border-[#f2eedf] pb-3 flex items-center justify-between">
              <span>Day-by-Day Comprehensive Itinerary Blueprint</span>
              <span className="text-xs text-[#705e45] font-sans lowercase font-normal italic">
                {sheet.itinerary ? `${sheet.itinerary.length} active stages` : ""}
              </span>
            </h3>

            <div className="space-y-4">
              {sheet.itinerary && sheet.itinerary.map((dayItem, index) => (
                <div
                  key={index}
                  className="group relative border border-[#ece7dc] hover:border-[#dfd7c3] rounded-xl p-4 transition-all duration-150 hover:bg-[#FAF9F5]/35 flex flex-col md:flex-row gap-4"
                >
                  {/* Left day badge */}
                  <div className="flex md:flex-col items-center md:items-start justify-between md:justify-start gap-2 md:w-28 shrink-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-mono tracking-wider text-[#a88854] uppercase font-black">Day</span>
                      <span className="text-2xl font-display font-light text-[#12151c] leading-none">
                        {String(dayItem.day).padStart(2, "0")}
                      </span>
                    </div>
                    {dayItem.meals && getMealPills(dayItem.meals)}
                  </div>

                  {/* Right description */}
                  <div className="flex-1 flex flex-col justify-between select-text pr-2 py-0.5">
                    <div>
                      <h4 className="text-sm font-sans font-extrabold text-[#12151c] tracking-tight mb-1">
                        {dayItem.route}
                      </h4>
                      <p className="text-xs font-sans text-[#475569] leading-relaxed mb-2.5">
                        {dayItem.highlights}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-y-1.5 gap-x-4 border-t border-dashed border-[#f2eedf] pt-2 mt-1">
                      <span className="text-[10px] font-sans text-[#79664b] flex items-center gap-1 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-[#a88854]" />
                        <span className="font-mono text-[9px] uppercase tracking-wide text-gray-400">Overnight:</span> {dayItem.overnight}
                      </span>
                    </div>

                    <button
                      onClick={() => onPolishField(`itinerary-${index}-highlights`, dayItem.highlights)}
                      disabled={isPolishing}
                      className="no-print absolute right-3 top-3 p-1 text-[#a88854] bg-[#faf8f4] border border-[#ece7dc] hover:bg-[#ebdbc9]/30 rounded opacity-0 group-hover:opacity-100 transition-all text-[9.5px] font-black flex items-center gap-1 cursor-pointer"
                      title="AI Optimize and polish this day's highlights description"
                    >
                      <Sparkles className="w-2.5 h-2.5 text-[#a88854]" />
                      Polish Text
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* INCLUSIONS & EXCLUSIONS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 page-break">
            {/* INCLUSIONS */}
            <div className="border border-[#e1dac8] rounded-xl p-5 bg-[#FAFBF9]">
              <h4 className="text-xs font-mono tracking-widest text-[#2e5d3c] uppercase font-bold mb-4 border-b border-[#ebdcb9] pb-2 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 border border-emerald-600 rounded-full p-0.5" />
                DMC Included Standard Provisions
              </h4>
              <ul className="space-y-2.5 text-xs font-sans text-slate-700">
                {sheet.inclusions && sheet.inclusions.map((inc, i) => (
                  <li key={i} className="flex gap-2 items-start leading-relaxed select-text">
                    <span className="text-emerald-600 font-extrabold shrink-0 mt-0.5">✓</span>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* EXCLUSIONS */}
            <div className="border border-[#eadaa6] rounded-xl p-5 bg-[#FCFAF0]/50">
              <h4 className="text-xs font-mono tracking-widest text-[#7c2d12] uppercase font-bold mb-4 border-b border-[#ebdcb9] pb-2 flex items-center gap-2">
                <AlertOctagon className="w-4 h-4 text-orange-700" />
                Clear Excluded Limits (Avoid Disputes)
              </h4>
              <ul className="space-y-2.5 text-xs font-sans text-slate-700">
                {sheet.exclusions && sheet.exclusions.map((exc, i) => (
                  <li key={i} className="flex gap-2 items-start leading-relaxed select-text">
                    <span className="text-orange-700 font-black shrink-0 mt-0.5">—</span>
                    <span>{exc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* TARIFFS & UPGRADES */}
          <div className="border border-[#ece7dc] rounded-xl p-6 bg-[#FAF9F5] mb-8 page-break">
            <h4 className="text-xs font-mono tracking-widest text-[#a88854] uppercase font-bold mb-4 flex items-center gap-2">
              <DollarSign className="w-4 h-4" /> Confidential B2B Tariff Summary
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div className="bg-white border border-[#dfd7c3] rounded-lg p-3.5 flex flex-col justify-center">
                <span className="text-[9px] font-mono uppercase tracking-wider text-[#7c6a51]">From Lead-In Rate</span>
                <span className="text-2xl font-display font-light text-[#12151c] tracking-tight">
                  {sheet.leadInPrice || "$4,850"}
                </span>
                <span className="text-[9px] font-sans text-slate-400">per person (double sharing)</span>
              </div>

              <div className="bg-white border border-[#dfd7c3] rounded-lg p-3.5 flex flex-col justify-center">
                <span className="text-[9px] font-mono uppercase tracking-wider text-[#7c6a51]">Single Supplement</span>
                <span className="text-xl font-display font-light text-[#12151c] tracking-tight">
                  {sheet.singleSupplement || "+$1,120"}
                </span>
                <span className="text-[9px] font-sans text-slate-400">confidential single occupant fee</span>
              </div>

              <div className="bg-[#12151c] border border-[#12151c] text-white rounded-lg p-3.5 flex flex-col justify-center relative overflow-hidden">
                <div className="absolute right-0 bottom-0 pointer-events-none opacity-10">
                  <FileSpreadsheet className="w-16 h-16 text-white" />
                </div>
                <span className="text-[9px] font-mono uppercase tracking-wider text-[#a88854]">Global Rate Card</span>
                <span className="text-[11px] font-sans font-bold leading-tight mt-1 mb-1">
                  Rates on Request via Portal
                </span>
                <span className="text-[9px] font-mono text-white/50 leading-tight">
                  NET rate card / API sheets
                </span>
              </div>
            </div>

            <p className="text-[11px] font-sans text-[#64748b] leading-relaxed mb-4">
              {sheet.rateCardNote || "Confidential nett tariff. All group allotment releases, peak adjustments, and seasonal supplements are detailed under partner.albaways.com XML API desk."}
            </p>

            {/* Premium Upgrade Line */}
            {sheet.premiumUpgradeLine && (
              <div className="border border-[#ebdcb9] bg-[#fcf9ee] rounded-lg p-3.5 flex items-start gap-2.5">
                <Award className="w-4 h-4 text-[#a88854] shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-[#7c6a51] font-bold">Premium 5★ Ultra-Luxury Upgrade</span>
                  <p className="text-xs font-sans text-[#475569] leading-relaxed select-text mt-0.5">
                    {sheet.premiumUpgradeLine}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* WHY ALBA WAYS CREDENTIAL STRIP */}
          {sheet.whyAlbaWays && sheet.whyAlbaWays.length > 0 && (
            <div className="border-t border-[#f2eedf] pt-6 mb-8 page-break">
              <h4 className="text-[11px] font-mono tracking-widest text-[#a88854] uppercase font-bold mb-3.5">
                Why partner with alba ways? (Your Saudi Gatekeeper)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {sheet.whyAlbaWays.map((item, idx) => (
                  <div key={idx} className="flex gap-2 items-start bg-[#FAF9F5]/30 p-2.5 rounded-lg border border-[#f0e8dc]/60">
                    <span className="text-[#a88854] shrink-0 font-bold text-xs mt-0.5">★</span>
                    <p className="text-[11px] font-sans text-[#475569] leading-relaxed select-text">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FOOTER / TRUST BLOCK */}
          <div className="border-t border-[#12151c]/10 pt-6 mt-8 flex flex-col sm:flex-row justify-between gap-6 text-[#796e5d]">
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 font-display font-medium text-[#12151c] text-sm uppercase mb-1">
                <span>{sheet.logoText || "alba ways"}</span>
                <span className="text-[9px] font-sans lowercase text-slate-400 font-light border-l pl-1.5 border-slate-300">
                  direct inbound solutions
                </span>
              </div>
              <span className="text-[10px] font-mono leading-tight">
                {sheet.motLicense || "MoT License No. 71-002845"}
              </span>
              <span className="text-[9px] font-sans mt-1">
                {sheet.insurance || "Comprehensive general liability coverage by Lloyds, London."}
              </span>
            </div>

            <div className="flex flex-col sm:items-end text-left sm:text-right text-[10px] font-mono space-y-1">
              <div className="flex items-center sm:justify-end gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-[#a88854]" />
                <span>{sheet.contact || "Desk: partners@albaways.com"}</span>
              </div>
              <div className="flex items-center sm:justify-end gap-1.5 mt-0.5">
                <Globe className="w-3.5 h-3.5 text-[#a88854]" />
                <a
                  href={`https://${sheet.website || "partners.albaways.com"}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline font-extrabold text-[#1a1c22]"
                >
                  {sheet.website || "partners.albaways.com"}
                </a>
              </div>
              <p className="text-[8px] font-sans text-slate-400 mt-2">
                Document is confidential. Strictly for registered travel agencies, tour operators and trade professionals.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
