"use client";

import { useState } from "react";
import CompanyProductForm from "../CompanyProductForm/CompanyProductForm";
import CompanyProductPreview from "../CompanyProductPreview/CompanyProductPreview";

const CreateProductClient = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const createProduct = async (formData, file) => {
    if (!file) {
      alert("Seleziona un'immagine");
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ UPLOAD IMMAGINE
      const fd = new FormData();
      fd.append("file", file);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: fd,
      });

      if (!uploadRes.ok) {
        throw new Error("Errore upload immagine");
      }

      const uploadData = await uploadRes.json();
      const imageUrl = uploadData.file.url;

      const payload = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        img: imageUrl,
        ingredients: formData.ingredients,
        recipe: formData.recipe,

        // Decimal128 → STRINGA
        price: String(formData.price),
        availableInStock: formData.availableInStock
          ? String(formData.availableInStock)
          : undefined,
        nutritionFacts: {
          calories: String(formData.calories),
          carbs: String(formData.carbs),
          fat: String(formData.fat),
          protein: String(formData.protein),
          sugar: String(formData.sugar),
        },
      };

      const res = await fetch("/api/company/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        console.error("BACKEND ERROR:", err);
        throw new Error("Errore creazione prodotto");
      }

      const created = await res.json();
      setProduct(created);
    } catch (err) {
      console.error("CREATE PRODUCT ERROR:", err);
      alert("Errore durante la creazione del prodotto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-14">
      <h1
        className="text-4xl text-center text-orange-500 mb-12"
        style={{ fontFamily: "'Brush Script MT', cursive" }}
      >
        Area Aziende
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <CompanyProductForm onCreateProduct={createProduct} loading={loading} />

        {product ? (
          <CompanyProductPreview product={product} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-center border border-dashed rounded-xl p-10">
            <p>
              Anteprima prodotto
              <br />
              apparirà qui
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CreateProductClient;
