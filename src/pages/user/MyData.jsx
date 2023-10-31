import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, IconButtonWithBgGold } from "src/components/buttons";
import { Avatar } from "src/components/user";
import { useTranslation } from "react-i18next";
import { APIHydro } from "src/api";
import { Loader, Modal } from "src/components";
import { actionsUser } from "src/redux/reducers";
import { ChangePassword } from "./ChangePassword.jsx";
import axios from "axios";


export function MyData() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector((s) => s.user);
  const { name, dni, email, id: userId } = user.session;

  const [fields, setFields] = useState([
    { name: "name", label: "NOMBRE COMPLETO" },
    { name: "dni", label: "DNI", type: "number" },
    { name: "email", label: "CORREO ELECTRÓNICO", btn: false },
    { name: "pass", label: "CONTRASEÑA" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isUserChanged, setIsUserChanged] = useState(false);
  const [edit, setEdit] = useState("");
  const [userData, setUserData] = useState({
    avatar: user.profile.avatar,
    name: name,
    dni: dni ? dni : "", //? Convierto el null a "" para evitar warn en consola
    email: email,
    pass: "****************",
  });
  const [newImg, setNewImg] = useState(false);
  useEffect(() => {
    if (userData.dni !== "") {
      // Realiza la modificación en una copia del array 'fields'
      const modifiedFields = [...fields];
      const dniField = modifiedFields.find((field) => field.name === "dni");

      if (dniField) {
        dniField.btn = false; // Modifica el label de 'dniField'
      }

      // Actualiza el estado con la nueva copia del array
      setFields(modifiedFields);
    }
  }, []);

  const handleEdit = (name) => {
    if (name === edit) {
      setEdit("");
    } else if (name === "pass") {
      setIsModalOpen(true);
    } else {
      setEdit(name);
    }

    if (name === "avatar") {
      document.getElementById("fileInput").click(); //? Cliquea el input para que se guarde la imagen
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
    setIsUserChanged(true);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      let newAvatar = "";
      if (newImg) {
        const formdata = new FormData();
        formdata.append("file", newImg.image);
        formdata.append("userId", userId);

        const res = await axios.post(`http://localhost:3000/cloudinary/updateAvatar`, formdata, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        newAvatar = res.data;
      }

      const data = {
        session: { name: userData.name, email: userData.email, id: userId /*, dni: userData.dni*/ },
        profile: { avatar: newAvatar ? newAvatar : userData.avatar },
      };

      APIHydro.updateUser(data).then((res) => {
        if (res.data) {
          dispatch(actionsUser.updateDataFromProfile(res.data));
          setLoading(false);
        }
      });
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {

    const { target } = e;

    const file = target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      setNewImg({
        name: file.name,
        image: typeof reader.result === "string" ? reader.result : "",
        file: file,
      });
      setIsUserChanged(true);
    };
    reader.readAsDataURL(file);
  };

  return (
    <main className="mx-8 grid text-center sm:w-full sm:px-6  lg:h-screen xl:w-full xl:pr-6">
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ChangePassword close={() => setIsModalOpen(!isModalOpen)} userId={userId} />
      </Modal>
      {loading && <Loader />}
      <section className="grid place-items-center border-b-2 border-gold py-10  lg:place-items-start lg:border-none lg:p-0">
        <h1 className=" lg:my-2 lg:w-full lg:!border-b-2 lg:border-gold lg:text-start">{t("profile.my-avatar")}</h1>
        <p>{t("profile.edit-avatar")}</p>
        <div className="my-6 flex w-full items-center justify-center gap-3 lg:justify-start lg:gap-6">
          <Avatar
            avatarWidth={"w-24 sm:w-40 lg:w-24 aspect-square"}
            avatar={newImg ? newImg.image : user.profile.avatar}
          />
          <p className="hidden tracking-normal lg:inline">{t("profile.avatar-resolution")}</p>
          <IconButtonWithBgGold icon={"ri-pencil-line"} onClick={() => handleEdit("avatar")} />
          <input id="fileInput" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
        </div>
        <p className="lg:hidden">{t("profile.avatar-resolution")}</p>
      </section>
      <section className="grid place-items-center py-6 lg:place-items-start lg:border-t-0 lg:py-0">
        <h1 className="lg:my-2 lg:w-full lg:!border-b-2 lg:border-gold lg:text-start">{t("profile.register-form")}</h1>
        <p>{t("profile.edit-register-form")}</p>
        <div className="mt-10 grid w-full gap-10 lg:gap-0">
          {fields.map(({ name, label, type, btn = true }, index) => (
            <div className="flex items-center justify-between" key={index}>
              <div className="flex flex-col items-start gap-2 lg:my-4 lg:gap-0">
                <label className="textGoldGradient">{label}:</label>
                <input
                  name={name}
                  type={type || "text"}
                  value={userData[name]}
                  placeholder={label}
                  onChange={handleOnChange}
                  className={`${
                    edit === name && "pointer-events-auto rounded-md border-2 border-gold pl-2"
                  } pointer-events-none bg-base p-2 pl-0 text-left text-sm tracking-widest text-white`}
                />
                {!btn && <p>*{t("profile.cannot-edit")}*</p>}
              </div>
              {btn && (
                <IconButtonWithBgGold icon={"ri-pencil-line"} onClick={() => handleEdit(name)} className={"!p-6"} />
              )}
            </div>
          ))}

          <Button
            text={t("common.saveChanges")}
            pClassname={"p-3"}
            onClick={() => handleSave()}
            className={`${
              isUserChanged ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-50"
            } transition lg:mx-auto lg:mb-4`}
          />
        </div>
      </section>
    </main>
  );
}
