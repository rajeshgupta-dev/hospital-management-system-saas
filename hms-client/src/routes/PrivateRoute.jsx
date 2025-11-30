import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute({ allowedRoles = [] }) {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) return <Navigate to="/" replace />;

  if (!allowedRoles.includes(user?.roles?.[0])) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
