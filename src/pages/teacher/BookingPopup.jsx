import React, { useEffect, useState } from "react";
// import Popup from "../common/Popup";
import LessonList from "./LessonList";
import Heading from "../common/Heading";
import Calendar from "../calendar/index.jsx";
import PaymentCheckout from "./PaymentCheckout";
import { IoCloseSharp } from "react-icons/io5";
import { useRole } from "@/context/RoleContext";
import { IoMdTime } from "react-icons/io";
import { FaBookReader } from "react-icons/fa";
import { formatMultiPrice } from "@/components/ValueDataHook";
import Listing from "../api/Listing";
import LessonType from "./LessonType";
import MultipleLessonPayment from "./MultipleLessonPayment";
import toast from "react-hot-toast";
import moment from "moment";

export default function BookingPopup({
  isOpen,
  onClose,
  lessons,
  Availability,
  studentTimeZone,
  setStudentTimeZone,
  loading,
  mergedAvailability,
  slug,
  bulkBookingAllowed,
}) {
  const { user } = useRole();

  const [step, setStep] = useState(1);
  const [selectedLesson, SetSelectedLesson] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [commission, setCommission] = useState(null);
  const [hasBulkLesson, setHasBulkLesson] = useState(false);
  const [multipleLessons, setMultipleLessons] = useState("");
  const [lessonType, setLessonType] = useState("single");

  function getFormattedEndTime(time, durationInMinutes) {
    if (!time) return "";

    return moment(time)
      .add(durationInMinutes, "minutes")
      .format("MMM D, h:mm A"); // Example: "May 2, 7:40 PM"
  }

  useEffect(() => {
    setStep(1);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const fetchCommission = async () => {
    try {
      const main = new Listing();
      const response = await main.AdminCommission();
      if (response?.data?.status) {
        const value = response?.data?.data || 0;
        setCommission(value * 0.01);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchExistingSlots = async() => {
   try {
      const main = new Listing();
      const response = await main.BulkLessonCheck({
        teacher: slug,
        student: user?._id,
      });
      if (response?.data?.status) {
        setHasBulkLesson(true);
      }
      else{
        setHasBulkLesson(false);
      }
    } catch (error) {
      console.log("error", error);
      setHasBulkLesson(false);
    }
  }
  useEffect(() => {
    fetchCommission();
  }, []);

  useEffect(() => {
    if(slug && user){
      fetchExistingSlots();
    }
  }, [user, slug]);

  if (!isOpen) return null;

  // console.log("user", user);
  // console.log("slug", slug);

  return (

    <div className="fixed inset-0 top-0 bottom-0 flex  justify-center bg-[rgba(0,0,0,.3)] z-50">
      <div className='bg-white mt-28 rounded-lg w-full shadow-lg w-ful '>
        <div className="px-4 pt-4  h-full text-gray-800 relative ">
          <div style={{ backgroundImage: "url('/leasson-bg.png')"}} className="text-gray-800 pb-40 lg:pb-10 overflow-y-auto max-h-[80vh] h-full bg-[#ECF1E6]">
            <button
              onClick={onClose}
              className="cursor-pointer text-gray-600 hover:text-gray-800 focus:outline-none absolute right-6 lg:right-12 top-6 lg:top-8 z-[2]"
            >
              <IoCloseSharp size={24} />
            </button>

            {step === 1 && (
              <div

                className="h-full bg-[rgba(249,190,191,0.1)] bg-cover bg-center rounded-[20px] py-[40px] lg:py-[60px] pt-10 min-h-full"
              >
                <div className="container sm:container md:container lg:container xl:max-w-[1230px]  bg-[rgba(249,190,191,.1)] px-4 mx-auto">
                  <Heading
                    classess="text-[#55844D] mb-6 lg:mb-8 text-center !text-3xl !mb-3 "
                    title="Select your Lesson"
                  />
                  <LessonList
                    lessons={lessons?.lessons}
                    showSelected={true}
                    selectedLesson={selectedLesson}
                    SetSelectedLesson={SetSelectedLesson}
                    loading={loading}
                  />
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="h-full bg-[rgba(249,190,191,0.1)] bg-cover bg-center rounded-[20px] py-[40px] lg:py-[60px] pt-10 min-h-full">
                <div className="container sm:container md:container lg:container xl:max-w-[1230px]  bg-[rgba(249,190,191, .1)] px-4 mx-auto">
                  <Heading
                    classess="text-[#55844D] !text-3xl !mb-3 text-center"
                    title="Choose Your Lesson Option"
                  />
                  <LessonType 
                   selectedLesson={selectedLesson}
                   multipleLessons={multipleLessons}
                   setMultipleLessons={setMultipleLessons}
                   lessonType={lessonType}
                   setLessonType={setLessonType}
                   bulkBookingAllowed={bulkBookingAllowed}
                  />
                </div>
              </div>
            )}
            {step === 3 && (
              <div

                className="bg-[rgba(249,190,191,0.1)] bg-cover bg-center rounded-[20px] py-[40px] lg:py-[60px]"
              >
                <div className="container sm:container md:container lg:container xl:max-w-[1230px]  bg-[rgba(249,190,191, .1)] px-4 mx-auto">
                  <Heading
                    classess="text-[#55844D] !text-3xl !mb-3 text-center"
                    title="Select your Lesson Start Time"
                  />
                  <Calendar
                    Availability={Availability}
                    usedInPopup={true}
                    setSelectedSlot={setSelectedSlot}
                    selectedLesson={selectedLesson}
                    mergedAvailability={mergedAvailability}
                    studentTimeZone={studentTimeZone}
                    setStudentTimeZone={setStudentTimeZone}
                  />
                </div>
              </div>
            )}
            {step === 4 && (
              <>
                {selectedLesson && (
                  <Heading
                    classess="text-[#55844D] !text-3xl !mb-0 text-center"
                    title={selectedLesson?.title}
                  />
                )}
                {lessonType === "single" ? 
                  <PaymentCheckout
                    selectedLesson={selectedLesson}
                    selectedSlot={selectedSlot}
                    studentTimeZone={studentTimeZone}
                    user={user}
                    commission={commission}
                  />
                  :
                  <MultipleLessonPayment
                    selectedLesson={selectedLesson}
                    selectedSlot={selectedSlot}
                    studentTimeZone={studentTimeZone}
                    user={user}
                    commission={commission}
                    multipleLessons={multipleLessons}
                  />
                }
              </>
            )}
          </div>
          <div className="flex fixed px-4 bg-white py-4 bottom-0 w-full left-0 justify-between items-center mt-5 border-t border-gray-300 flex-col lg:flex-row space-y-3 lg:space-y-0 z-10">
            <div className=" justify-between items-center hidden lg:flex">
              <div className="w-11 h-11 rounded-full flex items-center justify-center text-white text-xl font-bold">
                <img
                  src={user?.profile_photo || "/Placeholder.png"}
                  alt="User Avatar"
                  className="w-11 h-11 rounded-full object-cover"
                />
              </div>
              <div className="pl-2">
                <p className="font-medium text-sm capitalize text-black -tracking-[0.04em]">{user?.name}</p>
                <p className="text-xs capitalize #7A7A7A text-[#7A7A7A]">{user?.role}</p>
              </div>
            </div>
            <div className="w-full lg:w-auto flex flex-col lg:flex-row gap-2 lg:gap-4 items-center">
              {selectedLesson && (
                <div className="w-full lg:w-auto border border-gray-300 rounded-full px-4 py-2 ">
                  <p className="flex gap-2 items-center justify-center text-[#55844D] capitalize text-sm lg:text-base font-semibold font-inter tracking-[-0.04em]">
                    <FaBookReader size={20} />
                    {selectedLesson?.title} -{" "}
                    {formatMultiPrice(selectedLesson?.price, "USD")}{" "}
                  </p>
                </div>
              )}
              {selectedSlot && (
                <div className=" w-full lg:w-auto border border-gray-300 rounded-full px-4 py-2">
                  <p className="flex gap-2 items-center justify-center text-[#55844D] capitalize text-sm lg:text-base font-semibold font-inter tracking-[-0.04em]">
                    <IoMdTime size={20} />
                    {moment(selectedSlot.start).format("MMM D, h:mm A")}{" - "}
                    {getFormattedEndTime(selectedSlot?.start, selectedLesson?.duration)}
                  </p>
                </div>
              )}
            </div>
            <div className="flex justify-between w-full lg:w-auto space-x-2 lg:space-x-3">
              {step !== 1 && (
                <button
                  onClick={() => {
                    if(step == 4 && lessonType === "multiple"){
                        setStep(2);
                        return;
                      }
                    if (step === 3) {
                      setSelectedSlot("");
                    }
                    setStep(step - 1);
                  }}

                  className="font-medium cursor-pointer rounded-full py-2 px-5 text-[#ffffff] bg-[#55844D] hover:bg-[#3d5e37] text-base  "
                >
                  Previous
                </button>
              )
              }
              {step !== 4 && (
                  <button
                    onClick={() => {
                    //   if(step == 2 && hasBulkLesson){
                    //   toast.error("You have already purchased multiple lessons with this teacher. Please utilize those first.");
                    //   return;
                    // }
                      if(step == 2 && lessonType === "multiple"){
                        setStep(4);
                        return;
                      }
                      setStep(step + 1);
                    }}
                    disabled={(step == 1 && !selectedLesson) || (step == 2 && lessonType === "multiple" && multipleLessons < 2) || (step == 3 && !selectedSlot)}
                    className={`ml-auto font-medium rounded-full py-2 px-5 text-white text-base w-fit bg-[#55844D] hover:bg-[#3d5e37] 
                  ${(step == 1 && !selectedLesson) || (step == 2 && lessonType === "multiple" && multipleLessons < 2) || (step == 3 && !selectedSlot) 
                    ? "cursor-not-allowed" 
                    : "cursor-pointer"}`}
                  >
                    Next
                  </button>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
