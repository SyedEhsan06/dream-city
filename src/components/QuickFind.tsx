import React from "react";
import {
  CheckCircle2,
  ShieldCheck,
  Map,
  Home as HomeIcon,
  Zap,
} from "lucide-react";

interface QuickFindProps {
  searchLocation: "dream-park" | "harit-vihar";
  setSearchLocation: (val: "dream-park" | "harit-vihar") => void;
  searchSqft: string;
  setSearchSqft: (val: string) => void;
  searchResult: {
    count: number;
    message: string;
    locationName?: string;
  } | null;
  handleSearch: () => void;
  onViewOnMap: (location: "dream-park" | "harit-vihar") => void;
  setIsEnquiryModalOpen: (val: boolean) => void;
}

export const QuickFind: React.FC<QuickFindProps> = ({
  searchLocation,
  setSearchLocation,
  searchSqft,
  setSearchSqft,
  searchResult,
  handleSearch,
  onViewOnMap,
  setIsEnquiryModalOpen,
}) => {
  return (
    <section className="relative z-20 -mt-24 px-6 mb-24">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl border border-neutral-100 overflow-hidden flex flex-col md:flex-row">
        {/* Find Plot Form */}
        <div className="w-full md:w-1/3 p-8 lg:p-10 bg-white border-b md:border-b-0 md:border-r border-neutral-100">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-xs font-bold text-neutral-400 tracking-widest uppercase">
              Find Your
            </h3>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              Live Availability
            </span>
          </div>
          <h2 className="text-3xl font-black text-neutral-900 mb-6">
            PLOT HERE
          </h2>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            {/* Project Selection Tabs */}
            <div>
              <label className="block text-xs font-bold text-neutral-500 mb-2 uppercase">
                Project Location
              </label>
              <div className="grid grid-cols-2 gap-2 p-1 bg-neutral-100 rounded-xl border border-neutral-200">
                <button
                  type="button"
                  onClick={() => setSearchLocation("dream-park")}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition-all text-center ${
                    searchLocation === "dream-park"
                      ? "bg-white text-emerald-900 shadow-sm border border-neutral-200"
                      : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  Dream Park
                  <span className="block text-[10px] text-neutral-400 font-normal">
                    Bettiah
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setSearchLocation("harit-vihar")}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition-all text-center ${
                    searchLocation === "harit-vihar"
                      ? "bg-white text-emerald-900 shadow-sm border border-neutral-200"
                      : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  Harit Vihar
                  <span className="block text-[10px] text-neutral-400 font-normal">
                    Kesariya
                  </span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-500 mb-1 uppercase">
                  State
                </label>
                <input
                  type="text"
                  value="Bihar"
                  readOnly
                  className="w-full border-b-2 border-neutral-200 py-1.5 text-neutral-900 font-bold bg-transparent cursor-default text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-500 mb-1 uppercase">
                  City
                </label>
                <input
                  type="text"
                  value={
                    searchLocation === "harit-vihar" ? "Kesariya" : "Bettiah"
                  }
                  readOnly
                  className="w-full border-b-2 border-neutral-200 py-1.5 text-neutral-900 font-bold bg-transparent cursor-default text-sm"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-neutral-500 uppercase">
                  Min area (sqft)
                </label>
                {searchSqft && (
                  <button
                    type="button"
                    onClick={() => setSearchSqft("")}
                    className="text-[10px] text-neutral-400 hover:text-neutral-600 font-medium"
                  >
                    Clear
                  </button>
                )}
              </div>
              <input
                type="number"
                value={searchSqft}
                onChange={(e) => setSearchSqft(e.target.value)}
                placeholder="e.g. 1200"
                className="w-full border-b-2 border-neutral-200 py-2 text-neutral-900 font-bold focus:border-amber-500 outline-none bg-transparent transition-colors text-base"
              />

              {/* Quick Area Filter Pills */}
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {[
                  { label: "1,200 sqft", val: "1200" },
                  { label: "1,800 sqft", val: "1800" },
                  { label: "2,700 sqft", val: "2700" },
                  ...(searchLocation === "harit-vihar"
                    ? [{ label: "3,600 sqft", val: "3600" }]
                    : []),
                ].map((pill) => (
                  <button
                    key={pill.val}
                    type="button"
                    onClick={() => setSearchSqft(pill.val)}
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-md transition-all ${
                      searchSqft === pill.val
                        ? "bg-amber-600 text-white shadow-sm"
                        : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
                    }`}
                  >
                    {pill.label}
                  </button>
                ))}
              </div>
            </div>

            {searchResult && (
              <div
                className={`p-4 rounded-xl border font-medium animate-in fade-in zoom-in-95 ${
                  searchResult.count > 0
                    ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                    : "bg-rose-50 border-rose-200 text-rose-800"
                }`}
              >
                {searchResult.count > 0 ? (
                  <div>
                    <div className="font-bold text-base mb-1.5 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span>{searchResult.count} Plots Available!</span>
                    </div>
                    <p className="text-xs text-emerald-700/90 mb-3">
                      Matching {searchSqft || "all"} sqft or above in{" "}
                      <span className="font-bold">
                        {searchResult.locationName ||
                          (searchLocation === "harit-vihar"
                            ? "Harit Vihar"
                            : "Dream Park")}
                      </span>
                      .
                    </p>
                    <button
                      type="button"
                      onClick={() => onViewOnMap(searchLocation)}
                      className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs py-2.5 px-4 rounded-lg transition-colors text-center shadow-sm"
                    >
                      View them on the Master Plan &rarr;
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="font-bold text-base mb-1">
                      No exact matches
                    </div>
                    <p className="text-rose-700/80 mb-3 text-xs leading-relaxed">
                      {searchResult.message ||
                        `We couldn't find available plots matching ${searchSqft} sqft in ${searchLocation === "harit-vihar" ? "Harit Vihar" : "Dream Park"}.`}
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsEnquiryModalOpen(true)}
                      className="bg-rose-600 text-white px-4 py-2 rounded-lg font-bold text-xs hover:bg-rose-700 transition shadow-sm w-full"
                    >
                      Contact Sales Team
                    </button>
                  </div>
                )}
              </div>
            )}

            {!searchResult || searchResult.count > 0 ? (
              <button
                type="button"
                onClick={handleSearch}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3.5 rounded-xl mt-2 transition shadow-lg shadow-amber-600/20"
              >
                Search Plots
              </button>
            ) : null}
          </form>
        </div>

        {/* Value Props */}
        <div className="w-full md:w-2/3 p-8 lg:p-12 bg-neutral-50">
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-12">
            {[
              {
                icon: <ShieldCheck className="w-10 h-10" />,
                title: "PLOT",
                desc: "Comfort and convenience is the mantra for modern living and our plots give you exactly this. With underground water and electricity supplies already.",
              },
              {
                icon: <Map className="w-10 h-10" />,
                title: "EMI FACILITY",
                desc: "Equated monthly installment, as the name suggests, is one part of the equally divided monthly outgoes to clear off an outstanding.",
              },
              {
                icon: <HomeIcon className="w-10 h-10" />,
                title: "LOW COST",
                desc: "To stay healthy one needs a proper place to reside for the entire life and that is home. This is one important component of one's life.",
              },
              {
                icon: <Zap className="w-10 h-10" />,
                title: "BRIGHT PLACE",
                desc: "At Dream Park, we are all about plots, all about service, and most of all we are where your life happens!",
              },
            ].map((prop, index) => (
              <div key={index}>
                <div className="text-amber-600 mb-4">{prop.icon}</div>
                <h4 className="text-lg font-black text-neutral-900 mb-3 uppercase tracking-wide">
                  {prop.title}
                </h4>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {prop.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
