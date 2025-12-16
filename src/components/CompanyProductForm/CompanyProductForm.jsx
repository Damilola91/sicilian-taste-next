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

  const inputBase =
    "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-xl p-6 space-y-5"
    >
      <h2 className="text-3xl text-center text-orange-500 mb-2">
        Dettagli Prodotto
      </h2>

      <input
        className={inputBase}
        name="name"
        placeholder="Nome prodotto"
        onChange={handleChange}
        required
      />

      <textarea
        className={`${inputBase} resize-none`}
        name="description"
        placeholder="Descrizione"
        rows={3}
        onChange={handleChange}
        required
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          className={inputBase}
          type="number"
          step="0.01"
          name="price"
          placeholder="Prezzo (€)"
          onChange={handleChange}
          required
        />

        <input
          className={inputBase}
          type="number"
          name="availableInStock"
          placeholder="Disponibilità"
          onChange={handleChange}
        />
      </div>

      <select
        className={inputBase}
        name="category"
        onChange={handleChange}
        required
      >
        <option value="">Seleziona categoria</option>
        <option value="dolci">Dolci</option>
        <option value="conserve">Conserve</option>
        <option value="vini">Vini</option>
        <option value="olio">Olio</option>
        <option value="primi piatti">Primi Piatti</option>
        <option value="secondi piatti">Secondi Piatti</option>
        <option value="street food">Street Food</option>
        <option value="contorni">Contorni</option>
        <option value="antipasti">Antipasti</option>
        <option value="salumi">Salumi</option>
        <option value="formaggi">Formaggi</option>
      </select>

      <input
        className={inputBase}
        name="ingredients"
        placeholder="Ingredienti (separati da virgola)"
        onChange={handleChange}
        required
      />

      <textarea
        className={`${inputBase} resize-none`}
        name="recipe"
        placeholder="Ricetta"
        rows={3}
        onChange={handleChange}
        required
      />

      <div>
        <p className="font-semibold text-gray-700 mb-2">
          Valori nutrizionali (per 100g)
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <input
            className={inputBase}
            name="calories"
            placeholder="Calorie"
            onChange={handleChange}
          />
          <input
            className={inputBase}
            name="carbs"
            placeholder="Carboidrati"
            onChange={handleChange}
          />
          <input
            className={inputBase}
            name="fat"
            placeholder="Grassi"
            onChange={handleChange}
          />
          <input
            className={inputBase}
            name="protein"
            placeholder="Proteine"
            onChange={handleChange}
          />
          <input
            className={inputBase}
            name="sugar"
            placeholder="Zuccheri"
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Immagine prodotto
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>

      <button
        disabled={loading}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition disabled:opacity-50"
      >
        {loading ? "Creazione in corso..." : "Crea Prodotto"}
      </button>
    </form>
  );
};

export default CompanyProductForm;
