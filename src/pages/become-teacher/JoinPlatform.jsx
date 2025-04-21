import React from "react";
import Heading from "../common/Heading";
import { PiGlobe } from "react-icons/pi";
export default function JoinPlatform() {

    const data = [
        {
            decription: "Finishing the online teachers course - link here:"
        },
        {
            decription: "Introduction from one of the current teachers (subject to the portal approval)"
        },
        {
            decription: "For anyone who is unexperienced and below 20 years old - free access after finishing the online teachers course (the course fee is waived - limited number of applicants)"
        },
        {
            decription: "Bringing over students with minimum of 80 hours teaching each month"
        }
    ]
    return (
        <div className="bg-[#DE7C7C] py-[40px] md:py-[60px] lg:py-[80px]">
            <div className="mx-auto container sm:container md:container lg:container xl:max-w-[1230px]  px-4">
                <Heading classess={'text-[#F8F9FA] mb-8'} title={'Ways to join the platform - NO LICENSE REQUIRED'} />
                <div className="flex flex-wrap -mx-4">
                    {
                        data && data?.map((item, i) => (
                            <div key={i} className="w-full md:w-1/2 px-4 mb-8">
                                <div className="bg-[#F8F9FA] rounded-[10px] min-h-full flex items-center py-4 lg:py-5 relative pl-[60px] pr-5 text-base leading-snug font-medium -tracking-[0.03em] text-[#1E1E1E]">
                                    <PiGlobe className="absolute left-4 text-[#CC2828] top-1/2 -translate-y-1/2" size={32} />
                                    {item.decription}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}