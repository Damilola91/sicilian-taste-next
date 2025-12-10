"use client";

import { useSelector } from "react-redux";
import { selectCartItems, selectTotalAmount } from "@/reducer/cartSlice";
import OrderForm from "../OrderForm/OrderForm";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_CLIENT_SECRET);

const WrappedOrderForm = ({ session }) => {
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectTotalAmount);

  return (
    <Elements stripe={stripePromise}>
      <OrderForm
        cartItems={cartItems}
        totalAmount={totalAmount}
        session={session}
      />
    </Elements>
  );
};

export default WrappedOrderForm;
