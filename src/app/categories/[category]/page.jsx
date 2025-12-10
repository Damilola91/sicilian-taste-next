import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Disclaimer from "@/components/Disclaimer/Disclaimer";
import CategoryProducts from "@/components/CategoryProducts/CategoryProducts";
import { getSession } from "@/lib/session";
import { getProductsByCategoryAction } from "@/actions/product";

export default async function CategoryPage({ params }) {
  const { category } = params;
  const session = await getSession();

  // Prima pagina caricata lato server (SEO)
  const data = await getProductsByCategoryAction(category, 1, 6);

  return (
    <>
      <Navbar session={session} />
      <CategoryProducts
        category={category}
        initialProducts={data.products}
        initialPage={1}
        totalPages={data.totalPages}
        totalProducts={data.count}
        session={session}
      />
      <Disclaimer />
      <Footer />
    </>
  );
}
