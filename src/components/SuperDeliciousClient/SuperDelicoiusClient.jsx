"use client";

import { useDispatch } from "react-redux";
import { addToCart } from "@/reducer/cartSlice";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import { useState } from "react";

export default function SuperDeliciousClient({ products }) {
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
    <section className="w-full max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-10 text-orange-600">
        Super Delicious
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.length === 0 && (
          <p className="text-center col-span-full text-gray-500 text-lg">
            Nessun prodotto trovato.
          </p>
        )}

        {products.map((product) => {
          // FIX STOCK universale per stock
          const stock =
            typeof product.availableInStock === "object"
              ? parseFloat(product.availableInStock.$numberDecimal)
              : product.availableInStock ??
                product.available ??
                product.stock ??
                0;

          return (
            <div
              key={product._id}
              className="bg-white border rounded-xl shadow-md hover:shadow-xl transition p-4 flex flex-col justify-between"
            >
              {/* IMAGE */}
              <div
                className="w-full h-48 rounded-lg overflow-hidden mb-3 cursor-pointer"
                onClick={() => router.push(`/recipe/${product._id}`)}
              >
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* TITLE */}
              <h3 className="font-semibold text-lg truncate">{product.name}</h3>

              {/* DESCRIPTION */}
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {product.description}
              </p>

              {/* PRICE */}
              <p className="mt-3 font-bold text-gray-800 text-lg">
                €{product.price}
              </p>

              {/* ⭐ RATING */}
              <div className="flex gap-1 my-3">
                {[1, 2, 3, 4, 5].map((num) => (
                  <Star
                    key={num}
                    size={22}
                    className={`cursor-pointer transition ${
                      (selectedRating[product._id] || 0) >= num
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    onClick={() => handleRating(product._id, num)}
                  />
                ))}
              </div>

              {/* STOCK */}
              <p className="mt-3 font-bold text-green-800 text-lg">
                Available: {stock}
              </p>

              {/* BUTTON */}
              <button
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 mt-auto rounded-lg font-medium transition shadow"
                onClick={() => handleAddToCart(product)}
              >
                Aggiungi al carrello
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
