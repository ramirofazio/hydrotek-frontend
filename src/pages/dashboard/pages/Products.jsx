import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { TableRow } from "./index";
import { APIHydro } from "src/api";
import { UploadProductImgs } from "./UploadProductImgs";
import { categories } from "src/utils";
import { error, success } from "src/components/notifications";
import { UpdateProductPromCodes } from "./UpdateProductPromCodes";

const colsTitles = [
  "id",
  "nombre",
  "precio",
  "ultima actualización",
  "publicado",
  "destacado",
  "subir imagen",
  "categoría",
  "Cupones vinculados",
];

export function Products() {
  const navigate = useNavigate();
  const { products, _promotionalCodes } = useLoaderData();
  const [imgModal, setImgModal] = useState(false);
  const [couponModal, setCouponModal] = useState(false);
  const [related, setRelated] = useState([]);

  async function handleAddFeaturedProduct(productId, productName, productPrice) {
    if (!productPrice) return error("No podes activar un producto sin precio");

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

  async function handleToggleActive(productId, productName, productPrice) {
    if (!productPrice) return error("No podes activar un producto sin precio");

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
  function handleCodesModal(productId, promotionalCodes) {
    setRelated({ productId, promotionalCodes });
    setCouponModal(true);
  }

  return (
    <main className="w-full">
      <UploadProductImgs modal={imgModal} setModal={setImgModal} />
      <UpdateProductPromCodes
        related={related}
        allCodes={_promotionalCodes}
        modal={couponModal}
        setModal={setCouponModal}
      />
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
          {products.map(({ id, arsPrice, name, published, updated, images, featured, typeId, promotionalCodes }) => {
            return (
              <tr key={id} className="even:bg-gold/10">
                <TableRow content={id} />
                <TableRow content={name} style />
                <TableRow
                  content={arsPrice.toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS",
                  })}
                  style={`text-left ${arsPrice === 0 && "bg-red-500/20"}`}
                />
                <TableRow content={updated} />
                <TableRow
                  content={
                    <i
                      className={`ri-${published ? "check" : "close"}-fill icons text-2xl text-${
                        published ? "green" : "red"
                      }-500`}
                      onClick={() => handleToggleActive(id, name, arsPrice)}
                    />
                  }
                />
                <TableRow
                  content={
                    <i
                      className={`ri-${featured ? "star-s-fill" : "star-s-line"} icons text-2xl text${
                        featured ? "GoldGradient" : "-red-500"
                      }`}
                      onClick={() => handleAddFeaturedProduct(id, name, arsPrice)}
                    />
                  }
                />

                <TableRow
                  onClick={() => setImgModal({ prevImgs: images, product: { id, name } })}
                  content={<i className="icons ri-image-2-fill text-2xl"> {images?.length}</i>}
                />

                <TableRow
                  content={
                    <select onChange={(e) => handleCategory(e, id, name)} className="text-black">
                      <option value={0}>Seleccione</option>
                      {categories.map((c, i) => (
                        <option selected={c.id && c.id === typeId ? true : false} key={i} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  }
                />
                <TableRow
                  content={
                    <div
                      onClick={() => {
                        handleCodesModal(id, promotionalCodes);
                      }}
                      className="mx-auto w-fit"
                    >
                      <i className="ri-coupon-2-fill icons text-2xl"> {promotionalCodes?.length || 0}</i>
                    </div>
                  }
                  style
                />
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
