"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { loginUserAction, logoutUserAction } from "@/actions/auth";
import { FcGoogle } from "react-icons/fc";

export default function Login({ closeDrawer, session }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return Swal.fire({
        icon: "error",
        title: "Errore",
        text: "Inserisci email e password",
      });
    }

    startTransition(async () => {
      const res = await loginUserAction(formData);

      if (res.error) {
        return Swal.fire({
          icon: "error",
          title: "Errore di login",
          text: res.error,
        });
      }

      Swal.fire({
        icon: "success",
        title: `Benvenuto, ${res.user.name}!`,
      }).then(() => {
        closeDrawer?.();
        router.refresh();
      });
    });
  };

  const handleLogout = () => {
    startTransition(async () => {
      await logoutUserAction();
      Swal.fire({
        icon: "success",
        title: "Logout effettuato",
      }).then(() => {
        closeDrawer?.();
        router.refresh();
      });
    });
  };

  const redirectToGoogle = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/auth/google`;
  };

  // --------------------------------------------
  // SE L’UTENTE È GIÀ LOGGATO
  // --------------------------------------------

  if (session) {
    return (
      <div className="p-6 flex flex-col items-center text-center">
        <h2 className="text-2xl font-semibold mb-4">Sei già loggato</h2>

        <button
          onClick={handleLogout}
          disabled={isPending}
          className="w-full py-2 px-4 rounded bg-red-500 hover:bg-red-600 text-white transition mt-3"
        >
          {isPending ? "Logout..." : "Logout"}
        </button>
      </div>
    );
  }

  // --------------------------------------------
  // FORM DI LOGIN
  // --------------------------------------------

  return (
    <div className="p-6 w-full max-w-xs mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
          value={formData.email}
          onChange={handleInput}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
          value={formData.password}
          onChange={handleInput}
          required
        />

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded py-2 transition"
        >
          {isPending ? "Caricamento..." : "Login"}
        </button>
      </form>

      <div className="text-center my-3 text-gray-500">Oppure</div>

      <button
        onClick={redirectToGoogle}
        className="w-full border rounded py-2 flex items-center justify-center gap-2 hover:bg-gray-100 transition"
      >
        <FcGoogle size={24} /> Login con Google
      </button>
    </div>
  );
}
