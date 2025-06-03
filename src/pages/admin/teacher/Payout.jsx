import NoData from '@/pages/common/NoData';
import moment from 'moment';
import React from 'react'
import { IoInformationCircleOutline } from 'react-icons/io5';

export default function Payout({ payout, }) {
    return (

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
                            Request Time
                        </th>
                        <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                            Action
                        </th>
                    </tr>
                </thead>

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
                                <td className="capitalize px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter ">
                                    ${item?.amount}
                                </td>
                                <td className="capitalize px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter ">
                                    {moment(item?.createdAt).format("MMMM D, YYYY h:mm A")}
                                </td>
                                <td className="capitalize px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter ">
                                    {item?.Status}
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
                                            "Your have not created any payout requests yet."
                                        }
                                    />
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
