import React, { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

export default function Root() {
  const auroraRef = useRef(null);

  useEffect(() => {
    const aurora = auroraRef.current;

    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const auroraSize = 250;
      const auroraX = clientX - auroraSize / 2;
      const auroraY = clientY - auroraSize / 2;

      aurora.style.left = `${auroraX}px`;
      aurora.style.top = `${auroraY}px`;
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="relative h-full w-full">
      <div className="aurora absolute z-10" ref={auroraRef}></div>
      {/* <div id="circuit" className="absolute z-20 h-full w-full"></div> */}
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
