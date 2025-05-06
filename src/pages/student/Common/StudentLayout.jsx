import SideBar from "./Sidebar";
import AuthLayout from "@/pages/common/AuthLayout";

export default function StudentLayout({ children, page }) {

  return (
    <AuthLayout sidebar={<SideBar/>} page={page}>
      {children}
    </AuthLayout>
  );
}