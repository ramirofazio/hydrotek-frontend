import React, { useState, Fragment  } from "react";
import { useLoaderData } from "react-router-dom";
import { TableRow } from "./index";
import { Loader, Modal } from "src/components";
import axios from "axios";
import { APIHydro } from "src/api";
import { Dialog, Transition } from "@headlessui/react";

const colsTitles = ["id", "nombre", "precio", "ultima actualización", "publicado", "subir imagen"];

export function Products() {
  const { products } = useLoaderData();
  console.log(products);
  const [loader, setLoader] = useState(false);
  const [modal, setModal] = useState(false);

  async function uploadProductImage(file, productId) {
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
    } catch (err) {
      setLoader(false);
      console.log(err);
    }
  }

  /* const handleImageUpload = (e, id) => {
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
  }; */

  return (
    <main className="w-full">
      {loader && <Loader />}
      <Modal isOpen={Boolean(modal)} onClose={() => setModal(false)}>
        <i className=""></i>
        <img src={modal.path}/>
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
                        path
                      });
                    }}
                    content={<img className="mx-auto w-14" src={path} />}
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
                          onChange={(e) => uploadProductImage(e.target.files[0], id)}
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
