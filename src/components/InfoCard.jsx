import Link from "react-router-dom";
import Button from "./Button";

export default function InfoCard({ text, showBtn = false }) {
  return (
    <div className={`grid gap-2 border-2 p-2`}>
      <h1 className="">{text || "TITULO O INFO"}</h1>
      {showBtn && (
        <Link to={`/products}`}>
          <Button text="VER PRODUCTOS" />
        </Link>
      )}
    </div>
  );
}
