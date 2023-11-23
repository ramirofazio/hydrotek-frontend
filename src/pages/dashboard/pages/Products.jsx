import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { TableRow } from "./index";
import { Modal } from "src/components";
import axios from "axios";
import { APIHydro } from "src/api";

const colsTitles = ["id", "nombre", "precio", "ultima actualización", "publicado", "subir imagen"];

export function Products() {
  const navigate = useNavigate();
  const { products } = useLoaderData();
  const [modal, setModal] = useState(false);

  async function uploadProductImage(file, productId, setLoader) {
    try {
      setLoader(true);
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

      const URL = "https://api.cloudinary.com/v1_1/" + cloudName + "/image/upload";

      const formdata = new FormData();
      formdata.append("file", file);
      formdata.append("upload_preset", "product_image");
      formdata.append("public_id", productId);

      const { secure_url, asset_id, public_id } = (await axios.post(URL, formdata)).data;

      const res = await APIHydro.addProductImg({ path: secure_url, asset_id, public_id, productId });
      console.log(res.data);
      setLoader(false);
      navigate("/admin/dashboard");
    } catch (err) {
      setLoader(false);
      console.log(err);
    }
  }

  async function deleteProductImg(productId) {
    try {
      const res = await APIHydro.deleteProductImg(productId)
      console.log(res.data)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <main className="w-full">
      <Modal isOpen={Boolean(modal)} onClose={() => setModal(false)}>
        <i onClick={() => deleteProductImg(modal.productId)} className="ri-delete-bin-2-fill self-center text-4xl capitalize text-red-500">presione para borrar</i>
        <img src={modal.path} />
      </Modal>
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
          {products.map(({ id, arsPrice, name, published, updated, images }) => {
            const path = images[0]?.path;
            const [loader, setLoader] = useState(false);
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
                {images?.length ? (
                  <TableRow
                    onClick={() => {
                      console.log(path);
                      setModal({
                        path,
                        productId: id,
                      });
                    }}
                    content={
                      <span className="flex justify-around gap-2">
                        <img className="mx-auto w-14" src={path} />
                        <i className="ri-delete-bin-2-fill self-center text-3xl text-red-500"></i>
                      </span>
                    }
                  />
                ) : (
                  <TableRow
                    content={
                      <label
                        htmlFor="fileInput"
                        className={`${loader ? "icons ri-loader-2-line text-2xl" : "icons ri-image-2-fill text-2xl"}`}
                      >
                        <input
                          type="file"
                          id="fileInput"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => uploadProductImage(e.target.files[0], id, setLoader)}
                        />
                      </label>
                    }
                  />
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
