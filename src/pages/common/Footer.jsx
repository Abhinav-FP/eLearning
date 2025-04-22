import React from "react";
import Link from "next/link";
import FooterLogo from "../Assets/Images/footer-logo.png";
import Image from "next/image";
export default function Footer() {
     return (
        <>
          <footer className="bg-[#EFD1D1] pt-[50px] md:pt-[60px] lg:pt-[90px] pb-[15px] md:pb-[20px]">
              <div className="mx-auto container sm:container md:container lg:container xl:max-w-[1230px]  px-4">
                  <div className="flex flex-wrap -mx-4  justify-between ">
                     <div className="w-full md:w-[180px] px-4 mb-5 md:mb-0 ">
                        <Link href="/" > 
                           <Image src={FooterLogo} alt="img" />
                        </Link>
                     </div>
                     <div className="w-full md:w-[180px] px-4 ">
                        <h3 className="text-[#CC2828] text-lg lg:text-xl -tracking-[0.04em] font-bold mb-3 md:mb-4">Quick Links</h3>
                        <ul className="space-y-1">
                           <li>
                              <Link href="/" className="-tracking-[0.03em] text-base text-[#CC2828] hover:underline " >Home</Link>
                           </li>
                           <li>
                              <Link href="/" className="-tracking-[0.03em] text-base text-[#CC2828] hover:underline" >Find a Teacher</Link>
                           </li>
                           <li>
                              <Link href="/" className="-tracking-[0.03em] text-base text-[#CC2828] hover:underline" >How It Works</Link>
                           </li>
                           <li>
                              <Link href="/" className="-tracking-[0.03em] text-base text-[#CC2828] hover:underline" >FAQ</Link>
                           </li>
                           <li>
                              <Link href="/" className="-tracking-[0.03em] text-base text-[#CC2828] hover:underline" >Contact</Link>
                           </li>
                        </ul>
                     </div>
                     <div className="w-full md:w-[180px] px-4 ">
                     <ul className="space-y-1">
                           <li>
                              <Link href="/" className="-tracking-[0.03em] text-base text-[#CC2828] hover:underline " >Terms & condition</Link>
                           </li>
                           <li>
                              <Link href="/" className="-tracking-[0.03em] text-base text-[#CC2828] hover:underline" >Privacy Policy</Link>
                           </li> 
                        </ul>
                     </div>
                  </div>
              </div>
              <div className="border-t border-[rgba(56,121,117,0.2)] pt-3.5 mt-10 md:mt-16 lg:mt-28 text-center">
                 <div className="mx-auto container sm:container md:container lg:container xl:max-w-[1230px]  px-4">
                    <p className="text-[#CC2828] -tracking-[0.03em] text-sm lg:text-base m-0">© 2025 Japanese for Me. All Rights Reserved.</p>
                 </div>
              </div>
          </footer>
        </>
     )
}