"use server";

import { cookies } from "next/headers";

const API = process.env.API_BASE_URL;

if (!API) {
  throw new Error("❌ API_BASE_URL non definita nelle env");
}

/* --------------------------------
   HELPERS
-------------------------------- */

const normalizeProduct = (p) => ({
  ...p,
  price:
    typeof p.price === "object"
      ? parseFloat(p.price?.$numberDecimal)
      : Number(p.price),
  availableInStock:
    typeof p.availableInStock === "object"
      ? parseFloat(p.availableInStock?.$numberDecimal)
      : Number(p.availableInStock ?? 0),
});

const getAuthHeaders = async () => {
  const cookieStore = await cookies(); // ✅ obbligatorio in Next 16
  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("Non autenticato");
  }

  return {
    Authorization: `Bearer ${token}`,
  };
};

/* --------------------------------
   1️⃣ TUTTI I PRODOTTI
-------------------------------- */

export const getAllProductsAction = async () => {
  const res = await fetch(`${API}/products`, { cache: "no-store" });

  if (!res.ok) throw new Error("Errore nel recupero dei prodotti");

  const data = await res.json();

  return {
    ...data,
    products: data.products?.map(normalizeProduct) || [],
  };
};

/* --------------------------------
   2️⃣ PRODOTTI PAGINATI
-------------------------------- */

export const getPaginatedProductsAction = async ({
  page = 1,
  pageSize = 8,
} = {}) => {
  const res = await fetch(`${API}/products?page=${page}&pageSize=${pageSize}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Errore nel recupero prodotti paginati");

  const data = await res.json();

  return {
    ...data,
    products: data.products?.map(normalizeProduct) || [],
  };
};

/* --------------------------------
   3️⃣ PRODOTTI PER CATEGORIA
-------------------------------- */

export const getProductsByCategoryAction = async ({
  category,
  page = 1,
  pageSize = 6,
}) => {
  if (!category) throw new Error("Categoria mancante");

  const res = await fetch(
    `${API}/products/search/${encodeURIComponent(
      category
    )}?page=${page}&pageSize=${pageSize}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    const err = await res.text();
    console.error(err);
    throw new Error("Errore prodotti categoria");
  }

  return res.json();
};

/* --------------------------------
   4️⃣ PRODOTTO PER ID
-------------------------------- */

export const getProductByIdAction = async (id) => {
  if (!id) throw new Error("ID prodotto mancante");

  const res = await fetch(`${API}/products/${id}`, { cache: "no-store" });

  if (!res.ok) throw new Error("Errore prodotto");

  return res.json();
};

/* --------------------------------
   5️⃣ SEARCH PER NOME
-------------------------------- */

export const searchProductsByNameAction = async (name) => {
  const query = name?.trim();
  if (!query) return { products: [] };

  const res = await fetch(
    `${API}/products/title/${encodeURIComponent(query)}`,
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("Errore ricerca");

  return res.json();
};

/* --------------------------------
   6️⃣ CREA PRODOTTO (company/admin)
-------------------------------- */

export const createProductAction = async (productData) => {
  const res = await fetch(`${API}/products/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(await getAuthHeaders()),
    },
    body: JSON.stringify(productData),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Errore creazione prodotto");
  }

  return normalizeProduct(data.product);
};

/* --------------------------------
   7️⃣ UPDATE PRODOTTO
-------------------------------- */

export const updateProductAction = async ({ productId, updateData }) => {
  if (!productId) throw new Error("productId mancante");

  const res = await fetch(`${API}/products/update/${productId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...(await getAuthHeaders()),
    },
    body: JSON.stringify(updateData),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Errore update prodotto");
  }

  return normalizeProduct(data.product || data);
};

/* --------------------------------
   8️⃣ DELETE PRODOTTO
-------------------------------- */

export const deleteProductAction = async (productId) => {
  if (!productId) throw new Error("productId mancante");

  const res = await fetch(`${API}/products/delete/${productId}`, {
    method: "DELETE",
    headers: {
      ...(await getAuthHeaders()),
    },
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Errore delete prodotto");
  }

  return normalizeProduct(data.product || data);
};

/* --------------------------------
   9️⃣ PRODOTTI DELL’UTENTE LOGGATO
-------------------------------- */

export const getMyProductsAction = async () => {
  const res = await fetch(`${API}/products/my`, {
    cache: "no-store",
    headers: {
      ...(await getAuthHeaders()),
    },
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Errore backend:", err);
    throw new Error("Errore nel recupero dei tuoi prodotti");
  }

  const data = await res.json();

  return {
    ...data,
    products: data.products?.map(normalizeProduct) || [],
  };
};
