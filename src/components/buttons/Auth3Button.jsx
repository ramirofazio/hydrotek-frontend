import { useGoogleLogin } from "@react-oauth/google";
import { APIHydro } from "src/api";
import { actionsUser, actionsAuth } from "src/redux/reducers";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Auth3Button = ({ text, icon, classname, pClassname, socialNetwork, setLoading, ...props }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    // flow: "auth-code",
    // ux_mode: "redirect",
    // redirect_uri: "http://localhost:5173", // ? redirect version, a definir que nos conviene

    onSuccess: async (tokenResponse) => {
      // * Nos dan un token que nos da permiso a la info del usuario mediante la gapi
      try {
        setLoading(true);
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
            navigate("/");
          });
      } catch (err) {
        console.log(err);
      }
    },
    onError: (errorResponse) => {
      setLoading(false);
      console.log(errorResponse);
    }, // ? Aca se puede manejar el err mediante alerta o setear un estado
  });

  const appleLogin = () => alert("soy aple");

  let provider = null;
  if (socialNetwork === "GOOGLE") {
    provider = googleLogin;
  }
  if (socialNetwork === "APPLE") {
    provider = appleLogin;
  }

  return (
    <button
      onClick={() => provider()}
      className={`rounded-full border-2 border-gold bg-transparent px-6 py-2 uppercase tracking-widest text-white transition hover:bg-gold hover:text-[#1B142C] ${classname}`}
      {...props}
    >
      <i className={icon}></i>
      <p className={`font-primary ${pClassname}`}>{text}</p>
    </button>
  );
};
