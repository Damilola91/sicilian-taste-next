"use server";

const API = process.env.API_BASE_URL;

export const createOrderAction = async (orderData) => {
  try {
    const res = await fetch(`${API}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    const data = await res.json();

    if (!res.ok) {
      return { error: data.message || "Errore nella creazione dell'ordine." };
    }

    return { success: true, clientSecret: data.clientSecret };
  } catch (err) {
    console.error("Errore createOrderAction:", err);
    return { error: "Errore di rete nella creazione dell'ordine." };
  }
};
