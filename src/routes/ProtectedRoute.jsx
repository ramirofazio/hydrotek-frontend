import { Outlet } from "react-router-dom";
import { Navbar } from "src/components";
import Root from "src/pages/Root";
import DefaultError from "src/pages/error/Default";

export function ProtectedRoute({ token }) {
  if (!token) {
    return <DefaultError />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

/*
! Hay un error aca, cuando se refresca dentro de una ruta protegica rompe por una cuestion de asincronia con el TOKEN JWT. Ver solucion!
*/