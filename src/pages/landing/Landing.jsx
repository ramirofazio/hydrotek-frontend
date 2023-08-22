import Carrousel from "../../components/Carrousel";
import InfoCard from "../../components/InfoCard";
import testFoto from "../../assets/goldCircuit1.png";
import ProductCard from "../../components/ProductCard";

export default function Landing() {
  return (
    <div className="outletPrimaryContainer">
      <section className="flex h-full w-full flex-col items-center justify-center">
        <section className="border-2 flex gap-8 w-full flex-col xl:flex-row xl:pt-20">
          <InfoCard />
          <div className="border-2 flex items-start md:justify-end xl:pt-20">
            <img src={testFoto} className="w-full md:w-[70%] xl:w-full" />
          </div>
        </section>
        <h1 className="xl:text-4xl">los más vendidos</h1>
        <Carrousel
          content={[
            { component: <ProductCard imgUrl={testFoto} />, qty: 3 },
            { component: <ProductCard name={"SAFE ROOTS"} price={"$20.000"} />, qty: 3 },
          ]}
        />
      </section>
    </div>
  );
}
