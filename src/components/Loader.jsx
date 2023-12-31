import { useEffect } from "react";

export function Loader({ className }) {
  useEffect(() => {
    //? Saca scroll mientras se monta
    document.body.classList.add("pointer-events-none");
    return () => {
      document.body.classList.remove("pointer-events-none");
    };
  }, []);

  return (
    <main className="absolute top-0 flex h-screen w-screen items-center justify-center">
      <main
        className={`grid aspect-square  h-20 place-content-center place-items-center rounded-md bg-black/70 lg:h-40 ${className}`}
      >
        <i className="ri-loader-2-fill animate-spin text-6xl text-gold" />
      </main>
    </main>
  );
}
