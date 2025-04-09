import React from "react";
import Heading from "../common/Heading";
import Image from "next/image";
import LineImg from "../Assets/Images/linebar-red.png";
import TeacherImg from "../Assets/Images/teacherimg01.png";

export default function Teacher() {
    const teachers = [
        {
            teacherimg: TeacherImg,
            name: "Easter Howard",
            decription: "Emma is an experienced English teacher with a passion. ",
            price: "19.21/30"
        },
        {
            teacherimg: TeacherImg,
            name: "Easter Howard",
            decription: "Emma is an experienced English teacher with a passion. ",
            price: "19.21/30"
        },
        {
            teacherimg: TeacherImg,
            name: "Easter Howard",
            decription: "Emma is an experienced English teacher with a passion. ",
            price: "19.21/30"
        },
        {
            teacherimg: TeacherImg,
            name: "Easter Howard",
            decription: "Emma is an experienced English teacher with a passion. ",
            price: "19.21/30"
        },
        {
            teacherimg: TeacherImg,
            name: "Easter Howard",
            decription: "Emma is an experienced English teacher with a passion. ",
            price: "19.21/30"
        },

    ]
    return (
        <div className="pt-[120px] md:pt-[120px] lg:pt-[150px] pb-[40px] md:pb-[60px] lg:pb-[80px]">
            <div className="mx-auto container sm:container md:container lg:max-w-[1230px] px-4">
                <Heading classess={'text-center mb-3'} title={'Meet Our Top-Rated Teachers'} />
                <p className="text-center text-[#535353] font-medium text-base -tracking-[0.03em] mb-5">Browse profiles of our most experienced and highest-rated educators.</p>
                <div className="text-center mb-8 lg:mb-10">
                    <Image className="inline-block" src={LineImg} alt="icon" />
                </div>
                <div className="flex flex-wrap -mx-2.5">
                    {
                        teachers && teachers?.map((item, i) => (
                            <div key={i} className="w-full sm:w-6/12 md:w-4/12 lg:w-3/12 px-2.5 mb-5">
                                <div className="bg-[#FFE8E8] rounded-[10px] px-4 lg:px-6 py-5 lg:py-[30px]">
                                    <div className="h-[134px] w-[134px] lg:h-[164px] lg:w-[164px] rounded-full overflow-hidden border-[3px] border-[rgba(56,121,117,0.2)] border-solid mx-auto mb-3 lg:mb-5 ">
                                        <Image src={item.teacherimg} alt="teacher img" />
                                    </div>
                                    <h3 className="text-black text-base font-bold -tracking-[0.03em] text-center mb-2.5 lg:mb-3">{item.name}</h3>
                                    <p className="text-[#535353] text-base font-medium -tracking-[0.03em] text-left mb-4 lg:mb-5">{item.decription}</p>
                                    <div className="flex flex-wrap gap-3 justify-between">
                                        <span className="text-[#535353] -tracking-[0.03em] text-normal text-base">Price</span>
                                        <span className="text-[#CC2828] -tracking-[0.03em] font-bold text-base">${item.price} min</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}