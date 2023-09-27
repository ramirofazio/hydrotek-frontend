import { Outlet, useLoaderData } from "react-router-dom";
import { Navbar } from "src/components";
import { useSelector, useDispatch } from "react-redux";
import DefaultError from "src/pages/error/Default";
import { useEffect } from "react";
import { actionsUser } from "src/redux/reducers";

export function ProtectedRoute() {
  const dispatch = useDispatch();
  const userInfo = useLoaderData();
  const { session } = useSelector((state) => state.user);

  useEffect(() => {
    if (userInfo?.userInfo && !session.role) {
      dispatch(actionsUser.saveSignData(userInfo.userInfo));
    }
  }, [session]);

  if (!session.role && userInfo?.userInfo) {
    return (
      <>
        <DefaultError />
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
