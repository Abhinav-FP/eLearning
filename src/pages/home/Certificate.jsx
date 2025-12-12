import React from 'react';
import { GrCertificate } from "react-icons/gr";

export default function Certificate() {
  return (
    <div className="ready-bg py-[80px] md:py-[100px] text-center text-white">
      <div className="mx-auto container sm:container md:container lg:container xl:max-w-[900px] px-6">

        {/* Icon */}
        <div className="flex justify-center mb-6 md:mb-8">
          <GrCertificate className="text-white text-[50px] md:text-[70px]" />
        </div>

        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-[-0.03em] mb-4 lg:mb-6">
          Official Certification
        </h2>

        <p className="text-base md:text-lg font-medium tracking-[-0.02em] opacity-90 max-w-[700px] mx-auto">
          <span className="font-bold">
            Students who complete 150 hours of study on our platform will receive
            an official certificate issued by Akita Inaka School.
          </span>{" "}
          This certificate can also be used when applying for long-term study programs in Japan.
        </p>
      </div>
    </div>
  );
}