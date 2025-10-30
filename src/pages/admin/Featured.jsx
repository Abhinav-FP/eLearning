import React, { useEffect, useState } from "react";
import Listing from "@/pages/api/Listing";
import toast from "react-hot-toast";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function Featured() {
  const [loading, setLoading] = useState(false);
  const [teacherData, setTeacherData] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const main = new Listing();
      const response = await main.homeTeacher();
      if (response.data) {
        setTeacherData(response.data.data);
      }
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

//   console.log("teacherData", teacherData);
  console.log("featured", featured);

  return (
      <div className={`pt-5 ${openDropdown ? "pb-60" : ""} px-5 md:px-10`}>
        <h1 className="text-2xl md:text-3xl font-semibold text-[#D6202C] mb-8">
          Choose Featured Teachers
        </h1>

        <div className="flex flex-wrap gap-6 w-full">
          {[1, 2, 3].map((num) => {
            const selected = featured.find((f) => f.number === num)?._id;
            const selectedTeacher = teacherData.find((t) => t._id === selected);

            return (
              <div
                key={num}
                className="flex-1 min-w-[300px] max-w-[400px] bg-white p-3 sm:p-6 rounded-xl shadow-md border border-red-100 relative"
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
                        <img
                          src={
                            selectedTeacher.userId?.profile_photo ||
                            "/Placeholder.png"
                          }
                          alt={selectedTeacher.userId?.name}
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
                   <MdKeyboardArrowDown size={24}/>
                  </button>
                  {/* Dropdown Options */}
                  {openDropdown === num && (
                    <div className="absolute left-0 right-0 mt-1 bg-white border border-[#D6202C] rounded-lg shadow-lg max-h-60 overflow-y-auto z-2">
                      {teacherData.map((teacher) => {
                        const isSelected = featured.some(
                          (f) => f._id === teacher._id && f.number !== num
                        );
                        return (
                          <div
                            key={teacher._id}
                            onClick={() => {
                              if (isSelected) {
                                toast.error(
                                  "This teacher is already selected."
                                );
                                return;
                              }
                              handleSelect(num, teacher._id);
                              setOpenDropdown(null);
                            }}
                            className={`flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-100 ${
                              isSelected ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                          >
                            <img
                              src={
                                teacher.userId?.profile_photo ||
                                "/Placeholder.png"
                              }
                              alt={teacher.userId?.name}
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
      </div>
  );
}