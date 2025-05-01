import React, { useEffect, useState } from 'react'
import TeacherLayout from '../Common/TeacherLayout'
import Availablility from "./Availablility"
import Listing from '@/pages/api/Listing';

export default function Index() {
    const [Availability, setAvailability] = useState([]);

    const TeacherAvailabilitys = async () => {
        try {
            const main = new Listing();
            const response = await main.TeacherAvailabilityGet();
            console.log("response" ,response)
            setAvailability(response?.data?.data);
        } catch (error) {
            console.log("error", error);
        }
    };

    useEffect(() => {
        TeacherAvailabilitys();
    }, []);

    console.log("Availability" ,Availability)
    return (
        <TeacherLayout page={"Price & Availability"}>
            <div className="min-h-screen p-5 lg:p-[30px]">
                <h1 className="font-inter text-lg lg:text-2xl xl:text-3xl font-bold text-[#CC2828] mb-6">Price & Availability</h1>
                <Availablility Availability={Availability} TeacherAvailabilitys={TeacherAvailabilitys} />
            </div>
        </TeacherLayout>
    )
}
