import { APIHydro } from "src/api";
import { error } from "src/components/notifications";

export default async function getCheckout(id, dni, cleanProducts) {
  try {
    if (id && dni) {
      return APIHydro.userWithDniCheckout({ userId: id, identifier: dni, items: cleanProducts });
    } else if (id && !dni) {
      //todo: Hacer modal con input mas lindo y mas validado
      const newDni = parseInt(prompt("¡Necesitamos tu DNI para continuar con la compra!"), 10);
      if (isNaN(newDni) || newDni < 8 || newDni > 10) {
        error("DNI no válido");
        throw new Error("DNI no válido: ", newDni);
      }

      return APIHydro.userWithoutDniCheckout({ userId: id, identifier: newDni, items: cleanProducts });
    }
  } catch (err) {
    console.error("Error during checkout:", err.message);
    error("Ha ocurrido un error durante el proceso de compra");
  }
}
