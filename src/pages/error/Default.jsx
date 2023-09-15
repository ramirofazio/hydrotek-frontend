import { useRouteError, Link } from "react-router-dom";
import { logos } from "src/assets";
import Atropos from "atropos/react";

export default function DefaultError({ type }) {
  console.log(useRouteError());

  return (
    <div
      id="error-page"
      className="mx-auto grid h-screen place-content-center place-items-center gap-6 p-4 text-center outline"
    >
      <h1 className="textGoldGradient border-b-[1px] border-gold lg:text-3xl">Not Found (aka 404)</h1>
      <p className="lg:text-sm">
        {`Estás buscando algo que no ${
          type
            ? "tienes permisos, tal vez nunca los tengas o no debas tenerlos ..."
            : "existe, no ha existido, no existirá, tal vez no exista o no deba existir ..."
        }`}
      </p>
      <p className="lg:text-sm">
        {type ? "... pero siempre eres bienvenido/a a" : "... pero siempre eres bienvenido/a a volver al"}
        <Link to={type ? "/signIn" : "/"} className="textGoldGradient icons ml-2 border-b-[1px] border-gold">
          {type ? "tenerlos." : "Home."}
        </Link>
      </p>
      <Atropos innerClassName="rounded-full" shadow={false}>
        <Link to="/">
          <img src={logos.hydBlack} className="w-20 hover:cursor-pointer lg:w-32" />
        </Link>
      </Atropos>
    </div>
  );
}
