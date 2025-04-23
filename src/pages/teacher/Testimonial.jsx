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
import { FaStar } from 'react-icons/fa';

export default function Testimonial() {

    const Testimonial = [
        {
            name: "Emily R",
            decription: "Teaching on Japanese for Me has allowed me to connect with students worldwide while maintaining a flexible schedule. It's been an incredibly rewarding experience."
        },
        {
            name: "Carlos M.",
            decription: "I love how Japanese for Me supports teachers with resources and a vibrant community. It's more than just a platform; it's a family."
        },
        {
            name: "Aisha K.",
            decription: "Setting my own rates and working from anywhere has given me the freedom I've always wanted as an educator."
        },
        {
            name: "Carlos M.",
            decription: "I love how Japanese for Me supports teachers with resources and a vibrant community. It's more than just a platform; it's a family."
        },
    ]

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
                            delay: 3000,      // ✅ delay in ms
                            disableOnInteraction: false, // optional but useful
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
                            Testimonial && Testimonial?.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <div className="border border-[rgba(56,121,117,0.2)] rounded-[20px] p-[30px] lg:p-[40px]">
                                        <div className="w-[42px] h-[60px] lg:w-[42px] lg:w-[60px] mx-auto mb-3 lg:mb-4">
                                            <Image src={TeacherImg} alt="autor-name" />
                                        </div>
                                        <h3 className="text-black text-center -tracking-[0.03em] text-base font-semibold mb-3">{item?.name}</h3>
                                        <div className="flex text-[#E4B750] text-sm justify-center mb-4">
                                            <FaStar size={16} fill="currentColor" />
                                            <FaStar size={16} fill="currentColor" />
                                            <FaStar size={16} fill="currentColor" /> 
                                        </div>
                                        <p className="text-[#535353] font-medium italic text-base text-center">{item?.decription}</p>
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