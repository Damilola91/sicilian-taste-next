"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { loginUserAction, logoutUserAction } from "@/actions/auth";
import { Chrome } from "lucide-react";

const Login = ({ closeDrawer, session }) => {
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
        <h2 className="text-xl font-bold mb-4">Sei già loggato</h2>

        <button
          onClick={handleLogout}
          disabled={isPending}
          className="w-full py-2 px-4 rounded bg-orange-500 hover:bg-orange-600 text-white transition disabled:bg-gray-300"
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
    <div className="bg-white w-full max-w-sm mx-auto p-6 rounded-xl shadow-md">
      <h2
        className="text-2xl font-bold text-center mb-6"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Login
      </h2>

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none"
          value={formData.email}
          onChange={handleInput}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none"
          value={formData.password}
          onChange={handleInput}
          required
        />

        {/* forgot password */}
        <a
          href="/forgot-password"
          className="text-xs text-orange-500 ml-auto hover:underline"
        >
          Password dimenticata?
        </a>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-lg py-2 transition disabled:bg-gray-300"
        >
          {isPending ? "Caricamento..." : "Login"}
        </button>
      </form>

      <div className="text-center my-4 text-gray-500 text-sm">Oppure</div>

      {/* GOOGLE BUTTON */}
      <button
        onClick={redirectToGoogle}
        className="w-full border border-gray-300 rounded-lg py-2 flex items-center justify-center gap-2 bg-white hover:bg-gray-100 transition"
      >
        <Chrome size={22} /> Login con Google
      </button>

      {/* SIGNUP TEXT */}
      <p className="text-center text-sm mt-4">
        Non hai un account?{" "}
        <a
          href="/register"
          className="text-orange-500 font-semibold hover:underline"
        >
          Registrati
        </a>
      </p>
    </div>
  );
};

export default Login;
