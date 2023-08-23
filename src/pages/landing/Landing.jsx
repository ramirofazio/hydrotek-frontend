import Carrousel from "../../components/Carrousel";
import InfoCard from "../../components/InfoCard";
import testFoto from "../../assets/goldCircuit1.png";
import ProductCard from "../../components/ProductCard";

export default function Landing() {
  return (
    <div className="content h-full border-2 border-green-500">
      <section className="border-2 border-red-600">
        <section className="flex flex-col border-2 border-yellow-500 xl:flex-row xl:pt-20 ">
          <InfoCard />
          <img src={testFoto} className="md:w-[70%] lg:w-[40%] place-self-end" />
        </section>
        {/* <h1 className="xl:text-4xl">los más vendidos</h1> */}
        <Carrousel
          content={[
            { component: <ProductCard imgUrl={testFoto} />, qty: 3 },
            { component: <ProductCard name={"SAFE ROOTS"} price={"$20.000"} />, qty: 3 },
          ]}
          quantit
        />
      </section>
    </div>
  );
}
