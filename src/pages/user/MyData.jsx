import { useState } from "react";
import { useSelector } from "react-redux";
import { Button, IconButtonWithBgGold } from "src/components/buttons";
import { Avatar } from "src/components/user";
import { useTranslation } from "react-i18next";

const fields = [
  { name: "name", label: "NOMBRE" },
  { name: "dni", label: "DNI", type: "number" },
  { name: "email", label: "CORREO ELECTRÓNICO", btn: false },
  { name: "pass", label: "CONTRASEÑA", type: "password" },
];

export function MyData() {
  const { t } = useTranslation();
  const { avatar, name, dni, email, pass } = useSelector((s) => s.user.profile);

  const [isUserChanged, setIsUserChanged] = useState(false);
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState("");
  const [user, setUser] = useState({
    avatar: avatar,
    name: name,
    dni: dni,
    email: email,
    pass: pass,
  });

  const handleEdit = (name) => {
    if (name === edit) {
      setEdit("");
    } else {
      setEdit(name);
    }

    if (name === "avatar") {
      //*? Logica para actualizar el Avatar. Cloudinary? A ver!
      console.log("update Avatar");
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
    setIsUserChanged(true);
  };

  const handleSave = () => {
    console.log("handleSave");
    console.log("user ---->", user);
  };

  return (
    <main className="mx-4 grid gap-4 text-center">
      <section className="grid place-items-center border-y-2 border-gold py-10">
        <h1>{t("profile.my-avatar")}</h1>
        <p>{t("profile.edit-avatar")}</p>
        <div className="my-6 flex w-full items-center justify-evenly">
          <Avatar avatarWidth={"w-24"} avatar={user.avatar} />
          <IconButtonWithBgGold icon={"ri-edit-fill"} onClick={() => handleEdit("avatar")} />
        </div>
        <p>{t("profile.avatar-resolution")}</p>
      </section>
      <section className="grid place-items-center py-6">
        <h1>{t("profile.register-form")}</h1>
        <p>{t("profile.edit-register-form")}</p>
        <div className="mt-10 grid w-full gap-10">
          {fields.map(({ name, label, type, btn = true }, index) => (
            <div className="flex items-center justify-between" key={index}>
              <div className="flex flex-col items-start gap-2">
                <label className="textGoldGradient">{label}:</label>
                <input
                  name={name}
                  type={show ? "text" : type || "text"}
                  value={user[name]}
                  placeholder={label}
                  onChange={handleOnChange}
                  className={`${
                    edit === name && "pointer-events-auto rounded-md border-2 border-gold pl-2"
                  } pointer-events-none bg-base p-2 pl-0 text-left text-sm tracking-widest text-white`}
                />
                {!btn && <p>*{t("profile.cannot-edit")}*</p>}
                {name === "pass" && (
                  <p
                    className="text-white/50 transition hover:cursor-pointer hover:text-gold hover:underline"
                    onClick={() => setShow(!show)}
                  >
                    {t("profile.see-pass")} <i className="ri-eye-fill" />
                  </p>
                )}
              </div>
              {btn && (
                <IconButtonWithBgGold icon={"ri-edit-fill"} onClick={() => handleEdit(name)} className={"!p-6"} />
              )}
            </div>
          ))}

          <Button
            text={t("common.saveChanges")}
            pClassname={"p-3"}
            onClick={() => handleSave()}
            className={`${
              isUserChanged ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-50"
            } transition`}
          />
        </div>
      </section>
    </main>
  );
}
