'use client';
import { useState } from 'react';
import Image from 'next/image';
import { MdClose, MdOutlinePlayCircle } from 'react-icons/md';
import EmilyCarter from "../Assets/Images/emily-carter.png";

function getYouTubeID(url) {
    const regExp = /(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/)([^&\n?#]+)/;
    const match = url && url?.match(regExp);
    return match && match[1] ? match[1] : null;
}

function getVimeoID(url) {
    const regExp = /vimeo\.com\/(\d+)/;
    const match = url && url?.match(regExp);
    return match && match[1] ? match[1] : null;
}

function getVideoPlatform(url) {
    if (url && url?.includes('youtube.com') || url?.includes('youtu.be')) return 'youtube';
    if (url && url?.includes('vimeo.com')) return 'vimeo';
    return 'unknown';
}


export default function VideoModalPlayer({ video, image, name, divClass, imgClass, btnClass }) {
     const [isOpen, setIsOpen] = useState(false);
    const platform = getVideoPlatform(video);
    const youTubeId = getYouTubeID(video);
    const vimeoId = getVimeoID(video);

    let videoSrc = '';
    if (platform === 'youtube' && youTubeId) {
        videoSrc = `https://www.youtube.com/embed/${youTubeId}?autoplay=1`;
    } else if (platform === 'vimeo' && vimeoId) {
        videoSrc = `https://player.vimeo.com/video/${vimeoId}?autoplay=1`;
    }

    return (
        <>
            <div className={divClass}>
                <Image
                    className={imgClass}
                    src={image || EmilyCarter}
                    alt={name || "video"}
                    width={530}
                    height={311}
                />
                <button
                    onClick={() => setIsOpen(true)}
                    className={btnClass}
                >
                    <MdOutlinePlayCircle size={80} />
                </button>
            </div>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0  bg-opacity-70 flex items-center justify-center z-50">
                    <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-2 right-2 text-white text-2xl z-10 cursor-pointer "
                        >
                            <MdClose size={24} />
                        </button>
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
                    </div>
                </div>
            )}
        </>
    );
}
