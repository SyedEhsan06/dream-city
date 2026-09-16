"use client";

import React, { memo } from "react";

export const HARIT_TYPE_FILL: Record<string, string> = {
  B: "#F9A8B8",
  BR: "#FBBF24",
  C: "#D8B4FE",
  CR: "#A78BFA",
  D: "#38BDF8",
  DR: "#0EA5E9",
  AR: "#EF4444",
};

export const HARIT_TYPE_TEXT: Record<string, string> = {
  B: "#FFFFFF",
  BR: "#FFFFFF",
  C: "#FFFFFF",
  CR: "#FFFFFF",
  D: "#FFFFFF",
  DR: "#FFFFFF",
  AR: "#FFFFFF",
};

export const HARIT_TYPE_SQFT: Record<string, number> = {
  AR: 3600,
  B: 2700,
  BR: 2700,
  C: 1800,
  CR: 1800,
  D: 1200,
  DR: 1200,
};

export type HaritHotspot = {
  plotNumber: string;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

const range = (from: number, to: number) => {
  const step = from <= to ? 1 : -1;
  return Array.from(
    { length: Math.abs(to - from) + 1 },
    (_, index) => from + index * step,
  );
};

/** Coordinates match the supplied 1060×1360 Harit Vihar artwork. */
const makeHaritBlock = (
  prefix: string,
  left: number[],
  right: number[],
  x: number,
  y: number,
  cellWidth: number,
  rowHeight: number,
  gap = 3,
): HaritHotspot[] => {
  const rows = Math.max(left.length, right.length);
  return Array.from({ length: rows }).flatMap((_, row) => {
    const top = y + row * rowHeight;
    return [left[row], right[row]].flatMap((number, column) =>
      number === undefined
        ? []
        : [
            {
              plotNumber: `${prefix}${number}`,
              type: prefix.replace("-", ""),
              x: x + column * (cellWidth + gap),
              y: top,
              width: cellWidth + 2,
              height: rowHeight - 0.5,
            },
          ],
    );
  });
};

export const HARIT_HOTSPOTS: HaritHotspot[] = [
  // SECTION 1: Upper Residential Blocks (y: 20 to 284, Height = 264)
  // B Blocks (10 rows -> rowHeight = 26.4)
  ...makeHaritBlock("B-", range(120, 111), range(121, 130), 42, 20, 43, 26.4),
  ...makeHaritBlock("B-", range(160, 151), range(161, 170), 155, 20, 43, 26.4),
  ...makeHaritBlock("B-", range(200, 191), range(201, 210), 293, 20, 43, 26.4),
  // C Blocks (11 rows -> rowHeight = 24.0)
  ...makeHaritBlock("C-", range(120, 110), range(121, 131), 406, 20, 40, 24),
  ...makeHaritBlock("C-", range(160, 150), range(161, 171), 513, 20, 40, 24),
  ...makeHaritBlock("C-", range(202, 192), range(203, 213), 618, 20, 40, 24),
  // D Blocks (15 rows -> rowHeight = 17.6)
  ...makeHaritBlock("D-", range(130, 116), range(131, 145), 721, 20, 29, 17.6, 2),
  ...makeHaritBlock("D-", range(190, 176), range(191, 205), 802, 20, 29, 17.6, 2),
  ...makeHaritBlock("D-", range(250, 236), range(251, 265), 882, 20, 29, 17.6, 2),
  ...makeHaritBlock("D-", range(310, 296), range(311, 325), 962, 20, 29, 17.6, 2),

  // SECTION 2: Lower Residential Blocks (above PARK area, y: 319 to 583)
  // B Blocks (10 rows -> rowHeight = 26.4, y: 319 to 583)
  ...makeHaritBlock("B-", range(110, 101), range(131, 140), 42, 319, 43, 26.4),
  ...makeHaritBlock("B-", range(150, 141), range(171, 180), 155, 319, 43, 26.4),
  ...makeHaritBlock("B-", range(190, 181), range(211, 220), 293, 319, 43, 26.4),
  // C Blocks 4 & 5 (9 rows -> finish before PARK at y: 535)
  ...makeHaritBlock("C-", range(109, 101), range(132, 140), 406, 319, 40, 24),
  ...makeHaritBlock("C-", range(149, 141), range(172, 180), 513, 319, 40, 24),
  // C Block 6 (11 rows -> runs alongside PARK to y: 583)
  ...makeHaritBlock("C-", range(191, 181), range(214, 224), 618, 319, 40, 24),
  // D Blocks (15 rows -> rowHeight = 17.6, y: 319 to 583)
  ...makeHaritBlock("D-", range(115, 101), range(146, 160), 721, 319, 29, 17.6, 2),
  ...makeHaritBlock("D-", range(175, 161), range(206, 220), 802, 319, 29, 17.6, 2),
  ...makeHaritBlock("D-", range(235, 221), range(266, 280), 882, 319, 29, 17.6, 2),
  ...makeHaritBlock("D-", range(295, 281), range(326, 340), 962, 319, 29, 17.6, 2),

  // SECTION 3: Upper Roadside Residential Blocks (around & below PARK area, y: 619 to 883)
  // BR Blocks (10 rows -> y: 619 to 883, rowHeight = 26.4)
  ...makeHaritBlock("BR-", range(110, 101), range(111, 120), 42, 619, 43, 26.4),
  ...makeHaritBlock("BR-", range(130, 121), range(131, 140), 155, 619, 43, 26.4),
  ...makeHaritBlock("BR-", range(160, 151), range(161, 170), 293, 619, 43, 26.4),
  // CR Blocks 4 & 5 (9 rows -> begin below PARK at y: 667, ending at y: 883)
  ...makeHaritBlock("CR-", range(120, 112), range(121, 129), 406, 667, 40, 24),
  ...makeHaritBlock("CR-", range(160, 152), range(161, 169), 513, 667, 40, 24),
  // CR Block 6 (11 rows -> begins at top road beside PARK at y: 619, ending at y: 883)
  ...makeHaritBlock("CR-", range(202, 192), range(203, 213), 618, 619, 40, 24),
  // DR Blocks (15 rows -> y: 619 to 883, rowHeight = 17.6)
  ...makeHaritBlock("DR-", range(130, 116), range(131, 145), 721, 619, 29, 17.6, 2),
  ...makeHaritBlock("DR-", range(190, 176), range(191, 205), 802, 619, 29, 17.6, 2),
  ...makeHaritBlock("DR-", range(235, 221), range(236, 250), 882, 619, 29, 17.6, 2),
  ...makeHaritBlock("DR-", range(265, 251), range(266, 280), 962, 619, 29, 17.6, 2),

  // SECTION 4: Lower Roadside Residential Blocks (y: 918 to 1182, Height = 264)
  // BR Block (10 rows -> rowHeight = 26.4)
  ...makeHaritBlock("BR-", range(150, 141), range(171, 180), 293, 918, 43, 26.4),
  // CR Blocks (11 rows -> rowHeight = 24.0)
  ...makeHaritBlock("CR-", range(111, 101), range(130, 140), 406, 918, 40, 24),
  ...makeHaritBlock("CR-", range(151, 141), range(170, 180), 513, 918, 40, 24),
  ...makeHaritBlock("CR-", range(191, 181), range(214, 224), 618, 918, 40, 24),
  // DR Blocks (15 rows -> rowHeight = 17.6)
  ...makeHaritBlock("DR-", range(115, 101), range(146, 160), 721, 918, 29, 17.6, 2),
  ...makeHaritBlock("DR-", range(175, 161), range(206, 220), 802, 918, 29, 17.6, 2),

  // SECTION 5: Commercial Frontage A Blocks (y: 1217 to 1319)
  ...makeHaritBlock("AR-", range(103, 101), range(104, 106), 294, 1217, 50, 34),
  ...makeHaritBlock("AR-", range(109, 107), range(110, 112), 428, 1217, 50, 34),
  ...makeHaritBlock("AR-", range(115, 113), range(116, 118), 562, 1217, 50, 34),
  ...makeHaritBlock("AR-", range(121, 119), range(122, 124), 696, 1217, 50, 34),
  ...makeHaritBlock("AR-", range(127, 125), [], 830, 1217, 50, 34),
];

interface HaritViharSVGProps {
  onSelectPlot: (plotId: string, sqft: number, locationName: string) => void;
  unavailablePlots: Map<string, string>;
  activeTypeFilter?: string | null;
  activeStatusFilter?: string | null;
  selectedPlotId?: string | null;
}

export const HaritViharSVG = memo(
  ({
    onSelectPlot,
    unavailablePlots,
    activeTypeFilter,
    activeStatusFilter,
    selectedPlotId,
  }: HaritViharSVGProps) => {
    return (
      <div className="w-full max-w-5xl mx-auto">
        {/* SVG Map Canvas */}
        <div className="relative w-full rounded-2xl bg-white p-2 sm:p-4 border border-neutral-200 shadow-inner overflow-x-auto">
          <svg
            viewBox="0 0 1060 1350"
            className="block w-full h-auto rounded-xl bg-white select-none min-w-[700px] md:min-w-0"
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-label="Harit Vihar interactive plot map"
          >
            {/* Background */}
            <rect width="1060" height="1350" fill="#ffffff" />

            {/* Central PARK badge - centered horizontally across C4-C5 and vertically between Sec 2 & Sec 3 */}
            <rect
              x="406"
              y="560"
              width="190"
              height="82"
              rx="18"
              fill="#00a651"
              stroke="#059669"
              strokeWidth="3"
            />
            <text
              x="501"
              y="602"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontSize="30"
              fontWeight="900"
              letterSpacing="4"
            >
              PARK
            </text>

            {/* Compass rose */}
            <g aria-label="Map compass and callout">
              <circle
                cx="942"
                cy="1050"
                r="34"
                fill="white"
                stroke="#374151"
                strokeWidth="2"
              />
              <path
                d="M942 1020 L948 1050 L942 1080 L936 1050 Z"
                fill="#ef1f2d"
              />
              <path
                d="M912 1050 L942 1044 L972 1050 L942 1056 Z"
                fill="#1f2937"
              />
              <text
                x="942"
                y="1010"
                textAnchor="middle"
                fill="#374151"
                fontSize="11"
                fontWeight="800"
              >
                N
              </text>
              <text
                x="942"
                y="1097"
                textAnchor="middle"
                fill="#374151"
                fontSize="11"
                fontWeight="800"
              >
                S
              </text>
            </g>

            {/* Plots list */}
            {HARIT_HOTSPOTS.map((hotspot) => {
              const plotStatus =
                unavailablePlots.get(hotspot.plotNumber) || "available";
              const isSelected = selectedPlotId === hotspot.plotNumber;
              const isBooked = plotStatus === "booked";
              const isReserved = plotStatus === "reserved";
              const isUnavailable = isBooked || isReserved;

              // Type fill color
              let fill = HARIT_TYPE_FILL[hotspot.type] ?? "#22c55e";
              if (isBooked) fill = "#991b1b";
              else if (isReserved) fill = "#f59e0b";
              else if (isSelected) fill = "#facc15";

              // Text color
              let textColor = HARIT_TYPE_TEXT[hotspot.type] ?? "#FFFFFF";
              if (isSelected) textColor = "#000000";

              // Check filters
              let isFilteredOut = false;
              if (activeTypeFilter) {
                if (activeTypeFilter === "BOOKED" && !isBooked)
                  isFilteredOut = true;
                else if (activeTypeFilter === "RESERVED" && !isReserved)
                  isFilteredOut = true;
                else if (
                  activeTypeFilter !== "BOOKED" &&
                  activeTypeFilter !== "RESERVED" &&
                  hotspot.type !== activeTypeFilter
                )
                  isFilteredOut = true;
              }

              if (activeStatusFilter) {
                if (activeStatusFilter === "available" && isUnavailable)
                  isFilteredOut = true;
                else if (activeStatusFilter === "booked" && !isBooked)
                  isFilteredOut = true;
                else if (activeStatusFilter === "reserved" && !isReserved)
                  isFilteredOut = true;
              }

              const sqft = HARIT_TYPE_SQFT[hotspot.type] || 1200;

              return (
                <g
                  key={hotspot.plotNumber}
                  className={`transition-opacity duration-200 ${isUnavailable ? "cursor-not-allowed" : "cursor-pointer hover:opacity-90"}`}
                  opacity={isFilteredOut ? 0.15 : 1}
                  onClick={() => {
                    if (isUnavailable) return;
                    onSelectPlot(
                      hotspot.plotNumber,
                      sqft,
                      "Harit Vihar (Kesariya)",
                    );
                  }}
                >
                  <rect
                    x={hotspot.x}
                    y={hotspot.y}
                    width={hotspot.width}
                    height={hotspot.height}
                    rx="1.5"
                    fill={fill}
                    stroke={
                      isSelected
                        ? "#ca8a04"
                        : isUnavailable
                          ? "#7f1d1d"
                          : "#ffffff"
                    }
                    strokeWidth={isSelected ? 2 : 0.8}
                    className="transition-colors duration-150"
                  />
                  <text
                    x={hotspot.x + hotspot.width / 2}
                    y={hotspot.y + hotspot.height / 2 + 0.5}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={textColor}
                    fontSize={
                      hotspot.height < 18
                        ? 8
                        : hotspot.width <= 42
                          ? 10.5
                          : 12
                    }
                    letterSpacing={hotspot.height < 18 ? "-0.3px" : undefined}
                    fontWeight={
                      isBooked || isReserved || isSelected ? "800" : "700"
                    }
                    pointerEvents="none"
                  >
                    {hotspot.plotNumber}
                  </text>
                  <title>{`${hotspot.plotNumber} · ${sqft} SQ. FT. · ${plotStatus.toUpperCase()}`}</title>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Main Road Callout Banner at Bottom */}
        <div className="mt-6 flex flex-col items-center justify-center gap-1.5 rounded-2xl border border-slate-200 bg-slate-50/90 px-6 py-4 text-center text-xs font-semibold text-slate-700 shadow-sm">
          <div className="inline-flex items-center gap-3">
            <span className="relative inline-flex w-10 items-center">
              <span className="h-1 w-10 rounded-full bg-slate-400" />
              <span className="absolute right-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-slate-500" />
            </span>
            <span className="font-bold text-slate-800 tracking-wide text-sm">
              Main Road · Kachahari Road / Kesariya Road
            </span>
          </div>
          <div className="text-slate-500 font-medium">
            Road widths: 25′ and 30′ · Click on any available plot to view
            details and enquire
          </div>
        </div>

        <p className="text-center text-xs font-semibold text-neutral-400 mt-4">
          Harit Vihar, Kesariya · Near Virat Ramayan Mandir · Total 895 Plots
        </p>
      </div>
    );
  },
);

HaritViharSVG.displayName = "HaritViharSVG";
export default HaritViharSVG;
