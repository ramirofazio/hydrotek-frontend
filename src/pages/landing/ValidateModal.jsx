import { useNavigate, useSearchParams } from "react-router-dom";
import { ChangePassword } from "pages/user/ChangePassword";
import { Loader, Modal } from "src/components";
import { useEffect, useState } from "react";
import { APIHydro } from "src/api";
import { error, success } from "src/components/notifications";

export function ValidateModal() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const newUser = searchParams.get("newUser");
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [loader, setLoader] = useState(false);

  const activeUser = async () => {
    setLoader(true);
    try {
      const res = await APIHydro.activeUser({ token, email });
      if (res.status === 200) {
        success("Usuario Activado con exito");
        navigate("session/signIn");
      }
    } catch (e) {
      console.log(e);
      setLoader(false);
      error();
    }
  };

  useEffect(() => {
    if (newUser) {
      activeUser();
    }
  }, [newUser && token && email]);

  if (token && email) {
    const [isModalOpen, setIsModalOpen] = useState(true);

    return (
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {loader && <Loader />}
        {!newUser && <ChangePassword close={() => setIsModalOpen(false)} reset={true} token={token} email={email} />}
      </Modal>
    );
  }
}
