import { Outlet, useLoaderData } from "react-router-dom";
import { Navbar } from "src/components";
import { useSelector, useDispatch } from "react-redux";
import { actionsUser, actionsShoppingCart } from "src/redux/reducers";

export function ProtectedRoute() {
  const dispatch = useDispatch();
  const userInfo = useLoaderData();
  const { user } = useSelector((state) => state);

  /* useEffect(() => {
    console.log(userInfo)
    if (userInfo?.userInfo && !user.session.role) {
      console.log("entro para guardar")
      console.log(userInfo?.userInfo.accessToken)
      if (userInfo.shoppingCart && userInfo.shoppingCart.totalPrice) {
        dispatch(actionsShoppingCart.saveSingInShoppingCart(userInfo.shoppingCart));
      }
      dispatch(actionsUser.saveSignData(userInfo.userInfo));
    }
  }, [user]); */
  {
    /* <>
    <DefaultError />
  </> */
  }

  if (!user.session.role && userInfo?.userInfo) {
    console.log("en el if");
    console.log(userInfo);
    dispatch(actionsUser.saveSignData(userInfo.userInfo));
    /* if(userInfo.userInfo.shoppingCart?.totalPrice) {
      dispatch(actionsShoppingCart.saveSingInShoppingCart(userInfo.userInfo.shoppingCart))
    } */
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
