"use client";

import { useState } from "react";
import { deleteProductAction } from "@/actions/product";
import CompanyProductCard from "../CompanyProductCard/CompanyProductCard";
import CompanyProductEditModal from "../CompanyProductEditModal/CompanyProductEditModal";

const CompanyProductsList = ({ products, setProducts }) => {
  const [editing, setEditing] = useState(null);

  const handleDelete = async (id) => {
    if (!confirm("Vuoi eliminare questo prodotto?")) return;

    await deleteProductAction(id);
    setProducts((prev) => prev.filter((p) => p._id !== id));
  };

  const handleUpdated = (updated) => {
    setProducts((prev) =>
      prev.map((p) => (p._id === updated._id ? updated : p))
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl text-orange-500 text-center">I tuoi prodotti</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <CompanyProductCard
            key={p._id}
            product={p}
            onEdit={setEditing}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {editing && (
        <CompanyProductEditModal
          product={editing}
          onClose={() => setEditing(null)}
          onUpdated={handleUpdated}
        />
      )}
    </div>
  );
};

export default CompanyProductsList;
