import React, { useEffect, useState } from "react";
import Layout from "../common/Layout";
import HowItWork from "../common/HowItWork";
import Teacher from "./Teacher";
import Listing from "../api/Listing";
import Head from "next/head";

export default function Index() {
  const [teacherData, setTeacherData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    try {
      setLoading(true);
      const main = new Listing();
      const response = await main.homeTeacher();
      if (response.data) {
        setTeacherData(response.data.data);
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
    <>
    <Head>
      <title>Find a Japanese Teacher | Japanese For Me</title>
      <meta
        name="description"
        content="Search and book certified Japanese teachers for live Zoom lessons. Compare profiles, availability, experience, and pricing."
      />
    </Head>
    <Layout>
      <Teacher teacherData={teacherData} loading={loading} />
      <HowItWork classess={"mb-[40px] md:mb-[60px] lg:mb-[100px] !mt-0"} />
    </Layout>
    </>
  );
}
