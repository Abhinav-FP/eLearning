import React, { useEffect, useState } from "react";
import Layout from "../common/Layout";
import Listing from "../api/Listing";
import toast from "react-hot-toast";
import { useRole } from "@/context/RoleContext";
import { useRouter } from "next/router";

export default function Index() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { user } = useRole();

  const SendEmail = async () => {
    try {
      if (loading) return;
      setLoading(true);
      const main = new Listing();
      const response = await main.SendVerificationLink();
      if (response?.data?.status) {
        toast.success("Email Sent Successfully");
        setEmailSent(true);
        setLoading(false);
      } else {
        toast.error("Unable to send email");
        setLoading(false);
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error?.response?.data?.message || "An error occured");
      setLoading(false);
    }
  };

  useEffect(()=>{
    if(!user){
        router.push("/login");
    }
    if(user?.email_verify){
        router.push("/");
    }
  },[user])  

  return (
    <Layout>
      <div className="mt-20 lg:mt-40 min-h-[60vh] flex flex-col justify-center items-center px-4 text-center">
        <h1 className="text-2xl md:text-3xl font-semibold text-[#CC2828] mb-4">
          You have not verified your email yet.
        </h1>
        <p className="text-base md:text-lg text-gray-700 max-w-xl mb-6">
          Please verify your email address to continue using the platform. If
          you didn’t receive the welcome email or the link expired, you can
          click the button below to generate a new email.
        </p>
        {emailSent ? (
          <p className="text-[#CC2828] font-semibold">
            Verification Email Sent. Please check your inbox
          </p>
        ) : (
          <button
            className="bg-[#CC2828] hover:bg-[#ad0e0e] text-white font-medium py-2 px-6 rounded-full transition-all duration-200 cursor-pointer"
            onClick={() => {
              SendEmail();
            }}
          >
            {loading ? "Sending..." : "Resend Verification Email"}
          </button>
        )}
      </div>
    </Layout>
  );
}
