"use client";

import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
} from "@/reducer/cartSlice";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import useSession from "@/hooks/useSession";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Disclaimer from "@/components/Disclaimer/Disclaimer";

import { createOrderAction } from "@/actions/orders";

export default function OrderForm({ cartItems, session }) {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const clientSession = useSession();
  const userId = clientSession?._id || session?._id || null;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderMessage, setOrderMessage] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);

  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    street: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const handleInputChange = (e) => {
    setShippingAddress((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleConfirmOrder = () => {
    const missing = Object.values(shippingAddress).some((v) => !v.trim());
    if (missing) {
      setOrderMessage(
        "⚠️ Completa tutti i campi dell’indirizzo di spedizione."
      );
      return;
    }
    setIsConfirmed(true);
  };

  const handleSubmitOrder = async () => {
    if (!stripe || !elements) return;

    setIsSubmitting(true);
    setOrderMessage("⏳ Elaborazione pagamento...");

    const orderData = {
      user: userId,
      items: cartItems.map((item) => ({
        products: [
          {
            product: item._id,
            quantity: item.quantity,
            price: parseFloat(item.price),
          },
        ],
        subTotal: (item.price * item.quantity).toFixed(2),
      })),
      shippingAddress,
    };

    try {
      const res = await createOrderAction(orderData);

      if (res.error) throw new Error(res.error);
      const clientSecret = res.clientSecret;

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      if (paymentResult.error) {
        setOrderMessage(`❌ Pagamento fallito: ${paymentResult.error.message}`);
      } else if (paymentResult.paymentIntent.status === "succeeded") {
        setOrderMessage("🎉 Pagamento riuscito!");

        dispatch(clearCart());
        setTimeout(() => router.push("/"), 1500);
      }
    } catch (err) {
      setOrderMessage(`❌ Errore: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const cartTotal = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <>
      <Navbar session={session} />

      <div className="max-w-3xl mx-auto p-6 mt-4">
        <h1 className="text-3xl font-bold mb-6 text-orange-600">Carrello</h1>

        {cartItems.length === 0 ? (
          <p className="text-gray-600">Il carrello è vuoto.</p>
        ) : (
          <>
            {/* CART ITEMS */}
            <h2 className="text-xl font-semibold mb-4">Articoli</h2>

            <div className="space-y-5">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between rounded-lg border p-4 shadow-sm"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-sm text-gray-600">
                      Prezzo: €{item.price.toFixed(2)}
                    </p>

                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => dispatch(decrementQuantity(item._id))}
                        disabled={item.quantity <= 1}
                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        -
                      </button>

                      <span className="font-semibold">{item.quantity}</span>

                      <button
                        onClick={() => dispatch(incrementQuantity(item._id))}
                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>

                    <p className="font-semibold mt-2">
                      Totale: €{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {item.img && (
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded ml-4"
                    />
                  )}

                  <button
                    onClick={() => dispatch(removeFromCart(item._id))}
                    className="ml-4 text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={22} />
                  </button>
                </div>
              ))}
            </div>

            {/* SHIPPING */}
            {!isConfirmed ? (
              <>
                <h3 className="text-xl font-semibold mt-8 mb-4">
                  Indirizzo di spedizione
                </h3>

                <div className="grid grid-cols-1 gap-3">
                  {Object.entries(shippingAddress).map(([field, value]) => (
                    <input
                      key={field}
                      name={field}
                      value={value}
                      onChange={handleInputChange}
                      placeholder={field}
                      className="border rounded px-3 py-2 focus:ring-2 focus:ring-orange-400"
                    />
                  ))}
                </div>

                <button
                  onClick={handleConfirmOrder}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white mt-5 py-2 rounded text-lg transition"
                >
                  Conferma Ordine (€{cartTotal})
                </button>
              </>
            ) : (
              <>
                <h3 className="text-xl font-semibold mt-8 mb-3">Pagamento</h3>

                <div className="border rounded p-4 bg-white shadow-sm">
                  <CardElement className="p-2" />
                </div>

                <button
                  onClick={handleSubmitOrder}
                  disabled={isSubmitting}
                  className="w-full bg-green-600 hover:bg-green-700 text-white mt-5 py-2 rounded text-lg transition"
                >
                  {isSubmitting ? "Elaborazione..." : "Paga ora"}
                </button>
              </>
            )}
          </>
        )}

        {orderMessage && (
          <p className="mt-4 text-center font-semibold text-orange-600">
            {orderMessage}
          </p>
        )}
      </div>

      <Disclaimer />
      <Footer />
    </>
  );
}
