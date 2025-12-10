import Categories from "../../Categories/Categories";
import Disclaimer from "../../Disclaimer/Disclaimer";
import Footer from "../../Footer/Footer";
import Navbar from "../../Navbar/Navbar";

const CategoriesPage = ({ session }) => {
  return (
    <>
      <Navbar session={session} />
      <Categories />
      <Disclaimer />
      <Footer />
    </>
  );
};

export default CategoriesPage;
