const RecipeDetails = ({ ingredients, recipe, nutritionFacts = {} }) => {
  const { calories, carbs, fat, protein, sugar } = nutritionFacts;

  const ingredientList = ingredients?.crust || [];

  return (
    <section className="mt-10 grid gap-8 md:grid-cols-[1.1fr_2.2fr_1.1fr]">
      {/* INGREDIENTI */}
      <div className="bg-white rounded-2xl shadow-sm p-5 border border-orange-100">
        <h3 className="text-xl font-semibold mb-3 text-gray-900">
          Ingredients
        </h3>
        {ingredientList.length === 0 ? (
          <p className="text-sm text-gray-500">No ingredients available.</p>
        ) : (
          <ul className="space-y-1 text-sm text-gray-700 list-disc list-inside">
            {ingredientList.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        )}
      </div>

      {/* ISTRUZIONI */}
      <div className="bg-white rounded-2xl shadow-sm p-5 border border-orange-100">
        <h3 className="text-xl font-semibold mb-3 text-gray-900">
          Instructions
        </h3>
        {!recipe || recipe.length === 0 ? (
          <p className="text-sm text-gray-500">No instructions available.</p>
        ) : (
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
            {recipe.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        )}
      </div>

      {/* NUTRITION FACTS */}
      <div className="bg-white rounded-2xl shadow-sm p-5 border border-orange-100">
        <h3 className="text-xl font-semibold mb-3 text-gray-900">
          Nutrition Facts
        </h3>
        <ul className="space-y-1 text-sm text-gray-700">
          <li>Calories: {calories ?? "-"}</li>
          <li>Carbs: {carbs ?? "-"}</li>
          <li>Fat: {fat ?? "-"}</li>
          <li>Protein: {protein ?? "-"}</li>
          <li>Sugar: {sugar ?? "-"}</li>
        </ul>
      </div>
    </section>
  );
};

export default RecipeDetails;
