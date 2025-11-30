import { LayoutDashboard, Users, Stethoscope, Calendar, Pill, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import { useEffect } from "react";

// Sidebar navigation items
const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { name: "Patients", icon: Users, path: "/admin/patients" },
  { name: "Doctors", icon: Stethoscope, path: "/admin/patients" },
  { name: "Appointments", icon: Calendar, path: "/admin/appointments" },
  { name: "Inventory", icon: Pill, path: "/admin/inventory" },
];

export default function AdminSidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // Security: redirect if not admin
  useEffect(() => {
    if (!isAuthenticated || !user?.roles.includes("tenant-admin")) {
      navigate("/admin-login", { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const handleLogout = () => {
    const confirm = window.confirm("Do you really want to logout?");
    if (confirm) {
      dispatch(logout());
      navigate("/", { replace: true });
    }
  };

  return (
    <aside className="w-64 bg-[#0A2342] text-white flex flex-col p-5 min-h-screen">
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

      <button
        onClick={handleLogout}
        className="mt-auto flex items-center gap-3 p-3 bg-red-500 hover:bg-red-600 rounded-md transition"
      >
        <LogOut size={20} /> Logout
      </button>
    </aside>
  );
}
