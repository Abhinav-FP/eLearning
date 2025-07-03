import React, { useEffect, useState } from "react";
import Layout from "../common/Layout";
import Image from "next/image";
import teacherImg from "../Assets/Images/teacherimg.jpg";
import LessonList from "./LessonList";
import Testimonial from "./Testimonial";
import Heading from "../common/Heading";
import Calendar from "../calendar/index.jsx";
import VideoModalPlayer from "../common/VideoModalPlayer";
import { useRouter } from "next/router";
import Listing from "../api/Listing";
import BookingPopup from "./BookingPopup";
import { BookLoader } from "../../components/Loader";
import { BiSolidBadgeCheck } from "react-icons/bi";
import TeacherImg from "../Assets/Images/Placeholder.png";
import VideoModalDetail from "../common/VideoModalDetail";

export default function Index() {
  const router = useRouter();
  const { slug } = router.query;
  const { book } = router.query;
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");
  const [mergedAvailability, setMergedAvailability] = useState("");
  const [lessons, setLessons] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(book ? true : false);
  const [studentTimeZone, setStudentTimeZone] = useState(null);
  const closePopup = () => {
    setIsPopupOpen(false);
    
  };
  const Id = data?.userId?._id;


  useEffect(() => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    setStudentTimeZone(timeZone);
  }, []);

  const fetchLessons = async (Id) => {
    try {
      setLoading(true);
      const main = new Listing();
      const response = await main.TeacherLessonGetForStudent(Id);
      if (response.data) {
        setLessons(response.data.data);
        setLoading(false);
      } else {
        setLessons([]);
        setLoading(false);
      }
    } catch (error) {
      console.log("error", error);
      setLessons([]);
      setLoading(false);
    }
  };

  const fetchData = async (slug) => {
    try {
      const main = new Listing();
      const response = await main.TeachergetbyId(slug);
      if (response.data) {
        setdata(response.data.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchAvailabilitys = async (Id) => {
    try {
      const main = new Listing();
      const response = await main.studentteacherAvaliability(Id);
      if (response.data) {
        const availabilityBlocks = response.data.data.availabilityBlocks || [];

        // Sort by start time
        const sorted = [...availabilityBlocks].sort(
          (a, b) => new Date(a.startDateTime) - new Date(b.startDateTime)
        );

        // Merge continuous slots
        const merged = [];
        for (let i = 0; i < sorted.length; i++) {
          const current = sorted[i];
          if (
            merged.length > 0 &&
            merged[merged.length - 1].endDateTime === current.startDateTime
          ) {
            // Extend the previous block
            merged[merged.length - 1].endDateTime = current.endDateTime;
          } else {
            // Start a new block
            merged.push({ ...current });
          }
        }

        setContent(response.data.data);
        setMergedAvailability(merged);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchData(slug);
    }
    if (Id) {
      fetchAvailabilitys(Id);
      fetchLessons(Id);
    }
  }, [slug, Id]);

  const DescriptionWithViewMore = ({ description }) => {
    const [expanded, setExpanded] = useState(false);

    const words = description?.split(" ") || [];
    const isLong = words.length > 100;
    const shortText = words.slice(0, 100).join(" ");
    const remainingText = words.slice(100).join(" ");

    return (
      <div className="text-white tracking-[-0.03em] text-base font-medium">
        <p>
          {expanded || !isLong ? description : shortText + "..."}
          {isLong && !expanded && (
            <button
              className="ml-2 text-white hover:text-blue-400 underline cursor-pointer"
              onClick={() => setExpanded(true)}
            >
              Read More
            </button>
          )}
        </p>
        {expanded && isLong && (
          <p className="mt-2">
            {remainingText}
          </p>
        )}
      </div>
    );
  };

  return (
    <>
      <Layout>
        {loading ?
          <div className="min-h-screen flex items-center justify-center">
            <BookLoader />
          </div>
          : <>
            <div className="pt-[114px] md:pt-[124px] lg:pt-[154px]  pb-[40px]  md:pb-[60px] lg:pb-[80px] xl:pb-[100px] ">
              <div className="container sm:container md:container lg:container xl:max-w-[1230px]  px-4 mx-auto">
                <div className="bg-[rgba(204,40,40,0.8)] rounded-[20px] py-6 lg:py-[30px] px-6 md:px-[30px] lg:px-[30px] xl:px-[45px]">
                  <div className="flex flex-wrap -mx-4 space-y-4">
                    {data?.intro_video &&
                      <div className="mx-auto md:mx-0 w-[280px] md:w-[280px] lg:w-[308px] px-4">
                        <VideoModalDetail
                          video={data?.intro_video}
                          image={data?.userId?.profile_photo || teacherImg}
                          name={data?.userId?.name}
                          divClass="relative"
                          imgClass="rounded-[10px] h-[240px] w-[276px] object-cover"
                          btnClass="absolute top-1/2  cursor-pointer left-0 w-[81px] text-center text-white hover:text-[#CC2828] right-0 mx-auto -translate-y-1/2"
                        />
                      </div>}
                    <div className="w-full md:w-[calc(100%-280px)] lg:w-[calc(100%-308px)] px-4">
                      <div className="relative after:right-0 after:top-2 after:bottom-2 after:width-[1px] after-bg-white">
                        <div className="flex items-center gap-2 mb-2 lg:mb-4">
                          <div className="h-[32px] w-[32px] lg:h-[45px] lg:w-[45px] rounded-full overflow-hidden">
                            <Image
                              src={data?.userId?.profile_photo || TeacherImg}
                              alt={data?.userId?.name}
                              width={164}
                              height={164}
                              className="h-[32px] w-[32px] lg:h-[45px] lg:w-[45px] rounded-full object-cover"
                            />
                          </div>
                          <h3 className="text-white text-[24px] md:text-[30px] lg:text-[36px] xl:text-[45px] font-inter font-extrabold tracking-[-0.04em] capitalize">
                            {data?.userId?.name || ""}{" "}
                            {data?.admin_approved === true ? (<BiSolidBadgeCheck className="inline text-[#6ABB52] w-[32px] h-[32x]" size={32} />) : ""}
                          </h3>
                        </div>
                        {/* Fields other than description */}
                        <div className="flex flex-wrap  gap-x-2 md:gap-x-6 lg:gap-x-8 mb-2 lg:mb-4 text-white text-base font-medium">
                          {data?.tags && data?.tags?.length > 0 &&
                            <div>
                              <span className="-tracking-[0.03em] pr-2">Specialities :</span>
                              <span className="capitalize -tracking-[0.03em] ">{data?.tags?.join(", ") || ""}</span>
                            </div>}
                          {data?.languages_spoken &&
                            <div>
                              <span className="-tracking-[0.03em] pr-2">Language :</span>
                              <span className="capitalize -tracking-[0.03em] ">{data?.languages_spoken?.join(", ") || ""}</span>
                            </div>}
                          {data?.userId?.nationality &&
                            <div>
                              <span className="-tracking-[0.03em] pr-2">Nationality :</span>
                              <span className="capitalize -tracking-[0.03em] ">{data?.userId?.nationality}</span>
                            </div>
                          }

                          <div>
                            <span className="-tracking-[0.03em] pr-2">Gender :</span>
                            <span className="capitalize -tracking-[0.03em] ">
                              {data?.gender === 'M' ? 'Male' : data?.gender === 'F' ? 'Female' : 'Other'}</span>
                          </div>

                          {data?.userId?.time_zone &&
                            <div>
                              <span className="-tracking-[0.03em] pr-2">Time zone :</span>
                              <span className="-tracking-[0.03em] ">{data?.userId?.time_zone} </span>
                            </div>
                          }
                          {/* {data?.experience &&
                            <div>
                              <span className="-tracking-[0.03em] pr-2">Experience :</span>
                              <span className="-tracking-[0.03em] ">{data?.experience}  Years</span>
                            </div>
                          } */}
                        </div>
                        <DescriptionWithViewMore description={data?.description || ""} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* New Design */}
            {/* <div className="pt-[114px] md:pt-[124px] lg:pt-[154px]  pb-[40px]  md:pb-[60px] lg:pb-[80px] xl:pb-[100px] ">
              <div className="container sm:container md:container lg:container xl:max-w-[1230px]  px-4 mx-auto">
                <div className="flex flex-wrap -mx-4 space-y-4 md:space-y-0">
                  <div className="w-full md:w-8/12 px-4">
                    <div className="flex flex-wrap teacherBox p-6 lg:p-10 rounded-[20px] min-h-full ">
                      <div className="w-full md:w-[112px] ">
                        <div className="h-[80px] w-[80px] lg:h-[112px] lg:w-[112px] rounded-full overflow-hidden   mx-0 mb-3 lg:mb-6 ">
                          <Image src={data?.userId?.profile_photo || TeacherImg} alt={data?.userId?.name} width={164} height={164} />
                        </div>
                      </div>
                      <div className="w-full md:w-[calc(100%-112px)] mt-2 md:mt-0 md:pl-6 lg:pl-8">
                        <h3 className="text-black text-xl lg:text-2xl font-bold -tracking-[0.03em] text-left mb-2.5 lg:mb-4"> {data?.userId?.name || ""} {data?.admin_approved === true ?  ( <BiSolidBadgeCheck className="inline text-[#6ABB52]" size={22} /> ) : ""} </h3>
                        <div className="flex flex-wrap  gap-x-2 md:gap-x-6 lg:gap-x-8 mb-3 lg:mb-5">
                          {data?.tags && data?.tags?.length>0 &&
                            <div>
                              <span className="text-[#8D929A] text-base -tracking-[0.03em] pr-2">Specialities :</span>
                              <span className="capitalize text-black text-base -tracking-[0.03em] ">{data?.tags?.join(", ") || ""}</span>
                            </div>}
                          {data?.languages_spoken &&
                            <div>
                              <span className="text-[#8D929A] text-base -tracking-[0.03em] pr-2">Language :</span>
                              <span className="capitalize text-black text-base -tracking-[0.03em] ">{data?.languages_spoken?.join(", ") || ""}</span>
                            </div>}
                          {data?.userId?.nationality &&
                            <div>
                              <span className="text-[#8D929A] text-base -tracking-[0.03em] pr-2">Nationality :</span>
                              <span className="capitalize text-black text-base -tracking-[0.03em] ">{data?.userId?.nationality}</span>
                            </div>
                          }

                          <div>
                            <span className="text-[#8D929A] text-base -tracking-[0.03em] pr-2">Gender :</span>
                            <span className="capitalize text-black text-base -tracking-[0.03em] ">
                              {data?.gender === 'M' ? 'Male' : data?.gender === 'F' ? 'Female' : 'Other'}</span>
                          </div>

                          {data?.userId?.time_zone &&
                            <div>
                              <span className="text-[#8D929A] text-base -tracking-[0.03em] pr-2">Time zone: :</span>
                              <span className="text-black text-base -tracking-[0.03em] ">{data?.userId?.time_zone} </span>
                            </div>
                          }
                          {data?.experience &&
                            <div>
                              <span className="text-[#8D929A] text-base -tracking-[0.03em] pr-2">Experience :</span>
                              <span className="text-black text-base -tracking-[0.03em] ">{data?.experience}  Years</span>
                            </div>
                          } 
                        </div>
                          <DescriptionWithViewMore description={data?.description}/>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-4/12 px-4">
                    <div className="teacherBox rounded-[20px] p-4 lg:p-5">
                      {data?.intro_video &&
                        <VideoModalDetail
                          video={data?.intro_video}
                          image={data?.userId?.profile_photo || teacherImg}
                          name={data?.userId?.name}
                          iconClass="w-16 h-16 mx-auto block"
                          divClass="relative"
                          imgClass="rounded-[10px] h-[187px] w-full object-cover"
                          btnClass="absolute top-1/2  cursor-pointer left-0 w-[81px] text-center text-white hover:text-[#CC2828] right-0 mx-auto -translate-y-1/2"
                        />
                      }
                      <div className="flex flex-wrap mt-4 lg:mt-6">
                        <div className="w-6/12">
                          <span className="text-black text-sm -tracking-[0.03em] text-sm">
                            Lessons starts from
                          </span>
                          <div className="text-black font-bold text-base -tracking-[0.03em]">
                           {formatMultiPrice(data?.priceStart, "USD")} 
                          </div>
                        </div>
                        <div className="w-6/12 text-right">
                          <button className='inline-block font-medium cursor-pointer rounded-full py-2 px-5 bg-[#CC2828] hover:bg-[#ad0e0e] text-white text-sm lg:text-base py-2.5 px-3 lg:px-4 lg:px-6'
                            onClick={()=>{
                              setIsPopupOpen(true);
                            }}
                          >
                            Book a Lesson
                          </button> 
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}

            {/* Extra fields div */}
            <div
              style={{ backgroundImage: "url('/leasson-bg.png')" }}
              className="bg-[rgba(249,190,191,.5)] bg-cover bg-center rounded-[20px] py-[40px] lg:py-[60px]"
            >
              <div className="container sm:container md:container lg:container xl:max-w-[1230px]  bg-[rgba(249,190,191, .1)] px-4 mx-auto">
                <Heading
                  classess={"text-[#CC2828] mb-6 lg:mb-8"}
                  title={"Lessons"}
                />
                <LessonList lessons={lessons?.lessons} showSelected={false} slug={slug} />
              </div>
            </div>
            <div className="pt-[40px] md:pt-[60px] md:pt-[80px] xl:pt-[100px] pb-[40px] lg:pb-[60px] bg-[#F8F9FA]" id="calendar">
              <div className="container sm:container md:container lg:container xl:max-w-[1230px]  px-4 mx-auto">
                <Heading
                  classess={"text-[#1E1E1E] mb-2"}
                  title={"Availabilities"}
                />
                <p className="text-sm text-gray-600 mb-6 lg:mb-8">
                  {`All calendar times are displayed based on your device's current time zone: ${studentTimeZone || "NA"}. Please ensure your system time is accurate to avoid any scheduling discrepancies.`}
                </p>
                <Calendar Availability={content} setIsPopupOpen={setIsPopupOpen} usedInPopup={false} mergedAvailability={mergedAvailability} />
              </div>
            </div>
            <Testimonial reviews={lessons?.reviews} />
          </>}
        <BookingPopup
          isOpen={isPopupOpen}
          onClose={closePopup}
          lessons={lessons}
          Availability={content}
          studentTimeZone={studentTimeZone}
          loading={loading}
          mergedAvailability={mergedAvailability}
        />
      </Layout>
    </>
  );
}
