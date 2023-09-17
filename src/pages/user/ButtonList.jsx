export function ButtonList({ selectedBtn, setSelectedBtn, t }) {
  const buttons = [
    { icon: "ri-user-3-fill", text: t("profile.my-data"), state: "MyData" },
    { icon: "ri-shopping-cart-2-fill", text: t("profile.my-buys"), state: "MyBuys" },
    { icon: "ri-bookmark-fill", text: t("profile.my-saved-posts"), state: "MySavedPosts" },
  ];
  return (
    <section className="grid gap-6 p-4">
      {buttons.map(({ icon, text, state }, index) => (
        <div
          key={index}
          className={`h- flex flex-col justify-center rounded-xl border-2 border-gold px-4 py-3 text-center transition ${
            selectedBtn === state ? "border-none bg-gold-gradient" : "cursor-pointer opacity-30"
          }`}
          onClick={() => setSelectedBtn(state)}
        >
          <i className={`${icon} text-3xl text-white`} />
          <h1 className="text-lg leading-5">{text}</h1>
        </div>
      ))}
    </section>
  );
}
