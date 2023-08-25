import { Outlet } from "react-router-dom";
import { Footer, Aurora, Navbar } from "src/components";

export default function Root() {
  return (
    <div className="relative overflow-hidden">
      <Aurora />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
