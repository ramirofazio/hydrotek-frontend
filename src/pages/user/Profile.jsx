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
    <main className="grid gap-10 lg:my-10 lg:grid-cols-2 xl:mx-20">
      <Header t={t} />
      <section className="lg:flex lg:flex-col lg:justify-between lg:border-r-2 lg:border-gold lg:pr-10">
        <div className="relative grid place-content-center place-items-center">
          <img
            src={borders.profile}
            className="absolute left-5 top-0  w-48 animate-pulse sm:!left-40  lg:!left-10 xl:!left-44 xs:left-12"
          />
          <Avatar name={"John Doe"} avatarWidth={"w-24 lg:w-40"} className={"my-16"} />
          <img
            src={borders.profile}
            className="absolute bottom-0 right-5 w-48 rotate-180 animate-pulse sm:!right-40 lg:!right-10 xl:!right-44 xs:right-12"
          />
        </div>
        <ButtonList selectedBtn={selectedBtn} setSelectedBtn={setSelectedBtn} t={t} />
      </section>
      <section>{selectedSection}</section>
    </main>
  );
}
