import Popup from "@/pages/common/Popup";
import React, { useState } from "react";
import { BiVideo } from "react-icons/bi";
import { FaVideo } from "react-icons/fa";

export default function ZoomPopup({ zoom, onClose }) {
  console.log("zoom data:", zoom);
  const chatMessages = JSON.parse(zoom?.chat || "[]");
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <div
        className="flex items-center gap-2 px-3 py-1.5 bg-blue-100 rounded-lg cursor-pointer hover:bg-blue-200 transition-colors duration-200"
        onClick={() => setShowPopup(true)}
        role="button"
        tabIndex={0}
      >
        <FaVideo className="text-blue-600 w-5 h-5" />
        <span className="text-blue-700 font-semibold text-sm select-none">Zoom</span>
      </div>



      {showPopup &&
        <Popup isOpen={showPopup} onClose={() => setShowPopup(false)} size={"max-w-[700px]"}>

          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Zoom lecture Video </h2>
          </div>

          {/* Meeting Info */}
          <div>
            <span className="font-semibold text-gray-700">Meeting ID:</span> {zoom.meetingId}
          </div>
          {zoom.download?.length > 0 && (
            <div>
              <span className="font-semibold text-gray-700">Recordings:</span>
              <ul className="list-disc list-inside space-y-1 mt-1">
                {zoom.download.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 underline"
                    >
                      Download Video {index + 1}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* Chat Messages */}
          <div className="mt-6">
            <div className="border rounded-lg p-4   bg-gray-100 space-y-3">
              {chatMessages.length === 0 ? (
                <p className="text-gray-500 text-sm">No chat available.</p>
              ) : (
                chatMessages.map((chat, index) => {
                  const isTeacher = chat.name?.toLowerCase().includes("teacher");
                  return (
                    <div className={`flex flex-col ${isTeacher ? "items-start" : "items-end"} mb-4`}>
                      <div className={`px-4 py-2 rounded-lg ${isTeacher ? "bg-[#CC2828] text-white " : "bg-[#CC2828] text-white"}`}>
                        <p className="text-sm whitespace-pre-line">{chat.message.replaceAll("\\r", "")}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-xs text-black ">
                        <div className="font-semibold">{chat.name?.replace(":", "")}</div>
                        <span className={`${isTeacher ? "text-balck" : "text-black"}`}>{chat.time}</span>
                      </div>
                    </div>


                  );
                })
              )}
            </div>
          </div>
        </Popup>
      }
    </>

  );
}
