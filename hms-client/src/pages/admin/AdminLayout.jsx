import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-[#f1f5f9] overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 flex flex-col">
        <AdminNavbar />
        <div className="p-6 overflow-y-auto h-[calc(100vh-64px)]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
