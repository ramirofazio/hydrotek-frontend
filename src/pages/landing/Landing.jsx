import Carrousel from "../../components/Carrousel";
import InfoCard from "../../components/InfoCard";
import testFoto from "../../assets/goldCircuit1.png";

export default function Landing() {
  return (
    <div className="outletPrimaryContainer">
      <section className="flex h-full w-full flex-col items-center justify-center">
        <section className="flex h-screen w-full flex-col xl:flex-row xl:pt-20">
          <InfoCard />
          <div className="mt-12 flex h-full w-full items-start md:justify-end xl:pt-20">
            <img src={testFoto} className="w-full md:w-[70%] xl:w-full" />
          </div>
        </section>
        <Carrousel />
      </section>
    </div>
  );
}
