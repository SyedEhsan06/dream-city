import React from 'react';
import { X, CheckCircle2 } from 'lucide-react';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: { name: string; phone: string; plot_interest: string };
  setFormData: React.Dispatch<React.SetStateAction<{ name: string; phone: string; plot_interest: string }>>;
  handleLeadSubmit: (e: React.FormEvent) => Promise<void>;
  formStatus: 'idle' | 'submitting' | 'success';
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  formData,
  setFormData,
  handleLeadSubmit,
  formStatus
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-md transition-opacity  ">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden scale-100 transition-transform ">
        <div className="p-6 bg-emerald-800 text-white flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold">Enquire Now</h3>
            <p className="text-emerald-200 text-xs">Share your details for a callback</p>
          </div>
          <button 
            onClick={onClose} 
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
  );
};
