import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
const localizer = momentLocalizer(moment);
// import "../../styles/calendar.css"
import Popup from '../common/Popup';
import PayPalButton from '../payment/index';
import Stripe from '../stripe/Stripe';

const Event = ({ event }) => {
    const formattedStartTime = moment(event.start).format('hh:mm A');
    const formattedEndTime = moment(event.end).format('hh:mm A');
    const eventStyle = {
        backgroundColor: event.color,
        borderRadius: '5px',
        color: 'white',
        padding: '4px',
        maxHeight: '80px',
        overflow: 'hidden',
        fontSize: '12px',
    };

    return (
        <div style={eventStyle}>
        </div>
    );
};
const Index = () => {
    const [events, setEvents] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        const data = [
            {
                id: 1,
                name: 'Booked By You',
                startTime: '2025-04-14T08:00:00',
                endTime: '2025-04-14T08:50:00',
                bookingStatus: 'bookedbyyou',
            },
            {
                id: 2,
                name: 'Blocked',
                startTime: '2025-04-14T10:30:00',
                endTime: '2025-04-14T11:00:00',
                bookingStatus: 'blocked',
            },
            {
                id: 3,
                name: 'Booked',
                startTime: '2025-04-14T12:00:00',
                endTime: '2025-04-14T12:50:00',
                bookingStatus: 'booked',
            },
            {
                id: 4,
                name: 'Booked by you',
                startTime: '2025-04-14T14:00:00',
                endTime: '2025-04-14T15:00:00',
                bookingStatus: 'bookedByYou',
            },
        ];

        const mappedEvents = data.map((event) => {
            let color = '#90EE90'; // Default: Available

            if (event.bookingStatus === 'booked') {
                color = '#B0B0B0';
            } else if (event.bookingStatus === 'blocked') {
                color = '#EDEDED';
            } else if (event.bookingStatus === 'bookedByYou') {
                color = '#A4C639';
            }

            return {
                ...event,
                title: event.name,
                start: new Date(event.startTime),
                end: new Date(event.endTime),
                color,
            };
        });

        setEvents(mappedEvents);
    }, []);




    const handleSelectSlot = (slotInfo) => {
        setSelectedSlot(slotInfo);
        setIsPopupOpen(true);
    };
    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };


    const eventStyleGetter = (event) => {
        return {
            style: {
                backgroundColor: event.color,
                borderRadius: '5px',
                opacity: 0.9,
                color: '#000',
                border: '1px solid #ccc',
            },
        };
    };

    const [currentDate, setCurrentDate] = useState(new Date());

    return (
        <>
            <div className="w-full ">
                    <div className="bg-white rounded-[20px]  border-[#CC282880] border-1">
                        <div className="py-1 py-2 lg:py-[15px] px-2 md:px-3 lg:px-6 flex flex-wrap justify-between items-center border-b border-black border-opacity-10">
                            <div className="flex flex-wrap items-center gap-4 mb-4">
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-[#6ABB52] inline-block"></span>
                                    <span className="text-sm text-gray-700">Available</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-[#D9D9D9] inline-block"></span>
                                    <span className="text-sm text-gray-700">Not Available</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-[#D9D9D9] inline-block"></span>
                                    <span className="text-sm text-gray-700">Booked</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-[#CC2828] inline-block"></span>
                                    <span className="text-sm text-gray-700">Booked by You</span>
                                </div>
                            </div>
                            <h3 className="text-base lg:text-lg font-semibold text-[#1E1E1E] m-0 tracking-[-0.03em]">

                                <button onClick={() => { setIsPopupOpen(true) }} className={'font-medium cursor-pointer rounded-full py-2 px-5 text-[#ffffff] bg-[#CC2828] hover:bg-[#ad0e0e] text-base w-full py-3.5'} >
                                    Book Slot
                                </button>

                            </h3>
                        </div>
                        <div className="p-4 relative">
                            <Calendar
                                localizer={localizer}
                                events={events}
                                startAccessor="start"
                                endAccessor="end"
                                defaultView={Views.WEEK}
                                views={[Views.WEEK]}
                                date={currentDate}
                                onNavigate={date => setCurrentDate(date)}
                                step={30}
                                timeslots={1}
                                style={{ height: '1000px', width: '100%' }}
                                selectable
                                eventPropGetter={eventStyleGetter}
                                components={{ event: Event }}
                                onSelectSlot={(slotInfo) => {
                                    const overlap = events.some(event =>
                                        moment(slotInfo.start).isBefore(event.end) &&
                                        moment(slotInfo.end).isAfter(event.start)
                                    );
                                    if (!overlap) {
                                        handleSelectSlot(slotInfo);
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            {isPopupOpen && (
                <Popup
                    isOpen={true}
                    onClose={handleClosePopup}
                    size={'max-w-[510px]'}
                >
                 
                    <PayPalButton />
                    <Stripe />
                </Popup>
            )}
        </>

    );
};

export default Index;