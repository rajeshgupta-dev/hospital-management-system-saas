import StatsCard from "../components/StatsCard";
import ChartCard from "../components/ChartCard";

export default function PatientDashboard({ data }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard title="My Appointments" value={data.myAppointments.length} color="hospitalBlue" />
        <StatsCard title="Prescriptions" value={data.prescriptions.length} color="hospitalGreen" />
        <StatsCard title="Doctors Assigned" value={data.doctors.length} color="hospitalBlue" />
        <StatsCard title="Notifications" value={data.notifications} color="red" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard title="Health Trends" data={data.healthTrend} />
        <ChartCard title="Upcoming Appointments" data={data.upcomingAppointments} />
      </div>
    </div>
  );
}
