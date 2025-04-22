import React, { useEffect, useState } from "react";
import Heading from "../common/Heading";
import EmilyCarter from "../Assets/Images/emily-carter.png";
import Button from "../common/Button";
import Listing from "../api/Listing";
import VideoModalPlayer from "../common/VideoModalPlayer";

export default function Lesson({ title }) {


    const lessons = [
        {
            ThumbnailImage: EmilyCarter,
            Title: 'Emily Carter',
            Price: 'USD 12.00'
        },
        {
            ThumbnailImage: EmilyCarter,
            Title: 'Daniel Foster',
            Price: 'USD 12.00'
        }
    ]

    const [video, setvideo] = useState([]);

    const TeacherVideos = async () => {
        try {
            const main = new Listing();
            const response = await main.HomeTeacherVideo();
            console.log("response", response)
            setvideo(response?.data?.data?.record);
        } catch (error) {
            console.log("error", error);
        }
    };

    useEffect(() => {
        TeacherVideos();
    }, []);


    return (
        <>
            <div className="py-[40px] md:py-[60px] lg:py-[100px]">
                <div className="mx-auto container sm:container md:container lg:container xl:max-w-[1230px]  px-4">
                    <Heading classess={'text-[#1E1E1E]  mb-[30px] lg:mb-[40px] max-w-[834px] mx-auto text-center '} title={title} />
                    <div className="flex flex-wrap -mx-2.5">
                        {
                            video && video?.map((items, i) => (
                                <div className="w-full md:w-6/12 px-2.5" key={i}>
                                    <div id={i} className="bg-[#EFD1D1] border border-[rgba(56,121,117,0.2)]  rounded-[10px] lg:rounded-[20px] p-[20px] lg:p-[30px]">
                                        <VideoModalPlayer items={items} />
                                        <div className="pt-[30px] lg:pt-[30px]">
                                            <h3 className="font-bold text-[25px] -tracking-[0.03em] m-0 pb-[35px] border-b border-[rgba(204,40,40,.2)] border-opacity-20 ">{items.userId.name}</h3>
                                        </div>
                                        <div className="flex justify-between items-center pt-4 lg:pt-5">
                                            <div className="text-black font-bold text-lg lg:text-xl -tracking-[0.03em]">
                                                {items?.average_price && (
                                                    `$${items?.average_price} /${items?.average_duration}min`
                                                )}
                                            </div>
                                            <Button classes='bg-[#CC2828] hover:bg-[#ad0e0e] text-white text-base lg:text-xl py-2.5 px-9' title="Book a Lesson" />
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