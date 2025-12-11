"use server";

const API = process.env.API_BASE_URL;

if (!API) {
  console.warn("⚠️ API_BASE_URL non è definita nelle env.");
}

// 🟢 1) Tutti i prodotti (senza paginazione)
export const getAllProductsAction = async () => {
  const res = await fetch(`${API}/products`, { cache: "no-store" });

  if (!res.ok) throw new Error("Errore nel recupero dei prodotti");

  const data = await res.json();

  const normalizeProduct = (p) => ({
    ...p,
    price: parseFloat(p.price?.$numberDecimal || p.price),
    availableInStock: parseFloat(
      p.availableInStock?.$numberDecimal || p.availableInStock
    ),
  });

  return {
    ...data,
    products: data.products?.map(normalizeProduct) || [],
  };
};

// 🟢 2) Prodotti paginati (per SuperDelicious, ProductList admin…)
export const getPaginatedProductsAction = async ({
  page = 1,
  pageSize = 8,
} = {}) => {
  const res = await fetch(`${API}/products?page=${page}&pageSize=${pageSize}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Errore nel recupero dei prodotti paginati");

  const data = await res.json();

  const normalizeProduct = (p) => ({
    ...p,
    price: parseFloat(p.price?.$numberDecimal || p.price),
    availableInStock: parseFloat(
      p.availableInStock?.$numberDecimal || p.availableInStock
    ),
  });

  return {
    ...data,
    products: data.products?.map(normalizeProduct) || [],
  };
};

// 🟢 3) Prodotti per categoria (CategoryPage, PopularCategories…)
export const getProductsByCategoryAction = async ({
  category,
  page = 1,
  pageSize = 6,
}) => {
  if (!category) {
    throw new Error("Categoria mancante");
  }

  const res = await fetch(
    `${API}/products/category/${encodeURIComponent(
      category
    )}?page=${page}&pageSize=${pageSize}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Errore nel recupero dei prodotti della categoria");
  }

  return res.json();
};

// 🟢 4) Singolo prodotto per id (RecipePage SSR)
export const getProductByIdAction = async (id) => {
  if (!id) {
    throw new Error("ID prodotto mancante");
  }

  const res = await fetch(`${API}/products/${id}`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Errore nel recupero del prodotto");
  }

  return res.json(); // es: { product: {...} } oppure direttamente il prodotto
};

// 🟢 5) Search per titolo (SearchInput / Main)
export const searchProductsByNameAction = async (name) => {
  const query = name?.trim();

  if (!query) {
    // per evitare chiamate inutili
    return { products: [] };
  }

  const res = await fetch(
    `${API}/products/title/${encodeURIComponent(query)}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Errore nella ricerca dei prodotti per nome");
  }

  return res.json(); // es: { products: [...] }
};

// 🟢 6) Update prodotto (admin)
export const updateProductAction = async ({ productId, updateData }) => {
  if (!productId) {
    throw new Error("productId mancante per l'update");
  }

  const res = await fetch(`${API}/products/update/${productId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateData),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Errore nell'aggiornamento del prodotto");
  }

  return data.product || data; // dipende da cosa ritorna il backend
};

// 🟢 7) Delete prodotto (admin)
export const deleteProductAction = async (productId) => {
  if (!productId) {
    throw new Error("productId mancante per la delete");
  }

  const res = await fetch(`${API}/products/delete/${productId}`, {
    method: "DELETE",
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Errore nell'eliminazione del prodotto");
  }

  return data.product || data;
};
