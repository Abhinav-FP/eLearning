import React, { useEffect, useState } from "react";
import Layout from "../common/Layout";
import WhyTech from "./WhyTech";
import JoinPlatform from "./JoinPlatform";
import FAQ from "../common/FAQ";
import ReadyJoin from "./ReadyJoin";
import Listing from "../api/Listing";

export default function Index() {
    const [homeData, setHomeData] = useState([]);
     const [loading, setLoading] = useState(false);
     const fetchData = async () => {
       try {
         setLoading(true);
         const main = new Listing();
         const response = await main.TeacherFaqList();
         console.log("response" ,response)
         if (response.data) {
           setHomeData(response.data.data);
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
   
     console.log("homeData", homeData)
   return (
      <Layout>
         <WhyTech 
         title={'Why Teach with Japanese for Me?'} 
         pargraph={'At Japanese for Me, we empower educators to share their passion, connect with eager learners worldwide, and thrive in a flexible, supportive environment.'} />
         <JoinPlatform title={'Ways to join the platform - NO LICENSE REQUIRED'}/>
         <FAQ classess={'mt-[40px] md:mt-[80px] lg:mt-[100px] md:mb-5 lg:mb-10'} Faq={homeData} />
         <ReadyJoin />
      </Layout>
   )
}