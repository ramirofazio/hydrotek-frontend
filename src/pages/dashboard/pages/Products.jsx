import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { TableRow } from "./index";
import { Modal } from "src/components";
import axios from "axios";
import { APIHydro } from "src/api";

const colsTitles = ["id", "nombre", "precio", "ultima actualización", "publicado", "subir imagen"];

export function Products() {
  const navigate = useNavigate();
  const { products } = useLoaderData();
  console.log(products);
  const [modal, setModal] = useState(false);
  const [newImgs, setNewImgs] = useState(false);

  useEffect(() => {
    console.log(modal);
  }, [modal]);

  async function uploadProductImage(file, productId, setLoader) {
    try {
      setLoader(true);
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

      const URL = "https://api.cloudinary.com/v1_1/" + cloudName + "/image/upload";

      const formdata = new FormData();
      formdata.append("file", file);
      formdata.append("upload_preset", "product_image");
      formdata.append("public_id", productId);

      /* eslint-disable */
      const { secure_url, asset_id, public_id } = (await axios.post(URL, formdata)).data;
      await APIHydro.addProductImg({ path: secure_url, asset_id, publicId: public_id, productId });
      /* eslint-enable */

      setLoader(false);
      navigate("/admin/dashboard");
    } catch (err) {
      setLoader(false);
      console.log(err);
    }
  }

  async function deleteProductImg(productId) {
    try {
      const deleted = await APIHydro.deleteProductImg(productId);
      console.log(deleted);
      setModal(false);
      navigate("/admin/dashboard");
    } catch (e) {
      console.log(e);
    }
  }
  function handleImages({ target }) {
    const files = target.files;
    if (!files) return;
    const rawImgs = {};
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file) continue;

      const reader = new FileReader();

      reader.onload = () => {
        rawImgs[file.name] = {
          originalName: file.name,
          URL: typeof reader.result === "string" ? reader.result : "",
          file: file,
          size: file.size,
        };
      };
      reader.readAsDataURL(file);
    }
    console.log(rawImgs);
    setModal((prev) => {
      return {
        ...prev,
        newImgs: rawImgs,
      };
    });
    /* setModal({
      ...modal,
      newImgs: rawImgs,
    }); */
    //setNewImgs(rawImgs);
  }
  return (
    <main className="w-full">
      <UploadProductImg modal={modal} setModal={setModal} />
      {/* <Modal isOpen={Boolean(modal)} onClose={() => setModal(false)}>
        <button
          onClick={() => deleteProductImg(modal.productId)}
          className="mx-auto my-2 flex items-center justify-center gap-2 rounded-lg border-2 border-red-500 bg-slate-800 p-1"
        >
          <i className="ri-delete-bin-2-fill self-center text-4xl capitalize text-red-500"></i>
          <h1> Presione para borrar</h1>
        </button>
        <img src={modal.path} /> */}
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
                    onClick={() => setModal({ prevImgs: images, productId: id })}
                    content={<i className="ri-image-2-fill text-2xl"></i>}
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

function UploadProductImg({ modal, setModal }) {
  const [newImgs, setNewImgs] = useState(false);

  useEffect(() => {
    console.log(newImgs)
  }, [newImgs]) 

  function handleImages() {
    console.log("handleando");
    setNewImgs(["hola", "beba", "como"]);
  }

  return (
    <Modal isOpen={Boolean(modal)} onClose={() => setModal(false)}>
      <div className="flex flex-col items-center ">
        {/* <button
            onClick={() => deleteProductImg(modal.productId)}
            className="mx-auto my-2 flex items-center justify-center gap-2 rounded-lg border-2 border-red-500 bg-slate-800 p-1"
          >
            <i className="ri-delete-bin-2-fill self-center text-2xl capitalize text-red-500"></i>
            <h1> Presione para borrar las imagenes</h1>
          </button> */}
        {modal?.prevImgs && modal?.prevImgs?.length ? (
          <div className="flex border-2 text-center">
            <h1>Imganes previas: </h1>
            {modal.prevImgs.map((i, index) => {
              return <img className="w-[75px]" key={index} src={i} alt="" />;
            })}
          </div>
        ) : null}
        <h1>-------</h1>
        <div className="flex border-2 text-center">
          {newImgs && newImgs.length ? (
            newImgs.map((n, i) => <h1 key={i}>{n}</h1>)
          ) : (
            <h1>No hay imagenes para este producto</h1>
            /* Object.values(newImgs).map((img, index) => {
              console.log(index, img);
              return <img className="w-[120px]" key={index} src={img.URL} alt="" />;
            }) */
          )}
        </div>
        <label
          htmlFor={`fileInput-${modal.productId}`}
          className="mt-8 w-fit cursor-pointer  rounded border-2 bg-blue px-5 py-3 text-white hover:font-medium"
        >
          Cargar imagenes
          <input
            type="file"
            id={`fileInput-${modal.productId}`}
            accept="image/*"
            multiple
            title="Cargar imagenes"
            className="hidden"
            onChange={handleImages}
          />
        </label>
      </div>
    </Modal>
  );
}
