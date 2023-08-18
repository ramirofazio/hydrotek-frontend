import { Pagination } from "../../components/Pagination.jsx";
import { ModalNav } from "../../components/ModalNav.jsx";

export default function Products() {
  return (
    <div className="outletPrimaryContainer">
      <section className="flex h-[100vh] w-full items-center justify-center">
        <Pagination nButtons={5} currentPage={1} setPage={(p) => console.log(p)} />
        <ModalNav/>
      </section>
    </div>
  );
}
