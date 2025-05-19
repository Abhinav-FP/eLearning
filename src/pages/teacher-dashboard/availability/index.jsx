import React, { useEffect, useState } from "react";
import TeacherLayout from "../Common/TeacherLayout";
import Availablility from "./Availablility";
import Listing from "@/pages/api/Listing";
import { useRole } from "@/context/RoleContext";

export default function Index() {
  const [Availability, setAvailability] = useState([]);
  const [studentTimeZone, setStudentTimeZone] = useState(null);
  const { user } = useRole();

  const TeacherAvailabilitys = async () => {
    try {
      const main = new Listing();
      const response = await main.TeacherAvailabilityGet();
      // console.log("response" ,response)
      setAvailability(response?.data?.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    TeacherAvailabilitys();
  }, []);

  // Get timezone
  useEffect(() => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    setStudentTimeZone(timeZone);
  }, []);

  // console.log("Availability", Availability);
  // console.log("user", user);
  return (
    <TeacherLayout page={"Price & Availability"}>
      <div className="min-h-screen p-5 lg:p-[30px]">
        <h1 className="font-inter text-lg lg:text-2xl xl:text-3xl font-bold text-[#CC2828] mb-6">
          Price & Availability
        </h1>
        <p className="text-sm text-gray-600 mb-2">
          {`All calendar times are displayed based on your current system time zone: ${
            studentTimeZone || "NA"
          }. The availability slots, however, are always added using your profile's configured time zone: ${
            user?.time_zone || ""
          }. To ensure accurate scheduling and avoid any discrepancies, please ensure that both time zones align.`}
        </p>
        <p className="text-sm text-gray-600 mb-6 lg:mb-8">
          Time slots having a booking in them are not editable. Please make sure you create the slots carefully.
        </p>
        <Availablility
          Availability={Availability}
          TeacherAvailabilitys={TeacherAvailabilitys}
        />
      </div>
    </TeacherLayout>
  );
}
