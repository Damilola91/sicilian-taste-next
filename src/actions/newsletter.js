"use server";

const API = process.env.NEXT_PUBLIC_API_BASE_URL;

export const subscribeNewsletterAction = async ({ email }) => {
  try {
    const res = await fetch(`${API}/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { error: data.message || "Errore durante l'iscrizione" };
    }

    return {
      success: true,
      message: data.message || "Iscrizione avvenuta con successo!",
    };
  } catch (err) {
    console.error("Errore subscribeNewsletterAction:", err);
    return { error: "An error occurred. Please try again." };
  }
};
