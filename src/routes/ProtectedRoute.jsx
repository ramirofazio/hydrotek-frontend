import { Outlet } from "react-router-dom";
import DefaultError from "src/pages/error/Default";
import { useAuth } from "src/provider/authProvider";

export function ProtectedRoute() {
  const { token } = useAuth();

  if (token === "null") {
    return <DefaultError />;
  }

  return <Outlet />;
}
