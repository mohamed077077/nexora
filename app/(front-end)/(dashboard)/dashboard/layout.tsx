import DashboardNav from "@/shared/components/DashboardNav";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen  flex">
      <DashboardNav />
      <main className="px-15 pt-12 pb-6 w-full h-full">{children}</main>
    </div>
  );
}