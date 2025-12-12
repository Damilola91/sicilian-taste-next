"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

export const getSession = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, SECRET);

    return {
      token,
      role: decoded.role,
      id: decoded._id,
      name: decoded.name,
      email: decoded.email,
      exp: decoded.exp,
    };
  } catch (err) {
    return null;
  }
};
