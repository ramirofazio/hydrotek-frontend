import { Link } from "react-router-dom";
import Button from "./Button";
import productBorderNoGradient from "../assets/productBorderNoGradient.png";

export default function InfoCard({ text }) {
  return (
    <div className="grid h-screen w-full place-content-start place-items-center p-4">
      <img src={productBorderNoGradient} className="absolute w-[80%] self-start" />
      <h1 className="mt-20 w-[80%] text-center uppercase">{text || "Cultivo sin tierra, crecimiento sin límites"}</h1>
      <Link to={`/products`} className="">
        <Button classname="text-xs" text="VER PRODUCTOS" />
      </Link>
    </div>
  );
}
