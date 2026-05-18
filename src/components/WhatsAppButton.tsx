import React, { useState, useEffect } from "react";
import Image from "next/image";

export const WhatsAppButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Tease the tooltip every 8 seconds for a 2-second duration
    const interval = setInterval(() => {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3000);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <a
      href="https://wa.me/919508724886"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 text-white rounded-full shadow-2xl hover:scale-110 transition duration-300 flex items-center justify-center group"
    >
      <div className="relative">
        <Image
          src="/Whatsapp.svg"
          alt="Whatsapp"
          width={50}
          height={50}
          className="drop-shadow-lg"
        />
        {/* Pulsing effect to draw attention */}
        <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-20 group-hover:hidden"></div>
      </div>

      <span
        className={`absolute right-full mr-4 bg-white text-neutral-900 px-4 py-2 rounded-xl text-sm font-bold shadow-2xl border border-neutral-100 transition-all duration-500 whitespace-nowrap pointer-events-none
        ${showTooltip ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0"}`}
      >
        Chat with us
        {/* Little arrow for the tooltip */}
        <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-white rotate-45 border-r border-t border-neutral-100"></div>
      </span>
    </a>
  );
};
