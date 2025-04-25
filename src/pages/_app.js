import "@/styles/globals.css";
import "./style.css";
import "../styles/calendar.css";
import { Toaster } from "react-hot-toast";
import { RoleProvider } from "@/context/RoleContext";

export default function App({ Component, pageProps }) {
  return <>
    <Toaster
      toastOptions={{
        position: "top-right",
        className: "",
        style: {
          fontSize: "14px", // Corrected "font-size" to camelCase as required in JSX styles
        },
      }}
    />
    <RoleProvider>
     <Component {...pageProps} />
    </RoleProvider>
  </>;
}
