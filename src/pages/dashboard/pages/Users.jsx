import React from "react";
import { useLoaderData } from "react-router-dom";
import { IconButtonWithBgGold } from "src/components/buttons";
import { TableRow } from "./index";

const colsTitles = ["nombre", "email", "dni", "rol", "ordenes", "estado"];

export function Users() {
  const { users } = useLoaderData();

  return (
    <main className="w-full">
      <table className="my-4 w-full text-white">
        <thead className="border border-gold">
          <tr className="goldGradient text-base uppercase">
            {colsTitles.map((t) => (
              <th className="px-6 py-2">{t}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map(({ id, name, dni, email, role: { type }, active, _count: { orders } }) => (
            <tr key={id} className="even:bg-gold/10">
              <TableRow content={name} style="text-start" />
              <TableRow content={email} style="text-start" />
              <TableRow content={dni} />
              <TableRow content={type} />
              <TableRow content={orders} />
              <TableRow
                content={
                  <i
                    className={`ri-${active ? "check" : "close"}-fill text-3xl text-${active ? "green" : "red"}-500`}
                  />
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
