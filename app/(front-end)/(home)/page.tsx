
import Product from "@/features/products/components/Product";
import Logo from "@/shared/components/Logo";
import CartButton from "@/features/orders/components/cart/CartButton";
import Hero from "./Hero";
import Link from "next/link";
export default function Home() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 lg:px-8 flex flex-col gap-5">
      <header className="flex h-12 items-center justify-between">
        <Logo />
        <Link href="/cart"><CartButton ariaLabel="Open shopping cart" showBadge /></Link>
      </header>
      <Hero />
      <Product isAdmin={false} />
    </main>
  );
}
