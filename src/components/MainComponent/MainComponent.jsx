import ProductCard from "../ProductCard/ProductCard";
import PopularCategories from "../PopularCategories/PopularCategories";
import SuperDelicious from "../SuperDelicoius/SuperDelicous";
import Newsletter from "../Newsletter/Newsletter";

export default function MainComponent({
  products,
  searchResults,
  searchQuery,
}) {
  const isSearching = searchQuery && searchQuery.length > 0;

  return (
    <main className="container my-5">
      {isSearching ? (
        <>
          <h2>Risultati per: "{searchQuery}"</h2>

          {searchResults.length === 0 ? (
            <p>Nessun prodotto trovato.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
}
