import React, { useEffect, useState } from "react";
import Heading from "../common/Heading";
import Image from "next/image";
import LineImg from "../Assets/Images/linebar-red.png";
import TeacherImg from "../Assets/Images/teacherimg01.png";
import Listing from "../api/Listing";
import Link from "next/link";

export default function Teacher() {

    const [teacher, setTeacher] = useState([])
    const fetchData = async () => {
        try {
            const main = new Listing();
            const response = await main.homeTeacher();
            if (response.data) {
                setTeacher(response.data.data.record);
            }
        } catch (error) {
            console.log("error", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
   
    return (
        <div className="pt-[115px] md:pt-[120px] lg:pt-[150px] pb-[20px] md:pb-[40px] lg:pb-[60px]">
            <div className="mx-auto container sm:container md:container lg:container xl:max-w-[1230px]  px-4">
                <Heading classess={'text-center mb-2 lg:mb-3'} title={'Meet Our Top-Rated Teachers'} />
                <p className="text-center text-[#535353] font-medium text-base -tracking-[0.03em] mb-4 lg:mb-5">Browse profiles of our most experienced and highest-rated educators.</p>
                <div className="text-center mb-8 lg:mb-10">
                    <Image className="inline-block" src={LineImg} alt="icon" />
                </div>
                <div className="flex flex-wrap -mx-2.5">
                    {
                        teacher && teacher?.map((item, i) => (
                            <Link href={`/teacher/${item?._id}`} key={i} className="w-full sm:w-6/12 md:w-4/12 lg:w-3/12 px-2.5 mb-5" >
                                <div className="bg-[#FFE8E8] rounded-[10px] px-4 lg:px-6 py-5 lg:py-[30px] min-h-full">
                                    <div className="h-[134px] w-[134px] lg:h-[164px] lg:w-[164px] rounded-full overflow-hidden border-[3px] border-[rgba(56,121,117,0.2)] border-solid mx-auto mb-3 lg:mb-5 ">
                                        <Image src={item.profile_photo || TeacherImg} alt={item.userId.name} width={164} height={164} />
                                    </div>
                                    <h3 className="text-black text-base font-bold -tracking-[0.03em] text-center mb-2.5 lg:mb-3">{item.userId.name}</h3>
                                    <p className="text-[#535353] text-base font-medium -tracking-[0.03em] mb-4 lg:mb-5 line-clamp-2 text-center">{item.description}</p> 
                                    <div className="flex flex-wrap gap-3 justify-center">
                                        <span className="text-[#CC2828] -tracking-[0.03em] font-bold text-base">
                                            {item.average_price && (
                                                `$${item.average_price}/${item?.average_duration} min`
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}