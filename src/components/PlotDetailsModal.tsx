import React from "react";
import { X } from "lucide-react";

interface PlotDetailsModalProps {
  selectedPlot: { id: string; sqft: number; status: string } | null;
  onClose: () => void;
  onEnquire: (plotId: string) => void;
}

export const PlotDetailsModal: React.FC<PlotDetailsModalProps> = ({
  selectedPlot,
  onClose,
  onEnquire,
}) => {
  if (!selectedPlot) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-sm transition-opacity">
      <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden scale-100 transition-transform">
        <div className="p-8 text-white flex justify-between items-start bg-[#1b5e20]">
          <div>
            <div className="text-white/80 font-bold text-xs tracking-wider mb-1 uppercase">
              Plot Details
            </div>
            <h3 className="text-4xl font-black">{selectedPlot.id}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-black/10 hover:bg-black/20 rounded-full transition backdrop-blur-sm"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-100">
              <div className="text-neutral-400 text-xs font-bold mb-1 uppercase">
                Area
              </div>
              <div className="font-bold text-xl text-neutral-900">
                {selectedPlot.sqft} sqft
              </div>
            </div>
            <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-100">
              <div className="text-neutral-400 text-xs font-bold mb-1 uppercase">
                Status
              </div>
              <div className="font-bold text-xl text-emerald-700 capitalize">
                {selectedPlot.status}
              </div>
            </div>
          </div>

          <div>
            <button
              onClick={() => onEnquire(selectedPlot.id)}
              className="block w-full text-center bg-emerald-700 text-white py-4 rounded-xl font-bold hover:bg-emerald-800 transition shadow-lg shadow-emerald-700/20"
            >
              Enquire Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
