import React, { useEffect, useState } from "react";
import Heading from "../common/Heading";
import Listing from "../api/Listing";
import VideoModalPlayer from "../common/VideoModalPlayer";
import Link from "next/link";
import { formatMultiPrice } from "@/components/ValueDataHook";
export default function Lesson({ title }) {

    const [video, setvideo] = useState([]);

    const TeacherVideos = async () => {
        try {
            const main = new Listing();
            const response = await main.HomeTeacherVideo();
            setvideo(response?.data?.data);
        } catch (error) {
            console.log("error", error);
        }
    };
    useEffect(() => {
        TeacherVideos();
    }, []);

    return (
        <>
            <div className="py-[40px] md:py-[60px] lg:py-[80px] xl:py-[100px] ">
                <div className="mx-auto container sm:container md:container lg:container xl:max-w-[1230px] px-4">
                    <Heading classess={'text-[#1E1E1E] mb-[30px] lg:mb-[40px] max-w-[834px] mx-auto text-center '} title={title} />
                    <div className="flex flex-wrap -mx-2.5 space-y-3">
                        {
                            video && video?.map((items, i) => (

                                <div className="w-full md:w-6/12 px-2.5" key={i}>
                                    <div id={i} className="bg-[#EFD1D1] border border-[rgba(56,121,117,0.2)]  rounded-[10px] lg:rounded-[20px] p-4 md:p-[20px] lg:p-[30px]">
                                        <VideoModalPlayer video={items?.intro_video}
                                            image={items?.userId?.profile_photo}
                                            name={items?.userId?.name}
                                            divClass="relative lg:!h-[311px]"
                                            imgClass="w-full !h-[265px] sm:!h-[295px]  md:h-[186px] lg:h-[311px] rounded-[6px] md:rounded-[10px] object-cover"
                                            btnClass="absolute top-1/2 left-0 right-0 mx-auto -translate-y-1/2 text-white hover:text-[#CC2828] w-[85px] text-center cursor-pointer"
                                        />
                                        <div className="pt-[20px] lg:pt-[30px]">
                                            <h3 className="font-bold text-xl xl:text-[25px] -tracking-[0.03em] m-0 pb-[20px] xl:pb-[35px] border-b border-[rgba(204,40,40,.2)] border-opacity-20 ">{items.userId.name}</h3>
                                        </div>
                                        <div className="flex justify-between items-center pt-4 lg:pt-5">
                                            <div className="text-black font-bold text-lg lg:text-xl -tracking-[0.03em]">
                                                {items?.average_price && items?.average_duration &&
                                                    `${formatMultiPrice(items?.average_price, "USD")}/${items?.average_duration} minutes`}
                                            </div>
                                            <Link href={`/teacher/${items?._id}`} className='font-medium cursor-pointer rounded-full py-2 px-5 bg-[#CC2828] hover:bg-[#ad0e0e] text-white text-base xl:text-xl py-2.5 px-8 lg:px-9'>
                                                Book a Lesson
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
};