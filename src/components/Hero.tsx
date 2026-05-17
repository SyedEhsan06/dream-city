import React from "react";
import { MapPin } from "lucide-react";

interface HeroProps {
  onEnquireClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onEnquireClick }) => {
  return (
    <section className="relative pt-24 pb-48 px-6 overflow-hidden bg-emerald-900 text-white">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-30"></div>

      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/40 via-emerald-400/20 to-transparent"></div>

      <div className="relative max-w-4xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-800/50 border border-emerald-700 backdrop-blur-sm text-emerald-100 text-sm font-medium">
          <MapPin className="w-4 h-4" /> Mansha Tola, Bettiah - Motihari Rd
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
          Own Your Dream Plot <br className="hidden md:block" /> in Bettiah
        </h1>
        <p className="text-lg md:text-xl text-emerald-100 max-w-2xl mx-auto leading-relaxed">
          Premium plotted development near NH-727 with wide roads and planned
          infrastructure. Secure your family's future today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <a
            href="#plots"
            className="bg-amber-500 text-emerald-950 px-8 py-4 rounded-full font-bold text-lg hover:bg-amber-400 transition shadow-lg shadow-amber-500/20"
          >
            View Available Plots
          </a>
          <button
            onClick={onEnquireClick}
            className="bg-white/10 backdrop-blur border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition"
          >
            Book Site Visit
          </button>
        </div>
      </div>
    </section>
  );
};
