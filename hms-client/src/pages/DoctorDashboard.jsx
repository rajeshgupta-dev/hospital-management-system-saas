import StatsCard from "../components/StatsCard";
import ChartCard from "../components/ChartCard";

export default function DoctorDashboard({ data }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard title="My Patients" value={data.myPatients.length} color="hospitalGreen" />
        <StatsCard title="Today's Appointments" value={data.todayAppointments.length} color="hospitalBlue" />
        <StatsCard title="Prescriptions Issued" value={data.prescriptionsIssued} color="hospitalBlue" />
        <StatsCard title="Notifications" value={data.notifications} color="red" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard title="Patients per Month" data={data.patientsPerMonth} />
        <ChartCard title="Appointments Trend" data={data.appointmentsTrend} />
      </div>
    </div>
  );
}
