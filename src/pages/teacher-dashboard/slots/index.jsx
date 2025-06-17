import React, { useEffect, useState } from 'react'
import TeacherLayout from '../Common/TeacherLayout'
import NoData from '@/pages/common/NoData';
import { TableLoader } from '@/components/Loader';
import Listing from '@/pages/api/Listing';
import AddSlot from './AddSlot';
import { formatMultiPrice } from '@/components/ValueDataHook';
import moment from 'moment';

export default function Iindex() {
  const [payout, setPayout] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const closePopup = () => setIsPopupOpen(false);

  const handleDropdownChange = (e) => {
    setSelectedOption(e.target.value);
  };

  useEffect(() => {
    setLoading(true);
    const main = new Listing();
    main
      .SpecialSlotGet(selectedOption)
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


  return (
    <TeacherLayout page={"Slots"}>
      <div className="min-h-screen p-5 lg:p-[30px]">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 lg:mb-5">
          <h2 className="capitalize text-lg md:text-xl lg:text-2xl font-bold text-[#CC2828] tracking-[-0.04em] font-inter mb-3 md:mb-0">
            Special Slots
          </h2>
          <div className="flex items-center justify-between space-x-3">
            <select
              value={selectedOption}
              onChange={handleDropdownChange}
              className="border border-[#CC2828] text-[#CC2828] px-1 sm:px-4 py-1.5 rounded-md h-[42px] focus:outline-none"
            >
              <option value="">All</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
            </select>
            <button
              onClick={() => {
                setIsPopupOpen(true);
              }}
              className="w-fit px-2 sm:px-8 py-2.5 hover:bg-white hover:text-[#CC2828] border border-[#CC2828] rounded-md h-[42px] tracking-[-0.06em] text-sm font-medium bg-[#CC2828] text-white cursor-pointer"
            >
              Add Special Slot
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
                  Lesson Name
                </th>
                <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                  Student Name
                </th>
                <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                  Amount
                </th>
                <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                  Start Time
                </th>
                <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                  Payment status
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
                        {item?.lesson?.title}
                      </td>
                      <td className="capitalize px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter ">
                        {item?.student?.name}
                      </td>
                      <td className="capitalize px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter ">
                        {moment(item?.startDateTime).format('DD MMM YYYY, hh:mm A') || ''}
                      </td>
                      <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter ">
                        {formatMultiPrice(item?.amount, "USD")}
                      </td>
                      <td className="capitalize px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter ">
                        {item?.paymentStatus}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5}>
                      <div className="mt-2">
                        <NoData
                          Heading={"No special slots found."}
                          content={
                            "Your have not created any special slots yet."
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
      <AddSlot
        isOpen={isPopupOpen}
        onClose={closePopup}
      />
    </TeacherLayout>
  );
}
