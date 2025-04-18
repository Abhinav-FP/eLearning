import React, { useState } from 'react'
import StudentLayout from '../Common/StudentLayout'

export default function Index() {

   // const [payment, setPayment] = useState([]);
  // console.log("reviews", payment)
  // useEffect(() => {
  //   const main = new Listing();
  //   const response = main.PaymentUser();
  //   response.then((res) => {
  //     console.log("review", res);
  //     setReviews(res?.data?.data?.reviews || [])
  //   }).catch((error) => {
  //     console.log("erorr", error)
  //   })
  // }, [])
  const payments = Array(9).fill({
    teacherName: "April 23,2024",
    lessonName: "Trial Lesson",
    dateTime: "25 April, 11:00 pm",
    duration: "50 min",
    amount: "$50.00",
    method: "Paypal",
  });
  const [showFilter, setShowFilter] = useState(false);

  const toggleFilter = () => setShowFilter(!showFilter);
  return (
    <StudentLayout page={"Payments"}>
      <div className="pr-5">
        <div className="border border-[rgba(204,40,40,0.3)] rounded-[20px] shadow-md overflow-x-auto">
          <div className="flex justify-between items-center  px-4 lg:px-6 py-4">
            <h2 className="text-xl lg:text-2xl font-bold text-[#CC2828] tracking-[-0.04em] font-inter">Payments History</h2>
            <div className="flex items-center space-x-2">
              <select
                className="border h-[46px] border-[rgba(204,40,40,0.6)] text-[#CC2828] text-base font-medium tracking-[-0.04em] px-3 py-1 rounded-[10px]  bg-[rgba(204,40,40,0.1)] focus:outline-none font-inter"
              >
                <option value="">Filter</option>
                <option value="paypal">Paypal</option>
                <option value="credit_card">Credit Card</option>
                <option value="bank_transfer">Bank Transfer</option>
              </select>
            </div>
          </div>
          <table className="min-w-full text-sm text-left">
            <thead className="bg-[rgba(204,40,40,0.1)] text-[#535353] tracking-[-0.04em] font-inter">
              <tr>
                <th className="font-normal text-lg px-4 py-3 border-t border-[rgba(204,40,40,0.2)]">Teacher name</th>
                <th className="font-normal text-lg px-4 py-3 border-t border-[rgba(204,40,40,0.2)]">Lesson name</th>
                <th className="font-normal text-lg px-4 py-3 border-t border-[rgba(204,40,40,0.2)]">Lesson date and time</th>
                <th className="font-normal text-lg px-4 py-3 border-t border-[rgba(204,40,40,0.2)]">Lesson duration</th>
                <th className="font-normal text-lg px-4 py-3 border-t border-[rgba(204,40,40,0.2)]">Amount</th>
                <th className="font-normal text-lg px-4 py-3 border-t border-[rgba(204,40,40,0.2)]">Payment Method</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((item, index) => (
                <tr key={index} className="border-t hover:bg-[rgba(204,40,40,0.1)] border-t border-[rgba(204,40,40,0.2)]">
                  <td className="px-4 py-3 text-black text-lg font-medium font-inter ">{item.teacherName}</td>
                  <td className="px-4 py-3 text-black text-lg font-medium font-inter ">{item.lessonName}</td>
                  <td className="px-4 py-3 text-black text-lg font-medium font-inter ">{item.dateTime}</td>
                  <td className="px-4 py-3 text-black text-lg font-medium font-inter ">{item.duration}</td>
                  <td className="px-4 py-3 text-black text-lg font-medium font-inter ">{item.amount}</td>
                  <td className="px-4 py-3 text-black text-lg font-medium font-inter ">{item.method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </StudentLayout>
  )
}
