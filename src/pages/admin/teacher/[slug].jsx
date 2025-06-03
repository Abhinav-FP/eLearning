import AdminLayout from "../common/AdminLayout";
import Image from "next/image";
import teacherImg from '../../Assets/Images/teacherimg.jpg';
import { FaGlobe, FaRegCalendarAlt, FaPlay, FaPhoneAlt } from "react-icons/fa";
import { IoShieldCheckmark } from "react-icons/io5";
import { FiMapPin } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Listing from "@/pages/api/Listing";
import Popup from "@/pages/common/Popup";
import VideoModalPlayer from "@/pages/common/VideoModalPlayer";
import AboutUs from "./AboutUs";
import Payout from "./Payout";
import LessonList from "./LessonList";
import BookingList from "./BookingList";

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
            setRecord(response?.data?.data);
        } catch (error) {
            console.log("error", error);
        }


    };

    console.log("record", record)
    useEffect(() => {
        if (Id) {
            AdminTteacher(Id);
        }
    }, [Id]); // ✅ Only run when the Id (slug) is available





    const [activeTab, setActiveTab] = useState('about');
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <AdminLayout page={"Teacher Listing"}>
            <div className="p-5 lg:p-[30px]">
                <div className="border-b border-[rgba(0,0,0,.1)] overflow-hidden">
                    <div className="bg-white  from-gray-900 to-gray-700 pb-8 ">
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                            <div className="relative flex shrink-0 overflow-hidden rounded-full w-24 h-24 border-4 border-white shadow-lg">
                                <Image width={100}
                                    height={100} className="aspect-square rounded-full object-cover" src={record?.record?.userId?.profile_photo || teacherImg} alt="teacher profile" />
                            </div>
                            <div className="flex-2">
                                <div className="flex items-center gap-3 mb-1">
                                    <h1 className="text-3xl font-bold">{record?.record?.userId?.name}</h1>
                                    <IoShieldCheckmark className={`${record?.record?.admin_approved === true ? 'text-green-500' : 'text-gray-400'}`} size={18} />

                                </div>
                                <div className="flex items-center mb-2 gap-1">
                                    <a className="text-base text-gray-400 hover:text-[#CC2828]" href={`mailto:${record?.record?.userId?.email}`}>{record?.record?.userId?.email}</a>
                                </div>

                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                                    <div className="flex items-center gap-1">
                                        <FiMapPin className="w-4 h-4" />
                                        <span>{record?.record?.city} </span><span>{record?.record?.userId?.nationality || 'Na'}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <FaGlobe className="w-4 h-4" />
                                        <span> {record?.record?.userId?.time_zone || 'Na'}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <FaRegCalendarAlt className="w-4 h-4" />
                                        <span>{record?.record?.experience} years experience</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <VideoModalPlayer video={record?.record?.intro_video}
                                    image={record?.record?.userId?.profile_photo}
                                    name={record?.record?.userId?.name}
                                    divClass="relative lg:h-[200px]"
                                    imgClass="w-full h-[150px] sm:h-[150px]  md:h-[170px] lg:h-[200px] rounded-[6px] md:rounded-[10px]"
                                    btnClass="absolute top-1/2 left-0 right-0 mx-auto -translate-y-1/2 text-white hover:text-[#CC2828] w-[65px] text-center cursor-pointer"
                                    iconClass="h-16 w-16"
                                />

                            </div>
                        </div>

                    </div>
                </div>



                <div className="pt-2.5 space-x-1 md:space-x-2 lg:space-x-5 overflow-y-auto whitespace-nowrap">

                    <button
                        onClick={() => handleTabClick('about')}
                        className={`tracking-[-0.03em] mb-3 font-medium text-sm uppercase outline-none focus:outline-none ease-linear transition-all  border duration-150 rounded-xl py-2 px-2 md:px-8 lg:px-12 ${activeTab === 'about' ? 'text-[#CC2828] bg-[#F2F2F2] bg-opacity-10 border-[#CC2828] border-opacity-40' : ' border-black border-opacity-10 text-[#CC2828]  '}`}
                    >
                        About Us
                    </button>
                    <button
                        onClick={() => handleTabClick('booking')}
                        className={`tracking-[-0.03em] mb-3 font-medium text-sm uppercase outline-none focus:outline-none ease-linear transition-all  border duration-150 rounded-xl py-2 px-2 md:px-8 lg:px-12 ${activeTab === 'booking' ? 'text-[#CC2828] bg-[#F2F2F2] bg-opacity-10 border-[#CC2828] border-opacity-40' : ' border-black border-opacity-10 text-[#CC2828]  '}`}
                    >
                        booking
                    </button>
                    <button
                        onClick={() => handleTabClick('lesson')}
                        className={`tracking-[-0.03em] mb-3 font-medium text-sm uppercase outline-none focus:outline-none ease-linear transition-all  border duration-150 rounded-xl py-2 px-2 md:px-8 lg:px-12 ${activeTab === 'lesson' ? 'text-[#CC2828] bg-[#F2F2F2] bg-opacity-10 border-[#CC2828] border-opacity-40' : ' border-black border-opacity-10 text-[#CC2828]  '}`}
                    >
                        Lesson
                    </button>
                    <button
                        onClick={() => handleTabClick('payout')}
                        className={`tracking-[-0.03em] mb-3 font-medium text-sm uppercase outline-none focus:outline-none ease-linear transition-all  border duration-150 rounded-xl py-2 px-2 md:px-8 lg:px-12 ${activeTab === 'payout' ? 'text-[#CC2828] bg-[#F2F2F2] bg-opacity-10 border-[#CC2828] border-opacity-40' : ' border-black border-opacity-10 text-[#CC2828]  '}`}
                    >
                        Payout
                    </button>
                    <button
                        onClick={() => handleTabClick('review')}
                        className={`tracking-[-0.03em] mb-3 font-medium text-sm uppercase outline-none focus:outline-none ease-linear transition-all  border duration-150 rounded-xl py-2 px-2 md:px-8 lg:px-12 ${activeTab === 'review' ? 'text-[#CC2828] bg-[#F2F2F2] bg-opacity-10 border-[#CC2828] border-opacity-40' : ' border-black border-opacity-10 text-[#CC2828]  '}`}
                    >
                        Review
                    </button>
                </div>
                <div className="pt-2 md:pt-3">
                    <div className="mt-0">
                        {activeTab === 'about' &&

                            <AboutUs record={record?.record} />
                        }
                        {activeTab === 'payout' &&

                            <Payout payout={record?.payoutdata} />
                        }
                        {activeTab === 'booking' &&

                            <BookingList book={record?.Booking} />
                        }
                        {activeTab === 'lesson' &&
                            <LessonList lessons={record?.lessondata} />
                        }
                    </div>
                </div>

            </div>

        </AdminLayout>
    );
};

export default Index;
