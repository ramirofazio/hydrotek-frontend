import PropTypes from 'prop-types';
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

//Falta incorporar la logica del setPage, se necesita un estado (react/redux) al que cambiar
export function Pagination({ nButtons, currentPage = 0, setPage }) {
  const quantity = Array(nButtons).fill(1);

  return (
    <div className="flex items-center gap-4 text-gray-700">
      <button
        onClick={() => setPage(currentPage - 1)}
        className="rounded p-2 hover:bg-gray-100 disabled:text-gray-400 disabled:hover:bg-transparent"
        disabled={currentPage === 0}
      >
        <ArrowLeftIcon className="h-5 w-5" />
      </button>
      <div className="flex items-center gap-2 text-sm">
        {quantity.map((n, index) => (
          <button
            onClick={() => setPage(index)}
            key={index}
            className={`grid  h-10 w-10 place-content-center rounded p-2.5 transition-all  ${
              currentPage === index
                ? "bg-primary font-medium text-white shadow shadow-primary/80 ease-in"
                : " bg-gray-100 ease-out hover:bg-gray-300"
            }`}
          >
            <span>{index + 1}</span>
          </button>
        ))}
      </div>
      <button
        onClick={() => setPage(currentPage + 1)}
        className="rounded p-2 hover:bg-gray-100 disabled:text-gray-400 disabled:hover:bg-transparent"
        disabled={currentPage === nButtons - 1}
      >
        <ArrowRightIcon className="h-5 w-5" />
      </button>
    </div>
  );
}

Pagination.propTypes = {
  nButtons: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};