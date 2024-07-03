import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";

export function NewModal({
  children, //! REQUIRED
  title,
  description,
  isOpen, //! REQUIRED
  onOpenChange, //! REQUIRED
  modalClassName,
  isDismissable = true,
  placement = "center",
  backdrop = "blur",
  size = "xl",
  onClose = false,
  hideCloseButton = true,
  topHeaderContent,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className={`overflow-hidden rounded-md border-5 border-gold bg-base p-4 ${modalClassName} text-center`}
      hideCloseButton={hideCloseButton}
      isDismissable={isDismissable}
      placement={placement}
      backdrop={backdrop}
      size={size}
    >
      <ModalContent onClose={onClose} className="relative">
        {() => (
          <main>
            {isDismissable && Boolean(onClose) && (
              <i className="ri-close-line icons absolute right-2 top-2 text-2xl text-gold" onClick={() => onClose()} />
            )}
            <ModalHeader className="grid place-items-center gap-5 text-white">
              {topHeaderContent}
              <h3 className="text-2xl">{title}</h3>
              <p className="mx-20 text-sm font-thin text-white/60">{description}</p>
            </ModalHeader>
            <ModalBody>{children}</ModalBody>
          </main>
        )}
      </ModalContent>
    </Modal>
  );
}
