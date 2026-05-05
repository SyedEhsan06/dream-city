import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-950 text-neutral-400 py-12 px-6 text-center border-t border-neutral-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-2xl font-bold text-white mb-4">Dream City Buildtech</div>
        <address className="mb-8 max-w-md mx-auto leading-relaxed not-italic">
          2nd Floor, ManshaTola, Murtuza Manzil,<br/>
          Bettiah - Motihari Rd, Banuchapar,<br/>
          Bettiah, Tola Mansaraut, Bihar 845438
        </address>
        <div className="text-sm">&copy; {new Date().getFullYear()} Dream City Buildtech Pvt. Ltd. All rights reserved.</div>
      </div>
    </footer>
  );
};
