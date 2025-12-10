import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Disclaimer from "@/components/Disclaimer/Disclaimer";
import RecipeHeader from "@/components/RecipePage/RecipeHeader";
import RecipeDetails from "@/components/RecipePage/RecipeDetails";
import SimilarRecipes from "@/components/RecipePage/SimilarRecipes";
import CommentSection from "@/components/RecipePage/CommentSection";

import { getProductByIdAction } from "@/actions/product";
import { getReviewsByProductAction } from "@/actions/reviews";
import { getSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function RecipePage({ params }) {
  const { id } = params;

  // ✔ usa il tuo getSession() corretto
  const session = await getSession();

  let product = null;
  try {
    product = await getProductByIdAction(id);
  } catch (e) {
    product = null;
  }

  let initialReviews = [];
  try {
    const data = await getReviewsByProductAction(id);
    initialReviews = data.reviews || [];
  } catch (e) {}

  if (!product) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-3xl font-semibold">Product not found</h1>
      </div>
    );
  }

  return (
    <>
      <Navbar session={session} />

      <main className="container mx-auto mt-10 px-4">
        <RecipeHeader
          name={product.name}
          img={product.img}
          description={product.description}
        />

        <RecipeDetails
          ingredients={{ crust: product.ingredients }}
          recipe={product.recipe?.split(".").map((s) => s.trim()) || []}
          nutritionFacts={product.nutritionFacts}
        />

        <SimilarRecipes currentProductId={product._id} />

        <hr className="my-10 border-t-4 border-orange-400" />

        <CommentSection
          productId={product._id}
          session={session}
          initialReviews={initialReviews}
        />
      </main>

      <Disclaimer />
      <Footer />
    </>
  );
}
