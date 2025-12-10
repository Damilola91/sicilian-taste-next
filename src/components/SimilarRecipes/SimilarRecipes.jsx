"use client";

import { useRouter } from "next/navigation";

const SimilarRecipes = ({ recipes = [], isLoading, error }) => {
  const router = useRouter();

  const handleCardClick = (_id) => {
    router.push(`/recipe/${_id}`);
  };

  return (
    <section className="mt-5">
      <h2 className="text-center mb-4">Other Recipes</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      <div className="row g-3">
        {recipes.length > 0
          ? recipes.map((recipe, index) => (
              <div className="col-md-4 col-sm-6" key={index}>
                <div className="card">
                  <img
                    src={recipe.img}
                    alt={recipe.name}
                    className="card-img-top"
                    onClick={() => handleCardClick(recipe._id)}
                  />
                  <div className="card-body">
                    <h5 className="card-name text-center">{recipe.name}</h5>
                  </div>
                </div>
              </div>
            ))
          : !isLoading && <p>No similar recipes available.</p>}
      </div>
    </section>
  );
};

export default SimilarRecipes;
