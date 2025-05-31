import AdminLayout from "../common/AdminLayout";
import Image from "next/image";
import teacherImg from '../../Assets/Images/teacherimg.jpg';
import { FaCheckCircle, FaGlobe, FaRegCalendarAlt, FaPlay, FaPhoneAlt } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Listing from "@/pages/api/Listing";
const Index = ({ }) => {
    const router = useRouter();
    console.log(router)
    const Id = router?.query?.slug
    console.log(Id)

    const [record, setRecord] = useState("")
    const AdminTteacher = async () => {
        try {
            const main = new Listing();
            const response = await main.AdminTeacherData(Id);
            console.log("response", response)
            setRecord(response?.data?.data?.record);
        } catch (error) {
            console.log("error", error);
        }
    };

    useEffect(() => {
        if (Id) {
            AdminTteacher(Id);
        }
    }, [Id]); // ✅ Only run when the Id (slug) is available




    const teacherData = {
        userId: {
            name: "Rahul Jain",
            email: "rahul.jain@internetbusinesssolutionsindia.com",
            nationality: "japan",
            time_zone: "Asia/Tokyo",
            profile_photo: ""
        },
        description: "A TEFL CERTIFIED NATIVE ENGLISH PROFESSOR SINCE 2007",
        experience: 10,
        city: "Tokyo",
        intro_video: "https://www.youtube.com/watch?v=rlZpZ8es_6k&list=PLqM7alHXFySF7JxK9E24C-ZeNAXFB1u8k",
        languages_spoken: ["ENGLISH"],
        ais_trained: true,
        japanese_for_me_approved: false,
        admin_approved: true,
        average_duration: 30,
        average_price: "500"
    };

    return (
        <AdminLayout page={"Teacher Listing"}>
            <div className="p-5 lg:p-[30px]">
                <div className="border-b border-[rgba(0,0,0,.1)] overflow-hidden">
                    <div className="bg-white  from-gray-900 to-gray-700 p-8 ">
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                            <div className="relative flex shrink-0 overflow-hidden rounded-full w-24 h-24 border-4 border-white shadow-lg">
                                <Image className="aspect-square h-full w-full" src={teacherImg} />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                    <h1 className="text-3xl font-bold">{teacherData.userId.name}</h1>
                                    <FaCheckCircle size={18} />
                                </div>
                                <p className="text-gray-600 text-base mb-1">{teacherData.description}</p>
                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                                    <div className="flex items-center gap-1">
                                        <FiMapPin className="w-4 h-4" />
                                        <span>{teacherData.city}, {teacherData.userId.nationality}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <FaGlobe className="w-4 h-4" />
                                        <span>{teacherData.userId.time_zone}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <FaRegCalendarAlt className="w-4 h-4" />
                                        <span>{teacherData.experience} years experience</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <button
                                    // onClick={handleBookLesson}
                                    className="bg-[#CC2828] hover:bg-[#b02323] text-white px-6 py-3 text-base font-medium rounded-[10px]"
                                >
                                    Book a Lesson
                                </button>
                                <button
                                    // onClick={handleWatchIntro}
                                    variant="outline"
                                    className="bg-[#CC2828] hover:bg-[#b02323] text-white px-6 py-3 text-base font-medium rounded-[10px]"
                                >
                                    <FaPlay className="w-4 h-4 mr-2 inline" />
                                    Watch Intro
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="flex flex-wrap items-center   mt-6">
                    <div className="w-full md:w-6/12 lg:w-4/12 mb-3 ">
                        <a href="mailto:james@gmail.com" class="font-medium text-sm md:text-base xl:text-lg tracking-[-0.03em] text-[#8D929A] hover:text-[#CC2828]"> <MdOutlineEmail className="inline" size={18} /> james@gmail.com</a>
                    </div>
                    <div className="w-full md:w-6/12 lg:w-4/12 mb-3">
                        <a href="#" className="font-medium text-sm md:text-base xl:text-lg tracking-[-0.03em] text-[#8D929A] hover:text-[#CC2828]"> <FaPhoneAlt className="inline" size={18} /> 1234567890</a>
                    </div>
                    <div className="w-full md:w-6/12 lg:w-4/12 mb-3">
                        <p className="font-medium text-sm md:text-base xl:text-lg tracking-[-0.03em] text-[#8D929A]">
                            <FiMapPin className="inline" size={18} /> 123 Main Street, Huston,
                        </p>
                    </div>
                    <div className="w-full md:w-6/12 lg:w-4/12 mb-3 ">
                        <a href="mailto:james@gmail.com" class="font-medium text-sm md:text-base xl:text-lg tracking-[-0.03em] text-[#8D929A] hover:text-[#CC2828]"> <MdOutlineEmail className="inline" size={18} /> james@gmail.com</a>
                    </div>
                    <div className="w-full md:w-6/12 lg:w-4/12 mb-3">
                        <a href="#" className="font-medium text-sm md:text-base xl:text-lg tracking-[-0.03em] text-[#8D929A] hover:text-[#CC2828]"> <FaPhoneAlt className="inline" size={18} /> 1234567890</a>
                    </div>
                    <div className="w-full md:w-6/12 lg:w-4/12 mb-3">
                        <p className="font-medium text-sm md:text-base xl:text-lg tracking-[-0.03em] text-[#8D929A]">
                            <FiMapPin className="inline" size={18} /> 123 Main Street, Huston,
                        </p>
                    </div>

                </div>

            </div>

        </AdminLayout>
    );
};

export default Index;
