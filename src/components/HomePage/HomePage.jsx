import HeaderClient from "@/components/HeaderClient/HeaderClient";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Disclaimer from "@/components/Disclaimer/Disclaimer";
import MainComponent from "@/components/MainComponent/MainComponent";

import { getAllProductsAction } from "@/actions/product";
import { getSession } from "@/lib/session";

export default async function HomePage() {
  // 🔹 SESSION dal cookie (SSR)
  const session = await getSession();

  // 🔹 PRODUCTS per header (SSR)
  const data = await getAllProductsAction();
  const products = data?.products || [];

  return (
    <>
      <Navbar session={session} />

      {/* Header è client, quindi gli passo i prodotti */}
      <HeaderClient products={products} />

      <MainComponent session={session} />

      <Disclaimer />
      <Footer />
    </>
  );
}
