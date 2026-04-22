import React, { useEffect, useState } from "react";
import TeacherLayout from "../Common/TeacherLayout";
import Listing from "@/pages/api/Listing";
import { FaChevronDown } from "react-icons/fa";
import { formatMultiPrice } from "@/components/ValueDataHook";
import moment from "moment";

export default function Index() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const toggleRow = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  const fetchdata = async () => {
    try {
      setLoading(true);
      const main = new Listing();
      const response = await main.TeacherBulkLessonget();
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

  const isPastBooking = (endDateTime) => {
    if (!endDateTime) return false;

    return moment().isAfter(
      moment(endDateTime).add(10, "minutes")
    );
  };

  return (
    <TeacherLayout page={"Bulk Lessons"}>
      <div className="min-h-screen p-5 lg:p-[30px]">
        <div className="pb-4">
          <h2 className="text-base md:text-xl lg:text-2xl font-bold text-[#55844D] tracking-[-0.04em] font-inter">
            Bulk Lessons
          </h2>

          {/* ➤ Added Info Line */}
          <p className="text-gray-600 text-xs md:text-sm mt-1 font-inter">
            Bulk bookings will appear in your bookings once the student redeems
            each session. Earnings will also reflect booking-by-booking as they
            redeem it.
          </p>
        </div>
        <div className="rounded-[5px] border border-[rgba(19,101,16,0.3)] overflow-x-auto">
          <table className="min-w-full text-sm text-center font-inter">
            <thead className="bg-[rgba(38,185,27,0.1)] text-[#535353] tracking-[-0.04em]">
              <tr>
                <th className="px-4 py-3 border-t border-[rgba(204,40,40,0.2)]">
                  Lesson Name
                </th>
                <th className="px-4 py-3 border-t border-[rgba(204,40,40,0.2)]">
                  Student
                </th>
                <th className="px-4 py-3 border-t border-[rgba(204,40,40,0.2)]">
                  <p>Lessons</p>
                  <p className="text-gray-400 whitespace-nowrap text-[10px]">Total / Completed / Remaining</p>
                </th>
                <th className="px-4 py-3 border-t border-[rgba(204,40,40,0.2)]">
                  <p className="whitespace-nowrap mb-0">Total Teacher Earning</p>
                  (USD / JPY)
                </th>
                <th className="px-4 py-3 border-t border-[rgba(204,40,40,0.2)]">
                  <p className="whitespace-nowrap mb-0">Per Lesson Earning</p>
                  (USD / JPY)
                </th>
                <th className="px-4 py-3 border-t border-[rgba(204,40,40,0.2)]">
                  <p className="whitespace-nowrap mb-0">Earned So Far</p>
                  (USD / JPY)
                </th>
                <th className="px-4 py-3 border-t border-[rgba(204,40,40,0.2)]">
                  <p className="whitespace-nowrap mb-0">Payment ID</p>
                </th>
                <th className="px-4 py-3 border-t border-[rgba(204,40,40,0.2)]">
                  Details
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-6 text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-6 text-gray-500">
                    No lesson credits available.
                  </td>
                </tr>
              ) : (
                data &&
                data?.map((item, index) => {
                  const isOpen = openIndex === index;
                  const rate = Number(item?.usdToJpyRate || 0) || 0;
                  const totalTeacherUsd = Number(item?.teacherEarning || 0) || 0;
                  const perLessonUsd =
                    item?.totalLessons > 0 ? totalTeacherUsd / item.totalLessons : 0;
                  const totalTeacherJpy = totalTeacherUsd * rate;
                  const perLessonJpy = perLessonUsd * rate;
                  const completedCount =
                    item?.bookings?.filter(
                      (b) => !b?.cancelled && b?.id?.lessonCompletedTeacher
                    )?.length || 0;
                  const earnedSoFarUsd = perLessonUsd * completedCount;
                  const earnedSoFarJpy = perLessonJpy * completedCount;

                  return (
                    <React.Fragment key={item._id}>
                      <tr
                        className="border-t hover:bg-[rgba(78,204,40,0.1)] cursor-pointer border-[rgba(40,204,77,0.2)]"
                        onClick={() => toggleRow(index)}
                      >
                        <td className="px-4 py-3 font-medium">
                          {item?.LessonId?.title}
                        </td>

                        <td className="px-4 py-3 font-medium">
                          {item?.UserId?.name}
                        </td>

                        <td className="px-4 py-3 font-medium">
                          <span>{item?.totalLessons}</span>
                          <span className="text-gray-400"> / </span>
                          <span>{completedCount}</span>
                          <span className="text-gray-400"> / </span>
                          <span
                            className={
                              item?.lessonsRemaining === 0
                                ? "text-red-500"
                                : "text-green-600"
                            }
                          >
                            {item?.lessonsRemaining}
                          </span>
                        </td>

                        <td className="px-4 py-3 font-medium">
                          <div>{formatMultiPrice(totalTeacherUsd, "USD") || ""}</div>
                          <div className="text-xs text-gray-500">
                            {formatMultiPrice(totalTeacherJpy, "JPY") || ""}
                          </div>
                        </td>

                        <td className="px-4 py-3 font-medium">
                          <div>{formatMultiPrice(perLessonUsd, "USD") || ""}</div>
                          <div className="text-xs text-gray-500">
                            {formatMultiPrice(perLessonJpy, "JPY") || ""}
                          </div>
                        </td>

                        <td className="px-4 py-3 font-medium">
                          <div>{formatMultiPrice(earnedSoFarUsd, "USD") || ""}</div>
                          <div className="text-xs text-gray-500">
                            {formatMultiPrice(earnedSoFarJpy, "JPY") || ""}
                          </div>
                        </td>

                        <td className="px-4 py-3 font-medium">
                          <p>{item?.StripepaymentId?.payment_id ||
                            item?.paypalpaymentId?.orderID}</p>
                            <p className="text-gray-400">{moment(item?.createdAt).format(
                            "DD MMM YYYY, hh:mm A"
                          ) || ""}</p>
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
                        <tr className="border-t border-[rgba(40,204,43,0.3)]">
                          <td
                            colSpan={8}
                            className="bg-[rgba(40,204,50,0.03)] px-6 py-5"
                          >
                            <div>
                              <h3 className="font-semibold text-[#55844D] mb-3 text-lg">
                                Bookings Overview
                              </h3>

                              {item?.bookings && item?.bookings?.length > 0 ? (
                                <div className="grid gap-4 md:grid-cols-2">
                                  {item?.bookings?.map((b) => {
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
                                              {moment(
                                                booking?.startDateTime
                                              ).format("DD MMM YYYY, hh:mm A")}
                                              <span className="text-gray-400">
                                                {" "}
                                                →{" "}
                                              </span>
                                              {moment(
                                                booking?.endDateTime
                                              ).format("DD MMM YYYY, hh:mm A")}
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
                                          <span>
                                            Booking ID: {booking?._id}
                                          </span>
                                          <span>
                                            Earning: {formatMultiPrice(perLessonUsd, "USD")} / {formatMultiPrice(perLessonJpy, "JPY")}
                                          </span>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              ) : (
                                <p className="text-gray-500 italic">
                                  No bookings used yet.
                                </p>
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
    </TeacherLayout>
  );
}
