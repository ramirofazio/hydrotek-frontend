import { useState, useEffect } from "react";
import { Button, Auth3Button } from "components/buttons";
import { Input, PasswordInput } from "components/inputs";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const authBtns = [
  { socialNetwork: "GOOGLE", icon: "ri-google-fill ri-md xl:mr-10" },
  { socialNetwork: "APPLE", icon: "ri-apple-fill ri-md xl:mr-10" },
];

export function SignUp() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState(false);
  const [user, setUser] = useState({
    email: "",
    dni: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user.password !== user.confirmPassword) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  }, [user.confirmPassword]);

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
    <main className="mx-4 mb-14 grid  place-items-center gap-6 py-4 sm:mx-auto sm:w-[70%]">
      <section className="w-full xl:w-[90%]">
        <h1 className="mb-14 text-center lg:text-3xl xl:mt-14 xl:text-4xl">{t("session.signUp")}</h1>
        <form
          className="grid place-items-center gap-4 md:grid-cols-2 lg:mx-auto lg:w-[80%] xl:w-full xl:gap-6"
          onSubmit={handleSubmit}
        >
          <Input type="email" name="email" onChange={handleOnChange} placeholder="*EMAIL" value={user.email} />
          <Input type="number" name="dni" onChange={handleOnChange} placeholder="DNI" value={user.dni} />
          <PasswordInput name="password" onChange={handleOnChange} placeholder="*CONTRASEÑA" value={user.password} />
          <PasswordInput
            name="confirmPassword"
            onChange={handleOnChange}
            placeholder="*CONFIRMA TU CONTRASEÑA"
            value={user.confirmPassword}
            className={`${passwordError && "border-red-500 focus:border-red-500/50"}`}
          />
          <Input
            type="text"
            name="name"
            onChange={handleOnChange}
            placeholder="*NOMBRE COMPLETO"
            value={user.name}
            className={"md:col-span-2"}
          />
          {passwordError && (
            <p className="text-xs text-red-500 md:col-span-2 md:text-sm">{t("session.passwordDontMatch")}</p>
          )}
          <Button
            text={t("session.signUpSubmitBtn")}
            className={"!bg-gold hover:!bg-base md:col-span-2 lg:w-[40%]"}
            pClassname={"xl:text-lg font-primary"}
            onClick={handleSubmit}
          />
        </form>
      </section>
      <section className="flex w-full justify-around lg:w-[90%]">
        {/* {authBtns.map(({ socialNetwork, icon }, index) => (
          <Auth3Button
            key={index}
            icon={icon}
            text={`INICIAR SESIÓN CON ${socialNetwork}`}
            classname={"!bg-gold xl:flex xl:items-center xl:pl-10 xl:!bg-base xl:py-3 group"}
            pClassname={"hidden xl:inline group-hover:text-gold transition font-primary"}
            onClick={() => handleSocialClick(socialNetwork)}
          />
        ))} */}
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
