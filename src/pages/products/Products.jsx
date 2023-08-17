import { Pagination } from "../../components/Pagination.jsx";

export default function Products() {
  return (
    <div className="outletPrimaryContainer">
      <section className="flex h-[100vh] w-full items-center justify-center">
        <Pagination nButtons={5} currentPage={1} setPage={(p) => console.log(p)} />
        <h1>Hola soy el Home!</h1>
      </section>
    </div>
  );
}
