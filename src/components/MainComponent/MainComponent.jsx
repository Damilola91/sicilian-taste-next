// components/Main/MainComponent.jsx
import { searchProductsByNameAction } from "@/actions/product";
import PopularCategories from "../PopularCategories/PopularCategories";
import SuperDelicious from "../SuperDelicious/SuperDelicious";
import Newsletter from "../Pages/Newsletter/Newsletter";
import ProductCard from "../ProductCard/ProductCard";

export default async function MainComponent({ search }) {
  let results = [];
  let searchError = null;

  if (search) {
    try {
      const data = await searchProductsByNameAction(search);
      results = data.products || [];
    } catch (err) {
      searchError = err.message;
    }
  }

  return (
    <main className="max-w-6xl mx-auto my-10 px-4">
      {/* 🔍 Search Results */}
      {search && (
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4">
            Search results for "{search}"
          </h2>

          {results.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {results.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">
              {searchError || "No products found"}
            </p>
          )}
        </div>
      )}

      <PopularCategories />
      <SuperDelicious />
      <Newsletter />
    </main>
  );
}
