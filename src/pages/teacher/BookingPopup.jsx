import React, { useEffect, useState } from "react";
import Popup from "../common/Popup";
import LessonList from "./LessonList";
import Heading from "../common/Heading";
import Calendar from "../calendar/index.jsx";
import PaymentCheckout from "./PaymentCheckout";

export default function BookingPopup({
  isOpen,
  onClose,
  lessons,
  Availability,
  studentTimeZone
}) {
  const [step, setStep] = useState(1);
  const [selectedLesson, SetSelectedLesson] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    setStep(1);
    // SetSelectedLesson(null);
    // setSelectedSlot(null);
  }, [isOpen]);
  
  console.log("selectedSlot",selectedSlot);
  console.log("selectedLesson",selectedLesson);

  function getFormattedEndTime(time, durationInMinutes, studentTimeZone) {
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

  return (
    <Popup isOpen={isOpen} onClose={onClose} size={"max-w-[90vw]"}>
      {step === 1 && (
        <div
          style={{ backgroundImage: "url('/leasson-bg.png')" }}
          className="bg-[rgba(249,190,191,.5)] bg-cover bg-center rounded-[20px] py-[40px] lg:py-[60px]"
        >
          <div className="container sm:container md:container lg:container xl:max-w-[1230px]  bg-[rgba(249,190,191, .1)] px-4 mx-auto">
            <Heading
              classess="text-[#CC2828] mb-6 lg:mb-8 text-center"
              title="Select your Lesson"
            />
            <LessonList
              lessons={lessons}
              showSelected={true}
              selectedLesson={selectedLesson}
              SetSelectedLesson={SetSelectedLesson}
            />
            <div className="flex justify-between items-center mt-5">
              <div>
                {selectedLesson && (
                  <p className="text-[#CC2828] capitalize text-base xl:text-lg font-semibold font-inter inline-block tracking-[-0.04em]">
                    Selected Lesson - {selectedLesson?.title} - USD $
                    {selectedLesson?.price}{" "}
                  </p>
                )}
              </div>
              <button
                onClick={() => {
                  setStep(step + 1);
                }}
                disabled={!selectedLesson}
                className={`font-medium rounded-full py-2 px-5 text-white text-base w-fit bg-[#CC2828] hover:bg-[#ad0e0e] 
                  ${!selectedLesson ? "cursor-not-allowed" : "cursor-pointer"}`}
              >
                Next
              </button>
            </div>
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
              classess="text-[#CC2828] mb-6 lg:mb-8 text-center"
              title="Select your Lesson Start Time"
            />
            <Calendar
              Availability={Availability}
              usedInPopup={true}
              setSelectedSlot={setSelectedSlot}
              selectedLesson={selectedLesson}
            />
            <div className="flex justify-between items-center mt-5">
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
            </div>
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
    </Popup>
  );
}
