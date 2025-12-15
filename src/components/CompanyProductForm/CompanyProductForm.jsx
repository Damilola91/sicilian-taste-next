"use client";

import { useState } from "react";

const CompanyProductForm = ({ onCreateProduct, loading }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    ingredients: "",
    recipe: "",
    availableInStock: "",
    calories: "",
    carbs: "",
    fat: "",
    protein: "",
    sugar: "",
  });

  const [file, setFile] = useState(null);

  const handleChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      ...formData,
      ingredients: formData.ingredients.split(",").map((i) => i.trim()),
      nutritionFacts: {
        calories: Number(formData.calories || 0),
        carbs: Number(formData.carbs || 0),
        fat: Number(formData.fat || 0),
        protein: Number(formData.protein || 0),
        sugar: Number(formData.sugar || 0),
      },
    };

    await onCreateProduct(productData, file);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-xl p-6 space-y-4"
    >
      <h2 className="text-2xl text-center text-orange-500 font-semibold">
        Crea Prodotto
      </h2>

      <input
        className="input"
        name="name"
        placeholder="Nome"
        onChange={handleChange}
        required
      />
      <textarea
        className="input"
        name="description"
        placeholder="Descrizione"
        onChange={handleChange}
        required
      />
      <input
        className="input"
        type="number"
        step="0.01"
        name="price"
        placeholder="Prezzo"
        onChange={handleChange}
        required
      />

      <select
        className="input"
        name="category"
        onChange={handleChange}
        required
      >
        <option value="">Categoria</option>
        <option value="dolci">Dolci</option>
        <option value="conserve">Conserve</option>
        <option value="vini">Vini</option>
        <option value="olio">Olio</option>
        <option value="street food">Street Food</option>
      </select>

      <input
        className="input"
        name="ingredients"
        placeholder="Ingredienti (,) "
        onChange={handleChange}
        required
      />
      <textarea
        className="input"
        name="recipe"
        placeholder="Ricetta"
        onChange={handleChange}
        required
      />

      <input
        className="input"
        type="number"
        name="availableInStock"
        placeholder="Disponibilità"
        onChange={handleChange}
      />

      <div className="grid grid-cols-2 gap-3">
        <input
          className="input"
          name="calories"
          placeholder="Calorie"
          onChange={handleChange}
        />
        <input
          className="input"
          name="carbs"
          placeholder="Carbs"
          onChange={handleChange}
        />
        <input
          className="input"
          name="fat"
          placeholder="Fat"
          onChange={handleChange}
        />
        <input
          className="input"
          name="protein"
          placeholder="Protein"
          onChange={handleChange}
        />
      </div>

      <input
        className="input"
        name="sugar"
        placeholder="Sugar"
        onChange={handleChange}
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        disabled={loading}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-medium"
      >
        {loading ? "Creazione..." : "Crea Prodotto"}
      </button>
    </form>
  );
};

export default CompanyProductForm;
