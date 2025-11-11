export const dynamic = "force-dynamic";
import React, { useEffect, useRef, useState } from "react";
import Listing from "@/pages/api/Listing";
import toast from "react-hot-toast";
import { MdKeyboardArrowDown } from "react-icons/md";
import Image from "next/image";

export default function Featured({ teacherData }) {
  const [loading, setLoading] = useState(false);
  const [featured, setFeatured] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRefs = useRef({});
  
  const TeacherVideos = async () => {
    try {
      const main = new Listing();
      const response = await main.HomeTeacherVideo();
      // console.log("API response:", response?.data?.data);
      const data = Array.isArray(response?.data?.data) ? response.data.data : [];
      const formatted = data.map((item) => ({
        _id: item._id,
        number: item.featured,
      }));
      // console.log("Formatted featured:", formatted);
      setFeatured(formatted);
    } catch (error) {
      console.log("error", error);
      setFeatured([]); // ensure it’s always reset on error
    }
  };

  useEffect(() => {
      TeacherVideos();
  }, []);

  // console.log("featured", featured);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        openDropdown !== null &&
        dropdownRefs.current[openDropdown] &&
        !dropdownRefs.current[openDropdown].contains(event.target)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]);

  const handleSelect = (number, id) => {
    const alreadySelected = featured.some(
      (f) => f._id === id && f.number !== number
    );
    if (alreadySelected) {
      toast.error("This teacher is already selected in another featured slot.");
      return;
    }
    const updated = [
      ...featured.filter((f) => f.number !== number),
      { _id: id, number },
    ];
    setFeatured(updated);
  };

  const handleSubmit = async () => {
    if (featured.length !== 3) {
      toast.error("Please select 3 teachers before submitting.");
      return;
    }
    try {
      setLoading(true);
      const main = new Listing();
      const response = await main.updateFeaturedTeachers({ featured });
      if (response?.data?.status) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error submitting featured teachers:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // console.log("featured", featured);

  return (
    <div className={`py-5 px-5 md:px-10`} >
      <h1 className="text-2xl md:text-3xl font-semibold text-[#D6202C] mb-8">
        Choose Featured Teachers
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 w-full">
        {[1, 2, 3].map((num) => {
          const selected = featured.find((f) => f.number === num)?._id;
          const selectedTeacher = teacherData?.find((t) => t._id === selected);

          return (
            <div
              key={num}
              className="flex-1 min-w-[300px] max-w-[400px] bg-white p-3 sm:p-6 rounded-xl border border-red-100 relative"
              ref={(el) => (dropdownRefs.current[num] = el)} // attach ref
            >
              <label className="block text-[#D6202C] text-sm font-semibold mb-2">
                Featured Teacher #{num}
              </label>

              {/* Dropdown Button */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setOpenDropdown((prev) => (prev === num ? null : num))
                  }
                  className="w-full border border-[#D6202C] rounded-lg px-3 py-2 flex justify-between items-center text-left focus:outline-none focus:ring-2 focus:ring-[#D6202C]"
                >
                  {selectedTeacher ? (
                    <div className="flex items-center gap-3">
                      <Image 
                       src={selectedTeacher.userId?.profile_photo || "/Placeholder.png"} 
                       height={500} 
                       width={500} 
                       alt="profile avatar" 
                       className="w-8 h-8 rounded-full object-cover" 
                      />
                      <div>
                        <div className="font-medium text-gray-800 capitalize">
                          {selectedTeacher.userId?.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {selectedTeacher.userId?.email}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <span className="text-gray-400">Select a teacher...</span>
                  )}
                  <MdKeyboardArrowDown size={24} />
                </button>
                {/* Dropdown Options */}
                {openDropdown === num && (
                  <div className="absolute left-0 right-0 mt-1 bg-white border border-[#D6202C] rounded-lg shadow-lg max-h-60 overflow-y-auto z-2">
                    {teacherData && teacherData?.map((teacher) => {
                      const isSelected = featured.some(
                        (f) => f._id === teacher._id && f.number !== num
                      );
                      return (
                        <div
                          key={teacher._id}
                          onClick={() => {
                            if (isSelected) {
                              toast.error("This teacher is already selected.");
                              return;
                            }
                            handleSelect(num, teacher._id);
                            setOpenDropdown(null);
                          }}
                          className={`flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-100 ${
                            isSelected ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                        >
                          <Image 
                           src={teacher.userId?.profile_photo || "/Placeholder.png"} 
                           height={500} 
                           width={500} 
                           alt="profile avatar" 
                           className="w-8 h-8 rounded-full object-cover" 
                          />
                          <div>
                            <div className="capitalize text-gray-800">
                              {teacher.userId?.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              ({teacher.userId?.email})
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 sm:mt-10 flex justify-center">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`px-8 py-3 rounded-lg text-white font-semibold ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#D6202C] hover:bg-[#b11b25]"
          } transition duration-200 cursor-pointer`}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
}
