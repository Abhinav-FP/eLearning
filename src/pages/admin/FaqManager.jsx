import React, { useEffect, useState } from "react";
import Listing from "../api/Listing";
import toast from "react-hot-toast";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";

const FaqManager = () => {
    const [faqs, setFaqs] = useState([]);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        fetchFaqs();
    }, []);

    const fetchFaqs = async () => {
        setProcessing(true);
        try {
            const main = new Listing();
            const res = await main.HomeFaqList();
            const faqArray = res?.data?.data?.record || [];
            setFaqs(faqArray.filter(faq => faq.question && faq.answer));
        } catch {
            toast.error("Failed to fetch FAQs.");
        } finally {
            setProcessing(false);
        }
    };

    const handleFaqChange = (index, field, value) => {
        const updatedFaqs = [...faqs];
        updatedFaqs[index][field] = value;
        setFaqs(updatedFaqs);
    };

    const addFaq = () => {
        setFaqs([...faqs, { question: "", answer: "" }]);
    };

    const deleteFaq = async (index) => {
        const target = faqs[index];
        const updatedFaqs = [...faqs];
        updatedFaqs.splice(index, 1);
        setFaqs(updatedFaqs);

        if (target._id) {
            try {
                const main = new Listing();
                const res = await main.HomeFaqDelete({ _id: target._id });
                toast.success(res?.data?.message || "FAQ deleted.");
            } catch {
                toast.error("Failed to delete FAQ.");
            }
        }
    };

    const handleFaqSubmit = async (index) => {
        const target = faqs[index];
        if (!target?.question?.trim() || !target?.answer?.trim()) {
            toast.error("Question and Answer cannot be empty.");
            return;
        }

        if (processing) return;
        setProcessing(true);

        try {
            const main = new Listing();
            const payload = {
                question: target.question,
                answer: target.answer,
            };
            const response = target._id
                ? await main.HomeFaqUpdate({ ...payload, _id: target._id })
                : await main.HomeFaqAdd(payload);

            toast.success(response?.data?.message || "FAQ saved.");
            fetchFaqs();
        } catch (error) {
            const status = error?.response?.status;
            const message = error?.response?.data?.message || "Error occurred.";
            toast.error({
                401: "Unauthorized",
                403: "Access denied.",
                404: message,
                500: "Server error.",
            }[status] || message);
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="min-h-screen p-5 lg:p-[30px] space-y-10">
            <div className="w-full lg:w-6/12 pl-6 lg:pl-0 mb-4 flex justify-between">
                <h2 className="text-[#CC2828] text-xl lg:text-2xl font-semibold">FAQ Management</h2>
            </div>

            {faqs.map((faq, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    <div>
                        <label className="block text-[#CC2828] font-medium mb-2">Question</label>
                        <input
                            type="text"
                            value={faq.question}
                            onChange={(e) => handleFaqChange(index, 'question', e.target.value)}
                            placeholder="Enter question"
                            className="w-full border border-[#CC282880] bg-[#CC28281A] text-[#46494D] rounded-full px-4 py-2"
                        />
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-[#CC2828] font-medium">Answer</label>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => handleFaqSubmit(index)}
                                    className="bg-red-500 text-white rounded-full p-2 hover:bg-red-700"
                                    title={faq._id ? "Update FAQ" : "Add FAQ"}
                                >
                                    {faq._id ? <MdEdit /> : <MdAdd />}
                                </button>
                                <button
                                    onClick={() => deleteFaq(index)}
                                    className="bg-red-500 text-white rounded-full p-2 hover:bg-red-700"
                                    title="Delete FAQ"
                                >
                                    <MdDelete />
                                </button>
                            </div>
                        </div>
                        <input
                            type="text"
                            value={faq.answer}
                            onChange={(e) => handleFaqChange(index, 'answer', e.target.value)}
                            placeholder="Enter answer"
                            className="w-full border border-[#CC282880] bg-[#CC28281A] text-[#46494D] rounded-full px-4 py-2"
                        />
                    </div>
                </div>
            ))}

            <div className="flex justify-center pt-10">
                <button
                    onClick={addFaq}
                    className="w-full max-w-[183px] border border-[#CC2828] bg-[#CC2828] hover:bg-red-700 text-white py-3.5 rounded-[10px] text-base xl:text-xl transition"
                >
                    + Add More
                </button>
            </div>
        </div>
    );
};

export default FaqManager;
