import { Outlet, useLocation, useLoaderData, useNavigate } from "react-router-dom";
import { useEffect } from "react";


export function NotAuthRoute() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const token = useLoaderData();

  useEffect(() => {
    if (token.accessToken) navigate(-1);
  }, []);

  return (
    <div className={` ${pathname === "/session/signUp" && "bg-[#141414]"}`}>
      <Outlet />
    </div>
  );
}
