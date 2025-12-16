export const metadata = {
  title: "Categorie prodotti siciliani | Sicilian Taste",
  description:
    "Esplora tutte le categorie di prodotti siciliani artigianali: dolci, conserve, vini, olio e specialità locali.",
  alternates: {
    canonical: "/categories",
  },
};

import { getSession } from "@/lib/session";
import CategoryPage from "@/components/CategoryPage/CategoryPage";

const CategoriesRoute = async () => {
  const session = await getSession();
  return <CategoryPage session={session} />;
};

export default CategoriesRoute;
