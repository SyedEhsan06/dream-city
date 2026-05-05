import React from 'react';
import { CheckCircle2, ShieldCheck, Map, Home as HomeIcon, Zap } from 'lucide-react';

interface QuickFindProps {
  searchSqft: string;
  setSearchSqft: (val: string) => void;
  searchResult: { count: number, message: string } | null;
  handleSearch: () => void;
  setIsEnquiryModalOpen: (val: boolean) => void;
}

export const QuickFind: React.FC<QuickFindProps> = ({
  searchSqft,
  setSearchSqft,
  searchResult,
  handleSearch,
  setIsEnquiryModalOpen
}) => {
  return (
    <section className="relative z-20 -mt-24 px-6 mb-24">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl border border-neutral-100 overflow-hidden flex flex-col md:flex-row">
        
        {/* Find Plot Form */}
        <div className="w-full md:w-1/3 p-8 lg:p-12 bg-white border-b md:border-b-0 md:border-r border-neutral-100">
          <h3 className="text-sm font-bold text-neutral-400 tracking-widest uppercase mb-1">Find Your</h3>
          <h2 className="text-3xl font-black text-neutral-900 mb-8">PLOT HERE</h2>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-xs font-bold text-neutral-500 mb-2 uppercase">State</label>
              <input type="text" value="Bihar" readOnly className="w-full border-b-2 border-neutral-200 py-2 text-neutral-900 font-bold focus:border-amber-500 outline-none bg-transparent cursor-default" />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-500 mb-2 uppercase">City</label>
              <input type="text" value="Bettiah" readOnly className="w-full border-b-2 border-neutral-200 py-2 text-neutral-900 font-bold focus:border-amber-500 outline-none bg-transparent cursor-default" />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-500 mb-2 uppercase">Min area (sqft)</label>
              <input 
                type="number" 
                value={searchSqft}
                onChange={(e) => setSearchSqft(e.target.value)}
                placeholder="e.g. 1200" 
                className="w-full border-b-2 border-neutral-200 py-2 text-neutral-900 font-bold focus:border-amber-500 outline-none bg-transparent transition-colors" 
              />
            </div>

            {searchResult && (
              <div className={`p-4 rounded-xl border font-medium animate-in fade-in zoom-in-95 ${searchResult.count > 0 ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'}`}>
                {searchResult.count > 0 ? (
                  <div>
                    <div className="font-bold text-lg mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      {searchResult.count} Plots Available!
                    </div>
                    <button type="button" onClick={() => document.getElementById('plots')?.scrollIntoView({ behavior: 'smooth' })} className="text-emerald-700 hover:text-emerald-900 font-bold text-sm underline underline-offset-2 transition-colors text-left">
                      View them on the Master Plan &rarr;
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="font-bold text-lg mb-1">No exact matches</div>
                    <p className="text-rose-700/80 mb-4 text-xs leading-relaxed">
                      {searchResult.message || `We couldn't find available plots matching ${searchSqft} sqft or more right now. We often do custom groupings.`}
                    </p>
                    <button type="button" onClick={() => setIsEnquiryModalOpen(true)} className="bg-rose-600 text-white px-4 py-2 rounded-lg font-bold text-xs hover:bg-rose-700 transition shadow-sm">
                      Contact Sales Team
                    </button>
                  </div>
                )}
              </div>
            )}

            {!searchResult || searchResult.count > 0 ? (
              <button type="button" onClick={handleSearch} className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 rounded-xl mt-4 transition shadow-lg shadow-amber-600/20">
                Search Plots
              </button>
            ) : null}
          </form>
        </div>

        {/* Value Props */}
        <div className="w-full md:w-2/3 p-8 lg:p-12 bg-neutral-50">
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-12">
            {[
              { icon: <ShieldCheck className="w-10 h-10" />, title: "PLOT", desc: "Comfort and convenience is the mantra for modern living and our plots give you exactly this. With underground water and electricity supplies already." },
              { icon: <Map className="w-10 h-10" />, title: "EMI FACILITY", desc: "Equated monthly installment, as the name suggests, is one part of the equally divided monthly outgoes to clear off an outstanding." },
              { icon: <HomeIcon className="w-10 h-10" />, title: "LOW COST", desc: "To stay healthy one needs a proper place to reside for the entire life and that is home. This is one important component of one's life." },
              { icon: <Zap className="w-10 h-10" />, title: "BRIGHT PLACE", desc: "At Dream City, we are all about plots, all about service, and most of all we are where your life happens!" }
            ].map((prop, index) => (
              <div key={index}>
                <div className="text-amber-600 mb-4">
                  {prop.icon}
                </div>
                <h4 className="text-lg font-black text-neutral-900 mb-3 uppercase tracking-wide">{prop.title}</h4>
                <p className="text-sm text-neutral-600 leading-relaxed">{prop.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
