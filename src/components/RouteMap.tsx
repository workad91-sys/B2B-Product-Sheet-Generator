import React from "react";

interface RouteMapProps {
  cities: string[];
}

interface MapNode {
  name: string;
  x: number; // percentage
  y: number; // percentage
  labelOffset: { x: number; y: number };
}

// Preset mapping of well-known Saudi tourism coordinates
const SAUDI_CITY_COORDS: Record<string, MapNode> = {
  riyadh: { name: "Riyadh", x: 62, y: 53, labelOffset: { x: 10, y: -8 } },
  hail: { name: "Hail", x: 40, y: 32, labelOffset: { x: -8, y: -12 } },
  alula: { name: "AlUla", x: 22, y: 34, labelOffset: { x: -35, y: -10 } },
  jeddah: { name: "Jeddah", x: 24, y: 68, labelOffset: { x: -48, y: 5 } },
  medina: { name: "Madinah", x: 28, y: 50, labelOffset: { x: 12, y: 2 } },
  madinah: { name: "Madinah", x: 28, y: 50, labelOffset: { x: 12, y: 2 } },
  "red sea": { name: "Red Sea", x: 16, y: 58, labelOffset: { x: -55, y: -5 } },
  tabuk: { name: "Tabuk", x: 14, y: 18, labelOffset: { x: 12, y: -5 } },
  abha: { name: "Abha", x: 38, y: 85, labelOffset: { x: 12, y: 5 } },
  taif: { name: "Taif", x: 30, y: 70, labelOffset: { x: 12, y: -2 } },
  makkah: { name: "Makkah", x: 27, y: 65, labelOffset: { x: 12, y: -5 } },
  gizan: { name: "Gizan", x: 42, y: 92, labelOffset: { x: 12, y: 0 } },
  hofuf: { name: "Hofuf", x: 74, y: 51, labelOffset: { x: 12, y: 0 } },
  dammam: { name: "Dammam", x: 75, y: 44, labelOffset: { x: 12, y: -5 } },
  neom: { name: "NEOM", x: 10, y: 22, labelOffset: { x: 12, y: -10 } },
};

export default function RouteMap({ cities }: RouteMapProps) {
  // Translate the input cities array to nodes
  const activeNodes: MapNode[] = [];
  const processedCities = cities.map(c => c.trim().toLowerCase());

  processedCities.forEach((cityInput) => {
    // Try strict matching or partial matching
    const matchingKey = Object.keys(SAUDI_CITY_COORDS).find(
      (key) => cityInput.includes(key) || key.includes(cityInput)
    );

    if (matchingKey) {
      activeNodes.push(SAUDI_CITY_COORDS[matchingKey]);
    } else {
      // Generate a dynamic secure randomized spot if key is unknown, to avoid crashing
      const hash = cityInput.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
      activeNodes.push({
        name: cityInput.charAt(0).toUpperCase() + cityInput.slice(1),
        x: 30 + (hash % 40),
        y: 25 + ((hash * 7) % 50),
        labelOffset: { x: 10, y: 5 }
      });
    }
  });

  return (
    <div id="route-map-container" className="relative w-full aspect-[4/3] bg-[#f8f6f2] border border-[#e8dfcf] rounded-xl overflow-hidden p-4 select-none">
      {/* Subtle Sand Dunes Background Grid */}
      <div className="absolute inset-0 bg-radial from-transparent to-[#f2eedf]/35 pointer-events-none" />
      
      {/* Map Legend */}
      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs border border-[#e8dfcf] px-2.5 py-1.5 rounded text-[10px] font-sans tracking-wide text-[#705e45] uppercase shadow-xs">
        <span className="inline-block w-2 h-2 rounded-full bg-[#a88854] mr-1.5 animate-pulse" />
        Circuit Vectors
      </div>

      <svg
        id="saudi-svg-map"
        viewBox="0 0 400 300"
        className="w-full h-full text-[#ebe4d5] transition-all duration-300"
      >
        {/* Soft outline representation of Arabian Peninsula (Saudi Arabia silhouette) */}
        <path
          d="M 60 70 
             Q 130 50 200 40 
             Q 300 30 350 70 
             Q 380 90 385 130 
             Q 390 175 340 220 
             Q 330 250 290 270 
             Q 240 280 180 260 
             Q 145 285 130 250 
             Q 110 240 100 210 
             Q 75 190 85 160 
             Q 90 120 70 100 
             Z"
          fill="#fbfaf7"
          stroke="#eadeca"
          strokeWidth="2"
          className="transition-colors duration-300"
        />

        {/* Major Waterways (Red Sea and Persian Gulf curves just for regional orientation) */}
        <text x="50" y="160" fill="#ccbfab" fontSize="9" className="font-mono tracking-widest opacity-60 uppercase writing-mode-vertical" transform="rotate(-15, 55, 160)">
          Red Sea
        </text>
        <text x="310" y="120" fill="#ccbfab" fontSize="9" className="font-mono tracking-widest opacity-60 uppercase" transform="rotate(10, 310, 120)">
          Persian Gulf
        </text>

        {/* Route Lines connecting active items */}
        {activeNodes.length > 1 && (
          <g>
            {activeNodes.map((node, idx) => {
              if (idx === activeNodes.length - 1) return null;
              const nextNode = activeNodes[idx + 1];
              // Convert percentages to internal SVG viewBox dimensions (400 x 300)
              const x1 = (node.x / 100) * 400;
              const y1 = (node.y / 100) * 300;
              const x2 = (nextNode.x / 100) * 400;
              const y2 = (nextNode.y / 100) * 300;

              // Arc generator representing air transit / scenic overland drive
              const dx = x2 - x1;
              const dy = y2 - y1;
              const dr = Math.sqrt(dx * dx + dy * dy) * 1.2; // Curve depth

              return (
                <path
                  key={`line-${idx}`}
                  d={`M ${x1} ${y1} A ${dr} ${dr} 0 0 1 ${x2} ${y2}`}
                  fill="none"
                  stroke="#a88854"
                  strokeWidth="2.5"
                  strokeDasharray="4,4"
                  className="animate-[dash_20s_linear_infinite]"
                  opacity="0.8"
                />
              );
            })}
          </g>
        )}

        {/* Active Node Icons and Label Text */}
        {activeNodes.map((node, idx) => {
          const cx = (node.x / 100) * 400;
          const cy = (node.y / 100) * 300;
          const isStart = idx === 0;
          const isEnd = idx === activeNodes.length - 1;

          return (
            <g key={`node-${idx}-${node.name}`} className="group">
              {/* Pulsing Base Ring */}
              <circle
                cx={cx}
                cy={cy}
                r={isStart || isEnd ? "7" : "5"}
                fill={isStart ? "#705e45" : "#a88854"}
                opacity="0.2"
                className="animate-ping"
              />
              
              {/* Core Node Marker */}
              <circle
                cx={cx}
                cy={cy}
                r={isStart || isEnd ? "5" : "3.5"}
                fill={isStart ? "#12151c" : "#a88854"}
                stroke="#ffffff"
                strokeWidth="1.5"
                className="transition-transform group-hover:scale-125 duration-150 cursor-pointer"
              />

              {/* Number Badge or Spot */}
              <text
                x={cx + (isStart || isEnd ? 1.5 : 1)}
                y={cy - 6}
                fontSize="7"
                fontWeight="bold"
                fill="#705e45"
                className="font-mono text-[6px] opacity-75"
              >
                {idx + 1}
              </text>

              {/* Label */}
              <g transform={`translate(${cx + node.labelOffset.x}, ${cy + node.labelOffset.y})`}>
                <rect
                  px="2"
                  py="1"
                  fill="#ffffff"
                  fillOpacity="0.85"
                  stroke="#dfd2bd"
                  strokeWidth="0.5"
                  x="-2"
                  y="-10"
                  width={node.name.length * 6 + 4}
                  height="13"
                  rx="1.5"
                  className="shadow-3xs"
                />
                <text
                  x="0"
                  y="0"
                  fontSize="8"
                  fontWeight={isStart || isEnd ? "bold" : "600"}
                  fill={isStart || isEnd ? "#12151c" : "#705e45"}
                  className="font-sans font-medium select-none pointer-events-none"
                >
                  {node.name}
                </text>
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
