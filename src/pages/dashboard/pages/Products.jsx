import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { TableRow } from "./index";
import { APIHydro } from "src/api";
import { UploadProductImgs } from "./UploadProductImgs";
import { success } from "src/components/notifications";
import { categories } from "src/utils";

const colsTitles = [
  "id",
  "nombre",
  "precio",
  "ultima actualización",
  "publicado",
  "destacado",
  "subir imagen",
  "categoría",
];

export function Products() {
  const navigate = useNavigate();
  const { products } = useLoaderData();
  console.log(products);
  const [modal, setModal] = useState(false);

  async function handleAddFeaturedProduct(productId, productName) {
    try {
      await APIHydro.addFeaturedProduct(productId).then((res) => {
        if (res.status === 200) {
          success(`se destacó ${productName}`);
          navigate("/admin/dashboard");
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  async function handleToggleActive(productId, productName) {
    try {
      await APIHydro.toggleActiveProduct(productId).then((res) => {
        if (res.status === 200) {
          success(`${productName} modificado`);
          navigate("/admin/dashboard");
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  async function handleCategory(e, productId, productName) {
    try {
      await APIHydro.updateCategory(productId, e.target.value).then((res) => {
        if (res.status === 200) {
          success(`se modifico ${productName}`);
          //navigate("/admin/dashboard");
        }
      });
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
          {products.map(({ id, arsPrice, name, published, updated, images, featured, typeId }) => {
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
                      className={`ri-${published ? "check" : "close"}-fill icons text-2xl text-${
                        published ? "green" : "red"
                      }-500`}
                      onClick={() => handleToggleActive(id, name)}
                    />
                  }
                />
                <TableRow
                  content={
                    <i
                      className={`ri-${featured ? "star-s-fill" : "star-s-line"} icons text-2xl text${
                        featured ? "GoldGradient" : "-red-500"
                      }`}
                      onClick={() => handleAddFeaturedProduct(id, name)}
                    />
                  }
                />

                <TableRow
                  onClick={() => setModal({ prevImgs: images, product: { id, name } })}
                  content={<i className="icons ri-image-2-fill text-2xl">{images?.length}</i>}
                />

                <TableRow
                  content={
                    <select onChange={(e) => handleCategory(e, id, name)} className="text-black">
                      <option value={0}>Elija categoría</option>
                      {categories.map((c, i) => (
                        <option
                          selected={c.id && c.id === typeId ? true : false}
                          key={i}
                          value={c.id}
                        >
                          {c.name}
                        </option>
                      ))}
                    </select>
                  }
                />
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
