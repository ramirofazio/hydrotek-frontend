import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "src/provider/authProvider";

export function ProtectedRoute() {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
