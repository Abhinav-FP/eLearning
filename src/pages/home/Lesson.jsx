import React, { use, useEffect, useState } from "react";
import Heading from "../common/Heading";
import Listing from "../api/Listing";
import VideoModalPlayer from "../common/VideoModalPlayer";
import Link from "next/link";
import { formatMultiPrice } from "@/components/ValueDataHook";
import { useRole } from "@/context/RoleContext";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { BestTeacherLoader } from "@/components/Loader";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { MdClose } from 'react-icons/md';
import Image from "next/image";
import NoVideo from "../Assets/Images/NoVideo.jpg";
import { Autoplay } from 'swiper/modules'; // Import Autoplay module


export default function Lesson({ title }) {
    const { user } = useRole();
    const router = useRouter();
    const [video, setvideo] = useState([]);
    const [loading, setLoading] = useState(false);

    const TeacherVideos = async () => {
        try {
            setLoading(true);
            const main = new Listing();
            const response = await main.HomeTeacherVideo();
            setvideo(response?.data?.data);
        } catch (error) {
            console.log("error", error);
        }
        setLoading(false);
    };
    useEffect(() => {
        TeacherVideos();
    }, []);

    const [currentVideo, setCurrentVideo] = useState(null);

    function getVideoPlatform(url) {
        if (!url) return 'unknown';
        if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
        if (url.includes('vimeo.com')) return 'vimeo';
        return 'unknown';
    }

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

    const platform = getVideoPlatform(currentVideo?.intro_video);
    const youTubeId = getYouTubeID(currentVideo?.intro_video);
    const vimeoId = getVimeoID(currentVideo?.intro_video);

    let videoSrc = '';

    if (platform === 'youtube' && youTubeId) {
        videoSrc = `https://www.youtube.com/embed/${youTubeId}?autoplay=1&hl=ja`;
    } else if (platform === 'vimeo' && currentVideo?.intro_video) {
        const path = currentVideo?.intro_video.split('vimeo.com/')[1]?.split('?')[0] || '';
        const parts = path.split('/');

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

    //     useEffect(() => {
    //     if (currentVideo) {
    //         document && document.body.classList.add('overflow-hidden');
    //     } else {
    //         document && document.body.classList.remove('overflow-hidden');
    //     }
    // }, [currentVideo]);

    // console.log("video",video);   

    return (
        <>
            <div className="py-[40px] md:py-[60px] lg:py-[80px] xl:py-[100px] ">
                <div className="mx-auto container sm:container md:container lg:container xl:max-w-[1230px] px-4">
                    <Heading classess={'text-[#1E1E1E] mb-[30px] lg:mb-[40px] max-w-[834px] mx-auto text-center '} title={title} />
                    <div className="space-y-3">
                        {loading ? (
                            <div className="flex">
                                <BestTeacherLoader rows={3} />
                            </div>
                        ) : video && video?.length === 0 ?(
                            <div className="w-full text-center py-8 text-gray-500 text-lg">
                                No teachers found
                            </div>
                        ) : (
                            <Swiper
                                modules={[Autoplay]}
                                spaceBetween={10}
                                autoplay={{
                                    delay: 2500, // Delay in milliseconds between slides
                                    disableOnInteraction: false, // Keep autoplay running even after user interaction
                                }}
                                breakpoints={{
                                    0: {
                                        slidesPerView: 1, // mobile
                                    },
                                    768: {
                                        slidesPerView: 2, // tablet
                                    },
                                    1260: {
                                        slidesPerView: 3, // desktop
                                    },
                                }}
                            >
                                {video && video?.map((items, i) => (
                                    <SwiperSlide key={i}>
                                        <div className="bg-white border teacher_box border-[rgba(56,121,117,0.2)] rounded-[8px] lg:rounded-[13px] p-3 md:p-4 lg:p-3 h-full">

                                            {!items?.intro_video || items?.intro_video === "" ?
                                                <div>
                                                    <Image
                                                        className="w-full !h-[205px] md:!h-[205px] rounded-[4px] md:rounded-[6px] object-cover"
                                                        src={NoVideo}
                                                        alt={"No Video Image"}
                                                        width={527}
                                                        height={311}
                                                    />
                                                </div>
                                                :
                                                <div onClick={() => { setCurrentVideo(items) }}>
                                                    <VideoModalPlayer
                                                        video={items?.intro_video}
                                                        image={items?.userId?.profile_photo}
                                                        name={items?.userId?.name}
                                                        divClass="relative md:!h-[205px]"
                                                        imgClass="w-full !h-[205px] md:!h-[205px] rounded-[4px] md:rounded-[6px] object-cover"
                                                        btnClass="absolute top-1/2 left-0 right-0 mx-auto -translate-y-1/2 text-white hover:text-[#CC2828] w-[85px] text-center cursor-pointer"
                                                    />
                                                </div>
                                            }


                                            <Link href={`/teacher/${items?._id}`}>
                                                <div className="py-3 border-b border-[rgba(204,40,40,.2)] border-opacity-20 flex flex-wrap -mx-2 items-center">
                                                    <div className="w-8/12 px-2">
                                                        <h3 className="font-bold text-base lg:text-lg -tracking-[0.03em] m-0 text-[#000000]">
                                                            {items.userId.name}

                                                        </h3>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center pt-4 lg:pt-5">
                                                    <div className="w-6/12 text-black lg:w-6/12">
                                                        <span className="text-black text-xs xl:text-sm -tracking-[0.03em] text-sm">
                                                            Lesson from
                                                        </span>
                                                        <div className="text-black font-bold text-base -tracking-[0.03em]">
                                                            {items?.lowestLesson.price &&
                                                                `${formatMultiPrice(items?.lowestLesson.price, 'USD')}`}
                                                        </div>
                                                    </div>
                                                    <div className="w-6/12 lg:w-6/12 text-right">
                                                        <button
                                                            className="font-medium cursor-pointer rounded-full py-2 bg-[#CC2828] hover:bg-[#ad0e0e] text-white text-sm lg:text-base py-2.5 px-2 lg:px-4 xl:px-6"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                e.preventDefault();
                                                                if (!user) {
                                                                    toast.error('Please login first');
                                                                    const redirectUrl = encodeURIComponent(`/#lesson`);
                                                                    router.push(`/login?redirect=${redirectUrl}`);
                                                                } else if (user?.role !== 'student') {
                                                                    toast.error('Only students can book lessons');
                                                                } else {
                                                                    router.push(`/teacher/${items?._id}?book=true`);
                                                                }
                                                            }}
                                                        >
                                                            Book a Lesson
                                                        </button>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        )}

                        {currentVideo && videoSrc && (
                            <div className="fixed px-4 lg:px-0 inset-0  bg-opacity-70 flex items-center justify-center z-50 w-full h-full flex items-center   ">
                                <div className=" fixed top-0 left-0 w-full h-full bg-[#0009]" onClick={() => setCurrentVideo(null)}></div>
                                <button
                                    onClick={() => setCurrentVideo(null)}
                                    className="absolute top-4 right-4 text-white text-2xl z-10 cursor-pointer " >
                                    <MdClose size={24} />
                                </button>
                                <div className="relative !z-10 max-h-[80vh]   w-full flex items-center justify-center">
                                    <div className="relative w-full max-w-4xl aspect-video h-full  ">
                                        <iframe
                                            width="100%"
                                            // src={`https://www.youtube.com/embed/IC_2jSsWpZk?si=Di41pFm5yXaadeHv`}
                                            // src={currentVideo?.intro_video?.includes('youtube') ?
                                            //      `https://www.youtube.com/embed/${getYouTubeID(currentVideo.intro_video)}?autoplay=1&hl=ja` : 
                                            //      `https://player.vimeo.com/video/${getVimeoID(currentVideo.intro_video)}?autoplay=1`
                                            // }
                                            src={videoSrc}
                                            // title="YouTube video"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="w-full h-fulls min-h-[230px] sm:min-h-[300px] lg:min-h-[500px] "
                                        ></iframe>
                                    </div>
                                </div>
                            </div>
                        )}


                    </div>
                </div>
            </div>
        </>
    )
};