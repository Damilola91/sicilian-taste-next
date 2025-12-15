"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import CompanyProductForm from "../CompanyProductForm/CompanyProductForm";
import CompanyProductPreview from "../CompanyProductPreview/CompanyProductPreview";
import CompanyProductsList from "../CompanyProductList/CompanyProductList";

const CreateProductClient = ({ initialProducts }) => {
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState(initialProducts || []);
  const [loading, setLoading] = useState(false);

  const createProduct = async (formData, file) => {
    if (!file) return alert("Seleziona un'immagine");

    try {
      setLoading(true);

      /* 1️⃣ Upload immagine */
      const fd = new FormData();
      fd.append("file", file);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: fd,
      });

      if (!uploadRes.ok) throw new Error("Errore upload immagine");

      const uploadData = await uploadRes.json();
      const imageUrl = uploadData.file.url;

      /* 2️⃣ Payload coerente col backend */
      const payload = {
        ...formData,
        img: imageUrl,
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

      /* 3️⃣ Create product */
      const res = await fetch("/api/company/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Errore creazione prodotto");

      const created = await res.json();

      setProduct(created);
      setProducts((prev) => [created, ...prev]);
    } catch (err) {
      console.error(err);
      alert("Errore durante la creazione del prodotto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-14 space-y-16">
      {/* HEADER + BACK */}
      <div className="flex items-center justify-between">
        <h1
          className="text-4xl text-orange-500"
          style={{ fontFamily: "'Brush Script MT', cursive" }}
        >
          Area Aziende
        </h1>

        <button
          onClick={() => router.back()}
          className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
        >
          ← Torna indietro
        </button>
      </div>

      {/* FORM + PREVIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <CompanyProductForm onCreateProduct={createProduct} loading={loading} />

        {product ? (
          <CompanyProductPreview product={product} />
        ) : (
          <div className="flex items-center justify-center border border-dashed rounded-xl text-gray-400 p-10">
            Anteprima prodotto
          </div>
        )}
      </div>

      {/* LISTA PRODOTTI UTENTE */}
      <CompanyProductsList products={products} />
    </section>
  );
};

export default CreateProductClient;
