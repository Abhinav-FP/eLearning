import "@/styles/globals.css";
import "./style.css";
import "../styles/calendar.css";
import "../styles/Loader.css";
import { Toaster } from "react-hot-toast";
import { RoleProvider } from "@/context/RoleContext";
import NextNProgress from 'nextjs-progressbar';

export default function App({ Component, pageProps }) {
  return <>
   <NextNProgress color="#55844D" />
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