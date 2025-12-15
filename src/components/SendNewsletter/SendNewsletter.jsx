"use client";

import { useState } from "react";

const SendNewsletter = () => {
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [html, setHtml] = useState("");
  const [msg, setMsg] = useState(null);
  const [error, setError] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    if (!subject || (!text && !html)) {
      setError(true);
      setMsg("Inserisci oggetto e contenuto");
      return;
    }

    try {
      const res = await fetch("/api/admin/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, text, html }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setMsg(`Newsletter inviata a ${data.sentTo} utenti`);
      setError(false);
      setSubject("");
      setText("");
      setHtml("");
    } catch (e) {
      setError(true);
      setMsg("Errore invio newsletter");
    }
  };

  return (
    <section className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg space-y-4">
      <h2 className="text-2xl text-center text-orange-500 font-semibold">
        Invia Newsletter
      </h2>

      <form onSubmit={submit} className="space-y-3">
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Oggetto"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <textarea
          className="w-full border rounded px-3 py-2"
          rows={3}
          placeholder="Testo"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <textarea
          className="w-full border rounded px-3 py-2"
          rows={3}
          placeholder="HTML"
          value={html}
          onChange={(e) => setHtml(e.target.value)}
        />

        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg">
          Invia
        </button>
      </form>

      {msg && (
        <p
          className={`text-center ${error ? "text-red-500" : "text-green-600"}`}
        >
          {msg}
        </p>
      )}
    </section>
  );
};

export default SendNewsletter;
