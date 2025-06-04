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
import { BookLoader } from "../../components/Loader";
import { formatMultiPrice } from "@/components/ValueDataHook";

export default function Index() {
  const router = useRouter();
  const { slug } = router.query;
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");
  const [lessons, setLessons] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [studentTimeZone, setStudentTimeZone] = useState(null);
  const closePopup = () => setIsPopupOpen(false);
  const Id = data?.userId?._id;

  const QualificationMapping = {
    "high_school": "High School Diploma",
    "associate_degree": "Associate Degree",
    "ba": "Bachelor of Arts (BA)",
    "bsc": "Bachelor of Science (BSc)",
    "bcom": "Bachelor of Commerce (BCom)",
    "be": "Bachelor of Engineering (BE)",
    "btech": "Bachelor of Technology (BTech)",
    "bed": "Bachelor of Education (B.Ed)",
    "ma": "Master of Arts (MA)",
    "msc": "Master of Science (MSc)",
    "mcom": "Master of Commerce (MCom)",
    "me": "Master of Engineering (ME)",
    "mtech": "Master of Technology (MTech)",
    "med": "Master of Education (M.Ed)",
    "mba": "Master of Business Administration (MBA)",
    "phd": "Doctor of Philosophy (PhD)",
    "edd": "Doctor of Education (EdD)",
    "jd": "Juris Doctor (JD)",
    "md": "Medical Doctor (MD)",
    "ca": "Chartered Accountant (CA)",
    "cs": "Company Secretary (CS)",
    "cpa": "Certified Public Accountant (CPA)",
    "diploma_education": "Diploma in Education",
    "diploma_engineering": "Diploma in Engineering",
    "pg_diploma": "Postgraduate Diploma",
    "senmonshi": "Senmonshi (専門士 - Vocational School Degree)",
    "kosen": "Kōtō Senmon Gakkō (高等専門学校 - College of Technology)",
    "other": "Other"
  };

  // Get timezone
  useEffect(() => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    setStudentTimeZone(timeZone);
  }, []);

  const fetchLessons = async (Id) => {
    try {
      setLoading(true);
      const main = new Listing();
      const response = await main.TeacherLessonGetForStudent(Id);
      // console.log("response", response);
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

  const DescriptionWithViewMore = ({ description }) => {
    const [expanded, setExpanded] = useState(false);

    const words = description?.split(" ") || [];
    const isLong = words.length > 100;
    const shortText = words.slice(0, 100).join(" ");
    const remainingText = words.slice(100).join(" ");

    return (
      <div className="text-white tracking-[-0.03em] text-base lg:text-lg xl:text-xl font-medium">
        <p>
          {expanded || !isLong ? description : shortText + "..."}
          {isLong && !expanded && (
            <button
              className="ml-2 text-white hover:text-blue-400 underline cursor-pointer"
              onClick={() => setExpanded(true)}
            >
              View More
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
                    <div className="mx-auto md:mx-0 w-[280px] md:w-[280px] lg:w-[308px] px-4">
                      <VideoModalPlayer
                        video={data?.intro_video}
                        image={data?.userId?.profile_photo || teacherImg}
                        name={data?.userId?.name}
                        divClass="relative"
                        imgClass="rounded-[10px] h-[276px] w-[276px] object-cover"
                        btnClass="absolute top-1/2  cursor-pointer left-0 w-[81px] text-center text-white hover:text-[#CC2828] right-0 mx-auto -translate-y-1/2"
                      />
                    </div>
                    <div className="w-full md:w-[calc(100%-280px)] lg:w-[calc(100%-308px)] px-4">
                      <div className="relative after:right-0 after:top-2 after:bottom-2 after:width-[1px] after-bg-white">
                        <h3 className="text-white text-[24px] md:text-[30px] lg:text-[36px] xl:text-[45px] font-inter font-extrabold tracking-[-0.04em] mb-2">
                          {data?.userId?.name || ""}
                        </h3>
                        <p className="text-white tracking-[-0.03em] text-base lg:text-lg xl:text-xl font-medium">
                          <DescriptionWithViewMore description={data?.description || ""} />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            {/* Extra fields div */}
            <div className="pb-[40px] md:pb-[80px] bg-[#F8F9FA]">
              <div className="container sm:container md:container lg:container xl:max-w-[1230px]  px-4 mx-auto">
                <Heading
                  classess={"text-[#1E1E1E] mb-2"}
                  title={"Other Details"}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 text-gray-600 text-base xl:text-lg font-semibold font-inter py-2.5 lg:rounded-full mb-6 lg:mb-8">
                  {data?.userId?.nationality &&
                    <p><strong>Nationality:</strong> {data?.userId?.nationality}</p>}
                  {data?.userId?.time_zone &&
                    <p><strong>Timezone:</strong> {data?.userId?.time_zone}</p>}
                  {data?.userId?.nationality &&
                    <p><strong>Gender:{" "}</strong>
                      {data?.gender === 'M' ? 'Male' :
                        data?.gender === 'F' ? 'Female' :
                          'Other'
                      }</p>}
                  {data?.experience &&
                    <p><strong>Experience:</strong> {data?.experience} years</p>}
                  {data?.qualifications &&
                    <p><strong>Qualifications:{" "}</strong>
                      {QualificationMapping[data?.qualifications] || ""}
                    </p>}
                  {data?.languages_spoken &&
                    <p><strong>Languages:</strong> {data?.languages_spoken?.join(', ')}</p>}
                  {data?.average_duration &&
                    <p><strong>Avg. Duration:</strong> {data?.average_duration} mins</p>}
                  {data?.average_price &&
                    <p><strong>Avg. Price:</strong> {formatMultiPrice(data?.average_price, "USD")}</p>}
                  {data?.documentlink &&
                    <p><strong>Certification:{" "}</strong>
                      <a href={data?.documentlink} target="_blank" rel="noopener noreferrer"
                        className="underline">
                        View Document
                      </a></p>
                  }
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
                <LessonList lessons={lessons} showSelected={false} slug={slug} />
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
                <Calendar Availability={content} setIsPopupOpen={setIsPopupOpen} usedInPopup={false} />
              </div>
            </div>
            <Testimonial />
          </>}
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
