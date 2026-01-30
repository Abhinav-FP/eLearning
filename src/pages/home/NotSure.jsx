import React from "react";

export default function NotSure() {
  return (
    <div className="bg-[rgba(85,132,77,0.6)] py-[50px] md:py-[70px] text-center text-white mt-[40px] md:mt-[60px] lg:mt-[80px]">
      <div className="mx-auto container sm:container md:container lg:container xl:max-w-[900px] px-6">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-[-0.03em] mb-4 lg:mb-6">
          Not sure which teacher to choose or where to start?
        </h2>
        <p className="text-base md:text-lg font-medium tracking-[-0.02em] opacity-90 mb-8 max-w-[700px] mx-auto">
          If you’re unsure what teacher to choose, where to start, or what to
          focus on — we’re here to help you find the perfect match for your
          learning goals.
        </p>
        <a
          className="font-semibold bg-white text-[#55844D] hover:bg-[#f8f8f8] transition-all duration-300 rounded-full py-3 px-8 md:py-4 md:px-10 text-base md:text-lg"
          target="blank"
          href="https://www.takemetojapan.com/contact"
        >
          Let’s Work Together
        </a>
      </div>
    </div>
  );
}