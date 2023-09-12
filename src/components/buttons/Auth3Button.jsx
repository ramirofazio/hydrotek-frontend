import { useGoogleLogin } from "@react-oauth/google";
import { APIHydro } from "src/api";
import axios from "axios";

export const Auth3Button = ({ text, icon, classname, pClassname, socialNetwork, ...props }) => {
  const googleLogin = useGoogleLogin({
    // flow: "auth-code",
    // ux_mode: "redirect",
    // redirect_uri: "http://localhost:5173", // ? redirect version, a definir que nos conviene

    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      // * Nos dan un token que nos da permiso a la info del usuario mediante la gapi
      const userInfo = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
      }).then(res => res.data);
      console.log(userInfo);
    },
    onError: (errorResponse) => console.log(errorResponse),
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
      onClick={provider}
      className={`rounded-full border-2 border-gold bg-transparent px-6 py-2 uppercase tracking-widest text-white transition hover:bg-gold hover:text-[#1B142C] ${classname}`}
      {...props}
    >
      <i className={icon}></i>
      <p className={`font-primary ${pClassname}`}>{text}</p>
    </button>
  );
};
