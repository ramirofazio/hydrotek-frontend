import { useEffect, useState } from "react";
import { Loader, Error, Modal } from "src/components";
import { Button, Auth3Button } from "components/buttons";
import { Input, PasswordInput } from "components/inputs";
import { backgrounds, logos } from "src/assets";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { APIHydro, addAuthWithToken } from "src/api";
import { actionsShoppingCart, actionsUser } from "src/redux/reducers";
import { useDispatch } from "react-redux";
import { saveInStorage, getOfStorage } from "src/utils/localStorage";
import { InitResetPasswordModal } from "./InitResetPasswordModal";
const authBtns = [{ socialNetwork: "GOOGLE", icon: "ri-google-fill ri-xl lg:mr-10" }];

export function SignIn() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [canRegister, setCanRegister] = useState(false);
  const [err, setErr] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user.email && user.password) {
      setCanRegister(true);
    } else {
      setCanRegister(false);
    }
  }, [user]);

  const handleOnChange = (e) => {
    setErr(false);
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await APIHydro.signIn(user);
      if (res.data) {
        console.log(res.data);
        const { data } = res;
        const { accessToken } = data;
        saveInStorage("accessToken", accessToken);
        addAuthWithToken(accessToken);
        dispatch(actionsUser.saveSignData(data));
        if (data.shoppingCart?.totalPrice <= 0) {
          const storageCart = getOfStorage("shoppingCart");
          if (storageCart?.totalPrice > 0) {
            const arr = Object.values(storageCart.products);
            const s = await APIHydro.updateShoppingCart({
              userId: data.session.id,
              shoppingCart: { totalPrice: storageCart.totalPrice, products: arr },
            });
            console.log(s);
          } else {
            dispatch(actionsShoppingCart.saveSingInShoppingCart(data.shoppingCart));
          }
        }
        setLoading(false);
        navigate(`/user/profile/${data.session.id}`);
      }
    } catch (e) {
      const res = e.response.data.message;
      setErr(res);
      setLoading(false);
      console.log(e);
    }
  };

  return (
    <main className="relative grid h-full py-10 sm:px-10 md:px-20 lg:place-content-center">
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <InitResetPasswordModal close={() => setIsModalOpen(false)} />
      </Modal>
      <img src={backgrounds.techDots2} className="absolute bottom-0 left-0 hidden w-80 animate-pulse lg:inline" />
      <img
        src={backgrounds.signUpBgXl2}
        className="absolute inset-x-0 bottom-0 left-0 mx-auto w-80 animate-pulse lg:hidden"
      />
      {loading && <Loader />}
      <div className="relative z-20 m-10 grid place-items-center gap-4 bg-contain bg-center bg-no-repeat py-20 lg:bg-signIn lg:px-40">
        <img src={backgrounds.borderTop} className="absolute top-0 lg:hidden" />
        <img
          src={logos.hydText}
          className="z-20 mx-auto w-28 transition hover:cursor-pointer hover:opacity-50"
          onClick={() => navigate("/")}
        />
        <img src={logos.hydBlack} className="z-20 mx-auto w-24" />
        <section className="z-20 w-full sm:px-20 sm:py-4 lg:px-0">
          <form className="grid place-items-center  gap-4  px-6 lg:mx-auto xl:w-full xl:gap-6" onSubmit={handleSubmit}>
            <Input
              type="email"
              name="email"
              onChange={handleOnChange}
              placeholder="*EMAIL/NOMBRE DE USUARIO"
              value={user.email}
              className={"!bg-[#141414] lg:!bg-base"}
            />
            <PasswordInput
              name="password"
              onChange={handleOnChange}
              placeholder="*CONTRASEÑA"
              value={user.password}
              className={"!bg-[#141414] lg:!bg-base"}
            />
            {err && <Error text={err} />}
            <Button
              disabled={err && true}
              text={"INGRESAR"}
              className={`!bg-gold hover:!bg-base disabled:pointer-events-none disabled:opacity-30 lg:w-[60%] ${
                !canRegister && "pointer-events-none opacity-30"
              }`}
              pClassname={"xl:text-xl font-primary"}
              onClick={handleSubmit}
            />
          </form>
        </section>
        <div className="w-[80%] border-[1px] border-dashed border-white/40" />
        <section className="flex w-full justify-around p-6 lg:flex-col lg:items-center lg:gap-4 xl:gap-6">
          {authBtns.map(({ socialNetwork, icon }, index) => (
            <Auth3Button
              key={index}
              icon={icon}
              text={`INICIAR SESIÓN CON ${socialNetwork}`}
              classname={"!bg-gold lg:flex lg:items-center lg:pl-10 lg:!bg-base lg:aspect-auto lg:py-3 group"}
              pClassname={"hidden lg:inline group-hover:text-gold transition font-primary "}
              setLoading={setLoading}
            />
          ))}
        </section>
        <section className="z-20 my-2 grid w-full gap-6 px-6 text-center lg:my-6 lg:gap-2">
          <p>
            {t("session.dontHaveAccount")}
            <br className="lg:hidden" />
            <strong
              onClick={() => navigate("/session/signUp")}
              className="hover:cursor-pointer hover:opacity-50 lg:ml-2"
            >
              {t("session.registerNow")}
            </strong>
          </p>
          <p>
            {t("session.forgotPass")}
            <br className="lg:hidden" />
            <strong onClick={() => setIsModalOpen(true)} className="hover:cursor-pointer hover:opacity-50 lg:ml-2">
              {t("session.recoverPassNow")}
            </strong>
          </p>
        </section>
        <img src={backgrounds.borderBottom} className="absolute bottom-0 lg:hidden" />
      </div>
      <img
        src={backgrounds.techDots2}
        className="absolute right-0 top-0 hidden w-80 rotate-180 animate-pulse lg:inline"
      />
      <img
        src={backgrounds.signUpBgXl2}
        className="absolute inset-x-0 top-0 mx-auto  w-80 rotate-180 animate-pulse lg:hidden"
      />
    </main>
  );
}
