import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-950 text-neutral-400 py-12 px-6 text-center border-t border-neutral-900">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center mb-6">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-16 h-16 object-contain mb-4 "
          />
          <div className="text-2xl font-bold text-white">
            Dream Park Buildtech
          </div>
        </div>
        <address className="mb-8 max-w-md mx-auto leading-relaxed not-italic">
          2nd Floor, ManshaTola, Murtuza Manzil,
          <br />
          Bettiah - Motihari Rd, Banuchapar,
          <br />
          Bettiah, Tola Mansaraut, Bihar 845438
        </address>
        <div className="text-sm flex flex-col md:flex-row items-center justify-center gap-2 mt-4 text-neutral-500">
          <span>
            &copy; {new Date().getFullYear()} Dream Park Buildtech Pvt. Ltd. All
            rights reserved.
          </span>
          <span className="hidden md:inline text-neutral-700">|</span>
          <span>
            Powered by{" "}
            <a
              href="https://sydinnovations.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-emerald-400 transition-colors duration-200 underline underline-offset-4 font-medium"
            >
              sydinnovations.com
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};
