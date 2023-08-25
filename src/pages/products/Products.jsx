import { ProductCard } from "src/components/cards";

export default function Products() {
  const mockProducts = [
    { name: "SAFE ROOTS", price: "$20.000" },
    { name: "PLUG", price: "$5.000" },
    { name: "SISTEMA X", price: "$40.000" },
    { name: "SAFE ROOTS", price: "$20.000" },
  ];

  return (
    <div className="content mx-auto w-[90%] grid place-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {mockProducts.map((p, i) => (
        <ProductCard key={i} name={p.name} price={p.price} />
      ))}
    </div>
  );
}
