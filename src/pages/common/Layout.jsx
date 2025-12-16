import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useRole } from "@/context/RoleContext";
import Listing from "../api/Listing";
import moment from "moment-timezone";

export default function Layout({ children }) {
  const [isEmulating, setIsEmulating] = useState(false);
  const { user, setUser } = useRole();
    
  const fetchData = async (signal) => {
    try {
      const main = new Listing();
      const response = await main.profileVerify(signal);
      if (response.data) {
        setUser(response.data.data.user);
      }
    } catch (error) {
      console.log("error", error);
      localStorage?.removeItem("token");
    }
  };
  
    useEffect(() => {
      const controller = new AbortController();
      const { signal } = controller;
      fetchData(signal);
  
      return () => controller.abort();
    }, []);

    useEffect(() => {
      if (user?.time_zone) {
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
        <>
            <Header isEmulating={isEmulating}/>
            <main>{children}</main>
            <Footer />
        </>
    );
}