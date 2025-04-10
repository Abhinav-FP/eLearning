import React, { useState } from 'react'
import StudentLayout from '../Common/StudentLayout'
import Password from './Password'
import Profile from './Profile'

export default function Index() {
    const [activeTab, setActiveTab] = useState('Profile');
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <StudentLayout>
            <div className="bg-white rounded-[10px] lg:rounded-[20px]">
                <div className="border-b border-black border-opacity-10 px-3 md:px-8 lg:px-10 space-x-1  md:space-x-2 lg:space-x-5">
                    <button
                        onClick={() => handleTabClick('Profile')}
                        className={`  tracking-[-0.03em] font-medium px-1.5 sm:px-2 md:px-3 lg:px-6 pt-4 pb-3 text-sm sm:text-base lg:text-lg outline-none focus:outline-none ease-linear transition-all border-b duration-150 ${activeTab === 'Profile' ? 'text-[#0367F7] border-[#0367F7]' : 'text-[#1E1E1E] border-opacity-0 border-black '}`}
                    >
                        Profile
                    </button>
                    <button
                        onClick={() => handleTabClick('password')}
                        className={`tracking-[-0.03em] font-medium px-1.5 sm:px-2 md:px-3 lg:px-6 pt-4 pb-3 text-sm sm:text-base lg:text-lg outline-none focus:outline-none ease-linear transition-all border-b duration-150 ${activeTab === 'password' ? 'text-[#0367F7] border-[#0367F7]' : 'text-[#1E1E1E] border-opacity-0 border-black '}`}
                    >
                        Password
                    </button>
                </div>
                <div className="px-6 sm:px-8 lg:px-10 pb-6 lg:pb-[30px]">
                    <div className="mt-0">
                        {activeTab === 'Profile' &&
                            <Profile />
                        }
                        {activeTab === 'password' &&
                            <Password />
                        }
                    </div>
                </div>
            </div>
        </StudentLayout>

    )
}
