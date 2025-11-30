import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import UserLogin from "../auth/UserLogin";
import HospitalLogin from "../auth/HospitalLogin";
import HospitalSignup from "../auth/HospitalSignup";

// Layouts
import Layout from "../components/Layout";
import AdminLayout from "../pages/admin/AdminLayout";

// Private Routes
import PrivateRoute from "./PrivateRoute";

// USER DASHBOARDS
import DoctorDashboard from "../pages/doctor/DoctorDashboard";
import PatientDashboard from "../pages/patient/PatientDashboard";
import ReceptionDashboard from "../pages/reception/ReceptionDashboard";
import PharmacyDashboard from "../pages/pharmacy/PharmacyDashboard";

// ADMIN DASHBOARD
import AdminDashboard from "../pages/admin/AdminDashboard";
import PatientsList from "../features/patients/PatientsList";
import DoctorsList from "../pages/doctor/DoctorsList";
import AppointmentsList from "../features/appointments/AppointmentsList";
import InventoryList from "../features/inventory/InventoryList";
import DoctorLayout from "@/pages/doctor/DoctorLayout";

export default function AppRoutes() {
  return (
    <Routes>
      {/* ===================== PUBLIC ROUTES ===================== */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/user-login" element={<UserLogin />} />
      <Route path="/admin-login" element={<HospitalLogin />} />
      <Route path="/admin-signup" element={<HospitalSignup />} />

      {/* ===================== ADMIN PRIVATE ROUTES ===================== */}
      <Route element={<PrivateRoute allowedRoles={["tenant-admin"]} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="patients" element={<PatientsList />} />
          <Route path="doctors" element={<DoctorsList />} />
          <Route path="appointments" element={<AppointmentsList />} />
          <Route path="inventory" element={<InventoryList />} />
        </Route>
      </Route>

      {/* ===================== DOCTOR PRIVATE ROUTES ===================== */}
      <Route element={<PrivateRoute allowedRoles={["doctor"]} />}>
        <Route path="/doctor" element={<DoctorLayout/>}>
          <Route index element={<DoctorDashboard />} />
          <Route path="patients" element={<PatientsList />} />
          <Route path="appointments" element={<AppointmentsList />} />
          <Route path="prescriptions" element={<DoctorDashboard />} /> {/* Replace with actual prescriptions */}
        </Route>
      </Route>

      {/* ===================== PATIENT PRIVATE ROUTES ===================== */}
      <Route element={<PrivateRoute allowedRoles={["patient"]} />}>
        <Route path="/patient" element={<Layout />}>
          <Route index element={<PatientDashboard />} />
        </Route>
      </Route>

      {/* ===================== RECEPTIONIST PRIVATE ROUTES ===================== */}
      <Route element={<PrivateRoute allowedRoles={["receptionist"]} />}>
        <Route path="/reception" element={<Layout />}>
          <Route index element={<ReceptionDashboard />} />
        </Route>
      </Route>

      {/* ===================== PHARMACIST PRIVATE ROUTES ===================== */}
      <Route element={<PrivateRoute allowedRoles={["pharmacist"]} />}>
        <Route path="/pharmacy" element={<Layout />}>
          <Route index element={<PharmacyDashboard />} />
        </Route>
      </Route>

      {/* ===================== FALLBACK ROUTE ===================== */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
