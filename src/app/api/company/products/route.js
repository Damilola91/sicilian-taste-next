import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const API = process.env.API_BASE_URL;

export async function POST(req) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Non autenticato" }, { status: 401 });
    }

    const body = await req.json();

    const res = await fetch(`${API}/products/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { message: data.message || "Errore backend" },
        { status: res.status }
      );
    }

    return NextResponse.json(data.product, { status: 201 });
  } catch (err) {
    console.error("API /company/products ERROR:", err);

    return NextResponse.json(
      { message: "Errore interno server" },
      { status: 500 }
    );
  }
}
