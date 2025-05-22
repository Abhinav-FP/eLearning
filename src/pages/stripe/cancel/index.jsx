import Listing from "@/pages/api/Listing";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
export default function Index() {
    const router = useRouter();
   
    
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <MdClose className="w-20 h-20 text-red-600 mb-6" />
      <h2 className="text-3xl font-bold text-red-600 mb-2">Payment failed</h2>
      <p className="text-gray-600 text-center max-w-sm mb-6">
        Unfortunately, your payment was not successful. Please try again or use a different payment method.
      </p>
      <Link href="/" className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition">
        Try Again
      </Link>
    </div>
  );
}
