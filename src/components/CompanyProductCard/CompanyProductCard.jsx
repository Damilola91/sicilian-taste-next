import Image from "next/image";

const toNumber = (value, fallback = 0) => {
  if (value == null) return fallback;

  // Decimal128 tipo { $numberDecimal: "12.34" }
  if (typeof value === "object" && value.$numberDecimal) {
    const n = Number(value.$numberDecimal);
    return Number.isFinite(n) ? n : fallback;
  }

  // string / number
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
};

const CompanyProductCard = ({ product }) => {
  const price = toNumber(product?.price, 0);
  const stock = toNumber(product?.availableInStock, 0);

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
      <div className="relative h-40 w-full">
        <Image
          src={product.img}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      <div className="p-4 space-y-1">
        <h3 className="font-semibold truncate">{product.name}</h3>

        <p className="text-sm text-gray-600 line-clamp-1">
          {product.description}
        </p>

        <p className="font-bold text-orange-600">€{price.toFixed(2)}</p>

        <p className="text-xs text-gray-500">Stock: {stock}</p>
      </div>
    </div>
  );
};

export default CompanyProductCard;
