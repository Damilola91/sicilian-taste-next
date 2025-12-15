import Image from "next/image";

const AdminProductCard = ({ product, onDelete }) => {
  const price =
    typeof product.price === "number"
      ? product.price
      : parseFloat(product.price?.$numberDecimal || 0);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border">
      <div className="relative h-40 w-full">
        <Image
          src={product.img}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-4 space-y-2">
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">
          {product.description}
        </p>

        <p className="font-bold text-orange-500">€ {price.toFixed(2)}</p>

        <button
          onClick={() => onDelete(product._id)}
          className="w-full mt-2 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
        >
          Elimina
        </button>
      </div>
    </div>
  );
};

export default AdminProductCard;
