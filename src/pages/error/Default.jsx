import { useRouteError, Link } from "react-router-dom";


export default function DefaultError() {
  const error = useRouteError();


  return (
    <div id="error-page" className="mt-[35%] flex h-[30%] flex-col items-center justify-evenly">
      <h1 className="font-bold">Ooops!</h1>
      <p>{error.statusText || error.message}</p>
      <p>
        Volver al{" "}
        <Link to="/" className="text-primary underline">
          inicio.
        </Link>
      </p>
      <p>-GID ;)</p>
    </div>
  );
}
