import toast from "react-hot-toast";

export function success(message) {
  const notify = () => toast.success("¡" + message + "!", {});
  return notify();
}

export function error(message) {
  const notify = () =>
    toast.error(message || "Ocurrio un error. Por favor, intantalo de nuevo", {
      style: {
        borderColor: "#D92917",
      },
    });
  return notify();
}

export function addProduct({ name, img }) {
  const notify = () =>
    toast.custom(() => (
      <div className="flex min-w-[30%] items-center gap-2 rounded border-2 border-gold bg-[#031834] p-4">
        <img className="w-[50px] rounded" src={img} alt="" />
        <p className="text-center text-xs font-bold lg:text-sm">
          SE AGREGO <strong className="pointer-events-none">{name}</strong> AL CARRITO
        </p>
      </div>
    ));
  return notify();
}
