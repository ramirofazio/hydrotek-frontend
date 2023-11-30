import { useState } from "react";
import { Modal, Loader } from "src/components";
import { toast } from "react-hot-toast";
import axios from "axios";
import { APIHydro } from "src/api";
import { useNavigate } from "react-router-dom";

export function UploadProductImgs({ modal, setModal }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [newImgs, setNewImgs] = useState([]);

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

  async function deleteDbImg(img) {
    try {
      setLoader(true);
      const { id, publicId } = img;
      await APIHydro.deleteProductImg({ productImgId: id, publicId });
      setLoader(false);
      setModal(false);
      toast.success("Se borraron las imgs del producto");
      navigate(0);
    } catch (e) {
      setLoader(false);
      console.log(e);
      toast.error("Error al borrar imgs");
    }
  }

  async function deleteAllProductImg(productId) {
    try {
      setLoader(true);
      await APIHydro.deleteAllProductImg(productId);
      setLoader(false);
      setModal(false);
      navigate(0);
      toast.success("Se borraron las imgs del producto");
    } catch (e) {
      setLoader(false);
      console.log(e);
    }
  }

  async function uploadImgs(files = [], productId) {
    setLoader(true);
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

    const URL = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    const promises = [];

    files.forEach((file) => {
      const formdata = new FormData();
      formdata.append("file", file.URL);
      formdata.append("upload_preset", "product_image");
      formdata.append("public_id_prefix", `HYD/products/${productId}`);
      promises.push(axios.post(URL, formdata));
      //formdata.append("public_id", `${productId}/${i}`); // ? Util en casos particulares
    });

    try {
      const responses = await Promise.all(promises);
      responses.forEach(async ({ data }, index) => {
        /* eslint-disable */
        const { secure_url, assetId, public_id } = data;
        await APIHydro.addProductImg({ path: secure_url, assetId, publicId: public_id, productId, index });
        /* eslint-enable */
      });
      setLoader(false);
      toast.success(`Se subieron las img correctamente`);
      setModal(false);
      navigate(0);
    } catch (err) {
      toast.error("Error al subir fotos");
      setLoader(false);
      console.log(err);
    }
  }

  return (
    <Modal panelSize="min-w-full" isOpen={Boolean(modal)} onClose={() => setModal(false)}>
      {loader && <Loader />}
      <section className="flex flex-col gap-2 ">
        <div className="text-center">
          <span className="my-2 flex items-center justify-between border-b-2 border-b-gold">
            <p className="text-lg text-gold">{modal?.product?.id}</p>
            <p className="text-lg text-gold">{modal?.product?.name}</p>
          </span>
          <div className="flex items-center ">
            <h1 className="w-fit border-b-2 border-dashed">Imagenes previas: {modal?.prevImgs?.length}</h1>
            <button
              disabled={modal.prevImgs?.length ? false : true}
              onClick={() => deleteAllProductImg(modal?.product?.id)}
              className="mx-auto mt-2 rounded-lg border-2 border-red-700 bg-slate-800 p-2 px-4 text-white hover:text-red-600 disabled:opacity-50 disabled:hover:text-white "
            >
              Borrar todas las imagenes previas
            </button>
          </div>
          {modal.prevImgs?.length ? (
            <div className="my-2 flex flex-row gap-5">
              {modal.prevImgs.map((img, i) => (
                <div className="w-fit rounded border-2 " key={i}>
                  <span className="ml-auto justify-between px-0.5 ">
                    <i
                      onClick={() => deleteDbImg(img)}
                      className="ri-close-circle-line right-[1px] top-0 mx-0.5  text-4xl text-red-600"
                    ></i>
                  </span>
                  <img className="mx-auto aspect-square w-[75px]" src={img?.path} key={i} />
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <div className=" min-w text-center">
          <h1 className="mr-auto w-fit border-b-2 border-dashed">
            Imagenes por cargar: {Object.values(newImgs)?.length}
          </h1>
          {newImgs && Object.values(newImgs)?.length ? (
            <picture className="mt-6 grid grid-cols-8 gap-4 ">
              {Object.values(newImgs)?.map((img, i) => {
                return (
                  <div className="flex flex-col justify-between rounded border-2 p-0.5" key={i}>
                    <p className=" overflow-hidden">{img?.originalName}</p>
                    <span className="flex justify-between px-0.5 ">
                      <p className="left-0.5 top-0 mx-0.5 text-3xl font-bold text-white">{i}</p>
                      <i
                        onClick={() => deleteLocalImg(img?.originalName)}
                        className="ri-close-circle-line right-[1px] top-0 mx-0.5  text-4xl text-red-600"
                      ></i>
                    </span>
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
          disabled={newImgs && Object.values(newImgs).length ? false : true}
          onClick={() => uploadImgs(Object.values(newImgs), modal.product.id)}
          className="rounded-xl border-2 border-green-900 bg-green-700 px-8 py-3 font-secondary text-lg font-bold text-white hover:bg-opacity-70 disabled:opacity-50"
        >
          Subir imagenes
        </button>
      </div>
    </Modal>
  );
}
