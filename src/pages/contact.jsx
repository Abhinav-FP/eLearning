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
        <h2 className="text-3xl font-semibold text-gray-800 mb-2">
          Media and Business Inquiries
        </h2>
        <p className="text-gray-700">
          For any technical support, account help, booking issue, or Zoom-related issues, please contact us at {" "}
          <a
            href="mailto:office@japaneseforme.com"
            className="text-blue-600 hover:underline"
          >
            office@japaneseforme.com
          </a>
          .
        </p>
        <h2 className="text-3xl font-semibold text-gray-800 mt-4 mb-2">
          Support Hours:
        </h2>
        <p className="text-gray-700">
          Monday to Friday, 9 AM – 6 PM JST.
        </p>
        <p className="text-gray-700">
          Live support is currently unavailable.  
        </p>
        <p className="text-gray-700">
          We aim to resolve all issues within 1 business day.
        </p>
      </div>
    </div>
    </Layout>
  )
}
