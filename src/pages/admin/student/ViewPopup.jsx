import React from "react";
import Popup from "@/pages/common/Popup";

export default function ViewPopup({ isOpen, onClose, data, timezoneMappings }) {
  if (!data) return null;

  return (
    <Popup isOpen={isOpen} onClose={onClose} size="max-w-[510px]">
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-[#CC2828] mb-4">User Details</h3>

        <div className="flex items-center gap-4">
          <img
            src={data?.profile_photo || "/Placeholder.png"}
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover border border-gray-300"
          />
          <div className="capitalize">
            <p className="text-lg font-normal">{data?.name}</p>
            <p className="text-sm text-gray-500">{data?.role}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 text-sm">
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Email:</span>
            <span>{data?.email}</span>
          </div>
          {/* <div className="flex justify-between">
            <span className="font-medium text-gray-700">Phone:</span>
            <span>{data.phone || "N/A"}</span>
          </div> */}
          {/* <div className="flex justify-between capitalize">
            <span className="font-medium text-gray-700 ">Nationality:</span>
            <span>{data?.nationality || "N/A"}</span>
          </div> */}
          <div className="flex justify-between capitalize">
            <span className="font-medium text-gray-700 ">Time Zone:</span>
            <span>{timezoneMappings[data?.time_zone] || "N/A"}</span>
          </div>
          <div className="flex justify-between capitalize">
            <span className="font-medium text-gray-700">Email Verified:</span>
            <span>{data?.email_verify ? "Yes" : "No"}</span>
          </div>
          <div className="flex justify-between capitalize">
            <span className="font-medium text-gray-700">Blocked:</span>
            <span>{data?.block ? "Yes" : "No"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Created At:</span>
            <span>{new Date(data?.createdAt).toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Updated At:</span>
            <span>{new Date(data?.updatedAt).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </Popup>
  );
}
