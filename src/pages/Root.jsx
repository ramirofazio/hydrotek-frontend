import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import {Outlet} from 'react-router-dom'

export default function Root() {
  return (
    <div>
      <Navbar/>
      <Footer/>
      <Outlet/>
    </div>
  );
}
