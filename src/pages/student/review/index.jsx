import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import StudentLayout from "../Common/StudentLayout";


export default function ReviewsList() {

  const reviews = [
    {
      title: "John Doe",
      content:
        "The courses are well-structured, and the lesson was clear and well-paced. I liked how real-life examples were used to explain concepts. A few more exercises at the end would've helped reinforce learning. Overall, a good introduction to Algebra that's easy to understand even for beginners. Interactive lessons make learning engaging. The support from teachers is excellent!",
      date: "March 10, 2025",
      stars: 3,
    },
    {
      title: "John Doe",
      content:
        "John Doe is an amazing teacher. He explains topics patiently and ensures everyone understands before moving on. His classes are engaging and interactive. I've improved a lot in math since attending his lessons. Would highly recommend him to other students!",
      date: "March 10, 2025",
      stars: 2,
    },
  ];

  // const [reviews, setReviews] = useState([]);
  // console.log("reviews", reviews)
  // useEffect(() => {
  //   const main = new Listing();
  //   const response = main.ReviewUserGet();
  //   response.then((res) => {
  //     console.log("review", res);
  //     setReviews(res?.data?.data?.reviews || [])
  //   }).catch((error) => {
  //     console.log("erorr", error)
  //   })
  // }, [])
  return (
    <StudentLayout page={"Settings"}>
      <div className="bg-white rounded-[10px] lg:rounded-[20px] p-5">

        <h2 className="text-lg font-semibold text-red-600 mb-4">Recent Reviews</h2>
        <div className="p-4">
          {reviews.map((review, index) => (
            <div className="relative bg-[#F6F7F7] rounded-lg shadow p-4 mb-4">
              <div className="flex justify-between items-start">
                <h3 className="text-sm font-semibold text-red-600">{review?.title}</h3>
              </div>
              <p className="text-sm text-gray-800 mt-2">{review?.content}</p>
              <div className="flex justify-between items-center mt-4">
                <div className="flex text-yellow-500 space-x-1">
                  {Array.from({ length: review?.stars }).map((_, i) => (
                    <FaStar key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <span className="text-xs text-red-600">{review?.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StudentLayout>
  );
};

