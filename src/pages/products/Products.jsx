import { CategoryCard } from "../../components/cards/CategoryCard.jsx";
import { Pagination } from "../../components";

export default function Products() {
  return (
    <div className="content">
      <section className=" w-1/2 border-2 border-red-500">
        {/* <Pagination nButtons={5} currentPage={1} setPage={(p) => console.log(p)} /> */}
        <CategoryCard />
      </section>
    </div>
  );
}
