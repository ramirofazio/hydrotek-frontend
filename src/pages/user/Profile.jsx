import { borders } from "src/assets";
import { Header, ButtonList, MyBuys, MyData, MySavedPosts } from "./";
import { Avatar } from "src/components/user";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const componentMapping = {
  MyData: <MyData />,
  MyBuys: <MyBuys />,
  MySavedPosts: <MySavedPosts />,
};

export function Profile() {
  const { t } = useTranslation();
  const [selectedBtn, setSelectedBtn] = useState("MyData");

  const selectedSection = componentMapping[selectedBtn] || <MyData />;

  return (
    <main className="mx-6 grid gap-10 lg:grid-cols-2">
      <Header t={t} />
      <div className="lg:flex lg:flex-col lg:justify-between">
        <section className="relative grid place-content-center place-items-center">
          <img
            src={borders.profile}
            className="absolute left-5 top-0  w-48 animate-pulse sm:!left-40  lg:!left-10 xs:left-12"
          />
          <Avatar name={"John Doe"} avatarWidth={"w-24 lg:w-40"} className={"my-16"} />
          <img
            src={borders.profile}
            className="absolute bottom-0 right-5 w-48 rotate-180 animate-pulse sm:!right-40 lg:!right-10 xs:right-12"
          />
        </section>
        <ButtonList selectedBtn={selectedBtn} setSelectedBtn={setSelectedBtn} t={t} />
      </div>
      <section className="lg:">{selectedSection}</section>
    </main>
  );
}
