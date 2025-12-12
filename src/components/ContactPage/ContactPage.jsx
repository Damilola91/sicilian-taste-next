"use client";

import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { sendContactEmailAction } from "@/actions/contact";

const ContactPage = ({ session }) => {
  const [formData, setFormData] = useState({
    from: "",
    subject: "",
    text: "",
  });

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    const res = await sendContactEmailAction(formData);

    if (res?.error) {
      setMessage(res.error);
    } else if (res?.success) {
      setMessage(res.message);
      setFormData({ from: "", subject: "", text: "" });
    }

    setIsSubmitting(false);
  };

  return (
    <>
      <Navbar session={session} />

      <main className="w-full min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12 bg-orange-50">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">
          {/* TITLE */}
          <h1 className="text-3xl font-bold text-center text-orange-600 mb-6">
            Contattaci
          </h1>

          <p className="text-center text-gray-600 mb-8">
            Hai una domanda o una richiesta? Scrivici, ti risponderemo al più
            presto.
          </p>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* EMAIL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="from"
                value={formData.from}
                onChange={handleChange}
                required
                placeholder="la-tua-email@email.com"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>

            {/* SUBJECT */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Oggetto
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Oggetto del messaggio"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>

            {/* MESSAGE */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Messaggio
              </label>
              <textarea
                name="text"
                value={formData.text}
                onChange={handleChange}
                rows={5}
                required
                placeholder="Scrivi qui il tuo messaggio..."
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none resize-none"
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition"
            >
              {isSubmitting ? "Invio in corso..." : "Invia messaggio"}
            </button>
          </form>

          {/* MESSAGE */}
          {message && (
            <p className="mt-5 text-center text-sm font-medium text-orange-600">
              {message}
            </p>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ContactPage;
