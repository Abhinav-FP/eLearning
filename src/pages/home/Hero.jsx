import Button from "../common/Button";
import Image from "next/image";
import HeroImg1 from '../Assets/Images/hero_top_img.png';
import HeroImg2 from '../Assets/Images/hero_bottom_img.png';

export default function Hero(title) {
    return (
        <>
            <div className="hero_bg pt-[128px] pb-[98px]">
                <div className="mx-auto container sm:container md:container lg:max-w-[1230px] px-4">
                    <div className=" flex flex-col lg:flex-row justify-between items-center -mx-4">
                        <div className="w-full lg:w-8/12 px-4 ">
                            <div className="flex flex-col gap-[44px] lg:pr-[50px] ">
                                <div className="w-ful flex justify-start relative">
                                     <Image src={HeroImg1} width={500} height={256} alt="hero banner" />
                                     <div className="animate-pulse-circle border-[10px] border-[#16C7F8] w-[76px] h-[76px] absolute right-56 bottom-1 rounded-full animate-pulse-slow"></div>
                                </div>
                                <div className="w-ful flex justify-end relative">
                                     <Image src={HeroImg2} width={480} height={264}  alt="hero banner" />
                                     <div className="animate-float-circle border-[10px] border-[#CC2828] w-[66px] h-[66px] absolute left-5 -top-5 rounded-full animate-float"></div>
                                     <div className="animate-pulse-circle border-[10px] border-[#FF5816] w-[48px] h-[48px] absolute left-56 -bottom-15 rounded-full animate-rotate-slow"></div>
                                </div>
                                 
                            </div> 
                        </div>
                        <div className="w-full lg:w-4/12 px-4">
                            <h1 className="text-[#CC2828] Inter_font text-[55px] font-extrabold leading-[40px] lg:text-[50px] lg:leading-[60px]  mb-8 -tracking-[0.04em]">
                                Learn from Expert Teachers Anytime, Anywhere!
                            </h1>
                            <Button classes={'bg-[#CC2828] hover:bg-[#ad0e0e] text-base lg:text-xl py-3.5 px-4 text-white w-full max-w-[438px]'} title={'Book a lesson'} />
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
};