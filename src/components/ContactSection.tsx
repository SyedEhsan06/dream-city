"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  CheckCircle2,
  X,
  ExternalLink,
  Navigation,
  Compass,
} from "lucide-react";
import type { EnquiryFormData } from "./EnquiryModal";

interface ContactSectionProps {
  formData: EnquiryFormData;
  setFormData: React.Dispatch<React.SetStateAction<EnquiryFormData>>;
  handleLeadSubmit: (e: React.FormEvent) => Promise<void>;
  formStatus: "idle" | "submitting" | "success";
  activeLocation?: "dream-park" | "harit-vihar";
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  formData,
  setFormData,
  handleLeadSubmit,
  formStatus,
  activeLocation: initialLocation = "dream-park",
}) => {
  const [selectedLoc, setSelectedLoc] = useState<"dream-park" | "harit-vihar">(
    initialLocation,
  );

  const locations = {
    "dream-park": {
      name: "Dream Park · Bettiah",
      subtitle: "Main Office & Project Site",
      addressLines: [
        "C/o Murtuza Manzil, Ward No- 32,",
        "Mansha Tola, NH-727,",
        "Bettiah, West Champaran, Bihar 845438",
      ],
      landmark: "Near NH-727 Highway, Mansha Tola",
      phone: "+91 95087 24886",
      mapEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14197.35905260193!2d84.5473799!3d26.7988686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5c0b77f6553857b%3A0xc44ccae34041f233!2sDream%20Park%20Buildtech%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1716100000000!5m2!1sen!2sin",
      googleMapsLink:
        "https://www.google.com/maps/search/?api=1&query=26.7988686,84.5473799",
      gpsCoords: "26.798869° N, 84.547380° E",
    },
    "harit-vihar": {
      name: "Harit Vihar · Kesariya",
      subtitle: "Project Site Location",
      addressLines: [
        "NH 27, Rajpur,",
        "Near Virat Ramayan Mandir, Rajpur Chowk,",
        "Kesariya, East Champaran, Bihar 845432",
      ],
      landmark: "NH 27 · Near Virat Ramayan Mandir",
      phone: "+91 95087 24886",
      mapEmbedUrl:
        "https://maps.google.com/maps?q=26.378159,84.899498&hl=en&z=15&output=embed",
      googleMapsLink:
        "https://www.google.com/maps/search/?api=1&query=26.378159,84.899498",
      gpsCoords: "26.378159° N, 84.899498° E",
      image: "/images/harit-vihar-site.jpg",
    },
  };

  const current = locations[selectedLoc];

  return (
    <section id="location" className="py-24 px-4 sm:px-6 bg-neutral-50 relative">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row relative z-10 border border-neutral-100">
        {/* Left column: Location info & Interactive Map */}
        <div className="w-full md:w-5/12 bg-emerald-800 text-white flex flex-col justify-between">
          <div className="p-8 lg:p-10 flex-1">
            <h3 className="text-3xl font-bold mb-2">Book a Site Visit</h3>
            <p className="text-emerald-200 mb-6 text-sm leading-relaxed">
              Select a project location to view exact map directions, address,
              and schedule your free on-site tour.
            </p>

            {/* Location Switcher Tabs */}
            <div className="flex rounded-xl bg-emerald-950/40 p-1 mb-6 border border-emerald-700/50">
              <button
                type="button"
                onClick={() => setSelectedLoc("dream-park")}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                  selectedLoc === "dream-park"
                    ? "bg-white text-emerald-950 shadow-md"
                    : "text-emerald-200 hover:text-white"
                }`}
              >
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>Dream Park (Bettiah)</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedLoc("harit-vihar")}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                  selectedLoc === "harit-vihar"
                    ? "bg-white text-emerald-950 shadow-md"
                    : "text-emerald-200 hover:text-white"
                }`}
              >
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                <span>Harit Vihar (Kesariya)</span>
              </button>
            </div>

            {/* Address and details */}
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 bg-emerald-700/80 rounded-xl flex items-center justify-center shrink-0 border border-emerald-600/40">
                  <MapPin className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                      {current.name}
                    </span>
                  </div>
                  <div className="font-medium text-emerald-50 text-sm leading-relaxed">
                    {current.addressLines.map((line, idx) => (
                      <span key={idx} className="block">
                        {line}
                      </span>
                    ))}
                  </div>
                  <div className="mt-2 text-xs text-emerald-300/90 flex items-center gap-1.5 font-mono">
                    <Compass className="w-3.5 h-3.5 text-amber-400" />
                    <span>GPS: {current.gpsCoords}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-11 h-11 bg-emerald-700/80 rounded-xl flex items-center justify-center shrink-0 border border-emerald-600/40">
                  <Phone className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                    Call Us Directly
                  </div>
                  <a
                    href={`tel:${current.phone.replace(/[^0-9+]/g, "")}`}
                    className="font-bold text-lg hover:text-amber-300 transition-colors text-white"
                  >
                    {current.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Embedded Google Map */}
          <div className="h-64 sm:h-72 w-full bg-emerald-950 relative overflow-hidden group">
            <iframe
              key={selectedLoc}
              src={current.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${current.name} Map`}
              className="w-full h-full filter saturate-[1.1]"
            />
            <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-emerald-950 via-emerald-950/70 to-transparent flex items-center justify-between pointer-events-auto">
              <span className="text-xs font-semibold text-emerald-100 flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-amber-400" />
                {current.name}
              </span>
              <a
                href={current.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-emerald-900 rounded-lg text-xs font-bold hover:bg-emerald-50 transition shadow-md"
              >
                <span>Open in Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Right column: Enquiry Form */}
        <div className="w-full md:w-7/12 p-8 lg:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
              Free Site Tour & Consultation
            </span>
            <h3 className="text-2xl lg:text-3xl font-black text-neutral-900">
              Send an Enquiry
            </h3>
            <p className="text-neutral-500 text-sm mt-1">
              Interested in {current.name}? Fill the form below and we’ll contact you promptly.
            </p>
          </div>

          <form onSubmit={handleLeadSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-neutral-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-5 py-3.5 rounded-xl bg-neutral-50 border border-neutral-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 outline-none transition font-medium"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-neutral-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full px-5 py-3.5 rounded-xl bg-neutral-50 border border-neutral-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 outline-none transition font-medium"
                placeholder="Enter your 10-digit number"
              />
            </div>

            {/* Optional Interest field linked from Map */}
            {formData.plot_interest && (
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span className="font-medium text-sm">
                    Interested in Plot{" "}
                    <strong className="text-emerald-900 text-base ml-1">
                      {formData.plot_interest}
                    </strong>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, plot_interest: "" }))
                  }
                  className="text-emerald-600 hover:text-emerald-900 p-1"
                  aria-label="Remove plot selection"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={formStatus === "submitting"}
              className="w-full bg-emerald-700 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-800 transition disabled:opacity-70 shadow-lg shadow-emerald-700/20 mt-2"
            >
              {formStatus === "submitting" ? "Submitting..." : "Send Enquiry"}
            </button>

            {formStatus === "success" && (
              <div className="p-4 bg-emerald-50 text-emerald-700 rounded-xl text-center font-bold flex items-center justify-center gap-2 animate-in fade-in slide-in-from-bottom-2">
                <CheckCircle2 className="w-5 h-5" /> Enquiry sent! We'll call
                you shortly.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};
