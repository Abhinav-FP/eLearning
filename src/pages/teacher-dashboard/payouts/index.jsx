import Listing from "@/pages/api/Listing";
import TeacherLayout from "../Common/TeacherLayout";
import { useEffect, useState } from "react";

function Index() {

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

    const [payout, setPayout] = useState([])
    // console.log("payout", payout)

    useEffect(() => {
        const main = new Listing();
        main.PayoutList()
            .then((r) => {
                // console.log("r", r)
                setPayout(r?.data?.data)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (<>
        <TeacherLayout page={"Payout"}>
            <div className="min-h-screen p-5 lg:p-[30px]">
                <div className="flex justify-between items-center mb-4 lg:mb-5">
                    <h2 className="capitalize text-lg md:text-xl lg:text-2xl font-bold text-[#CC2828] tracking-[-0.04em] font-inter">
                        payout Entries
                    </h2>
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

                        <tbody>
                            {payout &&
                                payout?.map((item, index) => (
                                    <tr
                                        key={index}
                                        className="hover:bg-[rgba(204,40,40,0.1)] border-t border-[rgba(204,40,40,0.2)]"
                                    >
                                        <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter ">
                                            {index + 1}
                                        </td>
                                        <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter ">
                                            ${item?.amount}
                                        </td>
                                        <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter ">
                                            {item?.Status}
                                        </td>
                                        <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter ">
                                            {item?.TranscationId || item?.Reasons || "-"}
                                        </td>
                                        <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter ">
                                            {item?.BankId?.BankName}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>


        </TeacherLayout>
    </>);
}

export default Index;