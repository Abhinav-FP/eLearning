import { useRole } from "@/context/RoleContext";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function Forbidden() {
  const router=useRouter();
  const { user } = useRole();

  useEffect(()=>{
    if(!user){
        router.push("/");
    }
  },[])

  return (
    <div class="flex flex-col items-center justify-center h-[80vh] px-4">
      <h1 class="text-4xl font-bold text-gray-800 mb-4">Unauthorised route access detected</h1>
      <p class="text-gray-600 text-lg mb-8">
        You tried to access a route you do not have access to. Click the below button to go back to home page.
      </p>
      
      <Link
            href="/"
            className="font-medium cursor-pointer rounded-full px-3 md:px-5 text-[#ffffff] bg-[#55844D] hover:bg-[#3d5e37] text-sm sm:text-base w-fit py-2.5 lg:py-3.5"
          >
            Go to Home
          </Link>
    </div>
  );
}