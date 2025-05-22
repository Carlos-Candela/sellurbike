import React from "react";
import UserHeader from "../../layout/UserHeader";
import UserSidebar from "../../layout/UserSidebar";
import UserMobileSidebar from "../../layout/UserMobileSidebar";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const PaymentSuccess = () => {
  return (
    <div>
      <UserHeader />
      <div className="flex">
        <div className="hidden sm:block">
          <UserSidebar />
        </div>
        <div className="w-full sm:w-[85%] md:w-[95%] px-4 py-12 flex justify-center items-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-xl text-center border border-gray-200">
            <div className="flex justify-center mb-6">
              <CheckCircle className="text-green-500 w-20 h-20" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              ¡Pago Completado!
            </h1>
            <p className="text-gray-600 mb-6">
              Tu transacción fue exitosa y tu pedido ha sido registrado. Recibirás una notificación cuando el vendedor procese el envío.
            </p>

            <div className="flex justify-center gap-4 mt-6">
              <Link
                to="/user/orders"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition"
              >
                Ver mis pedidos
              </Link>
              <Link
                to="/"
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-xl font-semibold transition"
              >
                Volver al inicio
              </Link>
            </div>
          </div>
        </div>
      </div>
      <UserMobileSidebar />
    </div>
  );
};

export default PaymentSuccess;