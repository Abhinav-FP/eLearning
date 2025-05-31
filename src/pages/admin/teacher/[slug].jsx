import AdminLayout from "../common/AdminLayout";
import Image from "next/image";
import teacherImg from '../../Assets/Images/teacherimg.jpg';
import { FaCheckCircle, FaGlobe, FaRegCalendarAlt, FaPlay, FaPhoneAlt } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Listing from "@/pages/api/Listing";
import Popup from "@/pages/common/Popup";
import VideoModalPlayer from "@/pages/common/VideoModalPlayer";

const Index = ({ }) => {
    const router = useRouter();
    console.log(router)
    const Id = router?.query?.slug
    const [showVideo, setShowVideo] = useState(false);
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


    const handleWatch = () => {
        setShowVideo(true)
    }


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
                    <div className="bg-white  from-gray-900 to-gray-700 pb-8 ">
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                            <div className="relative flex shrink-0 overflow-hidden rounded-full w-24 h-24 border-4 border-white shadow-lg">
                                <Image width={100}
                                    height={100} className="aspect-square rounded-full object-cover" src={record?.userId?.profile_photo || teacherImg} alt="teacher profile" />
                            </div>
                            <div className="flex-2">
                                <div className="flex items-center gap-3 mb-1">
                                    <h1 className="text-3xl font-bold">{record?.userId?.name}</h1>
                                    <FaCheckCircle size={18} />
                                </div>
                                <p className="text-gray-600 text-base mb-1">{record?.description || 'Na'}</p>
                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                                    <div className="flex items-center gap-1">
                                        <FiMapPin className="w-4 h-4" />
                                        <span>{record?.city || 'Na'}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <FaGlobe className="w-4 h-4" />
                                        <span> {record?.userId?.nationality || 'Na'}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <FaRegCalendarAlt className="w-4 h-4" />
                                        <span>{record?.experience} years experience</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                 <VideoModalPlayer video={record?.intro_video}
                                                image={record?.userId?.profile_photo}
                                                name={record?.userId?.name}
                                                divClass="relative lg:h-[200px]"
                                                imgClass="w-full h-[150px] sm:h-[150px]  md:h-[170px] lg:h-[200px] rounded-[6px] md:rounded-[10px]"
                                                btnClass="absolute top-1/2 left-0 right-0 mx-auto -translate-y-1/2 text-white hover:text-[#CC2828] w-[65px] text-center cursor-pointer"
                                            />
                               
                            </div>
                        </div>

                    </div>
                </div>
                <div className="flex flex-wrap items-center   mt-6">
                    <div className="w-full md:w-6/12 lg:w-4/12 mb-3 ">
                         
                        <div><a href="mailto:james@gmail.com" class="font-medium text-sm md:text-base xl:text-lg tracking-[-0.03em] text-[#8D929A] hover:text-[#CC2828]"> <MdOutlineEmail className="inline" size={18} /> {record?.userId?.email}</a></div>
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
