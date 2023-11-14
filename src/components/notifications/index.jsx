import toast from "react-hot-toast";

export function success(message) {
  const notify = () =>
    toast.success(message, {
      /* style: {
      backgroundColor: "#1a3c5a",
      borderWidth: "2px",
      borderColor: "#B8912D",
      color: "white"
    } */
    });
  return notify();
}

export function error(message) {
  const notify = () =>
    toast.error(message, {
      style: {
        borderColor: "#D92917",
      },
    });
  return notify();
}

export function addProduct({ name, img }) {
  const notify = () =>
    toast.custom(() => (
      <div className="flex min-w-[20%] items-center rounded  justify-center gap-2 border-2 border-gold bg-[#031834] p-1">
        <img className="w-[50px] rounded" src={img} alt="" />
        <p className="textGoldGradient text-center font-bold">
          Se agrego {name} al carrito
        </p>
      </div>
    ));
  return notify();
}
