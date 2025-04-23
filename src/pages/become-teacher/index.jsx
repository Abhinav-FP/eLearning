import React from "react";
import Layout from "../common/Layout";
import WhyTech from "./WhyTech";
import JoinPlatform from "./JoinPlatform";
import FAQ from "../common/FAQ";
import ReadyJoin from "./ReadyJoin";

export default function Index() {
   return (
      <Layout>
         <WhyTech 
         title={'Why Teach with Japanese for Me?'} 
         pargraph={'At Japanese for Me, we empower educators to share their passion, connect with eager learners worldwide, and thrive in a flexible, supportive environment.'} />
         <JoinPlatform title={'Ways to join the platform - NO LICENSE REQUIRED'}/>
         <FAQ classess={'mt-[40px] md:mt-[80px] lg:mt-[100px] md:mb-5 lg:mb-10'} />
         <ReadyJoin />
      </Layout>
   )
}