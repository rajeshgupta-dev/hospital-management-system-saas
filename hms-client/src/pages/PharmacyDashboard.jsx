import StatsCard from "../components/StatsCard";

export default function PharmacyDashboard({ data }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard title="Medicines Low Stock" value={data.lowStock} color="red" />
        <StatsCard title="Prescriptions to Dispense" value={data.pendingPrescriptions} color="hospitalGreen" />
        <StatsCard title="Total Medicines" value={data.totalMedicines} color="hospitalBlue" />
        <StatsCard title="Notifications" value={data.notifications} color="hospitalBlue" />
      </div>
    </div>
  );
}
