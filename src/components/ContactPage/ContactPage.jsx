"use client";

import { useState } from "react";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import "./ContactPage.css";
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

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setMessage("");

    const res = await sendContactEmailAction(formData);

    if (res.error) {
      setMessage(res.error);
    } else if (res.success) {
      setMessage(res.message);
      setFormData({ from: "", subject: "", text: "" });
    }

    setIsSubmitting(false);
  };

  return (
    <>
      <Navbar session={session} />
      <div className="contact-page my-3">
        <h1 className="contact-page-title">Contattaci</h1>
        <div className="contact-form">
          <label htmlFor="from">Da:</label>
          <input
            type="email"
            id="from"
            name="from"
            value={formData.from}
            onChange={handleChange}
            required
          />

          <label htmlFor="subject">Oggetto:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />

          <label htmlFor="text">Testo:</label>
          <textarea
            id="text"
            name="text"
            value={formData.text}
            onChange={handleChange}
            rows="5"
            required
          />

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="submit-button"
          >
            {isSubmitting ? "Invio in corso..." : "Invia"}
          </button>
        </div>
        {message && <p className="message">{message}</p>}
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
