import React from "react";
import moment from "moment";
import NoData from "@/pages/common/NoData";
import ZoomPopup from "../booking/ZoomPopup";

export default function BookingList({ book }) {
  if (!book || book.length === 0) {
    return (
      <NoData Heading={"No bookings available."} />
    );
  }

  // console.log("Booking List:", book);

  return (
    <div className="space-y-6">
      {book && book?.map((book, index) => (
        <div
          key={index}
          className="bg-white   rounded-xl lg:rounded-2xl p-4 md:p-6 lg:p-8 shadow-sm transition-shadow duration-200 "
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
            <h2 className="text-xl font-semibold text-[#55844D]">
              Lesson: {book?.LessonId?.title}
            </h2>
            <span className="text-sm text-gray-500">
              {moment(book?.startDateTime).format("MMMM D, YYYY [at] hh:mm A")}
            </span>
          </div>

          {/* Student Info */}
          <div className="flex items-center gap-4 mb-4">
            <img
              src={book?.UserId?.profile_photo || "/Placeholder.png"}
              alt="Student"
              className="w-12 h-12 rounded-full object-cover border"
            />
            <div>
              <p className="text-base font-medium text-gray-800">
                {book?.UserId?.name}
              </p>
              <p className="text-sm text-gray-500 break-all">{book?.UserId?.email}</p>
            </div>
          </div>

          {/* Lesson & Payment Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-gray-700 mb-4">
            <p>
              <strong>Duration:</strong> {book?.LessonId?.duration} mins
            </p>
            <p>
              <strong>Lesson Price:</strong> ${book?.LessonId?.price.toFixed(2)}
            </p>
            <p>
              <strong>Total Paid:</strong> ${book?.totalAmount.toFixed(2)}
            </p>
            <p>
              <strong>Teacher Earned:</strong> $
              {book?.teacherEarning.toFixed(2)}
            </p>
            <p>
              <strong>Admin Fee:</strong> ${book?.adminCommission.toFixed(2)}
            </p>
            <p>
              <strong>Tip :</strong>
              {book?.BonusId?.amount ? `$${book.BonusId.amount}` : "N/A"}

            </p>
          </div>

          {/* Status Tags */}
          <div className="flex flex-wrap gap-2 mt-2 text-sm font-medium">
            <span
              className={`px-3 py-1 rounded-full ${book?.lessonCompletedStudent && book?.lessonCompletedTeacher
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
                }`}
            >
              {book?.lessonCompletedStudent && book?.lessonCompletedTeacher
                ? "Completed"
                : "Pending"}
            </span>
            {book?.cancelled && (
              <span className="px-3 py-1 rounded-full bg-red-100 text-red-700">
                Cancelled
              </span>
            )}
            {book?.rescheduled && (
              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                Rescheduled
              </span>
            )}
            {book?.zoom && (
              <ZoomPopup zoom={book?.zoom} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
