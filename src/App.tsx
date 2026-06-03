/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { ProductSheet } from "./types";
import { TEMPLATES } from "./templates";
import SidebarEditor from "./components/SidebarEditor";
import BrokerPreview from "./components/BrokerPreview";
import Loader from "./components/Loader";
import { Sparkles, AlertTriangle, CheckCircle, Menu, Eye, Edit3 } from "lucide-react";

export default function App() {
  const [sheet, setSheet] = useState<ProductSheet>(TEMPLATES[0]); // Starts with AW-HERA-11 (heritage/coastal sample)
  const [statusNotification, setStatusNotification] = useState<{
    type: "info" | "success" | "warning";
    message: string;
  } | null>({
    type: "info",
    message: "Pre-loaded Heritage & Coastal (AW-HERA-11) template. Use sidebar controls to edit program."
  });

  // Flow states
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPolishing, setIsPolishing] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);

  // Mobile layout toggling
  const [mobileMode, setMobileMode] = useState<"edit" | "preview">("preview");

  const showNotification = (message: string, type: "info" | "success" | "warning" = "info", duration = 5000) => {
    setStatusNotification({ type, message });
    setTimeout(() => {
      setStatusNotification((prev) => (prev?.message === message ? null : prev));
    }, duration);
  };

  // AI Endpoint Handlers
  const handleGenerateWithAI = async (prompt: string) => {
    setIsGenerating(true);
    showNotification("Contacting AI specialist to outline your tour program...", "info");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(`Failed to consult AI generator (${response.status})`);
      }

      const data = await response.json();
      if (data.success && data.data) {
        setSheet({
          ...data.data,
          id: `aw-ai-${Date.now()}`
        });
        showNotification(
          data.isDemo 
            ? "Simulated AI Generation complete (Running in Sandbox demo mode)." 
            : "Successfully constructed luxury circuit program via Gemini!", 
          "success"
        );
      } else if (data.isDemo && data.data) {
        // Fallback sandboxed response
        setSheet({
          ...data.data,
          id: `aw-ai-${Date.now()}`
        });
        showNotification("Offline Sandbox template active. (Ensure GEMINI_API_KEY is configured in Settings).", "warning", 8000);
      } else {
        throw new Error(data.error || "Response formats mismatch");
      }
    } catch (err: any) {
      console.error(err);
      showNotification(`Generation error: ${err.message || "Failed to reach backend compiler."}`, "warning", 8000);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleTranslateWithAI = async (targetLanguage: string) => {
    setIsTranslating(true);
    showNotification(`Translating full catalogue into professional B2B ${targetLanguage}...`, "info", 6000);

    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sheet, targetLanguage }),
      });

      if (!response.ok) {
        throw new Error(`Failed to transmit sheet translation (${response.status})`);
      }

      const data = await response.json();
      if (data.success && data.data) {
        setSheet(data.data);
        showNotification(`Successfully translated sheet into fluent, B2B-compliant ${targetLanguage}!`, "success");
      } else if (data.isDemo && data.sheet) {
        setSheet(data.sheet);
        showNotification(`Dynamic sandbox translation simulated. Connect GEMINI_API_KEY in secrets to translate correctly.`, "warning", 8000);
      } else {
        throw new Error(data.error || "Unknown server response");
      }
    } catch (err: any) {
      console.error(err);
      showNotification(`Translation error: ${err.message || "Server error while translating."}`, "warning", 7000);
    } finally {
      setIsTranslating(false);
    }
  };

  const handlePolishField = async (fieldName: string, currentText: string) => {
    setIsPolishing(true);
    showNotification("Polishing description text into an evocative luxury prose voice...", "info");

    try {
      const response = await fetch("/api/polish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: currentText, fieldName }),
      });

      if (!response.ok) {
        throw new Error(`Failed to polish block text (${response.status})`);
      }

      const data = await response.json();
      if (data.success && data.text) {
        // Check if we are polishing an itinerary day or a core level field
        if (fieldName.startsWith("itinerary-")) {
          // Syntax: itinerary-INDEX-highlights
          const parts = fieldName.split("-");
          const idx = parseInt(parts[1], 10);
          const itineraryCopy = [...(sheet.itinerary || [])];
          if (itineraryCopy[idx]) {
            itineraryCopy[idx].highlights = data.text;
            setSheet({ ...sheet, itinerary: itineraryCopy });
          }
        } else {
          setSheet({ ...sheet, [fieldName]: data.text });
        }
        showNotification("Evocative luxury description successfully polished!", "success");
      } else {
        throw new Error(data.error || "Formatting error");
      }
    } catch (err: any) {
      console.error(err);
      showNotification(`Polishing error: ${err.message || "Failed to reach polishing engines."}`, "warning", 5000);
    } finally {
      setIsPolishing(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#FAF9F5] select-none text-slate-800 antialiased font-sans">
      
      {/* Top Notification Toast Channel (No Print) */}
      {statusNotification && (
        <div className="no-print bg-[#1a1e24] text-white border-b border-[#a88854]/40 px-6 py-2.5 flex items-center justify-between z-40 relative gap-4 transition-all duration-300">
          <div className="flex items-center gap-2 text-xs font-medium tracking-wide">
            {statusNotification.type === "success" ? (
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : statusNotification.type === "warning" ? (
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            ) : (
              <Sparkles className="w-4 h-4 text-[#a88854] shrink-0 animate-pulse" />
            )}
            <span className="leading-relaxed select-text">{statusNotification.message}</span>
          </div>
          <button
            onClick={() => setStatusNotification(null)}
            className="cursor-pointer text-[10px] uppercase font-mono tracking-widest text-[#a88854] hover:text-white"
          >
            dimiss
          </button>
        </div>
      )}

      {/* Main Container Wrapper */}
      <div className="flex-1 flex flex-col md:flex-row relative">
        
        {/* Mobile View Toggle Rail (No Print) */}
        <div className="no-print md:hidden bg-white border-b border-[#dfd7c3] px-4 py-2.5 flex justify-between items-center shrink-0 shadow-xs">
          <div className="flex items-center gap-1.5">
            <span className="font-display font-black text-xs uppercase text-slate-900 tracking-wider"> Alba Ways Sheet Studio </span>
          </div>
          <div className="flex items-center bg-gray-100 rounded-lg p-1.5 gap-1">
            <button
              onClick={() => setMobileMode("edit")}
              className={`cursor-pointer inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-bold font-sans transition-all ${
                mobileMode === "edit"
                  ? "bg-[#12151c] text-white"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              Customizer Panel
            </button>
            <button
              onClick={() => setMobileMode("preview")}
              className={`cursor-pointer inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-bold font-sans transition-all ${
                mobileMode === "preview"
                  ? "bg-[#a88854] text-white"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              B2B Preview
            </button>
          </div>
        </div>

        {/* LEFT COMPONENT: CONTROL DESK (Editor Panel) */}
        <div className={`no-print w-full md:w-[380px] lg:w-[410px] shrink-0 border-r border-[#ebdcb9] ${
          mobileMode === "edit" ? "block" : "hidden md:block"
        }`}>
          <SidebarEditor
            sheet={sheet}
            onChange={setSheet}
            onGenerateWithAI={handleGenerateWithAI}
            onTranslateWithAI={handleTranslateWithAI}
            isGenerating={isGenerating}
            isPolishing={isPolishing}
            isTranslating={isTranslating}
          />
        </div>

        {/* RIGHT COMPONENT: LIVE SHEET PREVIEW (Brochure Viewer / Print Canvas) */}
        <div className={`flex-1 min-w-0 ${
          mobileMode === "preview" ? "block" : "hidden md:block"
        }`}>
          <BrokerPreview
            sheet={sheet}
            onPolishField={handlePolishField}
            isPolishing={isPolishing}
          />
        </div>
      </div>

      {/* Global AI Loading Screen Overlay */}
      {(isGenerating || isTranslating) && (
        <Loader
          message={
            isGenerating 
              ? "Baking Custom Saudi Package via AI..." 
              : "Translating Full Brochure Catalog..."
          }
        />
      )}
    </div>
  );
}

