import moment from 'moment';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
export default function NotificationPopup() {
    const [Record, setRecord] = useState(0);
    const [notifications, setNotifications] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    return (
        <div className="relative">
            <div>
                <div
                    className="border border-black border-opacity-10 rounded-md lg:rounded-xl w-[44px] lg:w-[48px] h-[34px] lg:h-[38px] flex items-center justify-center text-[#151547] hover:bg-[#1C5FE8] hover:text-white cursor-pointer"
                    onClick={() => setIsPopupOpen(!isPopupOpen)}
                    aria-label="Toggle Notifications"
                >
                    <svg className="w-[16px] lg:w-[18px] h-[18px] lg:h-[21px]"
                        width="18"
                        height="21"
                        viewBox="0 0 18 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M7 19H11C11 20.1 10.1 21 9 21C7.9 21 7 20.1 7 19ZM18 17V18H0V17L2 15V9C2 5.9 4 3.2 7 2.3V2C7 0.9 7.9 0 9 0C10.1 0 11 0.9 11 2V2.3C14 3.2 16 5.9 16 9V15L18 17ZM14 9C14 6.2 11.8 4 9 4C6.2 4 4 6.2 4 9V16H14V9Z"
                            fill="currentColor"
                        />
                    </svg>
                </div>
                {Record != "0" && (
                    <span className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                        {Record}
                    </span>
                )}
                {/* {isPopupOpen && (
                    <div className="absolute top-12 -right-12 md:right-0 w-[270px] md:w-[300px] bg-white shadow-lg rounded-xl p-4 z-10">
                        <div className="flex justify-between items-center border-b pb-2 mb-2">
                            <h3 className="text-lg font-semibold">Notifications</h3>
                            <button
                                className="text-gray-500 hover:text-black"
                                onClick={() => setIsPopupOpen(false)}
                                aria-label="Close Notifications" // ARIA label
                            >
                                ✕
                            </button>
                        </div>
                        <div>
                            {loading ? (
                                <p className="text-gray-500 text-sm">Loading...</p>
                            ) : error ? (
                                <p className="text-red-500 text-sm">{error}</p>
                            ) : notifications.length > 0 ? (
                                <ul className="space-y-2 max-h-[250px] overflow-y-auto">
                                    {notifications.map((notification, index) => (
                                        <li
                                            key={index}
                                            className="border-b pb-2 last:border-b-0"
                                        >
                                            <Link href={`/shipment`} className="text-sm text-gray-700">
                                                <strong>Shipment Name:</strong> {notification.ShipmentId?.name}
                                            </Link>

                                            <p className="text-xs text-gray-500">
                                                {notification.text || "N/A"}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                <strong>Name:</strong> {notification?.SenderId?.name}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                <strong>Role:</strong> {notification.SenderId?.role || "N/A"}
                                            </p>

                                            <div className="flex items-center justify-between space-x-4 mt-1">
                                                <button
                                                    className="text-blue-500 text-sm "
                                                    onClick={() => markAsRead(notification._id)}
                                                    aria-label={`Mark notification ${notification._id} as read`}
                                                >
                                                    Mark as Read
                                                </button>
                                                <p className='text-sm m-0 text-[#666]'>
                                                    {moment(notification.createdAt).fromNow()}
                                                </p>
                                            </div>
                                        </li>
                                    ))}

                                </ul>
                            ) : (
                                <p className="text-gray-500 text-sm">No new notifications</p>
                            )}
                        </div>
                    </div>
                )} */}
            </div>
        </div>
    );
}
