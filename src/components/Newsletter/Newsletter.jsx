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
    <section className="text-center newsletter-section mt-5">
      <h3>Deliciousness to your inbox</h3>
      <p>Enjoy weekly hand-picked recipes and recommendations</p>
      <form
        className="d-flex justify-content-center gap-2 mt-4"
        onSubmit={handleSubscribe}
      >
        <input
          type="email"
          placeholder="Your Email Address"
          className="form-control w-50"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="btn" disabled={isSubmitting}>
          {isSubmitting ? "Joining..." : "Join"}
        </button>
      </form>
      {message && <small className="d-block mt-3">{message}</small>}
    </section>
  );
};

export default Newsletter;
