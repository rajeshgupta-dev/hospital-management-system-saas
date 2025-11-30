import { LayoutDashboard, Users, Calendar, Pill } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutButton from "../../auth/LogoutButton";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/doctor" },
  { name: "Patients", icon: Users, path: "/doctor/patients" },
  { name: "Appointments", icon: Calendar, path: "/doctor/appointments" },
  { name: "Prescriptions", icon: Pill, path: "/doctor/prescriptions" },
];

export default function DoctorSidebar() {
  const { user } = useSelector((state) => state.auth);

  return (
    <aside className="w-64 bg-[#0A2342] text-white flex flex-col p-5 min-h-screen">
      <h1 className="text-2xl font-bold mb-10 tracking-wide">HMS Doctor</h1>

      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-md transition 
              ${isActive ? "bg-blue-500" : "hover:bg-blue-500/40"}`
            }
          >
            <item.icon size={20} /> {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto">
        <LogoutButton />
      </div>
    </aside>
  );
}
