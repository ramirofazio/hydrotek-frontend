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
      <section className="grid grid-cols-1  place-items-center gap-10 p-8">
        <img src={textLogo} className="col-span-1 w-full " />
        <div className="flex w-full justify-around">
          <div className="goldGradient flex h-12 w-12 items-center justify-center rounded-full">
            <img src={facebook} className=" h-4 w-auto" />
          </div>
          <div className="goldGradient flex h-12 w-12 items-center justify-center rounded-full">
            <img src={instagram} className=" h-4 w-auto" />
          </div>
          <div className="goldGradient flex h-12 w-12 items-center justify-center rounded-full">
            <img src={whatsapp} className=" h-4 w-auto" />
          </div>
          <div className="goldGradient flex h-12 w-12 items-center justify-center rounded-full">
            <img src={mail} className=" h-4 w-auto" />
          </div>
        </div>
        <div className="col-span-1 row-span-2 my-6">
          <h1 className="textGoldGradient text-sm">¿QUIÉNES SOMOS?</h1>
          <p className="py-4 text-xs font-[200] leading-5 tracking-widest">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sodales ex mattis tellus mollis, eu vehicula
            tortor sollicitudin. consectetur adipiscing elit. Nunc sodales ex mattis tellus mollis, eu vehicula tortor
            sollicitudin.
          </p>
          <h1 className="textGoldGradient text-sm underline decoration-gold transition hover:cursor-pointer  hover:opacity-[0.5]">
            LEER MÁS
          </h1>
        </div>
        <div className="col-span-1 row-span-2 my-8 flex h-full w-full flex-col justify-around">
          <h1 className="textGoldGradient mb-4">ENLACES</h1>
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
        <img src={arrowUp} className="goldGradient  row-start-1 h-12 rounded-full " />
      </section>

      {/*
    //! No se que esta pasando que se me pone el fondo por arriba
<div className="!z-30 w-full bg-gold py-2 text-center font-secondary text-xs">
        © Copyright 2023 HydroTek - <br /> Todos los Derechos Reservados
      </div> */}
    </footer>
  );
}
