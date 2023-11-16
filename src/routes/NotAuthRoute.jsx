import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function NotAuthRoute() {
  const navigate = useNavigate();
  const { accessToken } = useLoaderData();

  useEffect(() => {
    if (accessToken) navigate(-1);
  }, []);

  return (
    <div className={"w-full bg-[#141414]"}>
      <Outlet />
    </div>
  );
}
