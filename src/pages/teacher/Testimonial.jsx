import React from "react";
import Heading from "../common/Heading";
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import Image from "next/image";
import TeacherImg from "../Assets/Images/teacherimg01.png";
import StarRating from "../common/StarRating";
export default function Testimonial({ reviews }) {

    return (
        <>
            <div className="pt-[20px] lg:pt-[40px] xl:pt-[60px] pb-[40px] lg:pb-[60px] bg-[#F8F9FA]">
                <div className="container sm:container md:container lg:container xl:max-w-[1230px]  bg-[rgba(249,190,191, .1)] px-4 mx-auto">
                    <Heading classess={'text-[#1E1E1E] mb-3 lg:mb-4 text-center'} title={'Reviews'} />
                    <p className="text-[#4E4E4E] tracking-[-0.04em] text-base mb-6 text-center lg:mb-10">Hear from our educators about their journey and experiences with Japanese for Me</p>
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={20}
                        slidesPerView={3}
                        autoplay={{
                            delay: 3000,     
                            disableOnInteraction: false,
                        }}
                        navigation
                        pagination={{ clickable: true }}
                        scrollbar={{ draggable: true }}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                            },
                            640: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 3,
                            },
                        }}
                    >
                        {
                            reviews && reviews?.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <div className="border border-[rgba(56,121,117,0.2)] rounded-[20px] p-[30px] lg:p-[40px]">
                                        <div className="w-[42px] h-[60px] lg:w-[42px] lg:w-[60px] mx-auto mb-3 lg:mb-4">
                                            <Image
                                                src={item?.userId?.profile_photo || TeacherImg}
                                                alt={item?.userId?.name || "Profile"}
                                                width={42}
                                                height={60}
                                            />
                                        </div>
                                        <h3 className="text-black text-center -tracking-[0.03em] text-base font-semibold mb-3">{item?.userId?.name}</h3>
                                        <div className="flex text-[#E4B750] text-sm justify-center mb-4">
                                            <StarRating rating={item?.rating} />
                                        </div>
                                        <p className="text-[#535353] font-medium italic text-base text-center">{item?.description}</p>
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
            </div>
        </>
    )
}