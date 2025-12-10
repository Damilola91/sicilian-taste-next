import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import RecipeHeader from "./RecipeHeader";
import RecipeDetails from "./RecipeDetails";
import SimilarRecipes from "./SimilarRecipes";
import CommentsSection from "./CommentSection";
import Disclaimer from "../Disclaimer/Disclaimer";
import "./RecipePage.css";

const RecipePage = ({ session, product, isLoading, error, similarRecipes }) => {
  return (
    <>
      <Navbar session={session} />

      <div className="container mt-5">
        {isLoading && <p>Loading...</p>}
        {error && <p className="text-danger">{error}</p>}

        {product ? (
          <>
            <RecipeHeader
              name={product.name}
              img={product.img}
              description={product.description}
            />

            <RecipeDetails
              ingredients={{ crust: product.ingredients }}
              recipe={product.recipe.split(".").map((step) => step.trim())}
              nutritionFacts={product.nutritionFacts}
            />

            <SimilarRecipes recipes={similarRecipes} />

            <hr style={{ borderTop: "3px solid orange" }} />

            {/* 🔥 Commenti come nel progetto originale */}
            <CommentsSection productId={product._id} session={session} />
          </>
        ) : (
          !isLoading && <p>No products available.</p>
        )}
      </div>

      <Disclaimer />
      <Footer />
    </>
  );
};

export default RecipePage;
