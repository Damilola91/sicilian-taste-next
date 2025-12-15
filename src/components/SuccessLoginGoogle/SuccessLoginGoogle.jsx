"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";

const SuccessLoginGoogle = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      document.cookie = `token=${token}; path=/;`;

      const timer = setTimeout(() => {
        router.push("/");
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-orange-50 to-white px-4">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center animate-fade-in">
        <div className="flex justify-center mb-4">
          <CheckCircle size={64} className="text-orange-500" />
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Login Successful!
        </h1>

        <p className="text-gray-600 text-base">
          Accesso Google completato con successo.
          <br />
          Verrai reindirizzato tra pochi secondi…
        </p>

        <div className="mt-6">
          <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-orange-500 animate-progress" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessLoginGoogle;
