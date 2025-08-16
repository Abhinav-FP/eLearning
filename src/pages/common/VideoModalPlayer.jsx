'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { MdClose, MdOutlinePlayCircle } from 'react-icons/md';
import EmilyCarter from "../Assets/Images/thumbnail.png";

function getYouTubeID(url) {
    const regExp = /(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/)([^&\n?#]+)/;
    const match = url && url?.match(regExp);
    return match && match[1] ? match[1] : null;
}

function getVimeoID(url) {
    if (!url || !url.includes('vimeo.com')) return null;
    const cleanUrl = url.split('vimeo.com/')[1]?.split('?')[0];
    if (!cleanUrl) return null;
    const parts = cleanUrl.split('/');
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
    if (url && url?.includes('youtube.com') || url?.includes('youtu.be')) return 'youtube';
    if (url && url?.includes('vimeo.com')) return 'vimeo';
    return 'unknown';
}

export default function VideoModalPlayer({ video, image, name, divClass, imgClass, btnClass, iconClass }) {
    const [isOpen, setIsOpen] = useState(false);
    const platform = getVideoPlatform(video);
    const [thumbnail, setThumbnail] = useState(EmilyCarter);
    const youTubeId = getYouTubeID(video);
    const vimeoId = getVimeoID(video);

    let videoSrc = '';
    if (platform === 'youtube' && youTubeId) {
        videoSrc = `https://www.youtube.com/embed/${youTubeId}?autoplay=1&hl=ja`;
    } else if (platform === 'vimeo' && vimeoId) {
        videoSrc = `https://player.vimeo.com/video/${vimeoId}?autoplay=1`;
    }

    // useEffect(() => {
    //         if (platform === 'youtube' && youTubeId) {
    //             setThumbnail(`https://img.youtube.com/vi/${youTubeId}/hqdefault.jpg?cc_load_policy=0&hl=ja`);
    //         } else if (platform === 'vimeo' && vimeoId) {
    //             fetch(`https://vimeo.com/api/oembed.json?url=https://vimeo.com/${vimeoId}`)
    //                 .then(res => res.json())
    //                 .then(data => {
    //                     if (data?.thumbnail_url) setThumbnail(data.thumbnail_url);
    //                 })
    //                 .catch(err => {
    //                     console.error("Failed to load Vimeo thumbnail:", err);
    //                     setThumbnail(EmilyCarter); // fallback
    //                 });
    //         }
    //     }, [platform, youTubeId, vimeoId]);

    useEffect(() => {
        if (platform === 'youtube' && youTubeId) {
            setThumbnail(`https://img.youtube.com/vi/${youTubeId}/hqdefault.jpg`);
        } else if (platform === 'vimeo' && vimeoId) {
            const fetchThumbnail = async () => {
                try {
                    const res = await fetch(
                        `https://vimeo.com/api/oembed.json?url=https://vimeo.com/${vimeoId}&t=${Date.now()}`
                    );
                    const data = await res.json();
                    if (data?.thumbnail_url) {
                        setThumbnail(data.thumbnail_url);
                    }
                } catch (err) {
                    console.error("Failed to load Vimeo thumbnail:", err);
                    setThumbnail(EmilyCarter);
                }
            };
            fetchThumbnail();
        }
    }, [platform, youTubeId, vimeoId]);


    return (
        <>
            <div className={divClass}>
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
            </div>

            {/* Modal */}
            {/* {isOpen && (
                    <div className="fixed inset-0  bg-opacity-70 flex items-center justify-center z-50">
                        <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-2 right-2 text-white text-2xl z-10 cursor-pointer "
                            >
                                <MdClose  size={24} />
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
                )} */}
        </>
    );
}
