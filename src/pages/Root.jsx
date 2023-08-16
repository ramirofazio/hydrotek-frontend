import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import Aurora from "../components/Aurora.jsx";

export default function Root() {
  return (
    <div className="relative h-full w-full">
      <Aurora />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
