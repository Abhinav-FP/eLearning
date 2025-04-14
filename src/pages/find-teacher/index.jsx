import React from "react";
import Layout from "../common/Layout";
import HowItWork from "../common/HowItWork";
import Teacher from "./Teacher";

export default function Index() {
   return (
      <Layout>
         <Teacher />
         <HowItWork classess={'mb-[40px] md:mb-[60px] lg:mb-[100px] !mt-0'} />
      </Layout>

   )
}