import { getOfStorage, saveInStorage } from "src/utils/localStorage";
import { NewModal } from ".";
import { useDisclosure } from "@nextui-org/react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../buttons";
import { logos } from "src/assets";

export const AgeValidationModal = () => {
  const isValid = getOfStorage("validAge");
  const { t } = useTranslation();

  if (isValid) return;

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  useEffect(() => {
    onOpen();
    document.getElementById("main_wrapper").classList = "blur-xl";

    return () => {
      document.getElementById("main_wrapper").classList = "";
    };
  }, []);

  return (
    <NewModal
      title={t("validation-modal.title")}
      description={t("validation-modal.description")}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={onClose}
      size="2xl"
      isDismissable={false}
      topHeaderContent={
        <img loading="lazy" src={logos.hydText} className="h-auto w-[100px]" alt="hydrotek-logo-text" />
      }
    >
      <main className="mt-10 flex flex-col gap-5">
        <Button onClick={() => saveInStorage("validAge", true)} className={"!bg-gold py-4 font-bold hover:opacity-50"}>
          {t("validation-modal.action-button-1")}
        </Button>
        <Button
          onClick={() => window.location.replace("https://www.google.com")}
          className={"py-4 font-bold hover:border-base hover:bg-red-800 "}
        >
          {t("validation-modal.action-button-2")}
        </Button>
      </main>
    </NewModal>
  );
};
