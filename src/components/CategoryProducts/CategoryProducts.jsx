"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ResponsivePagination from "react-responsive-pagination";
import { getProductsByCategoryAction } from "@/actions/product";

const CategoryProducts = ({
  category,
  initialProducts,
  initialPage,
  totalPages,
  totalProducts,
}) => {
  const router = useRouter();

  const [products, setProducts] = useState(initialProducts || []);
  const [currentPage, setCurrentPage] = useState(initialPage || 1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCardClick = (id) => router.push(`/recipe/${id}`);

  const handlePageChange = async (page) => {
    setCurrentPage(page);
    setLoading(true);
    setError("");

    try {
      const data = await getProductsByCategoryAction({
        category,
        page,
        pageSize: 6,
      });

      setProducts(Array.isArray(data.products) ? data.products : []);
    } catch (err) {
      console.error(err);
      setError("Errore nel caricamento dei prodotti.");
      setProducts([]);
    }

    setLoading(false);
  };

  return (
    <section className="max-w-6xl mx-auto my-10 px-4">
      <h2 className="text-center text-3xl font-bold mb-6">
        Prodotti nella categoria "{category}"
      </h2>

      {/* Stato caricamento */}
      {loading && <p className="text-center text-gray-500">Caricamento...</p>}

      {/* Stato errore */}
      {error && (
        <p className="text-center text-red-500 font-semibold">{error}</p>
      )}

      {/* Nessun prodotto */}
      {!loading && products.length === 0 && !error && (
        <p className="text-center text-gray-500">
          Nessun prodotto disponibile in questa categoria.
        </p>
      )}

      {/* LISTA PRODOTTI */}
      {!loading && products.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="text-center cursor-pointer group"
              onClick={() => handleCardClick(product._id)}
            >
              <div className="rounded-lg overflow-hidden shadow hover:scale-[1.03] transition">
                <Image
                  src={product.img}
                  alt={product.name}
                  width={300}
                  height={200}
                  className="object-cover w-full h-40"
                />
              </div>

              <p className="mt-2 font-medium group-hover:text-orange-500">
                {product.name}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* PAGINAZIONE */}
      {totalPages > 1 && totalProducts > 6 && (
        <div className="mt-6 flex justify-center">
          <ResponsivePagination
            current={currentPage}
            total={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </section>
  );
};

export default CategoryProducts;
