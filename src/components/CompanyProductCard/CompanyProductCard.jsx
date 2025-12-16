"use client";

import Image from "next/image";

const CompanyProductCard = ({ product, onEdit, onDelete }) => {
  const price = Number(product.price || 0);

  return (
    <div className="bg-white rounded-xl shadow-md border overflow-hidden flex flex-col">
      <div className="relative h-40 w-full">
        <Image
          src={product.img}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold text-orange-500">
          {product.name}
        </h3>

        <p className="text-sm text-gray-600 line-clamp-2">
          {product.description}
        </p>

        <p className="mt-2 font-medium">€ {price.toFixed(2)}</p>

        <div className="mt-auto flex gap-2 pt-4">
          <button
            onClick={() => onEdit(product)}
            className="flex-1 px-3 py-2 text-sm rounded-lg border border-orange-400 text-orange-500 hover:bg-orange-50 transition"
          >
            Modifica
          </button>

          <button
            onClick={() => onDelete(product._id)}
            className="flex-1 px-3 py-2 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
          >
            Elimina
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyProductCard;
