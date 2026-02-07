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
import NoData from "../common/NoData";
export default function Testimonial({ reviews }) {

    return (
        <div className="pt-[20px] lg:pt-[40px] xl:pt-[60px] pb-[40px] lg:pb-[60px] bg-[#F8F9FA] review">
            <div className="container sm:container md:container lg:container xl:max-w-[1230px] bg-[rgba(249,190,191, .1)] px-4 mx-auto">
                <Heading classess={'mb-3 lg:mb-4 text-center'} title={'Reviews'} />

                {!reviews || reviews.length === 0 ? (
                    // <p className="text-center text-gray-500 text-lg font-medium py-12">No reviews available</p>
                    <NoData
                        Heading={"No Reviews found"}
                        content={
                            "This profile does not have any reviews at the moment. The reviews will appear once approved."
                        }
                    />
                ) : (
                    <>
                        <p className="paragraph mb-6 text-center lg:mb-10">
                            Hear from our educators about their journey and experiences with Japanese for Me
                        </p>
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
                            {reviews && reviews?.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <div className="border h-full border-[rgba(56,121,117,0.2)] rounded-[20px] p-[30px] lg:p-[40px]">
                                        <div className="w-[60px] h-[60px] mx-auto mb-3 lg:mb-3">
                                            <Image
                                                src={item?.userId?.profile_photo || "/Placeholder.png"}
                                                alt={item?.userId?.name || "Profile"}
                                                width={60}
                                                height={60}
                                                className="rounded-full"
                                            />
                                        </div>
                                        <h3 className="text-black text-center -tracking-[0.03em] text-base font-semibold mb-2">
                                            {item?.userId?.name}
                                        </h3>
                                        <div className="flex text-[#E4B750] text-sm justify-center mb-2">
                                            <StarRating rating={item?.rating} />
                                        </div>
                                        <p className="text-[#6B7280] font-medium italic text-base text-center">
                                            {item?.description}
                                        </p>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </>
                )}
            </div>
        </div>
    );
}