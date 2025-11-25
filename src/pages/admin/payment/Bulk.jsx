import moment from "moment";
import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";


export default function Bulk({loading, data}) {
    const [openIndex, setOpenIndex] = useState(null);
    
    const toggleRow = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };
  return (
    <div className="rounded-[5px] border border-[rgba(204,40,40,0.3)] overflow-x-auto">
      <table className="min-w-full text-sm text-center font-inter">
        <thead className="bg-[rgba(204,40,40,0.1)] text-[#535353] tracking-[-0.04em]">
          <tr>
            <th className="px-4 py-3 border-t border-[rgba(204,40,40,0.2)]">
              Teacher
            </th>
            <th className="px-4 py-3 border-t border-[rgba(204,40,40,0.2)]">
              Lesson Name
            </th>
            <th className="px-4 py-3 border-t border-[rgba(204,40,40,0.2)]">
              Total Lessons
            </th>
            <th className="px-4 py-3 border-t border-[rgba(204,40,40,0.2)]">
              Remaining
            </th>
            <th className="px-4 py-3 border-t border-[rgba(204,40,40,0.2)]">
              Payment ID
            </th>
            <th className="px-4 py-3 border-t border-[rgba(204,40,40,0.2)]">
              Payment Date
            </th>
            <th className="px-4 py-3 border-t border-[rgba(204,40,40,0.2)]">
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
                    className="border-t hover:bg-[rgba(204,40,40,0.05)] cursor-pointer border-[rgba(204,40,40,0.2)]"
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
                          ? "text-red-500"
                          : "text-green-600"
                      }`}
                    >
                        {item?.lessonsRemaining}
                    </td>

                    <td className="px-4 py-3 font-medium">
                      {item?.StripepaymentId?.payment_id ||
                        item?.paypalpaymentId?.orderID}
                    </td>

                    <td className="px-4 py-3 font-medium">
                      {moment(item?.createdAt).format("DD MMM YYYY, hh:mm A") ||
                        ""}
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
                    <tr className="border-t border-[rgba(204,40,40,0.2)]">
                      <td
                        colSpan={8}
                        className="bg-[rgba(204,40,40,0.03)] px-6 py-5"
                      >
                        <div>
                          <h3 className="font-semibold text-[#CC2828] mb-3 text-lg">
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
                                          {moment(
                                            booking?.startDateTime
                                          ).format("DD MMM YYYY, hh:mm A")}
                                          <span className="text-gray-400">
                                            {" "}
                                            →{" "}
                                          </span>
                                          {moment(booking?.endDateTime).format(
                                            "DD MMM YYYY, hh:mm A"
                                          )}
                                        </p>
                                      </div>

                                      {/* Status */}
                                      <span
                                        className={`px-2 py-1 rounded-md text-xs font-semibold ${
                                          b.cancelled
                                            ? "bg-red-100 text-red-600"
                                            : booking?.lessonCompletedStudent
                                            ? "bg-green-100 text-green-700"
                                            : "bg-orange-100 text-orange-600"
                                        }`}
                                      >
                                        {b.cancelled
                                          ? "Cancelled"
                                          : booking?.lessonCompletedTeacher
                                          ? "Completed"
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
  );
}
