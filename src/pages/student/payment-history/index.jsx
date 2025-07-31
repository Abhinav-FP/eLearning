import React, { useEffect, useState } from 'react'
import StudentLayout from '../Common/StudentLayout'
import Listing from '@/pages/api/Listing';
import moment from 'moment';
import { TableLoader } from '@/components/Loader';
import NoData from '@/pages/common/NoData';
import { formatMultiPrice } from '@/components/ValueDataHook';
export default function Index() {
  const [stripePayments, setStripePayments] = useState([]);
  const [paypalPayments, setPaypalPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const PaymentHistory = async () => {
    try {
      setLoading(true);
      const main = new Listing();
      const response = await main.PaymentUser();
      const allData = response?.data?.data || [];
      const stripe = allData.filter(item => item.StripepaymentId);
      const paypal = allData.filter(item => item.paypalpaymentId);
      setStripePayments(stripe);
      setPaypalPayments(paypal);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    PaymentHistory();
  }, []);
  console.log("stripePayments", stripePayments);
  console.log("paypalPayments", paypalPayments);

  const [selectedPayment, setSelectedPayment] = useState("paypal");
  const displayPayments = selectedPayment === "paypal" ? paypalPayments : stripePayments;
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
                <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                  Lesson Start & End DateTime
                </th>
                <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                  Teacher Name
                </th>
                <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">Payment Date & time</th>
                <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">Amount</th>
                <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">Payment Status</th>


              </tr>
            </thead>
            {loading ? (
              <TableLoader length={7} />
            ) : (
              <tbody>
                {displayPayments.length > 0 ? (
                  displayPayments.map((item, index) => {
                    const isPaypal = selectedPayment === "paypal";
                    const paymentInfo = isPaypal ? item.paypalpaymentId : item.StripepaymentId;
                    const paymentId = isPaypal ? paymentInfo?.orderID : paymentInfo?.payment_id;
                    const status = isPaypal ? paymentInfo?.status : paymentInfo?.payment_status;
                    const amount = paymentInfo?.amount || 0;
                    const paymentDate = isPaypal ? paymentInfo?.capturedAt : paymentInfo?.created_at;
                    const teacherName = item?.teacherId?.name;
                    const lessonTitle = item?.LessonId?.title;
                    const lessonstartDate = item?.startDateTime;
                    const lessonEndDate = item?.endDateTime;
                    return (
                      <tr key={index} className="border-t hover:bg-[rgba(204,40,40,0.1)] border-[rgba(204,40,40,0.2)]">
                        <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter">{paymentId}</td>
                        <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter">{lessonTitle}</td>
                        <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter">{moment(lessonstartDate).format("DD MMMM YYYY hh:mm A")} -{moment(lessonEndDate).format("DD MMMM YYYY hh:mm A")}</td>
                        <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter">{teacherName}</td>
                        <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter">{moment(paymentDate).format("DD MMMM YYYY hh:mm A")}</td>
                        <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter">{formatMultiPrice(amount, "USD")}</td>
                        <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter">{status}</td>

                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center text-gray-500 py-6 font-inter">
                      <NoData Heading={"No payment data available."} />
                    </td>
                  </tr>
                )
                }
              </tbody>
            )}
          </table>
        </div>
      </div>
    </StudentLayout>
  )
}
