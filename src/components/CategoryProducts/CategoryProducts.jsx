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

  const [products, setProducts] = useState(initialProducts);
  const [currentPage, setCurrentPage] = useState(initialPage);

  const handleCardClick = (id) => router.push(`/recipe/${id}`);

  const handlePageChange = async (page) => {
    setCurrentPage(page);

    const data = await getProductsByCategoryAction(category, page, 6);
    setProducts(data.products);
  };

  return (
    <section className="max-w-6xl mx-auto my-10 px-4">
      <h2 className="text-center text-3xl font-bold mb-6">
        Prodotti nella categoria "{category}"
      </h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">
          Nessun prodotto disponibile in questa categoria.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="text-center cursor-pointer group"
              onClick={() => handleCardClick(product._id)}
            >
              <div className="rounded-lg overflow-hidden shadow hover:scale-[1.03] transition">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-40 object-cover"
                />
              </div>
              <p className="mt-2 font-medium group-hover:text-orange-500">
                {product.name}
              </p>
            </div>
          ))}
        </div>
      )}

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
