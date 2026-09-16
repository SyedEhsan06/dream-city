import React from "react";
import { MapPin, Phone, ExternalLink } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-950 text-neutral-400 py-16 px-6 border-t border-neutral-900">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center mb-10 text-center">
          <img
            src="/logo.png"
            alt="Dream Park Buildtech Logo"
            className="w-16 h-16 object-contain mb-4"
          />
          <div className="text-2xl font-bold text-white tracking-tight">
            Dream Park Buildtech Pvt. Ltd.
          </div>
          <p className="text-sm text-neutral-500 max-w-lg mt-2">
            Premier residential & commercial land developments across Bihar with crystal-clear titles and modern amenities.
          </p>
        </div>

        {/* Project Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-10 text-left">
          {/* Dream Park Bettiah */}
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 hover:border-emerald-700/50 transition">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-950 flex items-center justify-center text-emerald-400 border border-emerald-800/50">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">Dream Park · Bettiah</h4>
                <p className="text-xs text-emerald-400 font-medium">Head Office & Project Site</p>
              </div>
            </div>
            <address className="not-italic text-sm text-neutral-300 leading-relaxed space-y-0.5">
              <p>C/o Murtuza Manzil, Ward No- 32,</p>
              <p>Mansha Tola, NH-727,</p>
              <p>Bettiah, West Champaran, Bihar 845438</p>
            </address>
            <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between text-xs">
              <a
                href="https://www.google.com/maps/search/?api=1&query=26.7988686,84.5473799"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold"
              >
                <span>View on Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Harit Vihar Kesariya */}
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 hover:border-amber-700/50 transition">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-amber-950/60 flex items-center justify-center text-amber-400 border border-amber-800/50">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">Harit Vihar · Kesariya</h4>
                <p className="text-xs text-amber-400 font-medium">Near Virat Ramayan Mandir</p>
              </div>
            </div>
            <address className="not-italic text-sm text-neutral-300 leading-relaxed space-y-0.5">
              <p>NH 27, Rajpur,</p>
              <p>Near Virat Ramayan Mandir, Rajpur Chowk,</p>
              <p>Kesariya, East Champaran, Bihar 845432</p>
            </address>
            <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between text-xs">
              <a
                href="https://www.google.com/maps/search/?api=1&query=26.378159,84.899498"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold"
              >
                <span>View on Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <span className="text-neutral-500 font-mono text-[11px]">GPS: 26.378159° N, 84.899498° E</span>
            </div>
          </div>
        </div>

        {/* Contact Strip */}
        <div className="flex flex-wrap items-center justify-center gap-6 py-4 px-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/50 max-w-xl mx-auto mb-8 text-sm">
          <div className="flex items-center gap-2 text-neutral-300">
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>Direct Inquiries:</span>
            <a href="tel:+919508724886" className="font-bold text-white hover:text-emerald-400 transition">
              +91 95087 24886
            </a>
          </div>
        </div>

        <div className="text-sm flex flex-col md:flex-row items-center justify-center gap-2 text-neutral-500 text-center">
          <span>
            &copy; {new Date().getFullYear()} Dream Park Buildtech Pvt. Ltd. All rights reserved.
          </span>
          <span className="hidden md:inline text-neutral-700">|</span>
          <span>
            Powered by{" "}
            <a
              href="https://sydinnovations.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-emerald-400 transition-colors duration-200 underline underline-offset-4 font-medium"
            >
              sydinnovations.com
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};
