//Falta incorporar la logica del setPage, se necesita un estado (react/redux) al que cambiar
import { useNavigate, useLocation } from "react-router-dom";

export const Pagination = ({ nButtons, path }) => {
  const quantity = Array(nButtons).fill(1);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = parseInt(location.pathname.substring(path.length));

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => navigate(`${path}${currentPage - 1}`)}
        className="hidden rounded-xl p-2 text-white transition  hover:bg-gold hover:text-base disabled:text-opacity-30 disabled:hover:bg-opacity-5 lg:inline"
        disabled={currentPage === 0}
      >
        <i className="ri-arrow-left-fill text-2xl" />
      </button>
      <div className="flex items-center gap-1.5 sm:gap-2 text-sm">
        {quantity.map((n, index) => (
          <button
            onClick={() => navigate(`${path}${index}`)}
            key={index}
            className={`goldGradient  grid h-10 w-10 place-content-center rounded-full p-1 md:p-2.5 text-sm sm:text-lg text-white transition-all ${
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
