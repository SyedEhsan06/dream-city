"use client";

import React, { useState } from 'react';
import { MapPin, Phone, MessageCircle, Trees, Route as Road, Map, ShieldCheck, CheckCircle2, Navigation, X, Droplets, Zap, Shield, Home as HomeIcon, ArrowRight } from 'lucide-react';
import PlotMap from '../components/PlotMap';

export default function Home() {
  const [formData, setFormData] = useState({ name: '', phone: '', plot_interest: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [selectedPlot, setSelectedPlot] = useState<any>(null);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Mock lead capture as requested - no backend for now
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

  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-900 selection:bg-emerald-200">
      
      {/* HEADER / NAVIGATION */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-emerald-900 tracking-tight">
            Dream City Buildtech
          </div>
          <div className="hidden md:flex gap-6 items-center font-medium text-sm text-neutral-600">
            <a href="#plots" className="hover:text-emerald-700 transition">Available Plots</a>
            <a href="#highlights" className="hover:text-emerald-700 transition">Highlights</a>
            <a href="#location" className="hover:text-emerald-700 transition">Location</a>
          </div>
          <button 
            onClick={() => setIsEnquiryModalOpen(true)}
            className="bg-emerald-700 text-white px-5 py-2 rounded-full font-medium hover:bg-emerald-800 transition"
          >
            Enquire Now
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-24 pb-32 px-6 overflow-hidden bg-emerald-900 text-white">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-900/80 to-transparent"></div>
        
        <div className="relative max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-800/50 border border-emerald-700 backdrop-blur-sm text-emerald-100 text-sm font-medium">
            <MapPin className="w-4 h-4" /> Mansha Tola, Bettiah - Motihari Rd
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
            Own Your Dream Plot <br className="hidden md:block"/> in Bettiah
          </h1>
          <p className="text-lg md:text-xl text-emerald-100 max-w-2xl mx-auto leading-relaxed">
            Premium plotted development near NH-727 with wide roads and planned infrastructure. Secure your family's future today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a href="#plots" className="bg-amber-500 text-emerald-950 px-8 py-4 rounded-full font-bold text-lg hover:bg-amber-400 transition shadow-lg shadow-amber-500/20">
              View Available Plots
            </a>
            <button 
              onClick={() => setIsEnquiryModalOpen(true)}
              className="bg-white/10 backdrop-blur border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition"
            >
              Book Site Visit
            </button>
          </div>
        </div>
      </section>

      {/* WORLD-CLASS AMENITIES */}
      <section id="highlights" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">World-Class Amenities</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto text-lg">Designed to provide a secure, comfortable, and modern lifestyle for you and your family.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Shield className="w-8 h-8" />, title: "24/7 Security", desc: "Gated community with CCTV" },
              { icon: <Zap className="w-8 h-8" />, title: "Electricity", desc: "Underground cabling" },
              { icon: <Droplets className="w-8 h-8" />, title: "Water Supply", desc: "24x7 water connection" },
              { icon: <HomeIcon className="w-8 h-8" />, title: "Drainage", desc: "Modern sewage system" },
              { icon: <Trees className="w-8 h-8" />, title: "Lush Parks", desc: "Landscaped green areas" },
              { icon: <Road className="w-8 h-8" />, title: "Wide Roads", desc: "40ft & 25ft internal roads" },
              { icon: <CheckCircle2 className="w-8 h-8" />, title: "Clear Title", desc: "100% verified documents" },
              { icon: <Navigation className="w-8 h-8" />, title: "Connectivity", desc: "Right next to Highway" },
            ].map((item, i) => (
              <div key={i} className="bg-neutral-50 border border-neutral-100 p-8 rounded-3xl text-center hover:shadow-xl hover:-translate-y-1 transition duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-neutral-900">{item.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE PLOT MAP */}
      <section id="plots" className="py-24 px-6 bg-neutral-100 border-y border-neutral-200 overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Master Plan & Plot Availability</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">Explore our real project layout. Select an available plot to send an enquiry.</p>
          </div>
          
          <PlotMap onSelectPlot={(id, sqft) => setSelectedPlot({ id, sqft, status: 'available' })} />
        </div>
      </section>

      {/* Plot Enquiry Modal */}
      {selectedPlot && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden scale-100 transition-transform">
            <div className="p-8 text-white flex justify-between items-start bg-[#1b5e20]">
              <div>
                <div className="text-white/80 font-bold text-xs tracking-wider mb-1 uppercase">Plot Details</div>
                <h3 className="text-4xl font-black">{selectedPlot.id}</h3>
              </div>
              <button onClick={() => setSelectedPlot(null)} className="p-2 bg-black/10 hover:bg-black/20 rounded-full transition backdrop-blur-sm">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-100">
                  <div className="text-neutral-400 text-xs font-bold mb-1 uppercase">Area</div>
                  <div className="font-bold text-xl text-neutral-900">{selectedPlot.sqft} sqft</div>
                </div>
                <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-100">
                  <div className="text-neutral-400 text-xs font-bold mb-1 uppercase">Status</div>
                  <div className="font-bold text-xl text-emerald-700 capitalize">{selectedPlot.status}</div>
                </div>
              </div>

              <div>
                <button 
                  onClick={() => {
                    setFormData(prev => ({ ...prev, plot_interest: selectedPlot.id }));
                    setIsEnquiryModalOpen(true);
                    setSelectedPlot(null);
                  }} 
                  className="block w-full text-center bg-emerald-700 text-white py-4 rounded-xl font-bold hover:bg-emerald-800 transition shadow-lg shadow-emerald-700/20"
                >
                  Enquire Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PRICING & TRUST */}
      <section className="py-24 px-6 bg-emerald-900 text-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Pricing & Investment</h2>
            <p className="text-emerald-100 mb-8 text-lg leading-relaxed">
              Clear, transparent pricing with flexible payment options tailored for you. Invest in land that appreciates.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="text-amber-400 w-6 h-6 shrink-0" />
                <span className="text-lg">Competitive per sqft pricing</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="text-amber-400 w-6 h-6 shrink-0" />
                <span className="text-lg">Easy EMI options available</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="text-amber-400 w-6 h-6 shrink-0" />
                <span className="text-lg">Clear titles and transparent documentation</span>
              </li>
            </ul>
            <button 
              onClick={() => setIsEnquiryModalOpen(true)}
              className="inline-block bg-amber-500 text-emerald-950 px-8 py-4 rounded-full font-bold text-lg hover:bg-amber-400 transition"
            >
              Get Detailed Pricing
            </button>
          </div>
          
          <div className="bg-emerald-800/50 p-10 rounded-3xl border border-emerald-700/50 backdrop-blur-sm">
            <div className="w-16 h-16 bg-emerald-700 rounded-2xl flex items-center justify-center mb-6">
              <ShieldCheck className="w-8 h-8 text-amber-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Developed By</h3>
            <div className="text-xl font-black text-white mb-2">Dream City Buildtech Pvt. Ltd.</div>
            <p className="text-emerald-200 mb-6 leading-relaxed">
              Committed to delivering high-quality plotted developments with verified legal status and modern infrastructure.
            </p>
            <div className="flex items-center gap-4 text-sm font-medium text-emerald-300">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Verified Legal</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Ready for Registration</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 px-6 bg-white border-b border-neutral-200">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-neutral-600 text-lg">Got questions? We've got answers.</p>
          </div>
          <div className="space-y-4">
            {[
              { q: "Is the project legally verified?", a: "Yes, Dream Park has 100% clear titles and all necessary approvals from the local authorities. You can review the papers anytime." },
              { q: "Are bank loans available?", a: "Yes, we have tie-ups with leading nationalized and private banks to offer easy EMI and loan facilities for plots." },
              { q: "When can I start construction?", a: "You can start construction immediately after the registry! The basic infrastructure like roads and plot marking is already in place." },
              { q: "What is the booking amount?", a: "You can secure your plot with a nominal booking amount. Contact our sales team using the form below to get the exact payment schedule." }
            ].map((faq, i) => (
              <div key={i} className="p-6 bg-neutral-50 rounded-2xl border border-neutral-100 hover:border-emerald-200 transition">
                <h4 className="text-lg font-bold text-neutral-900 mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm">Q</span>
                  {faq.q}
                </h4>
                <p className="text-neutral-600 leading-relaxed ml-8">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEAD CAPTURE / CONTACT & LOCATION MAP */}
      <section id="contact" className="py-24 px-6 bg-neutral-50 relative">
        <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row relative z-10">
          
          <div className="w-full md:w-5/12 bg-emerald-800 text-white flex flex-col">
            <div className="p-10 flex-1">
              <h3 className="text-3xl font-bold mb-4">Book a Site Visit</h3>
              <p className="text-emerald-200 mb-8 leading-relaxed">
                Drop your details below and our team will get back to you with exact pricing, availability, and to schedule a tour.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-700 rounded-full flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-sm text-emerald-300 font-medium tracking-wide">Call Us Directly</div>
                    <div className="font-bold text-xl">+91 98765 43210</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Embedded Google Map using exact company location */}
            <div className="h-72 w-full bg-emerald-900 relative">
              <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-emerald-800 to-transparent z-10 pointer-events-none"></div>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3548.868725843477!2d84.5382552!3d26.8017159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39936902445fbcbb%3A0x899229c0b9860ad2!2sDream%20City%20Buildtech%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1714815456789!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale-[30%] opacity-90 mix-blend-luminosity hover:grayscale-0 hover:opacity-100 hover:mix-blend-normal transition duration-500"
              ></iframe>
            </div>
          </div>
          
          <div className="w-full md:w-7/12 p-10 lg:p-12 flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-8 text-neutral-900">Send an Enquiry</h3>
            <form onSubmit={handleLeadSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-2">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-5 py-4 rounded-xl bg-neutral-50 border border-neutral-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 outline-none transition font-medium"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  required
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-5 py-4 rounded-xl bg-neutral-50 border border-neutral-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 outline-none transition font-medium"
                  placeholder="Enter your 10-digit number"
                />
              </div>

              {/* Optional Interest field linked from Map */}
              {formData.plot_interest && (
                 <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                     <CheckCircle2 className="w-5 h-5 text-emerald-600" /> 
                     <span className="font-medium text-sm">Interested in Plot <strong className="text-emerald-900 text-lg ml-1">{formData.plot_interest}</strong></span>
                   </div>
                   <button 
                     type="button" 
                     onClick={() => setFormData(prev => ({...prev, plot_interest: ''}))}
                     className="text-emerald-600 hover:text-emerald-900 p-1"
                   >
                     <X className="w-4 h-4" />
                   </button>
                 </div>
              )}
              
              <button 
                type="submit"
                disabled={formStatus === 'submitting'}
                className="w-full bg-emerald-700 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-800 transition disabled:opacity-70 shadow-lg shadow-emerald-700/20 mt-4"
              >
                {formStatus === 'submitting' ? 'Submitting...' : 'Send Enquiry'}
              </button>
              
              {formStatus === 'success' && (
                <div className="p-4 bg-emerald-50 text-emerald-700 rounded-xl text-center font-bold flex items-center justify-center gap-2 animate-in fade-in slide-in-from-bottom-2">
                  <CheckCircle2 className="w-5 h-5" /> Enquiry sent! We'll call you shortly.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-neutral-950 text-neutral-400 py-12 px-6 text-center border-t border-neutral-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-2xl font-bold text-white mb-4">Dream City Buildtech</div>
          <p className="mb-8 max-w-md mx-auto leading-relaxed">
            Mansha Tola, Murtuza Manzil, 2nd Floor, <br/>
            Bettiah - Motihari Rd, Bihar 845438
          </p>
          <div className="text-sm">&copy; {new Date().getFullYear()} Dream City Buildtech Pvt. Ltd. All rights reserved.</div>
        </div>
      </footer>

      {/* ENQUIRY POPUP MODAL */}
      {isEnquiryModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-md transition-opacity animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden scale-100 transition-transform animate-in zoom-in-95 duration-300">
            <div className="p-6 bg-emerald-800 text-white flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">Enquire Now</h3>
                <p className="text-emerald-200 text-xs">Share your details for a callback</p>
              </div>
              <button 
                onClick={() => {
                  setIsEnquiryModalOpen(false);
                  setFormStatus('idle');
                }} 
                className="p-2 hover:bg-white/10 rounded-full transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-8">
              <form onSubmit={handleLeadSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-black text-neutral-400 mb-2 uppercase tracking-widest">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full px-5 py-4 rounded-xl bg-neutral-50 border border-neutral-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 outline-none transition font-bold text-neutral-800"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-neutral-400 mb-2 uppercase tracking-widest">Phone Number</label>
                  <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-5 py-4 rounded-xl bg-neutral-50 border border-neutral-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 outline-none transition font-bold text-neutral-800"
                    placeholder="Enter your 10-digit number"
                  />
                </div>
                
                {formData.plot_interest && (
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                      {formData.plot_interest.charAt(0)}
                    </div>
                    <div className="text-xs font-bold text-emerald-800">
                      Interested in Plot <span className="text-sm ml-1 font-black underline">{formData.plot_interest}</span>
                    </div>
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="w-full bg-emerald-700 text-white py-4 rounded-xl font-black text-lg hover:bg-emerald-800 transition disabled:opacity-70 shadow-lg shadow-emerald-700/20 mt-2"
                >
                  {formStatus === 'submitting' ? 'Sending...' : 'Request Callback'}
                </button>
                
                {formStatus === 'success' && (
                  <div className="p-4 bg-emerald-50 text-emerald-700 rounded-xl text-center font-bold flex items-center justify-center gap-2 animate-in fade-in slide-in-from-bottom-2">
                    <CheckCircle2 className="w-5 h-5" /> Thank you! We will call you soon.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING WHATSAPP BUTTON */}
      <a 
        href="https://wa.me/919876543210" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition duration-300 flex items-center justify-center group"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute right-full mr-4 bg-white text-neutral-900 px-4 py-2 rounded-xl text-sm font-bold shadow-lg opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
          Chat with us
        </span>
      </a>
    </div>
  );
}