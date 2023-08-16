import React, { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

export default function Root() {
  const auroraRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isAuroraOn, setIsAuroraOn] = useState(false);

  useEffect(() => {
    const aurora = auroraRef.current;

    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const auroraSize = 250;
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

    const handleMouseEnter = () => {
      setIsMouseInside(true);
    };

    const handleMouseLeave = () => {
      setIsMouseInside(false);
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
    <div className="relative h-full w-full">
      <div
        className={`aurora absolute z-10 transition-opacity duration-500 ${
          !isScrolling && isAuroraOn ? "opacity-100" : "opacity-0"
        }`}
        ref={auroraRef}
      ></div>
      <div id="circuit" className="absolute z-20 h-full w-full"></div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
