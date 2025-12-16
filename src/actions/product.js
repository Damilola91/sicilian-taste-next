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
  const cookieStore = await cookies(); // ✅ Next 16
  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("Non autenticato");
  }

  return {
    Authorization: `Bearer ${token}`,
  };
};

export const getAllProductsAction = async () => {
  const res = await fetch(`${API}/products`, {
    next: { revalidate: 360 },
  });

  if (!res.ok) throw new Error("Errore nel recupero dei prodotti");

  const data = await res.json();

  return {
    ...data,
    products: data.products?.map(normalizeProduct) || [],
  };
};

export const getPaginatedProductsAction = async ({
  page = 1,
  pageSize = 8,
} = {}) => {
  const res = await fetch(`${API}/products?page=${page}&pageSize=${pageSize}`, {
    next: { revalidate: 360 },
  });

  if (!res.ok) throw new Error("Errore nel recupero prodotti paginati");

  const data = await res.json();

  return {
    ...data,
    products: data.products?.map(normalizeProduct) || [],
  };
};

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
    {
      next: { revalidate: 360 },
    }
  );

  if (!res.ok) {
    const err = await res.text();
    console.error(err);
    throw new Error("Errore prodotti categoria");
  }

  return res.json();
};

export const getProductByIdAction = async (id) => {
  if (!id) throw new Error("ID prodotto mancante");

  const res = await fetch(`${API}/products/${id}`, {
    next: { revalidate: 360 },
  });

  if (!res.ok) throw new Error("Errore prodotto");

  return res.json();
};

export const searchProductsByNameAction = async (name) => {
  const query = name?.trim();
  if (!query) return { products: [] };

  const res = await fetch(
    `${API}/products/title/${encodeURIComponent(query)}`,
    {
      next: { revalidate: 360 },
    }
  );

  if (!res.ok) throw new Error("Errore ricerca");

  return res.json();
};

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

export const getMyProductsAction = async () => {
  const res = await fetch(`${API}/products/my`, {
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
