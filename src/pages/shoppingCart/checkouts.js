import { APIHydro } from "src/api";
import { error } from "src/components/notifications";

export default async function getCheckout(id, dni, cleanProducts) {
  try {
    if (id && dni) {
      return APIHydro.userWithDniCheckout({ userId: id, identifier: dni, items: cleanProducts });
    } else if (id && !dni) {
      error("Es necesario el DNI para el proceso de compra. Por favor, agreguelo");
      return "no dni";
    }
  } catch (err) {
    console.error("Error during checkout:", err.message);
    error("Ha ocurrido un error durante el proceso de compra");
  }
}
