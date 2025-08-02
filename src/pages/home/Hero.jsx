import Button from "../common/Button";
import Image from "next/image";
import HeroImg1 from '../Assets/Images/hero_top_img.png';
import HeroImg2 from '../Assets/Images/hero_bottom_img.png';
import Link from "next/link";

export default function Hero({ title, heroimg, heroimg2, loading }) {
    return (
        <>
            <div className="hero_bg pt-[118px] lg:pt-[128px] pb-[50px] lg:pb-[98px]">
                <div className="mx-auto container sm:container md:container lg:container xl:max-w-[1230px]  px-4">
                    <div className=" flex flex-col lg:flex-row justify-between items-center -mx-4">
                        <div className="w-full lg:w-7/12 px-4 ">
                            <div className="flex flex-col gap-[44px] lg:pr-[50px] ">
                                <div className="w-fulk flex justify-start relative h-[434px] w-full max-w-[540px]">
                                    {loading ?
                                    <div className="w-full h-full bg-gray-200 animate-pulse rounded-lg" /> 
                                    :
                                    <Image layout="responsive" src={heroimg || HeroImg1} width={762} height={676} alt="hero banner" className="object-cover"/>
                                    }
                                    <div className="border-[10px] border-[#16C7F8] w-[76px] h-[76px] absolute right-56 bottom-1 rounded-full"></div>
                                </div>
                                <div className="w-fulk flex justify-end relative">
                                    {loading ?
                                    <div className="w-[480px] h-[264px] bg-gray-200 animate-pulse rounded-lg" /> 
                                    :
                                    <Image src={heroimg2 ? heroimg2  :HeroImg2} width={480} height={264} alt="hero banner" />
                                    }
                                    <div className="border-[10px] border-[#CC2828] w-[66px] h-[66px] absolute left-5 -top-5 rounded-full"></div>
                                    <div className="border-[10px] border-[#FF5816] w-[48px] h-[48px] absolute left-56 -bottom-6  lg:-bottom-15 rounded-full"></div>
                                </div>

                            </div>
                        </div>
                        <div className="w-full lg:w-5/12 px-4 mt-8 lg:mt-0 text-center lg:text-left">
                            <h1 className="text-[#CC2828] font-inter text-[24px] sm:text-[32px] lg:text-[36px] xl:text-[55px] font-extrabold leading-[30px] sm:leading-[42px] md:leading-[44px] lg:leading-[44px] xl:leading-[60px] mb-4 lg:mb-6 xl:mb-8 -tracking-[0.04em] max-w-[500px] mx-auto">
                                {title}
                            </h1>
                            {/* <Button classes={'bg-[#CC2828] hover:bg-[#ad0e0e] text-base lg:text-lg xl:text-xl py-2.5 lg:py-3 xl:py-3.5 px-4 text-white w-full max-w-[438px]'} title={'Book a lesson'} /> */}
                            <div className="w-full flex justify-center lg:justify-start">
                                <Link
                                    href="/#lesson"
                                    className="text-center font-medium cursor-pointer rounded-full py-2.5 px-4 bg-[#CC2828] hover:bg-[#ad0e0e] text-base lg:text-lg xl:text-xl lg:py-3 xl:py-3.5 text-white max-w-[438px] w-full"
                                >
                                    Book a lesson
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};