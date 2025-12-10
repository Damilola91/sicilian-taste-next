"use server";

const API = process.env.API_BASE_URL;

export async function addCommentAction(formData) {
  const productId = formData.get("productId");
  const comment = formData.get("comment");
  const rating = Number(formData.get("rating") || 0);

  const res = await fetch(`${API}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, comment, rating }),
  });

  if (!res.ok) throw new Error("Errore nell'invio del commento");

  return res.json();
}
