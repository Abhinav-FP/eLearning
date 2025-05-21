import React, { useState } from "react";
import AdminLayout from "../common/AdminLayout";
function TeacherListing() {
    const [tabActive, setTabActive] = useState('existing');

    const data = [
        {

        }
    ]
    return (
        <AdminLayout page={"Teacher Listing"}>
            <div className="min-h-screen p-5 lg:p-[30px]">
                <div class="flex justify-between items-center mb-4 lg:mb-5">
                    <h2 class="text-lg md:text-xl lg:text-2xl font-bold text-[#CC2828] tracking-[-0.04em] font-inter">Bookings</h2>
                </div>
                <div className="flex flex-wrap gap-5 mb-4 px-3 border-b border-[rgba(0,0,0,.1)]">
                    <button onClick={() => setTabActive('existing')} className={`text-sm lg:text-lg font-medium tracking-[-0.04em] px-2 py-3 lg:py-2  cursor-pointer border-b-2 ${tabActive === 'existing' ? 'text-[#CC2828] border-[#CC2828]' : 'text-[#727272] border-transparent'}`}>View  existing teacher</button>
                    <button onClick={() => setTabActive('new')} className={`text-sm lg:text-lg font-medium tracking-[-0.04em] px-2 py-3 lg:py-2  cursor-pointer ${tabActive === 'new' ? 'text-[#CC2828] border-[#CC2828]' : 'text-[#727272] border-transparent'}`}>View New teacher</button>
                </div>
                <div>
                    {
                        tabActive === 'existing' && (
                            <div className="rounded-[5px] border border-[rgba(204,40,40,0.3)] overflow-x-auto">
                                <table className="min-w-full text-sm text-center rounded-[20px]">
                                    <thead className="bg-[rgba(204,40,40,0.1)] text-[#535353] tracking-[-0.04em] font-inter rounded-[20px] whitespace-nowrap">
                                        <tr>
                                            <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">Order Id</th>
                                            <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">Lesson name</th>
                                            <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">Payment Date & time</th>
                                            {/* <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">duration</th> */}
                                            <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">Amount</th>
                                            <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">Payment Status</th>
                                        </tr>
                                    </thead>
                                    
                                        <tbody> 
                                            {/* {
                                                data?.map((item, index) => {
                                                    <tr key={index} className="border-t hover:bg-[rgba(204,40,40,0.1)] border-[rgba(204,40,40,0.2)]">
                                                        <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter">{id}</td>
                                                        <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter">{item?.LessonId?.title}</td>
                                                        <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter">{moment(item?.createdAt).format("DD MMMM YYYY hh:mm A")}</td>
                                                        <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter">${item?.amount}</td>
                                                        <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter">{status}</td>
                                                    </tr>
                                                })
                                            } */}
                                           
                                        </tbody>
                                </table>
                            </div>
                        )
                    }
                    {
                        tabActive === 'new' && (
                            <div>hiii dd</div>
                        )
                    }
                </div>

            </div>
        </AdminLayout>
    );
}

export default TeacherListing;