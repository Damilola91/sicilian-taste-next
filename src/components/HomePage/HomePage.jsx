import Disclaimer from "../../Disclaimer/Disclaimer";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import Main from "../../Main/Main";
import Navbar from "../../Navbar/Navbar";

const HomePage = ({ session }) => {
  return (
    <>
      <Navbar session={session} />
      <Header />
      <Main />
      <Disclaimer />
      <Footer />
    </>
  );
};

export default HomePage;
