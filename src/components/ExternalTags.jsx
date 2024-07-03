import { Analytics } from "@vercel/analytics/react";
import { AgeValidationModal } from "./modals";

export default function ExternalTags() {
  return (
    <>
      <Analytics />
      <AgeValidationModal />
    </>
  );
}
