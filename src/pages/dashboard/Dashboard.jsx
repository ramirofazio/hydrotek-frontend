import { GeneralInfo, Pages, DashboardHeader } from ".";

export function Dashboard() {
  return (
    <main className="grid h-screen grid-rows-6 gap-4 p-8">
      <DashboardHeader />
      <GeneralInfo />
      <Pages />
    </main>
  );
}
