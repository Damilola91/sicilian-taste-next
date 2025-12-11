"use client";

import { useState } from "react";
import { subscribeNewsletterAction } from "@/actions/newsletter";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    const res = await subscribeNewsletterAction({ email });

    if (res.error) {
      setMessage(res.error);
    } else if (res.success) {
      setMessage(res.message);
      setEmail("");
    }

    setIsSubmitting(false);
  };

  return (
    <section className="text-center my-16 px-4">
      <h3 className="text-3xl font-bold text-gray-800">
        Deliciousness to your inbox
      </h3>
      <p className="text-gray-500 mt-2">
        Enjoy weekly hand-picked recipes and recommendations
      </p>

      {/* FORM */}
      <form
        onSubmit={handleSubscribe}
        className="flex flex-col sm:flex-row justify-center mt-6 gap-3"
      >
        <input
          type="email"
          placeholder="Your Email Address"
          className="border border-gray-300 w-full sm:w-80 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-orange-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-orange-600 transition disabled:opacity-50"
        >
          {isSubmitting ? "Joining..." : "Join"}
        </button>
      </form>

      {/* FEEDBACK MESSAGE */}
      {message && (
        <p className="mt-4 text-sm text-gray-700 font-medium">{message}</p>
      )}
    </section>
  );
};

export default Newsletter;
