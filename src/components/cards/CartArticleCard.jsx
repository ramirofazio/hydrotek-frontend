import { products, backgrounds } from "assets";
import { Quantity } from "..";

export function CartArticleCard({ img, name, price }) {
  console.log(products);

  return (
    <main className="grid grid-cols-2 gap-2 border-b-[1px] border-gold py-8">
      <picture className="relative flex items-center justify-center">
        <img className="absolute h-[110%] w-[80%]" src={backgrounds.cartProductBorder} />
        <img className="absolute -z-10 h-[105%] w-[79%]" src={backgrounds.cartProductGradient} alt="" />
        <img className="max-w-[80%]" src={img || products.defaultOne} alt="" />
      </picture>
      <article id="problem" className="break-all flex flex-col break-normal justify-center gap-1 border-2">
        <h1 className="text-lg">{name || "fertilizante"}</h1> {/* //* resolver overflow */}
        <h2 className="textGoldGradient ">{price || "$99.99"}</h2>
      </article>
      <article className="col-span-2 mt-4 ">
        <Quantity />
      </article>
    </main>
  );
}
