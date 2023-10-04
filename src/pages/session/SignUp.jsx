import { useState } from "react";
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
import { isValidSignUp } from "src/utils/validation";
import { Error } from "src/components";

const authBtns = [
  { socialNetwork: "GOOGLE", icon: "ri-google-fill ri-lg xl:mr-10" },
  { socialNetwork: "APPLE", icon: "ri-apple-fill ri-lg xl:mr-10" },
];

export function SignUp() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [errs, setErrs] = useState({});
  const [apiErr, setApiErr] = useState(null);
  const [user, setUser] = useState({
    email: "",
    dni: null,
    name: "",
    password: "",
    confirmPassword: "",
    roleId: "1",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setApiErr(null);
    setUser({
      ...user,
      [name]: value,
    });
    setErrs(
      isValidSignUp({
        ...user,
        [name]: value,
      })
    );
  };

  console.log(user);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const cleanUser = { ...user, roleId: parseInt(import.meta.env.VITE_USER_ROLE) };
      if (!cleanUser.dni || cleanUser.dni.length < 7) delete cleanUser.dni;
      APIHydro.signUp(cleanUser)
        .then((res) => {
          if (res.data) {
            const { accessToken } = res.data;
            saveInStorage("accessToken", accessToken);
            addAuthWithToken(accessToken);
            dispatch(actionsUser.saveSignData(res.data));
            navigate("/products");
          }
        })
        .catch((e) => {
          const error = e.response.data;
          setApiErr(error);
          setLoading(false);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (e) {
      console.log(e);
      const error = e.response.data.message;
      setApiErr(error);
      setLoading(false);
    }
  };

  return (
    <main className="lg:bg-signUpXl lg:bg-contain lg:bg-clip-content lg:bg-right lg:bg-no-repeat lg:pb-28 lg:pt-10">
      <img className="ml-auto lg:hidden" src={backgrounds.signUpBgTop} alt="" />
      {loading && <Loader />}
      <div className="sm:w-[70%] md:w-[85%] mx-5 grid  place-items-center gap-6 sm:mx-auto">
        <section className="lg:w-[90%] xl:w-[90%]  relative w-full pt-1">
          <div className="absolute z-0 flex w-full justify-between p-0">
            <img
              className="w-[50%] max-w-[150px] md:max-w-[200px] xl:max-w-[300px] animate-pulse"
              src={borders.profile}
            />
            <img
              className="w-[50%] max-w-[150px] md:max-w-[200px] xl:max-w-[300px] animate-pulse"
              src={borders.signUpCircuit}
            />
          </div>
          <h1 className="mb-10 mt-10 text-center lg:text-3xl xl:mt-14 xl:text-4xl">
            {t("session.signUp")} <h1 className="textGoldGradient lg:text-3xl">HYDROTEK</h1>
          </h1>
          <form
            className=" grid place-items-center gap-6 px-6 md:grid-cols-2 lg:mx-auto  lg:gap-8 xl:w-full xs:px-10"
            onSubmit={handleSubmit}
          >
            <div className="w-full">
              <Input
                id="email"
                type="email"
                className={`relative !z-10  ${errs.email && "border-red-500 focus:border-red-500/50"}`}
                name="email"
                onChange={handleOnChange}
                placeholder="*EMAIL"
                value={user.email}
              />
              {errs.email && <Error text={errs.email} />}
            </div>
            <div className=" w-full">
              <Input
                type="number"
                className={`relative !z-10 ${errs.dni && "border-red-500 focus:border-red-500/50"}`}
                name="dni"
                onChange={handleOnChange}
                placeholder="DNI"
                value={user.dni}
              />
              {errs.dni && <Error text={errs.dni} />}
            </div>
            <div className="w-full">
              <PasswordInput
                name="password"
                onChange={handleOnChange}
                placeholder="*CONTRASEÑA"
                value={user.password}
                className={`relative ${errs.password && "border-red-500 focus:border-red-500/50"}`}
              />
              {errs.password && <Error text={errs.password} />}
            </div>
            <div className="w-full">
              <PasswordInput
                name="confirmPassword"
                onChange={handleOnChange}
                placeholder="*CONFIRMAR CONTRASEÑA"
                value={user.confirmPassword}
                className={`relative ${errs.confirmPassword && "border-red-500 focus:border-red-500/50"}`}
              />
              {errs.confirmPassword && <Error text={errs.confirmPassword} />}
            </div>
            <div className="w-full md:col-span-2">
              <Input
                type="text"
                name="name"
                onChange={handleOnChange}
                placeholder="*NOMBRE COMPLETO"
                value={user.name}
                className={`relative capitalize  ${errs.name && "border-red-500 focus:border-red-500/50"}`}
              />
              {errs.name && <Error text={errs.name} />}
            </div>
            {apiErr && <Error className="!static col-span-2 !pl-0 !text-lg" text={apiErr.message} />}
            <Button
              text={t("session.signUpSubmitBtn")}
              className={`lg:w-[40%] !bg-gold hover:!bg-base md:col-span-2  `}
              pClassname={"xl:text-lg font-primary"}
              onClick={handleSubmit}
              disabled={
                Object.values(errs).length ||
                apiErr ||
                !user.email ||
                !user.password ||
                !user.confirmPassword ||
                !user.name
                  ? true
                  : false
              }
            />
          </form>
        </section>
        <section className=" lg:w-[90%] flex w-full  justify-around">
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
        <section className="lg:w-[90%] relative mx-4 my-2 grid w-full gap-6 px-6 text-center lg:my-6 lg:gap-2">
          <p className="z-10 !text-white lg:text-base">
            {t("session.haveAccount")}
            <br className="lg:hidden" />
            <strong
              onClick={() => navigate("/session/signIn")}
              className="hover:cursor-pointer hover:opacity-50 lg:ml-2"
            >
              {t("session.logIn")}
            </strong>
          </p>
          <div className="absolute -top-10 flex  w-full justify-between">
            <img
              className="w-[50%] max-w-[150px] md:max-w-[200px] xl:max-w-[300px] rotate-180 animate-pulse"
              src={borders.signUpCircuit}
            />
            <img
              className="w-[50%] max-w-[150px] md:max-w-[200px] xl:max-w-[300px] rotate-180 animate-pulse"
              src={borders.profile}
            />
          </div>
        </section>
      </div>
      <img className="mr-auto mt-16  lg:invisible lg:mt-8" src={backgrounds.signUpBgBot} alt="" />
    </main>
  );
}
