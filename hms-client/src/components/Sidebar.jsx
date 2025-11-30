import { LayoutDashboard, Users, Stethoscope, Calendar, Pill, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/" },
  { name: "Patients", icon: Users, path: "/patients" },
  { name: "Doctors", icon: Stethoscope, path: "/doctors" },
  { name: "Appointments", icon: Calendar, path: "/appointments" },
  { name: "Inventory", icon: Pill, path: "/inventory" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#0A2342] text-white flex flex-col p-5">
      <h1 className="text-2xl font-bold mb-10 tracking-wide">HMS Admin</h1>

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

      <button className="mt-auto flex items-center gap-3 p-3 bg-red-500 hover:bg-red-600 rounded-md transition">
        <LogOut size={20} /> Logout
      </button>
    </aside>
  );
}
