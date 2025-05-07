import React, { useEffect, useState } from "react";
import Layout from "../common/Layout";
import Image from "next/image";
import teacherImg from "../Assets/Images/teacherimg.jpg";
import LessonList from "./LessonList";
import Testimonial from "./Testimonial";
import Heading from "../common/Heading";
import Calendar from "../calendar/index.jsx";
import VideoModalPlayer from "../common/VideoModalPlayer";
import { MdOutlinePlayCircle } from "react-icons/md";
import { useRouter } from "next/router";
import Listing from "../api/Listing";
import BookingPopup from "./BookingPopup";
import { DateTime } from "luxon";

export default function Index() {
  const router = useRouter();
  const { slug } = router.query;
  const [data, setdata] = useState([]);
  const [content, setContent] = useState("");
  const [lessons, setLessons] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [studentTimeZone, setStudentTimeZone]=useState(null);
  const closePopup = () => setIsPopupOpen(false);
  const Id = data?.userId?._id;

  // Get timezone
  useEffect(() => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    setStudentTimeZone(timeZone);
  }, []);

  const fetchLessons = async (Id) => {
    try {
      const main = new Listing();
      const response = await main.TeacherLessonGetForStudent(Id);
      // console.log("response", response);
      if (response.data) {
        setLessons(response.data.data);
      } else {
        setLessons([]);
      }
    } catch (error) {
      console.log("error", error);
      setLessons([]);
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
      // console.log("response", response);
      if (response.data) {
        setContent(response.data.data);
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
  // console.log("data", data);
  // console.log("content" ,content)

  return (
    <>
      <Layout>
        <div className="pt-[114px] md:pt-[124px] lg:pt-[154px]  pb-[40px]  md:pb-[60px] lg:pb-[80px] xl:pb-[100px] ">
          <div className="container sm:container md:container lg:container xl:max-w-[1230px]  px-4 mx-auto">
            <div className="bg-[rgba(204,40,40,0.8)] rounded-[20px] py-6 lg:py-[30px] px-6 md:px-[30px] lg:px-[30px] xl:px-[45px]">
              <div className="flex flex-wrap -mx-4 space-y-4">
                <div className="mx-auto md:mx-0 w-[280px] md:w-[280px] lg:w-[308px] px-4">
                  <VideoModalPlayer
                    video={data?.intro_video}
                    image={data?.profile_photo || teacherImg}
                    name={data?.userId?.name}
                    divClass="relative"
                    imgClass="rounded-[10px] h-[276px] w-[276px]"
                    btnClass="absolute top-1/2  cursor-pointer left-0 w-[81px] text-center text-white hover:text-[#CC2828] right-0 mx-auto -translate-y-1/2"
                  />
                </div>
                <div className="w-full md:w-[calc(100%-280px)] lg:w-[calc(100%-308px)] px-4">
                  <div className="relative after:right-0 after:top-2 after:bottom-2 after:width-[1px] after-bg-white">
                    <h3 className="text-white text-[24px] md:text-[30px] lg:text-[36px] xl:text-[45px] font-inter font-extrabold tracking-[-0.04em] mb-2">
                      {data?.userId?.name || ""}
                    </h3>
                    <p className="text-white tracking-[-0.03em] text-base lg:text-lg xl:text-xl font-medium">
                      {data?.description || ""}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{ backgroundImage: "url('/leasson-bg.png')" }}
          className="bg-[rgba(249,190,191,.5)] bg-cover bg-center rounded-[20px] py-[40px] lg:py-[60px]"
        >
          <div className="container sm:container md:container lg:container xl:max-w-[1230px]  bg-[rgba(249,190,191, .1)] px-4 mx-auto">
            <Heading
              classess={"text-[#CC2828] mb-6 lg:mb-8"}
              title={"Lessons"}
            />
            <LessonList lessons={lessons} showSelected={false}/>
          </div>
        </div>
        <div className="pt-[40px md:pt-[60px] md:pt-[80px] xl:pt-[100px] pb-[40px] lg:pb-[60px] bg-[#F8F9FA]">
          <div className="container sm:container md:container lg:container xl:max-w-[1230px]  px-4 mx-auto">
            <Heading
              classess={"text-[#1E1E1E] mb-2"}
              title={"Availabilities"}
            />
            <p className="text-sm text-gray-600 mb-6 lg:mb-8">
              {`All calendar times are displayed based on your device's current time zone: ${studentTimeZone || "NA"}. Please ensure your system time is accurate to avoid any scheduling discrepancies.`}
            </p>
            <Calendar Availability={content} setIsPopupOpen={setIsPopupOpen} usedInPopup={false}/>
          </div>
        </div>
        <Testimonial/>
        <BookingPopup
          isOpen={isPopupOpen}
          onClose={closePopup}
          lessons={lessons}
          Availability={content}
          studentTimeZone={studentTimeZone}
        />
      </Layout>
    </>
  );
}
