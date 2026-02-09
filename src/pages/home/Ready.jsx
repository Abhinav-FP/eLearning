import React from "react";
import Heading from "../common/Heading";
import Button from "../common/Button";
import Link from "next/link";

export default function Ready({ title }) {
  return (
    <>
      <div className="pt-12 md:pt-20">
        <div className="mx-auto max-w-[1230px] px-4">
          <div className="bg-[#ECF1E6] rounded-2xl py-16 md:py-20 lg:py-24 text-center">
            <Heading
              classess={" mb-[30px] lg:mb-[40px] xl:mb-[45px]"}
              title={title}
            />
            <Link
              href="/find-teacher"
              className="btn lg"
            >
              Book a lesson
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
