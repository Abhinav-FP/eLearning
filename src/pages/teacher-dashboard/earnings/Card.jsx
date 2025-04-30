import React from "react";

export default function Card({ label, value, icon }) {
  return (
    <div className="flex justify-between py-4 px-6 rounded-xl border border-[#CC2828]/20 shadow-sm">
      <div>
        <p className="text-[#535353] text-lg lg:text-xl font-medium">{label}</p>
        <p className="text-[#CC2828] text-xl lg:text-3xl font-bold mt-1">${value}</p>
      </div>
      <div className="bg-[#CC2828]/10 p-3 rounded-md w-12 h-12 border border-[#CC2828]/10">{icon}</div>
    </div>
  );
}