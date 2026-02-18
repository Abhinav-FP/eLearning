import React, { useEffect, useState } from "react";
import StudentLayout from "../Common/StudentLayout";
import Listing from "@/pages/api/Listing";
import { FaChevronDown } from "react-icons/fa";
import moment from "moment";
import BookLesson from "./BookLesson";

export default function LessonCredits() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [studentTimeZone, setStudentTimeZone] = useState("");

  const closePopup = () => {
    moment.tz.setDefault();
    setIsPopupOpen(false);
    setStudentTimeZone("");
  }

  const fetchdata = async () => {
    try {
      setLoading(true);
      const main = new Listing();
      const response = await main.BulkLessonget();
      setData(response?.data?.status ? response?.data?.data : []);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);
  // console.log("data", data);

  const toggleRow = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  useEffect(() => {
    const detectedZone = moment.tz.guess();
    setStudentTimeZone(detectedZone || "");
  }, []);

  useEffect(() => {
    if (!studentTimeZone) return;

    moment.tz.setDefault(studentTimeZone);

    return () => {
      moment.tz.setDefault();
    };
  }, [studentTimeZone]);

  const isPastBooking = (endDateTime) => {
    if (!endDateTime) return false;

    return moment().isAfter(
      moment(endDateTime).add(10, "minutes")
    );
  };

  return (
    <StudentLayout page={"Lesson Credits"}>
      <div className="min-h-screen p-5 lg:p-[30px]">
        <div className="flex justify-between items-center pb-4">
          <h2 className="text-base md:text-xl lg:text-2xl font-bold text-[#55844D] tracking-[-0.04em] font-inter">
            Lesson Credits
          </h2>
        </div>

        <div className="rounded-[5px] border border-[rgba(19,101,16,0.3)] overflow-x-auto">
          <table className="min-w-full text-sm text-center font-inter">
            <thead className="bg-[rgba(38,185,27,0.1)] text-[#535353] tracking-[-0.04em]">
              <tr>
                <th className="px-4 py-3 border-t border-[rgba(19,101,16,0.2)]">
                  Teacher
                </th>
                <th className="px-4 py-3 border-t border-[rgba(19,101,16,0.2)]">
                  Lesson Name
                </th>
                <th className="px-4 py-3 border-t border-[rgba(19,101,16,0.2)]">
                  Total Lessons
                </th>
                <th className="px-4 py-3 border-t border-[rgba(19,101,16,0.2)]">
                  Remaining
                </th>
                <th className="px-4 py-3 border-t border-[rgba(19,101,16,0.2)]">
                  Payment ID
                </th>
                <th className="px-4 py-3 border-t border-[rgba(19,101,16,0.2)]">
                  Payment Date
                </th>
                <th className="px-4 py-3 border-t border-[rgba(19,101,16,0.2)]">
                  Details
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-6 text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-6 text-gray-500">
                    No lesson credits available.
                  </td>
                </tr>
              ) : (
                data &&
                data?.map((item, index) => {
                  const isOpen = openIndex === index;

                  return (
                    <React.Fragment key={item._id}>
                      <tr
                        className="border-t hover:bg-[rgba(89,204,40,0.05)] cursor-pointer border-[rgba(19,101,16,0.2)]"
                        onClick={() => toggleRow(index)}
                      >
                        <td className="px-4 py-3 font-medium">
                          {item?.teacherId?.name}
                        </td>

                        <td className="px-4 py-3 font-medium">
                          {item?.LessonId?.title}
                        </td>

                        <td className="px-4 py-3 font-medium">
                          {item?.totalLessons}
                        </td>

                        <td
                          className={`px-4 py-3 font-medium ${
                            item?.lessonsRemaining === 0
                              ? "text-green-500"
                              : "text-green-600"
                          }`}
                        >
                          <div className="flex justify-center items-center gap-2 whitespace-nowrap">
                            <span>{item?.lessonsRemaining}</span>
                            {item?.lessonsRemaining != 0 && (
                              <button
                                className="text-xs bg-[#55844D] text-white px-2 py-[2px] rounded-md hover:bg-[#3d5e37] transition cursor-pointer"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setIsPopupOpen(true);
                                  setSelectedItem(item);
                                }}
                              >
                                Book Now
                              </button>
                            )}
                          </div>
                        </td>

                        <td className="px-4 py-3 font-medium">
                          {item?.StripepaymentId?.payment_id ||
                            item?.paypalpaymentId?.orderID}
                        </td>

                        <td className="px-4 py-3 font-medium">
                          {moment(item?.createdAt).format(
                            "DD MMM YYYY, hh:mm A"
                          ) || ""}
                        </td>

                        <td className="px-4 py-3">
                          <FaChevronDown
                            className={`mx-auto transition-transform duration-300 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </td>
                      </tr>

                      {isOpen && (
                        <tr className="border-t border-[rgba(19,101,16,0.2)]">
                          <td
                            colSpan={8}
                            className="bg-[rgba(44,204,40,0.05)] px-6 py-5"
                          >
                            <div>
                              <h3 className="font-semibold text-[#55844D] mb-3 text-lg">
                                Bookings Overview
                              </h3>

                              {item?.bookings?.length > 0 ? (
                                <div className="grid gap-4 md:grid-cols-2">
                                  {item.bookings.map((b) => {
                                    const booking = b?.id;

                                    return (
                                      <div
                                        key={b?._id}
                                        className="bg-white shadow-sm border border-gray-200 rounded-xl p-4 hover:shadow-md transition"
                                      >
                                        <div className="flex justify-between items-start">
                                          {/* Left Info */}
                                          <div className="space-y-1">
                                            <p className="font-semibold text-sm text-gray-800">
                                              {item?.LessonId?.title}
                                            </p>

                                            <p className="text-xs text-gray-500">
                                              {moment(booking?.startDateTime).format("DD MMM YYYY, hh:mm A")}
                                              <span className="text-gray-400"> → </span>
                                              {moment(booking?.endDateTime).format("DD MMM YYYY, hh:mm A")}
                                            </p>
                                          </div>

                                          {/* Status */}
                                           <span
                                            className={`px-2 py-1 rounded-md text-xs font-semibold ${
                                              b.cancelled
                                                ? "bg-red-100 text-red-600"
                                                : booking?.lessonCompletedTeacher
                                                ? "bg-green-100 text-green-700"
                                                : isPastBooking(booking?.endDateTime)
                                                ? "bg-gray-100 text-gray-600"
                                                : "bg-orange-100 text-orange-600"
                                            }`}
                                          >
                                            {b.cancelled
                                              ? "Cancelled"
                                              : booking?.lessonCompletedTeacher
                                              ? "Completed"
                                              : isPastBooking(booking?.endDateTime)
                                              ? "Done"
                                              : "Upcoming"}
                                          </span>
                                        </div>
                                        <div className="mt-3 border-t pt-2 text-[11px] text-gray-500 flex justify-between">
                                          <span>Booking ID: {booking?._id}</span>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              ) : (
                                <p className="text-gray-500 italic">No bookings used yet.</p>
                              )}
                            </div>

                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
      <BookLesson
        isOpen={isPopupOpen}
        onClose={closePopup}
        selectedItem={selectedItem}
        studentTimeZone={studentTimeZone}
        setStudentTimeZone={setStudentTimeZone}
        fetchdata={fetchdata}
      />
    </StudentLayout>
  );
}