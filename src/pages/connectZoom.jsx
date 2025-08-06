import React from "react";

export default function connectZoom() {
  const connectZoom = () => {
    const clientId = "Wbn0TMEnSmij1M7cYMG11w";
    const redirectUri = encodeURIComponent(
      "https://api.japaneseforme.com/"
    );
    const zoomURL = `https://zoom.us/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
    window.location.href = zoomURL;
  };
  return (
    <div className="h-screen flex  justify-center items-center">
      <button
        onClick={connectZoom}
        className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
      >
        Connect Zoom Account
      </button>
    </div>
  );
}