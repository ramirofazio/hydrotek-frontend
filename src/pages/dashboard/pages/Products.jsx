import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { IconButtonWithBgGold } from "src/components/buttons";
import { TableRow } from "./index";
import { Loader } from "src/components";
import axios from "axios";

const colsTitles = ["id", "nombre", "precio", "ultima actualización", "publicado", "subir imagen"];

export function Products() {
  const { products } = useLoaderData();

  const [loader, setLoader] = useState(false);
  const handleImageUpload = (e, id) => {
    setLoader(true);
    const { target } = e;
    const file = target.files[0];
    const reader = new FileReader();

    reader.onload = async () => {
      try {
        const formdata = new FormData();
        formdata.append("file", reader.result);
        formdata.append("productId", id);

        axios
          .post(`http://localhost:3000/cloudinary/loadProductImage`, formdata, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((res) => {
            if (res.data === "success") {
              setLoader(false);
            }
          });
      } catch (e) {
        console.log(e);
        setLoader(false);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <main className="w-full">
      {loader && <Loader />}
      <table className="my-4 w-full text-white">
        <thead className="border border-gold">
          <tr className="goldGradient text-base uppercase">
            {colsTitles.map((t, index) => (
              <th className="border-r-blue px-6 py-2 border-r-2 last:border-none" key={index}>
                {t}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map(({ id, arsPrice, name, published, updated }) => (
            <tr key={id} className="even:bg-gold/10">
              <TableRow content={id} />
              <TableRow content={name} />
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
                      onChange={(e) => handleImageUpload(e, id)}
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
