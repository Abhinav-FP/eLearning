import React from 'react'
import moment from 'moment';

export default function BookingList({ book }) {
  if (!book || book.length === 0) return <div>No bookings available.</div>;

  return (
    <div className="space-y-6">
      {book.map((book, index) =>
      (
        <div key={index} className=" rounded-xl p-4 bg-white shadow-sm ">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Lesson: {book?.LessonId?.title}</h2>
            <span className="text-sm text-gray-500">
              {moment(book?.startDateTime).format('MMMM D, YYYY [at] hh:mm A')}

            </span>
          </div>

          {/* Users */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex items-center gap-4">
              <img
                src={book?.UserId?.profile_photo}
                alt="Student"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-gray-700">Student: {book?.UserId?.name}</p>
                <p className="text-sm text-gray-500">{book?.UserId?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <img
                src={book?.teacherId?.profile_photo}
                alt="Teacher"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-gray-700">Teacher: {book?.teacherId?.name}</p>
                <p className="text-sm text-gray-500">{book?.teacherId?.email}</p>
              </div>
            </div>
          </div>

          {/* Lesson Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 mb-4">
            <p><strong>Lesson Duration:</strong> {book?.LessonId?.duration} mins</p>
            <p><strong>Lesson Price:</strong> ${book?.LessonId?.price.toFixed(2)}</p>
            <p><strong>Total Paid:</strong> ${book?.totalAmount.toFixed(2)}</p>
            <p><strong>Teacher Earned:</strong> ${book?.teacherEarning.toFixed(2)}</p>
            <p><strong>Admin Fee:</strong> ${book?.adminCommission.toFixed(2)}</p>
          </div>

          {/* Status */}
          <div className="flex flex-wrap gap-3 text-sm">
            <span className={`px-2 py-1 rounded-full ${book?.lessonCompletedStudent && book?.lessonCompletedTeacher ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
              {book?.lessonCompletedStudent && book?.lessonCompletedTeacher ? 'Completed' : 'Pending'}
            </span>
            {book?.cancelled && <span className="px-2 py-1 rounded-full bg-red-100 text-red-700">Cancelled</span>}
            {book?.rescheduled && <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700">Rescheduled</span>}
          </div>
        </div>
      )

      )}
    </div>
  );
}
