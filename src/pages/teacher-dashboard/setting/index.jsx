import React, { useState } from 'react'
import Password from './Password'
import Profile from './Profile'
import TeacherLayout from '../Common/TeacherLayout';

export default function Index() {
    const [activeTab, setActiveTab] = useState('Profile');
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <TeacherLayout page={"Settings"}>
            <div >
                <div className="border-b border-[rgba(0,0,0,.1)] px-3 md:px-8 lg:px-12 pt-2">
                    <button
                        onClick={() => handleTabClick('Profile')}
                        className={` cursor-pointer tracking-[-0.04em] font-medium  px-2 md:px-4 lg:px-8 pt-3 lg:pt-4 pb-3 lg:pb-4 text-sm sm:text-base lg:text-xl outline-none focus:outline-none ease-linear transition-all border-b duration-150 ${activeTab === 'Profile' ? 'text-[#CC2828] border-[#CC2828]' : 'text-[#535353]  border-[rgba(0,0,0,.0)] '}`}
                    >
                        Profile
                    </button>
                    <button
                        onClick={() => handleTabClick('password')}
                        className={` cursor-pointer tracking-[-0.04em] font-medium  px-2 md:px-4 lg:px-8 pt-3 lg:pt-4 pb-3 lg:pb-4 text-sm sm:text-base lg:text-xl outline-none focus:outline-none ease-linear transition-all border-b duration-150  ${activeTab === 'password' ? 'text-[#CC2828] border-[#CC2828]' : 'text-[#535353]  border-[rgba(0,0,0,.0)] '}`}
                    >
                        Password
                    </button>
                    <button
                        onClick={() => handleTabClick('bank')}
                        className={` cursor-pointer tracking-[-0.04em] font-medium  px-2 md:px-4 lg:px-8 pt-3 lg:pt-4 pb-3 lg:pb-4 text-sm sm:text-base lg:text-xl outline-none focus:outline-none ease-linear transition-all border-b duration-150  ${activeTab === 'bank' ? 'text-[#CC2828] border-[#CC2828]' : 'text-[#535353]  border-[rgba(0,0,0,.0)] '}`}
                    >
                        Bank Details
                    </button>
                </div>
                <div className="px-3 md:px-8 lg:px-12 pb-6 lg:pb-[30px] min-h-[75vh]">
                    <div className="mt-0">
                        {activeTab === 'Profile' &&
                            <Profile />
                        }
                        {activeTab === 'password' &&
                            <Password />
                        }
                        {activeTab === 'password' &&
                            <></>
                        }
                    </div>
                </div>
            </div>
        </TeacherLayout>

    )
}
