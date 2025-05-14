import React from "react";
import { Clock } from "lucide-react";
import { Link } from "react-router-dom";

export  function Pending() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="max-w-md w-full rounded-2xl shadow-lg bg-white p-6 text-center">
        <div className="flex justify-center mb-4">
          <Clock className="w-16 h-16 text-blue-500" />
        </div>
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">¡Registro Pendiente!</h1>
        <p className="text-gray-600 mb-6">
          Tu cuenta ha sido registrada exitosamente, pero todavía está pendiente de confirmación por parte del administrador. Te notificaremos por correo electrónico una vez que esté aprobada.
        </p>
        <Link to="/">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-xl transition-all duration-200">
          Volver al Inicio
        </button>
        </Link>
      </div>
    </div>
  );
}

export default Pending;