import React from 'react'
import TeacherLayout from '../Common/TeacherLayout'
import Availablility from "./Availablility"

export default function Index() {
    return (
        <TeacherLayout page={"Price & Availability"}>
            <div className="min-h-screen p-5 lg:p-[30px]">
                <h1 className="font-inter text-lg lg:text-2xl xl:text-3xl font-bold text-[#CC2828] mb-6">Price & Availability</h1>
                <Availablility />
            </div>
        </TeacherLayout>
    )
}
