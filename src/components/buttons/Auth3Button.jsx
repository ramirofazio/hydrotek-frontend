import { useGoogleLogin } from "@react-oauth/google";
import { APIHydro } from "src/api";
import { actionsUser, actionsShoppingCart } from "src/redux/reducers";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { saveInStorage } from "src/utils/localStorage";
import { WorkInProgressModal } from "../modals";

export const Auth3Button = ({ text, icon, classname, pClassname, setLoading, ...props }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

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
        ? "https://hydrotek.store/session/signIn"
        : import.meta.VITE_ENV === "staging"
        ? "http://85.31.231.196:51732/session/signIn"
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
      className={`aspect-square rounded-full border-2 border-gold bg-transparent p-4 uppercase tracking-widest text-white transition hover:bg-gold hover:text-gold  ${classname}`}
      {...props}
    >
      <i className={icon}></i>
      <p className={`font-primary ${pClassname}`}>{text}</p>
      <WorkInProgressModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </button>
  );
};
