"use client";

import { useState } from "react";
import { User, Mail, Lock, ChevronDown } from "lucide-react";
import "./SignUpForm.css";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    role: "user",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/users/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      setSuccess(true);
      setError(null);

      setTimeout(() => {
        router.push("/");
      }, 1500);

      setFormData({
        name: "",
        surname: "",
        email: "",
        password: "",
        role: "user",
      });
    } catch (err) {
      setError(err.message);
      setSuccess(false);
    }
  };

  return (
    <div className="signup-form-container">
      <div className="signup-form">
        <h2>SIGN UP</h2>

        {error && <p className="error-message">{error}</p>}
        {success && (
          <p className="success-message">User created successfully!</p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <User size={20} />
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <User size={20} />
            <input
              type="text"
              name="surname"
              placeholder="Surname"
              required
              value={formData.surname}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <Mail size={20} />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <Lock size={20} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              minLength={8}
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <ChevronDown size={20} />
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="user">User</option>
              <option value="company">Company</option>
            </select>
          </div>

          <button className="signup-button">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
