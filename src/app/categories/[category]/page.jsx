import CategoryProducts from "@/components/CategoryProducts/CategoryProducts";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Disclaimer from "@/components/Disclaimer/Disclaimer";
import { getProductsByCategoryAction } from "@/actions/product";
import { getSession } from "@/lib/session";

const CategoryPage = async (props) => {
  const { category } = await props.params; // ⬅️ Sbloccata la Promise
  const session = await getSession();

  const decodedCategory = decodeURIComponent(category);

  const data = await getProductsByCategoryAction({
    category: decodedCategory,
    page: 1,
    pageSize: 6,
  });

  return (
    <>
      <Navbar session={session} />

      <CategoryProducts
        category={decodedCategory}
        initialProducts={data.products}
        initialPage={1}
        totalPages={data.totalPages}
        totalProducts={data.count}
      />

      <Disclaimer />
      <Footer />
    </>
  );
};

export default CategoryPage;
