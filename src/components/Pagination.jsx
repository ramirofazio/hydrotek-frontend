//Falta incorporar la logica del setPage, se necesita un estado (react/redux) al que cambiar
import { useNavigate, useLocation, useParams } from "react-router-dom";

export const Pagination = ({ nButtons, path }) => {
  const { pag } = useParams();

  const quantity = Array(nButtons).fill(1);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = parseInt(location.pathname.substring(path.length));

  // ? Si la persona filtro por categorias no se mostrara la paginación, toca crear un sistema de filtrado mas grande
  return (
    <div className={`flex items-center gap-4 ${pag.length > 4 && "hidden"}`}>
      <button
        onClick={() => navigate(`${path}${currentPage - 1}`)}
        className="hidden rounded-xl p-2 text-white transition  hover:bg-gold hover:text-base disabled:text-opacity-30 disabled:hover:bg-opacity-5 lg:inline"
        disabled={currentPage === 0}
      >
        <i className="ri-arrow-left-fill text-2xl" />
      </button>
      <div className="flex items-center gap-1.5 text-sm sm:gap-2">
        {quantity.map((n, index) => (
          <button
            onClick={() => navigate(`${path}${index}`)}
            key={index}
            className={`goldGradient  grid h-10 w-10 place-content-center rounded-full p-1 text-sm text-white transition-all sm:text-lg md:p-2.5 ${
              currentPage === index
                ? "shadow-primary/80  font-medium shadow ease-in"
                : " opacity-40 ease-out hover:opacity-60"
            }`}
          >
            <span>{index + 1}</span>
          </button>
        ))}
      </div>
      <button
        onClick={() => navigate(`${path}${currentPage + 1}`)}
        className="hidden rounded-xl p-2 text-white transition  hover:bg-gold hover:text-base disabled:text-opacity-30 disabled:hover:bg-opacity-5 lg:inline"
        disabled={currentPage === nButtons - 1}
      >
        <i className="ri-arrow-right-fill text-2xl" />
      </button>
    </div>
  );
};
