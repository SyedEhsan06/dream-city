"use client";

import React, { useState, useCallback } from "react";
import dynamic from 'next/dynamic';
import { Header } from "../../components/Header";
import { EnquiryModal } from "../../components/EnquiryModal";

const PlotMapSVG = dynamic(() => import('../../components/PlotMapSVG'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] bg-neutral-50 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 border border-neutral-100 shadow-inner">
      <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
      <div className="text-neutral-400 font-black tracking-widest text-xs uppercase animate-pulse">Initializing Master Plan...</div>
    </div>
  )
});

export default function PlotsPage() {
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', plot_interest: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handlePlotSelect = useCallback((id: string, sqft: number) => {
    setFormData(prev => ({
      ...prev,
      plot_interest: `${id} (${sqft} sqft)`
    }));
    setIsEnquiryModalOpen(true);
  }, []);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setFormStatus('success');
      setTimeout(() => {
        setFormStatus('idle');
        setIsEnquiryModalOpen(false);
        setFormData({ name: '', phone: '', plot_interest: '' });
      }, 2000);
    }, 1000);
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
              Explore the complete layout of Dream City Bettiah. Use the legend to filter by plot size and select any plot to enquire about availability and pricing.
            </p>
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-emerald-900/5 border border-neutral-100 overflow-hidden">
            <PlotMapSVG onSelectPlot={handlePlotSelect} />
          </div>
        </div>
      </main>

      <EnquiryModal 
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        formData={formData}
        setFormData={setFormData}
        handleLeadSubmit={handleLeadSubmit}
        formStatus={formStatus}
      />
    </div>
  );
}