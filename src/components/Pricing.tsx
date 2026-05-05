import React from 'react';
import { CheckCircle2, ShieldCheck } from 'lucide-react';

interface PricingProps {
  onEnquireClick: () => void;
}

export const Pricing: React.FC<PricingProps> = ({ onEnquireClick }) => {
  return (
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
            onClick={onEnquireClick}
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
          <div className="text-xl font-black text-white mb-2">Dream Park Buildtech Pvt. Ltd.</div>
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
  );
};
