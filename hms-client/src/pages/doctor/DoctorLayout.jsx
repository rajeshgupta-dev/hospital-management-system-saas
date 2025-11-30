import React from "react";
import DoctorSidebar from "./DoctorSidebar";
import DoctorNavbar from "./DoctorNavbar";

export default function DoctorLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <DoctorSidebar />
      <main className="flex-1 bg-gray-100 p-6">
        <DoctorNavbar/>
        {children}</main>
    </div>
  );
}
