import { useNavigate } from "react-router-dom";

export function GoBack({ to }) {
  const navigate = useNavigate();

  const handleNav = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };
  return (
    <button className="rounded-full border-2 border-gold bg-base p-2 hover:brightness-125" onClick={() => handleNav()}>
      <i className="ri-arrow-go-back-fill border-2 border-transparent text-xl text-white md:text-3xl"></i>
    </button>
  );
}
