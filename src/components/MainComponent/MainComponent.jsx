import ProductCard from "../ProductCard/ProductCard";
import PopularCategories from "../PopularCategories/PopularCategories";
import SuperDelicious from "../SuperDelicoius/SuperDelicous";
import Newsletter from "../Newsletter/Newsletter";

const MainComponent = ({ searchResults, searchQuery }) => {
  const isSearching = searchQuery && searchQuery.length > 0;

  return (
    <main className="w-full max-w-7xl mx-auto px-4 my-10">
      {isSearching ? (
        <>
          <h2 className="text-2xl font-semibold mb-6">
            Risultati per: "{searchQuery}"
          </h2>

          {searchResults.length === 0 ? (
            <p className="text-gray-500">Nessun prodotto trovato.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {searchResults.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          <PopularCategories />
          <SuperDelicious />
          <Newsletter />
        </>
      )}
    </main>
  );
};

export default MainComponent;
