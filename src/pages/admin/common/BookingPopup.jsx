import Popup from '@/pages/common/Popup';
import React, { useState } from 'react';
import { FaVideo } from 'react-icons/fa';

const BookingPopup = ({ data }) => {
    if (!data) return null;

    const [showPopup, setShowPopup] = useState(false);
    return (
        <>
            <div
                className="flex items-center gap-2 px-3 py-1.5 bg-blue-100 rounded-lg cursor-pointer hover:bg-blue-200 transition-colors duration-200"
                onClick={() => setShowPopup(true)}
                role="button"
                tabIndex={0}
            >
                <FaVideo className="text-blue-600 w-5 h-5" />
                <span className="text-blue-700 font-semibold text-sm select-none">Zoom</span>
            </div>
            {showPopup && (
                <Popup isOpen={showPopup} onClose={() => setShowPopup(false)} size={"max-w-[700px]"}>
                    <div className="flex justify-between items-center border-b pb-2">
                        <h2 className="text-xl font-semibold text-gray-800">Booking Details</h2>
                    </div>

                    {/* User & Teacher Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h3 className="font-bold text-gray-700">User</h3>
                            <p><strong>Name:</strong> {data.UserId?.name}</p>
                            <p><strong>Email:</strong> {data.UserId?.email}</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-700">Teacher</h3>
                            <p><strong>Name:</strong> {data.teacherId?.name}</p>
                            <p><strong>Email:</strong> {data.teacherId?.email}</p>
                        </div>
                    </div>

                    {/* Lesson Info */}
                    <div>
                        <h3 className="font-bold text-gray-700 mt-4">Lesson</h3>
                        <p><strong>Title:</strong> {data.LessonId?.title}</p>
                        <p><strong>Duration:</strong> {data.LessonId?.duration} min</p>
                        <p className="text-sm text-gray-600 mt-1">{data.LessonId?.description}</p>
                    </div>

                    {/* Payment Info */}
                    <div>
                        <h3 className="font-bold text-gray-700 mt-4">Payment</h3>
                        <p><strong>Amount:</strong> {data.Currency} {data.amount}</p>
                        <p><strong>Teacher Earning:</strong> {data.teacherEarning}</p>
                        <p><strong>Admin Commission:</strong> {data.adminCommission}</p>
                        <p><strong>Processing Fee:</strong> {data.processingFee}</p>
                    </div>

                    {/* Booking Info */}
                    <div>
                        <h3 className="font-bold text-gray-700 mt-4">Booking</h3>
                        <p><strong>Start:</strong> {new Date(data.startDateTime).toLocaleString()}</p>
                        <p><strong>End:</strong> {new Date(data.endDateTime).toLocaleString()}</p>
                        <p><strong>Completed:</strong> {data.lessonCompletedStudent && data.lessonCompletedTeacher ? "Yes" : "No"}</p>
                        <p><strong>Cancelled:</strong> {data.cancelled ? "Yes" : "No"}</p>
                    </div>

                    {/* Zoom Info */}
                    {data.zoom && (
                        <div>
                            <h3 className="font-bold text-gray-700 mt-4">Zoom Meeting</h3>
                            <p><strong>Meeting ID:</strong> {data.zoom.meetingId}</p>
                            <a
                                href={data.zoom.meetingLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline"
                            >
                                Join Zoom Meeting
                            </a>
                        </div>
                    )}
                </Popup>
            )}

        </>
    );
};

export default BookingPopup;
