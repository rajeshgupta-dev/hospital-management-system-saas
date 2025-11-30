import StatsCard from "../components/StatsCard";

export default function ReceptionDashboard({ data }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard title="Appointments Today" value={data.todayAppointments.length} color="hospitalBlue" />
        <StatsCard title="New Patients" value={data.newPatients} color="hospitalGreen" />
        <StatsCard title="Pending Approvals" value={data.pendingApprovals} color="red" />
        <StatsCard title="Notifications" value={data.notifications} color="hospitalBlue" />
      </div>
    </div>
  );
}
