import { setToken } from "src/redux/reducers/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IconButtonWithBgGold } from "src/components/buttons";

export function Header({ t }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(setToken("logOut"));
    navigate("/");
  };

  return (
    <section className="my-2 flex items-center justify-between px-6 lg:col-span-2">
      <h1 className="text-2xl">{t("profile.my-account")}</h1>
      <IconButtonWithBgGold icon={"ri-logout-box-r-line"} onClick={() => handleLogOut()} />
    </section>
  );
}
