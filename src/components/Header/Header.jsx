"use client";

import { useState } from "react";
import "./Header.css";

export default function HeaderClient({ products }) {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i === 0 ? products.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === products.length - 1 ? 0 : i + 1));

  if (!products || products.length === 0) return <p>No products available</p>;

  return (
    <header className="header">
      <div className="carousel-container">
        <div
          className="carousel-image"
          style={{ backgroundImage: `url(${products[index].img})` }}
        >
          <div className="carousel-content">
            <p className="carousel-description">
              {products[index].description}
            </p>
            <h1 className="carousel-title">{products[index].name}</h1>
          </div>
        </div>

        <button className="carousel-button left" onClick={prev}>
          ‹
        </button>
        <button className="carousel-button right" onClick={next}>
          ›
        </button>
      </div>
    </header>
  );
}
