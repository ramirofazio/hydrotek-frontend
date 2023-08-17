import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

//Falta incorporar la logica del setPage, se necesita un estado (react/redux) al que cambiar
export function Pagination({ nButtons, currentPage = 0, setPage }) {
  const quantity = Array(nButtons).fill(1);

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => setPage(currentPage - 1)}
        className="hidden lg:inline rounded-xl p-2 text-white hover:bg-white hover:text-base disabled:text-opacity-30 disabled:hover:bg-opacity-5"
        disabled={currentPage === 0}
      >
        <ArrowLeftIcon className="h-5 w-5" />
      </button>
      <div className="flex items-center gap-2 text-sm">
        {quantity.map((n, index) => (
          <button
            onClick={() => setPage(index)}
            key={index}
            className={`grid  h-10 w-10 place-content-center rounded-full p-2.5 goldGradient text-white text-lg transition-all ${
              currentPage === index
                ? "font-medium  shadow shadow-primary/80 ease-in"
                : " opacity-40 ease-out hover:opacity-60"
            }`}
          >
            <span>{index + 1}</span>
          </button>
        ))}
      </div>
      <button
        onClick={() => setPage(currentPage + 1)}
        className="hidden lg:inline rounded-xl p-2 text-white hover:bg-white hover:text-base disabled:text-opacity-30 disabled:hover:bg-opacity-5"
        disabled={currentPage === nButtons - 1}
      >
        <ArrowRightIcon className="h-5 w-5" />
      </button>
    </div>
  );
}
