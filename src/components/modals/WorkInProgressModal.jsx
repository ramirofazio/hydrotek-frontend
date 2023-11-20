import { Modal } from "..";
import wip from "assets/wip.gif";
import { logos } from "src/assets";

export function WorkInProgressModal({ isOpen, onClose, text, dashboard = false }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <section className="grid place-items-center gap-4 p-2">
        <h2 className="textGoldGradient font-bold">
          {dashboard ? "Equipo de desarrollo:" : "¡Hemos lanzado nuestra web!"}
        </h2>
        <p className="text-center text-sm">
          {dashboard
            ? "Ciertos módulos aún no están disponibles. Estamos trabajando para terminarlos lo antes posible :). ¡Les avisaremos cuando haya nuevas actualizaciones!"
            : "Ciertos módulos aún no están disponibles. Agradecemos tu comprensión mientras trabajamos en terminar tu experiencia. Permanece atento para futuras actualizaciones."}
        </p>
        {text}
        <img src={wip} className="w-52 rounded-md object-cover" />
        <img src={logos.hydText} className="w-20" />
      </section>
    </Modal>
  );
}
