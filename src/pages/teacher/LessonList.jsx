import React from "react";
import LeassonBg from '../Assets/Images/leasson-bg.png'
import Heading from "../common/Heading";
export default function LessonList() {
    return (
        <div style={{ backgroundImage: "url('/leasson-bg.png')" }}  className="bg-[rgba(249,190,191,.5)] bg-cover bg-center rounded-[20px] py-[40px] lg:py-[60px]">           
        <div className="container sm:container md:container lg:max-w-[1230px] bg-[rgba(249,190,191, .1)] px-4 mx-auto"> 
            <Heading classess={'text-[#CC2828] mg-6 lg:mb-8'} title={'Lessons'} />
            <ul className="space-y-5 lg:space-y-5">
                <li className="bg-white rounded-[10px] lg:rounded-[20px] p-6 lg:p-10">
                    <h3 className="text-[#CC2828] tracking-[-0.04em] text-xl lg:text-[30px] font-inter font-extrabold mb-5 lg:mb-6">Trial Lessons</h3>
                    <div className="flex flex-wrap ">
                        <div className="w-full md:w-[calc(100%-170px)]">
                            <span className="text-center bg-[rgba(204,40,40,0.1)] text-[#CC2828] text-lg font-semibold font-inter inline-block px-6 py-2.5 rounded-full tracking-[-0.04em]">Introduction & Goal Setting, Brief Language Assessment, Personalized Feedback & Next Steps</span>
                        </div>
                        <div className="w-full md:w-[170px]">
                            <button className="text-center bg-[rgba(204,40,40,0.1)] tracking-[-0.04em] text-[#CC2828] text-lg font-semibold font-inter block px-6 py-2.5 rounded-full ">USD $25.00</button>
                        </div>
                    </div>
                </li>
                <li className="bg-white rounded-[10px] lg:rounded-[20px] p-6 lg:p-10">
                    <h3 className="text-[#CC2828] tracking-[-0.04em] text-xl lg:text-[30px] font-inter font-extrabold mb-5 lg:mb-6">General English Lessons</h3>
                    <div className="flex flex-wrap ">
                        <div className="w-full md:w-[calc(100%-170px)]">
                            <span className="text-center bg-[rgba(204,40,40,0.1)] text-[#CC2828] text-lg font-semibold font-inter inline-block px-6 py-2.5 rounded-full tracking-[-0.04em]">Grammar, Vocabulary & Pronunciation, Reading, Writing & Listening Practice</span>
                        </div>
                        <div className="w-full md:w-[170px]">
                            <button className="text-center bg-[rgba(204,40,40,0.1)] tracking-[-0.04em] text-[#CC2828] text-lg font-semibold font-inter block px-6 py-2.5 rounded-full ">USD $25.00</button>
                        </div>
                    </div>
                </li>
                <li className="bg-white rounded-[10px] lg:rounded-[20px] p-6 lg:p-10">
                    <h3 className="text-[#CC2828] tracking-[-0.04em] text-xl lg:text-[30px] font-inter font-extrabold mb-5 lg:mb-6">Business English</h3>
                    <div className="flex flex-wrap ">
                        <div className="w-full md:w-[calc(100%-170px)]">
                            <span className="text-center bg-[rgba(204,40,40,0.1)] text-[#CC2828] text-lg font-semibold font-inter inline-block px-6 py-2.5 rounded-full tracking-[-0.04em]">Introduction & Goal Setting, Introduction & Goal Setting</span>
                        </div>
                        <div className="w-full md:w-[170px]">
                            <button className="text-center bg-[rgba(204,40,40,0.1)] tracking-[-0.04em] text-[#CC2828] text-lg font-semibold font-inter block px-6 py-2.5 rounded-full ">USD $30.00</button>
                        </div>
                    </div>
                </li>
                <li className="bg-white rounded-[10px] lg:rounded-[20px] p-6 lg:p-10">
                    <h3 className="text-[#CC2828] tracking-[-0.04em] text-xl lg:text-[30px] font-inter font-extrabold mb-5 lg:mb-6">Trial Lessons</h3>
                    <div className="flex flex-wrap ">
                        <div className="w-full md:w-[calc(100%-170px)]">
                            <span className="text-center bg-[rgba(204,40,40,0.1)] text-[#CC2828] text-lg font-semibold font-inter inline-block px-6 py-2.5 rounded-full tracking-[-0.04em]">Grammar, Vocabulary & Pronunciation, Reading, Writing & Listening Practice</span>
                        </div>
                        <div className="w-full md:w-[170px]">
                            <button className="text-center bg-[rgba(204,40,40,0.1)] tracking-[-0.04em] text-[#CC2828] text-lg font-semibold font-inter block px-6 py-2.5 rounded-full ">USD $20.00</button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    )
}