import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, MapPin, LayoutGrid } from "lucide-react";

interface HeaderProps {
  onEnquireClick: () => void;
  onSelectLocation?: (location: "dream-park" | "harit-vihar") => void;
}

export const Header: React.FC<HeaderProps> = ({
  onEnquireClick,
  onSelectLocation,
}) => {
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const pathname = usePathname();

  const handleProjectClick = (loc: "dream-park" | "harit-vihar") => {
    setIsProjectsOpen(false);
    if (onSelectLocation) {
      onSelectLocation(loc);
      const plotsEl = document.getElementById("plots");
      if (plotsEl) {
        plotsEl.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.location.href = `/plots?location=${loc}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-neutral-100 flex items-center justify-center p-1.5 overflow-hidden group-hover:border-emerald-200 transition-colors">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="text-xl font-black text-emerald-900 tracking-tighter uppercase group-hover:text-emerald-700 transition-colors">
              DREAM PARK
            </div>
          </a>

          <nav className="hidden lg:flex gap-8 items-center font-bold text-[13px] text-neutral-500 uppercase tracking-wider">
            <a
              href="/"
              className={`hover:text-emerald-700 transition-colors ${pathname === "/" ? "text-emerald-700" : ""}`}
            >
              Home
            </a>
            <div
              className="relative group"
              onMouseEnter={() => setIsProjectsOpen(true)}
              onMouseLeave={() => setIsProjectsOpen(false)}
            >
              <button
                type="button"
                className="flex items-center gap-1.5 hover:text-emerald-700 transition-colors py-2 cursor-pointer"
              >
                Projects{" "}
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${isProjectsOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isProjectsOpen && (
                <div
                  className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-2xl border border-neutral-100 p-2 animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-200"
                >
                  <div className="p-2 text-[10px] text-neutral-400 font-black tracking-widest uppercase">
                    Active Projects
                  </div>
                  <div className="space-y-1">
                    <button
                      type="button"
                      onClick={() => handleProjectClick("dream-park")}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-emerald-50 text-neutral-800 hover:text-emerald-800 transition text-left cursor-pointer group/item"
                    >
                      <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div>
                        <div className="font-bold text-xs text-neutral-900 group-hover/item:text-emerald-800">
                          Dream Park · Bettiah
                        </div>
                        <div className="text-[10px] text-neutral-400">
                          1,818 Plots · Master Layout
                        </div>
                      </div>
                      <div className="ml-auto w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleProjectClick("harit-vihar")}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-emerald-50 text-neutral-800 hover:text-emerald-800 transition text-left cursor-pointer group/item"
                    >
                      <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div>
                        <div className="font-bold text-xs text-neutral-900 group-hover/item:text-emerald-800">
                          Harit Vihar · Kesariya
                        </div>
                        <div className="text-[10px] text-neutral-400">
                          895 Plots · Virat Ramayan Mandir
                        </div>
                      </div>
                      <div className="ml-auto w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <a
              href="/plots"
              className={`flex items-center gap-1.5 transition-colors ${pathname === "/plots" ? "text-emerald-700" : "hover:text-emerald-700"}`}
            >
              <LayoutGrid className="w-4 h-4" /> Plot Map
            </a>
            <a
              href="/#highlights"
              className="hover:text-emerald-700 transition-colors"
            >
              Highlights
            </a>
            <a
              href="/#location"
              className="hover:text-emerald-700 transition-colors"
            >
              Location
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href="https://crm.dreampark.co.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-neutral-600 hover:text-emerald-700 font-bold text-[10px] sm:text-sm transition-colors px-3 sm:px-4 py-2 sm:py-2.5 rounded-full border border-neutral-200 hover:border-emerald-200 hover:bg-emerald-50 whitespace-nowrap"
          >
            Login
          </a>
          <button
            onClick={onEnquireClick}
            className="bg-emerald-700 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-[10px] sm:text-sm hover:bg-emerald-800 transition-all hover:shadow-lg hover:shadow-emerald-700/20 active:scale-95 whitespace-nowrap"
          >
            Enquire Now
          </button>
        </div>
      </div>
    </header>
  );
};
