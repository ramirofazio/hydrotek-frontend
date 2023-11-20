import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { Navbar } from "src/components";
import { useSelector, useDispatch } from "react-redux";
import { actionsUser } from "src/redux/reducers";
import { useEffect } from "react";

export function ProtectedRoute() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useLoaderData();
  const { session } = useSelector((state) => state.user);

  useEffect(() => {
    if (!userInfo.accessToken) navigate("/session/signIn");
  }, []);

  if (!session.role && userInfo) {
    dispatch(actionsUser.saveSignData(userInfo));
    return (
      <>
        <Navbar />
        <Outlet />
      </>
    );
  }
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
