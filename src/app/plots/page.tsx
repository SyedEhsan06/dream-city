"use client";

import React, { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { Header } from "../../components/Header";
import { EnquiryModal } from "../../components/EnquiryModal";
import { Footer } from "../../components/Footer";
import { WhatsAppButton } from "../../components/WhatsAppButton";

const PlotMapSVG = dynamic(() => import("../../components/PlotMapSVG"), {
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

export default function PlotsPage() {
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
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

  const handlePlotSelect = useCallback((id: string, sqft: number) => {
    setFormData((prev) => ({
      ...prev,
      plot_interest: `${id} (${sqft} sqft)`,
    }));
    setIsEnquiryModalOpen(true);
  }, []);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");

    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://168.144.31.85/api";
      const response = await fetch(`${apiUrl}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId:
            process.env.NEXT_PUBLIC_PROJECT_ID ||
            "44bf0de8-c797-403b-a7cb-69c7f9ee171e",
          name: formData.name,
          phone: formData.phone,
          email: formData.email.trim() || undefined,
          message: formData.message.trim() || undefined,
          plotInterest: formData.plot_interest || undefined,
          source: "plot_map",
          leadType: formData.plot_interest ? "plot_enquiry" : "enquiry",
        }),
      });

      if (!response.ok) throw new Error("Failed to submit");

      setFormStatus("success");
      setTimeout(() => {
        setFormStatus("idle");
        setIsEnquiryModalOpen(false);
        setFormData({ name: "", phone: "", email: "", message: "", plot_interest: "" });
      }, 2000);
    } catch (err) {
      console.error("Lead capture failed:", err);
      setFormStatus("idle");
      alert("Something went wrong. Please try again or contact us via WhatsApp.");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <Header onEnquireClick={() => setIsEnquiryModalOpen(true)} />

      <main className="flex-1 py-12 px-4 sm:px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-black text-neutral-900 mb-6 tracking-tight">
              Interactive Master Plan
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Explore the complete layout of Dream Park Bettiah. Use the legend
              to filter by plot size and select any plot to enquire about
              availability and pricing.
            </p>
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-emerald-900/5 border border-neutral-100 overflow-hidden">
            <PlotMapSVG onSelectPlot={handlePlotSelect} />
          </div>
        </div>
      </main>

      <Footer />

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
