import React, { useEffect, useState } from "react";
import Layout from "../common/Layout";
import HowItWork from "../common/HowItWork";
import Teacher from "./Teacher";
import { BookLoader } from "../../components/Loader";
import Listing from "../api/Listing";
import NoData from "../common/NoData";

export default function Index() {
  const [teacherData, setTeacherData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    try {
      setLoading(true);
      const main = new Listing();
      const response = await main.homeTeacher();
      if (response.data) {
        setTeacherData(response.data.data.record);
      }
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout>
      {loading ? (
        <BookLoader />
      ) : (
        <>
          <Teacher teacherData={teacherData} />
          <HowItWork classess={"mb-[40px] md:mb-[60px] lg:mb-[100px] !mt-0"} />
        </>
      )}
    </Layout>
  );
}
