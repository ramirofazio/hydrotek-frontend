import loginBorder from "assets/loginBorder.png";
import blackLogo from "assets/blackLogo.png";
import facebook from "assets/facebook.png";
import apple from "assets/apple.png";
import google from "assets/google.png";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Button } from "src/components/buttons";

export function SignIn({ isOpen, alternModal }) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={alternModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-90" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative grid w-[30%] place-items-center">
                <img src={loginBorder} className="w-full" />
                <div className="absolute inset-1 grid place-items-center gap-4 p-10">
                  <img src={blackLogo} className="w-20" />
                  <form>
                    <input type="text" onChange={"#"} placeholder="EMAIL/NOMBRE DE USUARIO" />
                    <input type="password" onChange={"#"} placeholder="CONTRASEÑA" />
                    <Button text={"INGRESAR"} />
                  </form>
                  <div className="w-full rounded-full  border-[1px] border-dashed border-white/60" />
                  <Button
                    img={[google, "icons mr-6"]}
                    text={`INICIA SESIÓN CON GOOGLE`}
                    classname={"w-[80%] flex items-center text-sm"}
                  />
                  <Button
                    img={[apple, "icons mr-6"]}
                    text={`INICIA SESIÓN CON APPLE`}
                    classname={"w-[80%] flex items-center text-sm"}
                  />
                  <Button
                    img={[facebook, "icons mr-6"]}
                    text={`INICIA SESIÓN CON FACEBOOK`}
                    classname={"w-[80%] flex items-center text-sm"}
                  />
                  <p>
                    ¿NO TIENES UNA CUENTA? <strong>REGISTRATE AHORA</strong>
                  </p>
                  <p>
                    ¿OLVIDASTE TU CONTRASEÑA? <strong>RECUPERA TU CONTRASEÑA</strong>
                  </p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
