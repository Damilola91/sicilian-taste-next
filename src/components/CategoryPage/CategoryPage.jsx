import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Categories from "../Categories/Categories";
import Disclaimer from "../Disclaimer/Disclaimer";

const CategoryPage = ({ session }) => {
  return (
    <>
      <Navbar session={session} />
      <Categories />
      <Disclaimer />
      <Footer />
    </>
  );
};

export default CategoryPage;
