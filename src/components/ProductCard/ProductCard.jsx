"use client";

import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToCart } from "@/reducer/cartSlice";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

import { addReviewAction, getReviewsByProductAction } from "@/actions/reviews";

const ProductCard = ({ product, session }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [reviews, setReviews] = useState([]);
  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    if (!product?._id) return;

    (async () => {
      try {
        const data = await getReviewsByProductAction(product._id);
        setReviews(data.reviews || []);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [product]);

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
      : 0;

  const displayedRating = userRating || averageRating;

  const stock =
    typeof product.availableInStock === "object"
      ? parseFloat(product.availableInStock.$numberDecimal)
      : product.availableInStock ?? product.stock ?? 0;

  const rawPrice = product.price;

  const price =
    typeof rawPrice === "object" && rawPrice?.$numberDecimal
      ? parseFloat(rawPrice.$numberDecimal)
      : typeof rawPrice === "string"
      ? parseFloat(rawPrice)
      : typeof rawPrice === "number"
      ? rawPrice
      : 0;

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        price,
        img: product.img,
      })
    );

    Swal.fire({
      icon: "success",
      title: "Prodotto aggiunto",
      text: `${product.name} è stato aggiunto al carrello`,
      confirmButtonText: "OK",
    });
  };

  const handleRating = async (ratingValue) => {
    if (!session?.id) {
      Swal.fire({
        icon: "warning",
        title: "Login richiesto",
        text: "Devi essere loggato per votare",
      });
      return;
    }

    try {
      await addReviewAction({
        productId: product._id,
        rating: ratingValue,
        comment: "",
        userId: session.id,
      });

      setUserRating(ratingValue);

      const updated = await getReviewsByProductAction(product._id);
      setReviews(updated.reviews || []);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white border rounded-xl shadow-md hover:shadow-xl transition p-4 flex flex-col h-full">
      <div
        className="relative w-full h-48 sm:h-52 md:h-56 rounded-lg overflow-hidden mb-3 cursor-pointer"
        onClick={() => router.push(`/recipe/${product._id}`)}
      >
        <Image
          src={product.img}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw,
                 (max-width: 1024px) 50vw,
                 25vw"
        />
      </div>

      <h3 className="font-semibold text-lg truncate">{product.name}</h3>

      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
        {product.description}
      </p>

      <p className="mt-3 font-bold text-gray-800 text-lg">
        €{price.toFixed(2)}
      </p>

      <div className="flex gap-1 my-3">
        {[1, 2, 3, 4, 5].map((n) => {
          const isActive = displayedRating >= n;

          return (
            <Star
              key={n}
              size={20}
              onClick={() => handleRating(n)}
              className={`cursor-pointer transition ${
                isActive ? "text-yellow-400" : "text-gray-300"
              }`}
              fill={isActive ? "currentColor" : "none"}
            />
          );
        })}
      </div>

      <p className="text-green-700 text-sm font-medium">Available: {stock}</p>

      <button
        onClick={handleAddToCart}
        className="mt-auto w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-medium transition shadow"
      >
        Aggiungi al carrello
      </button>
    </div>
  );
};

export default ProductCard;
