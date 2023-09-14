import { useEffect } from "react";
//import { logos } from "assets/index";

export function Loader({ className }) {
  useEffect(() => {
    //? Saca scroll mientras se monta
    document.body.classList.add("pointer-events-none", "overflow-hidden");
    return () => {
      document.body.classList.remove("pointer-events-none", "overflow-hidden");
    };
  }, []);

  return (
    <main
      className={`absolute z-50 grid aspect-square  h-20 place-content-center place-items-center rounded-md bg-black/70 lg:h-40 ${className}`}
    >
      {/* <img src={logos.hydBlack} className="animate-pulse" />  //?OTRA OPCION */}
      <i className="ri-loader-2-fill animate-spin text-6xl text-gold" />
    </main>
  );
}
