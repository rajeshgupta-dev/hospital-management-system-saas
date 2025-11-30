// Layout.js
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import LogoutButton from "@/auth/LogoutButton";

export default function Layout() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="flex h-screen bg-[#f1f5f9] overflow-hidden">
      {user.roles[0] === "tenant-admin" && <Sidebar />}
      <main className="flex-1 flex flex-col">
        {user.roles[0] === "tenant-admin" && <Navbar />}
        <div className="p-6 overflow-y-auto h-[calc(100vh-64px)]">
          <Outlet />
        </div>
      </main>
      <LogoutButton/>
    </div>
  );
}
