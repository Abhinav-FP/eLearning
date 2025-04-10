import React from "react";
import Layout from "../common/Layout";
import Image from "next/image";
import teacherImg from "../Assets/Images/teacherimg.jpg";
export default function Detail() {
    return (
        <Layout>
            <div className="py-[154px] pb-[100px]">
                <div className="container sm:container md:container lg:max-w-[1230px] px-4 mx-auto">
                    <div className="bg-[rgba(204,40,40,0.8)]  rounded-[20px] py-[30px] px-[45px]">
                        <div className="flex flex-wrap -mx-4">
                            <div className="w-full lg:w-3/12 px-4">
                                <Image className="rounded-[10px]" src={teacherImg} alt="teacher" />
                            </div>
                            <div className="w-full lg:w-5/12 px-4">
                                <div className="relative after:right-0 after:top-2 after:bottom-2 after:width-[1px] after-bg-white">
                                    <h3 className="text-white text-xl lg:text-2xl font-extrabold tracking-[-0.04em] ">
                                        Emily Carter
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}