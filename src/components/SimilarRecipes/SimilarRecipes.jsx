"use client";

import { useRouter } from "next/navigation";

const SimilarRecipes = ({ recipes = [], isLoading = false, error = "" }) => {
  const router = useRouter();

  const handleCardClick = (id) => {
    if (!id) return;
    router.push(`/recipe/${id}`);
  };

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold text-center mb-6">Other Recipes</h2>

      {isLoading && (
        <p className="text-center text-gray-500 mb-4">Loading...</p>
      )}

      {error && !isLoading && (
        <p className="text-center text-red-500 mb-4">{error}</p>
      )}

      {recipes.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {recipes.map((recipe) => (
            <button
              key={recipe._id || recipe.name}
              type="button"
              onClick={() => handleCardClick(recipe._id)}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden text-left"
            >
              {recipe.img && (
                <div className="w-full h-40 overflow-hidden">
                  <img
                    src={recipe.img}
                    alt={recipe.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
              )}
              <div className="p-3">
                <h5 className="text-center font-medium text-gray-900 group-hover:text-orange-500">
                  {recipe.name}
                </h5>
              </div>
            </button>
          ))}
        </div>
      ) : (
        !isLoading &&
        !error && (
          <p className="text-center text-gray-500">
            No similar recipes available.
          </p>
        )
      )}
    </section>
  );
};

export default SimilarRecipes;
