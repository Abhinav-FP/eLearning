import React, { useEffect, useState } from 'react'
import TeacherLayout from '../Common/TeacherLayout'
import Listing from '@/pages/api/Listing';
import NoData from '@/pages/common/NoData';
import moment from 'moment';
import { AiFillStar } from 'react-icons/ai';

export default function Index() {
    const [reviews, setReviews] = useState([]);

    const TeacherReview = async () => {
        try {
            const main = new Listing();
            const response = await main.ReviewTeacher();
            setReviews(response?.data?.data);
        } catch (error) {
            console.log("error", error);
        }
    };

    useEffect(() => {
        TeacherReview();
    }, []);
    return (
        <div>
            <TeacherLayout page={"Reviews"}>
                <div className="min-h-screen p-5 lg:p-[30px]">
                    <div className="flex flex-wrap justify-between items-center mb-4 lg:mb-5">
                        <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-[#CC2828] tracking-[-0.04em] font-inter">
                            Reviews
                        </h2>
                    </div>
                    <section className="mt-6 mx-auto px-4">
                        <div className="grid grid-cols-1 gap-6">
                            {!Array.isArray(reviews) ? (
                                <div className=' p-6'>
                                    <NoData Heading={"No reviews found."} />
                                </div>
                            ) : (
                                reviews &&
                                reviews?.map((review) => (
                                    <div key={review._id} className="bg-white border border-gray-200 rounded-2xl p-6 transition" >
                                        <div className="flex justify-between items-center mb-4">
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={review.userId?.profile_photo ? review.userId?.profile_photo : "/profile.png" || "/profile.png"}
                                                    alt={review.userId?.name}
                                                    className="w-12 h-12 rounded-full object-cover border"
                                                />
                                                <div>
                                                    <h4 className="font-semibold text-gray-800 text-base capitalize">
                                                        {review.userId?.name}
                                                    </h4>
                                                    <p className="text-sm text-gray-500">
                                                        {moment(review.updatedAt).format('MMMM D, YYYY [at] hh:mm A')}
                                                    </p>
                                                </div>
                                            </div>

                                            
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${review.review_status === 'Pending'
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : review.review_status === 'Reject'
                                                        ? 'bg-red-100 text-red-800'
                                                        : 'bg-green-100 text-green-800'
                                                    }`}
                                            >
                                                {review.review_status}
                                            </span>
                                        </div>
                                        {/* Lesson Info */}
                                        <div className="mb-2">
                                            <p className="text-sm text-gray-600">
                                                Lesson:{' '}
                                                <span className="font-medium text-gray-800">
                                                    {review.lessonId?.title}
                                                </span>
                                            </p>
                                        </div>
                                        {/* Rating */}
                                        <div className="flex items-center gap-1 text-yellow-500 mb-3">
                                            {Array.from({ length: review.rating }, (_, i) => (
                                                <AiFillStar key={i} className="w-5 h-5" />
                                            ))}
                                        </div>
                                        {/* Description */}
                                        <p className="text-gray-700 text-sm whitespace-pre-line leading-relaxed mb-4">
                                            {review.description}
                                        </p>
                                    </div>
                                ))
                            )}
                        </div>
                    </section>
                </div>
            </TeacherLayout>
        </div>
    )
}
