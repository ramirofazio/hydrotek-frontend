import React from "react";
import arrowUp from "../assets/arrowUp.png";
import textLogo from "../assets/textLogo.png";
import facebook from "../assets/facebook.png";
import instagram from "../assets/instagram.png";
import whatsapp from "../assets/whatsapp.png";
import mail from "../assets/mail.png";

export default function Footer() {
  return (
    <footer className="flex w-full flex-col border-t-2 border-gold ">
      <section className="flex h-52 justify-between px-20">
        <section className="footerSections">
          <>
            <img src={textLogo} className="my-4 w-64" />
          </>
          <div className="flex">
            <div className="footerNetworksIcons">
              <img src={facebook} className="h-4" />
            </div>
            <div className="footerNetworksIcons">
              <img src={instagram} className="h-4" />
            </div>
            <div className="footerNetworksIcons">
              <img src={whatsapp} className="h-4" />
            </div>
            <div className="footerNetworksIcons">
              <img src={mail} className="h-3" />
            </div>
          </div>
        </section>
        <section className="footerSections">
          <h1 className="textGoldGradient">¿QUIÉNES SOMOS?</h1>
          <p className="w-72  py-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sodales ex mattis tellus mollis, eu vehicula
            tortor sollicitudin.
          </p>
          <h1 className="textGoldGradient underline decoration-gold hover:animate-pulse hover:cursor-pointer">
            LEER MÁS
          </h1>
        </section>
        <section className="footerSections">
          <h1 className="textGoldGradient">ENLACES</h1>
          <div className="py-2">
            <p className="flex items-center pb-2 decoration-gold transition hover:cursor-pointer hover:underline">
              <div className="mr-2 h-1 w-1 rounded-full bg-gold"></div>Mi cuenta / Registrarme
            </p>
            <p className="flex items-center pb-2 decoration-gold transition hover:cursor-pointer hover:underline">
              <div className="mr-2 h-1 w-1 rounded-full bg-gold"></div>Editar info de mi cuenta
            </p>
            <p className="flex items-center pb-2 decoration-gold transition hover:cursor-pointer hover:underline">
              <div className="mr-2 h-1 w-1 rounded-full bg-gold"></div>Cambiar mi contraseña
            </p>
            <p className="flex items-center pb-2 decoration-gold transition hover:cursor-pointer hover:underline">
              <div className="mr-2 h-1 w-1 rounded-full bg-gold"></div>Historial de pedidos
            </p>
            <p className="flex items-center pb-2 decoration-gold transition hover:cursor-pointer hover:underline">
              <div className="mr-2 h-1 w-1 rounded-full bg-gold"></div>Seguimiento de envios
            </p>
          </div>
        </section>
        <section className="footerSections">
          <div className="footerNetworksIcons hover:anim  ate-pulse h-12 w-12 hover:cursor-pointer">
            <img src={arrowUp} className="h-8" />
          </div>
        </section>
      </section>
      <section className="goldGradient flex h-10  w-full items-center justify-center">
        <h1 className="font-secondary text-xs">© Copyright 2023 HydroTek - Todos los Derechos Reservados</h1>
      </section>
    </footer>
  );
}
