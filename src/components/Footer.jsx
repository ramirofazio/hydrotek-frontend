import React from "react";
import arrowUp from "../assets/arrowUp.png";
import textLogo from "../assets/textLogo.png";
import facebook from "../assets/facebook.png";
import instagram from "../assets/instagram.png";
import whatsapp from "../assets/whatsapp.png";
import mail from "../assets/mail.png";

export default function Footer() {
  return (
    <footer className="h-full w-full border-t-8 border-gold">
      <section className="grid grid-cols-1 place-items-center gap-10 p-8 xl:grid-cols-3 xl:grid-rows-1 xl:gap-12">
        <div className="grid h-32 place-items-center sm:h-44 xl:place-items-start xl:pl-12">
          <img src={textLogo} className="col-span-1 w-full md:w-[70%] " />
          <div className="flex w-full justify-around md:w-[50%]">
            <div className="goldGradient flex h-12 w-12 items-center justify-center rounded-full">
              <img src={facebook} className="h-4 w-auto" />
            </div>
            <div className="goldGradient flex h-12 w-12 items-center justify-center rounded-full">
              <img src={instagram} className="h-4 w-auto" />
            </div>
            <div className="goldGradient flex h-12 w-12 items-center justify-center rounded-full">
              <img src={whatsapp} className="h-4 w-auto" />
            </div>
            <div className="goldGradient flex h-12 w-12 items-center justify-center rounded-full">
              <img src={mail} className="h-4 w-auto" />
            </div>
          </div>
        </div>
        <div className="col-span-1 row-span-2 my-6  xl:row-span-1 xl:h-full">
          <h1 className="textGoldGradient text-sm md:text-xl">¿QUIÉNES SOMOS?</h1>
          <p className="py-4 text-xs font-[200]  leading-5 tracking-widest md:w-[50%]  md:text-sm xl:w-full">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sodales ex mattis tellus mollis, eu vehicula
            tortor sollicitudin. consectetur adipiscing elit. Nunc sodales ex mattis tellus mollis, eu vehicula tortor
            sollicitudin.
          </p>
          <h1 className="textGoldGradient text-sm underline decoration-gold transition hover:cursor-pointer hover:opacity-[0.5]  md:text-xl">
            LEER MÁS
          </h1>
        </div>
        <div className="col-span-1 row-span-2 my-8 flex h-full w-full flex-col justify-around  xl:row-span-1 xl:justify-start">
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
          className="goldGradient row-start-1  h-12 rounded-full p-3 xl:absolute xl:right-20 xl:row-start-auto "
        />
      </section>

      {/* //!No se que pasa aca con el fondo que queda por arriba */}
      <div className="w-full bg-gold py-2 text-center font-secondary text-xs text-white ">
        © Copyright 2023 HydroTek - <br className="md:hidden" /> Todos los Derechos Reservados
      </div>
    </footer>
  );
}
