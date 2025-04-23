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

export default function VideoModalPlayer({ items }) {
    const [isOpen, setIsOpen] = useState(false);
    const videoId = getYouTubeID(items?.intro_video);

    return (
        <>
            <div className="relative lg:h-[311px]">
                <Image
                    className="w-full h-[265px] sm:h-[295px]  md:h-[186px] lg:h-[311px] rounded-[6px] md:rounded-[10px]"
                    src={EmilyCarter}
                    alt={items?.Title}
                    width={530}
                    height={311}
                />
                <button
                    onClick={() => setIsOpen(true)}
                    className="absolute top-1/2 left-0 right-0 mx-auto -translate-y-1/2 text-white hover:text-[#CC2828] w-[85px] text-center"
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
                            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
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
