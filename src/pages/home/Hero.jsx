import Button from "../common/Button";

export default function Hero(title) {
    return (
        <>
            <div className="hero_bg pt-[128px] pb-[98px]">
                <div className="mx-auto container sm:container md:container lg:max-w-[1230px] px-4">
                    <div className=" flex flex-col lg:flex-row justify-between items-center -mx-4">
                        <div className="w-full lg:w-8/12 px-4 ">
                        </div>
                        <div className="w-full lg:w-4/12 px-4">
                            <h1 className="text-[#CC2828] Inter_font text-[55px] font-extrabold leading-[40px] lg:text-[50px] lg:leading-[60px]  mb-8 -tracking-[0.04em]">
                                Learn from Expert Teachers Anytime, Anywhere!
                            </h1>
                            <Button classes={'bg-[#CC2828] text-[20px] py-3.5 px-4 text-white w-full max-w-[438px]'} title={'Book a lesson'} />
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
};