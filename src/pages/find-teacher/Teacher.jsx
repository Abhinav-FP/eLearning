import React, { useEffect, useState } from "react";
import Heading from "../common/Heading";
import Image from "next/image";
import LineImg from "../Assets/Images/linebar-red.png";
import TeacherImg from "../Assets/Images/teacherimg01.png";
import Link from "next/link";
import { BookLoader } from "@/components/Loader";
import { formatMultiPrice } from "@/components/ValueDataHook";
import StarRating from "../common/StarRating"

export default function Teacher({ teacherData, loading }) {
    console.log("teacherData", teacherData);
    return (
        <div className="pt-[115px] md:pt-[120px] lg:pt-[150px] pb-[20px] md:pb-[40px] lg:pb-[60px]">
            <div className="mx-auto container sm:container md:container lg:container xl:max-w-[1230px]  px-4">
                <Heading classess={'text-center mb-2 lg:mb-3'} title={'Meet Our Top-Rated Teachers'} />
                <p className="text-center text-[#535353] font-medium text-base -tracking-[0.03em] mb-4 lg:mb-5">Browse profiles of our most experienced and highest-rated educators.</p>
                <div className="text-center mb-8 lg:mb-10">
                    <Image className="inline-block" src={LineImg} alt="icon" />
                </div>
                {loading ?
                    <BookLoader />
                    :
                    <div className="flex flex-wrap justify-center ">
                        {
                            teacherData && teacherData?.map((item, i) => (
                                <Link href={`/teacher/${item?._id}`} key={i} className="w-full mb-6 lg:mb-8 bg-[#FFE8E8] rounded-[10px] p-5 md:p-8 lg:p-10">
                                    <div className="flex flex-wrap">
                                        <div className="w-full md:w-[112px]">
                                            <div className="h-[80px] w-[80px] lg:h-[112px] lg:w-[112px] rounded-full overflow-hidden   mx-0 mb-3 lg:mb-6 ">
                                                <Image src={item?.userId?.profile_photo || TeacherImg} alt={item?.userId?.name} width={164} height={164} />
                                            </div>
                                            {/* <div className=" md:text-center">
                                          <StarRating rating={item?.averageRating} />

                                                {item?.totalLessons != 0 &&

                                                    <div className="text-black text-sm -tracking-[0.03em] text-sm">{item?.totalLessons} LESSONS</div>
                                                }
                                            </div> */}
                                        </div>
                                        <div className="w-full md:w-[calc(100%-112px)] mt-2 md:mt-0 md:pl-6 lg:pl-8">
                                            <h3 className="text-black text-xl lg:text-2xl font-bold -tracking-[0.03em] text-left mb-2.5 lg:mb-4">{item?.userId?.name}</h3>
                                            <div className="flex flex-wrap  gap-x-2 md:gap-x-6 lg:gap-x-8 mb-3 lg:mb-5">
                                                <div>
                                                    <span className="text-[#8D929A] text-base -tracking-[0.03em] pr-2">Language :</span>
                                                    <span className="capitalize text-black text-base -tracking-[0.03em] ">{item?.languages_spoken.join(' , ') || "N/A"}</span>
                                                </div>
                                                <div>
                                                    <span className="text-[#8D929A] text-base -tracking-[0.03em] pr-2">Nationality :</span>
                                                    <span className="capitalize text-black text-base -tracking-[0.03em] ">{item?.userId?.nationality || "N/A"}</span>
                                                </div>
                                                {/* {item?.userId?.nationality} */}
                                                <div>
                                                    <span className="text-[#8D929A] text-base -tracking-[0.03em] pr-2">Gender :</span>
                                                    <span className="capitalize text-black text-base -tracking-[0.03em] ">{item?.gender === 'M' ? 'Male' : item?.gender === 'F' ? 'Female' : "N/A"}</span>
                                                </div>
                                                <div>
                                                    <span className="text-[#8D929A] text-base -tracking-[0.03em] pr-2">Experience :</span>
                                                    <span className="text-black text-base -tracking-[0.03em] ">{item?.experience || 'N/a'} Years</span>
                                                </div>
                                            </div>
                                            <p className="text-black text-base font-normal -tracking-[0.03em] mb-3 lg:mb-6 line-clamp-2">{item?.description}</p>
                                            <div className="flex flex-wrap">
                                                <div className="w-6/12">
                                                    <span className="text-black text-sm -tracking-[0.03em] text-sm">
                                                        Lessons starts from
                                                    </span>
                                                    <div className="text-black font-bold text-base -tracking-[0.03em]">
                                                        {item?.lowestLesson && item?.lowestLesson && (
                                                            `${formatMultiPrice(item?.lowestLesson?.price, "USD")}`
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="w-6/12 text-right">
                                                    <Link href={`/teacher/${item?._id}?book=true`} className='inline-block font-medium cursor-pointer rounded-full py-2 px-5 bg-[#CC2828] hover:bg-[#ad0e0e] text-white text-sm lg:text-base py-2.5 px-3 lg:px-4 lg:px-6'>
                                                        Book a Lesson
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>}
            </div>
        </div>
    )
}