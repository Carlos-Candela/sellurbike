import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { checkout_pay, messageClear } from "../../store/Reducers/orderReducer";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CARD_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#a0aec0",
      },
    },
    invalid: {
      color: "#e53e3e",
      iconColor: "#e53e3e",
    },
  },
};

const PaymentForm = ({ setLoading, dataToSend }) => {
  const stripe = useStripe();
  const elements = useElements();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {successMessage, errorMessage,loader,order}= useSelector(state=>state.order)

  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      
      const data ={...dataToSend, paymentMethod}
      // Aquí se despacha la acción para registrar la compra
      dispatch(checkout_pay(data));
    }
  };

  useEffect(() => {
      
      if (errorMessage) {
        toast.error(errorMessage);
        dispatch(messageClear());
      }
      if (successMessage) {
        toast.success(successMessage);
        dispatch(messageClear());
        navigate("/user/payment-success");
      }
    }, [errorMessage, successMessage, dispatch]);

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-md border border-gray-100"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Pago con tarjeta
      </h2>

      <div className="mb-4 p-4 border border-gray-300 rounded-xl bg-gray-50">
        <CardElement options={CARD_OPTIONS} />
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <button
        type="submit"
        disabled={!stripe}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50"
      >
        ¡PAGAR!
      </button>
    </form>
  );
};

export default PaymentForm;
