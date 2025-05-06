import React from "react";
import TeacherLayout from "../Common/TeacherLayout";
import Card from "./Card";
import { FaWallet } from 'react-icons/fa';

export default function index() {
  const earnings = [
    {
      lesson: "English Speaking",
      lessonDate: "12 April",
      paymentId: "#1234",
      amount: 200,
      time: "30 Min",
    },
    {
        lesson: "English Speaking",
        lessonDate: "12 April",
        paymentId: "#1234",
        amount: 200,
        time: "30 Min",
      },
      {
        lesson: "English Speaking",
        lessonDate: "12 April",
        paymentId: "#1234",
        amount: 200,
        time: "30 Min",
      },
      {
        lesson: "English Speaking",
        lessonDate: "12 April",
        paymentId: "#1234",
        amount: 200,
        time: "30 Min",
      },
      {
        lesson: "English Speaking",
        lessonDate: "12 April",
        paymentId: "#1234",
        amount: 200,
        time: "30 Min",
      },
  ];

  const stats = [
    { label: 'Total Earnings', value: 1200, icon: <FaWallet className="w-6 h-6 text-[#CC2828]" /> },
    { label: 'Pending Earnings', value: 300, icon: <FaWallet className="w-6 h-6 text-[#CC2828]" /> },
    { label: 'Completed Earnings', value: 20, icon: <FaWallet className="w-6 h-6 text-[#CC2828]" /> },
  ];

  return (
    <TeacherLayout page={"Earnings & Payout"}>
      <div className="min-h-screen p-5 lg:p-[30px]">
        <div className="flex justify-between items-center mb-4 lg:mb-5">
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-[#CC2828] tracking-[-0.04em] font-inter">
            Earnings
          </h2>
          <div className="flex items-center space-x-2">
            <button
              className="w-fit px-2 sm:px-8 py-2.5 hover:bg-white hover:text-[#CC2828] border border-[#CC2828] rounded-[10px] tracking-[-0.06em] text-sm font-medium bg-[#CC2828] text-white cursor-pointer"
            >
              Request Payout
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {stats.map((item, idx) => (
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
                  Amount
                </th>
                <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                  Time
                </th>
              </tr>
            </thead>

            <tbody>
              {earnings &&
                earnings?.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-[rgba(204,40,40,0.1)] border-t border-[rgba(204,40,40,0.2)]"
                  >
                    <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter ">
                      {item?.lesson}
                    </td>
                    <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter ">
                      {item?.lessonDate}
                    </td>
                    <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter ">
                      {item?.paymentId}
                    </td>
                    <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter ">
                      ${item?.amount}
                    </td>
                    <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter ">
                      {item?.time}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </TeacherLayout>
  );
}