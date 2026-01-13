
import React from 'react';

interface VintageLabelProps {
  vintage: string;
  variety: string;
}

export const VintageLabel: React.FC<VintageLabelProps> = ({ vintage, variety }) => {
  return (
    <div className="flex flex-col items-center border-t border-b border-[#5c5c4d] py-4 my-8">
      <span className="text-sm font-black tracking-[0.3em] uppercase opacity-70 mb-1">{variety}</span>
      <h2 className="text-2xl font-black tracking-widest">{vintage}</h2>
    </div>
  );
};
