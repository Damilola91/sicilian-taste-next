import CategoryProducts from "@/components/CategoryProducts/CategoryProducts";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Disclaimer from "@/components/Disclaimer/Disclaimer";
import { getProductsByCategoryAction } from "@/actions/product";
import { getSession } from "@/lib/session";

export async function generateMetadata({ params }) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);

  const title = `${decodedCategory} artigianali siciliani | Sicilian Taste`;
  const description = `Scopri i migliori prodotti siciliani artigianali della categoria ${decodedCategory}. Presìdi Slow Food, ricette tradizionali e specialità autentiche selezionate da Sicilian Taste.`;

  return {
    title,
    description,

    alternates: {
      canonical: `/categories/${category}`,
    },

    openGraph: {
      title,
      description,
      url: `https://sicilian-taste-next.vercel.app/categories/${category}`,
      siteName: "Sicilian Taste",
      locale: "it_IT",
      type: "website",
      images: [
        {
          url: "/og-category.jpg",
          width: 1200,
          height: 630,
          alt: `Categoria ${decodedCategory} | Sicilian Taste`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-category.jpg"],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

const CategoryPage = async (props) => {
  const { category } = await props.params;
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
