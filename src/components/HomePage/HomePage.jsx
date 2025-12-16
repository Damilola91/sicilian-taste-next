import Navbar from "@/components/Navbar/Navbar";
import HeaderClient from "@/components/HeaderClient/HeaderClient";
import MainComponent from "@/components/MainComponent/MainComponent";
import Footer from "@/components/Footer/Footer";
import HomeAboutSection from "../HomeAboutSection/HomeAboutSection";
import Disclaimer from "@/components/Disclaimer/Disclaimer";

const HomePage = ({ session, products, searchResults, searchQuery }) => {
  return (
    <>
      <Navbar session={session} />
      <HeaderClient products={products} />
      <HomeAboutSection />
      <MainComponent
        products={products}
        searchResults={searchResults}
        searchQuery={searchQuery}
      />
      <Disclaimer />
      <Footer />
    </>
  );
};

export default HomePage;
