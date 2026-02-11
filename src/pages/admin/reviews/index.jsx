import { useEffect, useState } from "react";
import AdminLayout from "../common/AdminLayout";
import { MdRemoveRedEye } from "react-icons/md";
import { GoBlocked } from "react-icons/go";
import ReviewGet from "./ReviewGet";
import Listing from "@/pages/api/Listing";

export default function Index() {
  const [tabActive, setTabActive] = useState("all");
  const tabOptions = [
    { key: "all", label: "All", minWidth: "min-w-[98px]" },
    { key: "approved", label: "Accepted", minWidth: "min-w-[150px]" },
    { key: "pending", label: "Pending", minWidth: "min-w-[139px]" },
    { key: "reject", label: "Rejected", minWidth: "min-w-[168px]" },

  ];


  const [record, setRecord] = useState("")
  const Adminreview = async () => {
    try {
      const main = new Listing();
      const response = await main.ReviewList();
      setRecord(response?.data?.data);
    } catch (error) {
      console.log("error", error);
    }


  };

  useEffect(() => {
    Adminreview();
  }, []);

  return (
    <AdminLayout page={"Reviews"}>
      <div className="min-h-screen p-5 lg:p-[30px]">
        <div className="flex justify-between items-center mb-4 lg:mb-5">
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-[#55844D] tracking-[-0.04em] font-inter">
            Reviews
          </h2>
        </div>
        <div className="flex flex-wrap gap-3 md:gap-3 lg:gap-5 mb-4">
          {tabOptions && tabOptions?.map(({ key, label, minWidth }) => (
            <button
              key={key}
              onClick={() => setTabActive(key)}
              className={`text-sm lg:text-lg font-medium tracking-[-0.04em] px-2 py-3 lg:py-1.5 cursor-pointer border border-[#55844D] rounded-[10px] ${minWidth} ${tabActive === key ? "bg-[#55844D] text-white" : "bg-white text-[#55844D]"
                }`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="block">
          {tabActive === "all" && (<ReviewGet reviews={record.reviews} Adminreview={Adminreview} />)}
          {tabActive === "approved" && <ReviewGet reviews={record?.groupedReviews?.Accept} />}
          {tabActive === "pending" && <ReviewGet reviews={record?.groupedReviews?.Pending} />}
          {tabActive === "reject" && <ReviewGet reviews={record?.groupedReviews?.Reject} />}
        </div>
      </div>
    </AdminLayout>
  );
}
