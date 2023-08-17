import { Outlet } from "react-router-dom";
import { Footer, Aurora, Navbar } from "../components";


export default function Root() {
  return (
    <div className="relative ">
      <div className="">
        <Aurora/>
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}
