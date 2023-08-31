import { Button } from "src/components/buttons";
import { backgrounds, icons } from "src/assets";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const authBtns = [
  { socialNetwork: "GOOGLE", icon: icons.google },
  { socialNetwork: "APPLE", icon: icons.apple },
  { socialNetwork: "FACEBOOK", icon: icons.facebook },
];

export function SignIn() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleOnChange = (e) => {
    //? HANDLER ONCHANGE
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSocialClick = (socialNetwork) => {
    //? HANDLER DE AUTH 3
    console.log(socialNetwork);
  };

  return (
    <main className="relative mx-4 mb-10 grid place-items-center gap-6 py-10">
      <section>
        <img src={backgrounds.borderTop} className="" />
        <form className="grid place-items-center gap-4 px-6">
          <input type="text" onChange={handleOnChange} placeholder="EMAIL/NOMBRE DE USUARIO" value={user.username} />
          <input type="password" onChange={handleOnChange} placeholder="CONTRASEÑA" value={user.password} />
          <Button text={"INGRESAR"} classname={"!bg-gold"} />
        </form>
      </section>
      <div className="w-[80%] border-[1px] border-dashed border-white/40" />
      <section className="flex w-full justify-around p-6">
        {authBtns.map(({ socialNetwork, icon }, index) => (
          <Button
            key={index}
            img={[icon, "icons"]}
            text={`INICIA SESIÓN CON ${socialNetwork}`}
            classname={"!bg-gold"}
            pClassname={"hidden lg:inline"}
            onClick={() => handleSocialClick(socialNetwork)}
          />
        ))}
      </section>
      <section className="my-2 grid w-full gap-6 px-6 text-center">
        <p>
          {t("common.dontHaveAccount")}
          <br />
          <strong onClick={() => navigate("/signUp")} className="hover:cursor-pointer hover:opacity-50">
            {t("common.registerNow")}
          </strong>
        </p>
        <p>
          {t("common.forgotPass")} <br />{" "}
          <strong onClick={() => navigate("#")} className="hover:cursor-pointer hover:opacity-50">
            {t("common.recoverPassNow")}
          </strong>
        </p>
      </section>
      <img src={backgrounds.borderBottom} className="absolute bottom-0 -z-10" />
    </main>
  );
}
