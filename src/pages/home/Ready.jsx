import React from "react";
import Heading from "../common/Heading";
import Button from "../common/Button";
import Link from "next/link";

export default function Ready({ title }) {
  return (
    <>
      <div className="pt-12 md:pt-20">
        <div className="mx-auto max-w-[1230px] px-4">
          <div className="ready-bg rounded-2xl py-16 md:py-20 lg:py-24 text-center">
            <Heading
              classess={"text-white mb-[30px] lg:mb-[40px] xl:mb-[45px]"}
              title={title}
            />
            <Link
              href="/find-teacher"
              className="font-medium cursor-pointer rounded-full py-2 px-5 hover:bg-white text-white hover:text-[#55844D] border border-white text-base xl:text-xl py-2.5 lg:py-3.5 px-6 lg:px-10"
            >
              Book a lesson
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
