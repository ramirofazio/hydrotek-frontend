import { useState } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { APIHydro } from "src/api";
import { Loader } from "src/components";
import { Button } from "src/components/buttons";
import { Input } from "src/components/inputs";
import { error, success } from "src/components/notifications";

export function ForgotPassword({ modal = false, closeModal }) {
  const [searchParams] = useSearchParams();

  const [email, setEmail] = useState(null);
  const [loader, setLoader] = useState(false);
  const [thisError, setError] = useState(null);

  const token = searchParams.get("token");
  const queryEmail = searchParams.get("email");

  const handleSubmit = (e) => {
    setLoader(true);
    e.preventDefault();
    if (email) {
      try {
        const res = APIHydro.initResetPassword(email);
        if (res) {
          setLoader(false);
          closeModal();
          success(`Hemos enviado un mail a ${email}`);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      setLoader(false);
      setError(true);
      error("Email invalido");
    }
  };

  return (
    <main>
      {modal && (
        <main className="grid gap-6  text-center">
          <h1>¿Olvidaste tu contraseña?</h1>
          <p>¡Dejanos tu mail y lo solucionamos!</p>
          <form onSubmit={handleSubmit} className="grid place-items-center gap-4">
            <Input
              placeholder={"Email"}
              name={"email"}
              onChange={(e) => setEmail(e.target.value)}
              className={`${thisError && "border-red-500"}`}
            />
            <Button
              text={!loader && "Enviar"}
              onClick={handleSubmit}
              pClassname={loader && "ri-loader-2-line animate-spin text-lg"}
            />
          </form>
        </main>
      )}

      {!modal && (
        <>
          <h1>CAMBIA TU CONTRASEÑA</h1>
        </>
      )}
    </main>
  );
}
