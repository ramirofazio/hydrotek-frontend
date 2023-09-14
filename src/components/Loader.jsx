import { useEffect } from "react";
import { logos } from "assets/index";
export function Loader({ className }) {
  useEffect(() => {
    //? Saca scroll mientras se monta
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <main
      className={`absolute z-40 grid h-full w-full  place-content-center place-items-center bg-black/70 ${className}`}
    >
      {/* <img src={logos.hydBlack} className="animate-pulse" />  //?OTRA OPCION */}
      <i className="ri-loader-2-fill animate-spin text-6xl text-gold" />
    </main>
  );
}
