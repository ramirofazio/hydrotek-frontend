
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="flex h-[30vh] mt-[35vh] flex-col items-center justify-evenly">
      <h1>Error</h1>
      <p>{error.statusText || error.message}</p>
      <p>
        Volver al {" "}
        <a href="/" className="text-primary underline">
          inicio.
        </a>
      </p>
      <p>-GID ;)</p>
    </div>
  );
};

export default ErrorPage;
