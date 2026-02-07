import React from "react";
import Heading from "../common/Heading";
import Button from "../common/Button";
import { IoMdArrowForward } from "react-icons/io";
import Link from "next/link";
export default function ReadyJoin({data, language}) {
    return (
        <div className="pb-[40px] md:pb-[60px] lg:pb-[100px]">
            <div className="mx-auto container sm:container md:container lg:container xl:max-w-[1230px]  px-4">
                <div className="bg-[#ECF1E6] py-[30px] md:py-[50px] lg:py-[95px] px-4 md:px-10 text-center rounded-[20px]">
                    <Heading classess={'text-[#33403D] mb-2'} title={data?.heading[language]} />
                    {/* {language === "en" && */}
                    <p className="text-[#6B7280] text-base tracking-[-0.03em] mb-5 lg:mb-[30px]">{data?.text[language]}</p>
                    <Link href="/teacher-dashboard/register" className="btn lg">
                    {data?.button[language]}
                    {language === "en" && 
                    <IoMdArrowForward className="inline-block ml-1.5" size={22} />}
                    </Link>
                </div>
            </div>
        </div>
    )
}