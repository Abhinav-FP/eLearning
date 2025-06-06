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
  const [teacherData, setTeacherData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    try {
      setLoading(true);
      const main = new Listing();
      const response = await main.HomePage();
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
    <Layout>
      <Hero title={"Learn from Expert Teachers Anytime, Anywhere!"} />
      <div id="howitwork">
        <HowItWork classess={''} title={"How It Works"} />
      </div>
      <div id="lesson">
        <Lesson title={"Learn from the Best: Expert English & Japanese Teachers"} />
      </div>
      <Ready title={"Ready to Start Learning?"} />
      <FindCource title={"Find Your Course"} pargraph={"Our customers trust us for quality, reliability, and exceptional service. Experience the same"} />
      <div id="faq">
        <FAQ />
      </div>
    </Layout>
  )
}
