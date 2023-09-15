import { borders } from "src/assets";
import { Header, ButtonList } from "./";
import { Avatar } from "src/components/user";
import { useState } from "react";

export function Profile() {
  const [selectedBtn, setSelectedBtn] = useState("MyData");

  return (
    <main className="grid gap-10">
      <Header />
      <section className="relative grid place-content-center place-items-center">
        <img src={borders.profile} className="absolute left-5 top-0 w-48 animate-pulse" />
        <Avatar name={"John Doe"} avatarWidth={"w-24"} className={"my-16"} />
        <img src={borders.profile} className="absolute bottom-0 right-5 w-48 rotate-180 animate-pulse" />
      </section>
      <ButtonList selectedBtn={selectedBtn} setSelectedBtn={setSelectedBtn} />
    </main>
  );
}
