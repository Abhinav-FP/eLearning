import React from "react";
import Heading from "../common/Heading";
import Button from "../common/Button";

export default function Ready({title}) {
    return (
        <>
         <div className="ready-bg py-[40px] md:py-[80px] lg:py-[127px]">
             <div className="mx-auto container sm:container md:container lg:container xl:max-w-[1230px]  px-4 text-center">
                <Heading classess={'text-white mb-[20px]  lg:mb-[30px] xl:mb-[35px]'} title={title} />
                <Button classes='hover:bg-white text-white hover:text-[#CC2828] border border-white text-base xl:text-xl py-2.5 lg:py-3.5 px-6 lg:px-10' title='Book a lesson' />
             </div>
         </div>
        </>
    )}