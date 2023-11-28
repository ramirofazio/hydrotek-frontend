import React, { useState, useEffect, useRef } from "react";

export const Aurora = () => {
  const auroraRef = useRef(null);
  const [isAuroraOn, setIsAuroraOn] = useState(true);

  useEffect(() => {
    const aurora = auroraRef.current;

    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const auroraSize = 150;
      const auroraX = clientX - auroraSize / 2;
      const auroraY = clientY - auroraSize / 2;

      aurora.style.left = `${auroraX}px`;
      aurora.style.top = `${auroraY + window.scrollY}px`; // Ajustar la posición en función del desplazamiento
    };

    const handleScroll = () => {
      setIsAuroraOn(false); // Apagar aurora al hacer scroll
    };

    const handleContextMenu = (e) => {
      e.preventDefault();
      setIsAuroraOn(!isAuroraOn); // Cambia el estado para encender o apagar la aurora
    };

    document.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [isAuroraOn]);

  return (
    <>
      <div
        className={`aurora absolute -z-20 transition-opacity duration-500 ${isAuroraOn ? "opacity-100" : "opacity-0"}`}
        ref={auroraRef}
      />
      <div id="circuit" className="absolute -z-10 h-full w-full bg-circuit bg-center" />
    </>
  );
};
