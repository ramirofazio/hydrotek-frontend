import React from "react";
import { useLoaderData } from "react-router-dom";

function tableRow(content) {
  return <td className="border border-gold px-4 py-2 text-center">{content}</td>;
}

export function Products() {
  const products = useLoaderData();

  return (
    <main className="w-full">
      <table className="my-4 w-full table-auto text-white">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Precio</th>
            <th className="px-4 py-2">Actualizado</th>
            <th className="px-4 py-2">Activo</th>
            {/* Agrega más encabezados según sea necesario */}
          </tr>
        </thead>
        <tbody>
          {products.map(({ id, price, name, published, updated }) => (
            <tr key={id} className="even:bg-blue/20">
              {tableRow(id)}
              <td className="border border-gold px-4 py-2">{name}</td>
              <td className="border border-gold px-4 py-2">{price.d}</td>
              <td className="border border-gold px-4 py-2 text-center">{updated}</td>
              <td className="border border-gold px-4 py-2">
                <i
                  className={`ri-${published ? "check" : "close"}-fill text-3xl text-${
                    published ? "green" : "red"
                  }-500`}
                />
              </td>
              <td className="border border-gold px-4 py-2 text-center">
                <i className="icons ri-image-2-fill text-3xl"></i>
              </td>

              {/* Agrega más celdas según sea necesario */}
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
