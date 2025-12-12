import { getAllProductsAction } from "@/actions/product";
import { getSession } from "@/lib/session";
import RecipePage from "@/components/RecipePage/RecipePage";

const RandomRecipePage = async () => {
  const session = await getSession();

  // 🟠 1) recupero tutti i prodotti
  const data = await getAllProductsAction();
  const products = data.products || [];

  if (products.length === 0) {
    return <p className="p-10 text-center">No products available.</p>;
  }

  // 🟠 2) seleziono uno a caso
  const randomProduct = products[Math.floor(Math.random() * products.length)];

  // 🟠 3) similar recipes → gli altri prodotti (escludo quello scelto)
  const similarRecipes = products.filter((p) => p._id !== randomProduct._id);

  return (
    <RecipePage
      session={session}
      product={randomProduct}
      similarRecipes={similarRecipes.slice(0, 6)}
      isLoading={false}
      error={null}
    />
  );
};

export default RandomRecipePage;
