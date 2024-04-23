import { Loader, Modal } from "src/components";
import { useState } from "react";

export function UpdateProductCoupon({ modal, setModal }) {
  const [loading, setLoading] = useState(false);
  return (
    <Modal panelSize="min-w-full" isOpen={Boolean(modal)} onClose={() => setModal(false)}>
      {loading && <Loader />}
      <div>
        <h1>HOLa soy el modal</h1>
      </div>
    </Modal>
  );
}
