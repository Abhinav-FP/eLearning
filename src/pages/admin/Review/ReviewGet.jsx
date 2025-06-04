import Listing from '@/pages/api/Listing';
import moment from 'moment'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { AiFillStar } from 'react-icons/ai'
import { MdEdit } from 'react-icons/md';
import EditReview from './EditReview';

export default function ReviewGet({ reviews, Adminreview }) {
    const [processing, setProcessing] = useState(false);
    const [isLessonOpen, setIsLessonOpen] = useState(false);
    const closeLesson = () => setIsLessonOpen(false);

    const handleReviewAction = async (id, status) => {
        if (processing) return;

        setProcessing(true);
        try {
            const main = new Listing();
            const response = await main.ReviewStatus({
                review_status: status,
                _id: id
            });
            if (response) {
                Adminreview();
                toast.success(response.data.message)
            }
        } catch (error) {
            const status = error?.response?.status;
            const message = error?.response?.data?.message || "Something went wrong.";
            toast.error({
                401: "Unauthorized",
                403: "Access denied.",
                404: message,
                500: "Server error. Please try again later."
            }[status] || message);
        }
        setProcessing(false);
    };


    return (
        <section className="mt-6 mx-auto px-4">
            <div className="grid grid-cols-1 gap-6">
                {reviews?.length === 0 ? (
                    <p className="text-gray-500">No reviews found.</p>
                ) : (
                    reviews && reviews?.map((review) => (
                        <div
                            key={review._id}
                            className="bg-white border border-gray-200 rounded-2xl p-6 transition"
                        >
                            {/* Header: User Info & Status */}
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center gap-4">
                                    <img
                                        src={review.userId?.profile_photo}
                                        alt={review.userId?.name}
                                        className="w-12 h-12 rounded-full object-cover border"
                                    />
                                    <div>
                                        <h4 className="font-semibold text-gray-800 text-base">
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

                            {/* Review Text */}
                            <p className="text-gray-700 text-sm whitespace-pre-line leading-relaxed mb-4">
                                {review.description}
                            </p>

                            {/* Accept / Reject Buttons (only if pending) */}
                            {review.review_status === 'Pending' && (
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => handleReviewAction(review._id, 'Accept')}
                                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm"
                                    >
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => handleReviewAction(review._id, 'Reject')}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
                                    >
                                        Reject
                                    </button>
                                </div>
                            )}

                            <button className="bg-[#CC2828] tracking-[-0.04em] text-base mt-4 lg:mt-6 hover:bg-[#941111fd] mt-6 text-white px-6 lg:px-10 py-3 lg:py-3.5 rounded-[10px] font-bold cursor-pointer"
                                onClick={() => {
                                    setIsLessonOpen(true);
                                }}>
                                Edit Review
                            </button>
                            <EditReview
                                isOpen={isLessonOpen}
                                onClose={closeLesson}
                                data={review}
                                getLessons={Adminreview}
                            />
                        </div>
                    ))
                )}
            </div>
        </section>
    )
}
