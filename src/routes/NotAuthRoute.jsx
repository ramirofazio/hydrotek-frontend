import { Outlet, useLocation } from "react-router-dom";

export function NotAuthRoute() {
  const { pathname } = useLocation();
  console.log(pathname);

  return (
    <div className={` ${pathname === "/session/signUp" && "bg-[#141414]"}`}>
      <Outlet />
    </div>
  );
}
