import { getAllProductsAction } from "@/actions/product";
import { redirect } from "next/navigation";

export default async function PopularCategories() {
  // SSR: prendo tutti i prodotti
  const data = await getAllProductsAction();
  const products = data.products || [];

  // categorie uniche
  const categories = Array.from(new Set(products.map((p) => p.category)));

  // solo le prime 6
  const categoriesToShow = categories.slice(0, 6);

  const getCategoryImage = (category) => {
    const p = products.find((prod) => prod.category === category);
    return p?.img || "/placeholder.png";
  };

  return (
    <section className="text-center mb-10">
      <h2 className="text-3xl font-bold mb-6">Popular Categories</h2>

      {categoriesToShow.length === 0 ? (
        <p className="text-gray-500">No categories available.</p>
      ) : (
        <div className="flex justify-center flex-wrap gap-6 mt-4">
          {categoriesToShow.map((category) => (
            <form
              key={category}
              action={() => redirect(`/categories/${category}`)}
              className="cursor-pointer"
            >
              <button type="submit" className="flex flex-col items-center">
                <div className="w-20 h-20 overflow-hidden rounded-full shadow-md hover:scale-105 transition">
                  <img
                    src={getCategoryImage(category)}
                    alt={category}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="mt-2 font-medium">{category}</p>
              </button>
            </form>
          ))}
        </div>
      )}
    </section>
  );
}
