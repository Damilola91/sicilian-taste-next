"use client";

import { useState } from "react";
import "./SendNewsletter.css";

const SendNewsletter = () => {
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [html, setHtml] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subject || (!text && !html)) {
      setResponseMessage(
        "Please provide a subject and at least one content field (text or HTML)."
      );
      setIsError(true);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/send-newsletter`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ subject, text, html }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setResponseMessage(
          `Newsletter sent successfully to ${data.result.sentTo} recipients.`
        );
        setSubject("");
        setText("");
        setHtml("");
        setIsError(false);
      } else {
        setIsError(true);
        setResponseMessage(data.message);
      }
    } catch (error) {
      setIsError(true);
      setResponseMessage("An error occurred while sending the newsletter.");
    }
  };

  return (
    <div className="newsletter-container">
      <h2 className="newsletter-title">Send Newsletter</h2>

      <form className="newsletter-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Subject:</label>
          <input
            type="text"
            className="form-input"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Text Content:</label>
          <textarea
            className="form-textarea"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>HTML Content:</label>
          <textarea
            className="form-textarea"
            value={html}
            onChange={(e) => setHtml(e.target.value)}
          />
        </div>

        <button className="form-button">Send Newsletter</button>
      </form>

      {responseMessage && (
        <p className={`form-response ${isError ? "error" : "success"}`}>
          {responseMessage}
        </p>
      )}
    </div>
  );
};

export default SendNewsletter;
