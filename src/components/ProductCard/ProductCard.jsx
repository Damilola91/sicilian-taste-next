"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../reducer/cartSlice";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

import { addReviewAction, getReviewsByProductAction } from "@/actions/reviews";
import useSession from "../../hooks/useSession";

import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const session = useSession();

  const [reviews, setReviews] = useState([]);
  const [userRating, setUserRating] = useState(0);
  const [loadingReviews, setLoadingReviews] = useState(true);

  /* ---------------------------------------------
     1️⃣ CARICA LE RECENSIONI DEL PRODOTTO  
  ------------------------------------------------*/
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

  /* ---------------------------------------------
     2️⃣ CALCOLA LA MEDIA DELLE RECENSIONI  
  ------------------------------------------------*/
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  const displayedRating = userRating || averageRating;

  /* ---------------------------------------------
     3️⃣ AGGIUNTA AL CARRELLO
  ------------------------------------------------*/
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

  /* ---------------------------------------------
     4️⃣ CLICK SUL RATING → CREA RECENSIONE
  ------------------------------------------------*/
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
      comment: "", // la card non gestisce commenti, solo rating
      rating: ratingValue,
      userId: session.id,
    };

    try {
      await addReviewAction(payload);

      // aggiorno UI subito
      setUserRating(ratingValue);

      // aggiorno recensioni reali
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

  /* ---------------------------------------------
     5️⃣ NAVIGAZIONE A RECIPE PAGE
  ------------------------------------------------*/
  const goToRecipePage = () => router.push(`/recipe/${product._id}`);

  /* ---------------------------------------------
     JSX DELLA CARD
  ------------------------------------------------*/
  return (
    <div className="product-card-container">
      <div className="product-card">
        <div className="product-card-inner">
          <img
            src={product.img}
            alt={product.name}
            className="product-card-img"
            onClick={goToRecipePage}
          />

          <div className="product-card-body">
            <h5 className="product-card-title">{product.name}</h5>
            <p className="product-card-description">{product.description}</p>

            <div className="product-card-price">
              Price: €{parseFloat(product.price.$numberDecimal).toFixed(2)}
            </div>

            {/* ⭐ RATING */}
            <div className="product-card-rating">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={
                    i < displayedRating
                      ? "product-card-full-star selected"
                      : "product-card-empty-star"
                  }
                  onClick={() => handleRating(i + 1)}
                >
                  <Star />
                </span>
              ))}
            </div>

            <p className="product-card-stock">
              Available: {parseFloat(product.availableInStock.$numberDecimal)}
            </p>

            <button className="product-card-button" onClick={handleAddToCart}>
              Aggiungi al carrello
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
