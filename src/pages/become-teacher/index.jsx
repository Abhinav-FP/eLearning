import React from "react";
import Layout from "../common/Layout";
import WhyTech from "./WhyTech";
import JoinPlatform from "./JoinPlatform";
import FAQ from "../common/FAQ";
import ReadyJoin from "./ReadyJoin";

export default function Index() {
   return (
      <Layout>
         <WhyTech />
         <JoinPlatform />
         <FAQ classess={'mt-[40px] md:mt-[80px] lg:mt-[100px] md:mb-5 lg:mb-10'} />
         <ReadyJoin />
      </Layout>
   )
}