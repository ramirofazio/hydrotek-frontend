import toast from "react-hot-toast";

const notify = () => toast.success('Successfully created!', {
  /* style: {
    backgroundColor: "#1a3c5a",
    borderWidth: "2px",
    borderColor: "#B8912D",
    color: "white"
  } */
});


export function Basic() {
  return (
    <div className="bg-blue">
      <button onClick={notify}>Make me a toast</button>
    </div>
  );
}
