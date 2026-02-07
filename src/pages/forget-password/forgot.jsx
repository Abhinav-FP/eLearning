import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import toast from "react-hot-toast";
import Listing from "../api/Listing";
export default function Forgot() {

    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };
    const [Regs, setRegs] = useState({
        email: "",
    });

    const handleInputs = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setRegs((prevState) => ({ ...prevState, [name]: value }));
    };

    const [loading, setLoading] = useState(false);

    async function handleForms(e) {
        e.preventDefault();
        if (loading) {
            return false;
        }
        setLoading(true);
        const main = new Listing();
        try {
            const response = await main.ForgetPasswordLink(Regs);
            if (response?.data?.status === true) {
                toast.success(response.data.message);
                toggleModal();
            } else {
            }
            setLoading(false);
        } catch (error) {
            console.log("error", error);
            toast.error(error?.response?.data?.message);
            setLoading(false);
        }
    }
    return (
        <div className="flex flex-col">
            <div
                onClick={toggleModal}
                className="text-base font-medium text-[#55844D] hover:underline tracking-[-0.06em] "
            >
                Forgot Password ?
            </div>
            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50">
                    <div className="relative w-[96%] max-w-[470px] bg-white rounded-[10px] p-6">
                        <div className="absolute top-[10px] right-[10px]">
                            <IoCloseSharp
                                size={24}
                                className="cursor-pointer text-black"
                                onClick={toggleModal}
                            />
                        </div>

                        <div className="flex  flex-wrap justify-center">
                            <h3 className="text-[24px] font-[700] mb-4 pt-[5px] text-black text-center">
                                Forgot Password
                            </h3>
                            <p className="text-[14px] font-[400] mb-4 text-black text-center">
                                Enter your email to receive a link to Forgot Password
                            </p>
                        </div>
                        <form>
                            <div className="mb-4">
                                {/* <label className="block text-sm font-[18px] text-white text-left color-[#2D3344] mb-[10px]">
                  Email
                </label> */}
                                <input
                                    type="email"
                                    name="email"
                                    autocomplete="off"
                                    onChange={handleInputs}
                                    value={Regs.email}
                                    className="w-full px-4 lg:px-5 py-2 border h-[48px] lg:h-[56px] border-[#F4F6F8] rounded-[6px] lg:rounded-[10px] bg-[#F4F6F8] focus:outline-none focus:ring-1 focus:ring-[#c9c9c9]"

                                    placeholder="Enter the Email.."
                                    required
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    onClick={handleForms}
                                    className="w-full cursor-pointer border border-[rgba(0,0,0,0.1)] bg-[#CC2828] hover:bg-red-700 uppercase text-white py-3.5 cursor-pointer rounded-[10px] font-bold text-base transition"

                                >
                                    {loading ? "Loading..." : "Send Link"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
