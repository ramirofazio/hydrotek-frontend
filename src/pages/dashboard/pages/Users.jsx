import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { TableRow } from "./index";
import { APIHydro } from "src/api";
import { Loader } from "src/components";
import { useSelector } from "react-redux";

const colsTitles = ["nombre", "email", "dni", "rol", "ordenes", "estado"];

export function Users() {
  const { users } = useLoaderData();

  const user = useSelector((s) => s.user);

  const [thisUsers, setThisUsers] = useState(users);
  const [loader, setLoader] = useState(false);

  const handleAdmin = async (id, name, type) => {
    const res = confirm(
      `¿Seguro que quieres ${type === "ADMIN" ? "negar" : "conceder"} permisos de admin a ${name.toUpperCase()}?`
    );

    if (user.session.id === id) {
      alert("¡No puedes modificarte a ti mismo!");
      //! REMPLAZAR ALERT POR TOAST
      return;
    }

    if (res) {
      setLoader(true);
      try {
        const res = await APIHydro.alternAdmin(id, user.session);
        if (res) {
          //! TOAST

          console.log(res);
          setThisUsers(res);
          setLoader(false);
        }
      } catch (e) {
        console.log(e);
        setLoader(false);
      }
    }
  };

  return (
    <main className="w-full">
      {loader && <Loader />}
      <table className="my-4 w-full text-white">
        <thead className="border border-gold">
          <tr className="goldGradient text-base uppercase">
            {colsTitles.map((t, index) => (
              <th className="border-r-2 border-r-blue px-2 py-2 text-xs last:border-none" key={index}>
                {t}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {thisUsers.map(({ id, name, dni, email, role: { type }, active, _count: { orders } }) => (
            <tr key={id} className="even:bg-gold/10">
              <TableRow content={name} style="text-start capitalize" />
              <TableRow content={email} style="text-start" />
              <TableRow content={dni} />
              <TableRow
                content={
                  <i
                    className={`icons ri-user-${
                      type === "ADMIN" ? "star-line textGoldGradient" : "line text-white"
                    } text-2xl`}
                    onClick={() => handleAdmin(id, name, type)}
                  />
                }
              />
              <TableRow content={orders} />
              <TableRow
                content={
                  <i
                    className={`ri-${active ? "check" : "close"}-fill text-2xl ${
                      active ? "text-green-500" : "text-red-500"
                    }`}
                  />
                }
              />
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
