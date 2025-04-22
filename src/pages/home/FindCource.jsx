import ClassBanner from '../Assets/Images/online_class.jpg'
import Image from 'next/image';
import Heading from '../common/Heading';
import Button from '../common/Button';

export default function FindCource({pargraph ,title}) {
    return (
        <>
            <div className="pt-[40px] md:pt-[60px] lg:pt-[100px] pb-[40px] md:pb-[40px] lg:pb-[60px]">
                <div className="mx-auto container sm:container md:container lg:container xl:max-w-[1230px]  px-4">
                    <div className="bg-[#CC2828] rounded-[10px] lg:rounded-[20px] px-6 lg:px-10 py-8 lg:py-12">
                        <div className="flex flex-wrap -mx-4 items-center space-y-5">
                            <div className="w-full md:w-5/12 px-4 ">
                                <div className='max-w-[372px]'>
                                    <Heading classess={'text-white mb-2'} title={title} />
                                    <p className='text-base font-normal text-[#F8F9FA] -tracking-[0.03em] mb-6 md:mb-8 lg:mb-10'>
                                      {pargraph}
                                    </p>
                                    <Button classes={'text-[#CC2828] text-base bg-white w-full py-3 md:py-3.5'} title={'Search Courses'} />
                                </div>
                            </div>
                            <div className="w-full md:w-7/12 px-4 lg:text-right">
                                <Image className='inline-block rounded-[10px]' src={ClassBanner} alt="banner" height={288} width={565} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}