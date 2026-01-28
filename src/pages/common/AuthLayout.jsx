import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NotifcationPopup from "./NotifcationPopup";
import toast from "react-hot-toast";
import Link from "next/link";
import { MdLogout } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import Listing from "@/pages/api/Listing";
import { FaRegUser } from "react-icons/fa6";
import { useRole } from "@/context/RoleContext";
import moment from "moment-timezone";

export default function AuthLayout({ children, page, sidebar }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isEmulating, setIsEmulating] = useState(false);
  const { user, setUser } = useRole();
  const router = useRouter();
  // console.log("user", user);

  const handleLogout = () => {
    localStorage && localStorage.removeItem("token");
    router.push("/login");
    toast.success("Logout Successfully");
    setUser(null);
  };

  const fetchData = async (signal) => {
    try {
      const main = new Listing();
      const response = await main.profileVerify(signal);
      if (response.data) {
        setUser(response.data.data.user);
      }
      if (!response?.data?.data?.user?.email_verify) {
        router.push("/verify");
      }
    } catch (error) {
      console.log("error", error);
      localStorage?.removeItem("token");
      setUser(null);
      router.push("/login");
      toast.error("Please log in first.");
    }
  };

  // 🔒 New function to check role-based access
  const checkRoleAccess = (user) => {
    if (!user) return;

    const { pathname } = router;

    const restrictedRoutes = {
      student: ["/teacher-dashboard", "/admin"],
      teacher: ["/admin", "/student"],
      admin: ["/student", "/teacher-dashboard"],
    };

    const role = user.role;
    const forbiddenPaths = restrictedRoutes[role] || [];

    const isRestricted = forbiddenPaths.some((path) =>
      pathname.startsWith(path)
    );

    if (isRestricted) {
      router.push("/forbidden");
    }
  };

  const handleReturnToAdmin = () => {
    const adminToken = localStorage && localStorage.getItem("admintoken");
    if (!adminToken) {
      toast.error("Admin session not found");
      return;
    }
    localStorage && localStorage.setItem("token", adminToken);
    localStorage && localStorage.removeItem("admintoken");
    toast.success("Returned to admin account");
    setUser(null);
    router.push("/admin");
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    fetchData(signal);
    return () => controller.abort();
  }, []);


  useEffect(() => {
    if (user) {
      checkRoleAccess(user);
    }
  }, [user]);

  useEffect(() => {
    if (user && user?.role != "student" && user?.time_zone) {
      moment.tz.setDefault(user.time_zone);
      // console.log("Timezone updated to:", user.time_zone);
    }
  }, [user?.time_zone]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const adminToken = localStorage.getItem("admintoken");
      setIsEmulating(!!adminToken);
    }
  }, []);

  return (
    <div className="md:flex flex-wrap bg-black items-start">
      {sidebar}
      <div className="w-full lg:ml-[286px] lg:w-[calc(100%-286px)]">
        <div className="fixed right-0  z-10 pl-0 lg:pl-[30px] top-0 w-full lg:w-[calc(100%-286px)] ">
          <div className="justify-between px-4 md:px-5 lg:px-[30px] py-3 lg:py-4 top-0 bg-white flex items-center w-full flex-wrap rounded-b-[10px]">
            <div className="w-7/12 sm:w-4/12 pl-6 lg:pl-0">
              <h1 className="text-[#CC2828] text-lg sm:text-xl lg:text-2xl tracking-[-0.04em] font-semibold">{page || "Dashboard"}</h1>
            </div>
            <div className="w-5/12 sm:w-8/12 flex justify-end space-x-2.5 md:space-x-4">
              <div className="relative">
                <button className="border border-[rgba(0,0,0,0.1)] rounded-md lg:rounded-xl w-[44px] lg:w-[48px] h-[34px] lg:h-[38px] flex items-center justify-center text-[#CC2828] bg-[rgba(204,40,40,0.1)] hover:bg-[#CC2828] hover:text-white cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
                  <FaRegUser size={18} />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-50">
                    <ul className="py-1">
                      <Link
                        href={`${user && user?.role === "student" ? "/student/setting" : user?.role === "teacher" ? "/teacher-dashboard/setting" : "/admin/setting"}`}
                        className="flex gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        <IoSettingsOutline size={20} /> Settings
                      </Link>
                      {isEmulating ? (
                        <li
                          className="flex gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer text-[#CC2828]"
                          onClick={handleReturnToAdmin}
                        >
                          <MdLogout size={20} /> Return to Admin
                        </li>
                      ) : (
                        <li
                          className="flex gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={handleLogout}
                        >
                          <MdLogout size={20} /> Logout
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="pl-0 md:pl-5 lg:pl-[30px] pt-20 lg:pt-24 pb-8 bg-[#F2F2F2]">
          <div className="bg-white rounded-[10px] lg:rounded-[10px] ">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}