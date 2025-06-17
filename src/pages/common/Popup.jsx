import React, { useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";

const Popup = ({ isOpen, onClose, children, size }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null; // Render nothing if the popup is not open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900/20 z-50 px-3">
      <div className={`bg-white rounded-lg w-full shadow-lg ${size}`}>
        <div className="p-4 text-gray-800 overflow-y-auto max-h-[80vh] relative">
          <button
            onClick={onClose}
            className="cursor-pointer text-gray-600 hover:text-gray-800 focus:outline-none absolute right-4 top-3 z-[2]"
          >
            <IoCloseSharp size={24} />
          </button>

          {children}
        </div>
      </div>
    </div>
  );
};
export default Popup;