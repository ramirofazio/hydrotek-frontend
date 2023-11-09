import React from "react";
import { useLoaderData } from "react-router-dom";
import { IconButtonWithBgGold } from "src/components/buttons";
import { TableRow } from "./index";

const colsTitles = ["id", "nombre", "precio", "ultima actualización", "publicado", "subir imagen"];

export function Products() {
  const { products } = useLoaderData();

  const handleImageUpload = (e) => {
    const fileInput = e.target;
    const files = fileInput.files;

    if (files.length > 0) {
      const file = files[0];
      console.log("Nombre del archivo:", file.name);
      console.log("Tipo de archivo:", file.type);
      console.log("Tamaño del archivo:", file.size);

      //! Logica cloudinary. subir y rescatar el nombre o id de la imagen cargada en cloduinary para enlazarla con el producto
    }
  };

  return (
    <main className="w-full">
      <table className="my-4 w-full text-white">
        <thead className="border border-gold">
          <tr className="goldGradient text-base uppercase">
            {colsTitles.map((t) => (
              <th className="px-6 py-2">{t}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map(({ id, price: { d }, name, published, updated }) => (
            <tr key={id} className="even:bg-gold/10">
              <TableRow content={id} />
              <TableRow content={name} style="text-start" />
              <TableRow
                content={d.toLocaleString("es-AR", {
                  style: "currency",
                  currency: "ARS",
                })}
              />
              <TableRow content={updated} />
              <TableRow
                content={
                  <i
                    className={`ri-${published ? "check" : "close"}-fill text-3xl text-${
                      published ? "green" : "red"
                    }-500`}
                  />
                }
              />
              <TableRow
                content={
                  <label htmlFor="fileInput" className="icons ri-image-2-fill text-3xl">
                    <input
                      type="file"
                      id="fileInput"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                }
              />
            </tr>
          ))}
        </tbody>
      </table>
      <IconButtonWithBgGold
        className={"absolute bottom-0 mx-auto my-4"}
        icon={"ri-arrow-up-s-line"}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      />
    </main>
  );
}
