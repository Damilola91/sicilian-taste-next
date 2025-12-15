"use server";

const API = process.env.API_BASE_URL;

// 🟢 CREATE review
export const addReviewAction = async ({
  productId,
  comment,
  rating,
  userId,
}) => {
  const payload = {
    product: productId,
    comment,
    rating,
    user: userId,
  };

  const res = await fetch(`${API}/reviews/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.message || "Errore durante la creazione della recensione"
    );
  }

  return data.savedReview;
};

// 🟢 GET reviews by product
export const getReviewsByProductAction = async (productId) => {
  try {
    const res = await fetch(`${API}/reviews/product/${productId}`, {
      cache: "no-store",
    });

    // ✅ se non ci sono recensioni → ritorna array vuoto
    if (res.status === 404 || res.status === 204) {
      return { reviews: [] };
    }

    if (!res.ok) {
      throw new Error("Errore nel recupero delle recensioni");
    }

    const data = await res.json();

    return {
      reviews: Array.isArray(data.reviews) ? data.reviews : [],
    };
  } catch (error) {
    console.error("getReviewsByProductAction:", error);
    return { reviews: [] }; // ✅ MAI crashare la UI
  }
};

// 🟢 DELETE review
export const deleteReviewAction = async (reviewId) => {
  const res = await fetch(`${API}/reviews/delete/${reviewId}`, {
    method: "DELETE",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.message || "Errore durante l'eliminazione della recensione"
    );
  }

  return data.review;
};
