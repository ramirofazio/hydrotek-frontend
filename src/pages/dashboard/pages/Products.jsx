import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { TableRow } from "./index";

import { APIHydro } from "src/api";

import { UploadProductImgs } from "./UploadProductImgs";

const colsTitles = ["id", "nombre", "precio", "ultima actualización", "publicado", "destacado", "subir imagen"];

export function Products() {
  const navigate = useNavigate();
  const { products } = useLoaderData();
  console.log(products);
  const [modal, setModal] = useState(false);
  useEffect(() => {
    console.log(modal);
  }, [modal]);

  async function handleAddFeaturedProduct(productId) {
    try {
      await APIHydro.addFeaturedProduct(productId);
      navigate("/admin/dashboard");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <main className="w-full">
      <UploadProductImgs modal={modal} setModal={setModal} />
      <table className="my-4 w-full text-white">
        <thead className="border border-gold">
          <tr className="goldGradient text-base uppercase">
            {colsTitles.map((t, index) => (
              <th
                className="border-r-2 border-r-blue px-2  py-2 text-xs last:border-none xl:px-0 xl:text-center xl:text-sm"
                key={index}
              >
                {t}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map(({ id, arsPrice, name, published, updated, images, featured }) => {
            return (
              <tr key={id} className="even:bg-gold/10">
                <TableRow content={id} />
                <TableRow content={name} style />
                <TableRow
                  content={arsPrice.toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS",
                  })}
                  style="text-left"
                />
                <TableRow content={updated} />
                <TableRow
                  content={
                    <i
                      className={`ri-${published ? "check" : "close"}-fill text-2xl text-${
                        published ? "green" : "red"
                      }-500`}
                    />
                  }
                />
                <TableRow
                  content={
                    <i
                      className={`ri-${featured ? "star-s-fill" : "star-s-line"} icons text-2xl text${
                        featured ? "GoldGradient" : "-red-500"
                      }`}
                      onClick={() => handleAddFeaturedProduct(id)}
                    />
                  }
                />

                <TableRow
                  onClick={() => setModal({ prevImgs: images, product: { id, name } })}
                  content={<i className="ri-image-2-fill text-2xl"></i>}
                />
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
