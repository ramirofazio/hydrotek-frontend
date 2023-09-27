import { useState, useEffect } from "react";
import { Button, Auth3Button } from "components/buttons";
import { Input, PasswordInput } from "components/inputs";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Loader } from "src/components/Loader";
import { APIHydro, addAuthWithToken } from "src/api";
import { useDispatch } from "react-redux";
import { actionsUser } from "src/redux/reducers";
import { saveInStorage } from "src/utils/localStorage";
import { borders, backgrounds } from "assets";

const authBtns = [
  { socialNetwork: "GOOGLE", icon: "ri-google-fill ri-lg xl:mr-10" },
  { socialNetwork: "APPLE", icon: "ri-apple-fill ri-lg xl:mr-10" },
];

export function SignUp() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [canRegister, setCanRegister] = useState(false);
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

  useEffect(() => {
    if (user.email && user.name && user.password && user.confirmPassword) {
      setCanRegister(true);
    } else {
      setCanRegister(false);
    }
  }, [user]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      APIHydro.signUp(user)
        .then((res) => {
          if (res.data) {
            const { accessToken } = res.data;
            saveInStorage("accessToken", accessToken);
            addAuthWithToken(accessToken);
            dispatch(actionsUser.saveSignData(res.data));
            navigate("/products");
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  return (
    <main className="lg:bg-signUpXl  lg:bg-contain lg:bg-no-repeat lg:bg-right lg:pb-28 lg:pt-10">
      <img className="ml-auto lg:hidden" src={backgrounds.signUpBgTop} alt="" />
      {loading && <Loader />}
      <div className="mx-5 grid place-items-center gap-6  sm:mx-auto sm:w-[70%] md:w-[85%]">
        <section className="relative w-full  pt-1 xl:w-[90%] lg:w-[90%]">
          <div className="absolute z-0 flex w-full justify-between p-0">
            <img className="w-[50%] max-w-[150px] md:max-w-[200px] xl:max-w-[300px] animate-pulse" src={borders.profile} />
            <img className="w-[50%] max-w-[150px] md:max-w-[200px] xl:max-w-[300px] animate-pulse" src={borders.signUpCircuit} />
          </div>
          <h1 className="mb-10 mt-10 text-center lg:text-3xl xl:mt-14 xl:text-4xl">
            {t("session.signUp")} <h1 className="lg:text-3xl textGoldGradient">HYDROTEK</h1>
          </h1>
          <form
            className="grid place-items-center gap-4 px-6 md:grid-cols-2 lg:mx-auto  xl:w-full xl:gap-6 xs:px-10"
            onSubmit={handleSubmit}
          >
            <Input type="email" className="!z-10" name="email" onChange={handleOnChange} placeholder="*EMAIL" value={user.email} />
            <Input type="number" className="!z-10" name="dni" onChange={handleOnChange} placeholder="DNI" value={user.dni} />
            <PasswordInput name="password" onChange={handleOnChange} placeholder="*CONTRASEÑA" value={user.password} />
            <PasswordInput
              name="confirmPassword"
              onChange={handleOnChange}
              placeholder="*CONFIRMAR CONTRASEÑA"
              value={user.confirmPassword}
              className={`${passwordError && "border-red-500 focus:border-red-500/50"}`}
            />
            <Input
              type="text"
              name="name"
              onChange={handleOnChange}
              placeholder="*NOMBRE COMPLETO"
              value={user.name}
              className={"capitalize md:col-span-2"}
            />
            {passwordError && (
              <p className="text-xs text-red-500 md:col-span-2 md:text-sm">{t("session.passwordDontMatch")}</p>
            )}
            <Button
              text={t("session.signUpSubmitBtn")}
              className={`!bg-gold hover:!bg-base md:col-span-2 lg:w-[40%] ${
                !canRegister && "pointer-events-none opacity-30"
              }`}
              pClassname={"xl:text-lg font-primary"}
              onClick={handleSubmit}
            />
          </form>
        </section>
        <section className=" flex w-full justify-around  lg:w-[90%]">
          {authBtns.map(({ socialNetwork, icon }, index) => (
            <Auth3Button
              key={index}
              icon={icon}
              socialNetwork={socialNetwork}
              text={`INICIAR SESIÓN CON ${socialNetwork}`}
              classname={" !bg-gold lg:flex lg:items-center lg:pl-10 lg:!bg-base lg:py-3 group"}
              pClassname={"hidden lg:inline group-hover:text-gold transition font-primary"}
              setLoading={setLoading}
            />
          ))}
        </section>
        <section className="relative mx-4 my-2 grid w-full gap-6 px-6 text-center lg:my-6 lg:w-[90%] lg:gap-2">
          <p className="z-10 lg:text-base !text-white">
            {t("session.haveAccount")}
            <br className="lg:hidden" />
            <strong onClick={() => navigate("/user/signIn")} className="hover:cursor-pointer hover:opacity-50 lg:ml-2">
              {t("session.logIn")}
            </strong>
          </p>
          <div className="-top-10 absolute flex  w-full justify-between">
            <img className="w-[50%] max-w-[150px] md:max-w-[200px] xl:max-w-[300px] rotate-180 animate-pulse" src={borders.signUpCircuit} />
            <img className="w-[50%] max-w-[150px] md:max-w-[200px] xl:max-w-[300px] rotate-180 animate-pulse" src={borders.profile} />
          </div>
        </section>
      </div>
      <img className="mr-auto mt-16  lg:mt-8 lg:invisible" src={backgrounds.signUpBgBot} alt="" />
    </main>
  );
}
