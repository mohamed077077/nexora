import DashboardNav from "@/shared/components/dashboard/DashboardNav";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen  flex">
      <DashboardNav />
      <main className="px-4 md:px-8 lg:px-15 pt-12 pb-6 w-full min-w-0 h-full overflow-x-hidden">{children}</main>
    </div>
  );
}