import { saveInStorage } from "src/utils/localStorage";

export function ButtonList({ selectedBtn, setSelectedBtn, t }) {
  const buttons = [
    { icon: "ri-user-3-fill", text: t("profile.my-data"), state: "MyData" },
    { icon: "ri-shopping-cart-2-fill", text: t("profile.my-buys"), state: "MyBuys" },
    { icon: "ri-bookmark-fill", text: t("profile.my-saved-posts"), state: "MySavedPosts" },
  ];
  return (
    <section className="grid gap-6 p-4 px-6">
      {buttons.map(({ icon, text, state }, index) => (
        <div
          key={index}
          className={`group flex h-28 flex-col justify-center rounded-xl border-2 border-gold px-4 py-3 text-center  transition xl:h-20 xl:flex-row xl:items-center xl:rounded-md ${
            selectedBtn === state ? "border-none bg-gold-gradient" : "cursor-pointer opacity-30 hover:opacity-70"
          }`}
          onClick={() => {
            setSelectedBtn(state);
            saveInStorage("selectedBtn", state);
          }}
        >
          <div className="xl:flex xl:w-full xl:items-center xl:justify-start xl:pl-8">
            <i className={`${icon}  text-3xl text-white transition xl:mr-10`} />
            <h1 className="text-lg leading-5">{text}</h1>
          </div>
          <i className="ri-arrow-right-s-line group-hover:textGoldGradient hidden text-3xl text-white transition xl:inline" />
        </div>
      ))}
    </section>
  );
}
