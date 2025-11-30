

import { useSelector } from "react-redux";
import DoctorDashboard from "./DoctorDashboard";
import PatientDashboard from "./PatientDashboard";
import ReceptionDashboard from "./ReceptionDashboard";
import PharmacyDashboard from "./PharmacyDashboard";

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth);

  // Dummy data you can replace with API call later
  const data = {
    myPatients: [{}, {}],
    todayAppointments: [{}, {}, {}],
    prescriptionsIssued: 12,
    notifications: 5,
    patientsPerMonth: [10, 12, 15, 9],
    appointmentsTrend: [5, 8, 10, 7],
    myAppointments: [{}, {}],
    prescriptions: [{}, {}],
    doctors: [{}, {}],
    healthTrend: [120, 115, 110, 108],
    upcomingAppointments: [{}, {}],
    newPatients: 4,
    pendingApprovals: 2,
    lowStock: 7,
    pendingPrescriptions: 5,
    totalMedicines: 120,
  };

  switch (user.roles[0]) {
    case "doctor":
      return <DoctorDashboard data={data} />;
    case "patient":
      return <PatientDashboard data={data} />;
    case "receptionist":
      return <ReceptionDashboard data={data} />;
    case "pharmacist":
      return <PharmacyDashboard data={data} />;
    default:
      return <div>No dashboard available</div>;
  }
}
