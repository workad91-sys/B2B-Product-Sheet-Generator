import React, { useState } from "react";
import { ProductSheet, ItineraryDay } from "../types";
import { TEMPLATES } from "../templates";
import {
  FileText,
  Clock,
  MapPin,
  Utensils,
  Plus,
  Trash2,
  Copy,
  Sparkles,
  RefreshCw,
  Library,
  Settings,
  ListPlus,
  CheckSquare,
  HelpCircle,
  Globe
} from "lucide-react";

interface SidebarEditorProps {
  sheet: ProductSheet;
  onChange: (updatedSheet: ProductSheet) => void;
  onGenerateWithAI: (prompt: string) => void;
  onTranslateWithAI: (targetLanguage: string) => void;
  isGenerating: boolean;
  isPolishing: boolean;
  isTranslating: boolean;
}

type ActiveTab = "presets" | "core" | "itinerary" | "inc_exc" | "ai";

export default function SidebarEditor({
  sheet,
  onChange,
  onGenerateWithAI,
  onTranslateWithAI,
  isGenerating,
  isPolishing,
  isTranslating
}: SidebarEditorProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>("presets");
  const [aiPrompt, setAiPrompt] = useState("");
  const [newInclusion, setNewInclusion] = useState("");
  const [newExclusion, setNewExclusion] = useState("");

  const updateField = (field: keyof ProductSheet, value: any) => {
    onChange({ ...sheet, [field]: value });
  };

  const updateItineraryDay = (index: number, updatedDay: ItineraryDay) => {
    const updatedItinerary = [...(sheet.itinerary || [])];
    updatedItinerary[index] = updatedDay;
    onChange({ ...sheet, itinerary: updatedItinerary });
  };

  const addItineraryDay = () => {
    const currentNum = sheet.itinerary ? sheet.itinerary.length : 0;
    const newDay: ItineraryDay = {
      day: currentNum + 1,
      route: "New Saudi Coordinate Destination",
      highlights: "Highlights of specialized off-road tracks, guided ancient walks, or exclusive sea transitions.",
      overnight: "Premium boutique or luxury hotel",
      meals: "Breakfast"
    };
    onChange({ ...sheet, itinerary: [...(sheet.itinerary || []), newDay] });
  };

  const deleteItineraryDay = (index: number) => {
    const filtered = (sheet.itinerary || []).filter((_, i) => i !== index);
    const reindexed = filtered.map((d, i) => ({ ...d, day: i + 1 }));
    onChange({ ...sheet, itinerary: reindexed });
  };

  const duplicateItineraryDay = (index: number) => {
    const current = (sheet.itinerary || [])[index];
    const duplicated: ItineraryDay = {
      ...current,
      day: current.day + 1
    };
    const modifiedItinerary = [...(sheet.itinerary || [])];
    modifiedItinerary.splice(index + 1, 0, duplicated);
    
    // Reindex subsequent days
    const reindexed = modifiedItinerary.map((d, i) => ({ ...d, day: i + 1 }));
    onChange({ ...sheet, itinerary: reindexed });
  };

  const addInclusion = () => {
    if (!newInclusion.trim()) return;
    onChange({
      ...sheet,
      inclusions: [...(sheet.inclusions || []), newInclusion.trim()]
    });
    setNewInclusion("");
  };

  const removeInclusion = (index: number) => {
    onChange({
      ...sheet,
      inclusions: (sheet.inclusions || []).filter((_, i) => i !== index)
    });
  };

  const addExclusion = () => {
    if (!newExclusion.trim()) return;
    onChange({
      ...sheet,
      exclusions: [...(sheet.exclusions || []), newExclusion.trim()]
    });
    setNewExclusion("");
  };

  const removeExclusion = (index: number) => {
    onChange({
      ...sheet,
      exclusions: (sheet.exclusions || []).filter((_, i) => i !== index)
    });
  };

  // Preset predefined inclusions quickly
  const injectGenericInclusions = () => {
    const defaults = [
      "Signature private catamaran Red Sea cruise including gourmet marine lunch",
      "Extended desert dune crossing on fully modified Land Cruisers with safety spotters",
      "Exclusive evening archaeological pass in Hegra with licensed national reserve guides"
    ];
    onChange({
      ...sheet,
      inclusions: Array.from(new Set([...(sheet.inclusions || []), ...defaults]))
    });
  };

  return (
    <div className="w-full h-full flex flex-col bg-white border-r border-[#e8dfcf] overflow-hidden select-none">
      
      {/* Brand Header */}
      <div className="p-4 bg-[#12151c] text-white flex items-center justify-between border-b border-[#a88854]/30 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#a88854] flex items-center justify-center font-display font-semibold text-xs text-[#12151c]">
            AW
          </div>
          <div>
            <h1 className="text-sm font-sans font-extrabold tracking-wide uppercase">Alba Ways</h1>
            <p className="text-[10px] font-mono text-[#a88854] uppercase tracking-widest">B2B Product Studio</p>
          </div>
        </div>
        <span className="text-[9px] font-mono text-gray-400 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded uppercase">
          v1.4 Internal
        </span>
      </div>

      {/* Editor Main Tabs */}
      <div className="flex bg-[#fbfbf8] border-b border-[#ebdcb9] text-xs shrink-0 font-sans divide-x divide-[#ebdcb9]">
        <button
          onClick={() => setActiveTab("presets")}
          className={`flex-1 py-3 text-center font-medium transition-all cursor-pointer ${
            activeTab === "presets"
              ? "bg-white text-[#a88854] border-b-2 border-b-[#a88854] font-black"
              : "text-gray-500 hover:text-black hover:bg-gray-50"
          }`}
        >
          📁 Presets
        </button>
        <button
          onClick={() => setActiveTab("core")}
          className={`cursor-pointer flex-1 py-3 text-center font-medium transition-all ${
            activeTab === "core"
              ? "bg-white text-[#a88854] border-b-2 border-b-[#a88854] font-black"
              : "text-gray-500 hover:text-black hover:bg-gray-50"
          }`}
        >
          ✍️ Identity
        </button>
        <button
          onClick={() => setActiveTab("itinerary")}
          className={`cursor-pointer flex-1 py-3 text-center font-medium transition-all ${
            activeTab === "itinerary"
              ? "bg-white text-[#a88854] border-b-2 border-b-[#a88854] font-black"
              : "text-gray-500 hover:text-black hover:bg-gray-50"
          }`}
        >
          🚗 Daily
        </button>
        <button
          onClick={() => setActiveTab("inc_exc")}
          className={`cursor-pointer flex-1 py-3 text-center font-medium transition-all ${
            activeTab === "inc_exc"
              ? "bg-white text-[#a88854] border-b-2 border-b-[#a88854] font-black"
              : "text-gray-500 hover:text-black hover:bg-gray-50"
          }`}
        >
          ✅ Ticks
        </button>
        <button
          onClick={() => setActiveTab("ai")}
          className={`cursor-pointer flex-1 py-3 text-center font-medium text-emerald-600 transition-all ${
            activeTab === "ai"
              ? "bg-emerald-50 text-emerald-700 border-b-2 border-b-emerald-600 font-bold"
              : "text-gray-500 hover:text-emerald-700 hover:bg-emerald-50/20"
          }`}
        >
          🤖 AI Co-Pilot
        </button>
      </div>

      {/* Editor Content Area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5 font-sans leading-relaxed text-sm text-[#334155]">
        
        {/* TAB 1: PRESETS */}
        {activeTab === "presets" && (
          <div className="space-y-4 animate-[fadeIn_0.15s_ease-out]">
            <div className="bg-[#FAF9F5] p-3.5 border border-[#dfd7c3] rounded-lg">
              <h3 className="text-xs font-mono tracking-widest text-[#705e45] uppercase font-bold mb-1 flex items-center gap-1">
                <Library className="w-3.5 h-3.5" /> Built-In Circuit Catalogues
              </h3>
              <p className="text-[11px] font-sans text-[#796e5d]">
                Instantly load native, pre-packaged Saudi routes aligned with the premium Alba Ways inbound portfolio.
              </p>
            </div>

            <div className="space-y-2.5">
              {TEMPLATES.map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => onChange(tpl)}
                  className={`cursor-pointer w-full text-left p-3 border rounded-xl transition-all ${
                    sheet.productCode === tpl.productCode
                      ? "border-[#a88854] bg-[#fbf9ec] shadow-xs"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50/50"
                  }`}
                >
                  <div className="flex justify-between items-start mb-0.5">
                    <span className="text-xs font-mono font-black text-[#a88854] tracking-wide uppercase">
                      {tpl.productCode}
                    </span>
                    <span className="text-[10px] font-mono text-gray-400 bg-white px-1.5 py-0.5 border border-gray-200 rounded">
                      {tpl.duration}
                    </span>
                  </div>
                  <h4 className="text-xs font-extrabold text-[#12151c] mb-1 leading-tight">{tpl.circuitName}</h4>
                  <p className="text-[10px] text-gray-500 line-clamp-2 leading-relaxed">
                    {tpl.tagline}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: IDENTITY FIELDS */}
        {activeTab === "core" && (
          <div className="space-y-4 animate-[fadeIn_0.15s_ease-out]">
            <h3 className="text-xs font-mono tracking-widest text-[#705e45] uppercase font-bold">Primary Catalog Identity</h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-mono uppercase tracking-wide text-gray-500 block mb-1">Product Code</label>
                <input
                  type="text"
                  value={sheet.productCode || ""}
                  onChange={(e) => updateField("productCode", e.target.value)}
                  className="w-full text-xs border border-gray-200 rounded px-2.5 py-1.5 focus:border-[#a88854] focus:ring-1 focus:ring-[#a88854]"
                />
              </div>
              <div>
                <label className="text-[10px] font-mono uppercase tracking-wide text-gray-500 block mb-1">Duration Tag</label>
                <input
                  type="text"
                  value={sheet.duration || ""}
                  onChange={(e) => updateField("duration", e.target.value)}
                  className="w-full text-xs border border-gray-200 rounded px-2.5 py-1.5 focus:border-[#a88854]"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-mono uppercase tracking-wide text-gray-500 block mb-1">Tour Circuit Name</label>
              <input
                type="text"
                value={sheet.circuitName || ""}
                onChange={(e) => updateField("circuitName", e.target.value)}
                className="w-full text-xs border border-gray-200 rounded px-2.5 py-1.5 focus:border-[#a88854]"
              />
            </div>

            <div>
              <label className="text-[10px] font-mono uppercase tracking-wide text-gray-500 block mb-1">One-Line Tagline / Hook</label>
              <textarea
                rows={2}
                value={sheet.tagline || ""}
                onChange={(e) => updateField("tagline", e.target.value)}
                className="w-full text-xs border border-gray-200 rounded px-2.5 py-1.5 focus:border-[#a88854]"
              />
            </div>

            <div>
              <label className="text-[10px] font-mono uppercase tracking-wide text-gray-500 block mb-1">Hero Photo URL</label>
              <input
                type="text"
                value={sheet.heroImage || ""}
                onChange={(e) => updateField("heroImage", e.target.value)}
                className="w-full text-xs border border-gray-200 rounded px-2.5 py-1.5 focus:border-[#a88854] font-mono text-[10px]"
              />
            </div>

            <div className="border-t border-dashed border-gray-100 pt-4 space-y-4">
              <h3 className="text-xs font-mono tracking-widest text-[#705e45] uppercase font-bold">Quick Reference Box Parameters</h3>

              <div>
                <label className="text-[10px] font-mono uppercase tracking-wide text-gray-500 block mb-1">Route (Comma separated)</label>
                <input
                  type="text"
                  value={(sheet.routeList || []).join(", ")}
                  onChange={(e) => updateField("routeList", e.target.value.split(",").map(s => s.trim()))}
                  className="w-full text-xs border border-gray-200 rounded px-2.5 py-1.5 focus:border-[#a88854]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wide text-gray-500 block mb-1">Hotel Tier</label>
                  <input
                    type="text"
                    value={sheet.hotelTier || ""}
                    onChange={(e) => updateField("hotelTier", e.target.value)}
                    className="w-full text-xs border border-gray-200 rounded px-2.5 py-1.5 focus:border-[#a88854]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wide text-gray-500 block mb-1">Format / Capacity</label>
                  <input
                    type="text"
                    value={sheet.format || ""}
                    onChange={(e) => updateField("format", e.target.value)}
                    className="w-full text-xs border border-gray-200 rounded px-2.5 py-1.5 focus:border-[#a88854]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wide text-gray-500 block mb-1">Best Season</label>
                  <input
                    type="text"
                    value={sheet.bestSeason || ""}
                    onChange={(e) => updateField("bestSeason", e.target.value)}
                    className="w-full text-xs border border-gray-200 rounded px-2.5 py-1.5 focus:border-[#a88854]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wide text-gray-500 block mb-1">Physical Level</label>
                  <input
                    type="text"
                    value={sheet.physicalLevel || ""}
                    onChange={(e) => updateField("physicalLevel", e.target.value)}
                    className="w-full text-xs border border-gray-200 rounded px-2.5 py-1.5 focus:border-[#a88854]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wide text-gray-500 block mb-1">Departure City</label>
                  <input
                    type="text"
                    value={sheet.departureCity || ""}
                    onChange={(e) => updateField("departureCity", e.target.value)}
                    className="w-full text-xs border border-gray-200 rounded px-2.5 py-1.5 focus:border-[#a88854]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wide text-gray-500 block mb-1">Guide Languages (Comma separated)</label>
                  <input
                    type="text"
                    value={(sheet.languages || []).join(", ")}
                    onChange={(e) => updateField("languages", e.target.value.split(",").map(l => l.trim()))}
                    className="w-full text-xs border border-gray-200 rounded px-2.5 py-1.5 focus:border-[#a88854]"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-dashed border-gray-100 pt-4 space-y-4">
              <h3 className="text-xs font-mono tracking-widest text-[#705e45] uppercase font-bold">Lead Pricing Rates</h3>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wide text-gray-500 block mb-1">Lead-In Price Per Pax</label>
                  <input
                    type="text"
                    value={sheet.leadInPrice || ""}
                    onChange={(e) => updateField("leadInPrice", e.target.value)}
                    className="w-full text-xs border border-gray-200 rounded px-2.5 py-1.5 focus:border-[#a88854]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wide text-gray-500 block mb-1">Single Supplement</label>
                  <input
                    type="text"
                    value={sheet.singleSupplement || ""}
                    onChange={(e) => updateField("singleSupplement", e.target.value)}
                    className="w-full text-xs border border-gray-200 rounded px-2.5 py-1.5 focus:border-[#a88854]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase tracking-wide text-gray-500 block mb-1">Premium 5★ Luxury Upgrade Line</label>
                <textarea
                  rows={2}
                  value={sheet.premiumUpgradeLine || ""}
                  onChange={(e) => updateField("premiumUpgradeLine", e.target.value)}
                  className="w-full text-xs border border-gray-200 rounded px-2.5 py-1.5 focus:border-[#a88854]"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase tracking-wide text-gray-500 block mb-1">Agent Tariff Card Note</label>
                <textarea
                  rows={2}
                  value={sheet.rateCardNote || ""}
                  onChange={(e) => updateField("rateCardNote", e.target.value)}
                  className="w-full text-xs border border-gray-200 rounded px-2.5 py-1.5 focus:border-[#a88854]"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DAILY ITINERARY */}
        {activeTab === "itinerary" && (
          <div className="space-y-4 animate-[fadeIn_0.15s_ease-out]">
            <div className="flex justify-between items-center bg-[#FAF9F5] p-3 border border-gray-200 rounded-lg">
              <div>
                <span className="text-xs font-sans font-extrabold text-[#111]">Daily Program</span>
                <p className="text-[10px] text-gray-500">{sheet.itinerary?.length || 0} stages scheduled</p>
              </div>
              <button
                onClick={addItineraryDay}
                className="cursor-pointer inline-flex items-center gap-1 bg-[#12151c] hover:bg-black text-white px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-wider"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Day
              </button>
            </div>

            <div className="space-y-3.5">
              {sheet.itinerary && sheet.itinerary.map((dayItem, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-3 bg-white space-y-2.5 text-xs hover:border-[#dfd7c3] relative">
                  
                  {/* Row actions */}
                  <div className="absolute right-2 top-2 flex items-center gap-1.5">
                    <button
                      onClick={() => duplicateItineraryDay(idx)}
                      className="cursor-pointer p-1 text-gray-400 hover:text-[#a88854] hover:bg-[#FAF9F5] rounded"
                      title="Clone this day"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteItineraryDay(idx)}
                      className="cursor-pointer p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded"
                      title="Delete this day"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[9px] bg-[#fbf9ec] border border-[#ebdcb9] text-[#705e45] px-1.5 py-0.5 rounded uppercase font-bold">
                      Day {dayItem.day}
                    </span>
                  </div>

                  <div>
                    <label className="text-[9px] font-mono uppercase tracking-wide text-gray-400 block mb-0.5">Stage Route / Title</label>
                    <input
                      type="text"
                      value={dayItem.route || ""}
                      onChange={(e) => updateItineraryDay(idx, { ...dayItem, route: e.target.value })}
                      className="w-full border border-gray-200 rounded px-2 py-1 text-xs focus:border-[#a88854]"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] font-mono uppercase tracking-wide text-gray-400 block mb-0.5">Highlights Highlights Description</label>
                    <textarea
                      rows={2.5}
                      value={dayItem.highlights || ""}
                      onChange={(e) => updateItineraryDay(idx, { ...dayItem, highlights: e.target.value })}
                      className="w-full border border-gray-200 rounded px-2 py-1 text-xs focus:border-[#a88854]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[9px] font-mono uppercase tracking-wide text-gray-400 block mb-0.5">Overnight Stay</label>
                      <input
                        type="text"
                        value={dayItem.overnight || ""}
                        onChange={(e) => updateItineraryDay(idx, { ...dayItem, overnight: e.target.value })}
                        className="w-full border border-gray-200 rounded px-2 py-1 text-xs focus:border-[#a88854]"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] font-mono uppercase tracking-wide text-gray-400 block mb-0.5">Meals (e.g. Breakfast, Dinner)</label>
                      <input
                        type="text"
                        value={dayItem.meals || ""}
                        onChange={(e) => updateItineraryDay(idx, { ...dayItem, meals: e.target.value })}
                        className="w-full border border-gray-200 rounded px-2 py-1 text-xs focus:border-[#a88854]"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: INCLUSIONS & EXCLUSIONS */}
        {activeTab === "inc_exc" && (
          <div className="space-y-5 animate-[fadeIn_0.15s_ease-out]">
            
            {/* INCLUSIONS BOX */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-mono tracking-wide text-emerald-700 uppercase font-bold">Standard Inclusions</h3>
                <button
                  onClick={injectGenericInclusions}
                  className="cursor-pointer text-[9px] font-mono text-emerald-600 hover:underline flex items-center gap-1 uppercase"
                >
                  <ListPlus className="w-3 h-3" /> Insert Signature Ticks
                </button>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="New B2B inclusion detail..."
                  value={newInclusion}
                  onChange={(e) => setNewInclusion(e.target.value)}
                  className="flex-1 text-xs border border-gray-200 rounded px-2.5 py-1.5 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                  onKeyDown={(e) => e.key === "Enter" && addInclusion()}
                />
                <button
                  onClick={addInclusion}
                  className="cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="border border-gray-100 rounded-lg p-2 bg-[#FAFBF9] space-y-1.5 max-h-56 overflow-y-auto">
                {sheet.inclusions && sheet.inclusions.map((inc, i) => (
                  <div key={i} className="flex justify-between items-start gap-2 bg-white border border-gray-200/50 p-2 rounded text-xs leading-tight">
                    <span className="flex-1 select-text">{inc}</span>
                    <button
                      onClick={() => removeInclusion(i)}
                      className="cursor-pointer text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* EXCLUSIONS BOX */}
            <div className="space-y-3 pt-3 border-t border-dashed border-gray-200">
              <h3 className="text-xs font-mono tracking-wide text-orange-800 uppercase font-bold">Standard Exclusions</h3>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Excluded details..."
                  value={newExclusion}
                  onChange={(e) => setNewExclusion(e.target.value)}
                  className="flex-1 text-xs border border-gray-200 rounded px-2.5 py-1.5 focus:border-orange-600 focus:ring-1 focus:ring-orange-600"
                  onKeyDown={(e) => e.key === "Enter" && addExclusion()}
                />
                <button
                  onClick={addExclusion}
                  className="cursor-pointer bg-orange-600 hover:bg-orange-700 text-white p-2 rounded"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="border border-gray-100 rounded-lg p-2 bg-[#FCFAF5]/60 space-y-1.5 max-h-56 overflow-y-auto">
                {sheet.exclusions && sheet.exclusions.map((exc, i) => (
                  <div key={i} className="flex justify-between items-start gap-2 bg-white border border-gray-100 p-2 rounded text-xs leading-tight">
                    <span className="flex-1 select-text">{exc}</span>
                    <button
                      onClick={() => removeExclusion(i)}
                      className="cursor-pointer text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: AI ACTIONS */}
        {activeTab === "ai" && (
          <div className="space-y-5 animate-[fadeIn_0.15s_ease-out]">
            
            {/* AI Generator prompt panel */}
            <div className="border border-emerald-100 rounded-lg p-4 bg-emerald-50/20 space-y-3.5">
              <div className="flex items-center gap-1.5 text-emerald-800">
                <Sparkles className="w-4.5 h-4.5" />
                <h3 className="font-sans font-extrabold text-xs uppercase tracking-wide">AI Generation Suite</h3>
              </div>
              
              <p className="text-[11px] text-emerald-900/80 leading-relaxed">
                Describe any premium tour ideas below (e.g. "8 Days cultural Taif trip with high-altitude hiking, rose water workshops, and direct VIP hotel transfers") and let Gemini compose a pristine product sheet.
              </p>

              <div>
                <textarea
                  rows={4}
                  placeholder="Enter bespoke thematic concept or custom requirements..."
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  className="w-full text-xs border border-gray-200 bg-white rounded p-2.5 focus:border-emerald-600"
                />
              </div>

              <button
                onClick={() => {
                  if (aiPrompt.trim()) onGenerateWithAI(aiPrompt.trim());
                }}
                disabled={isGenerating || !aiPrompt.trim()}
                className="cursor-pointer w-full inline-flex justify-center items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold font-sans py-2.5 px-4 rounded-lg tracking-wide transition-all uppercase disabled:opacity-50"
              >
                {isGenerating ? "Baking tour details..." : "Conceive Package via AI"}
              </button>
            </div>

            {/* Translation helper */}
            <div className="border border-blue-100 rounded-lg p-4 bg-blue-50/20 space-y-3.5">
              <div className="flex items-center gap-1.5 text-blue-800">
                <Globe className="w-4.5 h-4.5" />
                <h3 className="font-sans font-extrabold text-xs uppercase tracking-wide">Multi-Lingual Translation</h3>
              </div>

              <p className="text-[11px] text-blue-900/80 leading-relaxed">
                Alba Ways caters directly to elite Spanish, Italian and Arabic trade representatives. Translate the entire sheet seamlessly.
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => onTranslateWithAI("Spanish")}
                  disabled={isTranslating}
                  className="cursor-pointer p-2 bg-white hover:bg-[#f3f7fc] border border-[#a0c3ff]/30 text-[#1e40af] rounded-lg font-bold font-sans flex items-center justify-center gap-1 transition-all"
                >
                  🇪🇸 Spanish / Español
                </button>
                <button
                  onClick={() => onTranslateWithAI("Italian")}
                  disabled={isTranslating}
                  className="cursor-pointer p-2 bg-white hover:bg-[#f3f7fc] border border-[#a0c3ff]/30 text-[#1e40af] rounded-lg font-bold font-sans flex items-center justify-center gap-1 transition-all"
                >
                  🇮🇹 Italian / Italiano
                </button>
                <button
                  onClick={() => onTranslateWithAI("Arabic")}
                  disabled={isTranslating}
                  className="cursor-pointer p-2 bg-white hover:bg-[#f3f7fc] border border-[#a0c3ff]/30 text-[#1e40af] rounded-lg font-bold font-sans flex items-center justify-center gap-1 transition-all col-span-2 text-center"
                >
                  🇸🇦 Saudi Arabic / العربية
                </button>
              </div>
            </div>

            {/* Quick professionalize explanation */}
            <div className="p-3.5 bg-[#FAF9F5] border border-[#dfd7c3] rounded-lg text-[11px] text-[#705e45] leading-relaxed">
              <h4 className="font-black uppercase mb-1 flex items-center gap-1"><Sparkles className="w-3.5 h-3.5" /> Tone Orchestration Tips</h4>
              <span>You can hover on the tagline, positioning block, or daily description blocks inside the sheet preview area, and press standard <b>Polish</b> buttons to automatically optimize descriptions via Gemini.</span>
            </div>
          </div>
        )}
      </div>

      {/* Trust Signatures */}
      <div className="no-print p-4 bg-[#fcfaf7] border-t border-[#dfd2be] text-[10px] text-gray-500 font-sans tracking-wide leading-tight flex justify-between shrink-0 select-none">
        <span>Licence Operator #71-002845</span>
        <span className="font-bold underline text-[#a88854]">partners.albaways.com</span>
      </div>
    </div>
  );
}
