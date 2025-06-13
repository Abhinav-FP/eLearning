import Listing from "@/pages/api/Listing";
import TeacherLayout from "../Common/TeacherLayout";
import { useEffect, useState } from "react";
import { TableLoader } from "@/components/Loader";
import NoData from "@/pages/common/NoData";
import { formatMultiPrice } from "@/components/ValueDataHook";
import * as XLSX from 'xlsx';
import toast from "react-hot-toast";

function Index() {
  const [payout, setPayout] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  
  const handleDropdownChange = (e) => {
    setSelectedOption(e.target.value);
  };


  useEffect(() => {
    setLoading(true);
    const main = new Listing();
    main
      .PayoutList(selectedOption)
      .then((r) => {
        setPayout(r?.data?.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setPayout([]);
      });
  }, [selectedOption]);

  const downloadExcel = () => {
    if(payout && payout?.length == 0){
      toast.error("No data to export");
      return;
    }
    const result = payout && payout?.map(item => ({
      Amount: formatMultiPrice(item?.amount, "USD") || "",
      Status: item?.Status || "",
      "TransactionDetails/Payment Details": item?.TransactionId || item?.Reasons || "-",
      Bank: item?.BankId?.BankName || "",
    }));
    const worksheet = XLSX.utils.json_to_sheet(result);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
    //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workbook, 'Payouts.xlsx');
  };

  return (
    <>
      <TeacherLayout page={"Payout"}>
        <div className="min-h-screen p-5 lg:p-[30px]">
          <div className="flex justify-between items-center mb-4 lg:mb-5">
            <h2 className="capitalize text-lg md:text-xl lg:text-2xl font-bold text-[#CC2828] tracking-[-0.04em] font-inter">
              payout Entries
            </h2>
            <div className="flex items-center space-x-3">
              <select
                value={selectedOption}
                onChange={handleDropdownChange}
                className="border border-[#CC2828] text-[#CC2828]  px-1 sm:px-4 py-1.5 rounded-md focus:outline-none"
                >
                <option value="">All</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
              <button
                onClick={() => {
                  downloadExcel();
                }}
                className="w-fit px-2 sm:px-8 py-2.5 hover:bg-white hover:text-[#CC2828] border border-[#CC2828] rounded-[10px] tracking-[-0.06em] text-sm font-medium bg-[#CC2828] text-white cursor-pointer"
              >
                Export as Excel
              </button>
            </div>
          </div>
          <div className="rounded-[5px] border border-[rgba(204,40,40,0.3)] overflow-x-auto">
            <table className="min-w-full text-sm text-center rounded-[20px]">
              <thead className="bg-[rgba(204,40,40,0.1)] text-[#535353] tracking-[-0.04em] font-inter rounded-[20px] whitespace-nowrap">
                <tr>
                  <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                    Index
                  </th>
                  <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                    Amount
                  </th>
                  <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                    payout status
                  </th>
                  <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                    transaction ID / payment Reasons
                  </th>
                  <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                    Bank Name
                  </th>
                </tr>
              </thead>
              {loading ? (
                <TableLoader length={5} />
              ) : (
                <tbody>
                  {payout && payout?.length > 0 ? (
                    payout?.map((item, index) => (
                      <tr
                        key={index}
                        className="hover:bg-[rgba(204,40,40,0.1)] border-t border-[rgba(204,40,40,0.2)]"
                      >
                        <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter ">
                          {index + 1}
                        </td>
                        <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter ">
                          {formatMultiPrice(item?.amount, "USD")}
                        </td>
                        <td className="capitalize px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter ">
                          {item?.Status}
                        </td>
                        <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter ">
                          {item?.TransactionId || item?.Reasons || "-"}
                        </td>
                        <td className="capitalize px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter ">
                          {item?.BankId?.BankName}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5}>
                        <div className="mt-2">
                            <NoData
                                Heading={"No Payouts found."}
                                content={
                                    "You don't have any payout request with the above filter."
                                }
                            />
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </TeacherLayout>
    </>
  );
}

export default Index;
