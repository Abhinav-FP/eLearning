import React from 'react';
import { GrCertificate } from "react-icons/gr";

export default function Certificate() {
  return (
    <div className="bg-[#EEF2E8] py-[80px] md:py-[100px] text-center text-[#33403D]">
      <div className="mx-auto container sm:container md:container lg:container xl:max-w-[900px] px-6">

        {/* Icon */}
        <div className="flex justify-center mb-6 md:mb-8">
          <GrCertificate className="text-[#33403D] text-[50px] md:text-[70px]" />
        </div>

        <h2 className="heading mb-4 lg:mb-6">
          Official Certification
        </h2>

        <p className="paragraph">
          <span className="font-bold text-[#6B7280]">
            Students who complete 150 hours of study on our platform will receive
            an official certificate issued by Akita Inaka School.
          </span>{" "}
          This certificate can also be used when applying for long-term study programs in Japan.
        </p>
      </div>
    </div>
  );
}