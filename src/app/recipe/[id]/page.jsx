import RecipePage from "@/components/RecipePage/RecipePage";
import { getProductByIdAction, getAllProductsAction } from "@/actions/product";
import { getSession } from "@/lib/session";

export default async function RecipeDetailPage({ params }) {
  const { id } = await params;
  const session = await getSession();

  // 🟠 1) prendo il prodotto richiesto
  let product = null;
  let error = null;

  try {
    const data = await getProductByIdAction(id);
    product = data.product || data;
  } catch (err) {
    error = "Product not found";
  }

  // 🟠 2) tutti i prodotti per similar recipes
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
