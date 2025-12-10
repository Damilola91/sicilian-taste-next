"use server";

const API = process.env.API_BASE_URL;

export const sendContactEmailAction = async ({ from, subject, text }) => {
  try {
    const res = await fetch(`${API}/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ from, subject, text }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { error: data.message || "Qualcosa è andato storto" };
    }

    return {
      success: true,
      message: data.message || "Email inviata con successo!",
    };
  } catch (err) {
    console.error("Errore sendContactEmailAction:", err);
    return { error: "Errore durante l'invio dell'email." };
  }
};
