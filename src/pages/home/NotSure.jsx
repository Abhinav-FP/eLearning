import React from "react";

export default function NotSure() {
  return (
    <div className="bg-[#ECF1E6] py-[50px] md:py-[70px] text-center mt-[40px] md:mt-[60px] lg:mt-[80px]">
      <div className="mx-auto container sm:container md:container lg:container xl:max-w-[900px] px-6">
        <h2 className="heading mb-4 lg:mb-6">
          Not sure which teacher to choose or where to start?
        </h2>
        <p className="paragraph">
          If you’re unsure what teacher to choose, where to start, or what to
          focus on — we’re here to help you find the perfect match for your
          learning goals.
        </p>
        <a
          className="transparent-btn lg"
          target="blank"
          href="https://www.takemetojapan.com/contact"
        >
          Let’s Work Together
        </a>
      </div>
    </div>
  );
}