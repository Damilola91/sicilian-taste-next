"use client";

import { useEffect, useState } from "react";
import { addReviewAction, getReviewsByProductAction } from "@/actions/reviews";
import { Star } from "lucide-react";

const CommentSection = ({ productId, session }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [submitStatus, setSubmitStatus] = useState("");

  const loadReviews = async () => {
    try {
      setLoading(true);
      const data = await getReviewsByProductAction(productId);
      setReviews(data.reviews || []);
    } catch (e) {
      console.error("Errore nel caricamento recensioni", e);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) loadReviews();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = session?.id;
    if (!userId) {
      setSubmitStatus("Devi essere loggato per commentare.");
      return;
    }

    if (!comment.trim() || rating === 0) {
      setSubmitStatus("Inserisci commento e rating.");
      return;
    }

    try {
      setSubmitStatus("Invio in corso...");

      await addReviewAction({
        productId,
        comment,
        rating,
        userId,
      });

      await loadReviews();

      setComment("");
      setRating(0);
      setSubmitStatus("Commento pubblicato con successo!");
    } catch (err) {
      console.error(err);
      setSubmitStatus("Errore nell'invio del commento.");
    }
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold mb-4">Comments</h2>

      {loading ? (
        <p>Loading comments...</p>
      ) : reviews.length === 0 ? (
        <p className="text-gray-500">
          No comments yet. Be the first to comment!
        </p>
      ) : (
        <ul className="space-y-4 mb-6">
          {reviews.map((review) => (
            <li key={review._id} className="border-b pb-3">
              <strong className="block text-gray-800">
                {review.user?.name || "Anonymous"}
              </strong>

              <div className="flex items-center gap-1 mt-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    size={20}
                    className={
                      index < review.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>

              {review.comment && (
                <p className="mt-1 text-gray-700">{review.comment}</p>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* FORM */}
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <textarea
          className="w-full border p-3 rounded resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
          rows="3"
          placeholder="Write your comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <div className="flex items-center gap-2">
          <span>Your rating:</span>
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              size={26}
              className={`cursor-pointer transition ${
                index < rating
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }`}
              onClick={() => setRating(index + 1)}
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={!session}
          className="bg-orange-500 px-4 py-2 rounded text-white disabled:opacity-50 hover:bg-orange-600 transition"
        >
          Post Comment
        </button>

        {submitStatus && (
          <p className="text-sm mt-2 text-gray-600">{submitStatus}</p>
        )}

        {!session && (
          <p className="text-red-500 text-sm">
            You must be logged in to comment.
          </p>
        )}
      </form>
    </div>
  );
};

export default CommentSection;
