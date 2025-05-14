import React from 'react';

import { Ban } from "lucide-react";
import { Link } from 'react-router-dom';

export function Deactive() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 p-4">
      <div className="max-w-md w-full rounded-2xl shadow-lg bg-white p-6 text-center">
        <div className="flex justify-center mb-4">
          <Ban className="w-16 h-16 text-red-500" />
        </div>
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Cuenta Desactivada</h1>
        <p className="text-gray-600 mb-6">
          Tu cuenta ha sido desactivada por el administrador. Si crees que esto ha sido un error o necesitas más información,
          por favor contacta con el soporte técnico.
        </p>
        <Link to="/user/support">
        <button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-xl transition-all duration-200">
          Contactar Soporte
        </button>
        </Link>
      </div>
    </div>
  );
}

export default Deactive;