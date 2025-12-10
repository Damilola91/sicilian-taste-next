"use server";

const API = process.env.API_BASE_URL;

export async function getAllProductsAction() {
  const res = await fetch(`${API}/products`, { cache: "no-store" });
  if (!res.ok) throw new Error("Errore nel recupero dei prodotti");
  return res.json();
}

export async function getProductsByCategoryAction({
  category,
  page = 1,
  pageSize = 6,
}) {
  const res = await fetch(
    `${API}/products/category/${category}?page=${page}&pageSize=${pageSize}`,
    { cache: "no-store" }
  );
  if (!res.ok)
    throw new Error("Errore nel recupero dei prodotti della categoria");
  return res.json();
}

export async function getProductByIdAction(id) {
  const res = await fetch(`${API}/products/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Errore nel recupero del prodotto");
  return res.json();
}
