"use client";

import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
} from "../../reducer/cartSlice";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import useSession from "../../hooks/useSession";
import "./OrderForm.css";

import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Disclaimer from "../Disclaimer/Disclaimer";

import { createOrderAction } from "@/actions/orders";

const OrderForm = ({ cartItems, session }) => {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  // session lato client (cookie)
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
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirmOrder = () => {
    const missing = Object.values(shippingAddress).some((v) => !v.trim());
    if (missing) {
      setOrderMessage("Compila tutti i campi dello shipping address.");
      return;
    }
    setIsConfirmed(true);
  };

  const handleSubmitOrder = async () => {
    if (!stripe || !elements) {
      console.error("Stripe non inizializzato");
      return;
    }

    setIsSubmitting(true);
    setOrderMessage("Elaborazione...");

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
        subTotal: (parseFloat(item.price) * item.quantity).toFixed(2),
      })),
      shippingAddress,
    };

    try {
      // server action
      const res = await createOrderAction(orderData);

      if (res.error) throw new Error(res.error);

      const clientSecret = res.clientSecret;

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      if (paymentResult.error) {
        setOrderMessage(`Errore pagamento: ${paymentResult.error.message}`);
      } else if (paymentResult.paymentIntent.status === "succeeded") {
        setOrderMessage("Pagamento effettuato con successo!");
        dispatch(clearCart());
        setTimeout(() => router.push("/"), 1800);
      }
    } catch (error) {
      setOrderMessage(`Errore: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const cartTotal = cartItems
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <>
      <Navbar session={session} />

      <div className="orderFormBody my-3">
        <h1>Carrello</h1>

        {cartItems.length === 0 ? (
          <p>Il carrello è vuoto!</p>
        ) : (
          <>
            <h2>Articoli nel Carrello</h2>

            {cartItems.map((item) => (
              <div key={item._id} className="cartItem">
                <div className="cartItemDetails">
                  <h4>{item.name}</h4>
                  <p>Prezzo unitario: €{item.price.toFixed(2)}</p>

                  <div className="quantityControls">
                    <button
                      onClick={() => dispatch(decrementQuantity(item._id))}
                      disabled={item.quantity <= 1}
                      className="decrementButton"
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => dispatch(incrementQuantity(item._id))}
                      className="incrementButton"
                    >
                      +
                    </button>
                  </div>

                  <p>Totale: €{(item.price * item.quantity).toFixed(2)}</p>

                  <button
                    onClick={() => dispatch(removeFromCart(item._id))}
                    className="removeButton"
                  >
                    <Trash2 size="24" color="#ff4d4f" />
                  </button>
                </div>

                {item.img && (
                  <img
                    src={item.img}
                    alt={item.name}
                    className="cartItemImage"
                  />
                )}
              </div>
            ))}

            {!isConfirmed ? (
              <>
                <h3>Indirizzo di spedizione</h3>
                <form
                  className="shippingForm"
                  onSubmit={(e) => e.preventDefault()}
                >
                  {Object.keys(shippingAddress).map((field) => (
                    <input
                      key={field}
                      type="text"
                      name={field}
                      placeholder={field}
                      value={shippingAddress[field]}
                      onChange={handleInputChange}
                      required
                    />
                  ))}
                </form>

                <button onClick={handleConfirmOrder} className="button">
                  Conferma Ordine (€{cartTotal})
                </button>
              </>
            ) : (
              <>
                <h3>Pagamento</h3>
                <CardElement className="cardElement" />

                <button
                  onClick={handleSubmitOrder}
                  disabled={isSubmitting}
                  className="button"
                >
                  {isSubmitting ? "Elaborazione..." : "Effettua Pagamento"}
                </button>
              </>
            )}
          </>
        )}

        {orderMessage && <p className="statusMessage">{orderMessage}</p>}
      </div>

      <Disclaimer />
      <Footer />
    </>
  );
};

export default OrderForm;
