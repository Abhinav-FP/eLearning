import React from 'react';
import Layout from '../common/Layout';
import Hero from './Hero';
import HowItWork from '../common/HowItWork';
import Ready from './Ready';
import FindCource from './FindCource';
import FAQ from '../common/FAQ';
import Lesson from './Lesson';

export default function Main() {
  return (
     <Layout> 
       <Hero title={"Learn from Expert Teachers Anytime, Anywhere!"}/>
       <div id="howitwork">
        <HowItWork classess={''} title={"How It Works"} />
       </div>
       <Lesson title={"Learn from the Best: Expert English & Japanese Teachers"}/>
       <Ready  title={"Ready to Start Learning?"} />
       <FindCource title={"Find Your Course"}  pargraph={"Our customers trust us for quality, reliability, and exceptional service. Experience the same"} />
       <div id="faq">
        <FAQ />
       </div>
     </Layout>
  )
}
