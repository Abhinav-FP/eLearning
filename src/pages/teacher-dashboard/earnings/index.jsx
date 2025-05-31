import React, { useEffect, useMemo, useState } from "react";
import TeacherLayout from "../Common/TeacherLayout";
import Card from "./Card";
import { FaWallet } from "react-icons/fa";
import Earning from "./Earning";
import Listing from "@/pages/api/Listing";
import moment from "moment";
import { TeacherEarningsLoader } from "@/components/Loader";
import NoData from "@/pages/common/NoData";
import { formatMultiPrice } from "@/components/ValueDataHook";

export default function index() {
  // const earnings = [
  //   {
  //     lesson: "English Speaking",
  //     lessonDate: "12 April",
  //     paymentId: "#1234",
  //     amount: 200,
  //     time: "30 Min",
  //   },
  //   {
  //     lesson: "English Speaking",
  //     lessonDate: "12 April",
  //     paymentId: "#1234",
  //     amount: 200,
  //     time: "30 Min",
  //   },
  //   {
  //     lesson: "English Speaking",
  //     lessonDate: "12 April",
  //     paymentId: "#1234",
  //     amount: 200,
  //     time: "30 Min",
  //   },
  //   {
  //     lesson: "English Speaking",
  //     lessonDate: "12 April",
  //     paymentId: "#1234",
  //     amount: 200,
  //     time: "30 Min",
  //   },
  //   {
  //     lesson: "English Speaking",
  //     lessonDate: "12 April",
  //     paymentId: "#1234",
  //     amount: 200,
  //     time: "30 Min",
  //   },
  // ];

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchEarnings = async () => {
    try {
      setLoading(true);
      const main = new Listing();
      const response = await main.TeacherEarning();
      setData(response?.data?.data || []);
    } catch (error) {
      console.log("error", error);
      setData({});
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEarnings();
  }, []);

  // console.log("data",data);

  const stats = useMemo(
    () => [
      {
        label: "Total Earnings",
        value: data?.earningsSummary?.totalEarnings ?? "N/A",
        icon: <FaWallet className="w-6 h-6 text-[#CC2828]" />,
      },
      {
        label: "Available Earnings",
        value: data?.earningsSummary?.pendingEarnings ?? "N/A",
        icon: <FaWallet className="w-6 h-6 text-[#CC2828]" />,
      },
      {
        label: "Paid Earnings",
        value: data?.earningsSummary?.approvedEarnings ?? "N/A",
        icon: <FaWallet className="w-6 h-6 text-[#CC2828]" />,
      },
      {
        label: "Requested Earnings",
        value: data?.earningsSummary?.requestedEarnings ?? "N/A",
        icon: <FaWallet className="w-6 h-6 text-[#CC2828]" />,
      },
    ],
    [data]
  );

  const [IsEarning, setIsEarning] = useState(false);
  const close = () => setIsEarning(false);

  return (
    <TeacherLayout page={"Earnings & Payout"}>
      {loading ? (
        <TeacherEarningsLoader />
      ) : (
        <div className="min-h-screen p-5 lg:p-[30px]">
          <div className="flex justify-between items-center mb-4 lg:mb-5">
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-[#CC2828] tracking-[-0.04em] font-inter">
              Earnings
            </h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  setIsEarning(true);
                }}
                className="w-fit px-2 sm:px-8 py-2.5 hover:bg-white hover:text-[#CC2828] border border-[#CC2828] rounded-[10px] tracking-[-0.06em] text-sm font-medium bg-[#CC2828] text-white cursor-pointer"
              >
                Request Payout
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {stats &&
              stats?.map((item, idx) => (
                <Card
                  key={idx}
                  label={item.label}
                  value={item.value}
                  icon={item.icon}
                />
              ))}
          </div>
          <div className="rounded-[5px] border border-[rgba(204,40,40,0.3)] overflow-x-auto">
            <table className="min-w-full text-sm text-center rounded-[20px]">
              <thead className="bg-[rgba(204,40,40,0.1)] text-[#535353] tracking-[-0.04em] font-inter rounded-[20px] whitespace-nowrap">
                <tr>
                  <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                    Lesson Name
                  </th>
                  <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                    Lesson date
                  </th>
                  <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                    Payment Id
                  </th>
                  <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                    Payment date
                  </th>
                  <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                    Amount
                  </th>
                  {/* <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                  Payout Status
                </th> */}
                </tr>
              </thead>

              <tbody>
                {data && data.bookings && data.bookings.length > 0 ? (
                  data.bookings.map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-[rgba(204,40,40,0.1)] border-t border-[rgba(204,40,40,0.2)]"
                    >
                      <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter capitalize">
                        {item?.LessonId?.title || ""}
                      </td>
                      <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter capitalize">
                        {moment(item?.startDateTime).format(
                          "DD MMM YYYY, hh:mm A"
                        ) || ""}
                      </td>
                      <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter">
                        {item?.StripepaymentId?.payment_id ||
                          item?.paypalpaymentId?.orderID ||
                          ""}
                      </td>
                      <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter">
                        {moment(
                          item?.StripepaymentId?.created_at ||
                            item?.paypalpaymentId?.created_at
                        ).format("DD MMM YYYY, hh:mm A") || ""}
                      </td>
                      <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter">
                        {formatMultiPrice(item?.teacherEarning, "USD")}
                      </td>
                      {/* <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter capitalize">
                                    {item?.payoutStatus}
                                  </td> */}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5}>
                      <div className="mt-2">
                        <NoData
                          Heading={"No Earnings found."}
                          content={
                            "Your earnings will appear here once you complete a booking."
                          }
                        />
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {IsEarning && (
        <Earning
          isOpen={IsEarning}
          onClose={close}
          data={data?.earningsSummary?.pendingEarnings}
          fetchEarnings={fetchEarnings}
        />
      )}
    </TeacherLayout>
  );
}
