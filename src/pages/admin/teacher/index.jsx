import React, { useState } from "react";
import AdminLayout from "../common/AdminLayout";
function TeacherListing() {
    const [tabActive, setTabActive] = useState('existing');
    return (
        <AdminLayout page={"Teacher Listing"}>
            <div className="min-h-screen p-5 lg:p-[30px]">
                <div class="flex justify-between items-center mb-4 lg:mb-5">
                    <h2 class="text-lg md:text-xl lg:text-2xl font-bold text-[#CC2828] tracking-[-0.04em] font-inter">Bookings</h2>
                </div>
                <div className="flex flex-wrap gap-5 mb-4 px-3 border-b border-[rgba(0,0,0,.1)]">
                    <button onClick={()=> setTabActive('existing')}  className={`text-sm lg:text-lg font-medium tracking-[-0.04em] px-2 py-3 lg:py-2  cursor-pointer border-b-2 ${tabActive ===  'existing' ? 'text-[#CC2828] border-[#CC2828]' : 'text-[#727272] border-transparent' }`}>View  existing teacher</button>
                    <button onClick={()=> setTabActive('new')}  className={`text-sm lg:text-lg font-medium tracking-[-0.04em] px-2 py-3 lg:py-2  cursor-pointer ${tabActive === 'new' ? 'text-[#CC2828] border-[#CC2828]' : 'text-[#727272] border-transparent' }`}>View New teacher</button>
                </div>
                <div>
                    {
                       tabActive === 'existing' &&  (
                             <div>hiii</div>
                       )
                    }
                    {
                       tabActive === 'new' &&   (
                         <div>hiii dd</div>
                       )
                    }
                </div>

            </div>
        </AdminLayout>
    );
}

export default TeacherListing;