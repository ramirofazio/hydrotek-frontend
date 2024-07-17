import { Analytics } from "@vercel/analytics/react";
import { AgeValidationModal } from "./modals";

export default function ExternalTags() {
  return (
    <>
      <head>
        {process.env.VITE_ENV === "production" && (
          <meta name="google-site-verification" content="google5955a7d19ab9c10f.html" />
        )}
      </head>
      <Analytics />
      <AgeValidationModal />
    </>
  );
}
