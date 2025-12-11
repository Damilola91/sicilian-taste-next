import Navbar from "@/components/Navbar/Navbar";
import HeaderClient from "@/components/HeaderClient/HeaderClient";
import MainComponent from "@/components/MainComponent/MainComponent";
import Footer from "@/components/Footer/Footer";
import Disclaimer from "@/components/Disclaimer/Disclaimer";

export default function HomePage({
  session,
  products,
  searchResults,
  searchQuery,
}) {
  return (
    <>
      <Navbar session={session} />
      <HeaderClient products={products} />
      <MainComponent
        products={products}
        searchResults={searchResults}
        searchQuery={searchQuery}
      />
      <Disclaimer />
      <Footer />
    </>
  );
}
