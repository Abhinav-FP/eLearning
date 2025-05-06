import React from "react";
import Heading from "../common/Heading";
import Button from "../common/Button";
import { IoMdArrowForward } from "react-icons/io";
import Link from "next/link";
export default function ReadyJoin() {
    return (
        <div className="pb-[40px] md:pb-[60px] lg:pb-[100px]">
            <div className="mx-auto container sm:container md:container lg:container xl:max-w-[1230px]  px-4">
                <div className="bg-[#CC2828] py-[30px] md:py-[50px] lg:py-[95px] px-4 md:px-10 text-center rounded-[20px]">
                    <Heading classess={'text-white mb-2'} title={'Ready to Join Our Teaching Community?'} />
                    <p className="text-[#F8F9FA] text-base tracking-[-0.03em] mb-5 lg:mb-[30px]">Take the first step toward an exciting and rewarding teaching journey.</p>
                    <Link href="/teacher-dashboard/register" className="font-medium cursor-pointer rounded-full bg-white text-[#CC2828] py-3 md:py-4 px-6 md:px-10 lg:px-11">
                    Become a Teacher Now 
                    <IoMdArrowForward className="inline-block ml-1.5" size={22} />
                    </Link>
                </div>
            </div>
        </div>
    )
}