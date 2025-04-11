import React, { useState } from 'react'
import StudentLayout from '../Common/StudentLayout'

export default function Index() {
  const [tab, setTab] = useState("upcoming");
  const lessons = Array(6).fill({
    date: "April 15, 2025",
    time: "2:00 PM",
    duration: "1 Hour",
    teacher: "John Doe",
  });

  return (
    <StudentLayout page={"My Lessons"}>
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <h1 className="text-2xl font-bold text-red-600 mb-4">
        Stay on Track with Your Lessons
      </h1>

      {/* Tabs */}
      <div className="flex space-x-6 border-b border-gray-300 mb-6">
        {['Upcoming', 'Past', 'Cancelled'].map((item) => (
          <button
            key={item}
            onClick={() => setTab(item.toLowerCase())}
            className={`pb-2 text-sm font-medium ${
              tab === item.toLowerCase()
                ? "text-red-600 border-b-2 border-red-600"
                : "text-gray-500 hover:text-red-600"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Lesson Cards */}
      <div className="space-y-4">
        {lessons.map((lesson, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between hover:shadow-md transition"
          >
            <div className="space-y-1">
              <p className="text-red-600 font-semibold">{lesson.date}</p>
              <p className="text-sm text-gray-600">
                {lesson.time} &nbsp; • &nbsp; {lesson.duration}
              </p>
              <div className="flex items-center space-x-3 mt-2">
                <div className="w-10 h-10 rounded-full bg-green-300" />
                <div>
                  <p className="text-sm font-medium text-gray-800">{lesson.teacher}</p>
                  <p className="text-xs text-gray-500">Teacher</p>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-1 text-red-600 border border-red-600 rounded-full text-sm hover:bg-red-50">
                Reschedule
              </button>
              <button className="px-4 py-1 bg-red-600 text-white rounded-full text-sm hover:bg-red-700">
                Message
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </StudentLayout>
  )
}