import React from "react";
import Layout from "../common/Layout";
import Image from "next/image";
import teacherImg from "../Assets/Images/teacherimg.jpg";
import LessonList from "./LessonList";
import Testimonial from "./Testimonial";
import Heading from "../common/Heading";
import Calendar from "../calendar/index.jsx"
import VideoModalPlayer from "../common/VideoModalPlayer";
import { MdOutlinePlayCircle } from "react-icons/md";

export default function Index() {

    return (
        <>
            <Layout>
                <div className="pt-[114px] md:pt-[124px] lg:pt-[154px]  pb-[40px]  md:pb-[60px] lg:pb-[80px] xl:pb-[100px] ">
                    <div className="container sm:container md:container lg:container xl:max-w-[1230px]  px-4 mx-auto">
                        <div className="bg-[rgba(204,40,40,0.8)] rounded-[20px] py-6 lg:py-[30px] px-6 md:px-[30px] lg:px-[30px] xl:px-[45px]">
                            <div className="flex flex-wrap -mx-4 space-y-4">
                                <div className="mx-auto w-[280px] md:w-[280px] lg:w-[308px] px-4">
                                    <div className="relative">
                                        <Image className="rounded-[10px]" src={teacherImg} alt="teacher" height={276} width={276} />
                                        <button className="absolute top-1/2  cursor-pointer left-0 w-[81px] text-center text-white hover:text-[#CC2828] right-0 mx-auto -translate-y-1/2">
                                            <MdOutlinePlayCircle size={81} />
                                        </button>
                                    </div>
                                </div>
                                <div className="w-full md:w-[calc(100%-280px)] md:w-[calc(100%-308px)] px-4">
                                    <div className="relative after:right-0 after:top-2 after:bottom-2 after:width-[1px] after-bg-white">
                                        <h3 className="text-white text-2xl lg:text-[45px] font-inter font-extrabold tracking-[-0.04em] mb-2">
                                            Emily Carter
                                        </h3>
                                        <p className="text-white tracking-[-0.03em] text-base lg:text-lg lg:text-xl font-medium">{`Hi! I'm Emily Carter, a passionate and certified English language teacher with over 8 years of experience. I specialize in helping students build confidence in speaking, improve their grammar, and prepare for exams like IELTS and TOEFL. My approach is friendly, interactive, and tailored to each student's unique learning style.`}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <LessonList />
                <div className="pt-[60px] lg:pt-[100px] pb-[40px] lg:pb-[60px] bg-[#F8F9FA]">
                    <div className="container sm:container md:container lg:container xl:max-w-[1230px]  px-4 mx-auto">
                        <Heading classess={'text-[#1E1E1E] mg-6 lg:mb-8'} title={'Availability'} />
                        <Calendar />
                    </div>

                </div>

                <Testimonial />

            </Layout>
        </>
    )
}