import AdminLayout from "../common/AdminLayout";
import Image from "next/image";
import teacherImg from '../../Assets/Images/teacherimg.jpg';
import { FaGlobe, FaRegCalendarAlt } from "react-icons/fa";
import { IoShieldCheckmark } from "react-icons/io5";
import { FiMapPin } from "react-icons/fi";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Listing from "@/pages/api/Listing";
import VideoModalPlayer from "@/pages/common/VideoModalPlayer";
import AboutUs from "./AboutUs";
import Payout from "./Payout";
import LessonList from "./LessonList";
import BookingList from "./BookingList";
import ReviewList from "./ReviewList";
import { TeacherProfileHeaderShimmer } from "@/components/Loader";
import VideoModalDetail from "@/pages/common/VideoModalDetail";

const Index = ({ }) => {
    const router = useRouter();
    const Id = router?.query?.slug
    const [record, setRecord] = useState("")
    const [Loading, setLoading] = useState(false);

    const timezoneMappings = {
        "Asia/Tokyo": "Japan (JST) (GMT+9)",
        "America/New_York": "New York (Eastern Time) (GMT-4)",
        "America/Denver": "Denver (Mountain Time) (GMT-6)",
        "America/Chicago": "Chicago (Central Time) (GMT-5)",
        "America/Los_Angeles": "Los Angeles (Pacific Time) (GMT-7)",
        "Europe/London": "London (GMT) (GMT+1)",
        "Europe/Berlin": "Berlin (CET) (GMT+2)",
        "Europe/Kyiv": "Kyiv (EET) (GMT+3)",
        "Asia/Kolkata": "India (IST) (GMT+5.5)",
        "Asia/Shanghai": "China (CST) (GMT+8)",
        "Asia/Seoul": "Korea (KST) (GMT+9)",
        "Australia/Sydney": "Sydney (AEST) (GMT+10)",
        "Pacific/Auckland": "New Zealand (NZST) (GMT+12)",
        "Asia/Singapore": "Singapore (SGT) (GMT+8)",
        "America/Sao_Paulo": "Brazil (BRT) (GMT-3)",
        "America/Argentina/Buenos_Aires": "Argentina (ART) (GMT-3)",
        "America/Anchorage": "Alaska (AKST) (GMT-8)",
        "Pacific/Honolulu": "Hawaii (HAST) (GMT-10)",
        "Europe/Moscow": "Moscow (MSK) (GMT+3)",
        "America/Halifax": "Atlantic (AST) (GMT-3)"
    };

    const AdminTteacher = async () => {
        try {
            setLoading(true);
            const main = new Listing();
            const response = await main.AdminTeacherData(Id);
            setRecord(response?.data?.data);
            setLoading(false);
        } catch (error) {
            console.log("error", error);
            setLoading(false);

        }
    };

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
                {Loading ? (
                    <TeacherProfileHeaderShimmer />
                ) : (
                    <>
                        <div className="border-b border-[rgba(0,0,0,.1)] overflow-hidden">
                            <div className="bg-white  from-gray-900 to-gray-700 pb-8 ">
                                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                                    <div className="relative flex shrink-0 overflow-hidden rounded-full w-24 h-24 border-4 border-white shadow-lg">
                                        <Image width={100}
                                            height={100} className="aspect-square rounded-full object-cover" src={record?.record?.userId?.profile_photo || "/Placeholder.png"} alt="teacher profile" />
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
                                                <span>{record?.record?.city} </span><span>{record?.record?.userId?.nationality || 'N/A'}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <FaGlobe className="w-4 h-4" />
                                                <span> {timezoneMappings[record?.record?.userId?.time_zone] || 'N/A'}</span>
                                            </div>
                                            {/* <div className="flex items-center gap-1">
                                                <FaRegCalendarAlt className="w-4 h-4" />
                                                <span>{record?.record?.experience} years experience</span>
                                            </div> */}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        {record?.record?.intro_video &&
                                            <VideoModalDetail video={record?.record?.intro_video}
                                                image={record?.record?.userId?.profile_photo}
                                                name={record?.record?.userId?.name}
                                                divClass="relative lg:h-[200px]"
                                                imgClass="w-full h-[150px] sm:h-[150px]  md:h-[170px] lg:h-[200px] rounded-[6px] md:rounded-[10px]"
                                                btnClass="absolute top-1/2 left-0 right-0 mx-auto -translate-y-1/2 text-white hover:text-[#CC2828] w-[65px] text-center cursor-pointer"
                                                iconClass="h-16 w-16"
                                            />}
                                    </div>
                                </div>

                            </div>
                        </div>



                        <div className="pt-2.5 flex flex-wrap md:flex-nowrap gap-2 md:gap-3 lg:gap-5 overflow-x-auto md:overflow-x-visible">
                            <button
                                onClick={() => handleTabClick('about')}
                                className={`tracking-[-0.03em] font-medium cursor-pointer text-xs sm:text-sm md:text-base uppercase outline-none focus:outline-none ease-linear transition-all border duration-150 rounded-xl py-2 px-4 md:px-8 lg:px-12
      ${activeTab === 'about'
                                        ? 'text-[#CC2828] bg-[#F2F2F2] bg-opacity-10 border-[#CC2828] border-opacity-40'
                                        : 'border-black border-opacity-10 text-[#CC2828]'}`}
                            >
                                About Us
                            </button>
                            <button
                                onClick={() => handleTabClick('booking')}
                                className={`tracking-[-0.03em] font-medium cursor-pointer text-xs sm:text-sm md:text-base uppercase outline-none focus:outline-none ease-linear transition-all border duration-150 rounded-xl py-2 px-4 md:px-8 lg:px-12
      ${activeTab === 'booking'
                                        ? 'text-[#CC2828] bg-[#F2F2F2] bg-opacity-10 border-[#CC2828] border-opacity-40'
                                        : 'border-black border-opacity-10 text-[#CC2828]'}`}
                            >
                                Booking
                            </button>
                            <button
                                onClick={() => handleTabClick('lesson')}
                                className={`tracking-[-0.03em] font-medium cursor-pointer text-xs sm:text-sm md:text-base uppercase outline-none focus:outline-none ease-linear transition-all border duration-150 rounded-xl py-2 px-4 md:px-8 lg:px-12
      ${activeTab === 'lesson'
                                        ? 'text-[#CC2828] bg-[#F2F2F2] bg-opacity-10 border-[#CC2828] border-opacity-40'
                                        : 'border-black border-opacity-10 text-[#CC2828]'}`}
                            >
                                Lesson
                            </button>
                            <button
                                onClick={() => handleTabClick('payout')}
                                className={`tracking-[-0.03em] font-medium cursor-pointer text-xs sm:text-sm md:text-base uppercase outline-none focus:outline-none ease-linear transition-all border duration-150 rounded-xl py-2 px-4 md:px-8 lg:px-12
      ${activeTab === 'payout'
                                        ? 'text-[#CC2828] bg-[#F2F2F2] bg-opacity-10 border-[#CC2828] border-opacity-40'
                                        : 'border-black border-opacity-10 text-[#CC2828]'}`}
                            >
                                Payout
                            </button>
                            <button
                                onClick={() => handleTabClick('review')}
                                className={`tracking-[-0.03em] font-medium cursor-pointer text-xs sm:text-sm md:text-base uppercase outline-none focus:outline-none ease-linear transition-all border duration-150 rounded-xl py-2 px-4 md:px-8 lg:px-12
      ${activeTab === 'review'
                                        ? 'text-[#CC2828] bg-[#F2F2F2] bg-opacity-10 border-[#CC2828] border-opacity-40'
                                        : 'border-black border-opacity-10 text-[#CC2828]'}`}
                            >
                                Review
                            </button>
                        </div>

                    </>
                )}

                <div className="pt-2 md:pt-3">
                    <div className="mt-0">
                        {activeTab === 'about' &&
                            <AboutUs record={record?.record} loading={Loading} />
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
                        {activeTab === 'review' &&
                            <ReviewList reviews={record?.filteredReviews} />
                        }
                    </div>
                </div>

            </div>

        </AdminLayout>
    );
};

export default Index;
