import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../store/slices/authSlice";

import StatsCard from "../../components/StatsCard";
import { Users, Stethoscope, Calendar, Pill } from "lucide-react";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const { allUsers = [], loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  // Filter users by role
  const patients = allUsers.filter((u) => u.roles.includes("patient"));
  const doctors = allUsers.filter((u) => u.roles.includes("doctor"));
  const receptionists = allUsers.filter((u) => u.roles.includes("receptionist"));
  const pharmacists = allUsers.filter((u) => u.roles.includes("pharmacist"));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard title="Total Patients" value={patients.length} icon={Users} color="bg-blue-500" />
      <StatsCard title="Total Doctors" value={doctors.length} icon={Stethoscope} color="bg-green-500" />
      <StatsCard title="Total Appointments" value={12} icon={Calendar} color="bg-yellow-500" />
      <StatsCard title="Inventory Alerts" value={7} icon={Pill} color="bg-red-500" />
    </div>
  );
}
