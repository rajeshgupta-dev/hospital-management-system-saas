import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctorData } from "../../store/slices/authSlice";
import StatsCard from "../../components/StatsCard";
import { Users, Calendar, Pill, LayoutDashboard } from "lucide-react";

export default function DoctorDashboard() {
  const dispatch = useDispatch();
  const { user, doctorData, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?.roles.includes("doctor")) {
      dispatch(fetchDoctorData(user.id));
    }
  }, [dispatch, user]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        title="My Patients"
        value={doctorData.patients.length}
        icon={Users}
        color="bg-blue-500"
      />
      <StatsCard
        title="My Appointments"
        value={doctorData.appointments.length}
        icon={Calendar}
        color="bg-green-500"
      />
      <StatsCard
        title="My Prescriptions"
        value={doctorData.prescriptions.length}
        icon={Pill}
        color="bg-yellow-500"
      />
      <StatsCard
        title="Profile Complete"
        value={doctorData.profile ? "Yes" : "No"}
        icon={LayoutDashboard}
        color="bg-purple-500"
      />
    </div>
  );
}
