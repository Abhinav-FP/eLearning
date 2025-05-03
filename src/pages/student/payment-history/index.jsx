import React, { useEffect, useState } from 'react'
import StudentLayout from '../Common/StudentLayout'
import Listing from '@/pages/api/Listing';
import moment from 'moment';

export default function Index() {

  const [payment, setPayment] = useState([]);
  const payments=[
    {
      "orderId": "ORD123456",
      "lessonName": "Intro to JavaScript",
      "paymentTime": "2025-04-24T10:30:00Z",
      "amount": 49.99,
      "paymentStatus": "Success"
    },
    {
      "orderId": "ORD123457",
      "lessonName": "Advanced CSS Grid",
      "paymentTime": "2025-04-23T14:15:00Z",
      "amount": 29.99,
      "paymentStatus": "Success"
    },
    {
      "orderId": "ORD123458",
      "lessonName": "React Fundamentals",
      "paymentTime": "2025-04-22T09:45:00Z",
      "amount": 59.99,
      "paymentStatus": "Failed"
    },
    {
      "orderId": "ORD123459",
      "lessonName": "Node.js Crash Course",
      "paymentTime": "2025-04-21T16:00:00Z",
      "amount": 39.99,
      "paymentStatus": "Success"
    },
    {
      "orderId": "ORD123460",
      "lessonName": "Full Stack Web Dev",
      "paymentTime": "2025-04-20T18:20:00Z",
      "amount": 99.99,
      "paymentStatus": "Failed"
    }
  ];  

  const PaymentHistory = async () => {
    try {
      const main = new Listing();
      const response = await main.PaymentUser();
      console.log("response", response)
      setPayment(response?.data?.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    PaymentHistory();
  }, []);

  console.log("payment", payment)
  const [showFilter, setShowFilter] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("paypal");

  return (
    <StudentLayout page={"Payments"}>
      <div className="min-h-screen p-5 lg:p-[30px]">

        <div className="flex justify-between items-center pb-4">
          <h2 className="text-base md:text-xl lg:text-2xl font-bold text-[#CC2828] tracking-[-0.04em] font-inter">Payments History</h2>
          <div>
            <select
              className="border h-[46px] border-[rgba(204,40,40,0.6)] text-[#CC2828] text-base font-medium tracking-[-0.04em] px-3 py-1 rounded-[10px]  bg-[rgba(204,40,40,0.1)] focus:outline-none font-inter"
              value={selectedPayment}
              onChange={(e) => setSelectedPayment(e.target.value)}
            >
              {/* <option value="">Filter</option> */}
              <option value="paypal">Paypal</option>
              <option value="stripe">Stripe</option>
            </select>
          </div>
        </div>
        <div className="rounded-[5px] border border-[rgba(204,40,40,0.3)] overflow-x-auto">
          <table className="min-w-full text-sm text-center rounded-[20px]">
            <thead className="bg-[rgba(204,40,40,0.1)] text-[#535353] tracking-[-0.04em] font-inter rounded-[20px] whitespace-nowrap">
              <tr>
                <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">Order Id</th>
                <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">Lesson name</th>
                <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">Payment time</th>
                {/* <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">duration</th> */}
                <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">Amount</th>
                <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">Payment Status</th>
              </tr>
            </thead>
            <tbody>
              {selectedPayment==="paypal" &&
              (payment && payment?.payment && payment?.payment?.map((item, index) => (
                <tr key={index} className="border-t hover:bg-[rgba(204,40,40,0.1)] border-t border-[rgba(204,40,40,0.2)]">
                  <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter ">{item?.orderID}</td>
                  <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter ">{item?.LessonId?.title}</td>
                  <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter ">{moment(item?.LessonId.createdAt).format("DD MMMM YYYY hh:mm A")}</td>
                  <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter ">${item?.amount}</td>
                  <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter ">{item?.status}</td>
                </tr>
              )))}
              {selectedPayment==="stripe" &&
              (payment && payment?.stripeData && payment?.stripeData?.map((item, index) => (
                <tr key={index} className="border-t hover:bg-[rgba(204,40,40,0.1)] border-t border-[rgba(204,40,40,0.2)]">
                  <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter ">{item?.payment_id}</td>
                  <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter ">{item?.LessonId?.title}</td>
                  <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter ">{moment(item?.LessonId.createdAt).format("DD MMMM YYYY hh:mm A")}</td>
                  <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter ">${item?.amount}</td>
                  <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter ">{item?.payment_status}</td>
                </tr>
              )))}
              {/* Mapping random data for client update */}
              {/* {payments && payments.map((item, index) => (
                <tr key={index} className="hover:bg-[rgba(204,40,40,0.1)] border-t border-[rgba(204,40,40,0.2)]">
                  <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter ">{item.orderId}</td>
                  <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter ">{item.lessonName}</td>
                  <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter ">{moment(item?.paymentTime).format("DD MMMM YYYY hh:mm A")}</td>
                  <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter ">${item.amount}</td>
                  <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter ">{item.paymentStatus}</td>
                </tr>
              ))} */}
            </tbody>
          </table>
        </div>
      </div>
    </StudentLayout>
  )
}
