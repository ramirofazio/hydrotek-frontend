import { GeneralInfo, Pages, DashboardHeader } from ".";

export function Dashboard() {
  return (
    <main className="grid grid-rows-3  place-items-center gap-4 p-8">
      <DashboardHeader />
      <GeneralInfo />
      <Pages />
    </main>
  );
}
