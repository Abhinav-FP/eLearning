import React from "react";
import Heading from "../common/Heading";
import Button from "../common/Button";

export default function Ready({title}) {
    return (
        <>
         <div className="ready-bg py-[60px] md:py-[100px] lg:py-[127px]">
             <div className="mx-auto container sm:container md:container lg:container xl:max-w-[1230px]  px-4 text-center">
                <Heading classess={'text-white mb-[30px] lg:mb-[35px]'} title={title} />
                <Button classes='hover:bg-white text-white hover:text-[#CC2828] border border-white text-base lg:text-xl py-3.5 px-10' title='Book a lesson' />
             </div>
         </div>
        </>
    )}