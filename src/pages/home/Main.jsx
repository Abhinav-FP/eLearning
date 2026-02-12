import React, { useEffect, useState } from 'react';
import Layout from '../common/Layout';
import Hero from './Hero';
import HowItWork from '../common/HowItWork';
import Ready from './Ready';
import FAQ from '../common/FAQ';
import Lesson from './Lesson';
import Listing from '../api/Listing';
import FindCourse from './FindCourse';
import NotSure from './NotSure';
import Head from 'next/head';
import Certificate from './Certificate';

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

  // const connectZoom = () => {
  //   const clientId = "Wbn0TMEnSmij1M7cYMG11w";
  //   const redirectUri = encodeURIComponent("https://elearning-backend-nbhf.onrender.com/api/v1/zoom/oauth-callback");
  //   const zoomURL = `https://zoom.us/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
  //   window.location.href = zoomURL;
  // };


  return (
    <>
    <Head>
      <title>Japanese for Me | Online Japanese learning platform focused on conversation, no textbook.</title>
      <meta
        name="description"
        content="Japanese for Me offers a conversation-centered online Japanese learning experience with absolutely no textbook required. Improve your speaking through real dialogues, everyday expressions, and personalized lessons designed by experienced Japanese teachers. Whether you’re a beginner wanting survival Japanese, an intermediate learner aiming for fluency, or life in Japan, we help you speak confidently and naturally. Learn anytime, anywhere."
      />
      <meta property="og:title" content="Japanese for Me" />
      <meta property="og:description" content="Learn Japanese through real conversation. No textbooks." />
      <meta property="og:image" content="https://akitainakaschoolonline.com/NewLogo.png" />
      <meta property="og:url" content="https://akitainakaschoolonline.com" />
      <meta property="og:type" content="website" />
    </Head>
    <Layout>
      <Hero
        title={homeData?.record?.hero_heading || "Learn from Expert Teachers Anytime, Anywhere!"}
        heroimg={homeData?.record?.hero_img_first}
        heroimg2={homeData?.record?.hero_img_second} 
        loading={loading} />
        <Certificate />
      <div id="howitwork">
        <HowItWork classess={''} title={"How It Works"} />
      </div>
      <NotSure/>
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
        {/* <button onClick={connectZoom} className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
          Connect Zoom Account
        </button> */}
      </div>
    </Layout>
    </>
  )
}
