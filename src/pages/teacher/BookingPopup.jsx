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
export default function BookingPopup({
  isOpen,
  onClose,
  lessons,
  Availability,
  studentTimeZone
}) {
  const { user } = useRole();
  const [step, setStep] = useState(1);
  const [selectedLesson, SetSelectedLesson] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    setStep(1);
    // SetSelectedLesson(null);
    // setSelectedSlot(null);
  }, [isOpen]);


  // console.log("selectedSlot",selectedSlot);
  // console.log("selectedLesson",selectedLesson);

  function getFormattedEndTime(time, durationInMinutes) {
    const start = new Date(time);
    const end = new Date(start.getTime() + durationInMinutes * 60000);

    const options = {
      month: "short", // e.g. "May"
      day: "numeric", // e.g. "2"
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };

    return end.toLocaleString("en-US", options); // → "May 2, 7:40 PM"
  }
  useEffect(() => {
    setStep(1);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;
  return (

    <div className="fixed inset-0 top-0 bottom-0 flex  justify-center bg-[rgba(0,0,0,.3)] z-50">
      <div className='bg-white mt-28 rounded-lg w-full shadow-lg w-ful '>
        <div className="p-4 text-gray-800  relative pb-10">
          <div className="text-gray-800 overflow-y-auto max-h-[80vh] ">
            <button
              onClick={onClose}
              className="cursor-pointer text-gray-600 hover:text-gray-800 focus:outline-none absolute right-6 lg:right-12 top-6 lg:top-8 z-[2]"
            >
              <IoCloseSharp size={24} />
            </button>

            {step === 1 && (
              <div
                style={{ backgroundImage: "url('/leasson-bg.png')" }}
                className="bg-[rgba(249,190,191,.5)] bg-cover bg-center rounded-[20px] py-[40px] lg:py-[60px] pt-10 "
              >
                <div className="container sm:container md:container lg:container xl:max-w-[1230px]  bg-[rgba(249,190,191, .1)] px-4 mx-auto">
                  <Heading
                    classess="text-[#CC2828] mb-6 lg:mb-8 text-center !text-3xl !mb-3 "
                    title="Select your Lesson"
                  />
                  <LessonList
                    lessons={lessons}
                    showSelected={true}
                    selectedLesson={selectedLesson}
                    SetSelectedLesson={SetSelectedLesson}
                  />

                </div>
              </div>
            )}
            {step === 2 && (
              <div
                style={{ backgroundImage: "url('/leasson-bg.png')" }}
                className="bg-[rgba(249,190,191,.5)] bg-cover bg-center rounded-[20px] py-[40px] lg:py-[60px]"
              >
                <div className="container sm:container md:container lg:container xl:max-w-[1230px]  bg-[rgba(249,190,191, .1)] px-4 mx-auto">
                  <Heading
                    classess="text-[#CC2828] !text-3xl !mb-3 text-center"
                    title="Select your Lesson Start Time"
                  />
                  <Calendar
                    Availability={Availability}
                    usedInPopup={true}
                    setSelectedSlot={setSelectedSlot}
                    selectedLesson={selectedLesson}
                  />
                  {/* <div className="flex justify-between items-center mt-5">
                  <button
                    onClick={() => {
                      setStep(step - 1);
                    }}
                    className="font-medium cursor-pointer rounded-full py-2 px-5 text-[#ffffff] bg-[#CC2828] hover:bg-[#ad0e0e] text-base w-fit"
                  >
                    Previous
                  </button>
                  <div>
                    {selectedSlot && (
                      <p className="text-[#CC2828] capitalize text-base xl:text-lg font-semibold font-inter inline-block tracking-[-0.04em]">
                        Selected Time Slot -{" "}
                        {new Date(selectedSlot.start).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })}{" "}
                        -
                        {getFormattedEndTime(
                          selectedSlot?.start,
                          selectedLesson?.duration
                        )}{" "}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      setStep(step + 1);
                    }}
                    disabled={!selectedSlot}
                    className={`font-medium rounded-full py-2 px-5 text-white text-base w-fit bg-[#CC2828] hover:bg-[#ad0e0e] 
                  ${!selectedSlot ? "cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    Next
                  </button>
                </div> */}
                </div>
              </div>
            )}
            {step === 3 && (
              <PaymentCheckout
                selectedLesson={selectedLesson}
                selectedSlot={selectedSlot}
                studentTimeZone={studentTimeZone}
              />
            )}



          </div>
          <div className="flex fixed px-4 bg-white py-4 bottom-0 w-full left-0 justify-between items-center mt-5 border-t border-gray-300 flex-col lg:flex-row space-y-3 lg:space-y-0">
            <div className=" justify-between items-center hidden lg:flex">
              <div className="w-11 h-11 rounded-full bg-green-400 flex items-center justify-center text-white text-xl font-bold">
                {/* Replace with an actual image if needed */}
                <img
                  src="https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg"
                  alt="User Avatar"
                  className="w-11 h-11 rounded-full object-cover"
                />
              </div>
              <div className="pl-2">
                <p className="font-medium text-sm capitalize text-black -tracking-[0.04em]">{user?.name}</p>
                <p className="text-xs capitalize #7A7A7A text-[#7A7A7A]">{user?.role}</p>
              </div>
            </div>
            <div className="flex gap-3 lg:gap-11 items-center">
              {selectedLesson && (
                <div className="border border-gray-400 rounded-full p-3">
                <p className="flex gap-1 items-center text-[#CC2828] capitalize text-sm lg:text-lg font-semibold font-inter tracking-[-0.04em]">
                 <FaBookReader size={24} />
                  {selectedLesson?.title} - $
                  {selectedLesson?.price}{" "}
                </p>
                </div>
              )}
              {selectedSlot && (
                <div className="border border-gray-400 rounded-full p-3">
                      <p className="flex gap-1 items-center text-[#CC2828] capitalize text-sm lg:text-lg font-semibold font-inter tracking-[-0.04em]">
                        <IoMdTime size={24} />
                        {new Date(selectedSlot.start).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })}{" "}
                        -{" "}
                        {getFormattedEndTime(
                          selectedSlot?.start,
                          selectedLesson?.duration
                        )}{" "}
                      </p>
                      </div>
                      )}
            </div>
            <div className="space-y-3 lg:space-y-0 lg:space-x-3">
              {step !== 1 && (
                <button
                  onClick={() => {
                    setStep(step - 1);
                  }}
                  className="font-medium cursor-pointer rounded-full py-2 px-5 text-[#ffffff] bg-[#CC2828] hover:bg-[#ad0e0e] text-base w-fit"
                >
                  Previous
                </button>
              )
              }

              {
                step !== 3 && (
                  <button
                    onClick={() => {
                      setStep(step + 1);
                    }}
                    disabled={!selectedLesson}
                    className={`w-full md:w-auto block md:inline-block font-medium rounded-full py-2 px-5 text-white text-base w-fit bg-[#CC2828] hover:bg-[#ad0e0e] 
                  ${!selectedLesson ? "cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    Next
                  </button>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
