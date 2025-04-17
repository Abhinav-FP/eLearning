import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import StudentLayout from "../Common/StudentLayout";
import Listing from "@/pages/api/Listing";
import moment from "moment";


export default function ReviewsList() {

  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const main = new Listing();
    const response = main.ReviewUserGet();
    response.then((res) => {
      setReviews(res?.data?.data?.reviews || [])
    }).catch((error) => {
      console.log("erorr", error)
    })
  }, [])
  return (
    <StudentLayout page={"Settings"}>
      <div className="bg-white rounded-[10px] lg:rounded-[20px] p-5">
        <h2 className="text-lg font-semibold text-red-600 mb-4">Recent Reviews</h2>
        <div className="p-4">
          {reviews.map((review, index) => (
            <div className="relative bg-[#F6F7F7] rounded-lg shadow p-4 mb-4">
              <div className="flex justify-between items-start">
                <h3 className="text-sm font-semibold text-red-600"> Review on Lesson –{review?.lessonId?.title}</h3>
              </div>
              <p className="text-sm text-gray-800 mt-2">{review?.description}</p>
              <div className="flex justify-between items-center mt-4">
                <div className="flex text-yellow-500 space-x-1">
                  {Array.from({ length: review?.rating }).map((_, i) => (
                    <FaStar key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <span className="text-xs text-red-600">{moment(review?.updatedAt || review?.createdAt).format("MMMM DD, YYYY")}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StudentLayout>
  );
};

