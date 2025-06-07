import React, { useEffect, useState } from "react";
import Heading from "../common/Heading";
import Listing from "../api/Listing";
import VideoModalPlayer from "../common/VideoModalPlayer";
import Link from "next/link";
import { formatMultiPrice } from "@/components/ValueDataHook";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { data } from "autoprefixer";
import StarRating from "../common/StarRating";

export default function Lesson({ title }) {
    const [video, setvideo] = useState([]);
    const TeacherVideos = async () => {
        try {
            const main = new Listing();
            const response = await main.HomeTeacherVideo();
            console.log("response", response)
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
                                <div className="w-full md:w-4/12 px-2.5" key={i}>
                                    <div id={i} className="bg-white border teacher_box border-[rgba(56,121,117,0.2)] rounded-[8px] lg:rounded-[13px] p-3 md:p-4 lg:p-5">
                                        <VideoModalPlayer video={items?.intro_video}
                                            image={items?.userId?.profile_photo}
                                            name={items?.userId?.name}
                                            divClass="relative md:!h-[205px]"
                                            imgClass="w-full !h-[205px]  md:!h-[205px] rounded-[4px] md:rounded-[6px] object-cover"
                                            btnClass="absolute top-1/2 left-0 right-0 mx-auto -translate-y-1/2 text-white hover:text-[#CC2828] w-[85px] text-center cursor-pointer"
                                        />
                                        <div className="py-3 border-b border-[rgba(204,40,40,.2)] border-opacity-20 flex flex-wrap -mx-2 items-center">
                                            <div className="w-8/12 px-2">
                                                <h3 className="font-bold text-base lg:text-lg -tracking-[0.03em] m-0 text-[#000000]">{items.userId.name}</h3>
                                            </div>
                                            <div className="w-4/12 px-2 text-right">
                                                <StarRating rating={items?.averageRating} />
                                                {items?.totalLessons != 0 &&

                                                    <div className="text-black text-sm -tracking-[0.03em] text-sm">{items?.totalLessons}  LESSONS</div>
                                                }
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center pt-4 lg:pt-5">
                                            <div className="text-black w-6/12">
                                                <span className="text-black text-sm -tracking-[0.03em] text-sm">
                                                    Lessons starts from
                                                </span>
                                                <div className="text-black font-bold text-base -tracking-[0.03em]">{items?.lowestLesson.price &&
                                                    `${formatMultiPrice(items?.lowestLesson.price, "USD")}`}
                                                </div>
                                            </div>
                                            <div className="w-6/12 text-right">
                                                <Link href={`/teacher/${items?._id}`} className='font-medium cursor-pointer rounded-full py-2 px-5 bg-[#CC2828] hover:bg-[#ad0e0e] text-white text-sm lg:text-base py-2.5 px-3 lg:px-4 lg:px-6'>
                                                    Book a Lesson
                                                </Link>
                                            </div>
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