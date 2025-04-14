import React, { useState } from "react";
import Heading from "../common/Heading";
import Image from "next/image";
import LineImg from "../Assets/Images/linebar-red.png";
import whytechBanner from "../Assets/Images/whytech-banner.png";
import { PiGlobe } from "react-icons/pi";

export default function WhyTech() {
    const data = [ 
       {
        decription : "Lowest commission from all online portals (10%)"  
       },
       {
        decription : "Minimum hourly rates of $30"  
       }, 
       {
        decription : "Free seminars from like minded teachers every month"  
       },
       {
        decription : "Free legal support for online harassment and access to blacklisted students"  
       },
       {
        decription : "Fully Japanese company focused on supporting the teachers over students"  
       },
       {
        decription : "No license or teaching experience required"  
       }   
    ]
    return (
        <div className="whytech_bg pt-[120px] md:pt-[120px] lg:pt-[150px] pb-[40px] md:pb-[50px] lg:pb-[70px]">
            <div className="mx-auto container sm:container md:container lg:max-w-[1230px] px-4">
                <Heading classess={'text-center mb-3'} title={'Why Teach with Japanese for Me?'} />
                <p className="text-center text-[#535353] font-medium text-base -tracking-[0.03em] mb-5">At Japanese for Me, we empower educators to share their passion, connect with eager learners worldwide, and thrive in a flexible, supportive environment.</p>
                <div className="text-center mb-8 lg:mb-16">
                    <Image className="inline-block" src={LineImg} alt="icon" />
                </div>
                <div className="flex flex-wrap -mx-2.5">
                    <div className="w-full lg:w-1/2 px-2.5">
                        <ul>
                            {data && data.map((item, index) => (
                                <li key={index} className={`rounded border-[#CC2828] ${index === 0 ? "max-w-[87%] !mr-0" : ""} ${index % 2 === 0 ? "pr-2.5 border-r-5 mr-[100px]" : "pl-2.5 border-l-5 ml-[100px]"}`}>
                                    <div className="list_shadow mb-[30px]  bg-[rgba(204,40,40,0.2)] relative pl-[65px] pr-5 py-3 rounded-[10px] text-base lg:text-lg leading-snug font-medium -tracking-[0.03em] min-h-[74px] flex items-center">
                                        <PiGlobe className="absolute left-5 text-[#CC2828] top-1/2 -translate-y-1/2" size={32} />
                                            {item.decription}
                                    </div>
                                </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="w-full lg:w-1/2 px-2.5">
                        <div className="text-center">
                            <Image src={whytechBanner} alt="banner" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}