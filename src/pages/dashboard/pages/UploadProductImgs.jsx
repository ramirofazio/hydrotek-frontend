import { useEffect, useState } from "react";
import { Modal } from "src/components";
import { toast } from "react-hot-toast";
import axios from "axios";
import { APIHydro } from "src/api";

export function UploadProductImgs({ modal, setModal }) {
  const [newImgs, setNewImgs] = useState([]);

  useEffect(() => {
    console.log(newImgs);
  }, [newImgs]);

  const handleImgs = ({ target }) => {
    const files = target.files;
    if (!files) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file) continue;

      const reader = new FileReader();

      reader.onload = () => {
        setNewImgs((prev) => {
          return {
            ...prev,
            [file.name]: {
              originalName: file.name,
              URL: typeof reader.result === "string" ? reader.result : "",
              file: file,
              size: file.size,
            },
          };
        });
      };
      reader.readAsDataURL(file);
    }
  };

  function deleteLocalImg(fileName) {
    setNewImgs((prev) => {
      let previusImgs = { ...prev };
      delete previusImgs[fileName];
      return previusImgs;
    });
  }

  function deleteDbImg(productImgId) {
    setNewImgs((prev) => {
      let previusImgs = { ...prev };
      delete previusImgs[productImgId];
      return previusImgs;
    });
  }

  async function uploadImgs(files = [], productId) {
    //setLoader(true);
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

    const URL = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    const promises = [];

    files.forEach((file, i) => {
      const formdata = new FormData();
      formdata.append("file", file.URL);
      formdata.append("upload_preset", "product_image");
      //formdata.append("public_id", `${productId}/${i}`);
      //formdata.append("upload_preset", "product_image");
      formdata.append("public_id_prefix", `HYD/products/${productId}`);
      promises.push(axios.post(URL, formdata));
    });

    try {
      const responses = await Promise.all(promises);
      responses.forEach(async ({ data },  index) => {
        console.log(data);
        /* eslint-disable */
        const { secure_url, assetId, public_id } = data;
        await APIHydro.addProductImg({ path: secure_url, assetId, publicId: public_id, productId, index });
        toast.success(`Se subío la imagen correctamente`);
      });
      /* eslint-enable */
      //setLoader(false);
      //navigate("/admin/dashboard");
    } catch (err) {
      //setLoader(false);
      console.log(err);
    }
  }

  return (
    <Modal panelSize="min-w-full" isOpen={Boolean(modal)} onClose={() => setModal(false)}>
      <section className="flex flex-col gap-2 ">
        <div className="text-center">
          <span className="my-2 flex items-center justify-between border-b-2 border-b-gold">
            <p className="text-lg text-gold">{modal?.product?.id}</p>
            <p className="text-lg text-gold">{modal?.product?.name}</p>
          </span>
          <h1 className="w-fit border-b-2 border-dashed">Imagenes previas: {modal?.prevImgs?.length}</h1>
          {modal.prevImgs?.length
            ? modal.prevImgs.map((img, i) => (
                <div className="rounded border-2" key={i}>
                  <span className="flex justify-between px-0.5 ">
                    <p className="left-0.5 top-0 mx-0.5 text-2xl font-bold text-white">{i}</p>
                    <i
                      onClick={() => deleteLocalImg(img?.id)}
                      className="ri-close-circle-line right-[1px] top-0 mx-0.5  text-3xl text-red-600"
                    ></i>
                  </span>
                  <p className=" overflow-hidden">{img?.originalName}</p>
                  <img className="mx-auto aspect-square w-[75px]" src={img?.path} key={i} />
                </div>
              ))
            : null}
        </div>
        <div className=" min-w text-center">
          <h1 className="mr-auto w-fit border-b-2 border-dashed">
            Imagenes por cargar: {Object.values(newImgs)?.length}
          </h1>
          {newImgs && Object.values(newImgs)?.length ? (
            <picture className="mt-6 grid grid-cols-8 gap-4 border-2 border-red-500">
              {Object.values(newImgs)?.map((img, i) => {
                return (
                  <div className="rounded border-2" key={i}>
                    <span className="flex justify-between px-0.5 ">
                      <p className="left-0.5 top-0 mx-0.5 text-2xl font-bold text-white">{i}</p>
                      <i
                        onClick={() => deleteLocalImg(img?.originalName)}
                        className="ri-close-circle-line right-[1px] top-0 mx-0.5  text-3xl text-red-600"
                      ></i>
                    </span>
                    <p className=" overflow-hidden">{img?.originalName}</p>
                    <img className="mx-auto aspect-square max-w-[100px]" src={img.URL} key={i} />
                  </div>
                );
              })}
            </picture>
          ) : null}
        </div>
      </section>
      <div className="mx-auto mt-8 flex flex-row justify-around">
        <label
          htmlFor="upload-images"
          className="bg-blue-500 relative inline-block cursor-pointer rounded-xl border-2 border-blue bg-slate-700 p-1 px-8 hover:bg-opacity-70"
        >
          <p className="inline-block py-2 text-lg font-bold text-white">Seleccionar Imagenes</p>
          <input
            type="file"
            id="upload-images"
            accept="image/*"
            multiple
            title="Cargar imagenes"
            className="invisible absolute right-0 top-0 h-full w-full border-2"
            onChange={handleImgs}
          />
        </label>
        <button
          onClick={() => uploadImgs(Object.values(newImgs), modal.product.id)}
          className="rounded-xl border-2 border-green-900 bg-green-700 px-8 py-3 font-secondary text-lg font-bold text-white hover:bg-opacity-70"
        >
          Subir imagenes
        </button>
      </div>
    </Modal>
  );
}
