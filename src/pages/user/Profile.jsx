import { borders } from "src/assets";
import { Header, ButtonList, MyBuys, MyData, MySavedPosts } from "./";
import { Avatar } from "src/components/user";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { deleteOfStorage, getOfStorage } from "src/utils/localStorage";

export function Profile() {
  const { t } = useTranslation();
  const user = useSelector((state) => state.user);

  const componentMapping = {
    MyData: <MyData />,
    MyBuys: <MyBuys />,
    MySavedPosts: <MySavedPosts userId={user.session.id} />,
  };

  const [selectedBtn, setSelectedBtn] = useState(() => {
    const local = getOfStorage("selectedBtn");
    if (local) {
      return local;
    }
    return "MyData";
  });
  const selectedSection = componentMapping[selectedBtn];

  return (
    <main className="grid h-screen gap-10 lg:my-4 lg:grid-cols-2 xl:mx-20">
      <Header t={t} />
      <section className=" lg:flex lg:flex-col lg:gap-20 lg:border-r-2 lg:border-gold lg:pr-10">
        <div className="relative grid place-content-center place-items-center">
          <img
            src={borders.profile}
            className="absolute left-5 top-0  w-48 animate-pulse sm:!left-40  lg:!left-10 xl:!left-20 xs:left-12"
          />
          <Avatar
            name={user.session.name}
            avatarWidth={"w-24 lg:w-40"}
            className={"my-16 xl:my-20"}
            avatar={user.profile.avatar}
          />
          <img
            src={borders.profile}
            className="absolute bottom-0 right-5 w-48 rotate-180 animate-pulse sm:!right-40 lg:!right-10 xl:!right-20 xs:right-12"
          />
        </div>
        <ButtonList selectedBtn={selectedBtn} setSelectedBtn={setSelectedBtn} t={t} />
      </section>
      <div className="mx-8 border-b-2 border-gold lg:hidden" />
      <section className="grid place-items-center">{selectedSection}</section>
    </main>
  );
}
