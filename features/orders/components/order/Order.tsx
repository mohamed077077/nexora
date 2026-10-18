import Header from "./Header/Header";
import OrderContent from "./Content/OrderContent";
import OrderDialog from "./Dialog/OrderDialog";

export default function Order() {
  return (
    <section className="flex h-full w-full flex-col items-center justify-center gap-6">
      <Header />
      <OrderContent />
      <OrderDialog />
    </section>
  );
}
