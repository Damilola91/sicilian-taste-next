import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import RecipeHeader from "../RecipeHeader/RecipeHeader";
import RecipeDetails from "../RecipeDetails/RecipeDetails";
import SimilarRecipes from "../SimilarRecipes/SimilarRecipes";
import CommentSection from "../CommentSection/CommentSection";
import Disclaimer from "../Disclaimer/Disclaimer";

const RecipePage = ({
  session,
  product,
  isLoading = false,
  error = "",
  similarRecipes = [],
}) => {
  return (
    <>
      <Navbar session={session} />

      <div className="max-w-6xl mx-auto px-4 py-10">
        {isLoading && (
          <p className="text-center text-gray-500 mb-4">Loading...</p>
        )}

        {error && !isLoading && (
          <p className="text-center text-red-500 mb-6">{error}</p>
        )}

        {product ? (
          <>
            <RecipeHeader
              name={product.name}
              img={product.img}
              description={product.description}
            />

            <RecipeDetails
              ingredients={{ crust: product.ingredients || [] }}
              recipe={
                (product.recipe || "")
                  .split(".")
                  .map((step) => step.trim())
                  .filter(Boolean) // niente step vuoti
              }
              nutritionFacts={product.nutritionFacts || {}}
            />

            <SimilarRecipes recipes={similarRecipes} />

            <div className="border-t border-orange-300 my-10" />

            <CommentSection productId={product._id} session={session} />
          </>
        ) : (
          !isLoading && (
            <p className="text-center text-gray-600">No products available.</p>
          )
        )}
      </div>

      <Disclaimer />
      <Footer />
    </>
  );
};

export default RecipePage;
