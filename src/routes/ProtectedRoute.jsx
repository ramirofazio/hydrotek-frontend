import { Outlet } from "react-router-dom";
import { Navbar } from "src/components";
import { useSelector } from "react-redux";
import DefaultError from "src/pages/error/Default";
import { useEffect } from "react";

export function ProtectedRoute() {
  const { session } = useSelector((state) => state.user);

  useEffect(() => {
    console.log(session);
  }, []);

  if (session.role) {
    return <DefaultError />;
  }
  return (
    <>
      <Navbar />
      <h1>ESTA PERMITIDOOO</h1>
      <Outlet />
    </>
  );
}

/*
! Hay un error aca, cuando se refresca dentro de una ruta protegica rompe por una cuestion de asincronia con el TOKEN JWT. Ver solucion!
*/
