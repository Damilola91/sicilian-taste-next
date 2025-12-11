"use client";

import { useState } from "react";

export default function HeaderClient({ products }) {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i === 0 ? products.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === products.length - 1 ? 0 : i + 1));

  if (!products || products.length === 0)
    return <p className="text-center py-10">No products available</p>;

  const product = products[index];

  return (
    <header className="w-full px-5 mt-6">
      <div
        className="
        relative w-full h-[250px] sm:h-[350px] md:h-[500px] 
        rounded-xl overflow-hidden shadow-lg
      "
      >
        {/* BACKGROUND IMAGE */}
        <div
          className="
            w-full h-full bg-cover bg-center 
            transition-all duration-500
          "
          style={{ backgroundImage: `url(${product.img})` }}
        >
          {/* OVERLAY */}
          <div
            className="
              w-full h-full 
              bg-black/40 
              flex flex-col justify-end
              px-6 py-8
            "
          >
            <p className="text-white text-sm sm:text-base md:text-lg max-w-xl drop-shadow">
              {product.description}
            </p>

            <h1
              className="
              text-white 
              text-xl sm:text-3xl md:text-5xl 
              font-bold drop-shadow mt-2
            "
            >
              {product.name}
            </h1>
          </div>
        </div>

        {/* LEFT ARROW */}
        <button
          onClick={prev}
          className="
            absolute top-1/2 left-3 -translate-y-1/2 
            bg-black/50 hover:bg-black/70 
            text-white 
            flex items-center justify-center
            w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12
            rounded-full 
            text-lg sm:text-xl 
            transition
          "
        >
          ‹
        </button>

        {/* RIGHT ARROW */}
        <button
          onClick={next}
          className="
            absolute top-1/2 right-3 -translate-y-1/2 
            bg-black/50 hover:bg-black/70 
            text-white 
            flex items-center justify-center
            w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12
            rounded-full 
            text-lg sm:text-xl 
            transition
          "
        >
          ›
        </button>
      </div>
    </header>
  );
}
