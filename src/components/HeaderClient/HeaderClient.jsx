"use client";

import { useState } from "react";

const HeaderClient = ({ products }) => {
  const [index, setIndex] = useState(0);

  if (!products || products.length === 0) {
    return (
      <header className="w-full py-12 flex justify-center">
        <p className="text-gray-500">No products available</p>
      </header>
    );
  }

  const product = products[index];

  const prev = () => setIndex((i) => (i === 0 ? products.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === products.length - 1 ? 0 : i + 1));

  return (
    <header className="w-full pt-12 px-4">
      {/* 
        pt-20 = spazio reale sotto navbar sticky (h-16 + respiro)
      */}
      <div className="max-w-7xl mx-auto">
        <div className="relative w-full h-[250px] sm:h-[350px] md:h-[500px] rounded-xl overflow-hidden shadow-lg">
          {/* BACKGROUND */}
          <div
            className="w-full h-full bg-cover bg-center transition-all duration-500"
            style={{ backgroundImage: `url(${product.img})` }}
          >
            {/* OVERLAY */}
            <div className="w-full h-full bg-black/40 flex flex-col justify-end px-6 py-8">
              <p className="text-white text-sm sm:text-base md:text-lg max-w-xl drop-shadow">
                {product.description}
              </p>

              <h1 className="text-white text-xl sm:text-3xl md:text-5xl font-bold drop-shadow mt-2">
                {product.name}
              </h1>
            </div>
          </div>

          {/* LEFT */}
          <button
            onClick={prev}
            className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-full text-xl transition"
          >
            ‹
          </button>

          {/* RIGHT */}
          <button
            onClick={next}
            className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-full text-xl transition"
          >
            ›
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderClient;
