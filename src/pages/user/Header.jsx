import { setToken } from "src/redux/reducers/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(setToken("logOut"));
    navigate("/");
  };

  return (
    <section className="my-2 flex items-center justify-between px-6">
      <h1 className="text-2xl">MI CUENTA</h1>
      <div
        className="goldGradient group relative rounded-full p-7 transition hover:cursor-pointer hover:opacity-50"
        onClick={() => handleLogOut()}
      >
        <i className="ri-logout-box-r-line absolute inset-0 flex items-center justify-center !text-2xl text-white transition group-hover:text-base" />
      </div>
    </section>
  );
}
