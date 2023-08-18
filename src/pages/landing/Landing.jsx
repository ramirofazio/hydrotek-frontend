import { ModalNav } from "../../components/ModalNav";
import { Categories } from "../../components/Categories";

export default function Landing() {
  return (
    <div className="outletPrimaryContainer">
      <section className="flex h-[50vh] w-full items-center justify-center">
        <ModalNav/>
        <Categories/>
      </section>
    </div>
  );
}
