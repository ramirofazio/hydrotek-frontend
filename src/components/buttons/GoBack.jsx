import { useNavigate } from "react-router-dom";

export function GoBack() {
  const navigate = useNavigate()
  return (
    <button className="border-2 border-gold rounded-full p-2 hover:brightness-125 bg-base" onClick={() => navigate(-1)}>
      <i className="border-2 border-transparent text-white text-xl md:text-3xl ri-arrow-go-back-fill"></i>
    </button>
  );
}
