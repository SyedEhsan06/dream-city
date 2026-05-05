import React from 'react';
import Image from 'next/image';

export const WhatsAppButton: React.FC = () => {
  return (
    <a 
      href="https://wa.me/919876543210" 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 text-white rounded-full shadow-2xl hover:scale-110 transition duration-300 flex items-center justify-center group"
    >
      <Image src="/Whatsapp.svg" alt="Whatsapp" width={40} height={40} />
      <span className="absolute right-full mr-4 bg-white text-neutral-900 px-4 py-2 rounded-xl text-sm font-bold shadow-lg opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
        Chat with us
      </span>
    </a>
  );
};
