import React, { useState } from "react";
import AdminLayout from "../common/AdminLayout";
import { MdRemoveRedEye } from "react-icons/md";
import { GoBlocked } from "react-icons/go";
import Image from "next/image";
function StudentListing() {
   const teacherListing = [
        {
            name: 'Ismael Maddox',
            email: "Ismael Maddox@gmail.com", 
        },
        {
            name: "Ismael Maddox",
            email: "Ismael Maddox@gmail.com", 
        },
        {
            name: "Ismael Maddox",
            email: "Ismael Maddox@gmail.com", 
        },
        {
            name: "Ismael Maddox",
            email: "Ismael Maddox@gmail.com", 
        }
    ];
    return (
        <AdminLayout page={"Teacher Listing"}>
            <div className="min-h-screen p-5 lg:p-[30px]"> 
                <div class="relative mb-3 md:mb-4 lg:mb-6 w-full md:w-auto">
                    <input type="text" name="search" value="" placeholder="Search" className="w-full rounded-[10px] border border-[rgba(0,0,0,0.1)] text-[#595959] text-sm tracking-[-0.03em] pl-12 pr-4 bg-[rgba(204,40,40,0.1)] outline-0 h-[44px]"  />
                    <Image
                        src="/search-icon.png"
                        width={20}
                        height={20}
                        alt="search icon"
                        className="absolute left-5 top-1/2 -translate-y-1/2 cursor-pointer"
                    /> 
                </div>
               <div className="border-t border-[rgba(0,0,0,.1)] pt-3 md:pt-4 lg:pt-6 overflow-x-auto">
                                <table className="min-w-full text-sm text-center rounded-[20px]">
                                    <thead className="bg-[rgba(204,40,40,0.1)] text-[#535353] tracking-[-0.04em] font-inter rounded-[20px] whitespace-nowrap">
                                        <tr>
                                            <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize text-left">Teacher name</th>
                                            <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">Email</th> 
                                            <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            teacherListing?.map((item, index) => (
                                                <tr key={index} className="border-t hover:bg-[rgba(204,40,40,0.1)] border-[rgba(204,40,40,0.2)]">
                                                    <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter text-left">{item?.name}</td>
                                                    <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter">{item?.email}</td> 
                                                    <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter">
                                                        <div className="flex gap-2 justify-center items-center">
                                                            <button href="#" className="border border-[#CC2828] text-[#CC2828] hover:bg-[#CC2828] hover:text-white inline-block h-[38px] w-[38px] rounded text-center leading-1 cursor-pointer">
                                                                <MdRemoveRedEye className="inline" size={18} />
                                                            </button>
                                                            <button href="#" className="border border-[#CC2828] text-[#CC2828] hover:bg-[#CC2828] hover:text-white inline-block h-[38px] w-[38px] rounded text-center leading-1 cursor-pointer">
                                                                <GoBlocked className="inline" size={18} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                            )}

                                    </tbody>
                                </table>
                            </div>

            </div>
        </AdminLayout>
    );
}

export default StudentListing;