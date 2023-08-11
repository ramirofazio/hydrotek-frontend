import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";

export default function DefaultError() {
  const error = useRouteError();
  console.error(error);

  return (
    <div
      id="error-page"
      className="mt-[35vh] flex h-[30vh] flex-col items-center justify-evenly"
    >
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
