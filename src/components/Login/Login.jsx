"use client";

import { useState, useEffect, useTransition } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { loginUserAction, logoutUserAction } from "@/actions/auth";
import "./Login.css";

const Login = ({ closeDrawer, session }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleInput = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (!formData.email || !formData.password) {
      return Swal.fire({
        icon: "error",
        title: "Errore",
        text: "Inserisci email e password",
        customClass: { popup: "swal-popup" },
        zIndex: 999999,
      });
    }

    startTransition(async () => {
      const res = await loginUserAction(formData);

      if (res.error) {
        return Swal.fire({
          icon: "error",
          title: "Errore di Login",
          text: res.error,
          customClass: { popup: "swal-popup" },
          zIndex: 999999,
        });
      }

      Swal.fire({
        icon: "success",
        title: `Benvenuto su Sicilian Taste, ${res.user.name}!`,
        customClass: { popup: "swal-popup" },
        zIndex: 999999,
      }).then(() => {
        closeDrawer?.();
        router.refresh(); // ricarica i server components (Navbar con nuova session)
      });
    });
  };

  const handleLogout = () => {
    startTransition(async () => {
      await logoutUserAction();
      Swal.fire({
        icon: "success",
        title: "Logout eseguito con successo",
        customClass: { popup: "swal-popup" },
        zIndex: 999999,
      }).then(() => {
        closeDrawer?.();
        router.refresh();
      });
    });
  };

  const redirectToGoogle = () => {
    // Qui puoi usare una env pubblica, NON quella privata
    const base = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
    window.location.href = `${base}/auth/google`;
  };

  if (session) {
    return (
      <div className="login-container">
        <h2 className="login-title">Sei già loggato</h2>
        <button
          onClick={handleLogout}
          className="logout-button"
          disabled={isPending}
        >
          {isPending ? "Logout..." : "Logout"}
        </button>
      </div>
    );
  }

  return (
    <div className="login-container">
      <h2 className="login-title">LOGIN</h2>
      <form onSubmit={onSubmit} className="login-form">
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInput}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInput}
            required
          />
        </div>
        <button type="submit" className="login-button" disabled={isPending}>
          {isPending ? "Caricamento..." : "Login"}
        </button>
      </form>
      <p className="or-login-with">Or login with</p>
      <div className="social-buttons">
        <button className="google-button" onClick={redirectToGoogle}>
          Google
        </button>
      </div>
    </div>
  );
};

export default Login;
