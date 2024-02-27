import { useGoogleLogin } from "@react-oauth/google";
import { APIHydro } from "src/api";
import { actionsUser, actionsShoppingCart } from "src/redux/reducers";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { saveInStorage } from "src/utils/localStorage";
import { WorkInProgressModal } from "../modals";
import { logos } from "src/assets";

export const GoogleBtn = ({ classname, pClassname, setLoading, ...props }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [redirect, setRedirect] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get("code");

  useEffect(() => {
    redirect ? navigate("/products/0") : null;
    if (code?.length && !redirect) {
      setLoading(true);
      APIHydro.googleAuthCode(code).then((res) => {
        saveInStorage("accessToken", res.data.accessToken);
        dispatch(actionsUser.saveSignData(res.data));
        dispatch(actionsShoppingCart.saveSingInShoppingCart(res.data.shoppingCart));
        setLoading(false);
        setRedirect(true);
      });
    }
  }, [redirect]);

  const googleLogin = useGoogleLogin({
    /* eslint-disable */
    flow: "auth-code",
    ux_mode: "redirect",
    redirect_uri:
      import.meta.VITE_ENV === "production"
        ? "https://hydrotek.store/session/singIn"
        : "http://localhost:5173/session/signIn",
    /* eslint-enable */

    // ? Para autotizacion flow=implicit & ux_mode=popup, usar onSuccess & onError
    /* onSuccess: async (tokenResponse) => {
      // * Nos dan un token que nos da permiso a la info del usuario mediante la gapi
      try {
        setLoading(true);
        //navigate("/", { replace: true });
        console.log(tokenResponse);
        const userInfo = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });

        const { email, name, picture } = userInfo.data;
        APIHydro.googleSignIn({
          email,
          name,
          picture,
        })
          .then((res) => {
            dispatch(actionsAuth.setToken(res.data.accessToken));
            dispatch(actionsUser.saveSignData(res.data));
          })
          .finally(() => {
            setLoading(false);
          });
      } catch (err) {
        console.log(err);
      }
    }, */
    /* onError: (errorResponse) => {
      setLoading(false);
      console.log(errorResponse);
    }, */
  });

  return (
    <button
      onClick={() => googleLogin()}
      className={`aspect-square rounded-full border-2 border-gold bg-transparent p-1 uppercase tracking-widest text-white transition hover:bg-gold hover:text-gold xl:p-4  ${classname}`}
      {...props}
    >
      <img loading="lazy" src={logos.google} className="h-10 w-10 xl:mr-10 xl:h-6 xl:w-6"></img>
      <p className={`font-primary ${pClassname}`}>INICIAR SESIÓN CON GOOGLE</p>
    </button>
  );
};
