import React, { useState } from 'react'
import AdminLayout from './common/AdminLayout'

export default function home() {

    const [processing, setProcessing] = useState(false);

    const [faqs, setFaqs] = useState([
        { question: '', answer: '' },
        { question: '', answer: '' },
    ]);

    const handleFaqChange = (index, field, value) => {
        const updatedFaqs = [...faqs];
        updatedFaqs[index][field] = value;
        setFaqs(updatedFaqs);
    };

    const addFAQ = () => {
        setFaqs([...faqs, { question: '', answer: '' }]);
    };


    const [data, setData] = useState({
        name: "",
        email: "",
        timezone: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const { name, files } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: files[0], // or files for multiple
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (processing) return;
        if (data?.phone?.length < 10) {
            toast.error("Phone Number must be 10 digits long");
            return;
        }
        setProcessing(true);
        try {
            const main = new Listing();
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("email", data.email);
            formData.append("time_zone", data.timezone);
            if (file instanceof File) {
                formData.append("profile_photo", file);
            }
            const response = await main.ProfileUpdate(formData);
            if (response?.data) {
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("API error:", error);
            const status = error?.response?.status;
            if (status === 401) {
                toast.error("Unauthorized: Invalid email or password.");
            } else if (status === 403) {
                toast.error("Access denied.");
            } else if (status === 500) {
                toast.error("Server error. Please try again later.");
            } else if (status === 404) {
                toast.error(error?.response?.data?.message);
            } else {
                toast.error("Something went wrong. Please try again.");
            }
            // toast.error(error?.response?.data?.message || "Something went wrong!");
        }
        setProcessing(false);
    };


    return (
        <AdminLayout page={"Home Edit"}>

            <div className="min-h-screen p-5 lg:p-[30px]">
                <div className="w-6/12 sm:w-4/12 pl-6 lg:pl-0">
                    <h2 className="text-[#CC2828] text-xl lg:text-2xl tracking-[-0.04em] font-semibold">Hero Section</h2>
                </div>

                <div className="border-b border-[rgba(0,0,0,.1)] py-6 lg:py-8 space-y-4 lg:space-y-6">
                    <div className="flex flex-wrap">
                        {/* Heading Input */}
                        <div className="w-full lg:w-5/12 xl:w-4/12 lg:pr-3 mb-2 lg:mb-0">
                            <label className="block text-[#CC2828] font-medium text-base xl:text-xl mb-1 tracking-[-0.04em]">
                                Heading
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Heading"
                                className="w-full h-11 lg:h-[54px] font-medium appearance-none block bg-[#CC28281A] text-[#46494D] text-base border border-[#CC282880] rounded-[20px] py-3 px-3 lg:px-6 leading-tight focus:outline-none"
                                value={data?.heading}
                                required
                                name="heading"
                                onChange={handleChange}
                            />
                        </div>

                        {/* Image Upload 1 */}
                        <div className="w-full lg:w-5/12 xl:w-4/12 lg:pr-3 mb-2 lg:mb-0">
                            <label className="block text-[#CC2828] font-medium text-base xl:text-xl mb-1 tracking-[-0.04em]">
                                Upload Image 1
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                className="w-full h-11 lg:h-[54px] font-medium appearance-none block bg-[#CC28281A] text-[#46494D] text-base border border-[#CC282880] rounded-[20px] py-3 px-3 lg:px-6 leading-tight focus:outline-none"
                                name="image1"
                                onChange={handleImageChange}
                            />
                        </div>

                        {/* Image Upload 2 */}
                        <div className="w-full lg:w-5/12 xl:w-4/12 lg:pr-3 mb-2 lg:mb-0">
                            <label className="block text-[#CC2828] font-medium text-base xl:text-xl mb-1 tracking-[-0.04em]">
                                Upload Image 2
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                className="w-full h-11 lg:h-[54px] font-medium appearance-none block bg-[#CC28281A] text-[#46494D] text-base border border-[#CC282880] rounded-[20px] py-3 px-3 lg:px-6 leading-tight focus:outline-none"

                                name="image2"
                                onChange={handleImageChange}
                            />
                        </div>
                    </div>
                </div>


                <div className='flex  justify-between items-center mb-2 mt-2 '>

                    <div className="w-6/12 sm:w-4/12 pl-6 lg:pl-0">
                        <h2 className="text-[#CC2828] text-xl lg:text-2xl tracking-[-0.04em] font-semibold">Find Faq</h2>
                    </div>
                    <button
                        type="button"
                        onClick={addFAQ}
                        className="text-[#CC2828] border border-[#CC2828] px-3 py-1 text-sm rounded hover:bg-[#CC2828] hover:text-white transition"
                    >
                        Add More FAQ
                    </button>
                </div>

                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                        <div>
                            <label className="block mb-1 text-[#CC2828] font-medium">Question</label>
                            <input
                                type="text"
                                value={faq.question}
                                onChange={(e) => handleFaqChange(index, 'question', e.target.value)}
                                placeholder="Enter question here"
                                className="w-full border border-[#CC282880] bg-[#CC28281A] text-[#46494D] rounded-full px-4 py-2"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-[#CC2828] font-medium">Answer</label>
                            <input
                                type="text"
                                value={faq.answer}
                                onChange={(e) => handleFaqChange(index, 'answer', e.target.value)}
                                placeholder="Enter Answer here"
                                className="w-full border border-[#CC282880] bg-[#CC28281A] text-[#46494D] rounded-full px-4 py-2"
                            />
                        </div>
                    </div>
                ))}


                <div className="w-6/12 sm:w-4/12 pl-6 lg:pl-0">
                    <h2 className="text-[#CC2828] text-xl lg:text-2xl tracking-[-0.04em] font-semibold">Find your course</h2>
                </div>

                <div className="border-b border-[rgba(0,0,0,.1)] py-6 lg:py-8 space-y-4 lg:space-y-6">
                    <div className="flex flex-wrap">
                        {/* Heading Input */}
                        <div className="w-full  lg:pr-3 mb-2 lg:mb-0">
                            <label className="block text-[#CC2828] font-medium text-base xl:text-xl mb-1 tracking-[-0.04em]">
                                Heading
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Heading"
                                className="w-full h-11 lg:h-[54px] font-medium appearance-none block bg-[#CC28281A] text-[#46494D] text-base border border-[#CC282880] rounded-[20px] py-3 px-3 lg:px-6 leading-tight focus:outline-none"
                                value={data?.heading}
                                required
                                name="heading"
                                onChange={handleChange}
                            />
                        </div>

                        {/* Image Upload 1 */}
                        <div className="w-full  lg:pr-3 mb-2 lg:mb-0">
                            <label className="block text-[#CC2828] font-medium text-base xl:text-xl mb-1 tracking-[-0.04em]">
                                Description
                            </label>
                            <textarea
                                cols={5}
                                rows={5}
                                type="text"
                                placeholder="Enter Heading"
                                className="w-full  font-medium appearance-none block bg-[#CC28281A] text-[#46494D] text-base border border-[#CC282880] rounded-[20px] py-3 px-3 lg:px-6 leading-tight focus:outline-none"
                                value={data?.heading}
                                required
                                name="heading"
                                onChange={handleChange}
                            />
                        </div>

                        {/* Image Upload 2 */}
                        <div className="w-full  lg:pr-3 mb-2 lg:mb-0">
                            <label className="block text-[#CC2828] font-medium text-base xl:text-xl mb-1 tracking-[-0.04em]">
                                Upload Image 2
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                className="w-full h-11 lg:h-[54px] font-medium appearance-none block bg-[#CC28281A] text-[#46494D] text-base border border-[#CC282880] rounded-[20px] py-3 px-3 lg:px-6 leading-tight focus:outline-none"

                                name="image2"
                                onChange={handleImageChange}
                            />
                        </div>
                    </div>
                </div>



                <div className="w-6/12 sm:w-4/12 pl-6 lg:pl-0">
                    <h2 className="text-[#CC2828] text-xl lg:text-2xl tracking-[-0.04em] font-semibold">Ready</h2>
                </div>

                <div className="border-b border-[rgba(0,0,0,.1)] py-6 lg:py-8 space-y-4 lg:space-y-6">
                    <div className="flex flex-wrap">
                        {/* Heading Input */}
                        <div className="w-full  lg:pr-3 mb-2 lg:mb-0">
                            <label className="block text-[#CC2828] font-medium text-base xl:text-xl mb-1 tracking-[-0.04em]">
                                Heading
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Heading"
                                className="w-full h-11 lg:h-[54px] font-medium appearance-none block bg-[#CC28281A] text-[#46494D] text-base border border-[#CC282880] rounded-[20px] py-3 px-3 lg:px-6 leading-tight focus:outline-none"
                                value={data?.heading}
                                required
                                name="heading"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>


                <div className="w-6/12 sm:w-4/12 pl-6 lg:pl-0">
                    <h2 className="text-[#CC2828] text-xl lg:text-2xl tracking-[-0.04em] font-semibold">Teacher</h2>
                </div>

                <div className="border-b border-[rgba(0,0,0,.1)] py-6 lg:py-8 space-y-4 lg:space-y-6">
                    <div className="flex flex-wrap">
                        {/* Heading Input */}
                        <div className="w-full  lg:pr-3 mb-2 lg:mb-0">
                            <label className="block text-[#CC2828] font-medium text-base xl:text-xl mb-1 tracking-[-0.04em]">
                                Heading
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Heading"
                                className="w-full h-11 lg:h-[54px] font-medium appearance-none block bg-[#CC28281A] text-[#46494D] text-base border border-[#CC282880] rounded-[20px] py-3 px-3 lg:px-6 leading-tight focus:outline-none"
                                value={data?.heading}
                                required
                                name="heading"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex w-full lg:w-12/12 xl:w-11/12 flex-wrap justify-center items-center pt-6 lg:pt-10 space-x-4 lg:space-x-6">
                    <button
                        className="w-full max-w-[183px] cursor-pointer border border-[#CC2828] bg-[#CC2828] hover:bg-red-700  text-white py-3.5 cursor-pointer rounded-[10px] font-normal text-base xl:text-xl transition  tracking-[-0.04em]"
                        type="submit"
                        onClick={handleSubmit}
                        disabled={processing}
                    >
                        {processing ? "Loading" : "Submit"}
                    </button>
                </div>
            </div>
        </AdminLayout >
    )
}
