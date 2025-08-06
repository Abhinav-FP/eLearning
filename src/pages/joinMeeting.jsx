import React from "react";

export default function joinMeeting() {
  return (
    <div className="h-screen flex  justify-center items-center">
      <a
        href={
          "https://us06web.zoom.us/j/88633999812?pwd=LgNkzaxmja3YkHFtBW4XZvFgxkU2Ez.1"
        }
        target="blank"
        className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
      >
        Connect Zoom Account
      </a>
    </div>
  );
}