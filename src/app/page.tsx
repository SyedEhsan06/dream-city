"use client";

import React, { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import layoutMatrix from "../data/layoutMatrix.json";

// Extracted Components
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { QuickFind } from "../components/QuickFind";
import { Amenities } from "../components/Amenities";
import { Pricing } from "../components/Pricing";
import { FAQ } from "../components/FAQ";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";
import { EnquiryModal } from "../components/EnquiryModal";
import { PlotDetailsModal } from "../components/PlotDetailsModal";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { HARIT_HOTSPOTS, HARIT_TYPE_SQFT } from "../components/HaritViharSVG";

const PlotMapSVG = dynamic(() => import("../components/PlotMapSVG"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] bg-neutral-50 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 border border-neutral-100 shadow-inner">
      <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
      <div className="text-neutral-400 font-black tracking-widest text-xs uppercase animate-pulse">
        Initializing Master Plan...
      </div>
    </div>
  ),
});

export default function Home() {
  const [activeLocation, setActiveLocation] = useState<
    "dream-park" | "harit-vihar"
  >("dream-park");
  const [searchLocation, setSearchLocation] = useState<
    "dream-park" | "harit-vihar"
  >("dream-park");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    plot_interest: "",
  });
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success"
  >("idle");
  const [selectedPlot, setSelectedPlot] = useState<{
    id: string;
    sqft: number;
    status: string;
    locationName?: string;
  } | null>(null);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

  // Search State
  const [searchSqft, setSearchSqft] = useState<string>("");
  const [searchResult, setSearchResult] = useState<{
    count: number;
    message: string;
    locationName?: string;
  } | null>(null);
  const [currentMapData] = useState<any[]>(layoutMatrix);

  const handleSearch = () => {
    const sqft = parseInt(searchSqft) || 0;
    let count = 0;

    if (searchLocation === "harit-vihar") {
      HARIT_HOTSPOTS.forEach((h) => {
        const plotSqft = HARIT_TYPE_SQFT[h.type] || 1200;
        if (sqft === 0 || plotSqft >= sqft) {
          count++;
        }
      });
      setSearchResult({
        count,
        message: "",
        locationName: "Harit Vihar (Kesariya)",
      });
    } else {
      currentMapData.forEach((item: any) => {
        const isPlot = item.type && item.type.toLowerCase() === "plot";
        if (isPlot && item.id) {
          const id = item.id.toUpperCase();
          let plotSqft = 1200;
          if (id.startsWith("A") || id.startsWith("RA")) plotSqft = 2700;
          else if (id.startsWith("B") || id.startsWith("RB")) plotSqft = 1800;
          else if (id.startsWith("C") || id.startsWith("RC")) plotSqft = 1200;

          if (sqft === 0 || plotSqft >= sqft) {
            count++;
          }
        }
      });
      setSearchResult({
        count,
        message: "",
        locationName: "Dream Park (Bettiah)",
      });
    }
  };

  const handleViewOnMap = (loc: "dream-park" | "harit-vihar") => {
    setActiveLocation(loc);
    document.getElementById("plots")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");

    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://168.144.31.85/api";
      const response = await fetch(`${apiUrl}/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId:
            process.env.NEXT_PUBLIC_PROJECT_ID ||
            "44bf0de8-c797-403b-a7cb-69c7f9ee171e",
          name: formData.name,
          phone: formData.phone,
          email: formData.email.trim() || undefined,
          message: formData.message.trim() || undefined,
          plotInterest: formData.plot_interest || undefined,
          source: "website_contact",
          leadType: formData.plot_interest ? "plot_enquiry" : "enquiry",
        }),
      });

      if (!response.ok) throw new Error("Failed to submit");

      setFormStatus("success");
      setTimeout(() => {
        setFormStatus("idle");
        setIsEnquiryModalOpen(false);
        setFormData({
          name: "",
          phone: "",
          email: "",
          message: "",
          plot_interest: "",
        });
      }, 2000);
    } catch (err) {
      console.error("Lead capture failed:", err);
      setFormStatus("idle");
      alert(
        "Something went wrong. Please try again or contact us via WhatsApp.",
      );
    }
  };

  const handlePlotSelect = useCallback(
    (id: string, sqft: number, locationName: string) => {
      setSelectedPlot({ id, sqft, status: "available", locationName });
    },
    [],
  );

  const handlePlotEnquire = (plotId: string, locationName?: string) => {
    setFormData((prev) => ({
      ...prev,
      plot_interest: `${plotId} (${locationName || (activeLocation === "harit-vihar" ? "Harit Vihar" : "Dream Park")})`,
    }));
    setIsEnquiryModalOpen(true);
    setSelectedPlot(null);
  };

  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-900 selection:bg-emerald-200">
      <Header
        onEnquireClick={() => setIsEnquiryModalOpen(true)}
        onSelectLocation={(loc) => {
          setActiveLocation(loc);
          setSearchLocation(loc);
        }}
      />

      <main>
        <Hero onEnquireClick={() => setIsEnquiryModalOpen(true)} />

        <QuickFind
          searchLocation={searchLocation}
          setSearchLocation={(loc) => {
            setSearchLocation(loc);
            setSearchResult(null);
          }}
          searchSqft={searchSqft}
          setSearchSqft={(val) => {
            setSearchSqft(val);
            setSearchResult(null);
          }}
          searchResult={searchResult}
          handleSearch={handleSearch}
          onViewOnMap={handleViewOnMap}
          setIsEnquiryModalOpen={() => setIsEnquiryModalOpen(true)}
        />

        <Amenities />

        {/* INTERACTIVE PLOT MAP */}
        <section
          id="plots"
          className="py-24 px-4 sm:px-6 bg-neutral-100 border-y border-neutral-200 overflow-hidden"
        >
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-4">
                Interactive Layout & Live Availability
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-neutral-900 mb-4 tracking-tight">
                Master Plan & Plot Availability
              </h2>
              <p className="text-neutral-600 max-w-2xl mx-auto text-lg">
                Explore real layouts for Dream Park Bettiah and Harit Vihar Kesariya. Select an available plot to send an enquiry.
              </p>
            </div>

            <PlotMapSVG
              onSelectPlot={handlePlotSelect}
              initialLocation={activeLocation}
              onLocationChange={setActiveLocation}
            />
          </div>
        </section>

        <Pricing onEnquireClick={() => setIsEnquiryModalOpen(true)} />

        <FAQ />

        <ContactSection
          formData={formData}
          setFormData={setFormData}
          handleLeadSubmit={handleLeadSubmit}
          formStatus={formStatus}
          activeLocation={activeLocation}
        />
      </main>

      <Footer />

      <PlotDetailsModal
        selectedPlot={selectedPlot}
        onClose={() => setSelectedPlot(null)}
        onEnquire={handlePlotEnquire}
      />

      <EnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        formData={formData}
        setFormData={setFormData}
        handleLeadSubmit={handleLeadSubmit}
        formStatus={formStatus}
      />

      <WhatsAppButton />
    </div>
  );
}
