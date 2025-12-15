"use client";

import ProductCard from "../ProductCard/ProductCard";

const SuperDeliciousClient = ({ products, session }) => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-10 text-orange-600">
        Super Delicious
      </h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          Nessun prodotto trovato.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              session={session}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default SuperDeliciousClient;
