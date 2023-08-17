import React from "react";
import arrowUp from "../assets/arrowUp.png";
import textLogo from "../assets/textLogo.png";
import facebook from "../assets/facebook.png";
import instagram from "../assets/instagram.png";
import whatsapp from "../assets/whatsapp.png";
import mail from "../assets/mail.png";

export const Footer = () => {
  return (
    <footer className="h-full w-full border-t-8 border-gold">
      <section className="grid grid-cols-1 place-items-center gap-10 p-8 lg:grid-cols-3 lg:grid-rows-1 lg:gap-12">
        <div className="grid h-32 place-items-center sm:h-44 lg:pl-2 ">
          <img src={textLogo} className="col-span-1 w-full max-w-[800px] s:w-[80%] md:w-[70%]   " />
          <div className="flex w-full justify-around md:w-[50%]  lg:w-[70%] lg:px-5 lg:gap-5">
            <div className="goldGradient flex h-12 w-12 lg:w-20  items-center justify-center rounded-full">
              <img src={facebook} className="w-4" />
            </div>
            <div className="goldGradient flex h-12 w-12 lg:w-20 items-center justify-center rounded-full">
              <img src={instagram} className=" w-6" />
            </div>
            <div className="goldGradient flex h-12 w-12 lg:w-20 items-center justify-center rounded-full">
              <img src={whatsapp} className="w-6 h-6" />
            </div>
            <div className="goldGradient flex h-12 w-12 lg:w-20 items-center justify-center rounded-full">
              <img src={mail} className="w-7" />
            </div>
          </div>
        </div>
        <div className="col-span-1 row-span-2 my-6  lg:row-span-1 lg:h-full">
          <h1 className="textGoldGradient text-sm md:text-xl">¿QUIÉNES SOMOS?</h1>
          <p className="py-4 text-xs font-[200]  leading-5 tracking-widest md:w-[50%]  md:text-sm lg:w-full">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sodales ex mattis tellus mollis, eu vehicula
            tortor sollicitudin. consectetur adipiscing elit. Nunc sodales ex mattis tellus mollis, eu vehicula tortor
            sollicitudin.
          </p>
          <h1 className="textGoldGradient text-sm underline decoration-gold transition hover:cursor-pointer hover:opacity-[0.5]  md:text-xl">
            LEER MÁS
          </h1>
        </div>
        <div className="col-span-1 row-span-2 my-8 flex h-full w-full flex-col justify-around  lg:row-span-1 lg:justify-start">
          <h1 className="textGoldGradient mb-4 text-sm md:text-xl">ENLACES</h1>
          <p className="flex items-center pb-2 decoration-gold transition hover:cursor-pointer hover:underline">
            Mi cuenta / Registrarme
          </p>
          <p className="flex items-center pb-2 decoration-gold transition hover:cursor-pointer hover:underline">
            Editar info de mi cuent
          </p>
          <p className="flex items-center pb-2 decoration-gold transition hover:cursor-pointer hover:underline">
            Cambiar mi contraseña
          </p>
          <p className="flex items-center pb-2 decoration-gold transition hover:cursor-pointer hover:underline">
            Historial de pedidos
          </p>
          <p className="flex items-center pb-2 decoration-gold transition hover:cursor-pointer hover:underline">
            Seguimiento de envios
          </p>
        </div>
        <img
          src={arrowUp}
          className="goldGradient row-start-1  h-12 rounded-full p-3 lg:absolute lg:right-20 lg:row-start-auto "
        />
      </section>

      <div className="w-full bg-gold py-2 text-center font-secondary text-xs text-white ">
        © Copyright 2023 HydroTek - <br className="md:hidden" /> Todos los Derechos Reservados
      </div>
    </footer>
  );
};
