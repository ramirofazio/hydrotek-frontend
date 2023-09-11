import { Button, Auth3Button } from "components/buttons";
import { Input } from "components/inputs";
import { backgrounds } from "src/assets";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const authBtns = [
  { socialNetwork: "GOOGLE", icon: "ri-google-fill ri-md lg:mr-10" },
  { socialNetwork: "APPLE", icon: "ri-apple-fill ri-md lg:mr-10" },
];

export function SignUp() {
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
    <main className="mx-4 mb-14 grid place-items-center gap-6 py-10 sm:mx-auto sm:w-[60%] md:my-[7rem] xl:w-[40%] xl:py-20">
      <section className="xl:w-[90%] ">
        <h1 className="-mt-20 mb-14 text-center lg:-mt-32 lg:text-3xl xl:mt-14 xl:text-4xl">{t("session.signUp")}</h1>
        <form
          className="grid place-items-center gap-4 px-6 lg:mx-auto lg:w-[80%] xl:w-full xl:gap-6"
          onSubmit={handleSubmit}
        >
          <Input type="text" name="email" onChange={handleOnChange} placeholder="*EMAIL" value={user.email} />
          <Input type="number" name="dni" onChange={handleOnChange} placeholder="DNI" value={user.dni} />
          <Input
            type="password"
            name="contraseña"
            onChange={handleOnChange}
            placeholder="*CONTRASEÑA"
            value={user.contraseña}
          />
          <Input
            type="password"
            name="password"
            onChange={handleOnChange}
            placeholder="*CONFIRMA TU CONTRASEÑA"
            value={user.password}
          />
          <Input
            type="text"
            name="nombreCompleto"
            onChange={handleOnChange}
            placeholder="*NOMBRE COMPLETO"
            value={user.nombreCompleto}
          />
          <Button
            text={t("session.signUpSubmitBtn")}
            className={"!bg-gold hover:!bg-base lg:w-[60%]"}
            pClassname={"xl:text-xl font-primary"}
            onClick={handleSubmit}
          />
        </form>
      </section>
      <section className="flex w-full justify-around p-6 lg:w-[80%] lg:flex-col lg:gap-4 xl:w-[60%] xl:gap-6 ">
        {authBtns.map(({ socialNetwork, icon }, index) => (
          <Auth3Button
            key={index}
            icon={icon}
            text={`INICIAR SESIÓN CON ${socialNetwork}`}
            classname={"!bg-gold lg:flex lg:items-center lg:pl-10 lg:!bg-base lg:py-3 group"}
            pClassname={"hidden lg:inline group-hover:text-gold transition font-primary"}
            onClick={() => handleSocialClick(socialNetwork)}
          />
        ))}
      </section>
      <section className="my-2 grid w-full gap-6 px-6 text-center lg:my-6 lg:w-[80%] lg:gap-2 ">
        <p>
          {t("session.haveAccount")}
          <br className="lg:hidden" />
          <strong onClick={() => navigate("/signIn")} className="hover:cursor-pointer hover:opacity-50 lg:ml-2">
            {t("session.logIn")}
          </strong>
        </p>
      </section>
    </main>
  );
}
