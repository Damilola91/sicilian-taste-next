"use client";

import { useState } from "react";
import { updateProductAction } from "@/actions/product";

const CompanyProductEditModal = ({ product, onClose, onUpdated }) => {
  const [form, setForm] = useState({
    ...product,
    price: Number(product.price),
    availableInStock: Number(product.availableInStock || 0),
  });

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    const updateData = {
      ...form,
      price: String(form.price),
      availableInStock: String(form.availableInStock),
    };

    const updated = await updateProductAction({
      productId: product._id,
      updateData,
    });

    onUpdated(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg space-y-4">
        <h2 className="text-2xl text-orange-500 text-center">
          Modifica prodotto
        </h2>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        />

        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        />

        <input
          name="availableInStock"
          type="number"
          value={form.availableInStock}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        />

        <div className="flex gap-3 pt-4">
          <button onClick={onClose} className="flex-1 border rounded-lg py-2">
            Annulla
          </button>

          <button
            onClick={handleSave}
            className="flex-1 bg-orange-500 text-white rounded-lg py-2"
          >
            Salva
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyProductEditModal;
