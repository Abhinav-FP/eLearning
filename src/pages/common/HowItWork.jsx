import React from "react";
import Heading from "./Heading";
import Image from "next/image";
import chooseIcon from "../Assets/Images/choose_icon.png";
import ScheduleIcon from "../Assets/Images/schedule.png";
import PaymentIcon from "../Assets/Images/payment.png";
import LearningIcon from "../Assets/Images/learning.png";
import Icon1 from "../Assets/Images/NewIcon1.png";
import Icon2 from "../Assets/Images/NewIcon2.png";
import Icon3 from "../Assets/Images/NewIcon3.png";
import Icon4 from "../Assets/Images/NewIcon4.png";

export default function HowItWork({ classess, title }) {
    const data = [
        {
            icon: Icon1,
            text: "Choose the teacher",
        },
        {
            icon: Icon2,
            text: "Schedule the lesson",
        },
        {
            icon: Icon3,
            text: "Make the payment/book",
        },
        {
            icon: Icon4,
            text: "Start learning",
        },

    ];

    // const data = [
    //     {
    //         icon: chooseIcon,
    //         text: "Choose the teacher",
    //     },
    //     {
    //         icon: ScheduleIcon,
    //         text: "Schedule the lesson",
    //     },
    //     {
    //         icon: PaymentIcon,
    //         text: "Make the payment/book",
    //     },
    //     {
    //         icon: LearningIcon,
    //         text: "Start learning",
    //     },

    // ];
    return (
        <>
            <div className={`bg-[#FCF8F5] py-[40px] md:py-[60px] lg:py-[80px] ${classess}`}>
                <div className="mx-auto container sm:container md:container lg:container xl:max-w-[1230px] px-4">
                    <Heading classess={'text-center mb-[20px] md:mb-[30px] lg:mb-[45px] text-[#33403D]'} title={title || "How It Works"} />
                    <div className="flex flex-wrap -mx-4 md:-mx-[20px] lg:-mx-[28px] xl:-mx-[34px]">
                        {data && data?.map((item, i) => (
                                <div key={i} className=" w-full md:w-3/12 px-4 md:px-[20px] lg:px-[26px] xl:px-[34px] relative 
                                arrowimg
                                [&:not(:last-child)]:after:absolute 
                                [&:not(:last-child)]:after:top-full [&:not(:last-child)]:md:after:top-1/2 
                                [&:not(:last-child)]:after:translate-y-[20px]  [&:not(:last-child)]:md:after:-translate-y-1/2 
                                [&:not(:last-child)]:after:-right-0  [&:not(:last-child)]:md:after:-right-[18px] lg:[&:not(:last-child)]:after:-right-[10px]                                 
                                [&:not(:last-child)]:after:left-0 [&:not(:last-child)]:md:after:left-auto
                                [&:not(:last-child)]:after:mx-auto [&:not(:last-child)]:md:after:mx-0
                                [&:not(:last-child)]:after:w-[30px] 
                                [&:not(:last-child)]:after:h-[30px] 
                                [&:not(:last-child)]:after:bg-no-repeat 
                                [&:not(:last-child)]:after:bg-contain

                                [&:not(:last-child)]:mb-16 [&:not(:last-child)]:md:mb-0
                                
                                ">
                                    <div className="bg-white border border-[rgba(85,132,77,0.3)] rounded-[20px] lg:rounded-[30px] py-10 px-3 lg:px-6 flex flex-col justify-center items-center text-center min-h-full">
                                        <div className="relative lg:min-h-[27px] mb-[18px] px-4 ">
                                            <Image className="block mx-auto  max-w-[80px] md:max-w-[57px] max-h-[80px] md:max-h-[49px]" src={item?.icon} alt={item?.text} />
                                        </div>
                                        <h3 className="max-w-[118px] mx-auto leading-[22px] lg:leading-[24px] font-inter text-[#6B7280] -tracking-[0.04em] font-bold text-base lg:text-xl">{item?.text}</h3>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}