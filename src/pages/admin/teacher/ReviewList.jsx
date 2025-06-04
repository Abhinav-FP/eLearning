import moment from 'moment';
import React from 'react';
import { AiFillStar } from 'react-icons/ai';

export default function ReviewList({ reviews }) {
    return (
        <section className="mt-6 mx-auto px-4 ">
            <div className="grid grid-cols-1 gap-6">
                {reviews?.length === 0 ? (
                    <p className="text-gray-500">No reviews found.</p>
                ) : (
                    reviews.map((review) => (
                        <div
                            key={review._id}
                            className="bg-white border border-gray-200 rounded-2xl  p-6 transition "
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
                            <p className="text-gray-700 text-sm whitespace-pre-line leading-relaxed">
                                {review.description}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}
