import React from "react";

const Loader = () => {
  return (
    <div className="h-[50vh] flex items-center justify-center">
      <div className="loader text-center">
        <div>
          <ul>
            <li>
              <svg fill="currentColor" viewBox="0 0 90 120">
                <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
              </svg>
            </li>
            <li>
              <svg fill="currentColor" viewBox="0 0 90 120">
                <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
              </svg>
            </li>
            <li>
              <svg fill="currentColor" viewBox="0 0 90 120">
                <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
              </svg>
            </li>
            <li>
              <svg fill="currentColor" viewBox="0 0 90 120">
                <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
              </svg>
            </li>
            <li>
              <svg fill="currentColor" viewBox="0 0 90 120">
                <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
              </svg>
            </li>
            <li>
              <svg fill="currentColor" viewBox="0 0 90 120">
                <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
              </svg>
            </li>
          </ul>
        </div>
        <span>Loading</span>
      </div>
    </div>
  );
};

const BookLoader = () => {
  return (
    <div className="h-[50vh] flex items-center justify-center">
      <div className="loader text-center">
        <div>
          <ul>
            <li>
              <svg fill="currentColor" viewBox="0 0 90 120">
                <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
              </svg>
            </li>
            <li>
              <svg fill="currentColor" viewBox="0 0 90 120">
                <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
              </svg>
            </li>
            <li>
              <svg fill="currentColor" viewBox="0 0 90 120">
                <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
              </svg>
            </li>
            <li>
              <svg fill="currentColor" viewBox="0 0 90 120">
                <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
              </svg>
            </li>
            <li>
              <svg fill="currentColor" viewBox="0 0 90 120">
                <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
              </svg>
            </li>
            <li>
              <svg fill="currentColor" viewBox="0 0 90 120">
                <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
              </svg>
            </li>
          </ul>
        </div>
        <span>Loading</span>
      </div>
    </div>
  );
};

const LessonLoader = () => {
  return (
    <div className="mb-5">
      {/* Date & Time Bar */}
      <div className="flex items-center gap-3 xl:gap-4 flex-wrap mb-3 lg:mb-4 xl:mb-5 animate-pulse">
        <div className="h-6 w-24 bg-gray-200 rounded"></div>
        <div className="h-5 w-20 bg-gray-200 rounded"></div>
        <div className="h-5 w-24 bg-gray-200 rounded"></div>
      </div>

      {/* Lesson Card Skeleton */}
      <div className="bg-white rounded-[10px] lesson_list_shadow p-3 md:p-4 lg:p-5 flex items-center justify-between border border-[rgba(204,40,40,0.2)] animate-pulse">
        <div className="flex items-center space-x-2.5 lg:space-x-3">
          <div className="w-11 h-11 bg-gray-200 rounded-full"></div>
          <div>
            <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 w-16 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 md:gap-3 xl:gap-5">
          <div className="h-10 w-28 bg-gray-200 rounded-[10px]"></div>
          <div className="h-10 w-28 bg-gray-200 rounded-[10px]"></div>
        </div>
      </div>
    </div>
  );
};

const TeacherLoader = () => {
  return (
    <div className="bg-white rounded-[10px] lesson_list_shadow p-3 md:p-4 lg:p-5 flex flex-col lg:flex-row lg:items-center justify-between transition border-[rgba(204,40,40,0.2)] border-1 gap-5 animate-pulse">
      {/* Left: Image + Details */}
      <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-x-3 mt-2">
        <div className="w-16 h-16 md:w-20 md:h-20 lg:w-[104px] lg:h-[104px] bg-gray-200 rounded-full"></div>
        <div className="space-y-2">
          <div className="h-5 w-48 bg-gray-200 rounded"></div>
          <div className="h-3 w-64 bg-gray-200 rounded"></div>
          <div className="h-5 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Right: Buttons */}
      <div className="flex flex-row gap-2 justify-between">
        <div className="px-6 md:px-10 lg:px-12 py-2 lg:py-2.5 rounded-[10px] bg-gray-200 w-[100px] h-10"></div>
        <div className="px-6 md:px-10 lg:px-12 py-2 lg:py-2.5 rounded-[10px] bg-gray-200 w-[100px] h-10"></div>
      </div>
    </div>
  );
};

const TableLoader = ({ length }) => {
  return (
    <tbody>
      {[1, 2, 3, 4].map((_, index) => (
        <tr key={index} className="border-t border-[rgba(204,40,40,0.2)] animate-pulse">
          {[...Array(length || 2)].map((__, colIdx) => (
            <td
              key={colIdx}
              className="px-3 lg:px-4 py-2 lg:py-3"
            >
              <div className="h-4 bg-gray-200 rounded w-full mx-auto"></div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

const ReviewLoader = () => {
  return (
    <div className="relative bg-[#F6F7F7] rounded-[10px] p-4 lg:p-5 animate-pulse">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="h-5 bg-gray-200 rounded w-1/2"></div>
      </div>

      {/* Description */}
      <div className="mt-2">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
      </div>

      {/* Rating and Date */}
      <div className="flex justify-between items-center mt-2">
        <div className="flex text-[#E4B750] space-x-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 w-4 bg-gray-200 rounded-full"></div>
          ))}
        </div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </div>
    </div>
  );
};

const ProfileFormLoader = () => {
  return (
    <>
      <div className="border-b border-[rgba(0,0,0,.1)] flex flex-wrap py-6 lg:py-8 animate-pulse">
        {/* Label and Photo Loader */}
        <div className="w-full lg:w-5/12 xl:w-4/12 lg:pr-3 mb-2 sm:mb-0">
          <div className="h-5 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mt-2"></div>
        </div>

        {/* Profile Photo Placeholder */}
        <div className="w-full lg:w-6/12 xl:w-5/12 lg:pl-3">
          <div className="flex items-center">
            <div className="relative h-[52px] w-[52px] flex rounded-full text-sm text-white mr-4">
              <div className="h-[52px] w-[52px] bg-gray-200 rounded-full"></div>
            </div>
            <div className="h-5 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
      </div>

      {/* Name Field Loader */}
      <div className="border-b border-[rgba(0,0,0,.1)] py-6 lg:py-8 space-y-4 lg:space-y-6 animate-pulse">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-5/12 xl:w-4/12 lg:pr-3 mb-2 lg:mb-0">
            <div className="h-5 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mt-2"></div>
          </div>
          <div className="w-full lg:w-6/12 xl:w-5/12 lg:pl-3">
            <div className="h-11 bg-gray-200 rounded-lg w-full"></div>
          </div>
        </div>

        {/* Email Field Loader */}
        <div className="flex flex-wrap">
          <div className="w-full lg:w-5/12 xl:w-4/12 lg:pr-3 mb-2 lg:mb-0">
            <div className="h-5 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mt-2"></div>
          </div>
          <div className="w-full lg:w-6/12 xl:w-5/12 lg:pl-3">
            <div className="h-11 bg-gray-200 rounded-lg w-full"></div>
          </div>
        </div>

        {/* Time Zone Field Loader */}
        <div className="flex flex-wrap">
          <div className="w-full lg:w-5/12 xl:w-4/12 lg:pr-3 mb-2 lg:mb-0">
            <div className="h-5 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mt-2"></div>
          </div>
          <div className="w-full lg:w-6/12 xl:w-5/12 lg:pl-3">
            <div className="h-11 bg-gray-200 rounded-lg w-full"></div>
          </div>
        </div>
      </div>

      {/* Submit Button Loader */}
      <div className="flex w-full lg:w-12/12 xl:w-11/12 flex-wrap justify-center items-center pt-6 lg:pt-10 space-x-4 lg:space-x-6">
        <div className="h-11 bg-gray-200 rounded-lg w-full max-w-[183px]"></div>
      </div>
    </>
  );
};

const StudentDashboardLoader = () => {
  return (
    <div className="min-h-screen p-5 lg:p-[30px] animate-pulse">
      {/* Welcome Back Text */}
      <div className="h-6 w-48 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 w-72 bg-gray-200 rounded mb-6"></div>

      {/* Row 1: Upcoming Lessons & Favorite Teachers */}
      <div className="flex flex-wrap -mx-4 mb-5 space-y-5 lg:space-y-0">
        {/* Upcoming Lessons */}
        <div className="w-full lg:w-1/2 px-4">
          <div className="bg-white p-4 lg:p-5 border border-[rgba(204,40,40,0.2)] rounded-[20px]">
            <div className="h-6 w-40 bg-gray-200 rounded mb-4"></div>
            <div className="space-y-3">
              {[1, 2, 3, 4].map((_, i) => (
                <div key={i} className="flex flex-wrap">
                  <div className="h-5 w-32 bg-gray-200 rounded mr-3 mb-2"></div>
                  <div className="h-5 w-40 bg-gray-200 rounded mb-2"></div>
                </div>
              ))}
              <div className="mt-4 md:mt-8 h-10 w-36 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Favorite Teachers */}
        <div className="w-full lg:w-1/2 px-4">
          <div className="bg-white p-4 lg:p-5 border border-[rgba(204,40,40,0.2)] rounded-[20px]">
            <div className="h-6 w-40 bg-gray-200 rounded mb-4"></div>
            <div className="space-y-4">
              {[1, 2].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border border-[rgba(204,40,40,0.3)] rounded-xl p-2.5"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-11 h-11 bg-gray-200 rounded-full"></div>
                    <div>
                      <div className="h-4 w-24 bg-gray-200 rounded mb-1"></div>
                      <div className="h-3 w-20 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                  <div className="h-4 w-16 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Reviews */}
      <div className="flex flex-wrap -mx-4">
        <div className="w-full px-4">
          <div className="bg-white p-4 lg:p-5 border border-[rgba(204,40,40,0.2)] rounded-[20px]">
            <div className="h-6 w-40 bg-gray-200 rounded mb-4"></div>
            <div className="space-y-3">
              {[1, 2].map((_, i) => (
                <div
                  key={i}
                  className="bg-[rgba(204,40,40,0.1)] p-2.5 rounded-xl"
                >
                  <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
                  <div className="flex gap-1 text-yellow-300 mb-2">
                    {[...Array(5)].map((_, j) => (
                      <div key={j} className="h-4 w-4 bg-gray-200 rounded"></div>
                    ))}
                  </div>
                  <div className="h-5 w-40 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TeacherDashboardLoader = () => {
  return (
    <div className="min-h-screen p-5 lg:p-[30px] animate-pulse">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center mb-6">
        <div className="h-6 lg:h-8 bg-gray-200 rounded w-40 lg:w-60"></div>
        <div className="h-10 bg-gray-200 rounded w-32 sm:w-40"></div>
      </div>

      {/* Dashboard Cards Skeleton Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-4">
        {Array(6).fill(0).map((_, idx) => (
          <div
            key={idx}
            className="relative bg-white rounded-xl border border-[rgba(204,40,40,0.2)] p-4 min-h-[136px] flex flex-col justify-between"
          >
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>

            {/* Icon Placeholder */}
            <div className="absolute top-4 right-4 h-10 w-10 bg-gray-200 rounded-full"></div>

            {/* Lines below the title */}
            <div className="space-y-2 mt-6">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const EditProfileLoader = () => {
  return (
    <div className="min-h-screen p-5 lg:p-[30px] animate-pulse">
      {/* Page Title */}
      <div className="h-6 lg:h-8 bg-gray-200 rounded w-40 mb-6"></div>

      {/* Profile Card */}
      <div className="bg-red-100 p-4 md:p-6 lg:p-8 rounded-2xl">
        {/* Profile Section */}
        <div className="flex items-center flex-col gap-3 md:flex-row justify-between">
          <div className="flex items-center gap-3 lg:gap-4">
            <div className="w-16 h-16 lg:w-[94px] lg:h-[94px] bg-gray-200 rounded-full"></div>
            <div>
              <div className="h-5 bg-gray-200 rounded w-32 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </div>
          </div>
          {/* Edit Button */}
          <div className="h-10 bg-gray-200 rounded w-28 sm:w-32"></div>
        </div>

        {/* Info Grid */}
        <div className="w-full mt-6 md:mt-8 lg:mt-10 mb-2 flex flex-wrap gap-x-4 lg:gap-x-10 gap-y-3 text-sm">
          {Array(4).fill(0).map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 rounded w-40 lg:w-48"></div>
          ))}
        </div>
      </div>

      {/* Lessons Section */}
      <section className="mt-10">
        <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
        <div className="space-y-4">
          {Array(3).fill(0).map((_, i) => (
            <div key={i} className="h-20 bg-gray-200 rounded-lg w-full"></div>
          ))}
        </div>

        {/* Add Lesson Button */}
        <div className="h-11 bg-gray-200 rounded-[10px] w-40 mt-6"></div>
      </section>
    </div>
  );
};

const TeacherEarningsLoader = () => {
  return (
    <div className="min-h-screen animate-pulse">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {Array(4).fill(0).map((_, i) => (
          <div key={i} className="h-24 bg-gray-200 rounded-lg w-full"></div>
        ))}
      </div>

      {/* Table Skeleton */}
      <div className="rounded-[5px] border border-[rgba(204,40,40,0.3)] overflow-x-auto">
        <table className="min-w-full text-sm text-center rounded-[20px]">
          <thead className="bg-[rgba(204,40,40,0.1)] text-[#535353] tracking-[-0.04em] font-inter rounded-[20px] whitespace-nowrap">
            <tr>
              {["Lesson Name", "Lesson Date", "Payment Id", "Payment Date", "Amount"].map((header, idx) => (
                <th
                  key={idx}
                  className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array(5).fill(0).map((_, i) => (
              <tr
                key={i}
                className="hover:bg-[rgba(204,40,40,0.05)] border-t border-[rgba(204,40,40,0.2)]"
              >
                {Array(5).fill(0).map((_, j) => (
                  <td
                    key={j}
                    className="px-3 lg:px-4 py-2 lg:py-3 text-sm lg:text-base"
                  >
                    <div className="h-4 bg-gray-200 rounded w-24 mx-auto"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const TeacherProfileFormLoader = () => {
  const shimmerClass = "bg-[#e0e0e0] animate-pulse";
  return (
    <>
      {/* Profile Image Upload Section */}
      <div className="border-b border-[rgba(0,0,0,.1)] flex flex-wrap py-6 lg:py-8">
        <div className="w-full lg:w-5/12 lg:pr-3 mb-2 sm:mb-0">
          <div className={`${shimmerClass} h-6 w-32 mb-2 rounded`} />
          <div className={`${shimmerClass} h-4 w-48 rounded`} />
        </div>
        <div className="w-full lg:w-6/12 xl:w-5/12 lg:pl-3">
          <div className="flex items-center">
            <div className={`${shimmerClass} h-[52px] w-[52px] rounded-full mr-4`} />
            <div className={`${shimmerClass} h-5 w-32 rounded`} />
          </div>
        </div>
      </div>

      {/* Form Fields Section */}
      <div className="border-b border-[rgba(0,0,0,.1)] py-6 lg:py-8 space-y-4 lg:space-y-6">
        <div className="flex flex-wrap -mx-2 space-y-4">
          {Array.from({ length: 10 }).map((_, idx) => (
            <div key={idx} className="w-full lg:w-6/12 px-2">
              <div className={`${shimmerClass} h-5 w-40 mb-2 rounded`} />
              <div className={`${shimmerClass} h-11 lg:h-[54px] rounded-lg`} />
            </div>
          ))}

          {/* Languages Spoken Tag Display */}
          <div className="w-full lg:w-6/12 px-2">
            <div className={`${shimmerClass} h-5 w-40 mb-2 rounded`} />
            <div className={`${shimmerClass} h-11 lg:h-[54px] rounded-lg`} />
            <div className="mt-3 flex flex-wrap gap-2">
              {Array.from({ length: 2 }).map((_, idx) => (
                <div key={idx} className={`${shimmerClass} h-7 w-24 rounded-full`} />
              ))}
            </div>
          </div>

          {/* Gender & AIS Trained Radios */}
          {["Gender", "AIS trained"].map((label, idx) => (
            <div key={idx} className="w-full lg:w-6/12 px-2 mb-4">
              <div className={`${shimmerClass} h-5 w-32 mb-2 rounded`} />
              <div className="flex items-center space-x-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className={`${shimmerClass} h-4 w-20 rounded`} />
                ))}
              </div>
            </div>
          ))}

          {/* Description */}
          <div className="w-full px-2">
            <div className={`${shimmerClass} h-5 w-40 mb-2 rounded`} />
            <div className={`${shimmerClass} h-[120px] rounded-lg`} />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex w-full lg:w-12/12 xl:w-11/12 flex-wrap justify-center items-center pt-6 lg:pt-10 space-x-4 lg:space-x-6">
        <div className={`${shimmerClass} w-full max-w-[183px] h-[54px] rounded-[10px]`} />
      </div>
    </>
  );
};

const ChatListShimmer = () => {
  return (
    <div className="mt-0 space-y-1 max-h-[calc(100vh-128px)] md:h-[calc(100vh-128px)] min-h-[300px] overflow-y-auto pb-5 pt-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center bg-white min-h-[72px] pr-[66px] pl-[89px] py-[8px] relative animate-pulse"
        >
          {/* Avatar */}
          <div className="w-[50px] h-[50px] lg:w-[56px] lg:h-[56px] rounded-lg bg-gray-300 absolute left-[22px] top-1/2 -translate-y-1/2" />

          {/* Name + Message lines */}
          <div className="flex-1">
            <div className="h-4 w-1/2 bg-gray-300 rounded mb-2" />
            <div className="h-3 w-1/3 bg-gray-200 rounded" />
          </div>

          {/* Unread badge shimmer */}
          <div className="h-[28px] w-[28px] bg-gray-300 rounded-full absolute right-[22px] top-1/2 -translate-y-1/2" />
        </div>
      ))}
    </div>
  );
};

const MessageLoader = () => {
  return (
    <div className="mt-4 space-y-4">
      {[...Array(8)].map((_, i) => {
        const isLeft = i % 2 === 0; // alternate left/right
        return (
          <div key={i} className="animate-pulse">
            <div className={`flex ${isLeft ? 'justify-start' : 'justify-end'}`}>
              <div className={`h-8 w-[180px] bg-gray-200 rounded-md mb-1 ${isLeft ? '' : 'bg-[rgba(204,40,40,0.1)]'}`} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

const SpecialSlotLoader = () => {
  return (
    <div className="h-[50vh] mt-28 animate-pulse">
      {/* Title */}
      <div className="h-8 w-1/3 mx-auto bg-gray-300 rounded mb-6" />

      <div className="flex flex-col md:flex-row gap-6 p-6">
        {/* Left: Payment Method */}
        <div className="border border-[#CC2828] h-fit rounded-xl p-4 w-full md:w-1/2 space-y-4">
          <div className="h-6 w-1/3 bg-gray-300 rounded" />

          {/* Payment Options */}
          {[1, 2].map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between border border-red-300 rounded-lg p-3"
            >
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 bg-gray-300 rounded" />
                <div className="h-4 w-24 bg-gray-300 rounded" />
              </div>
              <div className="w-4 h-4 rounded-full bg-gray-300 border-2 border-gray-400" />
            </div>
          ))}
        </div>

        {/* Right: Summary */}
        <div className="border border-[#CC2828] rounded-xl p-4 w-full md:w-1/2 space-y-4">
          {/* Profile section */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-300" />
            <div className="space-y-2">
              <div className="h-4 w-32 bg-gray-300 rounded" />
              <div className="h-3 w-24 bg-gray-200 rounded" />
              <div className="h-3 w-48 bg-gray-200 rounded" />
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <div className="h-4 w-40 bg-gray-300 rounded" />
            <div className="w-full h-10 bg-gray-200 rounded" />
          </div>

          {/* Total Summary */}
          <div className="border-t border-[#CC2828] pt-4 space-y-2">
            <div className="flex justify-between">
              <div className="h-4 w-20 bg-gray-300 rounded" />
              <div className="h-4 w-24 bg-gray-300 rounded" />
            </div>
            <div className="h-3 w-48 bg-gray-200 rounded" />
          </div>

          {/* Button Placeholder */}
          <div className="w-full h-12 bg-gray-300 rounded" />
        </div>
      </div>
    </div>
  );
};

export { Loader, BookLoader, LessonLoader, TeacherLoader, TableLoader, ReviewLoader, ProfileFormLoader, MessageLoader, StudentDashboardLoader, TeacherDashboardLoader, EditProfileLoader, TeacherEarningsLoader, TeacherProfileFormLoader, ChatListShimmer, SpecialSlotLoader };