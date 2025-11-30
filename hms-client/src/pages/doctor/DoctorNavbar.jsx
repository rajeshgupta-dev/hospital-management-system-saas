import React from "react";
import { useSelector } from "react-redux";
import LogoutButton from "../../auth/LogoutButton";

export default function DoctorNavbar() {
  const { user, doctorData } = useSelector((state) => state.auth);

  return (
    <header className="flex items-center justify-between bg-white shadow p-4">
      {/* Left side: Logo or App Name */}
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold text-blue-700">HMS Doctor</h1>
      </div>

      {/* Right side: Doctor Profile */}
      <div className="flex items-center gap-4">
        <img
          src={
            doctorData.profile?.profilePic ||
            "https://media.istockphoto.com/id/2153805399/photo/portrait-of-happy-female-doctor-standing-outside-at-front-of-modern-hospital.jpg?s=612x612&w=0&k=20&c=VpWQU5uOsyMDJ_xCaDbOsIwWkKpGsu0J9HeFnn-9nYY="
          }
          alt={user?.name || "Doctor"}
          className="w-12 h-12 rounded-full border-2 border-blue-500 object-cover"
        />
        <div className="flex flex-col">
          <span className="font-semibold text-gray-800">{user?.name || "Doctor Name"}</span>
          <span className="text-sm text-gray-500">{user?.roles?.[0] || "Doctor"}</span>
        </div>
      </div>
    </header>
  );
}
