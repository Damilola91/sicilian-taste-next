import RecipePage from "@/components/RecipePage/RecipePage";
import { getProductByIdAction, getAllProductsAction } from "@/actions/product";
import { getSession } from "@/lib/session";

export async function generateMetadata({ params }) {
  const { id } = await params;

  try {
    const data = await getProductByIdAction(id);
    const product = data.product || data;

    const title = `${product.name} | Sicilian Taste`;
    const description =
      product.description?.slice(0, 160) ||
      "Scopri un prodotto artigianale siciliano selezionato da Sicilian Taste.";

    return {
      title,
      description,

      alternates: {
        canonical: `/recipe/${id}`,
      },

      openGraph: {
        title,
        description,
        url: `https://www.siciliantaste.it/recipe/${id}`,
        siteName: "Sicilian Taste",
        locale: "it_IT",
        type: "article",
        images: [
          {
            url: product.img,
            width: 1200,
            height: 630,
            alt: product.name,
          },
        ],
      },

      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [product.img],
      },

      robots: {
        index: true,
        follow: true,
      },
    };
  } catch {
    return {
      title: "Prodotto non trovato | Sicilian Taste",
      description: "Il prodotto richiesto non è disponibile o è stato rimosso.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }
}

export default async function RecipeDetailPage({ params }) {
  const { id } = await params;
  const session = await getSession();

  let product = null;
  let error = null;

  try {
    const data = await getProductByIdAction(id);
    product = data.product || data;
  } catch {
    error = "Product not found";
  }

  const all = await getAllProductsAction();
  const allProducts = all.products || [];

  const similarRecipes = allProducts.filter((p) => p._id !== id).slice(0, 6);

  return (
    <RecipePage
      session={session}
      product={product}
      isLoading={false}
      error={error}
      similarRecipes={similarRecipes}
    />
  );
}
