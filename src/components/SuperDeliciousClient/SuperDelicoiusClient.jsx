"use client";

import { useDispatch } from "react-redux";
import { addToCart } from "@/reducer/cartSlice";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import { useState } from "react";

export default function SuperDeliciousClient({ products, totalPages }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [selectedRating, setSelectedRating] = useState({});

  const handleRating = (productId, rating) => {
    setSelectedRating((prev) => ({
      ...prev,
      [productId]: rating,
    }));
  };

  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        img: product.img,
      })
    );
  };

  return (
    <section className="w-full px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6">Super Delicious</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length === 0 && (
          <p className="text-center col-span-full">Nessun prodotto trovato.</p>
        )}

        {products.map((product) => (
          <div
            key={product._id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer"
          >
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-40 object-cover rounded"
              onClick={() => router.push(`/recipe/${product._id}`)}
            />

            <h3 className="mt-3 font-semibold text-lg">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.description}</p>

            <p className="mt-2 font-bold">€{product.price}</p>

            {/* ⭐ Rating */}
            <div className="flex gap-1 my-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <Star
                  key={num}
                  size={20}
                  className={`cursor-pointer ${
                    (selectedRating[product._id] || 0) >= num
                      ? "text-yellow-400"
                      : "text-gray-400"
                  }`}
                  onClick={() => handleRating(product._id, num)}
                />
              ))}
            </div>

            <button
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 mt-3 rounded"
              onClick={() => handleAddToCart(product)}
            >
              Aggiungi al carrello
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
