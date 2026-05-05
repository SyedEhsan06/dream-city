import React from 'react';
import { MapPin, Phone, CheckCircle2, X } from 'lucide-react';

interface ContactSectionProps {
  formData: { name: string; phone: string; plot_interest: string };
  setFormData: React.Dispatch<React.SetStateAction<{ name: string; phone: string; plot_interest: string }>>;
  handleLeadSubmit: (e: React.FormEvent) => Promise<void>;
  formStatus: 'idle' | 'submitting' | 'success';
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  formData,
  setFormData,
  handleLeadSubmit,
  formStatus
}) => {
  return (
    <section id="location" className="py-24 px-6 bg-neutral-50 relative">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row relative z-10">
        
        <div className="w-full md:w-5/12 bg-emerald-800 text-white flex flex-col">
          <div className="p-10 flex-1">
            <h3 className="text-3xl font-bold mb-4">Book a Site Visit</h3>
            <p className="text-emerald-200 mb-8 leading-relaxed">
              Drop your details below and our team will get back to you with exact pricing, availability, and to schedule a tour.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-700 rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <div className="text-sm text-emerald-300 font-medium tracking-wide mb-1">Our Location</div>
                  <div className="font-medium text-emerald-50 leading-relaxed">2nd Floor, ManshaTola, Murtuza Manzil,<br/>Bettiah - Motihari Rd, Banuchapar,<br/>Bettiah, Tola Mansaraut, Bihar 845438</div>
                </div>
              </div>
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
  );
};
