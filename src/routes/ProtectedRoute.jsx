import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "src/provider/authProvider";

export function ProtectedRoute() {
  const { token } = useAuth();

  if (token === "null") {
    return <Navigate to="/signIn" />;
  }

  return <Outlet />;
}
