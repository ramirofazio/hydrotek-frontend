import { Dialog } from "@headlessui/react";
import { Fragment, useState } from "react";
import { APIHydro } from "src/api";
import { logos } from "src/assets";
import { Error, Loader } from "src/components";
import { Button } from "src/components/buttons";
import { PasswordInput } from "src/components/inputs";
import { isValidChangePassword } from "src/utils/validation";

const fields = [
  { name: "actualPassword", label: "contraseña actual" },
  { name: "newPassword", label: "contraseña nueva" },
  { name: "newConfirmPassword", label: "confirma tu contraseña" },
];

export function ChangePassword({ close, userId }) {
  const [loading, setLoading] = useState(false);
  const [errs, setErrs] = useState({});
  const [apiErr, setApiErr] = useState(null);
  const [data, setData] = useState({
    id: userId,
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

    // setErrs(
    //   isValidChangePassword({
    //     ...data,
    //     [name]: value,
    //   })
    // );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      APIHydro.updatePassword(data)
        .then((res) => {
          if (res.data) {
            dispatch(actionsUser.updateDataFromProfile(res.data));
            console.log(res.data);
          }
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
          close();
        })
        .finally(() => {
          setLoading(false);
          close();
        });
    } catch (e) {
      console.log(e);
      setLoading(false);
      close();
    }
  };

  return (
    <main className="my-4 grid grid-cols-1 place-content-center gap-6 text-center">
      {loading && <Loader />}
      <img src={logos.hydBlack} className="mx-auto w-20" />
      <Dialog.Title className="textGoldGradient">Cambia tu Contraseña</Dialog.Title>
      <form onSubmit={handleSubmit} className="grid gap-6">
        {fields.map(({ name, label }, index) => (
          <Fragment key={index}>
            <PasswordInput
              name={name}
              onChange={handleOnChange}
              value={data[name]}
              placeholder={label}
              className={`relative ${errs[name] && "border-red-500 focus:border-red-500/50"}`}
            />
            {errs && <Error text={errs[name]} />}
          </Fragment>
        ))}
        <Button text={"Guardar"} onClick={handleSubmit} className={"mx-20"} />
      </form>
    </main>
  );
}
