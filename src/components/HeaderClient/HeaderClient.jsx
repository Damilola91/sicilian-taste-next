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
    <header className="relative w-full h-[380px] md:h-[500px] overflow-hidden">
      {/* Background Image */}
      <div
        className="w-full h-full bg-cover bg-center transition-all duration-500"
        style={{ backgroundImage: `url(${product.img})` }}
      >
        {/* gradient overlay */}
        <div className="w-full h-full bg-black/40 flex flex-col justify-center items-start px-6 md:px-12">
          <p className="text-white text-lg md:text-xl max-w-xl drop-shadow">
            {product.description}
          </p>
          <h1 className="text-white text-3xl md:text-5xl font-bold drop-shadow mt-3">
            {product.name}
          </h1>
        </div>
      </div>

      {/* Left arrow */}
      <button
        onClick={prev}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center text-2xl hover:bg-black/70 transition"
      >
        ‹
      </button>

      {/* Right arrow */}
      <button
        onClick={next}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center text-2xl hover:bg-black/70 transition"
      >
        ›
      </button>
    </header>
  );
}
