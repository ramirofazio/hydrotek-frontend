import Carrousel from "../../components/Carrousel";
import InfoCard from "../../components/InfoCard";

export default function Landing() {
  return (
    <div className="outletPrimaryContainer">
      <section className="flex h-full w-full flex-col items-center justify-center">
        <InfoCard />
        <Carrousel />
      </section>
    </div>
  );
}
