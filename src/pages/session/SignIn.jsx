import { Button } from "src/components/buttons";
import { backgrounds, icons } from "src/assets";

export function SignIn() {
  return (
    <div className="grid h-screen w-full place-items-center gap-4 p-4  xl:w-[30%]">
      <form>
        <input type="text" onChange={"#"} placeholder="EMAIL/NOMBRE DE USUARIO" />
        <input type="password" onChange={"#"} placeholder="CONTRASEÑA" />
        <Button text={"INGRESAR"} classname={"text-xs"} />
      </form>
      <div className="w-full rounded-full border-[1px] border-dashed border-white/60" />
      <div className="grid place-items-center">
        <Button
          img={[icons.google, "icons mr-6 "]}
          text={`INICIA SESIÓN CON GOOGLE`}
          classname={"w-[100%] py-0 flex  items-center text-[10px]"}
        />
        <Button
          img={[icons.apple, "icons mr-6 "]}
          text={`INICIA SESIÓN CON APPLE`}
          classname={"w-[100%] py-0 flex  items-center text-[10px]"}
        />
        <Button
          img={[icons.facebook, "icons mr-6 "]}
          text={`INICIA SESIÓN CON FACEBOOK`}
          classname={"w-[100%] py-0 flex  items-center text-[10px]"}
        />
      </div>
      <p>
        ¿NO TIENES UNA CUENTA? <strong>REGISTRATE AHORA</strong>
      </p>
      <p>
        ¿OLVIDASTE TU CONTRASEÑA? <strong>RECUPERA TU CONTRASEÑA</strong>
      </p>
    </div>
  );
}
