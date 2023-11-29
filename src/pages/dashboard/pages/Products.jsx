import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { TableRow } from "./index";
import { Modal } from "src/components";
import axios from "axios";
import { APIHydro } from "src/api";
import { toast } from "react-hot-toast";
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
  async function deleteProductImg(productId) {
    try {
      await APIHydro.deleteProductImg(productId);
      setModal(false);
      navigate("/admin/dashboard");
    } catch (e) {
      console.log(e);
    }
  }

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
                    onClick={() => setModal({ prevImgs: images, product: { id, name } })}
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

// function UploadProductImg({ modal, setModal }) {
//   const [newImgs, setNewImgs] = useState([]);

//   useEffect(() => {
//     console.log(newImgs);
//   }, [newImgs]);

//   const handleImgs = ({ target }) => {
//     const files = target.files;
//     if (!files) return;

//     for (let i = 0; i < files.length; i++) {
//       const file = files[i];
//       if (!file) continue;

//       const reader = new FileReader();

//       reader.onload = () => {
//         setNewImgs((prev) => {
//           return {
//             ...prev,
//             [file.name]: {
//               originalName: file.name,
//               URL: typeof reader.result === "string" ? reader.result : "",
//               file: file,
//               size: file.size,
//             },
//           };
//         });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   function deleteImg(fileName) {
//     setNewImgs((prev) => {
//       let previusImgs = { ...prev };
//       delete previusImgs[fileName];
//       return previusImgs;
//     });
//   }

//   async function uploadImgs(files = [], productId) {
//     //setLoader(true);
//     const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

//     const URL = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
//     const promises = [];

//     files.forEach((file, i) => {
//       const formdata = new FormData();
//       formdata.append("file", file.URL);
//       formdata.append("upload_preset", "product_image");
//       formdata.append("public_id", `${productId}/${i}`);
//       promises.push(axios.post(URL, formdata));
//     });

//     try {
//       const responses = await Promise.all(promises);
//       responses.forEach(async ({ data }) => {
//         console.log(data);
//         /* eslint-disable */
//         const { secure_url, assetId, public_id } = data;
//         const api = await APIHydro.addProductImg({ path: secure_url, assetId, publicId: public_id, productId });
//         console.log(api);
//       });
//       /* eslint-enable */
//       //setLoader(false);
//       //navigate("/admin/dashboard");
//     } catch (err) {
//       //setLoader(false);
//       console.log(err);
//     }
//   }

//   return (
//     <Modal panelSize="min-w-full" isOpen={Boolean(modal)} onClose={() => setModal(false)}>
//       <section className="flex flex-col gap-2 ">
//         <div className="text-center">
//           <span className="my-2 flex items-center justify-between border-b-2 border-b-gold">
//             <p className="text-lg text-gold">{modal?.product?.id}</p>
//             <p className="text-lg text-gold">{modal?.product?.name}</p>
//           </span>
//           <h1 className="w-fit border-b-2 border-dashed">Imagenes previas: {modal?.prevImgs?.length}</h1>
//           {modal.prevImgs?.length
//             ? modal.prevImgs.map((i, index) => {
//                 return <img className="w-[50px]" key={index} src={i} alt="" />;
//               })
//             : null}
//         </div>
//         <div className=" min-w text-center">
//           <h1 className="mr-auto w-fit border-b-2 border-dashed">
//             Imagenes por cargar: {Object.values(newImgs)?.length}
//           </h1>
//           {newImgs && Object.values(newImgs)?.length ? (
//             <picture className="mt-6 grid grid-cols-8 gap-4 border-2 border-red-500">
//               {Object.values(newImgs)?.map((img, i) => {
//                 console.log("img" + i, img);
//                 return (
//                   <div className="rounded border-2" key={i}>
//                     <span className="flex justify-between px-0.5 ">
//                       <p className="left-0.5 top-0 mx-0.5 text-2xl font-bold text-white">{i}</p>
//                       <i
//                         onClick={() => deleteImg(img?.originalName)}
//                         className="ri-close-circle-line right-[1px] top-0 mx-0.5  text-3xl text-red-600"
//                       ></i>
//                     </span>
//                     <p className=" overflow-hidden">{img?.originalName}</p>
//                     <img className="mx-auto aspect-square max-w-[100px]" src={img.URL} key={i} />
//                   </div>
//                 );
//               })}
//             </picture>
//           ) : null}
//         </div>
//       </section>
//       <div className="mx-auto mt-8 flex flex-row justify-around">
//         <label
//           htmlFor="upload-images"
//           className="bg-blue-500 relative inline-block cursor-pointer rounded-xl border-2 border-blue bg-slate-700 p-1 px-8 hover:bg-opacity-70"
//         >
//           <p className="inline-block py-2 text-lg font-bold text-white">Seleccionar Imagenes</p>
//           <input
//             type="file"
//             id="upload-images"
//             accept="image/*"
//             multiple
//             title="Cargar imagenes"
//             className="invisible absolute right-0 top-0 h-full w-full border-2"
//             onChange={handleImgs}
//           />
//         </label>
//         <button
//           onClick={() => uploadImgs(Object.values(newImgs), modal.product.id)}
//           className="rounded-xl border-2 border-green-900 bg-green-700 px-8 py-3 font-secondary text-lg font-bold text-white hover:bg-opacity-70"
//         >
//           Subir imagenes
//         </button>
//       </div>
//     </Modal>
//   );
// }

// async function uploadProductImage(file, productId, setLoader) {
//   try {
//     setLoader(true);
//     const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

//     const URL = "https://api.cloudinary.com/v1_1/" + cloudName + "/image/upload";

//     const formdata = new FormData();
//     formdata.append("file", file);
//     formdata.append("upload_preset", "product_image");
//     formdata.append("public_id", productId);

//     /* eslint-disable */
//     const { secure_url, assetId, public_id } = (await axios.post(URL, formdata)).data;
//     await APIHydro.addProductImg({ path: secure_url, assetId, publicId: public_id, productId });
//     /* eslint-enable */

//     setLoader(false);
//     navigate("/admin/dashboard");
//   } catch (err) {
//     setLoader(false);
//     console.log(err);
//   }
// }

// function handleImages({ target }) {
//   const files = target.files;
//   if (!files) return;
//   const rawImgs = {};
//   for (let i = 0; i < files.length; i++) {
//     const file = files[i];
//     if (!file) continue;

//     const reader = new FileReader();

//     reader.onload = () => {
//       rawImgs[file.name] = {
//         originalName: file.name,
//         URL: typeof reader.result === "string" ? reader.result : "",
//         file: file,
//         size: file.size,
//       };
//     };
//     reader.readAsDataURL(file);
//   }
//   console.log(rawImgs);
//   setModal((prev) => {
//     return {
//       ...prev,
//       newImgs: rawImgs,
//     };
//   });
//   /* setModal({
//     ...modal,
//     newImgs: rawImgs,
//   }); */
//   //setNewImgs(rawImgs);
// }
