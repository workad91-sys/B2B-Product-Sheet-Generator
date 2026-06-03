import React, { useState, useEffect } from "react";

interface LoaderProps {
  message?: string;
}

const TOUR_CREATIVE_MESSAGES = [
  "Curating high-end bespoke logistics...",
  "Querying historic Nabataean details...",
  "Calibrating pristine Red Sea yacht matrices...",
  "Formatting inclusions for B2B compliance...",
  "Drafting premium hotel tier designations...",
  "Smoothing route geographic transitions...",
  "Fine-tuning luxury transport coordination...",
  "Structuring tariff rates and seasonal margins...",
];

export default function Loader({ message }: LoaderProps) {
  const [creativeText, setCreativeText] = useState(TOUR_CREATIVE_MESSAGES[0]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % TOUR_CREATIVE_MESSAGES.length;
      setCreativeText(TOUR_CREATIVE_MESSAGES[index]);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="loader-overlay" className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#12151c]/90 backdrop-blur-md p-6 text-center select-none animate-[fadeIn_0.3s_ease-out]">
      <div className="relative w-28 h-28 mb-8">
        {/* Elite circular golden orbital tracking */}
        <div className="absolute inset-0 rounded-full border-4 border-[#a88854]/10" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#a88854] animate-spin" />
        
        {/* Internal reverse orbital spinner */}
        <div className="absolute inset-4 rounded-full border-2 border-transparent border-b-[#e8dfcf] animate-[spin_2s_linear_infinite_reverse]" />

        {/* Small gold center pulse */}
        <div className="absolute inset-10 rounded-full bg-[#a88854] animate-pulse opacity-85 flex items-center justify-center">
          <span className="text-[9px] font-mono tracking-wider text-[#12151c] font-black uppercase">AW</span>
        </div>
      </div>

      <h3 className="text-xl font-display text-white tracking-wide font-medium mb-2 animate-pulse">
        {message || "Generating Product Sheet via AI"}
      </h3>
      
      <p className="text-xs font-mono text-[#a88854] tracking-widest max-w-xs uppercase transition-all duration-300">
        {creativeText}
      </p>

      {/* Decorative branding info */}
      <div className="absolute bottom-8 text-[10px] font-sans tracking-widest text-[#705e45] uppercase">
        Alba Ways Inbound Solutions · B2B Intelligence
      </div>
    </div>
  );
}
