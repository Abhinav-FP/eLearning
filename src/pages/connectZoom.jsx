import React, { useEffect, useState } from "react";
import Listing from "./api/Listing";

export default function connectZoom() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const main = new Listing();
      const response = await main.checkZoomConnection();
      if (response?.data?.status) {
        setData(response.data.data);
      } else {
        setData(null);
      }
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
      setData(null);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const connectZoom = () => {
    const clientId = "HcOaR_0QJawBhl4GIXG7g";
    // const redirectUri = encodeURIComponent("https://api.japaneseforme.com/");
    const redirectUri = encodeURIComponent("https://api.japaneseforme.com/api/v1/zoom/oauth-callback");
    const zoomURL = `https://zoom.us/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
    window.location.href = zoomURL;
  };

  const maskToken = (token) => {
    if (!token) return '';
    return '*'.repeat(Math.max(token.length - 4, 0)) + token.slice(-4);
  };

  return (
    <div className="h-screen flex  justify-center items-center">
      {data && data?.access_token && data?.refresh_token ? (
        <div className="max-w-md mx-auto bg-white border border-green-300 rounded-xl shadow-md p-6 mt-10">
          <div className="flex items-center mb-4">
            <span className="text-green-600 text-xl mr-2">✅</span>
            <h2 className="text-lg font-semibold text-green-700">
              Zoom Account Connected
            </h2>
          </div>

          <div className="space-y-2 text-sm text-gray-800">
            <div className="flex justify-between">
              <span className="font-medium">Access Token:</span>
              <span>{maskToken(data?.access_token) || ""}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Refresh Token:</span>
              <span>{maskToken(data?.refresh_token) || ""}</span>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={connectZoom}
          className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
        >
          Connect Zoom Account
        </button>
      )}
    </div>
  );
}
