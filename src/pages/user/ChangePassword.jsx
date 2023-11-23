import { Dialog } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { APIHydro } from "src/api";
import { logos } from "src/assets";
import { Error, Loader } from "src/components";
import { Button } from "src/components/buttons";
import { PasswordInput } from "src/components/inputs";
import { error, success } from "src/components/notifications";
import { actionsUser } from "src/redux/reducers";
import { isValidChangePassword } from "src/utils/validation";

const resetFields = [
  { name: "newPassword", label: "contraseña nueva" },
  { name: "newConfirmPassword", label: "confirma tu contraseña" },
];

const updateFields = [
  { name: "actualPassword", label: "contraseña actual" },
  { name: "newPassword", label: "contraseña nueva" },
  { name: "newConfirmPassword", label: "confirma tu contraseña" },
];

export function ChangePassword({ close, userId, reset, token, email }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errs, setErrs] = useState({ actualPassword: "", newPassword: "", newConfirmPassword: "" });
  const [apiErr, setApiErr] = useState(null);
  const [data, setData] = useState({
    id: userId,
    token: token,
    email: email,
    actualPassword: "",
    newPassword: "",
    newConfirmPassword: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });

    setErrs(
      isValidChangePassword({
        ...data,
        [name]: value,
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!reset) {
        APIHydro.updatePassword(data)
          .then((res) => {
            if (res.data) {
              dispatch(actionsUser.updateDataFromProfile(res.data));
              success("CONTRASEÑA ACTUALIZADA");
              setLoading(false);
              close();
            }
          })
          .catch((e) => {
            error();
            setLoading(false);
            close();
            console.log(e);
          });
      } else {
        APIHydro.resetPassword(data)
          .then((res) => {
            if (res.status === 201) {
              success("CONTRASEÑA ACTUALIZADA");
              setLoading(false);
              close();
            }
          })
          .catch((e) => {
            error();
            setLoading(false);
            close();
            console.log(e);
          });
      }
    } catch (e) {
      const error = e.response.data;
      error("Ups, intentalo de nuevo");
      setApiErr(error);
      setLoading(false);
    }
  };

  return (
    <main className="my-4 grid grid-cols-1 place-content-center gap-6 text-center">
      {loading && <Loader />}
      <img src={logos.hydBlack} className="mx-auto w-20" />
      <Dialog.Title className="textGoldGradient">{reset ? "Actualiza" : "Cambia"} tu Contraseña</Dialog.Title>
      <form onSubmit={handleSubmit} className="grid gap-6">
        {(reset ? resetFields : updateFields).map(({ name, label }, index) => (
          <Fragment key={index}>
            <PasswordInput
              name={name}
              onChange={handleOnChange}
              value={data[name]}
              placeholder={label}
              className={`relative ${errs[name] && "border-red-500 focus:border-red-500/50"}`}
            />
            {errs[name] && <Error text={errs[name]} />}
          </Fragment>
        ))}

        {apiErr && <Error text={apiErr.message} />}
        <Button
          text={"Guardar"}
          onClick={handleSubmit}
          className={"mx-20"}
          disabled={(!data.actualPassword && !reset) || !data.newPassword || !data.newConfirmPassword ? true : false}
        />
      </form>
    </main>
  );
}
