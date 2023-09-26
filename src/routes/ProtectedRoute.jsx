import Root from "src/pages/Root";
import DefaultError from "src/pages/error/Default";
import { useEffect } from "react";

export function ProtectedRoute({ token }) {
  useEffect(() => {}, [token]);

  if (!token) {
    return <DefaultError />;
  }

  return (
    <>
      <Root />
    </>
  );
}

/*
! Hay un error aca, cuando se refresca dentro de una ruta protegica rompe por una cuestion de asincronia con el TOKEN JWT. Ver solucion!
*/
