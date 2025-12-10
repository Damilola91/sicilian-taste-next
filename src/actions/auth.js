"use server";

import { cookies } from "next/headers";

const API = process.env.API_BASE_URL; // NON esposta al client

export const loginUserAction = async ({ email, password }) => {
  try {
    const res = await fetch(`${API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { error: data.message || "Credenziali non valide" };
    }

    cookies().set("token", data.token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 giorni
    });

    return { success: true, user: data.user };
  } catch (err) {
    console.error("Errore loginUserAction:", err);
    return { error: "Errore di rete durante il login" };
  }
};

export async function logoutUserAction() {
  cookies().delete("token");
  return { success: true };
}
