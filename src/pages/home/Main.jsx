import React, { useEffect, useState } from 'react';
import Layout from '../common/Layout';
import Hero from './Hero';
import HowItWork from '../common/HowItWork';
import Ready from './Ready';
import FAQ from '../common/FAQ';
import Lesson from './Lesson';
import Listing from '../api/Listing';
import FindCourse from './FindCourse';

export default function Main() {
  const [homeData, setHomeData] = useState([]);
  // console.log("homeData", homeData);
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

  const connectZoom = () => {
    const clientId = "Wbn0TMEnSmij1M7cYMG11w";
    const redirectUri = encodeURIComponent("https://elearning-backend-nbhf.onrender.com/api/v1/zoom/oauth-callback");
    const zoomURL = `https://zoom.us/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
    window.location.href = zoomURL;
  };


  return (
    <Layout>
      <Hero
        title={homeData?.record?.hero_heading || "Learn from Expert Teachers Anytime, Anywhere!"}
        heroimg={homeData?.record?.hero_img_first}
        heroimg2={homeData?.record?.hero_img_second} 
        loading={loading} />
      <div id="howitwork">
        <HowItWork classess={''} title={"How It Works"} />
      </div>
      <div id="lesson">
        <Lesson title={homeData?.record?.best_teacher || "Learn from the Best: Expert English & Japanese Teachers"} />
      </div>
      <Ready title={homeData?.record?.learn || "Ready to Start Learning?"} />
      <FindCourse title={homeData?.record?.course_heading || "Find Your Course"}
        courseimg={homeData?.record?.course_img}
        pargraph={homeData?.record?.course_paragraph ||
          "Our customers trust us for quality, reliability, and exceptional service. Experience the same"} 
        loading={loading} />
      <div id="faq">
        <FAQ Faq={homeData?.Faqrecord} />
        <button onClick={connectZoom} className="bg-blue-600 text-white px-4 py-2 rounded">
          Connect Zoom Account
        </button>
      </div>
    </Layout>
  )
}
