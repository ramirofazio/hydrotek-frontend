import toast from "react-hot-toast";

export function success(message) {
  const notify = () => toast.success(message, {
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
  const notify = () => toast.error(message, {
    style: {
      borderColor: "#D92917",
    }
  });
  return notify();
}
