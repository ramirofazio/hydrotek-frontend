import { Fragment } from "react";
import { Error } from "src/components";
import { Input } from "src/components/inputs";

const deliveryInfoFields = [
  { name: "address", label: "direccion" },
  { name: "city", label: "localidad" },
  { name: "province", label: "provincia" },
  { name: "postalCode", label: "codigo postal" },
];

export function DeliveryInfoForm({ handleOnChange, realtimeCorrection, errs, deliveryInfo }) {
  return deliveryInfoFields.map(({ name, label }, index) => (
    <Fragment key={index}>
      <Input
        name={name}
        type={name === "postalCode" ? "number" : "text"}
        onChange={(e) => handleOnChange(e, "deliveryInfo")}
        value={deliveryInfo[name]}
        placeholder={label}
        className={`relative ${errs[name] && realtimeCorrection && "border-red-500 focus:border-red-500/50"}`}
      />
      {errs[name] && realtimeCorrection && <Error text={errs[name]} className={"py-0 capitalize !text-white"} />}
    </Fragment>
  ));
}
