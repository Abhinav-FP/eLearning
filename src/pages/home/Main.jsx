import React, { useEffect, useState } from 'react';
import Layout from '../common/Layout';
import Hero from './Hero';
import HowItWork from '../common/HowItWork';
import Ready from './Ready';
import FindCource from './FindCource';
import FAQ from '../common/FAQ';
import Lesson from './Lesson';
import Listing from '../api/Listing';

export default function Main() {
  const [homeData, setHomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    try {
      setLoading(true);
      const main = new Listing();
      const response = await main.HomePage();
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


  return (
    <Layout>
      <Hero title={homeData?.record?.hero_heading || "Learn from Expert Teachers Anytime, Anywhere!"} heroimg={homeData?.record?.hero_img_first} heroimg2={homeData?.record?.hero_img_second} />
      <div id="howitwork">
        <HowItWork classess={''} title={"How It Works"} />
      </div>
      <div id="lesson">
        <Lesson title={homeData?.record?.best_teacher || "Learn from the Best: Expert English & Japanese Teachers"} />
      </div>
      <Ready title={homeData?.record?.learn || "Ready to Start Learning?"} />
      <FindCource title={homeData?.record?.course_heading || "Find Your Course"}
        courseimg={homeData?.record?.course_img}
        pargraph={homeData?.record?.course_paragraph ||
          "Our customers trust us for quality, reliability, and exceptional service. Experience the same"} />
      <div id="faq">
        <FAQ Faq={homeData?.Faqrecord} />
      </div>
    </Layout>
  )
}
