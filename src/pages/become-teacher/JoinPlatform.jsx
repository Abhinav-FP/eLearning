import React from "react";
import Heading from "../common/Heading";
import { PiGlobe } from "react-icons/pi";
export default function JoinPlatform({title, points}) {
    // const data = [
    //     {
    //         decription: "Finishing the online teachers course - link here:"
    //     },
    //     {
    //         decription: "Introduction from one of the current teachers (subject to the portal approval)"
    //     },
    //     {
    //         decription: "For anyone who is unexperienced and below 20 years old - free access after finishing the online teachers course (the course fee is waived - limited number of applicants)"
    //     },
    //     {
    //         decription: "Bringing over students with minimum of 80 hours teaching each month"
    //     }
    // ]

    return (
        <div className="bg-[#DE7C7C] pt-[40px] pb-[30px] md:py-[40px] lg:py-[80px]">
            <div className="mx-auto container sm:container md:container lg:container xl:max-w-[1230px]  px-4">
                <Heading classess={'text-[#F8F9FA] mb-8'} title={title} />
                <div className="flex flex-wrap -mx-2.5 lg:-mx-4 justify-center">
                    {
                        points && points?.map((item, i) => (
                            <div key={i} className="w-full md:w-1/2 px-2.5 lg:px-4 mb-4 lg:mb-6 xl:mb-8">
                                <div className="bg-[#F8F9FA] rounded-[10px] min-h-full flex items-center py-4 lg:py-5 relative pl-[50px] lg:pl-[60px] pr-3 md:pr-5 text-base leading-snug font-medium -tracking-[0.03em] text-[#1E1E1E]">
                                    <PiGlobe className="absolute left-3 lg:left-4 text-[#CC2828] top-1/2 -translate-y-1/2" size={32} />
                                    {item}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}