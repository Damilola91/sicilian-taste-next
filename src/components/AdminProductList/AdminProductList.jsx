"use client";

import { useEffect, useState } from "react";
import {
  getPaginatedProductsAction,
  deleteProductAction,
} from "@/actions/product";
import AdminProductCard from "../AdminProductCard/AdminProductCard";

const AdminProductsList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const data = await getPaginatedProductsAction({
      page,
      pageSize: 8,
    });

    setProducts(data.products);
    setPages(data.totalPages);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [page]);

  const handleDelete = async (id) => {
    if (!confirm("Eliminare il prodotto?")) return;
    await deleteProductAction(id);
    load();
  };

  return (
    <section className="space-y-8">
      <h2 className="text-3xl text-orange-500 font-semibold text-center">
        Gestione Prodotti
      </h2>

      {loading && <p className="text-center">Caricamento…</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <AdminProductCard key={p._id} product={p} onDelete={handleDelete} />
        ))}
      </div>

      {/* PAGINAZIONE */}
      <div className="flex justify-center items-center gap-6">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
        >
          Prev
        </button>

        <span className="font-medium">
          {page} / {pages}
        </span>

        <button
          onClick={() => setPage((p) => Math.min(pages, p + 1))}
          disabled={page === pages}
          className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default AdminProductsList;
