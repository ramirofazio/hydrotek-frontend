import Carrousel from "../../components/Carrousel";
import InfoCard from "../../components/InfoCard";
import testFoto from "../../assets/goldCircuit1.png";
import ProductCard from "../../components/ProductCard";

export default function Landing() {
  return (
    <div className="content h-full border-2 border-green-500">
      <section className="border-2 border-red-600 flex flex-col gap-[5rem]">
        <section className="flex flex-col border-2 border-yellow-500 lg:flex-row lg:place-items-center lg:pt-20">
          <InfoCard />
          <img src={testFoto} className="place-self-end border-2 md:w-[70%] lg:w-[45%] lg:place-self-center" />
        </section>
        <div className="">
          <h1 className="mb-10 w-fit mx-auto xl:text-3xl">los más vendidos</h1>
          <Carrousel
            content={[
              { component: <ProductCard imgUrl={testFoto} name={"CIRCUIT"} price={"$5.000"} />, qty: 3 },
              { component: <ProductCard name={"SAFE ROOTS"} price={"$20.000"} />, qty: 3 },
            ]}
            quantit
          />
        </div>
      </section>
    </div>
  );
}
