import { ProductDescription } from "components";
import product from "assets/product.png";

export default function ProductDetail() {
  return (
    <div className="content mx-auto grid w-[92%] gap-8 border-2 md:grid-cols-2">
      {/* <Carrousel
        content={[
          {
            component: (
              <div className="flex h-full min-h-[150px] w-full min-w-[150px] items-center justify-center bg-productBorderGradient bg-contain bg-clip-content bg-center bg-no-repeat">
                <img src={product} alt="foto del producto" className="m-10 w-[40%] md:m-20" />
              </div>
            ),
            qty: 3,
          },
        ]}
      /> */}
      <div className="flex h-full min-h-[150px] w-full min-w-[150px] items-center justify-center border-2 border-red-500 bg-productBorderGradient bg-contain bg-clip-content bg-center bg-no-repeat">
        <img src={product} alt="foto del producto" className="m-10 w-[40%] md:w-[60%] lg:w-[50%]" />
      </div>
      <ProductDescription />
    </div>
  );
}
