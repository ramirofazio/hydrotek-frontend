import { Outlet, useLocation, useLoaderData, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { actionsUser, actionsShoppingCart } from "src/redux/reducers";
import DefaultError from "src/pages/error/Default";
import { getOfStorage } from "src/utils/localStorage";

export function NotAuthRoute() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const token = useLoaderData();
  //const { session } = useSelector((state) => state.user);

  useEffect(() => {
    if (token.accessToken) navigate(-1);
  }, []);

  /* if (!session.role && userInfo?.userInfo) {
    return (
      <>
        <DefaultError />
      </>
    );
  } */

  return (
    <div className={` ${pathname === "/session/signUp" && "bg-[#141414]"}`}>
      <Outlet />
    </div>
  );
}
