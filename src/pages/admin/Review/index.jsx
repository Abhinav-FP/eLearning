import { useState } from "react";
import AdminLayout from "../common/AdminLayout";
import { MdRemoveRedEye } from "react-icons/md";
import { GoBlocked } from "react-icons/go";

function Review() {
    const [tabActive, setTabActive] = useState('all');

 const reviewListing = [
    {

    },
 ]
    return (
        <AdminLayout page={"Reviews"}>
            <div className="min-h-screen p-5 lg:p-[30px]">
                <div className="flex justify-between items-center mb-4 lg:mb-5">
                    <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-[#CC2828] tracking-[-0.04em] font-inter">
                        Reviews
                    </h2>
                </div>
                <div className="flex flex-wrap gap-3 md:gap-3 lg:gap-5">
                    <button onClick={() => setTabActive('all')} className={`text-sm lg:text-lg font-medium tracking-[-0.04em] px-2 py-3 lg:py-1.5  cursor-pointer border border-[#CC2828] rounded-[10px] min-w-[98px] ${tabActive === 'all' ? "bg-[#CC2828] text-white" : "bg-white text-[#CC2828]"}`}>All</button>
                    <button onClick={() => setTabActive('approved')} className={`text-sm lg:text-lg font-medium tracking-[-0.04em] px-2 py-3 lg:py-1.5  cursor-pointer border border-[#CC2828] rounded-[10px]  min-w-[150px]  ${tabActive === 'approved' ? "bg-[#CC2828] text-white" : "bg-white text-[#CC2828]"}`}>Approved</button>
                    <button onClick={() => setTabActive('pending')} className={`text-sm lg:text-lg font-medium tracking-[-0.04em] px-2 py-3 lg:py-1.5  cursor-pointer border border-[#CC2828] rounded-[10px] min-w-[139px] ${tabActive === 'pending' ? "bg-[#CC2828] text-white" : "bg-white text-[#CC2828]"}`}>Pending</button>
                    <button onClick={() => setTabActive('unapproved')} className={`text-sm lg:text-lg font-medium tracking-[-0.04em] px-2 py-3 lg:py-1.5  cursor-pointer border border-[#CC2828] rounded-[10px] min-w-[168px] ${tabActive === 'unapproved' ? "bg-[#CC2828] text-white" : "bg-white text-[#CC2828]"}`}>Unapproved</button>
                </div>
                <div className="block">
                    {tabActive === "all" && (
                        <div className="rounded-[5px] border border-[rgba(204,40,40,0.3)] overflow-x-auto">
                            <table className="min-w-full text-sm text-center rounded-[20px]">
                                <thead className="bg-[rgba(204,40,40,0.1)] text-[#535353] tracking-[-0.04em] font-inter rounded-[20px] whitespace-nowrap">
                                    <tr>
                                        <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">Teacher name</th>
                                        <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">Email</th>
                                        <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">Language</th>
                                        <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">Status</th>
                                        <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        reviewListing?.map((item, index) => (
                                            <tr key={index} className="border-t hover:bg-[rgba(204,40,40,0.1)] border-[rgba(204,40,40,0.2)]">
                                                <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter">{item?.name}</td>
                                                <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter">{item?.email}</td>
                                                <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter">{item?.language}</td>
                                                <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter">{item?.status}</td>
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
                    )}
                    {tabActive === "approved" && (
                        <div className="">
                        </div>
                    )}
                    {tabActive === "pending" && (
                        <div className="">
                        </div>
                    )}
                    {tabActive === "unapproved" && (
                        <div className="">
                            unapproved
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}

export default Review;