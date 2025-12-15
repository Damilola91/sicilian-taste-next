import Image from "next/image";

const CompanyProductPreview = ({ product }) => {
  if (!product) return null;

  const price =
    typeof product.price === "object" && product.price?.$numberDecimal
      ? parseFloat(product.price.$numberDecimal)
      : typeof product.price === "number"
      ? product.price
      : parseFloat(product.price || 0);

  const stock =
    typeof product.availableInStock === "object" &&
    product.availableInStock?.$numberDecimal
      ? parseFloat(product.availableInStock.$numberDecimal)
      : product.availableInStock ?? 0;

  return (
    <div className="bg-white shadow-xl rounded-2xl overflow-hidden max-w-md mx-auto border">
      <div className="relative w-full h-64">
        <Image
          src={product.img}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-6 space-y-3">
        <h3
          className="text-3xl text-center text-orange-500"
          style={{ fontFamily: "'Brush Script MT', cursive" }}
        >
          {product.name}
        </h3>

        <p className="text-gray-700">
          <strong>Descrizione:</strong> {product.description}
        </p>

        <p className="text-lg font-semibold">Prezzo: €{price.toFixed(2)}</p>

        <p>
          <strong>Categoria:</strong> {product.category}
        </p>

        <p>
          <strong>Ingredienti:</strong> {product.ingredients?.join(", ")}
        </p>

        <p>
          <strong>Ricetta:</strong> {product.recipe}
        </p>

        <p className="text-green-700 font-medium">Disponibili: {stock}</p>

        <div className="mt-4">
          <h4 className="font-semibold mb-2">Fatti Nutrizionali</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>Calorie: {product.nutritionFacts?.calories}</li>
            <li>Carboidrati: {product.nutritionFacts?.carbs}</li>
            <li>Grassi: {product.nutritionFacts?.fat}</li>
            <li>Proteine: {product.nutritionFacts?.protein}</li>
            <li>Zuccheri: {product.nutritionFacts?.sugar}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CompanyProductPreview;
