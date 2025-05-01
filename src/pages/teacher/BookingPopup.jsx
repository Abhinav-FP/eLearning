import React, { useState } from "react";
import Popup from "../common/Popup";
import LessonList from "./LessonList";
import Heading from "../common/Heading";

export default function BookingPopup({
  isOpen,
  onClose,
  lessons,
  Availability,
}) {
  const [step, setStep] = useState(1);
  const [selectedLesson, SetSelectedLesson] = useState(null);

  return (
    <Popup isOpen={isOpen} onClose={onClose} size={"max-w-screen"}>
      {step === 1 && (
        <div
          style={{ backgroundImage: "url('/leasson-bg.png')" }}
          className="bg-[rgba(249,190,191,.5)] bg-cover bg-center rounded-[20px] py-[40px] lg:py-[60px]"
        >
          <div className="container sm:container md:container lg:container xl:max-w-[1230px]  bg-[rgba(249,190,191, .1)] px-4 mx-auto">
            <Heading
              classess="text-[#CC2828] mb-6 lg:mb-8 text-center"
              title="Select your Lessons Time"
            />
            <LessonList
              lessons={lessons}
              showSelected={true}
              selectedLesson={selectedLesson}
              SetSelectedLesson={SetSelectedLesson}
            />
            <div className="flex justify-between items-center mt-5">
                <div>
                    {selectedLesson &&
                    <p
                    className="text-[#CC2828] capitalize text-base xl:text-lg font-semibold font-inter inline-block tracking-[-0.04em]"
                    >Selected Lesson - {selectedLesson?.title} - USD ${selectedLesson?.price} </p>
                    }
                </div>
              <button
                onClick={() => {
                    setStep(step + 1);
                }}
                className="font-medium cursor-pointer rounded-full py-2 px-5 text-[#ffffff] bg-[#CC2828] hover:bg-[#ad0e0e] text-base w-fit"
                >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </Popup>
  );
}
