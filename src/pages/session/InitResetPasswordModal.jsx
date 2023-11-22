import { useState } from "react";
import { APIHydro } from "src/api";
import { Button } from "src/components/buttons";
import { Input } from "src/components/inputs";
import { error, success } from "src/components/notifications";



export function InitResetPasswordModal({ close }) {
  const [email, setEmail] = useState(null);
  const [loader, setLoader] = useState(false);
  const [thisError, setThisError] = useState(null);
  const handleInitResetSubmit = (e) => {
    setLoader(true);
    e.preventDefault();
    if (email) {
      try {
        const res = APIHydro.initResetPassword(email);
        if (res) {
          setLoader(false);
          close();
          success(`Hemos enviado un mail a ${email}`);
        }
      } catch (e) {
        setLoader(false);
        close();
        console.log(e);
        error("Ocurrio un error. Por favor, intantalo de nuevo");
      }
    } else {
      setLoader(false);
      setThisError(true);
      error("Email invalido");
    }
  };

  return (
    <main className="grid gap-6  text-center">
      <h1>¿Olvidaste tu contraseña?</h1>
      <p>¡Dejanos tu mail y lo solucionamos!</p>
      <form onSubmit={handleInitResetSubmit} className="grid place-items-center gap-4">
        <Input
          placeholder={"Email"}
          name={"email"}
          onChange={(e) => setEmail(e.target.value)}
          className={`${thisError && "border-red-500"}`}
        />
        <Button
          text={!loader && "Enviar"}
          onClick={handleInitResetSubmit}
          pClassname={loader && "ri-loader-2-line animate-spin text-lg"}
        />
      </form>
    </main>
  );
}
