import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import Aurora from "../components/Aurora.jsx";

export default function Root() {
  return (
    <div className="relative border-2 border-purple-400">
      <div className="border-4 border-black">
        <Aurora/>
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}
