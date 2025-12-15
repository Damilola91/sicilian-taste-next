"use client";

import { useState } from "react";
import CompanyProductForm from "../CompanyProductForm/CompanyProductForm";
import CompanyProductPreview from "../CompanyProductPreview/CompanyProductPreview";
import {
  uploadProductImageAction,
  createProductAction,
} from "@/actions/product";

const CreateProductClient = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const createProduct = async (formData, file) => {
    if (!file) return alert("Seleziona un'immagine");

    try {
      setLoading(true);

      const imageUrl = await uploadProductImageAction(file);

      const payload = {
        ...formData,
        img: imageUrl,
      };

      const created = await createProductAction(payload);
      setProduct(created);
    } catch (err) {
      console.error(err);
      alert("Errore durante creazione prodotto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h1
        className="text-4xl text-center text-orange-500 mb-10"
        style={{ fontFamily: "'Brush Script MT', cursive" }}
      >
        Crea un Nuovo Prodotto
      </h1>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1">
          <CompanyProductForm
            onCreateProduct={createProduct}
            loading={loading}
          />
        </div>

        <div className="flex-1">
          {product && <CompanyProductPreview product={product} />}
        </div>
      </div>
    </section>
  );
};

export default CreateProductClient;
