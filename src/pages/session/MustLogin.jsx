import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "src/components/buttons";

export function MustLogin({ action = "Para comentar" }) {
  const { t } = useTranslation();
  return (
    <>
      <h1>{t("common.sorry")}</h1>
      <h2 className="my-1">{`${action} ${t("common.must-login")}`}</h2>
      <section className="flex flex-col sm:flex-row lg:gap-8 w-fit mx-auto mt-4 gap-4 ">
        <Link to="/session/signIn">
          <Button text={t("session.logIn")} />
        </Link>
        <Link to="/session/signUp">
          <Button className="w-full" text={t("session.register")} />
        </Link>
      </section>
    </>
  );
}
