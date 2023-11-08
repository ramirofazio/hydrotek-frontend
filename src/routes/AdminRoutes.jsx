import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { actionsUser } from "src/redux/reducers";
import { useEffect } from "react";

//! ACA HACER LOGICA PARA MOSTRAR EL DASHBOARD SOLO AL ADMIN

export function AdminRoutes() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useLoaderData();
  const { user } = useSelector((state) => state);

  useEffect(() => {
    if (!userInfo.userInfo?.accessToken) navigate("/session/signIn");
  }, []);

  if (!user.session.role && userInfo?.userInfo) {
    dispatch(actionsUser.saveSignData(userInfo.userInfo));
  }

  return (
    <>
      <Outlet />
    </>
  );
}
