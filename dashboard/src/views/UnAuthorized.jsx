import React from 'react';
import { Link } from 'react-router-dom';


const Unauthorize = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md text-center">
        <img src='/images/unauthorized.png' alt="Unauthorized" className="w-32 mx-auto mb-4" />
        <h1 className="text-5xl font-bold text-red-500 mb-4">403</h1>
        <h2 className="text-2xl font-semibold mb-2">Acceso no autorizado</h2>
        <p className="text-gray-600 mb-6">
          No tienes permisos para acceder a esta página.
        </p>
        <Link
          to="/"
          className="inline-block bg-indigo-600 text-white px-6 py-2  hover:bg-indigo-700 transition duration-200 rounded-full"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default Unauthorize;