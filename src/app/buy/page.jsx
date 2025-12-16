import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Disclaimer from "@/components/Disclaimer/Disclaimer";
import WrappedOrderForm from "@/components/WrappedOrderForm/WrappedOrderForm";
import { getSession } from "@/lib/session";

export const metadata = {
  title: "Carrello e Acquisto | Sicilian Taste",
  description:
    "Completa il tuo acquisto su Sicilian Taste e ricevi prodotti siciliani autentici direttamente a casa tua.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/buy",
  },
};

const BuyPage = async () => {
  const session = await getSession();

  return (
    <>
      <Navbar session={session} />

      <div className="max-w-6xl mx-auto px-4 mt-6">
        <WrappedOrderForm session={session} />
      </div>

      <Disclaimer />
      <Footer />
    </>
  );
};

export default BuyPage;
