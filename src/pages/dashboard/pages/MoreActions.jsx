import { useState } from "react";
import { Loader } from "src/components";
import { UsdPriceManager } from "./index";
import { TFacturaProductsManager } from "./TFacturaProductsManager";

export function MoreActions() {
  const [loader, setLoader] = useState(false);

  return (
    <main className="w-full">
      {loader && <Loader />}
      <UsdPriceManager setLoader={setLoader} />
      <TFacturaProductsManager setLoader={setLoader} />
    </main>
  );
}
