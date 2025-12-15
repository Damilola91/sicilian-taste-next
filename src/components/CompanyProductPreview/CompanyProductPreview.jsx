import Image from "next/image";

const CompanyProductPreview = ({ product }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden max-w-md mx-auto">
      <div className="relative w-full h-64">
        <Image
          src={product.img}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-4 space-y-2">
        <h3
          className="text-2xl text-center text-orange-500"
          style={{ fontFamily: "'Brush Script MT', cursive" }}
        >
          {product.name}
        </h3>

        <p>
          <strong>Descrizione:</strong> {product.description}
        </p>
        <p>
          <strong>Prezzo:</strong> €{product.price}
        </p>
        <p>
          <strong>Categoria:</strong> {product.category}
        </p>
        <p>
          <strong>Ingredienti:</strong> {product.ingredients.join(", ")}
        </p>
        <p>
          <strong>Ricetta:</strong> {product.recipe}
        </p>

        <h4 className="font-semibold mt-3">Fatti Nutrizionali</h4>
        <ul className="text-sm text-gray-600">
          <li>Calorie: {product.nutritionFacts.calories}</li>
          <li>Carboidrati: {product.nutritionFacts.carbs}</li>
          <li>Grassi: {product.nutritionFacts.fat}</li>
          <li>Proteine: {product.nutritionFacts.protein}</li>
          <li>Zuccheri: {product.nutritionFacts.sugar}</li>
        </ul>
      </div>
    </div>
  );
};

export default CompanyProductPreview;
