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
      <div className="p-4 ">
        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <div className="flex justify-between items-center px-4 py-3 border-b ">
            <h2 className="text-lg font-semibold text-red-600">Payments History</h2>
            <div className="flex items-center space-x-2">
              <select
                className="border border-red-300 text-red-500 text-sm px-3 py-1 rounded hover:bg-red-100 focus:outline-none"
              >
                <option value="">   Filter</option>
                <option value="paypal">Paypal</option>
                <option value="credit_card">Credit Card</option>
                <option value="bank_transfer">Bank Transfer</option>
              </select>
            </div>
          </div>
          <table className="min-w-full text-sm text-left">
            <thead className="bg-red-100 text-red-600">
              <tr>
                <th className="px-4 py-2 font-medium">Teacher name</th>
                <th className="px-4 py-2 font-medium">Lesson name</th>
                <th className="px-4 py-2 font-medium">Lesson date and time</th>
                <th className="px-4 py-2 font-medium">Lesson duration</th>
                <th className="px-4 py-2 font-medium">Amount</th>
                <th className="px-4 py-2 font-medium">Payment Method</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((item, index) => (
                <tr key={index} className="border-t hover:bg-red-50">
                  <td className="px-4 py-2">{item.teacherName}</td>
                  <td className="px-4 py-2">{item.lessonName}</td>
                  <td className="px-4 py-2">{item.dateTime}</td>
                  <td className="px-4 py-2">{item.duration}</td>
                  <td className="px-4 py-2">{item.amount}</td>
                  <td className="px-4 py-2">{item.method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </StudentLayout>
  )
}
