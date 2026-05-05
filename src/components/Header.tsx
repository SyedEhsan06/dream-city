import React from 'react';

interface HeaderProps {
  onEnquireClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onEnquireClick }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-emerald-900 tracking-tight">
          Dream City Buildtech
        </div>
        <nav className="hidden md:flex gap-6 items-center font-medium text-sm text-neutral-600">
          <a href="#plots" className="hover:text-emerald-700 transition">Available Plots</a>
          <a href="#highlights" className="hover:text-emerald-700 transition">Highlights</a>
          <a href="#location" className="hover:text-emerald-700 transition">Location</a>
        </nav>
        <button 
          onClick={onEnquireClick}
          className="bg-emerald-700 text-white px-5 py-2 rounded-full font-medium hover:bg-emerald-800 transition"
        >
          Enquire Now
        </button>
      </div>
    </header>
  );
};
