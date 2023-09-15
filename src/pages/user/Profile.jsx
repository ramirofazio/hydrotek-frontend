import { borders, logos } from "src/assets";

export function Profile() {
  return (
    <main className="grid gap-10">
      <section className="my-2 flex items-center justify-between px-6">
        <h1 className="text-2xl">MI CUENTA</h1>
        <div className="goldGradient relative rounded-full p-7">
          <i className="ri-logout-box-r-line icons absolute inset-0 flex items-center justify-center text-2xl text-white" />
        </div>
      </section>
      <section className="relative grid place-content-center place-items-center">
        <img src={borders.profile} className="absolute left-5 top-0 w-48" />
        <div className="my-16 grid place-items-center gap-6">
          <img src={logos.hydBlack} className="w-28" />
          <h1 className="textGoldGradient text-2xl">John Doe</h1>
        </div>
        <img src={borders.profile} className="absolute bottom-0 right-5 w-48 rotate-180" />
      </section>
      <section></section>
    </main>
  );
}
