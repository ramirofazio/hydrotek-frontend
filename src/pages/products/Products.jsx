import { ProductCard } from "src/components/cards";
import { Pagination } from "../../components";

export default function Products() {
  const mockProducts = [
    { name: "SAFE ROOTS", price: "$20.000" },
    { name: "PLUG", price: "$5.000" },
    { name: "SISTEMA X", price: "$40.000" },
    { name: "SAFE ROOTS", price: "$20.000" },
  ];

  return (
    <div className="w-[90%] mx-auto ">
      <div className="content mx-auto grid  place-items-center gap-4  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {mockProducts.map((p, i) => (
          <ProductCard key={i} name={p.name} price={p.price} />
        ))}
      </div>
      <div className="w-fit mx-auto my-5">
        <Pagination nButtons={5}/>
      </div>
    </div>
  );
}
