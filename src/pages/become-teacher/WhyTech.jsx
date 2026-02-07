import React, { useState } from "react";
import Heading from "../common/Heading";
import Image from "next/image";
import LineImg from "../Assets/Images/linebar-green.png";
import whytechBanner from "../Assets/Images/whytech-banner.png";
import { PiGlobe } from "react-icons/pi";

export default function WhyTech({title, pargraph, points, language}) {
    return (
        <div className=" pt-[115px] md:pt-[120px] lg:pt-[150px] pb-[40px] md:pb-[50px] lg:pb-[70px]">
            <div className="mx-auto container sm:container md:container lg:container xl:max-w-[1230px]  px-4">
                <Heading classess={'text-center mb-3'} title={title} />
                <p className="paragraph mb-3 lg:mb-5">{pargraph}</p>
                <div className="text-center mb-3 md:mb-6 lg:mb-10">
                    <Image className="inline-block" src={LineImg} alt="icon" />
                </div>
                {/* <div className="flex flex-wrap -mx-2.5">
                    <div className="w-full lg:w-1/2 px-2.5">
                        <ul>
                            {points && points?.map((item, index) => (
                                <li key={index} className={`rounded border-[#CC2828] ${index === 0 ? "lg:max-w-[87%] lg:!mr-0" : ""} ${index % 2 === 0 ? "pr-1.5 md:pr-2.5 border-r-3 md:border-r-5 mr-[20px] sm:mr-[50px] md:mr-[100px]" : "pl-1.5 md:pl-2.5 border-l-3 md:border-l-5 ml-[20px] sm:ml-[50px] md:ml-[100px] "}`}>
                                    <div className="list_shadow mb-5 lg:mb-[30px]  bg-[rgba(204,40,40,0.2)] relative pl-[60px] lg:pl-[65px] pr-5 py-2 lg:py-3 rounded-[10px] text-sm md:text-base lg:text-lg leading-snug font-medium -tracking-[0.03em] min-h-[65px] lg:min-h-[74px] flex items-center">
                                        <PiGlobe className="absolute left-4 lg:left-5 text-[#CC2828] top-1/2 -translate-y-1/2" size={32} />
                                            {item?.[language]}
                                    </div>
                                </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="w-full lg:w-1/2 px-2.5">
                        <div className="text-center">
                            <Image className="max-w-xs lg:max-w-full block mx-auto " src={"/become.jpg"} width={2489} height={659} alt="banner" />
                        </div>
                    </div>
                </div> */}
                <div className="flex flex-wrap -mx-2.5 gap-10">
                    <div className="w-full px-2.5">
                        <div className="text-center">
                        <Image
                            className="w-full block mx-auto"
                            src="/become.jpg"
                            width={2489}
                            height={659}
                            alt="banner"
                        />
                        </div>
                    </div>
                    <div className="w-full px-2.5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-5">
                        {points && points?.map((item, index) => (
                            <div className="rounded border-[#55844D] pl-1 md:pl-2 border-l-3 md:border-l-5 w-full">
                                <li
                                key={index}
                                className=" list_shadow rounded-[10px] py-2 sm:py-3 px-3 sm:px-5 h-full flex items-center gap-3 text-sm md:text-base lg:text-lg font-medium leading-snug"
                                >
                                <PiGlobe className="text-[#55844D] min-w-[32px] min-h-[32px] mt-1" size={32} />
                                <span className="text-[#55844D]">{item?.[language]}</span>
                                </li>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}