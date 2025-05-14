import React from 'react'
import { useRouter } from "next/router";

export default function NoData({ Heading, content,url }) {
    const router=useRouter();
  return (
    <div className="lg:px-24 lg:py-24 sm:py-20 md:px-44 px-4 py-12 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
      <div className="w-full lg:w-1/2 relative pb-12 lg:pb-0">
        <div className="relative text-center">
          <h1 className="my-2 text-gray-800 font-bold text-2xl capatalize">
            {Heading}
          </h1>
          <p className="my-2 text-gray-800 capatalize   ">
            {content}
          </p>
          <button
            onClick={() => {
              if(url){
                router.push(url);
              }
              else{
                router.back();
              }
            }}
            className="flex mx-auto bg-[#CC2828] hover:bg-[#ad0e0e] text-white text-base py-3.5 px-8 xl:px-10 font-medium cursor-pointer rounded-full"
          >
            Take me there!
          </button>
        </div>
      </div>
    </div>
  )
}
