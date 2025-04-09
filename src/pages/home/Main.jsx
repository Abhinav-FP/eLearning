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
       <Hero />
       <HowItWork />
       <Lesson />
       <Ready />
       <FindCource />
       <FAQ />
     </Layout>
  )
}
