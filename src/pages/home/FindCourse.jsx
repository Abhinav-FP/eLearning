import ClassBanner from '../Assets/Images/online_class.jpg'
import Image from 'next/image';
import Heading from '../common/Heading';
import Button from '../common/Button';
import Link from 'next/link';

export default function FindCourse({pargraph ,title , courseimg, loading}) {
    return (
        <>
            <div className="pt-[40px] md:pt-[60px] lg:pt-[100px] pb-[40px] md:pb-[40px] lg:pb-[60px]">
                <div className="mx-auto container sm:container md:container lg:container xl:max-w-[1230px]  px-4">
                    <div className="bg-[#CC2828] rounded-[10px] lg:rounded-[20px] px-6 lg:px-10 py-8 lg:py-12">
                        <div className="flex flex-wrap -mx-4 items-center space-y-5">
                            <div className="w-full md:w-5/12 px-4 ">
                                <div className='max-w-[372px]'>
                                    <Heading classess={'text-center sm:text-left text-white mb-2'} title={title} />
                                    <p className='text-center sm:text-left text-base font-normal text-[#F8F9FA] -tracking-[0.03em] mb-6 md:mb-8 lg:mb-10'>
                                      {pargraph}
                                    </p>
                                    <Link
                                    href="/course"
                                    className="block w-full text-center font-medium cursor-pointer rounded-full py-3 md:py-3.5 px-5 text-[#CC2828] text-base bg-white"
                                    >
                                    Search Courses
                                    </Link>

                                </div>
                            </div>
                            <div className="w-full md:w-7/12 px-4 lg:text-right">
                                {loading ?
                                <div className="w-full max-w-[565px] h-[288px] bg-gray-200 animate-pulse inline-block rounded-[10px]" />  
                                :
                                <Image className='w-full max-w-[565px] h-[288px] inline-block rounded-[10px] object-cover' src={courseimg } alt="banner" height={288} width={565} />
                                 }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}