import { backgrounds } from "assets";
import { Quantity } from "..";


export function CartArticleCard({ img, name, price, productId }) {
  return (
    <main className="grid grid-cols-2 gap-2 border-b-[1px] border-gold py-8 sm:grid-cols-3  sm:gap-0 lg:max-w-[75%] lg:gap-8">
      <picture className=" relative flex items-center justify-center  sm:max-w-[200px]">
        <img className="absolute h-[110%] w-[80%]" src={backgrounds.cartProductBorder} />
        <img className="absolute -z-10 h-[105%] w-[79%]" src={backgrounds.cartProductGradient} alt="" />
        <img className="max-w-[80%] p-6" src={img} alt="" />
      </picture>
      <article className="flex flex-col justify-center gap-1 break-normal break-all  lg:col-span-2">
        <h1 className="text-lg">{name}</h1>
        <h2 className=" textGoldGradient font-bold">
          {price.toLocaleString("es-AR", {
            style: "currency",
            currency: "ARS",
          })}
        </h2>
        <article className="col-span-2 mt-4 hidden w-fit sm:inline ">
          <Quantity productName={name} price={price} productId={productId} />
        </article>
      </article>
      <article className="col-span-2 mt-8 sm:hidden ">
        <Quantity productName={name} price={price} productId={productId} />
      </article>
    </main>
  );
}
