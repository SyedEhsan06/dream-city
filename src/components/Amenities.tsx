import React from 'react';
import { Shield, Zap, Droplets, Home as HomeIcon, Trees, Route as Road, CheckCircle2, Navigation } from 'lucide-react';

export const Amenities: React.FC = () => {
  const amenitiesList = [
    { icon: <Shield className="w-8 h-8" />, title: "24/7 Security", desc: "Gated community with CCTV" },
    { icon: <Zap className="w-8 h-8" />, title: "Electricity", desc: "Underground cabling" },
    { icon: <Droplets className="w-8 h-8" />, title: "Water Supply", desc: "24x7 water connection" },
    { icon: <HomeIcon className="w-8 h-8" />, title: "Drainage", desc: "Modern sewage system" },
    { icon: <Trees className="w-8 h-8" />, title: "Lush Parks", desc: "Landscaped green areas" },
    { icon: <Road className="w-8 h-8" />, title: "Wide Roads", desc: "40ft & 25ft internal roads" },
    { icon: <CheckCircle2 className="w-8 h-8" />, title: "Clear Title", desc: "100% verified documents" },
    { icon: <Navigation className="w-8 h-8" />, title: "Connectivity", desc: "Right next to Highway" },
  ];

  return (
    <section id="highlights" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">World-Class Amenities</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto text-lg">Designed to provide a secure, comfortable, and modern lifestyle for you and your family.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {amenitiesList.map((item, i) => (
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

      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          <div className="bg-white p-2 border border-neutral-200 shadow-sm">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img 
                src="/img1.jpeg" 
                alt="Dream City Project View" 
                className="w-full h-full object-cover block"
              />
            </div>
          </div>
          <div className="bg-white p-2 border border-neutral-200 shadow-sm">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img 
                src="/img2.jpeg" 
                alt="Dream City Landscape" 
                className="w-full h-full object-cover block"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
