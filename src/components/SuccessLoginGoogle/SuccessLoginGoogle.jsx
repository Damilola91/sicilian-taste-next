"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import "./SuccessLoginGoogle.css";

const SuccessLoginGoogle = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      document.cookie = `accessToken=${token}; path=/;`;

      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  }, [searchParams, router]);

  return (
    <div className="success-container">
      <h1 className="success-title">Login Success!</h1>
      <p className="success-message">
        Accesso Google completato! Verrai reindirizzato tra pochi secondi.
      </p>
    </div>
  );
};

export default SuccessLoginGoogle;
