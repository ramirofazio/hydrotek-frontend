import { Loader, Modal } from "src/components";
import { useState } from "react";

export function UpdateProductCoupon({ modal, setModal, related, allCodes }) {
  const [loading, setLoading] = useState(false);
  const { productId, promotionalCodes } = related;

  console.log(related);
  return (
    <Modal panelSize="min-w-full" isOpen={Boolean(modal)} onClose={() => setModal(false)}>
      {loading && <Loader />}
      {promotionalCodes?.length ? (
        promotionalCodes.map(({ promotionalCode }, i) => (
          <div className="border-2 border-gold" key={i}>
            <p>{promotionalCode.code}</p>
            <p>{promotionalCode.discount}</p>
            <i
              className={`ri-checkbox-blank-circle-fill ${promotionalCode.active ? "text-green-500" : "text-red-500"}`}
            >
              {promotionalCode.active ? "habilitado" : "deshabilitado"}
            </i>
          </div>
        ))
      ) : (
        <h1>Claro sos mas profunda</h1>
      )}
    </Modal>
  );
}
