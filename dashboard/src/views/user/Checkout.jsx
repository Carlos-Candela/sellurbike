import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserHeader from "../../layout/UserHeader";
import UserSidebar from "../../layout/UserSidebar";
import UserMobileSidebar from "../../layout/UserMobileSidebar";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement } from "@stripe/react-stripe-js";
import {
  FaBoxOpen,
  FaShippingFast,
  FaShieldAlt,
  FaEuroSign,
  FaReceipt,
} from "react-icons/fa";
import.meta.env.VITE_STRIPE_KEY;
import PaymentForm from "./PaymentForm";
import { useSelector } from "react-redux";
import { checkout_pay } from "../../store/Reducers/orderReducer";
import { useDispatch } from "react-redux";

const SHIPPING_COST = 35;
const PLATFORM_INSURANCE_PERCENTAGE = 5;
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const Checkout = () => {
  const navigate = useNavigate();

  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const { product } = useSelector((state) => state.product);
  const [loading, setLoading] = useState(false);

  const { _id: productId, sellerId } = useSelector(
    (state) => state.product.product
  );

  const { _id: buyerId } = useSelector((state) => state.auth.userInfo);

  const platformCalcInsurance =
    (product.price * PLATFORM_INSURANCE_PERCENTAGE) / 100;

  const total = product.price + SHIPPING_COST + platformCalcInsurance;
  const amount = total * 100;

  const dataToSend = {
    buyerId,
    sellerId,
    productId,
    amount,
    platformCalcInsurance,
  };

  return (
    <div>
      <UserHeader />
      <div className="flex">
        <div className="hidden sm:block">
          <UserSidebar />
        </div>

        <main className="flex-1 flex flex-col items-center justify-start px-2 sm:px-8 py-8">
          {!product ? (
            <div className="text-center py-10">
              No hay producto seleccionado para comprar.
              <button
                className="block mt-4 px-4 py-2 bg-indigo-500 text-white rounded"
                onClick={() => navigate(-1)}
              >
                Volver atrás
              </button>
            </div>
          ) : (
            <>
            <div className="flex flex-col-reverse transition-all">
              <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-8 mb-10 border border-gray-200 transition-all">
                <div className="flex items-center gap-3 mb-6">
                  <FaReceipt className="text-3xl text-indigo-500" />
                  <h2 className="text-2xl font-bold text-gray-800">
                    Resumen de compra
                  </h2>
                </div>
                <div className="flex gap-4 mb-6">
                  <div className="w-32 h-32 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center border">
                    <img
                      src={
                        product.images && product.images[0]
                          ? product.images[0]
                          : "/images/no-photos.png"
                      }
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <FaBoxOpen className="text-indigo-400" /> {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {product.description}
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 mb-6 shadow-inner">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="flex items-center gap-2">
                      <FaEuroSign className="text-gray-400" /> Precio producto
                    </span>
                    <span className="font-semibold">{product.price} €</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="flex items-center gap-2">
                      <FaShippingFast className="text-gray-400" /> Envío
                    </span>
                    <span className="font-semibold">{SHIPPING_COST} €</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="flex items-center gap-2">
                      <FaShieldAlt className="text-gray-400" /> Seguro
                      plataforma
                    </span>
                    <span className="font-semibold">
                      {platformCalcInsurance} €
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xl font-bold text-gray-700">
                    Total a pagar
                  </span>
                  <span className="text-2xl font-bold text-indigo-600">
                    {total} €
                  </span>
                </div>
                <button
                  onClick={() => setShowPaymentForm(true)}
                  className="w-full py-3 bg-gradient-to-br from-indigo-400 to-indigo-600 text-white rounded-xl font-semibold text-lg shadow hover:from-indigo-500 hover:to-indigo-700 transition"
                >
                  Realizar la compra
                </button>
              </div>
                   {showPaymentForm && (
                <div className="w-full">
                  <Elements stripe={stripePromise}>
                    <PaymentForm
                      setLoading={setLoading}
                      dataToSend={dataToSend}
                    />
                  </Elements>
                </div>
              )}
              </div>
              
         
            </>
          )}
        </main>

        <UserMobileSidebar />
      </div>
    </div>
  );
};

export default Checkout;
