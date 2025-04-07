import React from 'react';
import Layout from '../common/Layout';
import Hero from './Hero';
import HowItWork from '../common/HowItWork';
import Lession from './Lession';
import Ready from './Ready';

export default function Index() {
  return (
     <Layout> 
       <Hero />
       <HowItWork />
       <Lession />
       <Ready />
     </Layout>
  )
}
