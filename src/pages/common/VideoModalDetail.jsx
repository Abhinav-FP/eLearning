"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { MdClose, MdOutlinePlayCircle, MdEdit } from "react-icons/md";
import EmilyCarter from "../Assets/Images/NoVideo.jpg";
import Listing from "../api/Listing";
import toast from "react-hot-toast";

function getYouTubeID(url) {
  const regExp = /(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/)([^&\n?#]+)/;
  const match = url && url?.match(regExp);
  return match && match[1] ? match[1] : null;
}

function getVimeoID(url) {
  if (!url || !url.includes("vimeo.com")) return null;
  const cleanUrl = url.split("vimeo.com/")[1]?.split("?")[0];
  if (!cleanUrl) return null;
  const parts = cleanUrl.split("/");
  if (parts.length === 1) {
    // Public video
    return parts[0];
  } else if (parts.length >= 2) {
    // Private/unlisted video
    return `${parts[0]}/${parts[1]}`;
  }
  return null;
}

function getVideoPlatform(url) {
  if ((url && url?.includes("youtube.com")) || url?.includes("youtu.be"))
    return "youtube";
  if (url && url?.includes("vimeo.com")) return "vimeo";
  return "unknown";
}

export default function VideoModalDetail({ video, image, name, divClass, imgClass, btnClass, iconClass, isAdmin = false, teacherId, AdminTteacher }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(video || "");
  const [loading, setLoading] = useState(false);
  const platform = getVideoPlatform(video);
  const [thumbnail, setThumbnail] = useState(EmilyCarter);
  const youTubeId = getYouTubeID(video);
  const vimeoId = getVimeoID(video);
  // console.log("vineoId", vimeoId);

  let videoSrc = "";

  if (platform === "youtube" && youTubeId) {
    videoSrc = `https://www.youtube.com/embed/${youTubeId}?autoplay=1&hl=ja`;
  } else if (platform === "vimeo" && video) {
    const path = video.split("vimeo.com/")[1]?.split("?")[0] || "";
    const parts = path.split("/");

    if (parts.length === 1) {
      // Public video
      const videoId = parts[0];
      videoSrc = `https://player.vimeo.com/video/${videoId}?autoplay=1`;
    } else if (parts.length >= 2) {
      // Private/unlisted video
      const [videoId, hash] = parts;
      videoSrc = `https://player.vimeo.com/video/${videoId}?h=${hash}&autoplay=1`;
    }
  }

  useEffect(() => {
    if (platform === "youtube" && youTubeId) {
      setThumbnail(
        `https://img.youtube.com/vi/${youTubeId}/hqdefault.jpg?cc_load_policy=0&hl=ja`
      );
    } else if (platform === "vimeo" && vimeoId) {
      fetch(
        `https://vimeo.com/api/oembed.json?url=https://vimeo.com/${vimeoId}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data?.thumbnail_url) setThumbnail(data.thumbnail_url);
        })
        .catch((err) => {
          console.error("Failed to load Vimeo thumbnail:", err);
          setThumbnail(EmilyCarter); // fallback
        });
    }
  }, [platform, youTubeId, vimeoId]);
  // console.log("videoSrc",videoSrc);

  const handleSubmit = async () => {
    try {
      if (editValue.trim() === "") {
        toast.error("Video URL cannot be empty");
        return;
      }
      if (editValue === video) {
        toast.error("No changes made to the video URL");
        return;
      }
      setLoading(true);
      const main = new Listing();
      const response = await main.AdminTeacherVideoChange({
        id: teacherId,
        link: editValue,
      });
      if (response?.data?.status) {
        toast.success(response?.data?.message);
        AdminTteacher();
        setIsOpen(false);
      } else {
        toast.error(response?.data?.message);
      }
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      toast.error(error?.response?.data?.message || "An error occured");
      setLoading(false);
    }
  };

  return (
    <>
      {/* <div className={divClass}>
                <Image
                    className={'object-cover ' + imgClass}
                    src={thumbnail}
                    alt={name || "video thumbnail"}
                    width={527}
                    height={311}
                />
                <button
                    onClick={() => setIsOpen(true)}
                    className={btnClass}
                >
                    <MdOutlinePlayCircle className={iconClass} size={80} />
                </button>
            </div> */}
      <div className={`${divClass} relative`}>
        <Image
          className={"object-cover " + imgClass}
          src={thumbnail}
          alt={name || "video thumbnail"}
          width={527}
          height={311}
        />

        {isAdmin && (
          <button
            type="button"
            onClick={() => {
              setIsEditing(true);
              setIsOpen(true);
            }}
            className="absolute top-2 right-2 p-1 text-white bg-[#CC2828] rounded-full cursor-pointer"
          >
            <MdEdit size={24} />
          </button>
        )}

        {/* Play button center */}
        {video && (
          <button
            onClick={() => {
              setIsEditing(false);
              setIsOpen(true);
            }}
            className={btnClass}
          >
            <MdOutlinePlayCircle className={iconClass} size={80} />
          </button>
        )}
      </div>

      {/* Modal */}
      {isOpen && (
        <div
          className={`fixed inset-0  bg-opacity-70 flex items-center justify-center ${
            isEditing ? "bg-gray-900/20" : ""
          } z-50`}
        >
          <div
            className={`relative w-full max-w-4xl ${
              isEditing ? "bg-white" : "bg-black aspect-video"
            } rounded-lg overflow-hidden`}
          >
            <button
              onClick={() => setIsOpen(false)}
              className={`absolute top-2 right-2 ${
                isEditing ? "text-black" : "text-white"
              }  text-2xl z-10 cursor-pointer`}
            >
              <MdClose size={24} />
            </button>
            {isEditing ? (
              <div className="space-y-4 p-4 ">
                {/* Label + Input */}
                <div className="flex flex-col space-y-1">
                  <label
                    htmlFor="videoUrl"
                    className="text-sm font-semibold text-red-700"
                  >
                    Video URL
                  </label>
                  <input
                    id="videoUrl"
                    type="text"
                    value={editValue}
                    onChange={(e) => {
                      setEditValue(e.target.value);
                    }}
                    placeholder="Enter new video URL"
                    className="w-full rounded-lg border border-red-300 bg-white p-2
                                        text-gray-900 focus:outline-none focus:ring-2
                                        focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                {/* Submit button */}
                <button
                  onClick={handleSubmit}
                  className="w-full px-4 py-2 bg-red-600 text-white font-medium
                                       rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            ) : (
              <iframe
                width="100%"
                height="100%"
                src={videoSrc}
                title="YouTube video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            )}
          </div>
        </div>
      )}
    </>
  );
}
