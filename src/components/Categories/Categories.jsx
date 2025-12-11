// src/components/Categories/Categories.jsx
import Link from "next/link";
import { getAllProductsAction } from "@/actions/product";

export default async function Categories() {
  const data = await getAllProductsAction();
  const products = Array.isArray(data?.products) ? data.products : data || [];

  const categories = Array.from(
    new Set(products.map((product) => product.category))
  );

  const getCategoryImage = (category) => {
    const product = products.find((p) => p.category === category);
    return product?.img || "/placeholder.png";
  };

  if (!products.length || !categories.length) {
    return (
      <section className="max-w-6xl mx-auto my-10 px-4">
        <h2 className="text-center text-3xl font-bold mb-6">Categories</h2>
        <p className="text-center text-gray-600">No categories available.</p>
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto my-10 px-4">
      <h2 className="text-center text-3xl font-bold mb-6">Categories</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 justify-items-center">
        {categories.map((category) => (
          <Link
            key={category}
            href={`/categories/${encodeURIComponent(category)}`}
            className="flex flex-col items-center cursor-pointer group"
          >
            <div className="w-24 h-24 rounded-full overflow-hidden shadow-md border border-gray-200 mb-2">
              <img
                src={getCategoryImage(category)}
                alt={category}
                className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
              />
            </div>
            <p className="text-sm font-medium group-hover:text-orange-500">
              {category}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
