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

  const handleSubmit = (e) => {
    //? SUBMIT
    e.preventDefault();
  };

  return (
    <main className="relative mx-4 mb-10 grid place-items-center gap-6 py-10 sm:mx-auto sm:w-[60%] xl:w-[40%] xl:py-20">
      <img src={backgrounds.borderBgFlip} className="absolute -z-10 hidden w-full xl:inline" />
      <section className="xl:w-[90%]">
        <img src={backgrounds.borderTop} className="xl:hidden" />
        <h1 className="-mt-20 mb-14 text-center lg:-mt-32 lg:text-3xl xl:mb-20 xl:mt-14 xl:text-4xl">
          {t("common.logIn")}
        </h1>
        <form
          className="grid place-items-center gap-4 px-6 lg:mx-auto lg:w-[80%] xl:w-full xl:gap-6"
          onSubmit={handleSubmit}
        >
          <input type="text" onChange={handleOnChange} placeholder="EMAIL/NOMBRE DE USUARIO" value={user.username} />
          <input type="password" onChange={handleOnChange} placeholder="CONTRASEÑA" value={user.password} />
          <Button
            text={"INGRESAR"}
            classname={"!bg-gold lg:w-[60%] hover:!bg-base"}
            pClassname={"xl:text-xl"}
            onClick={handleSubmit}
          />
        </form>
      </section>
      <div className="w-[80%] border-[1px] border-dashed border-white/40" />
      <section className="flex w-full justify-around p-6 lg:w-[80%] lg:flex-col lg:gap-4 xl:w-[60%] xl:gap-6">
        {authBtns.map(({ socialNetwork, icon }, index) => (
          <Button
            key={index}
            img={[icon, "icons lg:mr-10"]}
            text={`INICIAR SESIÓN CON ${socialNetwork}`}
            classname={"!bg-gold lg:flex lg:items-center lg:pl-16 lg:!bg-base lg:py-3 group"}
            pClassname={"hidden lg:inline group-hover:text-gold transition"}
            onClick={() => handleSocialClick(socialNetwork)}
          />
        ))}
      </section>
      <section className="my-2 grid w-full gap-6 px-6 text-center lg:my-6 lg:w-[80%] lg:gap-2">
        <p>
          {t("common.dontHaveAccount")}
          <br className="lg:hidden" />
          <strong onClick={() => navigate("/signUp")} className="hover:cursor-pointer hover:opacity-50 lg:ml-2">
            {t("common.registerNow")}
          </strong>
        </p>
        <p>
          {t("common.forgotPass")}
          <br className="lg:hidden" />
          <strong onClick={() => navigate("#")} className="hover:cursor-pointer hover:opacity-50 lg:ml-2">
            {t("common.recoverPassNow")}
          </strong>
        </p>
      </section>
      <img src={backgrounds.borderBottom} className="absolute bottom-0 -z-10 xl:hidden" />
    </main>
  );
}
