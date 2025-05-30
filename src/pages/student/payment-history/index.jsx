import React, { useEffect, useState } from 'react'
import StudentLayout from '../Common/StudentLayout'
import Listing from '@/pages/api/Listing';
import moment from 'moment';
import { TableLoader } from '@/components/Loader';
import NoData from '@/pages/common/NoData';
import { formatMultiPrice } from '@/components/ValueDataHook';

export default function Index() {

  const [payment, setPayment] = useState([]);
  const[loading,setLoading]=useState(false);

  const PaymentHistory = async () => {
    try {
      setLoading(true);
      const main = new Listing();
      const response = await main.PaymentUser();
      setPayment(response?.data?.data);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    PaymentHistory();
  }, []);

  console.log("payment", payment)
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
                <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">Payment Date & time</th>
                {/* <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">duration</th> */}
                <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">Amount</th>
                <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">Payment Status</th>
              </tr>
            </thead>
            {loading ? (
              <TableLoader length={5} />
            ) : (
              <tbody>
                {(payment?.[selectedPayment === "paypal" ? "payment" : "stripeData"] || []).length > 0 ? (
                  (payment?.[selectedPayment === "paypal" ? "payment" : "stripeData"] || []).map((item, index) => {
                    const isPaypal = selectedPayment === "paypal";
                    const id = isPaypal ? item?.orderID : item?.payment_id || item?.session_id;
                    const status = isPaypal ? item?.status : item?.payment_status;
                    return (
                      <tr key={index} className="border-t hover:bg-[rgba(204,40,40,0.1)] border-[rgba(204,40,40,0.2)]">
                        <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter">{id}</td>
                        <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter">{item?.LessonId?.title}</td>
                        <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter">
                          {moment(item?.created_at).format("DD MMMM YYYY hh:mm A")}
                        </td>
                        <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter">{formatMultiPrice(item?.amount, "USD")}</td>
                        <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter">{status}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center text-gray-500 py-6 font-inter">
                      <NoData Heading={"No payment data available."}/>
                    </td>
                  </tr>
                )}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </StudentLayout>
  )
}
