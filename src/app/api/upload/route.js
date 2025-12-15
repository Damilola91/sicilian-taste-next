import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const API = process.env.API_BASE_URL;

    if (!API) {
      throw new Error("API_BASE_URL is missing");
    }

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const backendRes = await fetch(`${API}/products/upload/cloud`, {
      method: "POST",
      body: formData,
    });

    if (!backendRes.ok) {
      const text = await backendRes.text();
      console.error("BACKEND ERROR:", text);
      return NextResponse.json(
        { error: "Upload failed" },
        { status: backendRes.status }
      );
    }

    const data = await backendRes.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("UPLOAD API ERROR:", err);
    return NextResponse.json(
      { error: err.message || "Internal error" },
      { status: 500 }
    );
  }
}
