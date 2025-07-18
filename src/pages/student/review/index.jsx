import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import StudentLayout from "../Common/StudentLayout";
import Listing from "@/pages/api/Listing";
import moment from "moment";
import { ReviewLoader } from "@/components/Loader";
import NoData from "@/pages/common/NoData";

export default function ReviewsList() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const main = new Listing();
    const response = main.ReviewUserGet();
    response
      .then((res) => {
        setReviews(res?.data?.data?.reviews || []);
        setLoading(false);
      })
      .catch((error) => {
        console.log("erorr", error);
        setReviews([]);
        setLoading(false);
      });
  }, []);


  return (
    <StudentLayout page={"Settings"}>
      <div className="p-5 lg:p-[30px] ">
        <h2 className="text-base md:text-xl lg:text-2xl font-bold text-[#CC2828] tracking-[-0.04em] font-inter">
          Recent Reviews
        </h2>
        <div className="mt-3 md:mt-4 lg:mt-6 space-y-4 lg:space-5">
          {loading ? (
            [1, 2, 3, 4].map((_, index) => <ReviewLoader key={index} />)
          ) : reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div
                key={index}
                className="relative bg-[#F6F7F7] rounded-[10px] p-4 lg:p-5"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-base font-semibold text-[#CC2828] -tracking-[0.04em] font-inter">
                    Review on Lesson – {review?.lessonId?.title}
                  </h3>
                </div>
                <p className="text-sm font-medium font-inter text-black mt-1 -tracking-[0.04em]">
                  {review?.description}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex text-[#E4B750] space-x-1">
                    {Array.from({ length: review?.rating }).map((_, i) => (
                      <FaStar key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <span className="text-sm text-[#CC2828] font-inter font-medium -tracking-[0.04em]">
                    {moment(review?.updatedAt || review?.createdAt).format(
                      "MMMM DD, YYYY"
                    )}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <NoData Heading={"No reviews available"} />
          )}
        </div>
      </div>
    </StudentLayout>
  );
}
