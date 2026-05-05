"use client";

import React, { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import layoutMatrix from '../data/layoutMatrix.json';

// Extracted Components
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { QuickFind } from '../components/QuickFind';
import { Amenities } from '../components/Amenities';
import { Pricing } from '../components/Pricing';
import { FAQ } from '../components/FAQ';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';
import { EnquiryModal } from '../components/EnquiryModal';
import { PlotDetailsModal } from '../components/PlotDetailsModal';
import { WhatsAppButton } from '../components/WhatsAppButton';

const PlotMapSVG = dynamic(() => import('../components/PlotMapSVG'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] bg-neutral-50 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 border border-neutral-100 shadow-inner">
      <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
      <div className="text-neutral-400 font-black tracking-widest text-xs uppercase animate-pulse">Initializing Master Plan...</div>
    </div>
  )
});

export default function Home() {
  const [formData, setFormData] = useState({ name: '', phone: '', plot_interest: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [selectedPlot, setSelectedPlot] = useState<any>(null);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  
  // Search State
  const [searchSqft, setSearchSqft] = useState<string>('');
  const [searchResult, setSearchResult] = useState<{ count: number, message: string } | null>(null);
  const [currentMapData, setCurrentMapData] = useState<any[]>(layoutMatrix);

  const handleSearch = () => {
    if (!searchSqft) {
      setSearchResult({ count: 0, message: 'Please enter a minimum area in square feet.' });
      return;
    }
    const sqft = parseInt(searchSqft);
    if (isNaN(sqft) || sqft <= 0) {
      setSearchResult({ count: 0, message: 'Invalid area entered.' });
      return;
    }
    
    let count = 0;
    currentMapData.forEach((item: any) => {
      const isPlot = item.type && item.type.toLowerCase() === 'plot';
      if (isPlot && item.id) {
        const id = item.id.toUpperCase();
        let plotSqft = 0;
        
        if (id.startsWith('A') || id.startsWith('RA')) plotSqft = 2700;
        else if (id.startsWith('B') || id.startsWith('RB')) plotSqft = 1800;
        else if (id.startsWith('C') || id.startsWith('RC')) plotSqft = 1200;
        else plotSqft = 1000;
        
        if (plotSqft >= sqft) {
          count++;
        }
      }
    });

    setSearchResult({ count, message: '' });
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Mock lead capture
    setTimeout(() => {
      setFormStatus('success');
      setTimeout(() => {
        setFormStatus('idle');
        setIsEnquiryModalOpen(false);
        setFormData({ name: '', phone: '', plot_interest: '' });
      }, 2000);
      console.log("Mock lead captured:", formData);
    }, 800);
  };

  const handlePlotSelect = useCallback((id: string, sqft: number) => {
    setSelectedPlot({ id, sqft, status: 'available' });
  }, []);

  const handlePlotEnquire = (plotId: string) => {
    setFormData(prev => ({ ...prev, plot_interest: plotId }));
    setIsEnquiryModalOpen(true);
    setSelectedPlot(null);
  };

  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-900 selection:bg-emerald-200">
      
      <Header onEnquireClick={() => setIsEnquiryModalOpen(true)} />

      <main>
        <Hero onEnquireClick={() => setIsEnquiryModalOpen(true)} />

        <QuickFind 
          searchSqft={searchSqft}
          setSearchSqft={setSearchSqft}
          searchResult={searchResult}
          handleSearch={handleSearch}
          setIsEnquiryModalOpen={() => setIsEnquiryModalOpen(true)}
        />

        <Amenities />

        {/* INTERACTIVE PLOT MAP */}
        <section id="plots" className="py-24 px-4 sm:px-6 bg-neutral-100 border-y border-neutral-200 overflow-hidden">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-black text-neutral-900 mb-4 tracking-tight">Master Plan & Plot Availability</h2>
              <p className="text-neutral-600 max-w-2xl mx-auto text-lg">Explore our real project layout. Select an available plot to send an enquiry.</p>
            </div>
            
            <PlotMapSVG 
              onSelectPlot={handlePlotSelect} 
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