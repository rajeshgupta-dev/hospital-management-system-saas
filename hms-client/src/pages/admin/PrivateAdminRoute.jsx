import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateAdminRoute() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) return <Navigate to="/" replace />;

  if (!user?.roles.includes("tenant-admin")) return <Navigate to="/" replace />;

  return <Outlet />;
}
