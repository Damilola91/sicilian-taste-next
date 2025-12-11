"use client";

import { useState } from "react";
import { User, Mail, Lock, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
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
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/create`,
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
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-orange-600">
          Sign Up
        </h2>

        {error && (
          <p className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-center text-sm">
            {error}
          </p>
        )}

        {success && (
          <p className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4 text-center text-sm">
            User created successfully!
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Name */}
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-500" size={20} />
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* Surname */}
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-500" size={20} />
            <input
              type="text"
              name="surname"
              placeholder="Surname"
              className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
              required
              value={formData.surname}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-500" size={20} />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-500" size={20} />
            <input
              type="password"
              name="password"
              placeholder="Password (min 8 chars)"
              minLength={8}
              className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {/* Role */}
          <div className="relative">
            <ChevronDown
              className="absolute right-3 top-3 text-gray-500"
              size={20}
            />
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 appearance-none focus:ring-2 focus:ring-orange-400 outline-none"
            >
              <option value="user">User</option>
              <option value="company">Company</option>
            </select>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-lg py-2 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
