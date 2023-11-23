import { useSearchParams } from "react-router-dom";
import { ChangePassword } from "pages/user/ChangePassword";
import { Modal } from "src/components";
import { useState } from "react";

export function UpdatePasswordModal() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  if (token && email) {
    const [isModalOpen, setIsModalOpen] = useState(true);

    return (
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ChangePassword close={() => setIsModalOpen(false)} reset={true} token={token} email={email} />
      </Modal>
    );
  }
}
