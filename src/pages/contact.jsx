import React from 'react'
import Layout from './common/Layout'

export default function contact() {
  return (
    <Layout>
      <div className="pt-[89px] md:pt-[95px] lg:pt-[110px] pb-[20px] md:pb-[40px] lg:pb-[60px]">
      <div
        className="h-[40vh] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: "url('/Banner.png')", // Place image in public folder
        }}
      >
        <h1 className="text-white text-4xl font-bold">Contact Us</h1>
      </div>

      <div className="bg-white py-16 px-6 md:px-20">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Media and Business Inquiries
        </h2>
        <p className="text-gray-700">
          Email us at{' '}
          <a
            href="mailto:office@japaneseforme.com"
            className="text-blue-600 hover:underline"
          >
            office@japaneseforme.com
          </a>
          .
        </p>
      </div>
    </div>
    </Layout>
  )
}
