"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../reducer/cartSlice";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

import { addReviewAction, getReviewsByProductAction } from "@/actions/reviews";

const ProductCard = ({ product, session }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [reviews, setReviews] = useState([]);
  const [userRating, setUserRating] = useState(0);
  const [loadingReviews, setLoadingReviews] = useState(true);

  // 1️⃣ Carica recensioni
  useEffect(() => {
    if (!product?._id) return;

    async function loadReviews() {
      try {
        const data = await getReviewsByProductAction(product._id);
        setReviews(data.reviews || []);
      } catch (err) {
        console.error("Errore nel caricamento reviews", err);
      } finally {
        setLoadingReviews(false);
      }
    }

    loadReviews();
  }, [product]);

  // 2️⃣ Media rating
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  const displayedRating = userRating || averageRating;

  // 3️⃣ Aggiunta al carrello
  const handleAddToCart = () => {
    const productToAdd = {
      _id: product._id,
      name: product.name,
      price: parseFloat(product.price.$numberDecimal),
      img: product.img,
    };

    dispatch(addToCart(productToAdd));

    Swal.fire({
      title: "Prodotto aggiunto!",
      text: `${product.name} è stato aggiunto al carrello.`,
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  // 4️⃣ Click sulle stelle → rating
  const handleRating = async (ratingValue) => {
    if (!session?.id) {
      Swal.fire({
        icon: "warning",
        title: "Login richiesto",
        text: "Devi essere loggato per lasciare una recensione.",
      });
      return;
    }

    const payload = {
      productId: product._id,
      comment: "",
      rating: ratingValue,
      userId: session.id,
    };

    try {
      await addReviewAction(payload);

      setUserRating(ratingValue);

      const updated = await getReviewsByProductAction(product._id);
      setReviews(updated.reviews || []);

      Swal.fire({
        icon: "success",
        title: "Grazie!",
        text: `Hai valutato questo prodotto ${ratingValue} stelle.`,
      });
    } catch (err) {
      console.error("Errore nel rating:", err);
      Swal.fire({
        icon: "error",
        title: "Errore",
        text: "Impossibile inviare la recensione.",
      });
    }
  };

  // 5️⃣ Vai alla RecipePage
  const goToRecipePage = () => router.push(`/recipe/${product._id}`);

  return (
    <div className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden h-full">
      {/* Immagine */}
      <img
        src={product.img}
        alt={product.name}
        className="w-full h-48 object-cover border-b border-gray-200 cursor-pointer hover:opacity-90 transition"
        onClick={goToRecipePage}
      />

      {/* Corpo card */}
      <div className="flex flex-col flex-1 p-4">
        {/* Titolo */}
        <h5 className="text-lg font-semibold mb-1 truncate">{product.name}</h5>

        {/* Descrizione */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Prezzo */}
        <div className="text-base font-bold text-gray-800 mb-2">
          Price: €{parseFloat(product.price.$numberDecimal).toFixed(2)}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleRating(i + 1)}
              className={`cursor-pointer ${
                i < displayedRating ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              <Star className="w-5 h-5" />
            </button>
          ))}
        </div>

        {/* Disponibilità */}
        <p className="text-sm text-green-700 text-center mt-auto">
          Available: {parseFloat(product.availableInStock.$numberDecimal)}
        </p>

        {/* Bottone carrello */}
        <button
          className="mt-3 w-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium py-2 rounded-md transition-colors"
          onClick={handleAddToCart}
        >
          Aggiungi al carrello
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
