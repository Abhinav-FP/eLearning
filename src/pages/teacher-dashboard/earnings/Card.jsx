import React from "react";

export default function Card({ label, value, icon }) {
  return (
    <div className="flex justify-between py-4 lg:py-6 px-4 xl:px-5 rounded-xl border border-[rgba(204,40,40,0.2)] shadow-sm">
      <div>
        <p className="text-[#535353] text-lg xl:text-lg font-medium  tracking-[-0.04em]">{label}</p>
        <p className="text-[#CC2828] text-xl lg:text-[30px] font-bold mt-3 tracking-[-0.04em]">{value == "N/A" ? "N/A" : `$${value}`}</p>
      </div>
      <div className="bg-[rgba(204,40,40,.1)] flex items-center justify-center p-2 rounded-md w-[60px] h-[60px] border border-[rgba(204,40,40,.5)]">{icon}</div>
    </div>
  );
}