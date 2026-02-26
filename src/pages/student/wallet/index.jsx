import { useEffect, useState } from "react";
import moment from "moment";
import StudentLayout from "../Common/StudentLayout";
import { formatMultiPrice } from "@/components/ValueDataHook";
import Link from "next/link";
import Listing from "@/pages/api/Listing";

export default function Index() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const transactions = [
    {
      id: "TXN-1001",
      type: "credit",
      reason: "Wallet Recharge",
      amount: 300,
      status: "completed",
      createdAt: "2026-02-20T10:30:00Z",
    },
    {
      id: "TXN-1002",
      type: "debit",
      reason: "Lesson Payment",
      amount: 40,
      status: "completed",
      createdAt: "2026-02-21T12:00:00Z",
    },
    {
      id: "TXN-1003",
      type: "credit",
      reason: "Lesson Refund",
      amount: 40,
      status: "completed",
      createdAt: "2026-02-22T08:00:00Z",
    },
  ];

  const fetchData = async () => {
    try {
      setLoading(true);
      const main = new Listing();
      const response = await main.StudentWallet();
      if (response?.data?.status) {
        setData(response.data.data);
      }
    } catch (error) {
      console.log("error", error);
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log("data", data);

  return (
    <StudentLayout page={"Wallet History"}>
      <div className="min-h-screen p-5 lg:p-[30px] space-y-6">

        {/* 🔹 Wallet Balance Card */}
        <div className="bg-[rgba(38,185,27,0.1)] border border-[rgba(92,204,40,0.6)] rounded-[20px] p-6 flex flex-col md:flex-row md:items-center md:justify-between">
          
          <div>
            <h2 className="text-base md:text-xl lg:text-2xl font-bold text-[#55844D] tracking-[-0.04em] font-inter">
              Balance
            </h2>
            <p className="text-2xl lg:text-3xl font-extrabold text-[#55844D] mt-2 font-inter">
              {formatMultiPrice(data?.balance || 0, "USD") || ""}
            </p>
          </div>

          <Link
            href="/student/wallet/recharge"
            className="mt-4 md:mt-0 h-[46px] px-6 rounded-[12px] bg-[#55844D] text-white font-semibold text-base tracking-[-0.04em] hover:opacity-90 transition font-inter flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#55844D] focus:outline-none"
          >
            <span>Recharge Wallet</span>
          </Link>
        </div>

        {/* 🔹 Transactions Table */}
        <div>
          <h3 className="text-base md:text-xl font-bold text-[#55844D] tracking-[-0.04em] font-inter pb-4">
            Wallet Transactions
          </h3>

          <div className="rounded-[5px] border border-[rgba(19,101,16,0.3)] overflow-x-auto">
            <table className="min-w-full text-sm text-center rounded-[20px]">
              
              <thead className="bg-[rgba(38,185,27,0.1)] text-[#535353] tracking-[-0.04em] font-inter whitespace-nowrap">
                <tr>
                  <th className="px-4 py-3 border-t border-[rgba(19,101,16,0.2)]">
                    Transaction ID
                  </th>
                  <th className="px-4 py-3 border-t border-[rgba(19,101,16,0.2)]">
                    Type
                  </th>
                  <th className="px-4 py-3 border-t border-[rgba(19,101,16,0.2)]">
                    Reason
                  </th>
                  <th className="px-4 py-3 border-t border-[rgba(19,101,16,0.2)]">
                    Date & Time
                  </th>
                  <th className="px-4 py-3 border-t border-[rgba(19,101,16,0.2)]">
                    Amount
                  </th>
                  <th className="px-4 py-3 border-t border-[rgba(19,101,16,0.2)]">
                    Closing Balance
                  </th>
                </tr>
              </thead>

              {loading ? (
                <tbody>
                  <tr>
                    <td colSpan={6} className="py-6 text-gray-500 font-inter">
                      Loading...
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {data?.transactions && data?.transactions.length > 0 ? (
                    data?.transactions.map((item, index) => (
                      <tr
                        key={index}
                        className="border-t hover:bg-[rgba(38,185,27,0.1)] border-[rgba(19,101,16,0.2)]"
                      >
                        <td className="px-4 py-3 text-black font-medium font-inter">
                          {item?._id}
                        </td>

                        <td
                          className={`px-4 py-3 font-semibold font-inter capitalize ${
                            item?.type === "credit"
                              ? "text-[#55844D]"
                              : "text-red-500"
                          }`}
                        >
                          {item?.type}
                        </td>

                        <td className="px-4 py-3 text-black font-medium font-inter">
                          {item?.reason}
                        </td>

                        <td className="px-4 py-3 text-black font-medium font-inter">
                          {moment(item?.createdAt).format(
                            "DD MMM YYYY hh:mm A"
                          )}
                        </td>

                        <td
                          className={`px-4 py-3 font-semibold font-inter ${
                            item.type === "credit"
                              ? "text-[#55844D]"
                              : "text-red-500"
                          }`}
                        >
                          {item?.type === "credit" ? "+" : "-"}$
                          {formatMultiPrice(item?.amount, "USD") || ""}
                        </td>

                        <td className="px-4 py-3 text-black font-medium font-inter capitalize">
                          {formatMultiPrice(item?.balance, "USD") || ""}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center text-gray-500 py-6 font-inter"
                      >
                        No wallet transactions available.
                      </td>
                    </tr>
                  )}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}