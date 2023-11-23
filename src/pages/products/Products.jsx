import { ProductCard } from "components/cards";
import { Pagination } from "components";
import { useLoaderData } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { error } from "src/components/notifications";

export default function Products() {
  const { t } = useTranslation();
  const data = useLoaderData();
  let { products, quantity } = data;

  return (
    <div className="mx-auto w-[90%]">
      <div>
        {/* // TODO Pedido a la api con query params => la respuesta setea "data"
//! Hay que configurar bien para que la searchbar sea key-sensitive para todos los productos
<SearchBar />
*/}
      </div>
      <div className="content mx-auto mt-10  grid place-items-center gap-4  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products?.length ? (
          products.map((p, i) => (
            <ProductCard
              id={p.id}
              key={i}
              name={p.name}
              imgUrl={p.images[0]?.path || undefined}
              price={p.arsPrice.toLocaleString("es-AR", {
                style: "currency",
                currency: "ARS",
              })}
            />
          ))
        ) : (
          <>
            {error("no hay products")}
            <h1 className="mx-auto w-fit">{t("products.no-products")}</h1>
          </>
        )}
      </div>
      <div className="mx-auto my-5 w-fit">
        <Pagination path={"/products/"} nButtons={quantity} />
      </div>
    </div>
  );
}
