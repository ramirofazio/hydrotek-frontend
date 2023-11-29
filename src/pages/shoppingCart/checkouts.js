import { APIHydro } from "src/api";
import { error } from "src/components/notifications";

export default async function getCheckout(id, dni, cleanProducts) {
  if (id && dni) {
    //? userWithDniCheckout
    return APIHydro.userWithDniCheckout({ userId: id, identifier: dni, items: cleanProducts });
  } else if (id && !dni) {
    //? userWithoutDniCheckout
    // todo pasar esto a un modal con input mas lindo :D
    const newDni = parseInt(prompt("¡Necesitamos tu DNI para continuar con la compra!"));
    if (newDni.length < 8 || newDni.length > 10) {
      error("No es un DNI valido");
      return;
    }

    return APIHydro.userWithoutDniCheckout({ userId: id, identifier: newDni, items: cleanProducts });
  } else if (!id && !dni) {
    //? guestCheckout

    //!   Armar modal con inputs para:
    //todo {
    //todo     firstName: string;
    //todo     lastName: string;
    //todo     email: string;
    //todo     dni: string;
    //todo     phone: string;
    //todo }

    return APIHydro.guestCheckout({ id, dni, cleanProducts });
  }
}
