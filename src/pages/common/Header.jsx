import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../Assets/Images/logo.png"; // Adjust the path as necessary
import { useRouter } from "next/router";
import { IoIosArrowDown } from "react-icons/io";
import Button from "./Button";

export default function Header() {

    // mobile menu 
    const [menuOpen, setMenuOpen] = useState();
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    // dropdown 
    const [DropDown, setDropDown] = useState(false);
    const ToggleDropdown = () => {
        setDropDown(!DropDown);
    }
    const [selectLang, setSelectLang] = useState('English');
    const handleLanguageSelect = (lang) => {
        setSelectLang(lang);
        setDropDown(false);
    }

    // header fixed 
    const [Scrolled, setScrolled] = useState();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 5);
        }
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [])

    return (
        <>
            <nav className={`fixed w-full top-0 z-50  transition-all duration-300 ease-in-out  ${Scrolled ? "bg-[#fff] py-1 lg:py-1" : "bg-transparent py-3 lg:py-3.5"}`}>
                <div className="mx-auto container sm:container md:container lg:max-w-[1230px] px-4">
                    <div className="relative flex items-center justify-between">
                        <div className="flex-shrink-0">
                            <Link href="/">
                                <Image
                                    className="max-w-[81px] h-[69px]"
                                    height={1000}
                                    width={1000}
                                    layout="fixed"
                                    src={Logo}
                                    alt="Japanese Logo"
                                />
                            </Link>
                        </div>
                        <div className={`rounded lg:rounded-[0] absolute top-full lg:top-auto lg:relative left-0 right-0 bg-white lg:bg-transparent lg:ml-2 lg:block ${menuOpen ? 'block' : 'hidden'}`}>
                            {/* <!-- Current: "text-[#EE834E]" --> */}
                            <ul className="flex flex-wrap lg:space-x-8 xl:space-x-10">
                                <li className="w-full lg:w-auto relative cursor-pointer [&:not(:last-child)]:border-b lg:border-none border-[#ddd] ">
                                    <Link
                                        href="/"
                                        className="py-3 lg:py-0 inline-block px-4 lg:px-0 capitalize text-base xl:text-lg tracking-[-0.04em] font-medium text-[#CC2828] hover:text-[#ad0e0e]">
                                        Home
                                    </Link>
                                </li>
                                <li className="w-full lg:w-auto relative cursor-pointer [&:not(:last-child)]:border-b lg:border-none border-[#ddd] ">
                                    <Link
                                        href="/find-teacher"
                                        className="py-3 lg:py-0 inline-block px-4 lg:px-0 capitalize text-base xl:text-lg tracking-[-0.04em] font-medium text-[#CC2828] hover:text-[#ad0e0e]">
                                        Find a Teacher
                                    </Link>
                                </li>
                                <li className="w-full lg:w-auto relative cursor-pointer [&:not(:last-child)]:border-b lg:border-none border-[#ddd] ">
                                    <Link
                                        href="/become-teacher"
                                        className="py-3 lg:py-0 inline-block px-4 lg:px-0 capitalize text-base xl:text-lg tracking-[-0.04em] font-medium text-[#CC2828] hover:text-[#ad0e0e]">
                                        Become a Teacher
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="flex flex-wrap space-x-4 items-center">
                            <div className="group relative">
                                <div onClick={ToggleDropdown} className="relative cursor-pointer border border-[#CC2828] text-base tracking-[-0.03em] rounded-[6px] text-[#CC2828] py-1.5 pl-4 pr-8 min-w-[126px] text-center">
                                    {selectLang}  <IoIosArrowDown size="16" className="absolute right-2 top-1/2 -translate-y-1/2" />
                                </div>
                                <div className={`absolute border-b border-l border-r border-[#ddd] bg-white top-full left-0 rounded-b ${DropDown ? 'block' : 'hidden'}`}>
                                    <button onClick={() => (handleLanguageSelect('English'))} className="w-full cursor-pointer bg-transparent py-.5 px-2 [&:not(:last-child)]:border-b py-2 border-[#ddd] hover:text-[#CC2828]">English</button>
                                    <button onClick={() => (handleLanguageSelect('Japanese'))} className="w-full cursor-pointer bg-transparent py-.5 px-2 py-2 [&:not(:last-child)]:border-b hover:text-[#CC2828]">Japanese</button>
                                </div>
                            </div>
                            <Button classes={'bg-[#CC2828] hover:bg-[#ad0e0e] text-white text-base py-3.5 px-10'} title="Sign Up" />
                            <Button classes={'bg-[#CC2828] hover:bg-[#ad0e0e] text-white text-base py-3.5 px-10'} title="Log In" />
                        </div>
                        <div className="flex lg:hidden">
                            {/* <!-- Mobile menu button --> */}
                            <button
                                type="button"
                                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                aria-controls="mobile-menu"
                                aria-expanded={menuOpen}
                                onClick={toggleMenu}
                            >
                                <span className="absolute -inset-0.5"></span>
                                <span className="sr-only">Open main menu</span>
                                {/* <!-- Icon when menu is closed.   Menu open: "hidden", Menu closed: "block"--> */}
                                <svg
                                    className={`${menuOpen ? "hidden" : "block"} h-6 w-6`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                    />
                                </svg>
                                {/* <!-- Icon when menu is open. Menu open: "block", Menu closed: "hidden" --> */}
                                <svg
                                    className={`${menuOpen ? "block" : "hidden"} h-6 w-6`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

            </nav>
        </>
    )
}