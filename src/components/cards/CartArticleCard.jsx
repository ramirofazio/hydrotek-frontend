import { products, backgrounds } from "assets";
import { Quantity } from "..";

export function CartArticleCard({ img, name, price }) {
  console.log(products);
  return (
    <main className="grid grid-cols-2 gap-2 border-2 border-green-700 py-5">
      <div className="relative flex items-center justify-center">
        <img className="absolute h-[110%] w-[80%]" src={backgrounds.cartProductBorder} />
        <img className="absolute -z-10 h-[105%] w-[79%]" src={backgrounds.cartProductGradient} alt="" />
        <img className="max-w-[80%]" src={img || products.defaultOne} alt="" />
      </div>
      <div className="flex flex-col justify-center  border-2">
        <h1 className="overflow-hidden text-lg">fertilizante</h1> {/* //* resolver overflow */}
        <h2 className=" textGoldGradient ">{price || "$99.99"}</h2>
      </div>
      <div className="mt-4 col-span-2 border-2 border-orange-500">
        <Quantity />
      </div>
    </main>
  );
}
