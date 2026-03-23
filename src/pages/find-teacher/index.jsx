import React, { useEffect, useState } from "react";
import Layout from "../common/Layout";
import HowItWork from "../common/HowItWork";
import Teacher from "./Teacher";
import Listing from "../api/Listing";
import Head from "next/head";

export default function Index() {
  const [teacherData, setTeacherData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchData = async (filters = {}) => {
    try {
      setLoading(true);
      const main = new Listing();
      const response = await main.homeTeacher(filters);
      if (response?.data?.status) {
        setTeacherData(response.data.data);
      }
      else{
        setTeacherData([]);
      }
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setTeacherData([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
    <Head>
      <title>Find a Japanese Teacher | Akita Inaka School Online</title>
      <meta
        name="description"
        content="Search and book certified Japanese teachers for live Zoom lessons. Compare profiles, availability, experience, and pricing."
      />
    </Head>
    <Layout>
      <Teacher teacherData={teacherData} loading={loading} onSearch={fetchData}/>
      <HowItWork classess={"mb-[40px] md:mb-[60px] lg:mb-[100px] !mt-0"} />
    </Layout>
    </>
  );
}
