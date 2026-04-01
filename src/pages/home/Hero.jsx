import Button from "../common/Button";
import Image from "next/image";
import HeroImg1 from '../Assets/Images/hero_top_img.png';
import HeroImg2 from '../Assets/Images/hero_bottom_img.png';
import Link from "next/link";

export default function Hero({ title, heroimg, heroimg2, loading }) {
    return (
        <>
            <div className="hero_bg pt-[118px] lg:pt-[208px] pb-[50px] lg:pb-[98px]">
                <div className="mx-auto container sm:container md:container lg:container xl:max-w-[1230px]  px-4">
                    <div className=" flex flex-col lg:flex-row justify-between items-center -mx-4">
                        <div className="w-full lg:w-7/12 px-4 ">
                            <div className="relative w-full max-w-[520px] h-auto md:h-[500px] flex flex-col items-center md:block">
                                <div className="relative md:absolute md:top-0 md:left-0 w-full md:w-[420px] z-10">
                                    {loading ? (
                                        <div className="w-full aspect-[362/336] bg-gray-200 animate-pulse rounded-lg" />
                                    ) : (
                                        <Image layout="responsive" src={heroimg || HeroImg1} width={362} height={336} alt="hero banner" className="object-cover rounded-lg" />
                                    )}
                                    {/* Blue Circle: Only visible/positioned correctly on md+ */}
                                    <div className="hidden md:block border-[10px] border-[#16C7F8] w-[76px] h-[76px] absolute right-[-82px] top-40 -translate-y-1/2 rounded-full"></div>

                                    {/* Mobile Blue Circle: Positioned like your "want" image */}
                                    <div className="md:hidden border-[6px] border-[#16C7F8] w-12 h-12 absolute left-1/4 bottom-4 rounded-full z-30"></div>
                                </div>
                                <div className="relative -mt-12 md:mt-0 md:absolute md:bottom-0 md:left-[120px] w-[95%] md:w-[90%] border-t-8 border-l-8 md:border-t-12 md:border-l-12 shadow-lg border-[#eef2ed] z-20">
                                    {loading ? (
                                        <div className="w-full h-[200px] md:h-[270px] bg-gray-200 animate-pulse rounded-lg" />
                                    ) : (
                                        <Image src={heroimg2 ? heroimg2 : HeroImg2} width={480} height={270} alt="hero banner" className="w-full h-auto md:h-[280px] object-cover" />
                                    )}

                                    {/* Orange Circle: Adjusted for mobile stack */}
                                    <div className="border-[8px] md:border-[10px] border-[#FF5816] w-10 h-10 md:w-[48px] md:h-[48px] absolute -bottom-4 left-4 md:left-[-65px] md:bottom-[100px] rounded-full"></div>

                                    {/* Green Circle: Added specifically for the mobile "want" look */}
                                    <div className="md:hidden border-[6px] border-[#55844D] w-12 h-12 absolute -top-6 left-6 rounded-full"></div>
                                </div>

                            </div>
                        </div>
                        <div className="w-full lg:w-5/12 px-4 mt-8 lg:mt-0 text-center lg:text-left">
                            <h1 className="text-[#33403D] font-inter text-[24px] sm:text-[32px] lg:text-[36px] xl:text-[55px] font-extrabold leading-[30px] sm:leading-[42px] md:leading-[44px] lg:leading-[44px] xl:leading-[60px] mb-4 lg:mb-6 xl:mb-8 -tracking-[0.04em] max-w-[500px] mx-auto">
                                {title}
                            </h1>
                            {/* <Button classes={'bg-[#55844D] hover:bg-[#3d5e37] text-base lg:text-lg xl:text-xl py-2.5 lg:py-3 xl:py-3.5 px-4 text-white w-full max-w-[438px]'} title={'Book a lesson'} /> */}
                            <div className="w-full flex justify-center lg:justify-start">
                                <Link
                                    href="/find-teacher?filter=true"
                                    className="btn xl text-xl w-[330px] text-center  flex justify-center items-center"
                                >
                                    Find your lesson!
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};