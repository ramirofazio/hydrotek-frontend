import { Pages, DashboardHeader } from ".";

export function Dashboard() {
  return (
    <main className="grid h-screen  gap-4 p-8">
      <DashboardHeader />
      <Pages />
    </main>
  );
}
